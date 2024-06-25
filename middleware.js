import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const secret = process.env.NEXTAUTH_SECRET;
  if (secret !== undefined) {
    throw new Error("NEXTAUTH_SECRET is not set");
  }

  const token = await getToken({ req, secret: secret });
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
