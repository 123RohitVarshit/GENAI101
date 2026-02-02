export interface User {
  id: string;
  name: string;
  email?: string;
  age?: number;
  gender?: string;
  created_at: string;
}

export interface DentalProfile {
  id: string;
  user_id: string;
  current_issues: string[];
  past_procedures: string[];
  allergies: string[];
  medications: string[];
  dentist_name?: string;
  dentist_contact?: string;
  insurance_info?: string;
}

export interface DailyRoutine {
  id: string;
  user_id: string;
  date: string;
  brushing_morning: boolean;
  brushing_night: boolean;
  brushing_duration?: number;
  flossed: boolean;
  mouthwash_used: boolean;
  water_intake?: number;
  sugary_foods?: number;
  pain_or_discomfort?: string;
  notes?: string;
}

export interface DoctorVisit {
  id: string;
  user_id: string;
  visit_date: string;
  doctor_name?: string;
  clinic_name?: string;
  procedure_done?: string;
  diagnosis?: string;
  recommendations?: string;
  next_appointment?: string;
  cost?: number;
  documents: string[];
  notes?: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface UserMemory {
  id: string;
  user_id: string;
  category: string;
  key_info: string;
  value: string;
  importance: number;
  created_at: string;
  updated_at: string;
}