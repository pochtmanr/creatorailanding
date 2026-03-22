import { NextResponse, NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const VALID_LOCALES = ["en", "de", "es", "fr", "pt", "ru", "zh", "ja", "ko", "ar", "hi", "tr", "it", "nl", "pl", "uk", "cs", "ro", "hu", "th", "vi", "he", "el"];
const VALID_SOURCES = ["landing", "api-page", "final-cta", "newsletter", "blog"];

const rateLimit = new Map<string, { count: number; reset: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  entry.count++;
  return entry.count > 5;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email } = body;
  const locale = VALID_LOCALES.includes(body.locale) ? body.locale : "en";
  const source = VALID_SOURCES.includes(body.source) ? body.source : "landing";

  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const db = createAdminClient();

  const { error } = await db.from("waitlist").upsert(
    { email: email.toLowerCase().trim(), locale, source },
    { onConflict: "email" }
  );

  if (error) {
    console.error("[waitlist] Error:", error.message);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
