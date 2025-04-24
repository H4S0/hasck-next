import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
import {NextResponse} from "next/server";
import {User} from "@/app/models/User";

export const useHasckSession = async () => {
    const currectCookies = await cookies();
    const token = (await currectCookies).get('token')?.value as string;

    if (!token) {
        return NextResponse.json({ message: 'Invalid token!' });
    }

    jwt.verify(token, process.env.JWT_SECRET as string);
    const decode = jwt.decode(token);
    const parsed = typeof decode === 'string' ? JSON.parse(decode) : decode;

    const user = await User.findById(parsed.id)

    if(!user){
        console.log('not authenticated')
    }
    console.log(user)
}