"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(_prev: unknown, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  if (!email || !password) return { error: "Remplis tous les champs." };

  const cookieStore = await cookies();
  cookieStore.set("ls_session", "1", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
  });
  redirect("/dashboard");
}
