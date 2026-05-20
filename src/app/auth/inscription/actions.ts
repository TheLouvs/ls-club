"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUser, saveUser, hashPassword } from "@/lib/kv";
import { encodeSession } from "@/lib/session";

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
    createdAt: new Date().toISOString(),
  });

  const cookieStore = await cookies();
  cookieStore.set("ls_session", encodeSession({ email, isAdmin: false }), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
  });
  redirect("/dashboard");
}
