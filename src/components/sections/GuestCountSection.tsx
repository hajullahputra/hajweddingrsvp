"use client";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Counts = {
  attendingGuests: number;
  notAttendingGuests: number;
  totalResponses: number;
};

export default function GuestCountSection() {
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "rsvps"), (snap) => {
      let attendingGuests = 0;
      let notAttendingGuests = 0;

      snap.forEach((doc) => {
        const data = doc.data();
        if (data.attending === "yes") {
          attendingGuests += Number(data.guestCount) || 1;
        } else {
          notAttendingGuests += Number(data.guestCount) || 1;
        }
      });

      setCounts({
        attendingGuests,
        notAttendingGuests,
        totalResponses: snap.size,
      });
    });

    return () => unsub();
  }, []);

  return (
    <section className="section text-center" style={{ background: "var(--ivory)", borderRadius: 32, margin: "0 16px", overflow: "hidden" }}>
      {/* Header */}
      <p style={{ fontSize: 9, letterSpacing: ".3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>
        Attendance Summary
      </p>
      <p className="font-script" style={{ fontSize: 32, color: "var(--charcoal)", marginBottom: 6, lineHeight: 1.2 }}>
        Guest Count
      </p>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, margin: "14px 0 28px" }}>
        <div style={{ width: 36, height: 1, background: "var(--gold-light)" }} />
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="2" fill="var(--gold)" opacity=".6"/>
        </svg>
        <div style={{ width: 36, height: 1, background: "var(--gold-light)" }} />
      </div>

      {/* Count cards */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", maxWidth: 360, margin: "0 auto" }}>
        {/* Attending */}
        <div style={{
          flex: 1,
          background: "#fff",
          border: "1px solid var(--border)",
          borderRadius: 6,
          padding: "24px 16px",
          boxShadow: "0 2px 12px rgba(44,41,38,.04)",
        }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ display: "block", margin: "0 auto 12px" }}>
            <circle cx="14" cy="9" r="5" stroke="var(--gold)" strokeWidth="1.2" fill="none"/>
            <path d="M4 26 Q4 18 14 18 Q24 18 24 26" stroke="var(--gold)" strokeWidth="1.2" fill="none"/>
            <path d="M20 12 L22 14 L26 10" stroke="var(--sage)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--warm-gray)", marginBottom: 8 }}>
            Attending
          </p>
          <p className="font-serif" style={{ fontSize: 40, color: "var(--charcoal)", lineHeight: 1 }}>
            {counts?.attendingGuests ?? "—"}
          </p>
          <p style={{ fontSize: 10, color: "var(--warm-gray)", marginTop: 6 }}>
            guests
          </p>
        </div>

        {/* Not attending */}
        <div style={{
          flex: 1,
          background: "#fff",
          border: "1px solid var(--border)",
          borderRadius: 6,
          padding: "24px 16px",
          boxShadow: "0 2px 12px rgba(44,41,38,.04)",
        }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ display: "block", margin: "0 auto 12px" }}>
            <circle cx="14" cy="9" r="5" stroke="var(--warm-gray)" strokeWidth="1.2" fill="none"/>
            <path d="M4 26 Q4 18 14 18 Q24 18 24 26" stroke="var(--warm-gray)" strokeWidth="1.2" fill="none"/>
            <path d="M20 10 L26 16 M26 10 L20 16" stroke="#C0392B" strokeWidth="1.4" strokeLinecap="round" opacity=".6"/>
          </svg>
          <p style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--warm-gray)", marginBottom: 8 }}>
            Not Attending
          </p>
          <p className="font-serif" style={{ fontSize: 40, color: "var(--charcoal)", lineHeight: 1 }}>
            {counts?.notAttendingGuests ?? "—"}
          </p>
          <p style={{ fontSize: 10, color: "var(--warm-gray)", marginTop: 6 }}>
            guests
          </p>
        </div>
      </div>

      {/* Total responses */}
      <p style={{ fontSize: 11, color: "var(--warm-gray)", marginTop: 20 }}>
        {counts?.totalResponses ?? "—"} response{counts?.totalResponses !== 1 ? "s" : ""} received
      </p>
    </section>
  );
}
