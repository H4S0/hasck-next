import {NextRequest, NextResponse} from "next/server";
import {validateRequest} from "@/app/middleware";
import z from 'zod'

const UserRole = ['admin','user'] as const

const registerSchema = z.object({
    email: z.string().email(),
    username: z.string().min(2, 'Username must be at least 2 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    role: z.enum(UserRole).default('user'),
    emailVerified: z.boolean().default(false),
})

export async function POST(req: NextRequest, res: NextResponse) {
    const result = await validateRequest(req, registerSchema);

    if(!result.success) {
        return NextResponse.json({error: result.error }, {status: 400})
    }

    const {email, username, password, role, emailVerified} = result.data;

    return NextResponse.json({data: email, username, password, role, emailVerified})
}