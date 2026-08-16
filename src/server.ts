import express from 'express';
import dotenv from 'dotenv';
import { getDatabase } from './database/sqlite';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { authMiddleware } from './middlewares/authMiddleware';

dotenv.config();

const app = express();
app.set('trust proxy', 1);
import path from 'path';

app.use(express.json());

// Security Middlewares
app.use(helmet());

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);

app.use('/public/uploads', express.static(path.join(process.cwd(), 'tmp', 'uploads')));

// Use the default export from routes.ts
import router from './routes';
app.use('/api', authMiddleware, router);

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  try {
    // Inicializa DB
    await getDatabase();
    console.log('SQLite Database initialized successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();
