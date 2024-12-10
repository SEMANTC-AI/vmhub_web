import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session');

  // pages that don't require authentication
  if (
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/signup')
  ) {
    if (session) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // check if the session is valid
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // validate the session
    const decodedToken = await adminAuth.verifySessionCookie(session.value);
    const user = await adminAuth.getUser(decodedToken.uid);

    if (!user) {
      throw new Error('User not found');
    }

    return NextResponse.next();
  } catch (error) {
    // if session is invalid, remove it and redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)'
  ]
};