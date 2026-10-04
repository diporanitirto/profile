import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const imagesDir = path.join(process.cwd(), "public", "assets", "images");

  try {
    const files = fs.readdirSync(imagesDir);
    const images = files
      .filter((file) => /\.jpe?g$/i.test(file))
      .map((file) => `/assets/images/${file}`);

    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
