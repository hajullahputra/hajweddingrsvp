"use client";
import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2026-08-01T11:00:00+08:00").getTime();

export default function CountdownSection() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0, done: false });

  useEffect(() => {
    const tick = () => {
      const diff = WEDDING_DATE - Date.now();
      if (diff <= 0) { setTime({ d: 0, h: 0, m: 0, s: 0, done: true }); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTime({ d, h, m, s, done: false });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="section text-center"
      style={{
        background: "#3D2B1F",
        position: "relative",
        overflow: "hidden",
        borderRadius: 32,
        margin: "0 16px",
        padding: "48px 28px",
      }}
    >
      {/* Top ornament */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 24 }}>
        <div style={{ width: 40, height: 1, background: "rgba(255,255,255,.25)" }} />
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
          <ellipse cx="4"  cy="7" rx="3" ry="2" fill="rgba(255,255,255,.4)" transform="rotate(-15 4 7)"/>
          <ellipse cx="16" cy="7" rx="3" ry="2" fill="rgba(255,255,255,.4)" transform="rotate(15 16 7)"/>
          <circle  cx="10" cy="7" r="2.5" fill="#E8D5AA" opacity=".8"/>
        </svg>
        <div style={{ width: 40, height: 1, background: "rgba(255,255,255,.25)" }} />
      </div>

      {/* Label */}
      <p style={{
        fontSize: 9, letterSpacing: ".3em", textTransform: "uppercase",
        color: "var(--gold-light)", marginBottom: 10,
      }}>
        Wedding Countdown
      </p>

      {/* Title */}
      <p
        className="font-script"
        style={{ fontSize: 32, color: "#F5EFE6", marginBottom: 28, lineHeight: 1.2 }}
      >
        Counting Down to Our Day
      </p>

      {time.done ? (
        <p className="font-cormorant italic" style={{ fontSize: 26, color: "var(--gold-light)" }}>
          Alhamdulillah &#x1F90D;
        </p>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          {[
            { n: time.d, l: "Days" },
            { n: time.h, l: "Hours" },
            { n: time.m, l: "Minutes" },
            { n: time.s, l: "Seconds" },
          ].map(({ n, l }) => (
            <div key={l} className="count-box">
              <div
                style={{
                  background: "rgba(255,255,255,.1)",
                  border: "1px solid rgba(255,255,255,.2)",
                  borderRadius: 16,
                  padding: "14px 12px",
                  minWidth: 62,
                  marginBottom: 8,
                }}
              >
                <span
                  className="count-num"
                  style={{ color: "#F5EFE6" }}
                >
                  {String(n).padStart(2, "0")}
                </span>
              </div>
              <span className="count-label" style={{ color: "rgba(245,239,230,.55)" }}>{l}</span>
            </div>
          ))}
        </div>
      )}

      {/* Bottom divider */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 36 }}>
        <div style={{ width: 40, height: 1, background: "rgba(255,255,255,.2)" }} />
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="2" fill="#E8D5AA" opacity=".7"/>
        </svg>
        <div style={{ width: 40, height: 1, background: "rgba(255,255,255,.2)" }} />
      </div>

      {/* Date reminder */}
      <p style={{
        fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase",
        color: "rgba(245,239,230,.45)", marginTop: 14,
      }}>
        1 · 8 · 2026
      </p>
    </section>
  );
}
