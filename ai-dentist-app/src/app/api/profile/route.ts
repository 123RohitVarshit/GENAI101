import { NextResponse } from 'next/server';
import { createUser, getUser, createDentalProfile, getDentalProfile } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'createUser') {
      const { name, email, age, gender } = body;
      const userId = await createUser(name, email, age, gender);
      return NextResponse.json({ success: true, userId });
    }

    if (action === 'createProfile') {
      const { userId, profile } = body;
      const profileId = await createDentalProfile(userId, profile);
      return NextResponse.json({ success: true, profileId });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Profile API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
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

    const user = await getUser(userId);
    const profile = await getDentalProfile(userId);

    return NextResponse.json({ user, profile });
  } catch (error) {
    console.error('Profile GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}