// vmhub-web/src/app/api/campaigns/save/route.ts

import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';
import { z } from 'zod';

const campaignSchema = z.object({
  campaignType: z.enum(['birthday', 'welcome', 'reactivation', 'loyalty']),
  enabled: z.boolean(),
  message: z.string().min(1),
  coupon: z.string().optional(),
  settings: z.object({
    // Birthday specific
    sendTime: z.string().optional(),
    
    // Reactivation specific
    inactiveDays: z.number().optional(),
    couponValidityDays: z.number().optional(),
    
    // Welcome specific
    welcomeDelay: z.number().optional(),
    
    // Loyalty specific
    minimumPurchase: z.number().optional(),
    evaluationPeriod: z.number().optional(),
    vipDiscount: z.number().optional(),
  }).optional(),
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
    const validatedData = campaignSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    // Save to Firestore
    await adminDb
      .collection('users')
      .doc(decodedClaims.uid)
      .collection('campaigns')
      .doc(validatedData.data.campaignType)
      .set({
        ...validatedData.data,
        lastUpdated: new Date(),
      }, { merge: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Save campaign error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}