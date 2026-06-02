import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

/* GET — fetch all wishes ordered newest first */
export async function GET() {
  try {
    const snap = await adminDb
      .collection("wishes")
      .orderBy("createdAt", "desc")
      .limit(50)
      .get();

    const wishes = snap.docs.map(doc => {
      const d = doc.data();
      return {
        id: doc.id,
        name: d.name,
        message: d.message,
        createdAt: d.createdAt?.toDate?.()?.toISOString() ?? new Date().toISOString(),
      };
    });

    return NextResponse.json({ wishes });
  } catch {
    return NextResponse.json({ wishes: [] });
  }
}

/* POST — add a new wish */
export async function POST(req: NextRequest) {
  try {
    const { name, message } = await req.json();

    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const ref = await adminDb.collection("wishes").add({
      name: String(name).trim().slice(0, 80),
      message: String(message).trim().slice(0, 300),
      createdAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      wish: {
        id: ref.id,
        name: name.trim(),
        message: message.trim(),
        createdAt: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
