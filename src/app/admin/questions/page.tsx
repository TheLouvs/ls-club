"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { IA_QUESTIONS, MEMBERS, getMemberById, formatDateTime } from "@/lib/mock-admin";

type QuestionType = "all" | "discussion" | "swing" | "strategie";

const TYPE_LABEL: Record<string, string> = {
  discussion: "Discussion",
  swing: "Swing",
  strategie: "Stratégie",
};

const TYPE_COLOR: Record<string, { bg: string; text: string }> = {
  discussion: { bg: "rgba(201,168,76,0.12)", text: "#C9A84C" },
  swing: { bg: "rgba(223,192,96,0.12)", text: "#DFC060" },
  strategie: { bg: "rgba(74,124,191,0.12)", text: "#7AAEE8" },
};

const sortedQuestions = [...IA_QUESTIONS].sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);

export default function QuestionsPage() {
  const [filterType, setFilterType] = useState<QuestionType>("all");
  const [filterMember, setFilterMember] = useState<string>("all");
  const [expandedQ, setExpandedQ] = useState<string | null>(null);

  const counts = {
    all: IA_QUESTIONS.length,
    discussion: IA_QUESTIONS.filter((q) => q.type === "discussion").length,
    swing: IA_QUESTIONS.filter((q) => q.type === "swing").length,
    strategie: IA_QUESTIONS.filter((q) => q.type === "strategie").length,
  };

  const filtered = sortedQuestions.filter((q) => {
    const matchType = filterType === "all" || q.type === filterType;
    const matchMember = filterMember === "all" || q.memberId === filterMember;
    return matchType && matchMember;
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-bold" style={{ color: "#F5F0E8" }}>Questions Lolo IA</h1>
        <p className="text-sm mt-1" style={{ color: "#7A8A7A" }}>
          {IA_QUESTIONS.length} questions posées par vos membres
        </p>
      </div>

      {/* Tendances */}
      <div className="rounded-2xl p-4" style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}>
        <p className="text-[11px] font-bold uppercase tracking-wide mb-3" style={{ color: "#7A8A7A" }}>Tendances</p>
        <div className="space-y-3">
          {(["discussion", "swing", "strategie"] as const).map((type) => {
            const count = counts[type];
            const pct = IA_QUESTIONS.length > 0 ? Math.round((count / IA_QUESTIONS.length) * 100) : 0;
            const typeStyle = TYPE_COLOR[type];
            const isTop = count === Math.max(counts.discussion, counts.swing, counts.strategie);
            return (
              <div key={type}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium" style={{ color: "#F5F0E8" }}>{TYPE_LABEL[type]}</span>
                    {isTop && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C" }}>
                        Top
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold tabular-nums" style={{ color: "#7A8A7A" }}>{count} · {pct}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: typeStyle.bg }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: typeStyle.text, transition: "width 0.4s ease" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Type chips with counts */}
      <div className="flex flex-wrap gap-2">
        {(["all", "discussion", "swing", "strategie"] as const).map((type) => {
          const active = filterType === type;
          const typeStyle = type !== "all" ? TYPE_COLOR[type] : null;
          return (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
              style={
                active
                  ? { background: "#C9A84C", color: "#0F2318" }
                  : typeStyle
                  ? { background: typeStyle.bg, color: typeStyle.text }
                  : { background: "#1B3A2A", color: "#7A8A7A", border: "1px solid #2A4A35" }
              }
            >
              {type === "all" ? "Toutes" : TYPE_LABEL[type]}
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                style={
                  active
                    ? { background: "rgba(15,35,24,0.2)", color: "#0F2318" }
                    : { background: "rgba(255,255,255,0.06)", color: "inherit" }
                }
              >
                {counts[type]}
              </span>
            </button>
          );
        })}

        {/* Member filter */}
        <div
          className="flex items-center w-full md:w-auto md:ml-auto"
          style={{ background: "#1B3A2A", border: "1px solid #2A4A35", borderRadius: "12px", overflow: "hidden" }}
        >
          <select
            value={filterMember}
            onChange={(e) => setFilterMember(e.target.value)}
            className="text-xs px-3 py-1.5 bg-transparent outline-none pr-8 appearance-none cursor-pointer"
            style={{ color: "#7A8A7A" }}
          >
            <option value="all">Tous les membres</option>
            {MEMBERS.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
          <ChevronDown size={12} className="-ml-6 pointer-events-none" style={{ color: "#7A8A7A" }} />
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="rounded-2xl p-10 text-center text-sm" style={{ background: "#1B3A2A", border: "1px solid #2A4A35", color: "#7A8A7A" }}>
            Aucune question correspondante
          </div>
        ) : (
          filtered.map((q) => {
            const member = getMemberById(q.memberId);
            const typeStyle = TYPE_COLOR[q.type];
            const isOpen = expandedQ === q.id;
            return (
              <div
                key={q.id}
                className="rounded-2xl overflow-hidden transition-all"
                style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}
              >
                <button
                  onClick={() => setExpandedQ(isOpen ? null : q.id)}
                  className="w-full flex items-start gap-3 p-4 text-left"
                >
                  {/* Avatar */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5"
                    style={{ background: member?.avatarColor ?? "rgba(201,168,76,0.15)", color: "#0D1A09" }}
                  >
                    {member?.initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold" style={{ color: "#F5F0E8" }}>{member?.name}</span>
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                        style={{ background: typeStyle.bg, color: typeStyle.text }}
                      >
                        {TYPE_LABEL[q.type]}
                      </span>
                      <span className="text-[11px] ml-auto" style={{ color: "#7A8A7A" }}>
                        {formatDateTime(q.createdAt)}
                      </span>
                    </div>
                    <p className={`text-sm ${isOpen ? "" : "truncate"}`} style={{ color: "#7A8A7A" }}>
                      {q.question}
                    </p>
                  </div>

                  <ChevronDown
                    size={16}
                    className="flex-shrink-0 mt-1 transition-transform duration-200"
                    style={{ color: "#3A4A3A", transform: isOpen ? "rotate(180deg)" : "none" }}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4">
                    <div className="h-px mb-3" style={{ background: "#2A4A35" }} />
                    <div className="p-3 rounded-xl" style={{ background: "#132B1E" }}>
                      <p className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: "#7A8A7A" }}>
                        Réponse de Lolo IA
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: "#7A8A7A" }}>{q.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
