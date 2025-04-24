import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';

const protectedRoute = ['/dashboard'];

export async function isAuthenticated(req: NextRequest) {
  const currectCookies = await cookies();
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoute.includes(path);

  const token = (await currectCookies).get('token')?.value as string;

  if (!token) {
    return NextResponse.json({ message: 'Invalid token!' });
  }

  jwt.verify(token, process.env.JWT_SECRET as string);
  const decode = jwt.decode(token);
  const parsed = typeof decode === 'string' ? JSON.parse(decode) : decode;

  if (isProtectedRoute && !parsed.id) {
    return redirect('/login');
  }

  return NextResponse.next();
}
