import express from 'express';
import dotenv from 'dotenv';
import { getDatabase } from './database/sqlite';

dotenv.config();

const app = express();
import path from 'path';

app.use(express.json());
app.use('/public/uploads', express.static(path.join(process.cwd(), 'tmp', 'uploads')));

// Use the default export from routes.ts
import router from './routes';
app.use('/api', router);

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
