"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Incorrect password.");
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-4">
      <div className="w-full max-w-xs text-center">
        <p className="font-serif italic text-[#8B8680] text-sm tracking-widest mb-2">
          admin access
        </p>
        <h1 className="font-serif text-3xl font-light text-[#2C2B29] mb-8">
          Hi Hajullah
        </h1>
        <div style={{ position: "relative", marginBottom: 24 }}>
          <input
            type={visible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="input-line text-center"
            placeholder="Enter password"
            style={{ paddingRight: 36 }}
          />
          <button
            type="button"
            onClick={() => setVisible(v => !v)}
            style={{
              position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", cursor: "pointer", padding: 4,
              color: "#8B8680",
            }}
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M1 9C1 9 4 3 9 3C14 3 17 9 17 9C17 9 14 15 9 15C4 15 1 9 1 9Z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
                <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.3" fill="none"/>
                <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M1 9C1 9 4 3 9 3C14 3 17 9 17 9C17 9 14 15 9 15C4 15 1 9 1 9Z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
                <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.3" fill="none"/>
              </svg>
            )}
          </button>
        </div>
        {error && (
          <p className="text-[11px] text-red-400 mb-4">{error}</p>
        )}
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-[#2C2B29] text-[#FAF9F6] text-[11px] tracking-[0.18em] uppercase font-light hover:opacity-75 transition-opacity"
        >
          Enter
        </button>
      </div>
    </main>
  );
}
