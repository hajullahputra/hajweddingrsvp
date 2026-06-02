"use client";
import { useState } from "react";

export default function RsvpSection() {
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [submittedName, setSubmittedName] = useState("");

  const submit = async () => {
    if (!name.trim()) return;
    setStatus("loading");
    try {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(phone.trim());
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: isEmail ? phone.trim() : "no-email@rsvp.com",
          attending,
          guestCount: guests,
          notes: note,
        }),
      });
      if (!res.ok) throw new Error();
      setSubmittedName(name.split(" ")[0]);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <section className="section text-center" style={{ background: "var(--cream)", borderRadius: 32, margin: "0 16px", overflow: "hidden" }}>
        <div style={{ maxWidth: 340, margin: "0 auto" }}>
          {/* Floral thank-you ornament */}
          <div style={{ marginBottom: 20 }}>
            <svg width="80" height="52" viewBox="0 0 80 52" fill="none" style={{ display: "block", margin: "0 auto" }}>
              <path d="M40 48 Q30 36 18 30 Q8 24 6 12" stroke="#C9A96E" strokeWidth=".9" fill="none" opacity=".4"/>
              <path d="M40 48 Q50 36 62 30 Q72 24 74 12" stroke="#C9A96E" strokeWidth=".9" fill="none" opacity=".4"/>
              <circle cx="6"  cy="10" r="6" fill="#D4A5A5" opacity=".6"/>
              <circle cx="6"  cy="10" r="3" fill="#C49090" opacity=".5"/>
              <circle cx="74" cy="10" r="6" fill="#D4A5A5" opacity=".6"/>
              <circle cx="74" cy="10" r="3" fill="#C49090" opacity=".5"/>
              <circle cx="40" cy="8"  r="5" fill="#E8D5AA" opacity=".7"/>
              <circle cx="40" cy="8"  r="2.5" fill="#C9A96E" opacity=".6"/>
              <path d="M18 30 Q10 20 14 12 Q22 22 18 30Z" fill="#8A9E8B" opacity=".5"/>
              <path d="M62 30 Q70 20 66 12 Q58 22 62 30Z" fill="#8A9E8B" opacity=".5"/>
            </svg>
          </div>

          <p className="font-script" style={{ fontSize: 34, color: "var(--charcoal)", marginBottom: 8 }}>
            Thank You!
          </p>
          <p style={{ fontSize: 12, color: "var(--warm-gray)", marginBottom: 20, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
            {submittedName}
          </p>

          <div style={{ width: 60, height: 1, background: "var(--gold-light)", margin: "0 auto 20px" }} />

          <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--warm-gray)" }}>
            {attending === "yes"
              ? "We look forward to celebrating our special day with you. May your journey be blessed."
              : "We appreciate your response. May Allah bless you and your family."}
          </p>
        </div>
      </section>
    );
  }

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 9,
    letterSpacing: ".18em",
    textTransform: "uppercase",
    color: "var(--warm-gray)",
    marginBottom: 8,
    fontFamily: "'Jost', sans-serif",
    fontWeight: 400,
  };

  return (
    <section className="section text-center" style={{ background: "var(--cream)", borderRadius: 32, margin: "0 16px", overflow: "hidden" }}>
      {/* Section header */}
      <p style={{ fontSize: 9, letterSpacing: ".3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>
        Invitation Attendance
      </p>

      <p className="font-script" style={{ fontSize: 38, color: "var(--charcoal)", marginBottom: 6, lineHeight: 1.2 }}>
        RSVP
      </p>

      <p style={{ fontSize: 12, color: "var(--warm-gray)", marginBottom: 6, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
        Please respond before <strong style={{ fontStyle: "normal", color: "var(--charcoal)" }}>25 July 2026</strong>
      </p>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, margin: "16px 0 32px" }}>
        <div style={{ width: 40, height: 1, background: "var(--gold-light)" }} />
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="2" fill="var(--gold)" opacity=".6"/>
        </svg>
        <div style={{ width: 40, height: 1, background: "var(--gold-light)" }} />
      </div>

      {/* Form */}
      <div style={{ maxWidth: 360, margin: "0 auto", textAlign: "left" }}>

        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>Full Name</label>
          <input className="input-line" placeholder="Your name" value={name}
                 onChange={e => setName(e.target.value)} />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>Phone No. / Email</label>
          <input className="input-line" placeholder="+60 12-345 6789" value={phone}
                 onChange={e => setPhone(e.target.value)} />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>Attendance</label>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              className={`rsvp-toggle ${attending === "yes" ? "active" : ""}`}
              onClick={() => setAttending("yes")}
            >
              Attending ✓
            </button>
            <button
              className={`rsvp-toggle ${attending === "no" ? "active" : ""}`}
              onClick={() => setAttending("no")}
            >
              Not Attending ✕
            </button>
          </div>
        </div>

        {attending === "yes" && (
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Number of Guests (including you)</label>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8 }}>
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                style={{
                  width: 32, height: 32, borderRadius: "50%",
                  border: "1px solid var(--border)", background: "transparent",
                  cursor: "pointer", fontSize: 20, lineHeight: 1,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--warm-gray)",
                }}
              >−</button>
              <span className="font-serif" style={{ fontSize: 20, color: "var(--charcoal)", minWidth: 24, textAlign: "center" }}>
                {guests}
              </span>
              <button
                onClick={() => setGuests(Math.min(10, guests + 1))}
                style={{
                  width: 32, height: 32, borderRadius: "50%",
                  border: "1px solid var(--border)", background: "transparent",
                  cursor: "pointer", fontSize: 20, lineHeight: 1,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--warm-gray)",
                }}
              >+</button>
            </div>
          </div>
        )}

        <div style={{ marginBottom: 28 }}>
          <label style={labelStyle}>Wishes / Notes</label>
          <textarea className="input-line" rows={2}
                    placeholder="Your wishes or any notes for us…"
                    value={note} onChange={e => setNote(e.target.value)}
                    style={{ paddingTop: 8, resize: "none" }} />
        </div>

        {status === "error" && (
          <p style={{ fontSize: 12, textAlign: "center", color: "#C0392B", marginBottom: 14 }}>
            An error occurred. Please try again.
          </p>
        )}

        <button
          className="btn-gold"
          style={{ width: "100%" }}
          onClick={submit}
          disabled={status === "loading" || !name.trim()}
        >
          {status === "loading" ? "Sending…" : "Submit RSVP"}
        </button>
      </div>
    </section>
  );
}
