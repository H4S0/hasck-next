import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';
import connectMongo from '@/app/utils/mongoConnect';
import { User } from '@/app/models/User';
import { hash } from 'bcrypt-ts';
import { ResultAsync, err } from 'neverthrow';
import { validateRequest } from '@/app/utils/validate';
import { Resend } from 'resend';
import {
  EmailTemplate,
  TemplateVariant,
} from '@/components/template/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export const UserRole = ['admin', 'user'] as const;

const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(4, 'Username must be at least 2 characters'),
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

  const hashedPassword = await hash(password, 12);

  const user = await ResultAsync.fromPromise(
    User.insertOne({
      _id: crypto.randomUUID().toString(),
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

  await resend.emails.send({
    from: 'Acme <hasck-next@resend.dev>',
    to: [`${user.value.email}`],
    subject: 'You successfully registerd',
    react: EmailTemplate({
      firstName: user.value.firstName,
      variant: TemplateVariant.registration,
    }),
  });

  return NextResponse.json(
    {
      message: 'User created successfully',
      data: {
        email: user.value.email,
        username: user.value.username,
        role: user.value.role,
        emailVerified: user.value.emailVerified,
      },
    },
    { status: 201 }
  );
}
