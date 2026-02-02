#!/usr/bin/env node
// Tool: dentist_visit_list - List all doctor visits

import { getDoctorVisits, getOrCreateDefaultUser } from '../lib/db.js';

try {
  const user = getOrCreateDefaultUser();
  const visits = getDoctorVisits(user.id);
  
  if (visits.length === 0) {
    console.log(JSON.stringify({
      type: 'visits_list',
      count: 0,
      message: '📋 No doctor visits recorded. Add one with: /dentist visit add',
      visits: []
    }));
    process.exit(0);
  }
  
  const formattedVisits = visits.map(v => ({
    id: v.id,
    visitDate: v.visit_date,
    doctorName: v.doctor_name,
    clinicName: v.clinic_name,
    procedure: v.procedure_done,
    diagnosis: v.diagnosis,
    recommendations: v.recommendations,
    nextAppointment: v.next_appointment,
    cost: v.cost,
    notes: v.notes
  }));
  
  console.log(JSON.stringify({
    type: 'visits_list',
    count: visits.length,
    visits: formattedVisits,
    message: `📋 Found ${visits.length} doctor visit(s)`
  }));
} catch (error) {
  console.error(JSON.stringify({
    success: false,
    error: error.message
  }));
  process.exit(1);
}