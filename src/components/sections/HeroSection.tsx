"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

/* ── Shared floral bouquet — rotated for top/bottom corners ── */
function FloralBouquet({ flip = false, size = 260 }: { flip?: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 260 260"
      fill="none"
      style={{ transform: flip ? "rotate(180deg) scaleX(-1)" : undefined, display: "block" }}
    >
      {/* Stems */}
      <path d="M15 245 Q60 190 110 155 Q150 128 195 90 Q218 68 248 38"
            stroke="#C9A96E" strokeWidth="1.1" fill="none" opacity=".38"/>
      <path d="M22 245 Q55 205 85 178 Q115 150 145 120"
            stroke="#8A9E8B" strokeWidth=".85" fill="none" opacity=".3"/>
      <path d="M8 228 Q38 200 70 182 Q100 165 122 148"
            stroke="#C9A96E" strokeWidth=".7" fill="none" opacity=".25"/>

      {/* ── Large rose (top-right) ── */}
      <ellipse cx="218" cy="55"  rx="20" ry="17" fill="#D4A5A5" opacity=".72"/>
      <ellipse cx="205" cy="46"  rx="13" ry="9"  fill="#C49090" opacity=".55" transform="rotate(-22 205 46)"/>
      <ellipse cx="231" cy="46"  rx="13" ry="9"  fill="#C49090" opacity=".55" transform="rotate(22 231 46)"/>
      <ellipse cx="218" cy="38"  rx="11" ry="8"  fill="#D4A5A5" opacity=".6"/>
      <ellipse cx="218" cy="70"  rx="9"  ry="6"  fill="#BA8585" opacity=".42"/>
      <circle  cx="218" cy="55"  r="7.5"          fill="#BA8585" opacity=".35"/>
      <circle  cx="218" cy="55"  r="3.5"          fill="#9E6E6E" opacity=".38"/>

      {/* ── Medium gold flower (centre-left) ── */}
      <circle cx="128" cy="138" r="14"  fill="#E8D5AA" opacity=".7"/>
      <ellipse cx="118" cy="128" rx="9" ry="6"  fill="#C9A96E" opacity=".6" transform="rotate(-35 118 128)"/>
      <ellipse cx="138" cy="128" rx="9" ry="6"  fill="#C9A96E" opacity=".6" transform="rotate(35 138 128)"/>
      <ellipse cx="138" cy="148" rx="9" ry="6"  fill="#C9A96E" opacity=".6" transform="rotate(-35 138 148)"/>
      <ellipse cx="118" cy="148" rx="9" ry="6"  fill="#C9A96E" opacity=".6" transform="rotate(35 118 148)"/>
      <circle  cx="128" cy="138" r="6"           fill="#B8924D" opacity=".5"/>

      {/* ── Small blush flower (lower-left) ── */}
      <ellipse cx="72"  cy="192" rx="10" ry="8"  fill="#D4A5A5" opacity=".65"/>
      <ellipse cx="63"  cy="183" rx="7"  ry="5"  fill="#C49090" opacity=".5" transform="rotate(-28 63 183)"/>
      <ellipse cx="81"  cy="183" rx="7"  ry="5"  fill="#C49090" opacity=".5" transform="rotate(28 81 183)"/>
      <ellipse cx="72"  cy="201" rx="6"  ry="4"  fill="#BA8585" opacity=".4"/>
      <circle  cx="72"  cy="192" r="4"            fill="#A87070" opacity=".38"/>

      {/* ── Tiny cream blossom ── */}
      <circle  cx="168" cy="102" r="7"  fill="#F0E0DC" opacity=".8"/>
      <ellipse cx="162" cy="96"  rx="5" ry="3.5" fill="#E8D5AA" opacity=".7" transform="rotate(-30 162 96)"/>
      <ellipse cx="174" cy="96"  rx="5" ry="3.5" fill="#E8D5AA" opacity=".7" transform="rotate(30 174 96)"/>
      <ellipse cx="174" cy="108" rx="5" ry="3.5" fill="#E8D5AA" opacity=".7" transform="rotate(-30 174 108)"/>
      <ellipse cx="162" cy="108" rx="5" ry="3.5" fill="#E8D5AA" opacity=".7" transform="rotate(30 162 108)"/>
      <circle  cx="168" cy="102" r="3"            fill="#C9A96E" opacity=".65"/>

      {/* ── Tiny bud (bottom) ── */}
      <circle  cx="34"  cy="232" r="5"  fill="#D4A5A5" opacity=".55"/>
      <circle  cx="34"  cy="232" r="2.5"             fill="#C49090" opacity=".45"/>

      {/* ── Leaves ── */}
      <path d="M192 82  Q170 60 182 40 Q202 62 192 82Z"  fill="#8A9E8B" opacity=".62"/>
      <path d="M238 80  Q260 58 248 38 Q232 60 238 80Z"  fill="#8A9E8B" opacity=".48"/>
      <path d="M145 120 Q123 98  135 78 Q154 100 145 120Z" fill="#8A9E8B" opacity=".55"/>
      <path d="M100 158 Q78  138  90 118 Q108 140 100 158Z" fill="#8A9E8B" opacity=".5"/>
      <path d="M52  208 Q30  190  42 170 Q60  190 52 208Z"  fill="#8A9E8B" opacity=".45"/>
      <path d="M175 122 Q166 110 172 100 Q182 112 175 122Z" fill="#8A9E8B" opacity=".38"/>
      <path d="M95  178 Q84  166  90 156 Q102 168 95 178Z"  fill="#8A9E8B" opacity=".38"/>

      {/* ── Gold accent dots ── */}
      <circle cx="202" cy="92"  r="2.5" fill="#C9A96E" opacity=".45"/>
      <circle cx="115" cy="152" r="2"   fill="#C9A96E" opacity=".4"/>
      <circle cx="60"  cy="205" r="2"   fill="#C9A96E" opacity=".38"/>
      <circle cx="155" cy="116" r="1.8" fill="#E8D5AA" opacity=".5"/>
      <circle cx="38"  cy="218" r="1.5" fill="#8A9E8B" opacity=".4"/>
    </svg>
  );
}

/* ── Thin corner bracket lines ── */
function CornerBrackets() {
  const s = { stroke: "var(--gold-light)", strokeWidth: 1, fill: "none", opacity: 0.6 } as const;
  return (
    <>
      {/* top-left */}
      <svg style={{ position: "absolute", top: 16, left: 16 }} width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M0 20 L0 0 L20 0" {...s}/>
      </svg>
      {/* top-right */}
      <svg style={{ position: "absolute", top: 16, right: 16 }} width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M40 20 L40 0 L20 0" {...s}/>
      </svg>
      {/* bottom-left */}
      <svg style={{ position: "absolute", bottom: 16, left: 16 }} width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M0 20 L0 40 L20 40" {...s}/>
      </svg>
      {/* bottom-right */}
      <svg style={{ position: "absolute", bottom: 16, right: 16 }} width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M40 20 L40 40 L20 40" {...s}/>
      </svg>
    </>
  );
}

export default function HeroSection({ onOpen }: { onOpen: () => void }) {
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  const lastTapRef = useRef(0);

  const goAdmin = () => router.push("/admin/login");

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) goAdmin();
    lastTapRef.current = now;
  };

  const handleOpen = () => {
    setClicked(true);
    setTimeout(onOpen, 700);
  };

  return (
    <AnimatePresence>
      {!clicked && (
        <motion.section
          key="cover"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.7 }}
          onClick={handleOpen}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            background: "var(--ivory)",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          {/* Corner brackets */}
          <CornerBrackets />

          {/* Top floral */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "60%",
              maxWidth: 280,
              pointerEvents: "none",
              opacity: 0.92,
            }}
          >
            <FloralBouquet size={280} />
          </div>

          {/* Bottom floral (mirrored) */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "60%",
              maxWidth: 280,
              pointerEvents: "none",
              opacity: 0.92,
            }}
          >
            <FloralBouquet size={280} flip />
          </div>

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1, padding: "0 32px" }}>
            {/* Bismillah */}
            <p
              className="font-cormorant italic fade-up"
              style={{ fontSize: 18, color: "var(--gold)", marginBottom: 12, letterSpacing: ".06em" }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>

            {/* Sub-label — double-click / double-tap to access admin */}
            <p
              className="fade-up-delay-1"
              onDoubleClick={e => { e.stopPropagation(); goAdmin(); }}
              onTouchEnd={e => { e.stopPropagation(); handleDoubleTap(); }}
              style={{
                fontSize: 9,
                letterSpacing: ".3em",
                textTransform: "uppercase",
                color: "var(--warm-gray)",
                marginBottom: 28,
                userSelect: "none",
              }}
            >
              Wedding Reception
            </p>

            {/* Names in Dancing Script */}
            <div className="fade-up-delay-2" style={{ marginBottom: 20 }}>
              <p
                className="font-script"
                style={{ fontSize: 54, color: "var(--charcoal)", lineHeight: 1.1 }}
              >
                Hajullah Putra
              </p>
              <p
                className="font-cormorant italic"
                style={{ fontSize: 28, color: "var(--gold)", margin: "4px 0" }}
              >
                &amp;
              </p>
              <p
                className="font-script"
                style={{ fontSize: 54, color: "var(--charcoal)", lineHeight: 1.1 }}
              >
                Noor Syahirah
              </p>
            </div>

            {/* Decorative divider */}
            <div className="fade-up-delay-2" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 50, height: 1, background: "var(--gold-light)" }} />
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="2.5" fill="var(--gold)" opacity=".7"/>
                <circle cx="8" cy="2" r="1.2"  fill="var(--gold)" opacity=".4"/>
                <circle cx="8" cy="14" r="1.2" fill="var(--gold)" opacity=".4"/>
                <circle cx="2" cy="8" r="1.2"  fill="var(--gold)" opacity=".4"/>
                <circle cx="14" cy="8" r="1.2" fill="var(--gold)" opacity=".4"/>
              </svg>
              <div style={{ width: 50, height: 1, background: "var(--gold-light)" }} />
            </div>

            {/* Date */}
            <p
              className="fade-up-delay-3"
              style={{
                fontSize: 10,
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "var(--warm-gray)",
                marginBottom: 32,
              }}
            >
              Saturday · 1 August 2026
            </p>

            {/* Open button */}
            <button onClick={handleOpen} className="btn-open fade-up-delay-4">
              Open Invitation
            </button>

            <p
              className="fade-up-delay-4"
              style={{
                fontSize: 9,
                letterSpacing: ".18em",
                color: "var(--warm-gray)",
                opacity: .5,
                marginTop: 16,
                textTransform: "uppercase",
              }}
            >
              Tap anywhere to open
            </p>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
