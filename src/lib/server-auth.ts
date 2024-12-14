// src/lib/server-auth.ts

import { cookies } from 'next/headers';
import { adminAuth } from './firebase-admin';

export async function getServerUser() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;

    if (!session) {
      return null;
    }

    try {
      const decodedToken = await adminAuth.verifySessionCookie(session);
      return decodedToken;
    } catch (error) {
      console.error('Error verifying session cookie:', error);
      return null;
    }
  } catch (error) {
    console.error('Error accessing cookies:', error);
    return null;
  }
}