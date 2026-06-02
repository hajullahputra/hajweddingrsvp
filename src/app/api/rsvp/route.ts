import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { rsvpSchema } from "@/lib/schema";
import { Resend } from "resend";
import { FieldValue } from "firebase-admin/firestore";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = rsvpSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Data tidak sah" }, { status: 400 });
    }
    const data = parsed.data;

    // Check duplicate (skip for placeholder email)
    if (data.email !== "no-email@rsvp.com") {
      const existing = await adminDb
        .collection("rsvps")
        .where("email", "==", data.email)
        .limit(1)
        .get();
      if (!existing.empty) {
        return NextResponse.json({ error: "E-mel ini telah menghantar RSVP." }, { status: 409 });
      }
    }

    await adminDb.collection("rsvps").add({
      ...data,
      submittedAt: FieldValue.serverTimestamp(),
    });

    // Send confirmation email if real email provided
    if (data.email !== "no-email@rsvp.com" && process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "rsvp@yourdomain.com",
        to: data.email,
        subject: data.attending === "yes"
          ? "RSVP diterima — Wedding Reception of Hajullah Putra & Noor Syahirah 🤍"
          : "RSVP diterima — Thank you for your response",
        html: buildEmail(data),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Ralat pelayan" }, { status: 500 });
  }
}

function buildEmail(data: { name: string; attending: string; guestCount?: number; notes?: string }) {
  const first = data.name.split(" ")[0];
  return `
    <div style="max-width:480px;margin:0 auto;font-family:Georgia,serif;color:#2C2926;background:#FDFAF5;padding:48px 36px;">
      <p style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#C9A96E;margin-bottom:6px;">Walimatulurus</p>
      <h1 style="font-weight:400;font-size:30px;margin:0 0 4px;">Hajullah Putra &amp; Noor Syahirah</h1>
      <p style="font-size:11px;letter-spacing:2px;color:#7A746E;margin-bottom:28px;">1 AUGUST 2026</p>
      <hr style="border:none;border-top:1px solid #E8E0D4;margin-bottom:28px;">
      <p style="font-size:15px;line-height:1.7;">Terima kasih, <strong>${first}</strong>.</p>
      ${data.attending === "yes"
        ? `<p style="font-size:15px;line-height:1.7;margin-top:12px;">
             We are delighted to receive your attendance with
             <strong>${data.guestCount} guest(s)</strong>.
           </p>
           <p style="font-size:15px;line-height:1.7;margin-top:12px;">
             We look forward to seeing you on <strong>Saturday, 1 August 2026</strong>.
           </p>`
        : `<p style="font-size:15px;line-height:1.7;margin-top:12px;">
             We understand and appreciate your response. We hope to see you another time.
           </p>`
      }
      ${data.notes ? `<p style="font-size:13px;color:#7A746E;margin-top:20px;font-style:italic;">Nota: ${data.notes}</p>` : ""}
      <hr style="border:none;border-top:1px solid #E8E0D4;margin:32px 0 20px;">
      <p style="font-size:11px;color:#B0A898;letter-spacing:1px;">Sebarang pertanyaan: hello@aishaanddaniel.com</p>
    </div>
  `;
}
