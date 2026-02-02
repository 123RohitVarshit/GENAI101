import { NextResponse } from 'next/server';
import { saveDailyRoutine, getDailyRoutines, analyzeDentalRoutine } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { userId, routine } = await request.json();

    if (!userId || !routine) {
      return NextResponse.json(
        { error: 'Missing userId or routine data' },
        { status: 400 }
      );
    }

    // Save the routine
    const routineId = await saveDailyRoutine(userId, routine);

    // Get recent routines for analysis
    const recentRoutines = await getDailyRoutines(userId, 7);
    
    // Get AI analysis
    const analysis = await analyzeDentalRoutine({
      today: routine,
      recentHistory: recentRoutines
    });

    return NextResponse.json({ 
      success: true, 
      routineId,
      analysis 
    });
  } catch (error) {
    console.error('Routine API error:', error);
    return NextResponse.json(
      { error: 'Failed to save routine' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId' },
        { status: 400 }
      );
    }

    const routines = await getDailyRoutines(userId, 30);
    return NextResponse.json({ routines });
  } catch (error) {
    console.error('Routine GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch routines' },
      { status: 500 }
    );
  }
}