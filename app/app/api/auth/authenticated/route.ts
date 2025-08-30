import { getHasckServerSession } from '@/app/services/getHasckServerSession';
import { NextResponse } from 'next/server';

export async function GET() {
  const { user, isAuthenticated } = await getHasckServerSession();

  if (!isAuthenticated || !user) {
    return NextResponse.json({
      user: null,
      isAuthenticated: false,
      error: 'User not found',
    });
  }

  return NextResponse.json({
    user,
    isAuthenticated: true,
  });
}
