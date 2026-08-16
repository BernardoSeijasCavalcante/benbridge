import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.header('x-api-key') || req.header('Authorization')?.replace('Bearer ', '');

  if (!apiKey) {
    return res.status(401).json({ error: 'Unauthorized: API Key is missing' });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
  }

  next();
}
