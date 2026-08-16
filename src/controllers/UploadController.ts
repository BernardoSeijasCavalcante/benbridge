import { Request, Response } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { QualiIntegrationService } from '../services/quali/QualiIntegrationService';

const uploadDir = path.join(process.cwd(), 'tmp', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 260 * 1024 * 1024 }, // 260MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.pdf'];
    
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (allowedMimeTypes.includes(file.mimetype) || allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, JPG, PNG, WEBP and PDF are allowed.'));
    }
  }
}).single('file');

export class UploadController {
  private qualiService = new QualiIntegrationService();

  public uploadDocument = (req: Request, res: Response): void => {
    upload(req, res, async (err) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
        return;
      }

      if (!req.file) {
        res.status(400).json({ success: false, message: 'No file provided.' });
        return;
      }

      const baseUrl = process.env.PUBLIC_URL || `http://${req.get('host')}`;
      const publicUrl = `${baseUrl}/public/uploads/${req.file.filename}`;
      const filePath = req.file.path;

      try {
        // Send URL to JoinBank
        const joinbankResponse = await this.qualiService.uploadDocumentByUrl(publicUrl);

        // Auto-delete the file locally
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) console.error('Failed to auto-delete file:', filePath, unlinkErr);
        });

        res.status(200).json({
          success: true,
          file_id: joinbankResponse?.id || joinbankResponse?.file_id,
          message: 'File securely processed and uploaded to JoinBank.'
        });
      } catch (error: any) {
        // Sempre deletar o arquivo para não persisti-lo, conforme especificação
        fs.unlink(filePath, () => {});
        const status = error.response?.status;
        const data = error.response?.data;
        const message = error.message;
        res.status(500).json({ 
          success: false, 
          message: `Failed to upload to JoinBank: ${message}`,
          public_url_sent: publicUrl,
          joinbank_status: status,
          joinbank_response: data
        });
      }
    });
  }

  // Novo endpoint: Repassa uma URL pública diretamente para a JoinBank
  public uploadByUrl = async (req: Request, res: Response): Promise<void> => {
    try {
      const { url } = req.body;

      if (!url) {
        res.status(400).json({ success: false, message: 'No URL provided.' });
        return;
      }

      const joinbankResponse = await this.qualiService.uploadDocumentByUrl(url);

      res.status(200).json({
        success: true,
        file_id: joinbankResponse?.id || joinbankResponse?.file_id,
        message: 'URL successfully passed to JoinBank.'
      });
    } catch (error: any) {
      const status = error.response?.status;
      const data = error.response?.data;
      const message = error.message;
      res.status(500).json({ 
        success: false, 
        message: `Failed to pass URL to JoinBank: ${message}`,
        url_sent: req.body.url,
        joinbank_status: status,
        joinbank_response: data
      });
    }
  }
}
