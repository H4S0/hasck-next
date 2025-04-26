import { useHasckServerSession } from '@/app/hook/getHasckServerSession';

export async function GET() {
  const { user, isAuthenticated } = await useHasckServerSession();

  if (!isAuthenticated) {
    return { user: null, isAuthenticated: false, error: 'User not found' };
  }

  return { user, isAuthenticated: true };
}
