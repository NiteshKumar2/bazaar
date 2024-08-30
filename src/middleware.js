import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'
 

export async function middleware(req) {
  const path = req.nextUrl.pathname

  const isPublicPath = path === '/auth/login' || path === '/auth/signup' 

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
  }
    
}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/auth/login',
    '/auth/signup',
    '/auth/verifyemail'
  ]
}