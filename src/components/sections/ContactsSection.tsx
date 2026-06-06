"use client";

// ── Update these with the actual contact details ──────────────────────────────
const CONTACTS = [
  { role: "Groom's sister",  name: "Hjh Dang Arfah",  phone: "+6016-3222004" },
  { role: "Groom's sister",  name: "Nilam Sari",   phone: "+6016-9832110" },
];

export default function ContactsSection() {
  return (
    <section
      id="contacts"
      className="section text-center"
      style={{ background: "var(--ivory)", borderRadius: 32, margin: "0 16px", overflow: "hidden" }}
    >
      {/* Header */}
      <p style={{ fontSize: 9, letterSpacing: ".3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>
        Get In Touch
      </p>
      <p className="font-script" style={{ fontSize: 36, color: "var(--charcoal)", lineHeight: 1.2, marginBottom: 8 }}>
        Contacts
      </p>
      <p className="font-cormorant italic" style={{ fontSize: 14, color: "var(--warm-gray)", marginBottom: 24 }}>
        Questions, please reach out to:
      </p>

      {/* Divider */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 24 }}>
        <div style={{ width: 36, height: 1, background: "var(--gold-light)" }} />
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="2" fill="var(--gold)" opacity=".6"/>
        </svg>
        <div style={{ width: 36, height: 1, background: "var(--gold-light)" }} />
      </div>

      {/* Contact cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {CONTACTS.map(c => (
          <div
            key={c.name}
            style={{
              background: "#fff",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: "20px 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              boxShadow: "0 2px 10px rgba(44,41,38,.05)",
            }}
          >
            {/* Role badge */}
            <p style={{ fontSize: 8, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 2 }}>
              {c.role}
            </p>

            {/* Diamond icon */}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="7" y=".8" width="8.8" height="8.8" rx="1.2"
                transform="rotate(45 7 .8)" fill="var(--gold)" opacity=".45"/>
            </svg>

            {/* Name */}
            <p className="font-script" style={{ fontSize: 26, color: "var(--charcoal)", lineHeight: 1.2 }}>
              {c.name}
            </p>

            <div style={{ width: 28, height: 1, background: "var(--gold-light)", margin: "2px 0" }} />

            {/* Phone number — tappable */}
            <a
              href={`tel:${c.phone.replace(/\s/g, "")}`}
              style={{ textDecoration: "none" }}
            >
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "rgba(201,169,110,.08)",
                border: "1px solid var(--gold-light)",
                borderRadius: 20, padding: "6px 14px",
                marginTop: 4,
              }}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M2 1h2.5l1 2.5-1.5 1a6 6 0 0 0 2.5 2.5l1-1.5L10 7.5V10a1 1 0 0 1-1 1A9 9 0 0 1 1 2a1 1 0 0 1 1-1z"
                    stroke="var(--gold-dark)" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: 12, color: "var(--gold-dark)", letterSpacing: ".06em", fontWeight: 400 }}>
                  {c.phone}
                </span>
              </div>
            </a>

            {/* WhatsApp link */}
            <a
              href={`https://wa.me/${c.phone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                borderRadius: 20, padding: "5px 14px",
                marginTop: 2,
              }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 5.99L0 24l6.18-1.57A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.23-1.43l-.37-.22-3.87.99 1.02-3.76-.24-.38A9.96 9.96 0 0 1 2 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.96 9.96 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.44-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51H6.9c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.08-.13-.27-.2-.57-.35z"
                    fill="#25D366" opacity=".8"/>
                </svg>
                <span style={{ fontSize: 11, color: "#25D366", letterSpacing: ".06em" }}>
                  WhatsApp
                </span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
