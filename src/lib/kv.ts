import { createHash } from "crypto";
import { kv } from "@vercel/kv";

export type KVUser = {
  email: string;
  nom: string;
  prenom: string;
  passwordHash: string;
  isAdmin: boolean;
  createdAt: string;
};

export function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export async function getUser(email: string): Promise<KVUser | null> {
  return kv.get<KVUser>(`user:${email.toLowerCase()}`);
}

export async function saveUser(user: KVUser): Promise<void> {
  await kv.set(`user:${user.email.toLowerCase()}`, user);
  await kv.sadd("users:all", user.email.toLowerCase());
}

export async function listUsers(): Promise<KVUser[]> {
  const emails = await kv.smembers<string[]>("users:all");
  if (!emails || emails.length === 0) return [];
  const users = await Promise.all(emails.map((e) => kv.get<KVUser>(`user:${e}`)));
  return users.filter((u): u is KVUser => u !== null && !u.isAdmin);
}
