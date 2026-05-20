"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, PlaySquare, MessageSquare, Activity, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const ADMIN_LINKS = [
  { href: "/admin", icon: LayoutDashboard, label: "Vue d'ensemble", shortLabel: "Accueil", exact: true },
  { href: "/admin/membres", icon: Users, label: "Membres", shortLabel: "Membres" },
  { href: "/admin/videos", icon: PlaySquare, label: "Progression vidéos", shortLabel: "Vidéos" },
  { href: "/admin/questions", icon: MessageSquare, label: "Questions IA", shortLabel: "Questions" },
  { href: "/admin/activite", icon: Activity, label: "Activité", shortLabel: "Activité" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <>
    <aside
      className="hidden md:flex flex-col w-60 min-h-screen fixed top-0 left-0 z-40"
      style={{ background: "#1A3410", borderRight: "1px solid rgba(201,168,76,0.2)" }}
    >
      {/* Logo */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(145deg, #2D4D1A, #3A6020)" }}
          >
            <span className="font-serif font-bold text-sm" style={{ color: "#C9A84C" }}>LS</span>
          </div>
          <div>
            <p className="font-serif font-bold text-lg leading-none" style={{ color: "#FFFFFF" }}>LS Club</p>
            <span
              className="inline-block text-[9px] font-bold tracking-widest uppercase mt-0.5 px-1.5 py-0.5 rounded"
              style={{ background: "rgba(201,168,76,0.2)", color: "#C9A84C" }}
            >
              Mode Coach
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 mb-3 h-px" style={{ background: "rgba(201,168,76,0.15)" }} />

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 px-3 flex-1">
        {ADMIN_LINKS.map(({ href, icon: Icon, label, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                active
                  ? "text-[#C9A84C]"
                  : "text-[rgba(255,255,255,0.55)] hover:text-[rgba(255,255,255,0.9)] hover:bg-[rgba(255,255,255,0.06)]"
              )}
              style={active ? { background: "rgba(201,168,76,0.12)" } : {}}
            >
              <Icon size={17} strokeWidth={active ? 2.2 : 1.7} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Retour app membre */}
      <div className="mx-3 mb-4">
        <div className="h-px mb-3" style={{ background: "rgba(255,255,255,0.08)" }} />
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
          style={{ color: "rgba(255,255,255,0.4)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
        >
          <ArrowLeft size={15} strokeWidth={1.7} />
          <span>Retour à l'app</span>
        </Link>
      </div>
    </aside>

    {/* Mobile bottom navigation */}
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-stretch"
      style={{ background: "#1A3410", borderTop: "1px solid rgba(201,168,76,0.2)", paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {ADMIN_LINKS.map(({ href, icon: Icon, shortLabel, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className="flex-1 flex flex-col items-center justify-center py-2.5 gap-1 text-[10px] font-medium transition-colors"
            style={{ color: active ? "#C9A84C" : "rgba(255,255,255,0.45)" }}
          >
            <Icon size={20} strokeWidth={active ? 2.2 : 1.7} />
            <span>{shortLabel}</span>
          </Link>
        );
      })}
    </nav>
    </>
  );
}
