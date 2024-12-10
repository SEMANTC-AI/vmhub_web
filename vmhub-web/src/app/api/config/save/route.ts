// vmhub-web/src/app/api/config/save/route.ts

import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase-admin';
import { z } from 'zod';

const configSchema = z.object({
  cnpj: z.string().min(14).max(14),
  vmhubToken: z.string().min(1),
  whatsappToken: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie.value);
    
    if (!decodedClaims.uid) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = configSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    await adminDb
      .collection('configs')
      .doc(decodedClaims.uid)
      .set(validatedData.data, { merge: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Save config error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}