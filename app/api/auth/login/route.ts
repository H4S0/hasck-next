import { NextRequest, NextResponse } from 'next/server';
import mongoConnect from '@/app/lib/mongoConnect';
import z from 'zod';
import { err, ResultAsync } from 'neverthrow';
import { User } from '@/app/models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validateRequest } from '@/app/lib/validate';
import { isAuthenticated } from '@/app/middleware/isAuthenticated';
import {useHasckClientSession} from "@/app/hook/useHasckClientSession";

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export async function POST(req: NextRequest, res: NextResponse) {
  await mongoConnect();
  const result = await validateRequest(req, loginSchema);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const { username, password } = result.data;

  const user = await ResultAsync.fromPromise(User.findOne({ username }), (e) =>
    err(e as Error)
  );

  if (user.isErr()) {
    return NextResponse.json({ error: user.error }, { status: 500 });
  }

  if (!user.value) {
    return NextResponse.json(
      { error: 'User does not exist!' },
      { status: 404 }
    );
  }

  const matchingPassword = await ResultAsync.fromPromise(
    bcrypt.compare(password, user.value.password),
    (e) => err(e as Error)
  );

  if (matchingPassword.isErr()) {
    return NextResponse.json(
      { error: matchingPassword.error },
      { status: 401 }
    );
  }

  if (!matchingPassword.value) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const jwtSecret = process.env.JWT_SECRET;
  //staviti u posebnu funckiju service folder
  //napraviti getEnv funkciju
  const JWT = jwt.sign(
    {
      id: user.value._id,
      username: user.value.username,
      email: user.value.email,
      role: user.value.role,
    },
    jwtSecret as string,
    { expiresIn: '1d' }
  );

  const response = NextResponse.json({
    message: 'User logged in successfully!',
  });

  response.cookies.set({
    name: 'token',
    value: JWT,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
    path: '/',
  });

  await isAuthenticated(req);
  return response;
}
