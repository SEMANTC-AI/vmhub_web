// vmhub-web/src/app/api/login/route.ts

import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  const { idToken } = await request.json();

  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    return new NextResponse(JSON.stringify({ success: true }), {
      headers: {
        'Set-Cookie': `session=${sessionCookie}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${expiresIn};`
      }
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401 }
    );
  }
}