"use server";

import { redirect } from "next/navigation";
import { getUser, saveUser, hashPassword, saveVerificationCode } from "@/lib/kv";
import { sendVerificationEmail } from "@/lib/email";

function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function register(_prev: unknown, formData: FormData) {
  const nom = formData.get("nom") as string;
  const prenom = formData.get("prenom") as string;
  const email = (formData.get("email") as string)?.toLowerCase().trim();
  const password = formData.get("password") as string;
  const confirm = formData.get("confirm") as string;

  if (!nom || !prenom || !email || !password || !confirm)
    return { error: "Remplis tous les champs." };
  if (password !== confirm)
    return { error: "Les mots de passe ne correspondent pas." };
  if (password.length < 8)
    return { error: "Le mot de passe doit faire au moins 8 caractères." };

  const existing = await getUser(email);
  if (existing) return { error: "Un compte existe déjà avec cet e-mail." };

  await saveUser({
    email,
    nom,
    prenom,
    passwordHash: hashPassword(password),
    isAdmin: false,
    emailVerified: false,
    createdAt: new Date().toISOString(),
  });

  const code = generateCode();
  await saveVerificationCode(email, code);

  try {
    await sendVerificationEmail(email, prenom, code);
  } catch (err) {
    console.error("[Resend] Erreur envoi email:", err);
    return { error: `Erreur envoi e-mail : ${err instanceof Error ? err.message : String(err)}` };
  }

  redirect(`/auth/verification?email=${encodeURIComponent(email)}`);
}
