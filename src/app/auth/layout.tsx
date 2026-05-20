import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5 py-12"
      style={{ background: "#0F2318" }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Image src="/ls-club-logo.svg" alt="LS Club" width={40} height={40} className="rounded-xl" />
        <span className="font-serif font-bold text-lg" style={{ color: "#F5F0E8" }}>
          LS Club
        </span>
      </Link>

      {/* Card */}
      <div
        className="w-full max-w-md p-7 md:p-9"
        style={{ background: "#1B3A2A", border: "1px solid #2A4A35", borderRadius: 16 }}
      >
        {children}
      </div>

      {/* Back link */}
      <Link
        href="/"
        className="mt-6 text-xs hover:underline"
        style={{ color: "rgba(245,240,232,0.35)" }}
      >
        ← Retour à l&apos;accueil
      </Link>
    </div>
  );
}
