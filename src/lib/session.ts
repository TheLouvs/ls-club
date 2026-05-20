export type SessionData = { email: string; isAdmin: boolean };

export function encodeSession(data: SessionData): string {
  return Buffer.from(JSON.stringify(data)).toString("base64");
}

export function decodeSession(value: string): SessionData | null {
  try {
    return JSON.parse(Buffer.from(value, "base64").toString("utf-8")) as SessionData;
  } catch {
    return null;
  }
}
