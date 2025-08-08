import { NextRequest, NextResponse } from "next/server";
import { put } from '@vercel/blob';

export const config = {
  api: { bodyParser: false },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob
    const { url } = await put(file.name, file, {
      access: 'public',
      token:process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN
    });

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      path: url, // Cloud URL
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: `Upload failed: ${error}` },
      { status: 500 }
    );
  }
}