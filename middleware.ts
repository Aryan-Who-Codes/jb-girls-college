import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_CONFIG } from './lib/auth/config'

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_CONFIG.SESSION_KEY)?.value
  
  if (request.nextUrl.pathname.startsWith('/api')) {
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/students/:path*',
    '/api/settings/:path*',
    '/api/fees/:path*', 
    '/api/payments/:path*',
    '/api/terms/:path*',
    '/api/form/:path*'
  ]
}
