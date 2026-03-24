const SESSION_KEY = "ayra_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 horas

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyCredentials(
  username: string,
  password: string
): Promise<boolean> {
  const expectedHash = import.meta.env.VITE_DASHBOARD_HASH;
  if (!expectedHash) return false;
  const inputHash = await sha256(`${username}:${password}`);
  return inputHash === expectedHash;
}

export function createSession(): void {
  const expiry = Date.now() + SESSION_TTL_MS;
  const token = btoa(JSON.stringify({ expiry, v: "1" }));
  localStorage.setItem(SESSION_KEY, token);
}

export function isSessionValid(): boolean {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return false;
  try {
    const { expiry } = JSON.parse(atob(raw));
    return Date.now() < expiry;
  } catch {
    return false;
  }
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}
