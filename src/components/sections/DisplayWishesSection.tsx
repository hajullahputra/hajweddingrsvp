"use client";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Wish = {
  id: string;
  name: string;
  notes: string;
  attending: string;
};

export default function DisplayWishesSection() {
  const [wishes, setWishes] = useState<Wish[]>([]);

  useEffect(() => {
    const q = query(collection(db, "rsvps"), orderBy("submittedAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const results: Wish[] = [];
      snap.forEach((doc) => {
        const data = doc.data();
        if (data.notes?.trim()) {
          results.push({
            id: doc.id,
            name: data.name ?? "Anonymous",
            notes: data.notes.trim(),
            attending: data.attending,
          });
        }
      });
      setWishes(results);
    });
    return () => unsub();
  }, []);

  return (
    <section className="section section-alt text-center" style={{ borderRadius: 32, margin: "0 16px", overflow: "hidden" }}>
      {/* Header */}
      <p style={{ fontSize: 9, letterSpacing: ".3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>
        From Our Guests
      </p>
      <p className="font-script" style={{ fontSize: 32, color: "var(--charcoal)", marginBottom: 6, lineHeight: 1.2 }}>
        Wishes &amp; Notes
      </p>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, margin: "14px 0 28px" }}>
        <div style={{ width: 36, height: 1, background: "var(--gold-light)" }} />
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="2" fill="var(--gold)" opacity=".6"/>
        </svg>
        <div style={{ width: 36, height: 1, background: "var(--gold-light)" }} />
      </div>

      {/* Empty state */}
      {wishes.length === 0 && (
        <p className="font-cormorant italic" style={{ fontSize: 15, color: "var(--warm-gray)", opacity: .6, marginBottom: 8 }}>
          Wishes from your guests will appear here.
        </p>
      )}

      {/* Wish cards — scrollable, shows ~3 at a time */}
      {wishes.length > 0 && (
      <div style={{ position: "relative", maxWidth: 400, margin: "0 auto" }}>
        <div style={{
          maxHeight: 420,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          paddingRight: 4,
          scrollbarWidth: "thin",
          scrollbarColor: "var(--gold-light) transparent",
        }}>
        {wishes.map((w) => (
          <div
            key={w.id}
            style={{
              background: "#fff",
              border: "1px solid var(--border)",
              borderRadius: 6,
              padding: "18px 20px",
              textAlign: "left",
              boxShadow: "0 2px 10px rgba(44,41,38,.04)",
            }}
          >
            {/* Quote mark */}
            <p className="font-cormorant italic"
               style={{ fontSize: 32, color: "var(--gold-light)", lineHeight: 1, marginBottom: 4 }}>
              &ldquo;
            </p>

            <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--charcoal)", marginBottom: 12, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
              {w.notes}
            </p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ fontSize: 11, color: "var(--warm-gray)", fontWeight: 400 }}>
                — {w.name}
              </p>
              <span style={{
                fontSize: 8,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                padding: "3px 8px",
                borderRadius: 20,
                background: w.attending === "yes" ? "rgba(138,158,139,.15)" : "rgba(122,116,110,.08)",
                color: w.attending === "yes" ? "var(--sage)" : "var(--warm-gray)",
              }}>
                {/* {w.attending === "yes" ? "Attending" : "Not Attending"} */}
              </span>
            </div>
          </div>
        ))}
        </div>

        {/* Fade hint when more wishes to scroll */}
        {wishes.length > 3 && (
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 48,
            background: "linear-gradient(transparent, var(--cream))",
            pointerEvents: "none",
          }} />
        )}
      </div>
      )}

      {wishes.length > 0 && (
        <p style={{ fontSize: 10, color: "var(--warm-gray)", marginTop: 20, opacity: .7 }}>
          {wishes.length} wish{wishes.length !== 1 ? "es" : ""} shared
        </p>
      )}
    </section>
  );
}
