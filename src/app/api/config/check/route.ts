// src/app/api/config/check/route.ts

import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase-admin';

export async function GET() {
  try {
    // Get and verify session
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) {
      return NextResponse.json({ hasConfig: false }, { status: 401 });
    }

    // Verify the session cookie
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie.value);
    
    if (!decodedClaims.uid) {
      return NextResponse.json({ hasConfig: false }, { status: 401 });
    }

    // Check if user has config
    const configDoc = await adminDb
      .collection('configs')
      .doc(decodedClaims.uid)
      .get();

    const configData = configDoc.data();
    
    return NextResponse.json({ 
      hasConfig: Boolean(configData?.cnpj && configData?.vmhubToken && configData?.whatsappToken)
    });

  } catch (error) {
    console.error('Config check error:', error);
    return NextResponse.json({ 
      hasConfig: false, 
      error: 'Failed to check configuration' 
    }, { 
      status: 500 
    });
  }
}