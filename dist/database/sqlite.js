"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabase = getDatabase;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const path_1 = __importDefault(require("path"));
let dbInstance = null;
async function getDatabase() {
    if (dbInstance) {
        return dbInstance;
    }
    const dbPath = path_1.default.resolve(__dirname, '../../database.sqlite');
    dbInstance = await (0, sqlite_1.open)({
        filename: dbPath,
        driver: sqlite3_1.default.Database
    });
    await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS simulations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      simulation_id TEXT,
      status TEXT NOT NULL,
      payload TEXT NOT NULL,
      response TEXT,
      error_message TEXT,
      in100_query_id TEXT,
      in100_auth_url TEXT,
      in100_status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      simulation_internal_id INTEGER,
      step TEXT NOT NULL,
      success INTEGER NOT NULL,
      data TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(simulation_internal_id) REFERENCES simulations(id)
    );
  `);
    try {
        await dbInstance.exec('ALTER TABLE simulations ADD COLUMN in100_query_id TEXT;');
    }
    catch (e) { }
    try {
        await dbInstance.exec('ALTER TABLE simulations ADD COLUMN in100_auth_url TEXT;');
    }
    catch (e) { }
    try {
        await dbInstance.exec('ALTER TABLE simulations ADD COLUMN in100_status TEXT;');
    }
    catch (e) { }
    return dbInstance;
}
