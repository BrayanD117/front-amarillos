import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('tokenAcceso')?.value
  const { pathname } = request.nextUrl

  const isPrivatePath = pathname.startsWith('/admin') ||
    pathname.startsWith('/conductor') ||
    pathname.startsWith('/vehiculos')

  if (!token && isPrivatePath) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret)
      const rol = payload.rol

      if (rol === 'admin' && pathname.startsWith('/conductor')) {
        return NextResponse.redirect(new URL('/admin/panel', request.url))
      }

      if (rol === 'conductor' && pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/conductor/panel', request.url))
      }

    } catch (error) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*', '/conductor/:path*', '/vehiculos/:path*']
}  