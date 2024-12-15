// src/app/api/config/save/route.ts

import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';
import { z } from 'zod';

const configSchema = z.object({
  cnpj: z.string().min(14).max(14),
  vmhubToken: z.string().min(1),
  whatsappToken: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedClaims = await adminAuth.verifySessionCookie(session.value);
    
    if (!decodedClaims.uid) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = configSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    // Create a separate config document
    await adminDb
      .collection('users')
      .doc(decodedClaims.uid)
      .collection('config')
      .doc('settings')
      .set({
        ...validatedData.data,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Save config error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}