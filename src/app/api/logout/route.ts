// src/app/api/logout/route.ts

import { NextResponse } from 'next/server';

export async function POST() {
  return new NextResponse(JSON.stringify({ success: true }), {
    headers: {
      'Set-Cookie': `session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0;`
    }
  });
}