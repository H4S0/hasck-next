import { User } from '@/app/models/User';
import connectMongo from '@/app/utils/mongoConnect';
import { validateRequest } from '@/app/utils/validate';
import { err, ResultAsync } from 'neverthrow';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';
import crypto from 'crypto';
import { hash } from 'bcrypt-ts';
import {
  EmailTemplate,
  TemplateVariant,
} from '@/components/template/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const resetPasswordSchema = z.object({
  password: z.string().min(6),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  await connectMongo();

  const token = await params.token;

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  const result = await validateRequest(req, resetPasswordSchema);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await ResultAsync.fromPromise(
    User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpire: { $gt: new Date() },
    }),
    (e) => err(e as Error)
  );

  if (user.isErr()) {
    return NextResponse.json({ error: user.error }, { status: 500 });
  }

  if (!user.value) {
    return NextResponse.json(
      { error: 'Token is invalid or expired' },
      { status: 400 }
    );
  }

  const hashedPassword = await hash(result.data.password, 12);

  const updated = await ResultAsync.fromPromise(
    User.findByIdAndUpdate(
      user.value._id,
      {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpire: null,
      },
      { new: true }
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
      variant: TemplateVariant.passwordUpdate,
    }),
  });

  return NextResponse.json(
    { message: 'Password reset successful' },
    { status: 200 }
  );
}
