import { User } from '@/app/models/User';
import connectMongo from '@/app/utils/mongoConnect';
import { validateRequest } from '@/app/utils/validate';
import {
  EmailTemplate,
  TemplateVariant,
} from '@/components/template/EmailTemplate';
import { err, ResultAsync } from 'neverthrow';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import z from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const emailSchema = z.object({
  oldEmail: z.string().email(),
  newEmail: z.string().email(),
});

export async function PUT(req: NextRequest) {
  await connectMongo();
  const result = await validateRequest(req, emailSchema);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  const { oldEmail, newEmail } = result.data;

  const existingUser = await ResultAsync.fromPromise(
    User.findOne({ email: oldEmail }),
    (e) => err(e as Error)
  );

  if (existingUser.isErr()) {
    return NextResponse.json({ error: existingUser.error }, { status: 500 });
  }

  if (!existingUser.value) {
    return NextResponse.json({ error: 'User doesnt exists' }, { status: 400 });
  }

  const newEmailExisting = await ResultAsync.fromPromise(
    User.findOne({ email: newEmail }),
    (e) => err(e as Error)
  );

  if (newEmailExisting.isErr()) {
    return NextResponse.json(
      { error: newEmailExisting.error },
      { status: 500 }
    );
  }

  if (newEmailExisting.value) {
    return NextResponse.json(
      { error: 'Email is already in use' },
      { status: 400 }
    );
  }

  if (newEmail === oldEmail) {
    return NextResponse.json(
      { error: 'Please enter the different email' },
      { status: 400 }
    );
  }

  const updated = await ResultAsync.fromPromise(
    User.findOneAndUpdate({ email: oldEmail }, { email: newEmail }),
    (e) => err(e as Error)
  );

  if (updated.isErr()) {
    return NextResponse.json({ error: updated.error }, { status: 500 });
  }

  await resend.emails.send({
    from: 'Acme <hasck-next@resend.dev>',
    to: [`${updated.value.email}`],
    subject: 'Your email was updated successfully',
    react: EmailTemplate({
      firstName: updated.value.username,
      variant: TemplateVariant.emailUpdate,
      updatedEmail: newEmail,
    }),
  });

  return NextResponse.json(
    {
      message: 'Email updated successfully',
    },
    { status: 201 }
  );
}
