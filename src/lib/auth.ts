import crypto from "crypto";
import { cookies } from "next/headers";
import { client } from "@/lib/prisma";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const AUTH_SECRET = process.env.AUTH_SECRET || "fallback-secret-change-in-production";
const COOKIE_NAME = process.env.AUTH_COOKIE_NAME || "auth_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 days
const SESSIONS_FILE = ".sessions.json";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SessionUser {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  image: string | null;
}

export interface Session {
  userId: string;
  expiresAt: number;
}

// ---------------------------------------------------------------------------
// Password hashing (scrypt — no external dependency)
// ---------------------------------------------------------------------------

const SCRYPT_KEYLEN = 64;

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = await new Promise<string>((resolve, reject) => {
    crypto.scrypt(password, salt, SCRYPT_KEYLEN, (err, derivedKey) => {
      if (err) reject(err);
      else resolve(derivedKey.toString("hex"));
    });
  });
  return `${salt}:${hash}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const derived = await new Promise<string>((resolve, reject) => {
    crypto.scrypt(password, salt, SCRYPT_KEYLEN, (err, derivedKey) => {
      if (err) reject(err);
      else resolve(derivedKey.toString("hex"));
    });
  });
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(derived, "hex"));
}

// ---------------------------------------------------------------------------
// Session token signing (HMAC-SHA256)
// ---------------------------------------------------------------------------

function base64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64url");
}

function sign(data: string): string {
  return crypto.createHmac("sha256", AUTH_SECRET).update(data).digest("base64url");
}

function createToken(userId: string, expiresAt: number): string {
  const payload = base64url(JSON.stringify({ userId, expiresAt }));
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

function verifyToken(token: string): Session | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, signature] = parts;
  const expected = sign(payload);
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length) return null;
  if (!crypto.timingSafeEqual(sigBuf, expBuf)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof data.userId !== "string" || typeof data.expiresAt !== "number") return null;
    return { userId: data.userId, expiresAt: data.expiresAt };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// JSON-file session store
// ---------------------------------------------------------------------------

interface SessionStore {
  [sessionId: string]: Session;
}

async function readStore(): Promise<SessionStore> {
  try {
    const { readFile } = await import("fs/promises");
    const { join } = await import("path");
    const data = await readFile(join(process.cwd(), SESSIONS_FILE), "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function writeStore(store: SessionStore): Promise<void> {
  const { writeFile } = await import("fs/promises");
  const { join } = await import("path");
  await writeFile(join(process.cwd(), SESSIONS_FILE), JSON.stringify(store, null, 2), "utf-8");
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Create a new session for the given user and set the auth cookie.
 */
export async function createSession(userId: string): Promise<void> {
  const expiresAt = Date.now() + SESSION_DURATION_SECONDS * 1000;
  const token = createToken(userId, expiresAt);

  // Persist to JSON store
  const store = await readStore();
  store[token] = { userId, expiresAt };
  await writeStore(store);

  // Set cookie
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
    expires: new Date(expiresAt),
  });
}

/**
 * Retrieve the current session user, or null if not authenticated.
 */
export async function getSession(): Promise<SessionUser | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;

  const session = verifyToken(token);
  if (!session) return null;

  // Check expiry
  if (session.expiresAt < Date.now()) {
    await deleteSession();
    return null;
  }

  // Clean up expired sessions from store (best-effort)
  const store = await readStore();
  const now = Date.now();
  let changed = false;
  for (const [key, val] of Object.entries(store)) {
    if (val.expiresAt < now) {
      delete store[key];
      changed = true;
    }
  }
  if (changed) await writeStore(store);

  // Fetch user from DB
  const user = await client.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      email: true,
      firstname: true,
      lastname: true,
      image: true,
    },
  });

  return user;
}

/**
 * Delete the current session and clear the auth cookie.
 */
export async function deleteSession(): Promise<void> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (token) {
    const store = await readStore();
    delete store[token];
    await writeStore(store);
  }
  cookies().delete(COOKIE_NAME);
}

/**
 * Require authentication — returns the user or throws.
 */
export async function requireAuth(): Promise<SessionUser> {
  const user = await getSession();
  if (!user) throw new Error("Unauthorized");
  return user;
}
