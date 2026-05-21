"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUser, verifyPassword } from "@/lib/kv";
import { encodeSession } from "@/lib/session";

export async function login(_prev: unknown, formData: FormData) {
  const email = (formData.get("email") as string)?.toLowerCase().trim();
  const password = formData.get("password") as string;
  if (!email || !password) return { error: "Remplis tous les champs." };

  const user = await getUser(email);
  if (!user) return { error: "Aucun compte trouvé avec cet e-mail." };
  if (!verifyPassword(password, user.passwordHash)) return { error: "Mot de passe incorrect." };

  const adminEmails = (process.env.ADMIN_EMAILS ?? "").toLowerCase().split(",").map((e) => e.trim()).filter(Boolean);
  const isAdmin = adminEmails.includes(email);

  const cookieStore = await cookies();
  cookieStore.set("ls_session", encodeSession({ email, isAdmin }), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
  });
  redirect(isAdmin ? "/admin" : "/dashboard");
}
