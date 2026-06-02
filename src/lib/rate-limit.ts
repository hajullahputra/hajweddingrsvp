type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

const LIMITS: Record<string, { max: number; windowMs: number }> = {
  rsvp:        { max: 20, windowMs: 60_000 },   // 20 submissions / min
  reserve:     { max: 10, windowMs: 60_000 },   // 10 reservations / min
  adminLogin:  { max: 8,  windowMs: 60_000 },   // 8 login attempts / min
  adminAction: { max: 30, windowMs: 60_000 },   // 30 admin actions / min
};

export function rateLimit(
  ip: string,
  action: keyof typeof LIMITS
): { ok: boolean; retryAfter?: number } {
  const cfg = LIMITS[action];
  const key = `${action}:${ip}`;
  const now = Date.now();

  let entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    entry = { count: 1, resetAt: now + cfg.windowMs };
    store.set(key, entry);
    return { ok: true };
  }

  entry.count += 1;

  if (entry.count > cfg.max) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  return { ok: true };
}

export function getIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}
