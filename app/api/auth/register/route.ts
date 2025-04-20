import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/app/middleware";
import z from 'zod';
import connectMongo from "@/app/lib/mongoConnect";
import { User } from "@/app/models/User";
import bcrypt from 'bcrypt';

const UserRole = ['admin', 'user'] as const;

const registerSchema = z.object({
    email: z.string().email(),
    username: z.string().min(2, 'Username must be at least 2 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
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

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return NextResponse.json({ error: 'User with that email already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.insertOne({
        username,
        email,
        password: hashedPassword,
        emailVerified,
        role,
    });

    if (!user) {
        return NextResponse.json({ error: 'Error while creating user, please contact support!' }, { status: 500 });
    }

    return NextResponse.json({
        message: 'User created successfully',
        data: {
            id: user._id,
            email: user.email,
            username: user.username,
            role: user.role,
            emailVerified: user.emailVerified,
        },
    }, { status: 201 });
}
