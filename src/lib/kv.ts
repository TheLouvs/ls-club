import { createHash } from "crypto";

export type KVUser = {
  email: string;
  nom: string;
  prenom: string;
  passwordHash: string;
  isAdmin: boolean;
  createdAt: string;
  emailVerified?: boolean;
};

type VerificationEntry = { code: string; expiresAt: number };

// In-memory fallback for local dev (no Vercel KV env vars)
const _mem = new Map<string, unknown>();
const _sets = new Map<string, Set<string>>();

async function kvOp<T>(
  kvFn: () => Promise<T>,
  fallback: () => T
): Promise<T> {
  if (!process.env.KV_REST_API_URL) return fallback();
  try {
    return await kvFn();
  } catch {
    return fallback();
  }
}

export function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export async function getUser(email: string): Promise<KVUser | null> {
  const key = `user:${email.toLowerCase()}`;
  return kvOp(
    async () => {
      const { kv } = await import("@vercel/kv");
      return kv.get<KVUser>(key);
    },
    () => (_mem.get(key) as KVUser) ?? null
  );
}

export async function saveUser(user: KVUser): Promise<void> {
  const key = `user:${user.email.toLowerCase()}`;
  await kvOp(
    async () => {
      const { kv } = await import("@vercel/kv");
      await kv.set(key, user);
      await kv.sadd("users:all", user.email.toLowerCase());
    },
    () => {
      _mem.set(key, user);
      if (!_sets.has("users:all")) _sets.set("users:all", new Set());
      _sets.get("users:all")!.add(user.email.toLowerCase());
    }
  );
}

export async function saveVerificationCode(email: string, code: string): Promise<void> {
  const key = `verify:${email.toLowerCase()}`;
  const entry: VerificationEntry = { code, expiresAt: Date.now() + 15 * 60 * 1000 };
  await kvOp(
    async () => {
      const { kv } = await import("@vercel/kv");
      await kv.set(key, entry, { ex: 900 });
    },
    () => { _mem.set(key, entry); }
  );
}

export async function getVerificationCode(email: string): Promise<VerificationEntry | null> {
  const key = `verify:${email.toLowerCase()}`;
  return kvOp(
    async () => {
      const { kv } = await import("@vercel/kv");
      return kv.get<VerificationEntry>(key);
    },
    () => (_mem.get(key) as VerificationEntry) ?? null
  );
}

export async function deleteVerificationCode(email: string): Promise<void> {
  const key = `verify:${email.toLowerCase()}`;
  await kvOp(
    async () => {
      const { kv } = await import("@vercel/kv");
      await kv.del(key);
    },
    () => { _mem.delete(key); }
  );
}

export async function listUsers(): Promise<KVUser[]> {
  return kvOp(
    async () => {
      const { kv } = await import("@vercel/kv");
      const emails = await kv.smembers<string[]>("users:all");
      if (!emails || emails.length === 0) return [];
      const users = await Promise.all(emails.map((e) => kv.get<KVUser>(`user:${e}`)));
      return users.filter((u): u is KVUser => u !== null && !u.isAdmin);
    },
    () => {
      const set = _sets.get("users:all");
      if (!set) return [];
      return Array.from(set)
        .map((e) => _mem.get(`user:${e}`) as KVUser | undefined)
        .filter((u): u is KVUser => !!u && !u.isAdmin);
    }
  );
}
