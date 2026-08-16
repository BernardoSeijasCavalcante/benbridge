"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const sqlite_1 = require("./database/sqlite");
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const authMiddleware_1 = require("./middlewares/authMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.set('trust proxy', 1);
const path_1 = __importDefault(require("path"));
app.use(express_1.default.json());
// Security Middlewares
app.use((0, helmet_1.default)());
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);
app.use('/public/uploads', express_1.default.static(path_1.default.join(process.cwd(), 'tmp', 'uploads')));
// Use the default export from routes.ts
const routes_1 = __importDefault(require("./routes"));
app.use('/api', authMiddleware_1.authMiddleware, routes_1.default);
const PORT = process.env.PORT || 3000;
async function bootstrap() {
    try {
        // Inicializa DB
        await (0, sqlite_1.getDatabase)();
        console.log('SQLite Database initialized successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
bootstrap();
