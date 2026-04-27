import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { geo } = request;
  const city = geo?.city || 'the world';
  const country = geo?.country || '';

  const response = NextResponse.next();
  
  // Set headers so our app can read the location info
  response.headers.set('x-user-city', city);
  response.headers.set('x-user-country', country);
  
  return response;
}

// Only run middleware on the home page to save performance
export const config = {
  matcher: '/',
};
