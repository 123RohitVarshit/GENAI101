import { NextResponse } from 'next/server';
import { saveDoctorVisit, getDoctorVisits } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { userId, visit } = await request.json();

    if (!userId || !visit) {
      return NextResponse.json(
        { error: 'Missing userId or visit data' },
        { status: 400 }
      );
    }

    const visitId = await saveDoctorVisit(userId, visit);

    return NextResponse.json({ 
      success: true, 
      visitId 
    });
  } catch (error) {
    console.error('Visit API error:', error);
    return NextResponse.json(
      { error: 'Failed to save visit' },
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

    const visits = await getDoctorVisits(userId);
    return NextResponse.json({ visits });
  } catch (error) {
    console.error('Visit GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visits' },
      { status: 500 }
    );
  }
}