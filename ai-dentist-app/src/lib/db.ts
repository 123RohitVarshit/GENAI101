import Database from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';

const dbPath = process.cwd() + '/db/dentist.db';
let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
  }
  return db;
}

// User operations
export function createUser(name: string, email?: string, age?: number, gender?: string) {
  const id = uuidv4();
  const stmt = getDb().prepare(`
    INSERT INTO users (id, name, email, age, gender)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(id, name, email || null, age || null, gender || null);
  return id;
}

export function getUser(id: string) {
  const stmt = getDb().prepare('SELECT * FROM users WHERE id = ?');
  return stmt.get(id);
}

// Dental profile operations
export function createDentalProfile(userId: string, data: any) {
  const id = uuidv4();
  const stmt = getDb().prepare(`
    INSERT INTO dental_profiles 
    (id, user_id, current_issues, past_procedures, allergies, medications, dentist_name, dentist_contact, insurance_info)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    id,
    userId,
    JSON.stringify(data.currentIssues || []),
    JSON.stringify(data.pastProcedures || []),
    JSON.stringify(data.allergies || []),
    JSON.stringify(data.medications || []),
    data.dentistName || null,
    data.dentistContact || null,
    data.insuranceInfo || null
  );
  return id;
}

export function getDentalProfile(userId: string) {
  const stmt = getDb().prepare('SELECT * FROM dental_profiles WHERE user_id = ?');
  const profile = stmt.get(userId) as any;
  if (profile) {
    profile.current_issues = JSON.parse(profile.current_issues || '[]');
    profile.past_procedures = JSON.parse(profile.past_procedures || '[]');
    profile.allergies = JSON.parse(profile.allergies || '[]');
    profile.medications = JSON.parse(profile.medications || '[]');
  }
  return profile;
}

// Daily routine operations
export function saveDailyRoutine(userId: string, data: any) {
  const id = uuidv4();
  const stmt = getDb().prepare(`
    INSERT INTO daily_routines 
    (id, user_id, date, brushing_morning, brushing_night, brushing_duration, flossed, mouthwash_used, water_intake, sugary_foods, pain_or_discomfort, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    id,
    userId,
    data.date,
    data.brushingMorning ? 1 : 0,
    data.brushingNight ? 1 : 0,
    data.brushingDuration || null,
    data.flossed ? 1 : 0,
    data.mouthwashUsed ? 1 : 0,
    data.waterIntake || null,
    data.sugaryFoods || null,
    data.painOrDiscomfort || null,
    data.notes || null
  );
  return id;
}

export function getDailyRoutines(userId: string, limit: number = 30) {
  const stmt = getDb().prepare(`
    SELECT * FROM daily_routines 
    WHERE user_id = ? 
    ORDER BY date DESC 
    LIMIT ?
  `);
  return stmt.all(userId, limit);
}

// Doctor visit operations
export function saveDoctorVisit(userId: string, data: any) {
  const id = uuidv4();
  const stmt = getDb().prepare(`
    INSERT INTO doctor_visits 
    (id, user_id, visit_date, doctor_name, clinic_name, procedure_done, diagnosis, recommendations, next_appointment, cost, documents, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    id,
    userId,
    data.visitDate,
    data.doctorName || null,
    data.clinicName || null,
    data.procedureDone || null,
    data.diagnosis || null,
    data.recommendations || null,
    data.nextAppointment || null,
    data.cost || null,
    JSON.stringify(data.documents || []),
    data.notes || null
  );
  return id;
}

export function getDoctorVisits(userId: string) {
  const stmt = getDb().prepare(`
    SELECT * FROM doctor_visits 
    WHERE user_id = ? 
    ORDER BY visit_date DESC
  `);
  const visits = stmt.all(userId) as any[];
  return visits.map(v => ({
    ...v,
    documents: JSON.parse(v.documents || '[]')
  }));
}

// Chat history operations
export function saveChatMessage(userId: string, role: string, content: string) {
  const id = uuidv4();
  const stmt = getDb().prepare(`
    INSERT INTO chat_history (id, user_id, role, content)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(id, userId, role, content);
  return id;
}

export function getChatHistory(userId: string, limit: number = 50) {
  const stmt = getDb().prepare(`
    SELECT * FROM chat_history 
    WHERE user_id = ? 
    ORDER BY timestamp DESC 
    LIMIT ?
  `);
  return stmt.all(userId, limit).reverse();
}

// User memory operations for AI personalization
export function saveUserMemory(userId: string, category: string, keyInfo: string, value: string, importance: number = 1) {
  const id = uuidv4();
  const stmt = getDb().prepare(`
    INSERT INTO user_memory (id, user_id, category, key_info, value, importance)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
    value = excluded.value,
    importance = excluded.importance,
    updated_at = CURRENT_TIMESTAMP
  `);
  stmt.run(id, userId, category, keyInfo, value, importance);
  return id;
}

export function getUserMemory(userId: string, category?: string) {
  if (category) {
    const stmt = getDb().prepare(`
      SELECT * FROM user_memory 
      WHERE user_id = ? AND category = ?
      ORDER BY importance DESC, updated_at DESC
    `);
    return stmt.all(userId, category);
  }
  const stmt = getDb().prepare(`
    SELECT * FROM user_memory 
    WHERE user_id = ?
    ORDER BY importance DESC, updated_at DESC
  `);
  return stmt.all(userId);
}

export function getUserContextForAI(userId: string): string {
  const user = getUser(userId);
  const profile = getDentalProfile(userId);
  const recentRoutines = getDailyRoutines(userId, 7);
  const memories = getUserMemory(userId);
  
  let context = `Patient Profile:\n`;
  context += `Name: ${user?.name || 'Unknown'}\n`;
  if (user?.age) context += `Age: ${user.age}\n`;
  if (user?.gender) context += `Gender: ${user.gender}\n`;
  
  if (profile) {
    context += `\nDental History:\n`;
    if (profile.current_issues?.length > 0) {
      context += `Current Issues: ${profile.current_issues.join(', ')}\n`;
    }
    if (profile.past_procedures?.length > 0) {
      context += `Past Procedures: ${profile.past_procedures.join(', ')}\n`;
    }
    if (profile.allergies?.length > 0) {
      context += `Allergies: ${profile.allergies.join(', ')}\n`;
    }
  }
  
  if (recentRoutines.length > 0) {
    context += `\nRecent Dental Routine (last ${recentRoutines.length} days):\n`;
    recentRoutines.forEach((routine: any) => {
      context += `- ${routine.date}: Brushing ${routine.brushing_morning && routine.brushing_night ? '2x' : routine.brushing_morning || routine.brushing_night ? '1x' : '0x'}, Flossed: ${routine.flossed ? 'Yes' : 'No'}\n`;
    });
  }
  
  if (memories.length > 0) {
    context += `\nImportant Notes:\n`;
    memories.slice(0, 10).forEach((memory: any) => {
      context += `- ${memory.key_info}: ${memory.value}\n`;
    });
  }
  
  return context;
}