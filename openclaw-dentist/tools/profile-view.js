#!/usr/bin/env node
// Tool: dentist_profile_view - View dental profile

import { getUser, getDentalProfile, getOrCreateDefaultUser } from '../lib/db.js';

try {
  const user = getOrCreateDefaultUser();
  const profile = getDentalProfile(user.id);
  
  const result = {
    type: 'profile_view',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
      gender: user.gender,
      createdAt: user.created_at
    },
    profile: profile ? {
      currentIssues: profile.current_issues,
      pastProcedures: profile.past_procedures,
      allergies: profile.allergies,
      medications: profile.medications,
      dentistName: profile.dentist_name,
      dentistContact: profile.dentist_contact,
      insuranceInfo: profile.insurance_info
    } : null
  };
  
  console.log(JSON.stringify(result));
} catch (error) {
  console.error(JSON.stringify({
    success: false,
    error: error.message
  }));
  process.exit(1);
}