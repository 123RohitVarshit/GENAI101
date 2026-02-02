#!/usr/bin/env node
// Tool: dentist_visit_add - Add doctor visit record

import { saveDoctorVisit, getOrCreateDefaultUser } from '../lib/db.js';

const args = process.argv.slice(2);
let visitData = {};

// Parse arguments
const jsonArg = args.find(arg => arg.startsWith('--data='));
if (jsonArg) {
  try {
    visitData = JSON.parse(jsonArg.replace('--data=', ''));
  } catch (e) {
    console.error('Error parsing visit data:', e.message);
    process.exit(1);
  }
} else if (args.length > 0) {
  try {
    visitData = JSON.parse(args[0]);
  } catch (e) {
    console.error('Error parsing visit data:', e.message);
    process.exit(1);
  }
} else {
  console.log(JSON.stringify({
    type: 'help',
    message: 'Usage: dentist_visit_add --data=<json>'
  }));
  process.exit(0);
}

// Ensure visit date is set
if (!visitData.visitDate) {
  visitData.visitDate = new Date().toISOString().split('T')[0];
}

try {
  const user = getOrCreateDefaultUser();
  const visitId = saveDoctorVisit(user.id, visitData);
  
  console.log(JSON.stringify({
    success: true,
    visitId,
    message: `✅ Doctor visit recorded for ${visitData.visitDate}`,
    summary: {
      date: visitData.visitDate,
      doctor: visitData.doctorName,
      clinic: visitData.clinicName,
      procedure: visitData.procedureDone,
      nextAppointment: visitData.nextAppointment
    }
  }));
} catch (error) {
  console.error(JSON.stringify({
    success: false,
    error: error.message
  }));
  process.exit(1);
}