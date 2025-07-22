import { User } from '@/app/models/User';
import connectMongo from '@/app/utils/mongoConnect';
import { validateRequest } from '@/app/utils/validate';
import { EmailUpdateSchema } from '@/components/forms/update-email-form';
import { EmailTemplate } from '@/components/template/EmailTemplate';
import { err, ResultAsync } from 'neverthrow';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  await connectMongo();
  const result = await validateRequest(req, EmailUpdateSchema);

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

  //napraviti full reusable template
  await resend.emails.send({
    from: 'Acme <hasck-next@resend.dev>',
    to: [`${newEmail}`],
    subject: 'You successfully registerd',
    react: EmailTemplate({ firstName: `${existingUser.value.username}` }),
  });
}
