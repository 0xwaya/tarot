import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
// Vercel Cron (vercel.json) hits this daily: refreshes the AI horoscope cache and the date-seeded pages.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  // Fail closed: no secret configured means nobody can trigger it.
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) return NextResponse.json({ ok: false }, { status: 401 });
  revalidateTag("horoscopes"); revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, at: new Date().toISOString() });
}
