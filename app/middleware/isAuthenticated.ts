import { cookies } from 'next/headers'
import {NextRequest, NextResponse} from 'next/server'
import jwt from 'jsonwebtoken'

const protectedRoute = ['/dashboard']

export async function isAuthenticated(req: NextRequest){
    const currectCookies = await cookies()
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoute.includes(path)
    //dodati redirect za protectane rute

    const token = (await currectCookies).get('token')?.value as string

    if(!token){
        return NextResponse.json({ message: 'Invalid token!' })
    }

    jwt.verify(token, process.env.JWT_SECRET as string)
    const decode = jwt.decode(token)
    const parsed = typeof decode === "string" ? JSON.parse(decode) : decode;

    console.log(parsed)
    return NextResponse.next()
}
