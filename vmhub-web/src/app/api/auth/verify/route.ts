// vmhub-web/src/app/api/auth/verify/route.ts

import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');

    if (!session) {
      return NextResponse.json({ isValid: false }, { status: 401 });
    }

    const decodedToken = await adminAuth.verifySessionCookie(session.value);
    const user = await adminAuth.getUser(decodedToken.uid);

    if (!user) {
      return NextResponse.json({ isValid: false }, { status: 401 });
    }

    return NextResponse.json({ 
      isValid: true, 
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Session verification error:', error);
    return NextResponse.json({ isValid: false }, { status: 401 });
  }
}