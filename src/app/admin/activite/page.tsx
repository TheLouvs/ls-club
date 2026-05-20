"use client";

import { useState } from "react";
import { Play, MessageCircle, Trophy, LogIn, CheckCircle } from "lucide-react";
import { ACTIVITY_EVENTS, MEMBERS, getMemberById, formatDateTime } from "@/lib/mock-admin";

type EventType = "all" | "video_watched" | "question_asked" | "challenge_completed" | "login" | "module_completed";

const EVENT_META: Record<string, { label: string; icon: React.ReactNode; bg: string; color: string }> = {
  video_watched: { label: "Vidéo regardée", icon: <Play size={13} />, bg: "rgba(201,168,76,0.15)", color: "#C9A84C" },
  question_asked: { label: "Question posée", icon: <MessageCircle size={13} />, bg: "rgba(74,124,191,0.15)", color: "#7AAEE8" },
  challenge_completed: { label: "Challenge terminé", icon: <Trophy size={13} />, bg: "rgba(201,168,76,0.12)", color: "#DFC060" },
  login: { label: "Connexion", icon: <LogIn size={13} />, bg: "#132B1E", color: "#7A8A7A" },
  module_completed: { label: "Module terminé", icon: <CheckCircle size={13} />, bg: "rgba(201,168,76,0.15)", color: "#C9A84C" },
};

const sortedEvents = [...ACTIVITY_EVENTS].sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);

function getDateLabel(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  if (d.getTime() === today.getTime()) return "Aujourd'hui";
  if (d.getTime() === yesterday.getTime()) return "Hier";
  return date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
}

export default function ActivitePage() {
  const [filterMember, setFilterMember] = useState<string>("all");
  const [filterType, setFilterType] = useState<EventType>("all");

  // Stats globales
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const eventsThisWeek = ACTIVITY_EVENTS.filter((e) => new Date(e.createdAt) >= oneWeekAgo);
  const typeCounts = eventsThisWeek.reduce<Record<string, number>>((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + 1;
    return acc;
  }, {});
  const topTypeKey = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const topTypeLabel = topTypeKey ? EVENT_META[topTypeKey]?.label : null;
  const memberEventCounts = eventsThisWeek.reduce<Record<string, number>>((acc, e) => {
    acc[e.memberId] = (acc[e.memberId] || 0) + 1;
    return acc;
  }, {});
  const topMemberId = Object.entries(memberEventCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const topActiveMember = topMemberId ? getMemberById(topMemberId) : null;

  const filtered = sortedEvents.filter((e) => {
    const matchMember = filterMember === "all" || e.memberId === filterMember;
    const matchType = filterType === "all" || e.type === filterType;
    return matchMember && matchType;
  });

  // Regrouper par date
  const grouped: { label: string; events: typeof filtered }[] = [];
  let currentLabel = "";
  for (const event of filtered) {
    const label = getDateLabel(event.createdAt);
    if (label !== currentLabel) {
      currentLabel = label;
      grouped.push({ label, events: [] });
    }
    grouped[grouped.length - 1].events.push(event);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-bold" style={{ color: "#F5F0E8" }}>Activité</h1>
        <p className="text-sm mt-1" style={{ color: "#7A8A7A" }}>
          {ACTIVITY_EVENTS.length} événements enregistrés
        </p>
      </div>

      {/* Stats globales */}
      <div className="rounded-2xl p-4" style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <div>
            <p className="text-xl font-bold font-serif" style={{ color: "#F5F0E8" }}>{eventsThisWeek.length}</p>
            <p className="text-[11px]" style={{ color: "#7A8A7A" }}>événements cette semaine</p>
          </div>
          {topTypeLabel && (
            <div>
              <p className="text-sm font-semibold" style={{ color: "#F5F0E8" }}>{topTypeLabel}</p>
              <p className="text-[11px]" style={{ color: "#7A8A7A" }}>type le plus fréquent</p>
            </div>
          )}
          {topActiveMember && (
            <div>
              <p className="text-sm font-semibold" style={{ color: "#F5F0E8" }}>{topActiveMember.name}</p>
              <p className="text-[11px]" style={{ color: "#7A8A7A" }}>membre le plus actif</p>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {/* Member filter */}
        <div
          className="flex items-center"
          style={{ background: "#1B3A2A", border: "1px solid #2A4A35", borderRadius: "12px", overflow: "hidden" }}
        >
          <select
            value={filterMember}
            onChange={(e) => setFilterMember(e.target.value)}
            className="text-xs px-3 py-2 bg-transparent outline-none appearance-none cursor-pointer"
            style={{ color: "#7A8A7A" }}
          >
            <option value="all">Tous les membres</option>
            {MEMBERS.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>

        {/* Type filter */}
        <div className="flex gap-1 p-1 rounded-xl overflow-x-auto" style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}>
          <button
            onClick={() => setFilterType("all")}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex-shrink-0"
            style={filterType === "all" ? { background: "#C9A84C", color: "#0F2318" } : { color: "#7A8A7A" }}
          >
            Tout
          </button>
          {(Object.keys(EVENT_META) as EventType[]).map((type) => {
            const meta = EVENT_META[type as string];
            const active = filterType === type;
            return (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex-shrink-0"
                style={
                  active
                    ? { background: "#C9A84C", color: "#0F2318" }
                    : { color: "#7A8A7A" }
                }
              >
                <span>{meta.icon}</span>
                <span className="hidden sm:inline">{meta.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl p-10 text-center text-sm" style={{ background: "#1B3A2A", border: "1px solid #2A4A35", color: "#7A8A7A" }}>
          Aucune activité correspondante
        </div>
      ) : (
        <div className="space-y-6">
          {grouped.map(({ label, events }) => (
            <div key={label}>
              {/* Date header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold capitalize" style={{ color: "#7A8A7A" }}>{label}</span>
                <div className="flex-1 h-px" style={{ background: "#2A4A35" }} />
              </div>

              {/* Events */}
              <div className="rounded-2xl overflow-hidden" style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}>
                {events.map((event, i) => {
                  const member = getMemberById(event.memberId);
                  const meta = EVENT_META[event.type];
                  return (
                    <div
                      key={event.id}
                      className="flex items-start gap-4 px-5 py-3.5"
                      style={i < events.length - 1 ? { borderBottom: "1px solid #2A4A35" } : {}}
                    >
                      {/* Type icon */}
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: meta.bg, color: meta.color }}
                      >
                        {meta.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm" style={{ color: "#F5F0E8" }}>
                          <span className="font-medium">{member?.name}</span>{" "}
                          <span style={{ color: "#7A8A7A" }}>
                            {event.type === "video_watched" && "a regardé une vidéo"}
                            {event.type === "question_asked" && "a posé une question à Lolo IA"}
                            {event.type === "challenge_completed" && "a terminé un challenge"}
                            {event.type === "login" && "s'est connecté·e"}
                            {event.type === "module_completed" && "a complété un module"}
                          </span>
                        </p>
                        <p className="text-xs mt-0.5 truncate" style={{ color: "#7A8A7A" }}>
                          {event.description}
                        </p>
                      </div>

                      {/* Time */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {/* Member avatar */}
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold"
                          style={{ background: member?.avatarColor ?? "rgba(201,168,76,0.15)", color: "#0D1A09" }}
                        >
                          {member?.initials}
                        </div>
                        <span className="text-[11px]" style={{ color: "#7A8A7A" }}>
                          {new Date(event.createdAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
