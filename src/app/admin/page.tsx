import { adminDb } from "@/lib/firebase-admin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Timestamp } from "firebase-admin/firestore";
import AdminTable, { AdminRecord } from "@/components/AdminTable";
import { verifySession } from "@/app/api/admin/login/route";

async function getRsvps(): Promise<AdminRecord[]> {
  const snap = await adminDb.collection("rsvps").orderBy("submittedAt", "desc").get();
  return snap.docs.map(doc => {
    const d = doc.data();
    const date = d.submittedAt instanceof Timestamp ? d.submittedAt.toDate() : new Date();
    return {
      id:         doc.id,
      name:       d.name ?? "",
      email:      d.email ?? "",
      attending:  d.attending ?? "no",
      guestCount: d.guestCount ?? 1,
      notes:      d.notes ?? "",
      submittedAt: date.toISOString(),
    } satisfies AdminRecord;
  });
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ password?: string }>;
}) {
  const [cookieStore, params] = await Promise.all([cookies(), searchParams]);
  const token = cookieStore.get("admin_token")?.value;
  const isAuth = verifySession(token) || params.password === process.env.ADMIN_PASSWORD;
  if (!isAuth) redirect("/admin/login");

  const rsvps = await getRsvps();

  return (
    <main style={{ minHeight: "100vh", background: "#FDFAF5", padding: "48px 24px", fontFamily: "Jost, sans-serif" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <p style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "#C9A96E", marginBottom: 6 }}>
          Admin Dashboard
        </p>
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 32, fontWeight: 400, color: "#2C2926", marginBottom: 32 }}>
          Hajullah &amp; Syahirah — RSVP List
        </h1>

        <AdminTable initialRecords={rsvps} />
      </div>
    </main>
  );
}
