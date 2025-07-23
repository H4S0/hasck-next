import { cookies } from 'next/headers';
import z from 'zod';
import { User } from '@/app/models/User';
import { tokenParsing } from '@/app/services/token-parse';
import { UserRole } from '../api/auth/register/route';

export const userSchema = z.object({
  username: z.string().min(2),
  password: z.string().min(8),
  email: z.string().email(),
  emailVerified: z.string(),
  role: z.enum(UserRole).default('user'),
});

export type userSchemaType = z.infer<typeof userSchema>;

export interface SessionResult {
  user: userSchemaType | null;
  isAuthenticated: boolean;
  error?: string;
}

export const getHasckServerSession = async (): Promise<SessionResult> => {
  try {
    const token = (await cookies()).get('token')?.value;

    if (!token) {
      return { user: null, isAuthenticated: false, error: 'Token not found' };
    }

    const parsed = tokenParsing(token);
    const user = await User.findById(parsed.id);

    if (!user) {
      return { user: null, isAuthenticated: false, error: 'User not found' };
    }
    return { user, isAuthenticated: true };
  } catch (err) {
    return {
      user: null,
      isAuthenticated: false,
      error: 'Invalid or expired token',
    };
  }
};
