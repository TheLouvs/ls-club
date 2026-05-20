"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlaySquare, Bot, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", icon: Home, label: "Accueil", dot: false },
  { href: "/bibliotheque", icon: PlaySquare, label: "Vidéos", dot: false },
  { href: "/ia", icon: Bot, label: "Lolo IA", dot: false },
  { href: "/communaute", icon: Users, label: "Communauté", dot: true },
  { href: "/profil", icon: User, label: "Profil", dot: false },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: "#0A1A10",
        borderTop: "1px solid #2A4A35",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.3)",
      }}
    >
      <div className="flex items-center justify-around h-16 px-1">
        {links.map(({ href, icon: Icon, label, dot }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative flex flex-col items-center gap-1 px-3 py-2 transition-all duration-200",
                active ? "text-[#C9A84C]" : "text-[#3A4A3A]"
              )}
            >
              {active && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full"
                  style={{ background: "#C9A84C" }}
                />
              )}
              <span className="relative">
                <Icon size={21} strokeWidth={active ? 2.2 : 1.6} />
                {dot && !active && (
                  <span
                    className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full"
                    style={{ background: "#E05050", border: "1.5px solid #0A1A10" }}
                  />
                )}
              </span>
              <span className={cn("text-[9px] font-semibold tracking-wide")}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
