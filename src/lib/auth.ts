const SESSION_KEY = "ayra_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

const ATTEMPTS_KEY = "ayra_login_attempts";
const LOCKOUT_KEY = "ayra_login_lockout";
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 10 * 60 * 1000;

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function getHmacKey(): Promise<CryptoKey> {
  const keyMaterial = new TextEncoder().encode(import.meta.env.VITE_DASHBOARD_HASH);
  return crypto.subtle.importKey(
    "raw",
    keyMaterial,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

async function signPayload(payload: string): Promise<string> {
  const key = await getHmacKey();
  const data = new TextEncoder().encode(payload);
  const sigBuffer = await crypto.subtle.sign("HMAC", key, data);
  return btoa(String.fromCharCode(...new Uint8Array(sigBuffer)));
}

async function verifyPayload(payload: string, sigB64: string): Promise<boolean> {
  try {
    const key = await getHmacKey();
    const data = new TextEncoder().encode(payload);
    const sigBytes = Uint8Array.from(atob(sigB64), (c) => c.charCodeAt(0));
    return crypto.subtle.verify("HMAC", key, sigBytes, data);
  } catch {
    return false;
  }
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

export async function createSession(): Promise<void> {
  const expiry = Date.now() + SESSION_TTL_MS;
  const payload = JSON.stringify({ expiry, v: "2" });
  const sig = await signPayload(payload);
  const token = btoa(JSON.stringify({ payload, sig }));
  localStorage.setItem(SESSION_KEY, token);
}

export async function isSessionValid(): Promise<boolean> {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return false;
  try {
    const { payload, sig } = JSON.parse(atob(raw));
    if (!payload || !sig) return false;
    const valid = await verifyPayload(payload, sig);
    if (!valid) return false;
    const { expiry, v } = JSON.parse(payload);
    if (v !== "2") return false;
    return Date.now() < expiry;
  } catch {
    return false;
  }
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

// Rate limiting

export function recordFailedAttempt(): void {
  const attempts = parseInt(localStorage.getItem(ATTEMPTS_KEY) ?? "0", 10) + 1;
  localStorage.setItem(ATTEMPTS_KEY, String(attempts));
  if (attempts >= MAX_ATTEMPTS) {
    localStorage.setItem(LOCKOUT_KEY, String(Date.now() + LOCKOUT_MS));
  }
}

export function isLockedOut(): boolean {
  const lockoutUntil = parseInt(localStorage.getItem(LOCKOUT_KEY) ?? "0", 10);
  if (!lockoutUntil) return false;
  if (Date.now() < lockoutUntil) return true;
  localStorage.removeItem(LOCKOUT_KEY);
  localStorage.removeItem(ATTEMPTS_KEY);
  return false;
}

export function getRemainingLockoutMs(): number {
  const lockoutUntil = parseInt(localStorage.getItem(LOCKOUT_KEY) ?? "0", 10);
  if (!lockoutUntil) return 0;
  const remaining = lockoutUntil - Date.now();
  return remaining > 0 ? remaining : 0;
}

export function getFailedAttempts(): number {
  return parseInt(localStorage.getItem(ATTEMPTS_KEY) ?? "0", 10);
}

export function clearAttempts(): void {
  localStorage.removeItem(ATTEMPTS_KEY);
  localStorage.removeItem(LOCKOUT_KEY);
}
