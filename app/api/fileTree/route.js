import {list} from "@/app/data"
import { NextResponse } from 'next/server' 

export async function POST(req) { 
    const data = await req.json()
    return NextResponse.json({list:list(data)}) 
}
