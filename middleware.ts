import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const geo = (request as any).geo;
  const city = geo?.city || 'the world';
  const country = geo?.country || '';

  // To pass headers to the page components, we must set them on the REQUEST
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-city', city);
  requestHeaders.set('x-user-country', country);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: '/',
};
