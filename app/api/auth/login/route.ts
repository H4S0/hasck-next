import {NextRequest, NextResponse} from "next/server";
import mongoConnect from "@/app/lib/mongoConnect";
import {validateRequest} from "@/app/middleware";
import z from "zod";
import {err, ResultAsync} from "neverthrow";
import {User} from "@/app/models/User";
import bcrypt from "bcrypt";

const loginSchema = z.object({
    username: z.string().min(2, 'Username must be at least 2 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(req: NextRequest) {
    await mongoConnect()
    const result = await validateRequest(req,loginSchema)

    if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const { username, password } = result.data;

    const user = await ResultAsync.fromPromise(User.findOne({username}), (e) => err(e as Error))

    if(user.isErr()){
        return NextResponse.json({ error: user.error }, { status: 500 })
    }

    if(!user.value){
        return NextResponse.json({error: 'User does not exist!'}, {status: 404})
    }

    const matchingPassword = await ResultAsync.fromPromise(bcrypt.compare(password, user.value.password), (e) => err(e as Error))

    if(matchingPassword.isErr()){
        return NextResponse.json({error: matchingPassword.error}, {status: 401})
    }

    if(!matchingPassword.value){
        return NextResponse.json({error: 'Invalid credentials'}, {status: 401})
    }
}