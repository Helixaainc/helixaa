import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    

       return new NextResponse(JSON.stringify({ success: true, path: "/uploads/1754642190268-OIP.jpg" }), {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    });


}