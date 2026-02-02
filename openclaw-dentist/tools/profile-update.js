#!/usr/bin/env node
// Tool: dentist_profile_update - Update dental profile

import { createUser, createDentalProfile, getOrCreateDefaultUser, getDentalProfile } from '../lib/db.js';

const args = process.argv.slice(2);
let profileData = {};

// Parse arguments
const jsonArg = args.find(arg => arg.startsWith('--data='));
if (jsonArg) {
  try {
    profileData = JSON.parse(jsonArg.replace('--data=', ''));
  } catch (e) {
    console.error('Error parsing profile data:', e.message);
    process.exit(1);
  }
} else if (args.length > 0) {
  try {
    profileData = JSON.parse(args[0]);
  } catch (e) {
    console.error('Error parsing profile data:', e.message);
    process.exit(1);
  }
}

try {
  let user;
  
  // Check if we need to create a new user or update existing
  if (profileData.name) {
    // Create new user with profile
    const userId = createUser(
      profileData.name,
      profileData.email,
      profileData.age,
      profileData.gender
    );
    user = { id: userId, name: profileData.name };
    
    // Create dental profile
    createDentalProfile(userId, {
      currentIssues: profileData.currentIssues || [],
      pastProcedures: profileData.pastProcedures || [],
      allergies: profileData.allergies || [],
      medications: profileData.medications || [],
      dentistName: profileData.dentistName,
      dentistContact: profileData.dentistContact,
      insuranceInfo: profileData.insuranceInfo
    });
    
    console.log(JSON.stringify({
      success: true,
      message: `✅ Profile created for ${profileData.name}`,
      userId: userId
    }));
  } else {
    // Update existing user
    user = getOrCreateDefaultUser();
    const existingProfile = getDentalProfile(user.id);
    
    if (!existingProfile) {
      createDentalProfile(user.id, {
        currentIssues: profileData.currentIssues || [],
        pastProcedures: profileData.pastProcedures || [],
        allergies: profileData.allergies || [],
        medications: profileData.medications || [],
        dentistName: profileData.dentistName,
        dentistContact: profileData.dentistContact,
        insuranceInfo: profileData.insuranceInfo
      });
    }
    
    console.log(JSON.stringify({
      success: true,
      message: `✅ Profile updated for ${user.name}`,
      userId: user.id
    }));
  }
} catch (error) {
  console.error(JSON.stringify({
    success: false,
    error: error.message
  }));
  process.exit(1);
}