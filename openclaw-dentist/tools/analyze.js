#!/usr/bin/env node
// Tool: dentist_analyze - Analyze dental health and provide insights

import { getDailyRoutines, getDoctorVisits, getOrCreateDefaultUser, getDentalProfile } from '../lib/db.js';

const args = process.argv.slice(2);
let days = 30;

const daysArg = args.find(arg => arg.startsWith('--days='));
if (daysArg) {
  days = parseInt(daysArg.replace('--days=', '')) || 30;
}

try {
  const user = getOrCreateDefaultUser();
  const profile = getDentalProfile(user.id);
  const routines = getDailyRoutines(user.id, days);
  const visits = getDoctorVisits(user.id);
  
  if (routines.length === 0) {
    console.log(JSON.stringify({
      type: 'analysis',
      message: 'No routine data available for analysis. Start logging your daily routines with: /dentist routine'
    }));
    process.exit(0);
  }
  
  // Calculate statistics
  const stats = {
    totalDays: routines.length,
    brushingMorning: {
      count: routines.filter(r => r.brushing_morning).length,
      percentage: Math.round((routines.filter(r => r.brushing_morning).length / routines.length) * 100)
    },
    brushingNight: {
      count: routines.filter(r => r.brushing_night).length,
      percentage: Math.round((routines.filter(r => r.brushing_night).length / routines.length) * 100)
    },
    bothBrushings: {
      count: routines.filter(r => r.brushing_morning && r.brushing_night).length,
      percentage: Math.round((routines.filter(r => r.brushing_morning && r.brushing_night).length / routines.length) * 100)
    },
    flossing: {
      count: routines.filter(r => r.flossed).length,
      percentage: Math.round((routines.filter(r => r.flossed).length / routines.length) * 100)
    },
    mouthwash: {
      count: routines.filter(r => r.mouthwash_used).length,
      percentage: Math.round((routines.filter(r => r.mouthwash_used).length / routines.length) * 100)
    },
    avgWaterIntake: Math.round(routines.reduce((sum, r) => sum + (r.water_intake || 0), 0) / routines.length),
    avgSugaryFoods: Math.round(routines.reduce((sum, r) => sum + (r.sugary_foods || 0), 0) / routines.length),
    painDays: routines.filter(r => r.pain_or_discomfort).length,
    recentPain: routines.slice(0, 7).filter(r => r.pain_or_discomfort).length
  };
  
  // Generate insights
  const insights = [];
  
  if (stats.bothBrushings.percentage >= 80) {
    insights.push({ type: 'positive', message: 'Excellent brushing habits! You\'re brushing twice daily consistently.' });
  } else if (stats.bothBrushings.percentage >= 50) {
    insights.push({ type: 'improvement', message: 'Good progress on brushing. Try to brush twice daily for optimal dental health.' });
  } else {
    insights.push({ type: 'action', message: 'Consider establishing a more regular brushing routine - twice daily is recommended.' });
  }
  
  if (stats.flossing.percentage >= 70) {
    insights.push({ type: 'positive', message: 'Great flossing habits! This helps prevent gum disease.' });
  } else if (stats.flossing.percentage < 30) {
    insights.push({ type: 'improvement', message: 'Flossing can significantly improve gum health. Consider adding it to your routine.' });
  }
  
  if (stats.avgSugaryFoods > 5) {
    insights.push({ type: 'warning', message: 'High sugar intake detected. This may increase cavity risk.' });
  }
  
  if (stats.recentPain > 0) {
    insights.push({ type: 'action', message: `You've reported pain on ${stats.recentPain} day(s) recently. Consider scheduling a dental check-up.` });
  }
  
  if (visits.length === 0) {
    insights.push({ type: 'reminder', message: 'No doctor visits recorded. Regular check-ups are recommended every 6 months.' });
  } else {
    const lastVisit = new Date(visits[0].visit_date);
    const daysSince = Math.floor((new Date() - lastVisit) / (1000 * 60 * 60 * 24));
    if (daysSince > 180) {
      insights.push({ type: 'reminder', message: `It's been ${daysSince} days since your last dental visit. Consider scheduling a check-up.` });
    }
  }
  
  console.log(JSON.stringify({
    type: 'analysis',
    days: days,
    statistics: stats,
    insights: insights,
    profile: profile ? {
      currentIssues: profile.current_issues,
      pastProcedures: profile.past_procedures
    } : null,
    message: `📊 Dental Health Analysis (${days} days)`
  }));
} catch (error) {
  console.error(JSON.stringify({
    success: false,
    error: error.message
  }));
  process.exit(1);
}