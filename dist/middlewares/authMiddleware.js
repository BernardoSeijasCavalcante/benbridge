"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
function authMiddleware(req, res, next) {
    const apiKey = req.header('x-api-key') || req.header('Authorization')?.replace('Bearer ', '');
    if (!apiKey) {
        return res.status(401).json({ error: 'Unauthorized: API Key is missing' });
    }
    if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
    }
    next();
}
