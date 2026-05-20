"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, MapPin, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Message, type PlayerProfile, type Course, MOCK_COURSES, MOCK_STRATEGY_CONTEXT, IA_RESPONSES_STRATEGIE } from "../data";

const DIFFICULTE_STYLE: Record<string, { color: string; bg: string }> = {
  Accessible: { color: "#5aad75", bg: "rgba(90,173,117,0.12)" },
  Intermédiaire: { color: "#c9a84c", bg: "rgba(201,168,76,0.12)" },
  Difficile: { color: "#c26ad9", bg: "rgba(194,106,217,0.12)" },
};

let responseIndex = 0;

function getNextResponse(): string {
  const r = IA_RESPONSES_STRATEGIE[responseIndex % IA_RESPONSES_STRATEGIE.length];
  responseIndex++;
  return r;
}

function CourseChat({ course, profile }: { course: Course; profile: PlayerProfile }) {
  const suggestions = MOCK_STRATEGY_CONTEXT[course.id] ?? [];
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Parcours sélectionné : **${course.nom}** (${course.trous} trous, par ${course.par}, ${course.difficulte}).\n\nAvec votre index ${profile.handicap}, votre cible raisonnable sur ce parcours est aux alentours de ${course.par + Math.round(profile.handicap * 0.9)} coups. Je suis prêt à vous aider à préparer votre stratégie. Par où voulez-vous commencer ?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setMessages((prev) => [...prev, { role: "assistant", content: getNextResponse() }]);
    setLoading(false);
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex gap-2.5 items-end", msg.role === "user" && "flex-row-reverse")}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mb-0.5"
              style={msg.role === "assistant"
                ? { background: "linear-gradient(135deg, #1a3d22, #2d6640)" }
                : { background: "#0d1e10", border: "1px solid #162a1c" }}>
              {msg.role === "assistant"
                ? <Bot size={13} style={{ color: "#c9a84c" }} />
                : <User size={13} style={{ color: "#4a6855" }} />}
            </div>
            <div className="max-w-[78%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap"
              style={msg.role === "assistant" ? {
                background: "linear-gradient(135deg, #0d1e10, #0a160c)",
                border: "1px solid #162a1c",
                borderRadius: "16px 16px 16px 4px",
                color: "#e8f0ea",
              } : {
                background: "linear-gradient(135deg, #1a3d22, #162a1c)",
                border: "1px solid #254a30",
                borderRadius: "16px 16px 4px 16px",
                color: "#e8f0ea",
              }}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-2.5 items-end">
            <div className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #1a3d22, #2d6640)" }}>
              <Bot size={13} style={{ color: "#c9a84c" }} />
            </div>
            <div className="px-4 py-3"
              style={{ background: "linear-gradient(135deg, #0d1e10, #0a160c)", border: "1px solid #162a1c", borderRadius: "16px 16px 16px 4px" }}>
              <div className="flex gap-1 items-center h-4">
                {[0, 150, 300].map((d) => (
                  <span key={d} className="w-1.5 h-1.5 rounded-full animate-bounce"
                    style={{ background: "#2d6640", animationDelay: `${d}ms` }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.length === 1 && suggestions.length > 0 && (
          <div className="mt-2">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#4a6855" }}>
              Questions sur ce parcours
            </p>
            <div className="flex flex-col gap-2">
              {suggestions.map((s) => (
                <button key={s} onClick={() => sendMessage(s)}
                  className="text-left text-sm px-4 py-3 rounded-xl"
                  style={{ background: "#0d1e10", border: "1px solid #162a1c", color: "#8aab92" }}>
                  <span style={{ color: "#c9a84c" }} className="mr-2">›</span>{s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="px-4 py-4" style={{ borderTop: "1px solid #162a1c", background: "#0a160c" }}>
        <div className="flex items-center gap-3 rounded-2xl px-4 py-3"
          style={{ background: "#0d1e10", border: "1px solid #162a1c" }}>
          <input value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
            placeholder="Question sur ce parcours..."
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "#e8f0ea" }} />
          <button onClick={() => sendMessage(input)} disabled={!input.trim() || loading}
            className="w-9 h-9 rounded-xl flex items-center justify-center disabled:opacity-30"
            style={{ background: "linear-gradient(135deg, #1a3d22, #2d6640)" }}>
            <Send size={14} style={{ color: "#c9a84c" }} />
          </button>
        </div>
      </div>
    </>
  );
}

export default function StrategieModule({ profile }: { profile: PlayerProfile }) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  if (selectedCourse) return (
    <>
      {/* Sub-header parcours */}
      <div className="px-4 py-2.5 flex items-center gap-3"
        style={{ borderBottom: "1px solid #162a1c", background: "#0a160c" }}>
        <button onClick={() => setSelectedCourse(null)}
          className="text-xs font-semibold flex items-center gap-1"
          style={{ color: "#4a6855" }}>
          ← Parcours
        </button>
        <span style={{ color: "#162a1c" }}>·</span>
        <p className="text-xs font-semibold truncate flex-1" style={{ color: "#e8f0ea" }}>
          {selectedCourse.nom}
        </p>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
          style={DIFFICULTE_STYLE[selectedCourse.difficulte]}>
          {selectedCourse.difficulte}
        </span>
      </div>
      <CourseChat course={selectedCourse} profile={profile} />
    </>
  );

  return (
    <div className="flex-1 overflow-y-auto px-4 py-5">
      <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "#4a6855" }}>
        Stratégie de parcours
      </p>
      <p className="text-sm mb-6" style={{ color: "#8aab92" }}>
        Sélectionne un parcours pour que Lolo IA adapte ses conseils stratégiques.
      </p>

      <div className="flex flex-col gap-3">
        {MOCK_COURSES.map((course) => {
          const style = DIFFICULTE_STYLE[course.difficulte];
          return (
            <button key={course.id} onClick={() => setSelectedCourse(course)}
              className="text-left p-4 rounded-2xl transition-all"
              style={{ background: "linear-gradient(135deg, #0d1e10, #0a160c)", border: "1px solid #162a1c" }}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin size={11} style={{ color: "#4a6855" }} />
                    <span className="text-xs" style={{ color: "#4a6855" }}>{course.region}</span>
                  </div>
                  <h3 className="font-serif font-semibold text-base mb-2" style={{ color: "#e8f0ea" }}>
                    {course.nom}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium" style={{ color: "#8aab92" }}>
                      {course.trous} trous
                    </span>
                    <span style={{ color: "#162a1c" }}>·</span>
                    <span className="text-xs font-medium" style={{ color: "#8aab92" }}>
                      Par {course.par}
                    </span>
                    <span style={{ color: "#162a1c" }}>·</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: style.bg, color: style.color }}>
                      {course.difficulte}
                    </span>
                  </div>
                </div>
                <ChevronRight size={16} style={{ color: "#2d6640" }} className="flex-shrink-0 mt-1" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Suggestions générales */}
      <div className="mt-8">
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#4a6855" }}>
          Questions générales
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {["Gestion du score en Stableford", "Stratégie par vent fort", "Choisir ses clubs intelligemment", "Mental en compétition"].map((s) => (
            <div key={s} className="text-left text-sm px-4 py-3 rounded-xl"
              style={{ background: "#0d1e10", border: "1px solid #162a1c", color: "#4a6855" }}>
              <span style={{ color: "#c9a84c" }} className="mr-2">›</span>
              <span style={{ color: "#8aab92" }}>{s}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-xs mt-3" style={{ color: "#2d4a35" }}>
          Sélectionnez un parcours pour activer les questions
        </p>
      </div>
    </div>
  );
}
