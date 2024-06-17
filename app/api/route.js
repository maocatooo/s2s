import { NextResponse } from 'next/server' 

const version = '1.0.0'

export async function GET() { 
    return NextResponse.json({ version }) 
}
