"use client";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

// ── Wishlist items — update these with your actual registry ──────────────────
const WISHLIST = [
  { id: "microwave",      category: "Kitchen",      name: "Microwave",        note: "Any good brand" },
  { id: "tupperware-set", category: "Kitchen",      name: "Tupperware Set",   note: "Food storage containers" },
  { id: "dinner-set",     category: "Kitchen",      name: "Dinner Set",       note:"Any" },
  { id: "bedsheet-set",   category: "Home",         name: "Bedsheet Set",     note: "King size bed" },
  { id: "towel-set",      category: "Home",         name: "Towel Set",        note: "Bath + hand towels" },
  { id: "hair dryer",     category: "Home",         name: "Hair Dryer",       note: "Any good brand" },
];

type Reservation = { reservedBy: string };

/* ── Reserve name modal ─────────────────────────────────────────────────────── */
function ReserveModal({
  item,
  onConfirm,
  onClose,
}: {
  item: typeof WISHLIST[number];
  onConfirm: (name: string) => Promise<void>;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    if (!name.trim()) { setError("Please enter your name."); return; }
    setLoading(true);
    setError("");
    try {
      await onConfirm(name.trim());
    } catch (e: any) {
      setError(e.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(44,41,38,.5)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <div style={{
        background: "var(--ivory)", borderRadius: 16, padding: 28,
        width: "100%", maxWidth: 340,
        boxShadow: "0 8px 40px rgba(44,41,38,.18)",
      }}>
        <p style={{ fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 4 }}>
          Reserve Item
        </p>
        <p className="font-script" style={{ fontSize: 24, color: "var(--charcoal)", marginBottom: 16, lineHeight: 1.2 }}>
          {item.name}
        </p>

        <label style={{ display: "block", fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--warm-gray)", marginBottom: 6 }}>
          Your Name
        </label>
        <input
          className="input-line"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleConfirm()}
          autoFocus
        />

        {error && (
          <p style={{ fontSize: 11, color: "#C0392B", marginTop: 8 }}>{error}</p>
        )}

        <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "11px 0", border: "1px solid var(--border)",
            background: "transparent", borderRadius: 8, fontSize: 11,
            letterSpacing: ".12em", textTransform: "uppercase",
            cursor: "pointer", color: "var(--warm-gray)",
          }}>Cancel</button>
          <button onClick={handleConfirm} disabled={loading} style={{
            flex: 2, padding: "11px 0", background: "var(--gold)",
            color: "#fff", border: "none", borderRadius: 8, fontSize: 11,
            letterSpacing: ".12em", textTransform: "uppercase",
            cursor: loading ? "default" : "pointer", opacity: loading ? .6 : 1,
          }}>
            {loading ? "Reserving…" : "Confirm Reserve"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main section ───────────────────────────────────────────────────────────── */
export default function WishlistSection() {
  const [reservations, setReservations] = useState<Record<string, Reservation>>({});
  const [pending, setPending] = useState<typeof WISHLIST[number] | null>(null);
  const [justReserved, setJustReserved] = useState<string | null>(null);

  // Real-time listener on Firestore reservations collection
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "reservations"), snap => {
      const map: Record<string, Reservation> = {};
      snap.forEach(doc => { map[doc.id] = doc.data() as Reservation; });
      setReservations(map);
    });
    return () => unsub();
  }, []);

  const handleReserve = async (name: string) => {
    if (!pending) return;
    const res = await fetch("/api/reserve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId: pending.id, name }),
    });
    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error === "Already reserved" ? "This item was just taken. Please choose another." : error);
    }
    setJustReserved(pending.id);
    setPending(null);
    setTimeout(() => setJustReserved(null), 3000);
  };

  const reservedCount = Object.keys(reservations).length;

  return (
    <>
      {pending && (
        <ReserveModal
          item={pending}
          onConfirm={handleReserve}
          onClose={() => setPending(null)}
        />
      )}

      <section
        id="wishlist"
        className="section text-center"
        style={{ background: "var(--ivory)", borderRadius: 32, margin: "0 16px", overflow: "hidden" }}
      >
        {/* Top floral */}
        <svg width="220" height="90" viewBox="0 0 220 90" fill="none" style={{ display: "block", margin: "0 auto 12px", opacity: .75 }}>
          <path d="M110 85 Q85 65 60 50 Q38 38 18 20" stroke="#C9A96E" strokeWidth=".9" fill="none" opacity=".4"/>
          <path d="M110 85 Q135 65 160 50 Q182 38 202 20" stroke="#C9A96E" strokeWidth=".9" fill="none" opacity=".4"/>
          <path d="M110 85 Q108 60 108 38 Q108 22 110 8" stroke="#C9A96E" strokeWidth=".7" fill="none" opacity=".3"/>
          {/* Left rose */}
          <circle cx="18" cy="18" r="13" fill="#D4A5A5" opacity=".65"/>
          <circle cx="18" cy="18" r="8"  fill="#C49090" opacity=".5"/>
          <circle cx="18" cy="18" r="4"  fill="#A07070" opacity=".45"/>
          {/* Right rose */}
          <circle cx="202" cy="18" r="13" fill="#D4A5A5" opacity=".65"/>
          <circle cx="202" cy="18" r="8"  fill="#C49090" opacity=".5"/>
          <circle cx="202" cy="18" r="4"  fill="#A07070" opacity=".45"/>
          {/* Centre blossom */}
          <circle cx="110" cy="7"  r="8"   fill="#E8D5AA" opacity=".75"/>
          <circle cx="110" cy="7"  r="4"   fill="#C9A96E" opacity=".65"/>
          <circle cx="110" cy="7"  r="1.8" fill="#B8924D" opacity=".65"/>
          {/* Small side blossoms */}
          <circle cx="62"  cy="48" r="7" fill="#D4A5A5" opacity=".55"/>
          <circle cx="62"  cy="48" r="3.5" fill="#C49090" opacity=".45"/>
          <circle cx="158" cy="48" r="7" fill="#D4A5A5" opacity=".55"/>
          <circle cx="158" cy="48" r="3.5" fill="#C49090" opacity=".45"/>
          {/* Leaves */}
          <path d="M38 38 Q24 26 30 12 Q44 26 38 38Z"  fill="#8A9E8B" opacity=".55"/>
          <path d="M182 38 Q196 26 190 12 Q176 26 182 38Z" fill="#8A9E8B" opacity=".55"/>
          <path d="M82 28  Q68 16 74 4   Q88 18 82 28Z"   fill="#8A9E8B" opacity=".45"/>
          <path d="M138 28 Q152 16 146 4  Q132 18 138 28Z" fill="#8A9E8B" opacity=".45"/>
          {/* Gold dots */}
          <circle cx="50"  cy="50" r="2" fill="#C9A96E" opacity=".4"/>
          <circle cx="170" cy="50" r="2" fill="#C9A96E" opacity=".4"/>
          <circle cx="110" cy="22" r="1.5" fill="#E8D5AA" opacity=".45"/>
        </svg>

        {/* Header */}
        <p style={{ fontSize: 9, letterSpacing: ".3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>
          Gift Registry
        </p>
        <p className="font-script" style={{ fontSize: 36, color: "var(--charcoal)", lineHeight: 1.2, marginBottom: 6 }}>
          Our Wishlist
        </p>
        <p className="font-cormorant italic" style={{ fontSize: 14, color: "var(--warm-gray)", marginBottom: 4 }}>
          Your presence is our greatest gift. If you wish to bless us further:
        </p>
        <p style={{ fontSize: 10, color: "var(--warm-gray)", opacity: .6, marginBottom: 6 }}>
          {reservedCount} of {WISHLIST.length} items reserved
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, margin: "14px 0 24px" }}>
          <div style={{ width: 36, height: 1, background: "var(--gold-light)" }} />
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="2" fill="var(--gold)" opacity=".6"/>
          </svg>
          <div style={{ width: 36, height: 1, background: "var(--gold-light)" }} />
        </div>

        {/* Vertical scroll container — shows ~3 cards */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          maxHeight: 480,
          overflowY: "auto",
          paddingRight: 4,
          scrollSnapType: "y mandatory",
          scrollbarWidth: "thin",
          scrollbarColor: "var(--gold-light) transparent",
        }}>
          {WISHLIST.map(item => {
            const res = reservations[item.id];
            const isReserved = !!res;
            const justGot = justReserved === item.id;

            return (
              <div
                key={item.id}
                style={{
                  scrollSnapAlign: "start",
                  background: isReserved ? "#F9F6F0" : "#fff",
                  border: `1px solid ${isReserved ? "var(--gold-light)" : "var(--border)"}`,
                  borderRadius: 16,
                  padding: "18px 14px 14px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  boxShadow: "0 2px 10px rgba(44,41,38,.05)",
                  transition: "opacity .3s",
                  opacity: isReserved ? .8 : 1,
                }}
              >
                {/* Category label */}
                <p style={{ fontSize: 8, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 2 }}>
                  {item.category}
                </p>

                {/* Gold diamond icon */}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="7" y=".8" width="8.8" height="8.8" rx="1.2"
                    transform="rotate(45 7 .8)"
                    fill={isReserved ? "var(--sage)" : "var(--gold)"} opacity=".5"/>
                </svg>

                {/* Item name */}
                <p style={{ fontSize: 13, color: "var(--charcoal)", fontWeight: 400, lineHeight: 1.3, textAlign: "center" }}>
                  {item.name}
                </p>
                <p style={{ fontSize: 10, color: "var(--warm-gray)", lineHeight: 1.4, textAlign: "center" }}>
                  {item.note}
                </p>

                {/* Spacer */}
                <div style={{ flex: 1 }} />

                {/* ── Indicator ── */}
                {isReserved ? (
                  <div style={{
                    marginTop: 8, width: "100%",
                    background: "rgba(138,158,139,.15)",
                    border: "1px solid var(--sage)",
                    borderRadius: 20, padding: "5px 0",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                  }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <circle cx="5" cy="5" r="4.5" stroke="var(--sage)" strokeWidth="1"/>
                      <path d="M2.5 5 L4 6.5 L7.5 3.5" stroke="var(--sage)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ fontSize: 8, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--sage)" }}>
                      Reserved
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => setPending(item)}
                    style={{
                      marginTop: 8, width: "100%",
                      background: justGot ? "rgba(138,158,139,.15)" : "transparent",
                      border: "1px solid var(--gold-light)",
                      borderRadius: 20, padding: "5px 0",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                      cursor: "pointer", transition: "all .2s",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,169,110,.1)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <circle cx="5" cy="5" r="4.5" stroke="var(--gold)" strokeWidth="1"/>
                      <path d="M5 2.5 V7.5 M2.5 5 H7.5" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    <span style={{ fontSize: 8, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--gold-dark)" }}>
                      Reserve Item
                    </span>
                  </button>
                )}

                {/* Reserved by */}
                {isReserved && (
                  <p style={{ fontSize: 9, color: "var(--warm-gray)", opacity: .7, textAlign: "center" }}>
                    by {res.reservedBy}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Scroll hint */}
        <p style={{ fontSize: 9, color: "var(--warm-gray)", opacity: .45, marginTop: 8, letterSpacing: ".1em" }}>
          ↕ scroll to see all items
        </p>

        {/* ── Bank QR Code ── */}
        <div style={{
          marginTop: 24,
          background: "#fff",
          border: "1px solid var(--gold-light)",
          borderRadius: 16,
          padding: "20px 20px 16px",
          maxWidth: 280,
          marginLeft: "auto",
          marginRight: "auto",
        }}>
          <p style={{ fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 4 }}>
            Cash Gift
          </p>
          <p className="font-script" style={{ fontSize: 22, color: "var(--charcoal)", marginBottom: 16, lineHeight: 1.2 }}>
            Scan to Transfer
          </p>

          {/* QR image */}
          <div style={{
            display: "flex", justifyContent: "center",
            background: "var(--ivory)", borderRadius: 10,
            padding: 12, marginBottom: 14,
          }}>
            <img
              src="/qr-code.png"
              alt="Bank QR Code"
              onError={e => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
                (e.currentTarget.nextSibling as HTMLElement).style.display = "flex";
              }}
              style={{ width: 160, height: 160, objectFit: "contain" }}
            />
            {/* Placeholder shown if no image */}
            <div style={{
              display: "none", width: 160, height: 160,
              border: "2px dashed var(--gold-light)", borderRadius: 8,
              flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" opacity=".3">
                <rect x="2" y="2" width="14" height="14" rx="2" stroke="var(--gold)" strokeWidth="1.5"/>
                <rect x="20" y="2" width="14" height="14" rx="2" stroke="var(--gold)" strokeWidth="1.5"/>
                <rect x="2" y="20" width="14" height="14" rx="2" stroke="var(--gold)" strokeWidth="1.5"/>
                <rect x="6" y="6" width="6" height="6" rx="1" fill="var(--gold)"/>
                <rect x="24" y="6" width="6" height="6" rx="1" fill="var(--gold)"/>
                <rect x="6" y="24" width="6" height="6" rx="1" fill="var(--gold)"/>
                <rect x="22" y="22" width="3" height="3" fill="var(--gold)" opacity=".6"/>
                <rect x="27" y="22" width="3" height="3" fill="var(--gold)" opacity=".6"/>
                <rect x="22" y="27" width="3" height="3" fill="var(--gold)" opacity=".6"/>
                <rect x="27" y="27" width="3" height="3" fill="var(--gold)" opacity=".6"/>
              </svg>
              <p style={{ fontSize: 9, color: "var(--warm-gray)", letterSpacing: ".12em", textTransform: "uppercase" }}>
                Add qr-code.png
              </p>
            </div>
          </div>

          <p style={{ fontSize: 11, color: "var(--charcoal)", fontWeight: 400, marginBottom: 2 }}>
            Hajullah Putra bin Md Taib
          </p>
          <p style={{ fontSize: 10, color: "var(--warm-gray)" }}>
            Maybank · 1622 1877 3978
          </p>
        </div>

        {/* Bottom floral — mirrored */}
        <svg width="220" height="90" viewBox="0 0 220 90" fill="none" style={{ display: "block", margin: "12px auto 0", opacity: .75, transform: "scaleY(-1)" }}>
          <path d="M110 85 Q85 65 60 50 Q38 38 18 20" stroke="#C9A96E" strokeWidth=".9" fill="none" opacity=".4"/>
          <path d="M110 85 Q135 65 160 50 Q182 38 202 20" stroke="#C9A96E" strokeWidth=".9" fill="none" opacity=".4"/>
          <path d="M110 85 Q108 60 108 38 Q108 22 110 8" stroke="#C9A96E" strokeWidth=".7" fill="none" opacity=".3"/>
          <circle cx="18"  cy="18" r="13" fill="#D4A5A5" opacity=".65"/>
          <circle cx="18"  cy="18" r="8"  fill="#C49090" opacity=".5"/>
          <circle cx="18"  cy="18" r="4"  fill="#A07070" opacity=".45"/>
          <circle cx="202" cy="18" r="13" fill="#D4A5A5" opacity=".65"/>
          <circle cx="202" cy="18" r="8"  fill="#C49090" opacity=".5"/>
          <circle cx="202" cy="18" r="4"  fill="#A07070" opacity=".45"/>
          <circle cx="110" cy="7"  r="8"  fill="#E8D5AA" opacity=".75"/>
          <circle cx="110" cy="7"  r="4"  fill="#C9A96E" opacity=".65"/>
          <circle cx="110" cy="7"  r="1.8" fill="#B8924D" opacity=".65"/>
          <circle cx="62"  cy="48" r="7"  fill="#D4A5A5" opacity=".55"/>
          <circle cx="62"  cy="48" r="3.5" fill="#C49090" opacity=".45"/>
          <circle cx="158" cy="48" r="7"  fill="#D4A5A5" opacity=".55"/>
          <circle cx="158" cy="48" r="3.5" fill="#C49090" opacity=".45"/>
          <path d="M38 38 Q24 26 30 12 Q44 26 38 38Z"   fill="#8A9E8B" opacity=".55"/>
          <path d="M182 38 Q196 26 190 12 Q176 26 182 38Z" fill="#8A9E8B" opacity=".55"/>
          <path d="M82 28  Q68 16 74 4  Q88 18 82 28Z"   fill="#8A9E8B" opacity=".45"/>
          <path d="M138 28 Q152 16 146 4 Q132 18 138 28Z" fill="#8A9E8B" opacity=".45"/>
          <circle cx="50"  cy="50" r="2" fill="#C9A96E" opacity=".4"/>
          <circle cx="170" cy="50" r="2" fill="#C9A96E" opacity=".4"/>
        </svg>
      </section>
    </>
  );
}
