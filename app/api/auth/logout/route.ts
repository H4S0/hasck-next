import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully' });

  response.cookies.set({
    name: 'token',
    value: '',
    path: '/',
    httpOnly: true,
    maxAge: 0,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return response;
}
