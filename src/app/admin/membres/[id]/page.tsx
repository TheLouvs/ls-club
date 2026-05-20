"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Flame, Calendar, PlaySquare, MessageSquare, Activity,
  CheckCircle, Play, MessageCircle, Trophy, LogIn, ChevronDown,
} from "lucide-react";
import {
  getMemberById, getProgressByMember, getQuestionsByMember, getActivityByMember,
  formatDate, formatDateTime,
} from "@/lib/mock-admin";

const LEVEL_LABEL: Record<string, string> = {
  debutant: "Débutant",
  intermediaire: "Intermédiaire",
  avance: "Avancé",
};

const TYPE_COLOR: Record<string, { bg: string; text: string }> = {
  discussion: { bg: "rgba(201,168,76,0.12)", text: "#C9A84C" },
  swing: { bg: "rgba(223,192,96,0.12)", text: "#DFC060" },
  strategie: { bg: "rgba(74,124,191,0.12)", text: "#7AAEE8" },
};

const TYPE_LABEL: Record<string, string> = {
  discussion: "Discussion",
  swing: "Swing",
  strategie: "Stratégie",
};

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

type Tab = "videos" | "questions" | "activite";

export default function MemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<Tab>("videos");
  const [expandedQ, setExpandedQ] = useState<string | null>(null);

  const member = getMemberById(id);

  if (!member) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <p className="text-lg font-semibold" style={{ color: "#F5F0E8" }}>Membre introuvable</p>
        <Link href="/admin/membres" className="text-sm mt-2 block" style={{ color: "#C9A84C" }}>
          ← Retour aux membres
        </Link>
      </div>
    );
  }

  const progress = getProgressByMember(id);
  const questions = getQuestionsByMember(id);
  const activity = getActivityByMember(id);

  const totalCompleted = progress.reduce((acc, p) => acc + p.completedLessons, 0);
  const totalLessons = progress.reduce((acc, p) => acc + p.totalLessons, 0);
  const completionPct = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back */}
      <Link
        href="/admin/membres"
        className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
        style={{ color: "#7A8A7A" }}
      >
        <ArrowLeft size={15} />
        Retour aux membres
      </Link>

      {/* Member header */}
      <div className="rounded-2xl p-6" style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}>
        <div className="flex items-start gap-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold flex-shrink-0"
            style={{ background: member.avatarColor, color: "#0D1A09" }}
          >
            {member.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-serif text-xl font-bold" style={{ color: "#F5F0E8" }}>{member.name}</h1>
                <p className="text-sm" style={{ color: "#7A8A7A" }}>{member.email}</p>
              </div>
              <span
                className="flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-xl"
                style={
                  member.subscription === "active"
                    ? { background: "rgba(201,168,76,0.12)", color: "#C9A84C" }
                    : { background: "rgba(192,64,64,0.12)", color: "#E05050" }
                }
              >
                {member.subscription === "active" ? "Abonnement actif" : "Abonnement inactif"}
              </span>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-4 mt-4">
              <div>
                <p className="text-xs" style={{ color: "#7A8A7A" }}>Index</p>
                <p className="text-sm font-bold" style={{ color: "#F5F0E8" }}>{member.handicap}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: "#7A8A7A" }}>Niveau</p>
                <p className="text-sm font-bold" style={{ color: "#F5F0E8" }}>{LEVEL_LABEL[member.level]}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: "#7A8A7A" }}>Inscription</p>
                <div className="flex items-center gap-1">
                  <Calendar size={11} style={{ color: "#7A8A7A" }} />
                  <p className="text-sm font-medium" style={{ color: "#F5F0E8" }}>{formatDate(member.joinedAt)}</p>
                </div>
              </div>
              <div>
                <p className="text-xs" style={{ color: "#7A8A7A" }}>Dernière connexion</p>
                <p className="text-sm font-medium" style={{ color: "#F5F0E8" }}>{formatDate(member.lastActive)}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: "#7A8A7A" }}>Streak</p>
                <div className="flex items-center gap-1">
                  {member.streak > 0 ? (
                    <>
                      <Flame size={12} style={{ color: "#E05050" }} />
                      <p className="text-sm font-bold" style={{ color: "#F5F0E8" }}>{member.streak} jours</p>
                    </>
                  ) : (
                    <p className="text-sm" style={{ color: "#3A4A3A" }}>—</p>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs" style={{ color: "#7A8A7A" }}>Progression</p>
                <p className="text-sm font-bold" style={{ color: "#F5F0E8" }}>{completionPct}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}>
        {([
          { key: "videos" as Tab, label: "Vidéos", icon: PlaySquare, count: progress.length },
          { key: "questions" as Tab, label: "Questions", icon: MessageSquare, count: questions.length },
          { key: "activite" as Tab, label: "Activité", icon: Activity, count: activity.length },
        ] as const).map(({ key, label, icon: Icon, count }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={
              activeTab === key
                ? { background: "#C9A84C", color: "#0F2318" }
                : { color: "#7A8A7A" }
            }
          >
            <Icon size={14} />
            {label}
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              style={
                activeTab === key
                  ? { background: "rgba(15,35,24,0.2)", color: "#0F2318" }
                  : { background: "rgba(201,168,76,0.12)", color: "#C9A84C" }
              }
            >
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "videos" && (
        <div className="space-y-3">
          {progress.length === 0 ? (
            <div className="rounded-2xl p-8 text-center text-sm" style={{ background: "#1B3A2A", border: "1px solid #2A4A35", color: "#7A8A7A" }}>
              Aucune vidéo regardée pour l'instant
            </div>
          ) : (
            progress.map((p) => {
              const pct = Math.round((p.completedLessons / p.totalLessons) * 100);
              return (
                <div key={p.moduleId} className="rounded-2xl p-4" style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#F5F0E8" }}>{p.moduleName}</p>
                      <p className="text-xs mt-0.5" style={{ color: "#7A8A7A" }}>
                        {p.completedLessons}/{p.totalLessons} leçons · Dernière le {formatDate(p.lastWatchedAt)}
                      </p>
                    </div>
                    <span
                      className="flex-shrink-0 text-xs font-bold px-2 py-1 rounded-lg"
                      style={
                        p.completedAt
                          ? { background: "rgba(201,168,76,0.12)", color: "#C9A84C" }
                          : pct > 0
                          ? { background: "rgba(223,192,96,0.12)", color: "#DFC060" }
                          : { background: "#132B1E", color: "#7A8A7A" }
                      }
                    >
                      {p.completedAt ? "Terminé" : pct > 0 ? "En cours" : "Commencé"}
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "#132B1E" }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        background: p.completedAt ? "#C9A84C" : "rgba(201,168,76,0.6)",
                      }}
                    />
                  </div>
                  <p className="text-[11px] mt-1 font-medium" style={{ color: "#7A8A7A" }}>{pct}%</p>
                </div>
              );
            })
          )}
        </div>
      )}

      {activeTab === "questions" && (
        <div className="space-y-2">
          {questions.length === 0 ? (
            <div className="rounded-2xl p-8 text-center text-sm" style={{ background: "#1B3A2A", border: "1px solid #2A4A35", color: "#7A8A7A" }}>
              Aucune question posée
            </div>
          ) : (
            questions.map((q) => {
              const typeStyle = TYPE_COLOR[q.type];
              const isOpen = expandedQ === q.id;
              return (
                <div
                  key={q.id}
                  className="rounded-2xl overflow-hidden"
                  style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}
                >
                  <button
                    onClick={() => setExpandedQ(isOpen ? null : q.id)}
                    className="w-full flex items-start gap-3 p-4 text-left"
                  >
                    <span
                      className="flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-md mt-0.5"
                      style={{ background: typeStyle.bg, color: typeStyle.text }}
                    >
                      {TYPE_LABEL[q.type]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium" style={{ color: "#F5F0E8" }}>{q.question}</p>
                      <p className="text-[11px] mt-0.5" style={{ color: "#7A8A7A" }}>{formatDateTime(q.createdAt)}</p>
                    </div>
                    <ChevronDown
                      size={16}
                      className="flex-shrink-0 mt-0.5 transition-transform"
                      style={{ color: "#3A4A3A", transform: isOpen ? "rotate(180deg)" : "none" }}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-0">
                      <div className="h-px mb-3" style={{ background: "#2A4A35" }} />
                      <p className="text-xs font-semibold mb-1" style={{ color: "#7A8A7A" }}>Réponse de Lolo IA</p>
                      <p className="text-sm leading-relaxed" style={{ color: "#7A8A7A" }}>{q.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {activeTab === "activite" && (
        <div className="rounded-2xl p-5" style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}>
          {activity.length === 0 ? (
            <p className="text-sm text-center py-8" style={{ color: "#7A8A7A" }}>Aucune activité enregistrée</p>
          ) : (
            <div className="space-y-0">
              {activity.map((event, i) => (
                <div key={event.id} className="flex gap-4">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: EVENT_BG[event.type] || "#132B1E" }}
                    >
                      {EVENT_ICON[event.type]}
                    </div>
                    {i < activity.length - 1 && (
                      <div className="w-px flex-1 my-1" style={{ background: "#2A4A35" }} />
                    )}
                  </div>
                  {/* Event content */}
                  <div className="flex-1 pb-4 min-w-0">
                    <p className="text-sm font-medium" style={{ color: "#F5F0E8" }}>{event.description}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: "#7A8A7A" }}>{formatDateTime(event.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
