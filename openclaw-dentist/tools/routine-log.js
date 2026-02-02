#!/usr/bin/env node
// Tool: dentist_routine_log - Log daily dental routine

import { saveDailyRoutine, getOrCreateDefaultUser } from '../lib/db.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Parse arguments
const args = process.argv.slice(2);
let routineData = {};

// Check if data is passed as JSON string
const jsonArg = args.find(arg => arg.startsWith('--data='));
if (jsonArg) {
  try {
    routineData = JSON.parse(jsonArg.replace('--data=', ''));
  } catch (e) {
    console.error('Error parsing routine data:', e.message);
    process.exit(1);
  }
} else if (args.length > 0) {
  // Try to parse first arg as JSON
  try {
    routineData = JSON.parse(args[0]);
  } catch (e) {
    console.error('Error parsing routine data:', e.message);
    process.exit(1);
  }
} else {
  // Load questions and output them for interactive use
  const questions = JSON.parse(readFileSync(join(__dirname, '..', 'config', 'questions.json'), 'utf8'));
  console.log(JSON.stringify({
    type: 'interactive_questions',
    questions: questions.routineQuestions
  }));
  process.exit(0);
}

// Ensure date is set
if (!routineData.date) {
  routineData.date = new Date().toISOString().split('T')[0];
}

try {
  const user = getOrCreateDefaultUser();
  const routineId = saveDailyRoutine(user.id, routineData);
  
  console.log(JSON.stringify({
    success: true,
    routineId,
    message: `✅ Daily routine logged for ${routineData.date}`,
    summary: {
      date: routineData.date,
      brushing: (routineData.brushingMorning ? 'morning ' : '') + (routineData.brushingNight ? 'night' : ''),
      flossed: routineData.flossed,
      mouthwash: routineData.mouthwashUsed
    }
  }));
} catch (error) {
  console.error(JSON.stringify({
    success: false,
    error: error.message
  }));
  process.exit(1);
}