import { useHasckSession } from "@/app/hook/useHasckSession"
import {NextResponse} from "next/server";

export async function GET(){
    await useHasckSession()

    return NextResponse.json('bla')
}