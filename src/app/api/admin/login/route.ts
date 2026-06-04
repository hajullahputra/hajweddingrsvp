import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { rateLimit, getIp } from "@/lib/rate-limit";

// Stored on globalThis so the same Set is shared across Next.js module instances
// (API routes and Server Components are compiled into separate bundles)
const g = globalThis as typeof globalThis & { _adminSessions?: Set<string> };
if (!g._adminSessions) g._adminSessions = new Set<string>();
const sessions = g._adminSessions;

export async function POST(req: NextRequest) {
  // Rate limit login attempts
  const { ok, retryAfter } = rateLimit(getIp(req), "adminLogin");
  if (!ok) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  const { password } = await req.json();

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    // Constant-time-ish delay to slow brute force
    await new Promise(r => setTimeout(r, 300));
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  // Generate a cryptographically random session token
  const token = randomBytes(32).toString("hex");
  sessions.add(token);

  // Auto-expire after 8 hours
  setTimeout(() => sessions.delete(token), 8 * 60 * 60 * 1000);

  const res = NextResponse.json({ success: true });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 8,
    path: "/",
  });
  return res;
}

export function verifySession(token: string | undefined): boolean {
  return !!token && sessions.has(token);
}
