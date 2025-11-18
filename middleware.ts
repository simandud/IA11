import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// GDPR compliance headers
const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Rate limiting for API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    const ip = request.ip || 'anonymous'
    const now = Date.now()
    const windowMs = 15 * 60 * 1000 // 15 minutes
    const maxRequests = 100

    const rateLimit = rateLimitMap.get(ip)

    if (rateLimit) {
      if (now < rateLimit.resetTime) {
        if (rateLimit.count >= maxRequests) {
          return NextResponse.json(
            {
              success: false,
              error: 'Rate limit exceeded. Please try again later.',
            },
            {
              status: 429,
              headers: {
                'X-RateLimit-Limit': maxRequests.toString(),
                'X-RateLimit-Remaining': '0',
                'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
              },
            }
          )
        }
        rateLimit.count++
      } else {
        rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
      }
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    }

    const currentLimit = rateLimitMap.get(ip)!
    response.headers.set('X-RateLimit-Limit', maxRequests.toString())
    response.headers.set(
      'X-RateLimit-Remaining',
      Math.max(0, maxRequests - currentLimit.count).toString()
    )
    response.headers.set(
      'X-RateLimit-Reset',
      new Date(currentLimit.resetTime).toISOString()
    )
  }

  // CORS headers for API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    response.headers.set('Access-Control-Allow-Credentials', 'true')
    response.headers.set('Access-Control-Allow-Origin', '*') // Configure this based on your needs
    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET,DELETE,PATCH,POST,PUT'
    )
    response.headers.set(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    )
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
