"use client";

import { ArrowLeft, Play, Trophy, Dumbbell, Star, Bell, BellOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const recentNotifications = [
  {
    icon: Play,
    iconColor: "#C9A84C",
    iconBg: "rgba(201,168,76,0.12)",
    title: "Nouvelle vidéo disponible",
    subtitle: "Le chip autour du green — Technique avancée",
    time: "Il y a 2h",
    unread: true,
  },
  {
    icon: Trophy,
    iconColor: "#C9A84C",
    iconBg: "rgba(201,168,76,0.12)",
    title: "Défi complété !",
    subtitle: "Tu as terminé le défi \"7 jours de putting\"",
    time: "Hier",
    unread: true,
  },
  {
    icon: Dumbbell,
    iconColor: "#D09030",
    iconBg: "rgba(176,90,16,0.12)",
    title: "Rappel d'entraînement",
    subtitle: "Reprends là où tu t'es arrêté : Le Swing",
    time: "Il y a 2 jours",
    unread: false,
  },
  {
    icon: Star,
    iconColor: "#C9A84C",
    iconBg: "rgba(201,168,76,0.12)",
    title: "Session live ce soir",
    subtitle: "Laurent anime une session analyse de swing à 19h",
    time: "Il y a 3 jours",
    unread: false,
  },
];

const initialPreferences = [
  { label: "Nouvelles vidéos", description: "Dès qu'une vidéo est publiée", enabled: true },
  { label: "Rappels d'entraînement", description: "Chaque jour à 18h", enabled: true },
  { label: "Actualités du club", description: "Sessions live et événements", enabled: false },
];

export default function NotificationsPage() {
  const [preferences, setPreferences] = useState(initialPreferences);

  function togglePref(index: number) {
    setPreferences((prev) =>
      prev.map((p, i) => (i === index ? { ...p, enabled: !p.enabled } : p))
    );
  }

  return (
    <div className="px-4 py-4 md:px-8 max-w-3xl mx-auto w-full">

      <div className="flex items-center gap-3 mb-4">
        <Link href="/profil" className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}>
          <ArrowLeft size={15} style={{ color: "#7A8A7A" }} />
        </Link>
        <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#7A8A7A" }}>
          Notifications
        </p>
      </div>

      {/* Activité récente */}
      <div className="card-white overflow-hidden mb-4">
        <div className="px-4 pt-4 pb-2">
          <p className="text-xs font-bold" style={{ color: "#7A8A7A" }}>ACTIVITÉ RÉCENTE</p>
        </div>
        {recentNotifications.map(({ icon: Icon, iconColor, iconBg, title, subtitle, time, unread }, i) => (
          <div key={title}
            className="flex items-start gap-3 px-4 py-3"
            style={{ borderTop: i > 0 ? "1px solid #2A4A35" : "none", background: unread ? "rgba(201,168,76,0.04)" : "transparent" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: iconBg }}>
              <Icon size={15} style={{ color: iconColor }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold leading-tight" style={{ color: "#F5F0E8" }}>{title}</p>
                <span className="text-[10px] flex-shrink-0 mt-0.5" style={{ color: "#7A8A7A" }}>{time}</span>
              </div>
              <p className="text-xs mt-0.5 leading-tight" style={{ color: "#7A8A7A" }}>{subtitle}</p>
            </div>
            {unread && (
              <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: "#C9A84C" }} />
            )}
          </div>
        ))}
      </div>

      {/* Préférences */}
      <p className="text-[10px] font-bold tracking-widest uppercase mb-3 px-1" style={{ color: "#7A8A7A" }}>
        PRÉFÉRENCES
      </p>
      <div className="card-white overflow-hidden">
        {preferences.map(({ label, description, enabled }, i) => (
          <div key={label}
            className="flex items-center gap-3 px-4 py-3.5"
            style={{ borderTop: i > 0 ? "1px solid #2A4A35" : "none" }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "#132B1E" }}>
              {enabled ? <Bell size={14} style={{ color: "#C9A84C" }} /> : <BellOff size={14} style={{ color: "#7A8A7A" }} />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium" style={{ color: "#F5F0E8" }}>{label}</p>
              <p className="text-[11px]" style={{ color: "#7A8A7A" }}>{description}</p>
            </div>
            <button
              onClick={() => togglePref(i)}
              className="w-11 h-6 rounded-full flex items-center px-0.5 flex-shrink-0 transition-colors duration-200"
              style={{ background: enabled ? "#C9A84C" : "#2A4A35" }}>
              <div className="w-5 h-5 rounded-full transition-all duration-200"
                style={{ background: "#FFFFFF", marginLeft: enabled ? "auto" : "0", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
