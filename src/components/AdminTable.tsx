"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export type AdminRecord = {
  id: string;
  name: string;
  email: string;
  attending: string;
  guestCount?: number;
  notes?: string;
  submittedAt: string; // ISO string — Date serialised server-side
};

const cell: React.CSSProperties = { padding: "12px 14px", color: "#7A746E", fontSize: 13 };
const headCell: React.CSSProperties = { padding: "12px 14px", textAlign: "left", fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "#7A746E", fontWeight: 400 };

/* ── Export to Excel (CSV with BOM so Excel reads UTF-8) ── */
function exportCSV(records: AdminRecord[]) {
  const headers = ["Name", "Email / Phone", "Attending", "Guests", "Notes", "Date"];
  const rows = records.map(r => [
    r.name,
    r.email,
    r.attending === "yes" ? "Yes" : "No",
    r.attending === "yes" ? (r.guestCount ?? 1) : "—",
    r.notes ?? "",
    r.submittedAt ? new Date(r.submittedAt).toLocaleDateString("en-MY", { day: "numeric", month: "short", year: "numeric" }) : "",
  ]);
  const csv = [headers, ...rows]
    .map(row => row.map(c => `"${String(c).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `rsvp-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/* ── Edit modal ── */
function EditModal({
  record,
  onSave,
  onClose,
}: {
  record: AdminRecord;
  onSave: (updated: Partial<AdminRecord>) => Promise<void>;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: record.name,
    email: record.email,
    attending: record.attending,
    guestCount: record.guestCount ?? 1,
    notes: record.notes ?? "",
  });
  const [saving, setSaving] = useState(false);

  const set = (k: string, v: string | number) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  const label: React.CSSProperties = { display: "block", fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "#7A746E", marginBottom: 6 };
  const input: React.CSSProperties = { width: "100%", background: "transparent", border: "none", borderBottom: "1px solid #E8E0D4", padding: "8px 0", fontSize: 14, color: "#2C2926", outline: "none", fontFamily: "Jost, sans-serif" };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(44,41,38,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#FDFAF5", borderRadius: 8, padding: 32, width: "100%", maxWidth: 440, boxShadow: "0 8px 40px rgba(44,41,38,.18)" }}>
        <p style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "#C9A96E", marginBottom: 4 }}>Edit Record</p>
        <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 22, fontWeight: 400, color: "#2C2926", marginBottom: 24 }}>{record.name}</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div><label style={label}>Full Name</label><input style={input} value={form.name} onChange={e => set("name", e.target.value)} /></div>
          <div><label style={label}>Email / Phone</label><input style={input} value={form.email} onChange={e => set("email", e.target.value)} /></div>
          <div>
            <label style={label}>Attending</label>
            <div style={{ display: "flex", gap: 8 }}>
              {["yes", "no"].map(v => (
                <button key={v} onClick={() => set("attending", v)}
                  style={{ flex: 1, padding: "9px 8px", border: "1px solid", borderRadius: 4, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", cursor: "pointer", transition: "all .2s",
                    background: form.attending === v ? "#2C2926" : "transparent",
                    color: form.attending === v ? "#FDFAF5" : "#7A746E",
                    borderColor: form.attending === v ? "#2C2926" : "#E8E0D4",
                  }}>
                  {v === "yes" ? "Attending" : "Not Attending"}
                </button>
              ))}
            </div>
          </div>
          {form.attending === "yes" && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <label style={{ ...label, marginBottom: 0 }}>Guests</label>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <button onClick={() => set("guestCount", Math.max(1, form.guestCount - 1))} style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid #E8E0D4", background: "transparent", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "#7A746E" }}>−</button>
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: 18, color: "#2C2926", minWidth: 20, textAlign: "center" }}>{form.guestCount}</span>
                <button onClick={() => set("guestCount", Math.min(10, form.guestCount + 1))} style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid #E8E0D4", background: "transparent", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "#7A746E" }}>+</button>
              </div>
            </div>
          )}
          <div><label style={label}>Notes</label><textarea style={{ ...input, resize: "none", paddingTop: 8 }} rows={3} value={form.notes} onChange={e => set("notes", e.target.value)} /></div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "11px 0", border: "1px solid #E8E0D4", background: "transparent", borderRadius: 4, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", cursor: "pointer", color: "#7A746E" }}>Cancel</button>
          <button onClick={handleSave} disabled={saving} style={{ flex: 2, padding: "11px 0", background: "#C9A96E", color: "#fff", border: "none", borderRadius: 4, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", cursor: "pointer", opacity: saving ? .6 : 1 }}>
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main table ── */
export default function AdminTable({ initialRecords }: { initialRecords: AdminRecord[] }) {
  const [records, setRecords] = useState(initialRecords);
  const [editRecord, setEditRecord] = useState<AdminRecord | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently delete this RSVP?")) return;
    setDeleting(id);
    await fetch(`/api/admin/rsvp/${id}`, { method: "DELETE" });
    setRecords(r => r.filter(x => x.id !== id));
    setDeleting(null);
  };

  const handleSave = async (updated: Partial<AdminRecord>) => {
    if (!editRecord) return;
    await fetch(`/api/admin/rsvp/${editRecord.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setRecords(r => r.map(x => x.id === editRecord.id ? { ...x, ...updated } : x));
    setEditRecord(null);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/");
  };

  const attending = records.filter(r => r.attending === "yes");
  const totalGuests = attending.reduce((s, r) => s + (r.guestCount ?? 1), 0);

  return (
    <>
      {editRecord && (
        <EditModal record={editRecord} onSave={handleSave} onClose={() => setEditRecord(null)} />
      )}

      {/* Action bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => exportCSV(records)}
            style={{ padding: "9px 18px", background: "#C9A96E", color: "#fff", border: "none", borderRadius: 4, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1 V8.5 M3.5 6 L6.5 9 L9.5 6" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 10 H12 V12 H1 Z" fill="#fff" opacity=".7"/>
            </svg>
            Export to Excel
          </button>
        </div>
        <button
          onClick={handleLogout}
          style={{ padding: "9px 18px", background: "transparent", color: "#7A746E", border: "1px solid #E8E0D4", borderRadius: 4, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", cursor: "pointer" }}
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Total Responses", v: records.length },
          { label: "Attending",       v: attending.length },
          { label: "Total Guests",    v: totalGuests },
          { label: "Not Attending",   v: records.length - attending.length },
        ].map(s => (
          <div key={s.label} style={{ background: "#fff", border: "1px solid #E8E0D4", padding: "20px 18px" }}>
            <p style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "#7A746E", marginBottom: 8 }}>{s.label}</p>
            <p style={{ fontFamily: "Playfair Display, serif", fontSize: 30, fontWeight: 400, color: "#2C2926" }}>{s.v}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid #E8E0D4", overflowX: "auto", borderRadius: 4 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #E8E0D4" }}>
              {["Name", "Email / Phone", "Attending", "Guests", "Notes", "Date", "Actions"].map(h => (
                <th key={h} style={headCell as React.CSSProperties}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map(r => (
              <tr key={r.id} style={{ borderBottom: "1px solid #E8E0D4", opacity: deleting === r.id ? .4 : 1, transition: "opacity .2s" }}>
                <td style={{ ...cell, color: "#2C2926", fontWeight: 400 }}>{r.name}</td>
                <td style={{ ...cell, fontSize: 12 }}>{r.email}</td>
                <td style={cell}>
                  <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 20, background: r.attending === "yes" ? "#EAF3DE" : "#FCEBEB", color: r.attending === "yes" ? "#3B6D11" : "#A32D2D" }}>
                    {r.attending === "yes" ? "Yes" : "No"}
                  </span>
                </td>
                <td style={cell}>{r.attending === "yes" ? r.guestCount : "—"}</td>
                <td style={{ ...cell, fontSize: 12, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.notes ?? "—"}</td>
                <td style={{ ...cell, fontSize: 12, whiteSpace: "nowrap" }}>
                  {r.submittedAt ? new Date(r.submittedAt).toLocaleDateString("en-MY", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                </td>
                <td style={{ ...cell, whiteSpace: "nowrap" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      onClick={() => setEditRecord(r)}
                      style={{ padding: "5px 12px", background: "transparent", border: "1px solid #E8E0D4", borderRadius: 4, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", cursor: "pointer", color: "#7A746E" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(r.id)}
                      disabled={deleting === r.id}
                      style={{ padding: "5px 12px", background: "transparent", border: "1px solid #FCEBEB", borderRadius: 4, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", cursor: "pointer", color: "#A32D2D" }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {records.length === 0 && (
          <p style={{ textAlign: "center", padding: "40px", color: "#B0A898", fontStyle: "italic", fontFamily: "Playfair Display, serif" }}>
            No RSVPs yet.
          </p>
        )}
      </div>
    </>
  );
}
