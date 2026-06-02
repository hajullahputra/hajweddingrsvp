import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { rateLimit, getIp } from "@/lib/rate-limit";
import { sanitizeText, isSafeId } from "@/lib/sanitize";

// Whitelist of valid item IDs — must match WISHLIST in WishlistSection.tsx
const VALID_ITEM_IDS = new Set([
  "microwave",
  "tupperware-set",
  "dinner-set",
  "bedsheet-set",
  "towel-set",
  "hair-dryer",
]);

export async function POST(req: NextRequest) {
  const { ok, retryAfter } = rateLimit(getIp(req), "reserve");
  if (!ok) {
    return NextResponse.json(
      { error: "Too many requests. Please wait." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  try {
    const body = await req.json();
    const { itemId, name: rawName } = body;

    // Validate itemId against whitelist
    if (!isSafeId(itemId) || !VALID_ITEM_IDS.has(itemId)) {
      return NextResponse.json({ error: "Invalid item." }, { status: 400 });
    }

    const name = sanitizeText(rawName, 100);
    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    const ref = adminDb.collection("reservations").doc(itemId);
    const snap = await ref.get();
    if (snap.exists) {
      return NextResponse.json({ error: "Already reserved" }, { status: 409 });
    }

    await ref.set({
      reservedBy: name,
      reservedAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
