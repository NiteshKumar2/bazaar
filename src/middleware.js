import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'
 

export async function middleware(req) {
  const path = req.nextUrl.pathname

  const isPrivatePath = path === '/createshop' || path === '/product' || path === '/updateshop'  

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if(isPrivatePath && !token) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
{/*
  if (!isPrivatePath && !token) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
  }*/}
    
}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/createshop',
    '/updateshop',
    '/product',
  ]
}