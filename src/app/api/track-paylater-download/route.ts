import { NextRequest,NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
}
