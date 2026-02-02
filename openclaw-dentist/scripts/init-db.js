import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, '..', 'data', 'dentist.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

const createTables = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  age INTEGER,
  gender TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS dental_profiles (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  current_issues TEXT,
  past_procedures TEXT,
  allergies TEXT,
  medications TEXT,
  dentist_name TEXT,
  dentist_contact TEXT,
  insurance_info TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS daily_routines (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  date DATE NOT NULL,
  brushing_morning BOOLEAN DEFAULT 0,
  brushing_night BOOLEAN DEFAULT 0,
  brushing_duration INTEGER,
  flossed BOOLEAN DEFAULT 0,
  mouthwash_used BOOLEAN DEFAULT 0,
  water_intake INTEGER,
  sugary_foods INTEGER,
  pain_or_discomfort TEXT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS doctor_visits (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  visit_date DATE NOT NULL,
  doctor_name TEXT,
  clinic_name TEXT,
  procedure_done TEXT,
  diagnosis TEXT,
  recommendations TEXT,
  next_appointment DATE,
  cost REAL,
  documents TEXT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS chat_history (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_memory (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  category TEXT NOT NULL,
  key_info TEXT NOT NULL,
  value TEXT NOT NULL,
  importance INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_daily_routines_user_date ON daily_routines(user_id, date);
CREATE INDEX IF NOT EXISTS idx_doctor_visits_user ON doctor_visits(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_history_user ON chat_history(user_id);
CREATE INDEX IF NOT EXISTS idx_user_memory_user_category ON user_memory(user_id, category);
`;

db.exec(createTables);

console.log('✅ AI Dentist database initialized at:', dbPath);
db.close();