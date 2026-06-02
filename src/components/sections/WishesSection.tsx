// "use client";
// import { useEffect, useState } from "react";

// type Wish = { id: string; name: string; message: string; createdAt: string };

// export default function WishesSection() {
//   const [wishes, setWishes] = useState<Wish[]>([]);
//   const [name, setName] = useState("");
//   const [msg, setMsg] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [fetched, setFetched] = useState(false);

//   const fetchWishes = async () => {
//     try {
//       const res = await fetch("/api/wishes");
//       if (res.ok) {
//         const data = await res.json();
//         setWishes(data.wishes ?? []);
//       }
//     } catch { /* silent */ }
//     setFetched(true);
//   };

//   useEffect(() => { fetchWishes(); }, []);

//   const submit = async () => {
//     if (!name.trim() || !msg.trim()) return;
//     setLoading(true);
//     try {
//       const res = await fetch("/api/wishes", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, message: msg }),
//       });
//       if (res.ok) {
//         const data = await res.json();
//         setWishes(prev => [data.wish, ...prev]);
//         setName("");
//         setMsg("");
//       }
//     } catch { /* silent */ }
//     setLoading(false);
//   };

//   const labelCls = "block text-[10px] tracking-[.14em] uppercase mb-2 font-normal";
//   const labelStyle = { color: "var(--warm-gray)" };

//   return (
//     <section className="section text-center">
//       <p className="text-[10px] tracking-[.25em] uppercase mb-2" style={{ color: "var(--gold)" }}>
//         Doa &amp; Harapan
//       </p>
//       <h2 className="font-serif text-3xl font-normal mb-2" style={{ color: "var(--charcoal)" }}>
//         Ucapan Anda
//       </h2>
//       <div className="divider-gold mt-4 mb-10" />

//       {/* Form */}
//       <div className="max-w-sm mx-auto space-y-5 text-left mb-10">
//         <div>
//           <label className={labelCls} style={labelStyle}>Nama</label>
//           <input className="input-line" placeholder="Nama anda" value={name}
//                  onChange={e => setName(e.target.value)} />
//         </div>
//         <div>
//           <label className={labelCls} style={labelStyle}>Ucapan</label>
//           <textarea className="input-line" rows={3}
//                     placeholder="Tulis ucapan anda di sini…"
//                     value={msg} onChange={e => setMsg(e.target.value)}
//                     style={{ paddingTop: 8, resize: "none" }} />
//         </div>
//         <button className="btn-gold w-full" onClick={submit}
//                 disabled={loading || !name.trim() || !msg.trim()}>
//           {loading ? "Menghantar…" : "Kirim Ucapan"}
//         </button>
//       </div>

//       {/* Wishes wall */}
//       {fetched && wishes.length > 0 && (
//         <div className="max-w-sm mx-auto space-y-4 text-left">
//           {wishes.slice(0, 12).map(w => (
//             <div key={w.id} className="wish-card">
//               <div className="flex items-center gap-2 mb-2">
//                 <div style={{
//                   width: 32, height: 32, borderRadius: "50%",
//                   background: "var(--gold-light)",
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   fontSize: 12, fontWeight: 500, color: "var(--gold)",
//                   flexShrink: 0,
//                 }}>
//                   {w.name.charAt(0).toUpperCase()}
//                 </div>
//                 <div>
//                   <p className="text-[13px] font-normal" style={{ color: "var(--charcoal)" }}>
//                     {w.name}
//                   </p>
//                   <p className="text-[10px]" style={{ color: "var(--warm-gray)" }}>
//                     {new Date(w.createdAt).toLocaleDateString("ms-MY", {
//                       day: "numeric", month: "long", year: "numeric",
//                     })}
//                   </p>
//                 </div>
//               </div>
//               <p className="font-cormorant italic text-base leading-relaxed"
//                  style={{ color: "var(--warm-gray)", fontSize: 15 }}>
//                 &ldquo;{w.message}&rdquo;
//               </p>
//             </div>
//           ))}
//         </div>
//       )}

//       {fetched && wishes.length === 0 && (
//         <p className="font-cormorant italic text-base" style={{ color: "var(--warm-gray)" }}>
//           Jadilah yang pertama mengucapkan tahniah!
//         </p>
//       )}
//     </section>
//   );
// }
