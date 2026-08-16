import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let dbInstance: Database | null = null;

export async function getDatabase(): Promise<Database> {
  if (dbInstance) {
    return dbInstance;
  }

  const dbPath = path.resolve(__dirname, '../../database.sqlite');
  
  dbInstance = await open({
    filename: dbPath,
    driver: sqlite3.Database
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
  } catch (e) {}
  try {
    await dbInstance.exec('ALTER TABLE simulations ADD COLUMN in100_auth_url TEXT;');
  } catch (e) {}
  try {
    await dbInstance.exec('ALTER TABLE simulations ADD COLUMN in100_status TEXT;');
  } catch (e) {}

  return dbInstance;
}
