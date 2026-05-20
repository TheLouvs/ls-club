"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function register(_prev: unknown, formData: FormData) {
  const prenom = formData.get("prenom");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirm = formData.get("confirm");

  if (!prenom || !email || !password || !confirm)
    return { error: "Remplis tous les champs." };
  if (password !== confirm)
    return { error: "Les mots de passe ne correspondent pas." };
  if ((password as string).length < 8)
    return { error: "Le mot de passe doit faire au moins 8 caractères." };

  const cookieStore = await cookies();
  cookieStore.set("ls_session", "1", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
  });
  redirect("/dashboard");
}
