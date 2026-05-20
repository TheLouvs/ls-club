"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Bell, Search, Command, LogOut, Settings, User } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { SearchPalette } from "./SearchPalette";
import { NotificationDrawer, MOCK_NOTIFICATIONS } from "./NotificationDrawer";

export function Topbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const menuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Cmd+K global handler
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isK = e.key.toLowerCase() === "k";
      if (isK && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Click outside menu
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      window.addEventListener("mousedown", onClick);
      return () => window.removeEventListener("mousedown", onClick);
    }
  }, [menuOpen]);

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <>
      <header
        className="sticky top-0 z-30 flex items-center gap-3 px-4 md:px-6 h-14 md:h-15"
        style={{
          background: "rgba(15,35,24,0.95)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid #2A4A35",
          height: 56,
        }}
      >
        {/* Mobile logo */}
        <Link href="/dashboard" className="flex items-center gap-2 md:hidden flex-shrink-0">
          <Image src="/ls-club-logo.svg" alt="LS Club" width={28} height={28} className="rounded-lg" />
          <span className="font-serif font-bold text-sm" style={{ color: "#F5F0E8" }}>
            LS Club
          </span>
        </Link>

        {/* Search button (desktop) */}
        <button
          onClick={() => setSearchOpen(true)}
          className="hidden md:flex items-center gap-2 flex-1 max-w-md px-3.5 py-2 rounded-xl text-sm transition-colors"
          style={{
            background: "#132B1E",
            border: "1px solid #2A4A35",
            color: "#7A8A7A",
          }}
          aria-label="Rechercher"
        >
          <Search size={14} />
          <span className="flex-1 text-left">Rechercher des vidéos, modules, posts…</span>
          <span
            className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded"
            style={{ background: "#1B3A2A", color: "#C9A84C", border: "1px solid #2A4A35" }}
          >
            <Command size={10} />K
          </span>
        </button>

        {/* Spacer to push right items */}
        <div className="hidden md:block flex-1" />
        <div className="md:hidden flex-1" />

        {/* Mobile search icon */}
        <button
          onClick={() => setSearchOpen(true)}
          className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "#132B1E", color: "#C9A84C" }}
          aria-label="Rechercher"
        >
          <Search size={16} />
        </button>

        {/* Bell */}
        <button
          onClick={() => setNotifOpen(true)}
          className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
          style={{ color: "#C9A84C" }}
          aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} non lues)` : ""}`}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1B3A2A"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
        >
          <Bell size={16} />
          {unreadCount > 0 && (
            <span
              className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white px-1"
              style={{
                background: "#E05050",
                border: "2px solid #0F2318",
                lineHeight: 1,
              }}
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {/* Avatar dropdown (desktop) */}
        <div ref={menuRef} className="hidden md:block relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 px-1 py-1 rounded-xl transition-colors"
            style={{}}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1B3A2A"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            aria-label="Menu utilisateur"
            aria-expanded={menuOpen}
          >
            <Avatar initials="TL" variant="gold" size="sm" />
          </button>

          {menuOpen && (
            <div
              className="absolute top-full right-0 mt-2 w-56 rounded-2xl overflow-hidden"
              style={{
                background: "#1B3A2A",
                border: "1px solid #2A4A35",
                boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
              }}
            >
              <div className="px-4 py-3" style={{ borderBottom: "1px solid #2A4A35" }}>
                <p className="text-sm font-bold" style={{ color: "#F5F0E8" }}>
                  Thomas Louvrière
                </p>
                <p className="text-xs" style={{ color: "#7A8A7A" }}>
                  Index 18 · Premium
                </p>
              </div>
              <Link
                href="/profil"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm"
                style={{ color: "#F5F0E8" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1F4230"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <User size={14} style={{ color: "#C9A84C" }} />
                Mon profil
              </Link>
              <Link
                href="/profil/parametres"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm"
                style={{ color: "#F5F0E8" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1F4230"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <Settings size={14} style={{ color: "#C9A84C" }} />
                Paramètres
              </Link>
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm"
                style={{ color: "#E8A020", borderTop: "1px solid #2A4A35" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1F4230"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <LogOut size={14} />
                Se déconnecter
              </Link>
            </div>
          )}
        </div>
      </header>

      {searchOpen && <SearchPalette onClose={() => setSearchOpen(false)} />}
      <NotificationDrawer
        open={notifOpen}
        onClose={() => setNotifOpen(false)}
        notifications={notifications}
        onMarkAllRead={markAllRead}
      />
    </>
  );
}
