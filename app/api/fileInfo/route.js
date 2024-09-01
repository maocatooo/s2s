import { content, write } from '@/app/data';
import { NextResponse } from 'next/server' 


export async function POST(req) { 
    const data = await req.json()
    const headers = new Headers();
    headers.append('Content-Type', 'application/octet-stream');
    headers.append('Content-Disposition', `attachment; filename=${data.m}`);
    const ct = content(data)

    return new NextResponse(ct, { headers });
}


export async function PUT(req) { 
    const s = req.headers.get('a-au')
    const m = req.headers.get('a-title')
    const data = await req.arrayBuffer()
    write({
        s,
        m,
        data:Buffer.from(data),
    })
    return new NextResponse("ok") 
}
