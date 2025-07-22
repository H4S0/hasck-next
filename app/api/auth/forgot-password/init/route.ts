import { User } from '@/app/models/User';
import connectMongo from '@/app/utils/mongoConnect';
import { validateRequest } from '@/app/utils/validate';
import { err, ResultAsync } from 'neverthrow';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';
import crypto from 'crypto';
import { Resend } from 'resend';
import {
  EmailTemplate,
  TemplateVariant,
} from '@/components/template/EmailTemplate';

const passwordResetSchema = z.object({
  email: z.string().email(),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function PUT(req: NextRequest) {
  await connectMongo();
  const result = await validateRequest(req, passwordResetSchema);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const { email } = result.data;

  const user = await ResultAsync.fromPromise(
    User.findOne({ email: email }),
    (e) => err(e as Error)
  );

  if (user.isErr()) {
    return NextResponse.json({ error: user.error }, { status: 500 });
  }

  if (!user.value) {
    return NextResponse.json({ error: 'User doesnt exists' }, { status: 400 });
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const updatedUser = await ResultAsync.fromPromise(
    User.findOneAndUpdate(
      { email: email },
      {
        passwordResetToken: hashedToken,
        passwordResetExpire: new Date(Date.now() + 15 * 60 * 1000),
      }
    ),
    (e) => err(e as Error)
  );

  if (updatedUser.isErr()) {
    return NextResponse.json({ error: updatedUser.error }, { status: 500 });
  }

  await resend.emails.send({
    from: 'Acme <hasck-next@resend.dev>',
    to: [`${updatedUser.value.email}`],
    subject: 'Password reset request',
    react: EmailTemplate({
      firstName: updatedUser.value.username,
      variant: TemplateVariant.emailUpdate,
      hashedToken: hashedToken,
    }),
  });

  return NextResponse.json(
    {
      message: 'Email updated successfully',
    },
    { status: 201 }
  );
}
