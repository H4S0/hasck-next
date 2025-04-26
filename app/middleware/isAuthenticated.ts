import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { tokenParsing } from '@/app/services/token-parse';

const protectedRoute = ['/dashboard'];

export async function isAuthenticated(req: NextRequest) {
  const currectCookies = await cookies();
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoute.includes(path);

  const token = (await currectCookies).get('token')?.value as string;

  if (!token) {
    return NextResponse.json({ message: 'Invalid token!' });
  }

  const parsed = tokenParsing(token);

  if (isProtectedRoute && !parsed.id) {
    return redirect('/login');
  }

  return NextResponse.next();
}
