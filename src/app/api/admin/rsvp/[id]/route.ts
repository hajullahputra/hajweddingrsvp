import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { cookies } from "next/headers";
import { verifySession } from "@/app/api/admin/login/route";
import { rateLimit, getIp } from "@/lib/rate-limit";

async function isAuthed() {
  const store = await cookies();
  const token = store.get("admin_token")?.value;
  return verifySession(token);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { ok } = rateLimit(getIp(req), "adminAction");
  if (!ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  if (!await isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  if (!id) return NextResponse.json({ error: "Bad request" }, { status: 400 });

  await adminDb.collection("rsvps").doc(id).delete();
  return NextResponse.json({ success: true });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { ok } = rateLimit(getIp(req), "adminAction");
  if (!ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  if (!await isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  if (!id) return NextResponse.json({ error: "Bad request" }, { status: 400 });

  const body = await req.json();
  // Only allow safe fields to be updated
  const { name, email, attending, guestCount, notes } = body;
  await adminDb.collection("rsvps").doc(id).update({ name, email, attending, guestCount, notes });
  return NextResponse.json({ success: true });
}
