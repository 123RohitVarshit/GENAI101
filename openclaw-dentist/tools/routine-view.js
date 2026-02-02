#!/usr/bin/env node
// Tool: dentist_routine_view - View recent dental routines

import { getDailyRoutines, getOrCreateDefaultUser } from '../lib/db.js';

const args = process.argv.slice(2);
let days = 7;

// Parse days argument
const daysArg = args.find(arg => arg.startsWith('--days='));
if (daysArg) {
  days = parseInt(daysArg.replace('--days=', '')) || 7;
}

try {
  const user = getOrCreateDefaultUser();
  const routines = getDailyRoutines(user.id, days);
  
  if (routines.length === 0) {
    console.log(JSON.stringify({
      type: 'routines_list',
      count: 0,
      message: 'No routines found. Start logging with: /dentist routine',
      routines: []
    }));
    process.exit(0);
  }
  
  const formattedRoutines = routines.map(r => ({
    date: r.date,
    brushing: {
      morning: !!r.brushing_morning,
      night: !!r.brushing_night,
      duration: r.brushing_duration
    },
    flossed: !!r.flossed,
    mouthwash: !!r.mouthwash_used,
    waterIntake: r.water_intake,
    sugaryFoods: r.sugary_foods,
    pain: r.pain_or_discomfort,
    notes: r.notes
  }));
  
  // Calculate statistics
  const stats = {
    totalDays: routines.length,
    brushingMorning: routines.filter(r => r.brushing_morning).length,
    brushingNight: routines.filter(r => r.brushing_night).length,
    flossed: routines.filter(r => r.flossed).length,
    mouthwash: routines.filter(r => r.mouthwash_used).length,
    avgWater: Math.round(routines.reduce((sum, r) => sum + (r.water_intake || 0), 0) / routines.length),
    avgSugar: Math.round(routines.reduce((sum, r) => sum + (r.sugary_foods || 0), 0) / routines.length),
    painDays: routines.filter(r => r.pain_or_discomfort).length
  };
  
  console.log(JSON.stringify({
    type: 'routines_list',
    count: routines.length,
    days: days,
    statistics: stats,
    routines: formattedRoutines,
    message: `📊 Found ${routines.length} routines from the last ${days} days`
  }));
} catch (error) {
  console.error(JSON.stringify({
    success: false,
    error: error.message
  }));
  process.exit(1);
}