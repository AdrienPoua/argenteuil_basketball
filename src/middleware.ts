import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/core/infrastructure/supabase/clients/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = await createClient()

  const pathname = request.nextUrl.pathname

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (user && pathname === '/login') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  if (!user && pathname === '/reset-password/update') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}
