import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: NextRequest) {
  try {
    const { itemId, name } = await req.json();
    if (!itemId || !name?.trim()) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const ref = adminDb.collection("reservations").doc(itemId);

    // First-come-first-serve: only write if not already reserved
    const snap = await ref.get();
    if (snap.exists) {
      return NextResponse.json({ error: "Already reserved" }, { status: 409 });
    }

    await ref.set({
      reservedBy: name.trim(),
      reservedAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
