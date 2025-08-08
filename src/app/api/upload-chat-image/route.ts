import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Required for file uploads
  },
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

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/uploads
    const filename = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public/uploads", filename);
    await fs.writeFile(uploadDir, buffer);

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      path: `/uploads/${filename}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 }
    );
  }
}