import {NextResponse} from 'next/server'

export async function isAuthenticated(){
    return NextResponse.next()
}
