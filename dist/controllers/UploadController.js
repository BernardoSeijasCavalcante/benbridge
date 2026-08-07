"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const QualiIntegrationService_1 = require("../services/quali/QualiIntegrationService");
const uploadDir = path_1.default.join(process.cwd(), 'tmp', 'uploads');
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        cb(null, `${(0, uuid_1.v4)()}${ext}`);
    }
});
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 260 * 1024 * 1024 }, // 260MB limit
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type. Only JPEG, PNG and PDF are allowed.'));
        }
    }
}).single('file');
class UploadController {
    constructor() {
        this.qualiService = new QualiIntegrationService_1.QualiIntegrationService();
        this.uploadDocument = (req, res) => {
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
                    fs_1.default.unlink(filePath, (unlinkErr) => {
                        if (unlinkErr)
                            console.error('Failed to auto-delete file:', filePath, unlinkErr);
                    });
                    res.status(200).json({
                        success: true,
                        file_id: joinbankResponse?.id || joinbankResponse?.file_id,
                        message: 'File securely processed and uploaded to JoinBank.'
                    });
                }
                catch (error) {
                    // Arquivo NÃO será apagado em caso de erro para permitir o debug local pelo desenvolvedor.
                    // fs.unlink(filePath, () => {});
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
        };
        // Novo endpoint: Repassa uma URL pública diretamente para a JoinBank
        this.uploadByUrl = async (req, res) => {
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
            }
            catch (error) {
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
        };
    }
}
exports.UploadController = UploadController;
