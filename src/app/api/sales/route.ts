import { NextResponse, NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const VALID_SIZES = ["1-10", "11-50", "51-200", "200+"];
const VALID_LOCALES = ["en", "de", "es", "fr", "pt", "ru", "zh", "ja", "ko", "ar", "hi", "tr", "it", "nl", "pl", "uk", "cs", "ro", "hu", "th", "vi", "he", "el"];

const rateLimit = new Map<string, { count: number; reset: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  entry.count++;
  return entry.count > 3;
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

  const { email, company_name, company_size, message } = body;
  const locale = VALID_LOCALES.includes(body.locale) ? body.locale : "en";

  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  if (company_size && !VALID_SIZES.includes(company_size)) {
    return NextResponse.json({ error: "Invalid company size" }, { status: 400 });
  }

  const maxLen = 2000;
  const db = createAdminClient();

  const { error } = await db.from("sales_inquiries").insert({
    email: email.toLowerCase().trim(),
    company_name: typeof company_name === "string" ? company_name.trim().slice(0, 200) : null,
    company_size: company_size || null,
    message: typeof message === "string" ? message.trim().slice(0, maxLen) : null,
    locale,
  });

  if (error) {
    console.error("[sales] Insert error:", error.message);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
