import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';
import connectMongo from '@/app/lib/mongoConnect';
import { User } from '@/app/models/User';
import bcrypt from 'bcrypt';
import { ResultAsync, err } from 'neverthrow';
import { validateRequest } from '@/app/lib/validate';

const UserRole = ['admin', 'user'] as const;

const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(2, 'Username must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.enum(UserRole).default('user'),
  emailVerified: z.boolean().default(false),
});

export async function POST(req: NextRequest) {
  await connectMongo();
  const result = await validateRequest(req, registerSchema);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const { email, username, password, role, emailVerified } = result.data;

  const existingUser = await ResultAsync.fromPromise(
    User.findOne({ email }),
    (e) => err(e as Error)
  );

  if (existingUser.isErr()) {
    return NextResponse.json({ error: existingUser.error }, { status: 500 });
  }

  if (existingUser.value) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await ResultAsync.fromPromise(
    User.insertOne({
      username,
      email,
      password: hashedPassword,
      emailVerified,
      role,
    }),
    (e) => err(e as Error)
  );

  if (user.isErr()) {
    return NextResponse.json({ error: user.error }, { status: 500 });
  }

  return NextResponse.json(
    {
      message: 'User created successfully',
      data: {
        id: user.value._id,
        email: user.value.email,
        username: user.value.username,
        role: user.value.role,
        emailVerified: user.value.emailVerified,
      },
    },
    { status: 201 }
  );
}
