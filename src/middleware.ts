// import withAuth from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token');
  // let headers = new Headers(request.headers);
  // const token = await getToken({ req: request, secret: process.env.SECRET });

  console.log('🚀 ~ middleware ~ token:', token);

  if (!token) return NextResponse.redirect(new URL('/denied', request.url));

  console.log('Pathname:', request.nextUrl.pathname);
  console.log('Token Role:', token.role);

  if (
    !request.nextUrl.pathname.startsWith('/manager') &&
    token.role === 'manager'
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next(); // Allow the request to proceed
}
// {
//   callbacks: {
//     authorized: ({ token }) => !!token,
//   }
// }

export const config = {
  matcher: ['/manager/:path*', '/my/:path*']
};
