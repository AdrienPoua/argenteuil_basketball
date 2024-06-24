import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  console.log("putin de middleware")

  if (pathname.startsWith('/admin') && !token) {
    return NextResponse.redirect('/auth/signin');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], // Routes protégées
};
