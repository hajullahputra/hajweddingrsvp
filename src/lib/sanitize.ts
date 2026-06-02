/** Strip all HTML tags and limit length — safe for Firestore storage and display */
export function sanitizeText(input: unknown, maxLen = 500): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>/g, "")   // strip HTML tags
    .replace(/[^\S\n]+/g, " ") // collapse whitespace
    .trim()
    .slice(0, maxLen);
}

/** Escape HTML entities — safe for embedding in HTML email bodies */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

/** Validate that a string is a safe Firestore document ID (alphanumeric + hyphens) */
export function isSafeId(id: unknown): id is string {
  return typeof id === "string" && /^[a-z0-9-]{1,64}$/.test(id);
}
