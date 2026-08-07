"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const sqlite_1 = require("./database/sqlite");
dotenv_1.default.config();
const app = (0, express_1.default)();
const path_1 = __importDefault(require("path"));
app.use(express_1.default.json());
app.use('/public/uploads', express_1.default.static(path_1.default.join(process.cwd(), 'tmp', 'uploads')));
// Use the default export from routes.ts
const routes_1 = __importDefault(require("./routes"));
app.use('/api', routes_1.default);
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
