"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, PlaySquare, Bot, Users, User, Radio, MessageCircle, Camera, Map, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const QUICK_ACTIONS = [
  { href: "/ia/swing",     icon: Camera,        label: "Filme ton swing",   bg: "rgba(201,168,76,0.1)", color: "#C9A84C" },
  { href: "/ia/questions", icon: MessageCircle, label: "Pose une question", bg: "rgba(201,168,76,0.1)", color: "#C9A84C" },
  { href: "/ia/strategie", icon: Map,           label: "Stratégie parcours",bg: "rgba(201,168,76,0.1)", color: "#C9A84C" },
];

const links = [
  { href: "/dashboard",   icon: Home,       label: "Accueil" },
  { href: "/bibliotheque",icon: PlaySquare,  label: "Bibliothèque" },
  { href: "/live",        icon: Radio,       label: "Live", live: true },
  { href: "/ia",          icon: Bot,         label: "Lolo IA", hasSubmenu: true },
  { href: "/communaute",  icon: Users,       label: "Communauté" },
  { href: "/profil",      icon: User,        label: "Mon profil" },
];

const IA_SUBMENU = [
  { href: "/ia/questions", icon: MessageCircle, label: "Discussion",  desc: "Questions & conseils" },
  { href: "/ia/swing",     icon: Camera,        label: "Mon Swing",   desc: "Analyse technique" },
  { href: "/ia/strategie", icon: Map,           label: "Stratégie",   desc: "Gestion de parcours" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [iaHovered, setIaHovered] = useState(false);

  return (
    <aside className="hidden md:flex flex-col w-60 min-h-screen fixed top-0 left-0 z-40"
      style={{ background: "#0A1A10", borderRight: "1px solid #2A4A35" }}
    >
      {/* Logo */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-3">
          <Image src="/ls-club-logo.svg" alt="LS Club" width={40} height={40} className="rounded-xl flex-shrink-0" />
          <div>
            <p className="font-serif font-bold text-lg leading-none" style={{ color: "#F5F0E8" }}>LS Club</p>
            <p className="text-[10px] mt-0.5" style={{ color: "#7A8A7A" }}>par Laurent Seinger</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 mb-3 h-px" style={{ background: "#2A4A35" }} />

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 px-3 flex-1">
        {links.map(({ href, icon: Icon, label, live, hasSubmenu }) => {
          const active = pathname.startsWith(href);

          if (hasSubmenu) {
            return (
              <div
                key={href}
                className="relative"
                onMouseEnter={() => setIaHovered(true)}
                onMouseLeave={() => setIaHovered(false)}
              >
                <Link
                  href={href}
                  className={cn(
                    "relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                    active
                      ? "text-[#C9A84C]"
                      : "text-[#7A8A7A] hover:text-[#F5F0E8] hover:bg-[#1B3A2A]"
                  )}
                  style={active ? { background: "rgba(201,168,76,0.1)" } : {}}
                >
                  <Icon size={17} strokeWidth={active ? 2.2 : 1.7} />
                  <span className="flex-1">{label}</span>
                  <ChevronRight size={13} className="transition-transform duration-150"
                    style={{ color: "#2A4A35", transform: iaHovered ? "rotate(90deg)" : "none" }} />
                </Link>

                {/* Submenu flottant */}
                {iaHovered && (
                  <div
                    className="absolute top-0 left-[228px] z-50 py-2 rounded-2xl"
                    style={{
                      background: "#0A1A10",
                      border: "1px solid #2A4A35",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                      width: "220px",
                    }}
                  >
                    <p className="text-[10px] font-bold tracking-widest uppercase px-4 pt-1 pb-2"
                      style={{ color: "#7A8A7A" }}>
                      Lolo IA
                    </p>
                    {IA_SUBMENU.map(({ href: subHref, icon: SubIcon, label: subLabel, desc }) => {
                      const subActive = pathname.startsWith(subHref);
                      return (
                        <Link
                          key={subHref}
                          href={subHref}
                          className="flex items-center gap-3 px-4 py-2.5 transition-all"
                          style={subActive ? {
                            background: "rgba(201,168,76,0.1)",
                          } : {}}
                          onMouseEnter={(e) => {
                            if (!subActive) (e.currentTarget as HTMLElement).style.background = "#1B3A2A";
                          }}
                          onMouseLeave={(e) => {
                            if (!subActive) (e.currentTarget as HTMLElement).style.background = "transparent";
                          }}
                        >
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{
                              background: subActive ? "rgba(201,168,76,0.15)" : "#1B3A2A",
                            }}>
                            <SubIcon size={13} style={{ color: subActive ? "#C9A84C" : "#7A8A7A" }} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold leading-none"
                              style={{ color: subActive ? "#C9A84C" : "#F5F0E8" }}>
                              {subLabel}
                            </p>
                            <p className="text-[10px] mt-0.5" style={{ color: "#7A8A7A" }}>{desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                active
                  ? "text-[#C9A84C]"
                  : "text-[#7A8A7A] hover:text-[#F5F0E8] hover:bg-[#1B3A2A]"
              )}
              style={active ? { background: "rgba(201,168,76,0.1)" } : {}}
            >
              <Icon size={17} strokeWidth={active ? 2.2 : 1.7} />
              <span>{label}</span>
              {live && (
                <span className="ml-auto flex items-center gap-1 text-[10px] font-bold" style={{ color: "#E05050" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  LIVE
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Quick actions */}
      <div className="mx-3 mt-4 mb-3">
        <p className="text-[9px] font-bold tracking-widest uppercase px-1 mb-2" style={{ color: "#7A8A7A" }}>
          Raccourcis
        </p>
        <div className="flex flex-col gap-1">
          {QUICK_ACTIONS.map(({ href, icon: Icon, label, bg, color }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all duration-150 hover:bg-[#1B3A2A]"
              style={{ color: "#7A8A7A" }}
            >
              <span
                className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ background: bg }}
              >
                <Icon size={11} style={{ color }} />
              </span>
              <span className="truncate">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Premium badge */}
      <div className="mx-4 mb-3 mt-1 rounded-xl p-3"
        style={{ background: "#1B3A2A", border: "1px solid #C9A84C" }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#C9A84C" }}>Premium</span>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#C9A84C" }} />
        </div>
        <p className="text-sm font-bold" style={{ color: "#F5F0E8" }}>LS Club</p>
        <p className="text-xs mt-0.5" style={{ color: "rgba(245,240,232,0.45)" }}>Accès illimité · Actif</p>
        <Link
          href="/admin"
          className="flex items-center justify-center gap-1.5 mt-3 py-1.5 rounded-lg text-[11px] font-bold transition-all"
          style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.28)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.15)"; }}
        >
          Mode Coach →
        </Link>
      </div>
    </aside>
  );
}
