"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getUser,
  saveUser,
  getVerificationCode,
  deleteVerificationCode,
  saveVerificationCode,
} from "@/lib/kv";
import { encodeSession } from "@/lib/session";
import { sendVerificationEmail } from "@/lib/email";

function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function verifyCode(_prev: unknown, formData: FormData) {
  const email = (formData.get("email") as string)?.toLowerCase().trim();
  const code = (formData.get("code") as string)?.trim();

  if (!email || !code) return { error: "Informations manquantes." };

  const entry = await getVerificationCode(email);
  if (!entry) return { error: "Aucun code trouvé. Renvoie un nouveau code." };
  if (Date.now() > entry.expiresAt) return { error: "Code expiré. Renvoie un nouveau code." };
  if (entry.code !== code) return { error: "Code incorrect. Vérifie et réessaie." };

  const user = await getUser(email);
  if (!user) return { error: "Compte introuvable." };

  await saveUser({ ...user, emailVerified: true });
  await deleteVerificationCode(email);

  const cookieStore = await cookies();
  cookieStore.set("ls_session", encodeSession({ email, isAdmin: false }), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
  });

  redirect("/dashboard");
}

export async function resendCode(_prev: unknown, formData: FormData) {
  const email = (formData.get("email") as string)?.toLowerCase().trim();
  if (!email) return { error: "E-mail manquant." };

  const user = await getUser(email);
  if (!user) return { error: "Compte introuvable." };

  const code = generateCode();
  await saveVerificationCode(email, code);

  try {
    await sendVerificationEmail(email, user.prenom, code);
  } catch {
    return { error: "Impossible d'envoyer l'e-mail. Réessaie dans un instant." };
  }

  return { success: "Nouveau code envoyé !" };
}
