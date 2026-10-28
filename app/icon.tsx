import { ImageResponse } from "next/og";
import { Monogram, serifFonts } from "@/lib/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(<Monogram size={64} />, { ...size, fonts: await serifFonts() });
}
