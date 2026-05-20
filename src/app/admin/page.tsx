"use client";

import Link from "next/link";
import {
  Users, PlaySquare, MessageSquare, Flame,
  TrendingUp, Play, MessageCircle, Trophy, LogIn, CheckCircle,
} from "lucide-react";
import {
  MEMBERS, IA_QUESTIONS, ACTIVITY_EVENTS, timeAgo, getMemberById,
} from "@/lib/mock-admin";

// ─── KPI data (non-date-dependent) ──────────
const totalActive = MEMBERS.filter((m) => m.subscription === "active").length;
const videosThisWeek = 47; // mock aggregate

// ─── Top 5 membres les plus actifs ──────────
const topMembers = [...MEMBERS]
  .filter((m) => m.subscription === "active")
  .sort((a, b) => b.totalVideosWatched - a.totalVideosWatched)
  .slice(0, 5);

// ─── Dernières actions ───────────────────────
const recentEvents = [...ACTIVITY_EVENTS]
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  .slice(0, 6);

// ─── Dernières questions ─────────────────────
const recentQuestions = [...IA_QUESTIONS]
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  .slice(0, 3);

// ─── Helpers ─────────────────────────────────
const EVENT_ICON: Record<string, React.ReactNode> = {
  video_watched: <Play size={13} style={{ color: "#C9A84C" }} />,
  question_asked: <MessageCircle size={13} style={{ color: "#7AAEE8" }} />,
  challenge_completed: <Trophy size={13} style={{ color: "#DFC060" }} />,
  login: <LogIn size={13} style={{ color: "#7A8A7A" }} />,
  module_completed: <CheckCircle size={13} style={{ color: "#C9A84C" }} />,
};

const EVENT_BG: Record<string, string> = {
  video_watched: "rgba(201,168,76,0.12)",
  question_asked: "rgba(74,124,191,0.12)",
  challenge_completed: "rgba(201,168,76,0.12)",
  login: "#132B1E",
  module_completed: "rgba(201,168,76,0.12)",
};

const TYPE_LABEL: Record<string, string> = {
  discussion: "Discussion",
  swing: "Swing",
  strategie: "Stratégie",
};

const TYPE_COLOR: Record<string, { bg: string; text: string }> = {
  discussion: { bg: "rgba(201,168,76,0.12)", text: "#C9A84C" },
  swing:      { bg: "rgba(201,168,76,0.12)", text: "#DFC060" },
  strategie:  { bg: "rgba(74,124,191,0.12)", text: "#7AAEE8" },
};

const LEVEL_LABEL: Record<string, string> = {
  debutant: "Débutant",
  intermediaire: "Intermédiaire",
  avance: "Avancé",
};

export default function AdminOverview() {
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const todayStr = today.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  const connectedThisWeek = MEMBERS.filter((m) => new Date(m.lastActive) >= sevenDaysAgo).length;
  const questionsThisWeek = IA_QUESTIONS.filter((q) => new Date(q.createdAt) >= sevenDaysAgo).length;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-bold" style={{ color: "#F5F0E8" }}>
          Vue d&apos;ensemble
        </h1>
        <p className="text-sm mt-1" style={{ color: "#7A8A7A" }}>
          Tableau de bord coaching — {todayStr}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Membres actifs",              value: totalActive,          icon: Users,        bg: "rgba(201,168,76,0.12)",   color: "#C9A84C",  href: "/admin/membres" },
          { label: "Connectés cette semaine",     value: connectedThisWeek,    icon: TrendingUp,   bg: "rgba(74,124,191,0.12)",   color: "#7AAEE8",  href: "/admin/membres" },
          { label: "Vidéos regardées (semaine)",  value: videosThisWeek,       icon: PlaySquare,   bg: "rgba(201,168,76,0.12)",   color: "#DFC060",  href: "/admin/videos" },
          { label: "Questions IA (semaine)",      value: questionsThisWeek,    icon: MessageSquare,bg: "rgba(106,58,154,0.12)",   color: "#B080E0",  href: "/admin/questions" },
        ].map(({ label, value, icon: Icon, bg, color, href }) => (
          <Link
            key={label}
            href={href}
            className="rounded-2xl p-4 transition-shadow hover:shadow-md"
            style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
              style={{ background: bg }}
            >
              <Icon size={17} style={{ color }} />
            </div>
            <p className="text-2xl font-bold font-serif" style={{ color: "#F5F0E8" }}>{value}</p>
            <p className="text-xs mt-0.5 leading-snug" style={{ color: "#7A8A7A" }}>{label}</p>
          </Link>
        ))}
      </div>

      {/* Bottom grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Top membres */}
        <div className="rounded-2xl p-5" style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-sm" style={{ color: "#F5F0E8" }}>Membres les plus actifs</h2>
            <Link href="/admin/membres" className="text-xs font-medium" style={{ color: "#C9A84C" }}>
              Voir tous →
            </Link>
          </div>
          <div className="space-y-3">
            {topMembers.map((member, i) => (
              <Link
                key={member.id}
                href={`/admin/membres/${member.id}`}
                className="flex items-center gap-3 group"
              >
                <span className="text-xs font-bold w-4 text-center flex-shrink-0" style={{ color: "#C9A84C" }}>
                  {i + 1}
                </span>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                  style={{ background: member.avatarColor, color: "#0D1A09" }}
                >
                  {member.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate transition-colors" style={{ color: "#F5F0E8" }}>
                    {member.name}
                  </p>
                  <p className="text-[11px]" style={{ color: "#7A8A7A" }}>
                    {LEVEL_LABEL[member.level]} · Index {member.handicap}
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {new Date(member.lastActive) < sevenDaysAgo ? (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(192,64,64,0.12)", color: "#E05050" }}>
                      Inactif
                    </span>
                  ) : (
                    <>
                      <Flame size={12} style={{ color: "#E05050" }} />
                      <span className="text-xs font-semibold" style={{ color: "#7A8A7A" }}>{member.streak}j</span>
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Dernières actions */}
        <div className="rounded-2xl p-5" style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-sm" style={{ color: "#F5F0E8" }}>Dernières actions</h2>
            <Link href="/admin/activite" className="text-xs font-medium" style={{ color: "#C9A84C" }}>
              Tout voir →
            </Link>
          </div>
          <div className="space-y-3">
            {recentEvents.map((event) => {
              const member = getMemberById(event.memberId);
              return (
                <div key={event.id} className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: EVENT_BG[event.type] || "#132B1E" }}
                  >
                    {EVENT_ICON[event.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs leading-snug" style={{ color: "#F5F0E8" }}>
                      <span className="font-medium">{member?.name}</span>{" "}
                      <span style={{ color: "#7A8A7A" }}>
                        {event.type === "video_watched" && "a regardé une vidéo"}
                        {event.type === "question_asked" && "a posé une question"}
                        {event.type === "challenge_completed" && "a terminé un challenge"}
                        {event.type === "login" && "s'est connecté·e"}
                        {event.type === "module_completed" && "a terminé un module"}
                      </span>
                    </p>
                    <p className="text-[10px] mt-0.5" style={{ color: "#7A8A7A" }}>{timeAgo(event.createdAt)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dernières questions IA */}
      <div className="rounded-2xl p-5" style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-sm" style={{ color: "#F5F0E8" }}>Dernières questions Lolo IA</h2>
          <Link href="/admin/questions" className="text-xs font-medium" style={{ color: "#C9A84C" }}>
            Voir toutes →
          </Link>
        </div>
        <div className="space-y-3">
          {recentQuestions.map((q) => {
            const member = getMemberById(q.memberId);
            const typeStyle = TYPE_COLOR[q.type];
            return (
              <div
                key={q.id}
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: "#132B1E" }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                  style={{ background: member?.avatarColor ?? "rgba(201,168,76,0.15)", color: "#0D1A09" }}
                >
                  {member?.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold" style={{ color: "#F5F0E8" }}>{member?.name}</span>
                    <span
                      className="text-[10px] font-medium px-1.5 py-0.5 rounded-md"
                      style={{ background: typeStyle.bg, color: typeStyle.text }}
                    >
                      {TYPE_LABEL[q.type]}
                    </span>
                  </div>
                  <p className="text-xs truncate" style={{ color: "#7A8A7A" }}>{q.question}</p>
                </div>
                <span className="text-[10px] flex-shrink-0 mt-0.5" style={{ color: "#7A8A7A" }}>
                  {timeAgo(q.createdAt)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
