import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
// Vercel Cron (vercel.json) hits this daily: refreshes the AI horoscope cache and the date-seeded pages.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) return NextResponse.json({ ok: false }, { status: 401 });
  revalidateTag("horoscopes"); revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, at: new Date().toISOString() });
}
