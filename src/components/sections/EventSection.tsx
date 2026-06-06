"use client";

const events = [
  {
    title: "Wedding Reception",
    day: "Saturday",
    date: "1 August 2026",
    time: "11:00 AM – 4:00 PM",
    venue: "KT Ballroom Seksyen 24 Shah Alam",
    address: "3, Jalan Pudina 24/39A, Seksyen 24, 40300 Shah Alam, Selangor",
    dresscode: "Semi-formal",
    arrival: "12:15 PM",
    mapsUrl: "https://maps.google.com/?q=KT+Ballroom+Seksyen+24+Shah+Alam",
    wazeUrl: "https://waze.com/ul?q=KT+Ballroom+Seksyen+24+Shah+Alam&navigate=yes",
  },
];

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 20 }}>
      <p style={{ fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "'Jost', sans-serif", fontWeight: 400, marginBottom: 4 }}>
        {label}
      </p>
      <p style={{ fontSize: 13, color: "var(--charcoal)", lineHeight: 1.55, fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
        {value}
      </p>
    </div>
  );
}

/* ── Floral corner for section header ── */
function SmallFloral() {
  return (
    <svg width="80" height="50" viewBox="0 0 80 50" fill="none" style={{ display: "block", margin: "0 auto" }}>
      {/* Stem */}
      <path d="M40 45 Q35 32 28 22 Q22 14 15 8" stroke="#C9A96E" strokeWidth=".9" fill="none" opacity=".4"/>
      <path d="M40 45 Q45 32 52 22 Q58 14 65 8" stroke="#C9A96E" strokeWidth=".9" fill="none" opacity=".4"/>
      {/* Rose left */}
      <circle cx="14" cy="8"  r="7" fill="#D4A5A5" opacity=".65"/>
      <circle cx="14" cy="8"  r="4" fill="#C49090" opacity=".5"/>
      <circle cx="14" cy="8"  r="2" fill="#A07070" opacity=".45"/>
      {/* Rose right */}
      <circle cx="66" cy="8"  r="7" fill="#D4A5A5" opacity=".65"/>
      <circle cx="66" cy="8"  r="4" fill="#C49090" opacity=".5"/>
      <circle cx="66" cy="8"  r="2" fill="#A07070" opacity=".45"/>
      {/* Center blossom */}
      <circle cx="40" cy="10" r="5" fill="#E8D5AA" opacity=".7"/>
      <circle cx="40" cy="10" r="2.5" fill="#C9A96E" opacity=".6"/>
      {/* Leaves */}
      <path d="M24 22 Q16 14 20 8  Q28 16 24 22Z" fill="#8A9E8B" opacity=".55"/>
      <path d="M56 22 Q64 14 60 8  Q52 16 56 22Z" fill="#8A9E8B" opacity=".55"/>
      {/* Small buds */}
      <circle cx="32" cy="16" r="2.5" fill="#D4A5A5" opacity=".5"/>
      <circle cx="48" cy="16" r="2.5" fill="#D4A5A5" opacity=".5"/>
    </svg>
  );
}

export default function EventSection() {
  return (
    <section className="section section-alt text-center" style={{ borderRadius: 32, margin: "0 16px", overflow: "hidden" }}>
      {/* Floral header ornament */}
      <div style={{ marginBottom: 16 }}>
        <SmallFloral />
      </div>

      {/* Label */}
      <p style={{
        fontSize: 9, letterSpacing: ".3em", textTransform: "uppercase",
        color: "var(--gold)", marginBottom: 8,
      }}>
        Putra &amp; Syahirah
      </p>

      {/* Title */}
      <p
        className="font-script"
        style={{ fontSize: 36, color: "var(--charcoal)", marginBottom: 6, lineHeight: 1.2 }}
      >
        Wedding Celebration
      </p>

      {/* Subtitle */}
      <p style={{ fontSize: 12, color: "var(--warm-gray)", marginBottom: 6, fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif" }}>
        1st August 2026
      </p>

      {/* Divider */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, margin: "16px 0 28px" }}>
        <div style={{ width: 40, height: 1, background: "var(--gold-light)" }} />
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="2" fill="var(--gold)" opacity=".6"/>
        </svg>
        <div style={{ width: 40, height: 1, background: "var(--gold-light)" }} />
      </div>

      {/* Event cards */}
      <div style={{ maxWidth: 380, margin: "0 auto" }}>
        {events.map(ev => (
          <div key={ev.title} style={{
            background: "#fff",
            border: "1px solid var(--border)",
            borderRadius: 6,
            padding: "28px 24px",
            textAlign: "center",
            boxShadow: "0 2px 16px rgba(44,41,38,.04)",
          }}>
            {/* Card header */}
            <div style={{ marginBottom: 20 }}>
              <p
                className="font-script"
                style={{ fontSize: 24, color: "var(--charcoal)", marginBottom: 4, lineHeight: 1.2 }}
              >
                {ev.title}
              </p>
              <p style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)" }}>
                {ev.day}, {ev.date}
              </p>
            </div>

            <div style={{ height: 1, background: "var(--border)", marginBottom: 20 }} />

            {/* Info rows */}
            <InfoRow label="Time"      value={ev.time} />
            <InfoRow label="Venue"     value={ev.venue} />
            <InfoRow label="Address"   value={ev.address} />
            <InfoRow label="Dresscode" value={ev.dresscode} />
            <InfoRow label="Bride & Groom Arrival"   value={ev.arrival} />
            {/* Navigation buttons */}
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
              {/* Google Maps */}
              <a
                href={ev.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "8px 14px",
                  border: "1px solid var(--gold)",
                  borderRadius: 20, fontSize: 10,
                  letterSpacing: ".12em", textTransform: "uppercase",
                  textDecoration: "none", color: "var(--gold)",
                  fontFamily: "'Jost', sans-serif", fontWeight: 400,
                  transition: "all .2s",
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "var(--gold)"; el.style.color = "#fff"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "transparent"; el.style.color = "var(--gold)"; }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor" opacity=".9"/>
                  <circle cx="12" cy="9" r="2.5" fill="#fff"/>
                </svg>
                Google Maps
              </a>

              {/* Waze */}
              <a
                href={ev.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "8px 14px",
                  background: "#33CCFF", color: "#fff",
                  border: "1px solid #33CCFF",
                  borderRadius: 20, fontSize: 10,
                  letterSpacing: ".12em", textTransform: "uppercase",
                  textDecoration: "none", fontFamily: "'Jost', sans-serif",
                  fontWeight: 400, transition: "opacity .2s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = ".8"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="10" r="8" fill="#fff" opacity=".3"/>
                  <circle cx="12" cy="10" r="5.5" fill="#fff"/>
                  <circle cx="10" cy="9" r="1" fill="#33CCFF"/>
                  <circle cx="14" cy="9" r="1" fill="#33CCFF"/>
                  <path d="M9.5 11.5 Q12 13.5 14.5 11.5" stroke="#33CCFF" strokeWidth="1" strokeLinecap="round" fill="none"/>
                  <circle cx="9"  cy="16" r="1.5" fill="#fff"/>
                  <circle cx="15" cy="16" r="1.5" fill="#fff"/>
                </svg>
                Waze
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
