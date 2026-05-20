"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Bell, Heart, MessageCircle, Trophy, Radio, Bot, X, CheckCheck } from "lucide-react";

type NotifKind = "live" | "comment" | "like" | "challenge" | "ai" | "system";

type Notif = {
  id: number;
  kind: NotifKind;
  title: string;
  body: string;
  time: string;
  read: boolean;
  href?: string;
};

export const MOCK_NOTIFICATIONS: Notif[] = [
  {
    id: 1,
    kind: "live",
    title: "Live dans 30 minutes",
    body: "Laurent ouvre la session « Le putting » à 18h00.",
    time: "Il y a 5 min",
    read: false,
    href: "/live",
  },
  {
    id: 2,
    kind: "comment",
    title: "Marie F. a commenté ton post",
    body: "« Félicitations ! C'est un souvenir inoubliable 🏆 »",
    time: "Il y a 1h",
    read: false,
    href: "/communaute",
  },
  {
    id: 3,
    kind: "ai",
    title: "Lolo IA · Recommandation du jour",
    body: "Ton point faible cette semaine : la rotation. 1 vidéo prête pour toi.",
    time: "Il y a 3h",
    read: false,
    href: "/ia/questions",
  },
  {
    id: 4,
    kind: "like",
    title: "Sophie R. et 12 autres ont aimé ton post",
    body: "« Premier eagle de ma vie aujourd'hui sur le trou 7 ! »",
    time: "Hier",
    read: true,
    href: "/communaute",
  },
  {
    id: 5,
    kind: "challenge",
    title: "Nouveau challenge : Mon meilleur drive",
    body: "32 participants · Termine dans 5 jours",
    time: "Il y a 2j",
    read: true,
    href: "/communaute",
  },
];

const ICON_MAP: Record<NotifKind, { icon: typeof Bell; bg: string; color: string }> = {
  live: { icon: Radio, bg: "rgba(224,80,80,0.12)", color: "#E05050" },
  comment: { icon: MessageCircle, bg: "rgba(201,168,76,0.12)", color: "#C9A84C" },
  like: { icon: Heart, bg: "rgba(201,168,76,0.12)", color: "#C9A84C" },
  challenge: { icon: Trophy, bg: "rgba(201,168,76,0.12)", color: "#C9A84C" },
  ai: { icon: Bot, bg: "rgba(201,168,76,0.12)", color: "#C9A84C" },
  system: { icon: Bell, bg: "#1B3A2A", color: "#7A8A7A" },
};

export function NotificationDrawer({
  open,
  onClose,
  notifications,
  onMarkAllRead,
}: {
  open: boolean;
  onClose: () => void;
  notifications: Notif[];
  onMarkAllRead: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[70]"
        style={{
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className="fixed top-0 right-0 bottom-0 z-[71] w-full sm:w-[380px] flex flex-col"
        style={{
          background: "#1B3A2A",
          borderLeft: "1px solid #2A4A35",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: "-12px 0 32px rgba(0,0,0,0.4)",
        }}
        aria-hidden={!open}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid #2A4A35" }}
        >
          <div>
            <p className="font-serif font-bold text-lg" style={{ color: "#F5F0E8" }}>
              Notifications
            </p>
            <p className="text-xs" style={{ color: "#7A8A7A" }}>
              {unreadCount === 0
                ? "Tout est lu"
                : `${unreadCount} non lue${unreadCount > 1 ? "s" : ""}`}
            </p>
          </div>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllRead}
                className="flex items-center gap-1 text-xs font-semibold px-2 py-1.5 rounded-lg"
                style={{ color: "#0F2318", background: "#C9A84C" }}
                aria-label="Marquer comme lu"
              >
                <CheckCheck size={12} />
                Tout lu
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ color: "#7A8A7A" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1F4230"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              aria-label="Fermer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto py-2">
          {notifications.length === 0 ? (
            <div className="py-12 text-center px-6">
              <div
                className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center"
                style={{ background: "#132B1E" }}
              >
                <Bell size={20} style={{ color: "#C9A84C" }} />
              </div>
              <p className="text-sm font-semibold" style={{ color: "#F5F0E8" }}>
                Pas de notifications
              </p>
              <p className="text-xs mt-1" style={{ color: "#7A8A7A" }}>
                Tu seras prévenu·e ici dès qu&apos;un live démarre ou qu&apos;on te répond.
              </p>
            </div>
          ) : (
            notifications.map((n) => {
              const meta = ICON_MAP[n.kind];
              const Icon = meta.icon;
              const content = (
                <div
                  className="flex gap-3 px-5 py-3 cursor-pointer transition-colors"
                  style={{
                    background: n.read ? "transparent" : "rgba(201,168,76,0.06)",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1F4230"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = n.read ? "transparent" : "rgba(201,168,76,0.06)"; }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: meta.bg }}
                  >
                    <Icon size={15} style={{ color: meta.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                      <p
                        className="text-sm font-semibold leading-tight"
                        style={{ color: "#F5F0E8" }}
                      >
                        {n.title}
                      </p>
                      {!n.read && (
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                          style={{ background: "#C9A84C" }}
                        />
                      )}
                    </div>
                    <p
                      className="text-xs leading-relaxed mb-1"
                      style={{ color: "rgba(245,240,232,0.72)" }}
                    >
                      {n.body}
                    </p>
                    <p className="text-[11px]" style={{ color: "#7A8A7A" }}>
                      {n.time}
                    </p>
                  </div>
                </div>
              );

              return n.href ? (
                <Link key={n.id} href={n.href} onClick={onClose} className="block">
                  {content}
                </Link>
              ) : (
                <div key={n.id}>{content}</div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div
          className="px-5 py-3 flex-shrink-0"
          style={{ borderTop: "1px solid #2A4A35" }}
        >
          <Link
            href="/profil/notifications"
            onClick={onClose}
            className="block text-center text-sm font-semibold py-2 rounded-xl"
            style={{ background: "#C9A84C", color: "#0F2318" }}
          >
            Voir toutes les notifications
          </Link>
        </div>
      </aside>
    </>
  );
}
