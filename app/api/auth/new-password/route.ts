import { getHasckServerSession } from '@/app/services/getHasckServerSession';
import connectMongo from '@/app/utils/mongoConnect';
import { validateRequest } from '@/app/utils/validate';
import { err, ResultAsync } from 'neverthrow';
import { User } from '@/app/models/User';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  EmailTemplate,
  TemplateVariant,
} from '@/components/template/EmailTemplate';
import { Resend } from 'resend';
import { compare, hash } from 'bcrypt-ts';

const resend = new Resend(process.env.RESEND_API_KEY);

const newPasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
});

export async function PUT(req: NextRequest) {
  await connectMongo();
  const user = await getHasckServerSession();

  if (!user.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const result = await validateRequest(req, newPasswordSchema);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  const { oldPassword, newPassword } = result.data;

  const existingUser = await ResultAsync.fromPromise(
    User.findOne({ email: user.user.email }),
    (e) => err(e as Error)
  );

  if (existingUser.isErr()) {
    return NextResponse.json({ error: existingUser.error }, { status: 500 });
  }

  if (!existingUser.value) {
    return NextResponse.json({ error: 'User does not exist' }, { status: 400 });
  }

  const matchingPassword = await ResultAsync.fromPromise(
    compare(oldPassword, existingUser.value.password),
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

  const hashedPassword = await hash(newPassword, 12);

  const updated = await ResultAsync.fromPromise(
    User.findOneAndUpdate(
      { email: existingUser.value.email },
      { password: hashedPassword }
    ),
    (e) => err(e as Error)
  );

  if (updated.isErr()) {
    return NextResponse.json({ error: updated.error }, { status: 500 });
  }

  await resend.emails.send({
    from: 'Acme <hasck-next@resend.dev>',
    to: [`${updated.value.email}`],
    subject: 'Your password was updated successfully',
    react: EmailTemplate({
      firstName: updated.value.username,
      variant: TemplateVariant.emailUpdate,
    }),
  });

  return NextResponse.json(
    { message: 'Password updated successful' },
    { status: 200 }
  );
}
