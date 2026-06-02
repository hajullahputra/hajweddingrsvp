"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Add real image paths here once photos are ready:
// e.g. "/photos/couple-1.jpg", "/photos/couple-2.jpg"
const CAROUSEL_IMAGES: string[] = [];

const SLIDE_INTERVAL = 4500;
const PLACEHOLDER_COUNT = 3;

/* ── Small floral divider ── */
function FloralDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, margin: "20px 0" }}>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, var(--gold-light))" }} />
      <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
        <circle cx="16" cy="8" r="2.5" fill="var(--gold)" opacity=".6"/>
        <ellipse cx="7"  cy="8" rx="4" ry="2.5" fill="var(--gold-light)" opacity=".5" transform="rotate(-20 7 8)"/>
        <ellipse cx="25" cy="8" rx="4" ry="2.5" fill="var(--gold-light)" opacity=".5" transform="rotate(20 25 8)"/>
        <circle cx="2"  cy="8" r="1.2" fill="var(--gold-light)" opacity=".4"/>
        <circle cx="30" cy="8" r="1.2" fill="var(--gold-light)" opacity=".4"/>
      </svg>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, var(--gold-light), transparent)" }} />
    </div>
  );
}

/* ── Decorative character title badge ── */
function CharacterTitle({ label }: { label: string }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 4 }}>
      <svg width="60" height="8" viewBox="0 0 60 8" fill="none" style={{ display: "block", margin: "0 auto 10px" }}>
        <line x1="0" y1="4" x2="22" y2="4" stroke="var(--gold-light)" strokeWidth="1"/>
        <circle cx="30" cy="4" r="2.5" fill="var(--gold)" opacity=".6"/>
        <line x1="38" y1="4" x2="60" y2="4" stroke="var(--gold-light)" strokeWidth="1"/>
      </svg>
      <p style={{
        fontSize: 9,
        letterSpacing: ".28em",
        textTransform: "uppercase",
        color: "var(--gold-dark)",
        fontFamily: "'Jost', sans-serif",
        fontWeight: 400,
      }}>
        {label}
      </p>
      <svg width="60" height="8" viewBox="0 0 60 8" fill="none" style={{ display: "block", margin: "10px auto 0" }}>
        <line x1="0" y1="4" x2="22" y2="4" stroke="var(--gold-light)" strokeWidth="1"/>
        <circle cx="30" cy="4" r="2.5" fill="var(--gold)" opacity=".6"/>
        <line x1="38" y1="4" x2="60" y2="4" stroke="var(--gold-light)" strokeWidth="1"/>
      </svg>
    </div>
  );
}

/* ── Photo carousel ── */
function Carousel() {
  const [index, setIndex]       = useState(0);
  const [direction, setDirection] = useState(1);
  const count = CAROUSEL_IMAGES.length > 0 ? CAROUSEL_IMAGES.length : PLACEHOLDER_COUNT;

  const go = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  };
  const prev = () => go((index - 1 + count) % count);
  const next = () => go((index + 1) % count);

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setIndex(i => (i + 1) % count);
    }, SLIDE_INTERVAL);
    return () => clearInterval(t);
  }, [count]);

  const src = CAROUSEL_IMAGES[index];

  return (
    <div style={{ width: "100%", maxWidth: 340, margin: "0 auto" }}>
      {/* Slide frame */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4/3",
          borderRadius: 6,
          overflow: "hidden",
          border: "1px solid var(--border)",
          background: "linear-gradient(145deg, #F5EFE6 0%, #EAE0D5 100%)",
          boxShadow: "0 4px 24px rgba(44,41,38,.06)",
        }}
      >
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={{
              enter:  (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit:   (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            style={{ position: "absolute", inset: 0 }}
          >
            {src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt={`Photo ${index + 1}`}
                   style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{
                width: "100%", height: "100%",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 10,
              }}>
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" opacity=".22">
                  <rect x="3" y="9" width="38" height="28" rx="3" stroke="var(--gold)" strokeWidth="1.4"/>
                  <circle cx="14" cy="19" r="4" stroke="var(--gold)" strokeWidth="1.4"/>
                  <path d="M3 30 L14 21 L24 28 L32 22 L41 30"
                        stroke="var(--gold)" strokeWidth="1.4" strokeLinejoin="round"/>
                </svg>
                <p style={{ fontSize: 9, color: "var(--warm-gray)", letterSpacing: ".18em", textTransform: "uppercase" }}>
                  Photo {index + 1}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Prev */}
        <button onClick={prev} aria-label="Previous" style={{
          position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
          width: 28, height: 28, borderRadius: "50%",
          background: "rgba(253,248,243,.82)", border: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", zIndex: 2,
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M6.5 2 L3.5 5 L6.5 8" stroke="var(--charcoal)" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Next */}
        <button onClick={next} aria-label="Next" style={{
          position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
          width: 28, height: 28, borderRadius: "50%",
          background: "rgba(253,248,243,.82)", border: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", zIndex: 2,
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M3.5 2 L6.5 5 L3.5 8" stroke="var(--charcoal)" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === index ? 20 : 6, height: 6, borderRadius: 3,
              background: i === index ? "var(--gold)" : "var(--border)",
              border: "none", padding: 0, cursor: "pointer",
              transition: "width .3s ease, background .3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function CoupleSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && el.classList.add("in-view"),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="section text-center" style={{ background: "var(--ivory)", borderRadius: 32, margin: "0 16px", overflow: "hidden" }}>
      {/* Bismillah */}
      <p
        className="font-cormorant italic"
        style={{ fontSize: 20, color: "var(--gold)", marginBottom: 10, letterSpacing: ".06em" }}
      >
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </p>

      <FloralDivider />

      {/* Quranic verse */}
      <p
        className="font-cormorant italic"
        style={{
          fontSize: 15, lineHeight: 1.75,
          color: "var(--warm-gray)", maxWidth: 300, margin: "0 auto 8px",
        }}
      >
        &ldquo;And We created you in pairs.&rdquo;
      </p>
      <p style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>
        — An-Naba: 8
      </p>

      {/* Logo — below verse */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24, gap: 10 }}>
        <img
          src="/logo.png"
          alt="Wedding logo"
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          style={{
            width: 90,
            height: 90,
            objectFit: "contain",
            filter: "drop-shadow(0 2px 8px rgba(201,169,110,.25))",
          }}
        />
        <p className="font-script" style={{ fontSize: 18, color: "var(--gold-dark)" }}>
          #PrinceForSyahirah
        </p>
      </div>

      {/* ── Couple block ── */}
      <div style={{ display: "flex", gap: 0, justifyContent: "center", alignItems: "flex-start" }}>

        {/* Groom */}
        <div style={{ flex: 1, maxWidth: 160, textAlign: "center" }}>
          <CharacterTitle label="The Groom" />
          <p
            className="font-script"
            style={{ fontSize: 28, color: "var(--charcoal)", marginTop: 14, lineHeight: 1.15 }}
          >
            Hajullah<br />Putra
          </p>
          <p style={{ fontSize: 11, letterSpacing: ".08em", color: "var(--warm-gray)", marginTop: 4 }}>
            bin Hj Md Taib
          </p>
          <div style={{ width: 28, height: 1, background: "var(--gold-light)", margin: "10px auto" }} />
          <p style={{ fontSize: 11, lineHeight: 1.65, color: "var(--warm-gray)" }}>
            son of<br />
            <span style={{ color: "var(--charcoal)", fontWeight: 400 }}>Hj Md Taib bin Hj Kaman</span><br />
            &amp;&nbsp;<span style={{ color: "var(--charcoal)", fontWeight: 400 }}>Hjh &#x2018;Aeshah binti Hj A. Hamid</span>
          </p>
        </div>

        {/* Ampersand */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 40 }}>
          <p className="font-cormorant italic" style={{ fontSize: 42, color: "var(--gold)", opacity: .55, lineHeight: 1 }}>
            &amp;
          </p>
        </div>

        {/* Bride */}
        <div style={{ flex: 1, maxWidth: 160, textAlign: "center" }}>
          <CharacterTitle label="The Bride" />
          <p
            className="font-script"
            style={{ fontSize: 28, color: "var(--charcoal)", marginTop: 14, lineHeight: 1.15 }}
          >
            Noor<br />Syahirah
          </p>
          <p style={{ fontSize: 11, letterSpacing: ".08em", color: "var(--warm-gray)", marginTop: 4 }}>
            binti Hj Mohd Sabri
          </p>
          <div style={{ width: 28, height: 1, background: "var(--gold-light)", margin: "10px auto" }} />
          <p style={{ fontSize: 11, lineHeight: 1.65, color: "var(--warm-gray)" }}>
            daughter of<br />
            <span style={{ color: "var(--charcoal)", fontWeight: 400 }}>Hj Mohd Sabri bin Jusoh</span><br />
            &amp;&nbsp;<span style={{ color: "var(--charcoal)", fontWeight: 400 }}>Hjh Siti Hurul Aini binti Jailani</span>
          </p>
        </div>
      </div>

      {/* ── Photo carousel ── */}
      <FloralDivider />

      <p style={{ fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--warm-gray)", marginBottom: 18 }}>
        Our Memories
      </p>

      <Carousel />
    </section>
  );
}
