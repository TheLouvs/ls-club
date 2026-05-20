"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, MapPin, ChevronRight, Play, StickyNote, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  type Message,
  type PlayerProfile,
  type Course,
  type Hole,
  MOCK_COURSES,
  MOCK_HOLES,
} from "../data";

const DIFFICULTE_STYLE: Record<string, { color: string; bg: string; border: string }> = {
  Accessible: { color: "#5aad75", bg: "rgba(90,173,117,0.1)", border: "rgba(90,173,117,0.2)" },
  Intermédiaire: { color: "#c9a84c", bg: "rgba(201,168,76,0.1)", border: "rgba(201,168,76,0.2)" },
  Difficile: { color: "#c26ad9", bg: "rgba(194,106,217,0.1)", border: "rgba(194,106,217,0.2)" },
};

const PAR_STYLE: Record<number, { color: string; bg: string }> = {
  3: { color: "#6ab0d9", bg: "rgba(106,176,217,0.12)" },
  4: { color: "#5aad75", bg: "rgba(90,173,117,0.12)" },
  5: { color: "#c9a84c", bg: "rgba(201,168,76,0.12)" },
};

// ─── FlyoverImage — placeholder image aérienne ────────────────────────────────

function FlyoverImage({ hole, courseId }: { hole: Hole; courseId: string }) {
  // À remplacer par : <img src={`https://flyovergreen.com/.../${courseId}/hole-${hole.number}.jpg`} ... />
  const parStyle = PAR_STYLE[hole.par];

  return (
    <div
      className="w-full relative overflow-hidden"
      style={{
        aspectRatio: "16/9",
        background: "linear-gradient(160deg, #0a1f0c 0%, #071309 40%, #050e07 100%)",
        borderRadius: "12px",
      }}
    >
      {/* Terrain pattern */}
      <div className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 35% 60%, rgba(45,102,64,0.6) 0%, transparent 70%),
            radial-gradient(ellipse 25% 20% at 70% 40%, rgba(90,173,117,0.3) 0%, transparent 60%),
            radial-gradient(ellipse 15% 12% at 72% 38%, rgba(201,168,76,0.4) 0%, transparent 50%)
          `,
        }}
      />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(#5aad75 1px, transparent 1px), linear-gradient(90deg, #5aad75 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Vignette */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(4,8,5,0.8) 100%)" }} />

      {/* Watermark Flyovergreen */}
      <div className="absolute top-2.5 left-3 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#5aad75" }} />
        <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: "rgba(90,173,117,0.6)" }}>
          Flyovergreen
        </span>
      </div>

      {/* Hole info overlay */}
      <div className="absolute bottom-3 right-3 flex items-center gap-2">
        <span className="text-[10px] font-semibold" style={{ color: "rgba(232,240,234,0.4)" }}>
          {hole.distance}m
        </span>
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{ background: parStyle.bg, color: parStyle.color, border: `1px solid ${parStyle.color}33` }}
        >
          Par {hole.par}
        </span>
      </div>

      {/* Hole number */}
      <div className="absolute top-2.5 right-3">
        <span className="text-[10px] font-bold" style={{ color: "rgba(232,240,234,0.25)" }}>
          #{hole.number}
        </span>
      </div>
    </div>
  );
}

// ─── FlyoverVideo — placeholder vidéo ────────────────────────────────────────

function FlyoverVideo({ hole, courseId }: { hole: Hole; courseId: string }) {
  // À remplacer par : <iframe src={`https://flyovergreen.com/embed/${courseId}/${hole.number}`} ... />
  return (
    <div
      className="w-full relative overflow-hidden cursor-pointer group"
      style={{
        aspectRatio: "16/9",
        background: "linear-gradient(160deg, #060d07 0%, #040a05 100%)",
        borderRadius: "12px",
        border: "1px solid #0f1a10",
      }}
    >
      {/* Scan lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(90,173,117,0.5) 2px, rgba(90,173,117,0.5) 3px)",
        }}
      />

      {/* Play button */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
          style={{
            background: "linear-gradient(135deg, rgba(90,173,117,0.2), rgba(45,102,64,0.3))",
            border: "1px solid rgba(90,173,117,0.3)",
            boxShadow: "0 0 20px rgba(45,102,64,0.2)",
          }}
        >
          <Play size={18} style={{ color: "#5aad75", marginLeft: 2 }} fill="#5aad75" />
        </div>
        <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "rgba(90,173,117,0.4)" }}>
          Flyovergreen
        </p>
      </div>

      {/* Duration mock */}
      <div className="absolute bottom-2.5 right-3">
        <span className="text-[9px] font-mono" style={{ color: "rgba(232,240,234,0.2)" }}>0:45</span>
      </div>
    </div>
  );
}

// ─── HoleCard ────────────────────────────────────────────────────────────────

function HoleCard({
  hole,
  courseId,
  isActive,
  note,
  onSelect,
  onNoteChange,
}: {
  hole: Hole;
  courseId: string;
  isActive: boolean;
  note: string;
  onSelect: () => void;
  onNoteChange: (note: string) => void;
}) {
  const [noteOpen, setNoteOpen] = useState(false);
  const parStyle = PAR_STYLE[hole.par];
  const hasNote = !!note;

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        background: isActive
          ? "linear-gradient(160deg, #0d2014 0%, #081209 100%)"
          : "linear-gradient(160deg, #080e09 0%, #060b07 100%)",
        border: isActive ? "1px solid rgba(45,102,64,0.5)" : "1px solid #0d160e",
        boxShadow: isActive ? "0 0 20px rgba(45,102,64,0.08)" : "none",
      }}
    >
      {/* Header */}
      <button
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
        onClick={onSelect}
      >
        {/* Numéro */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm"
          style={
            isActive
              ? { background: "linear-gradient(135deg, #1a3d22, #2d6640)", color: "#c9a84c", boxShadow: "0 0 12px rgba(45,102,64,0.3)" }
              : { background: "#0a1209", color: "#2d4a35", border: "1px solid #0f1a10" }
          }
        >
          {hole.number}
        </div>

        {/* Infos */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: parStyle.bg, color: parStyle.color }}
            >
              Par {hole.par}
            </span>
            <span className="text-xs font-medium" style={{ color: "#3d6648" }}>
              {hole.distance}m
            </span>
          </div>
          {hole.description && (
            <p className="text-[11px] truncate" style={{ color: isActive ? "#4a6855" : "#1f3325" }}>
              {hole.description}
            </p>
          )}
        </div>

        {/* Note indicator */}
        <button
          className="flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg transition-all"
          style={{
            background: hasNote ? "rgba(201,168,76,0.1)" : "transparent",
            border: hasNote ? "1px solid rgba(201,168,76,0.2)" : "1px solid transparent",
          }}
          onClick={(e) => { e.stopPropagation(); setNoteOpen((v) => !v); }}
        >
          <StickyNote size={11} style={{ color: hasNote ? "#c9a84c" : "#2d4a35" }} />
          {noteOpen
            ? <ChevronUp size={10} style={{ color: "#2d4a35" }} />
            : <ChevronDown size={10} style={{ color: "#2d4a35" }} />
          }
        </button>
      </button>

      {/* Visuals (image + vidéo) — visibles uniquement sur le trou actif */}
      {isActive && (
        <div className="px-4 pb-3 flex flex-col gap-3">
          {/* Image aérienne */}
          <div>
            <p className="text-[9px] font-semibold tracking-widest uppercase mb-1.5" style={{ color: "#2d4a35" }}>
              Vue aérienne
            </p>
            <FlyoverImage hole={hole} courseId={courseId} />
          </div>

          {/* Vidéo flyover */}
          <div>
            <p className="text-[9px] font-semibold tracking-widest uppercase mb-1.5" style={{ color: "#2d4a35" }}>
              Vidéo flyover
            </p>
            <FlyoverVideo hole={hole} courseId={courseId} />
          </div>
        </div>
      )}

      {/* Zone de notes */}
      {noteOpen && (
        <div className="px-4 pb-3">
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid #0f1a10", background: "#040806" }}
          >
            <div className="px-3 pt-2 pb-1 flex items-center gap-1.5" style={{ borderBottom: "1px solid #0a1009" }}>
              <StickyNote size={10} style={{ color: "#c9a84c" }} />
              <span className="text-[9px] font-semibold tracking-widest uppercase" style={{ color: "#2d4a35" }}>
                Mes notes · Trou {hole.number}
              </span>
            </div>
            <textarea
              value={note}
              onChange={(e) => onNoteChange(e.target.value)}
              placeholder="Ex : viser le centre du fairway, attention bunker à droite à 220m..."
              rows={3}
              className="w-full text-xs px-3 py-2.5 resize-none outline-none bg-transparent"
              style={{ color: "#8aab92" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── HoleChat ─────────────────────────────────────────────────────────────────

function HoleChat({
  course,
  hole,
  profile,
  note,
}: {
  course: Course;
  hole: Hole;
  profile: PlayerProfile;
  note: string;
}) {
  const initialMessage = (h: Hole, c: Course): Message => ({
    role: "assistant",
    content: `**Trou ${h.number}** — Par ${h.par}, ${h.distance}m${h.description ? `\n_${h.description}_` : ""}\n\nAvec votre index ${profile.handicap}, votre objectif sur ce trou est ${h.par === 3 ? "le bogey ou mieux" : h.par === 4 ? "le par ou bogey" : "le par"}. Par où voulez-vous commencer ?`,
  });

  const [messages, setMessages] = useState<Message[]>([initialMessage(hole, course)]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([initialMessage(hole, course)]);
    setInput("");
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hole.number, course.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const context = `Parcours : ${course.nom} (${course.trous} trous, par ${course.par}, ${course.difficulte}). Trou ${hole.number} — Par ${hole.par}, ${hole.distance}m${hole.description ? `, ${hole.description}` : ""}. Profil joueur : index ${profile.handicap}, niveau ${profile.niveau}.${note ? ` Notes du joueur sur ce trou : "${note}"` : ""}`;

      const res = await fetch("/api/ia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
          mode: "strategie",
          playerProfile: profile,
          extraContext: context,
        }),
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Désolé, je n'ai pas pu répondre. Réessayez dans un instant." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const parStyle = PAR_STYLE[hole.par];

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div
        className="px-4 py-3 flex items-center gap-3 flex-shrink-0"
        style={{ borderBottom: "1px solid #0d160e", background: "#060b07" }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #1a3d22, #2d6640)", boxShadow: "0 0 12px rgba(45,102,64,0.2)" }}
        >
          <Bot size={14} style={{ color: "#c9a84c" }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold" style={{ color: "#e8f0ea" }}>Lolo IA</p>
          <p className="text-[10px]" style={{ color: "#2d4a35" }}>
            Trou {hole.number} · {hole.distance}m
          </p>
        </div>
        <span
          className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0"
          style={{ background: parStyle.bg, color: parStyle.color }}
        >
          Par {hole.par}
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex gap-2.5 items-end", msg.role === "user" && "flex-row-reverse")}>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mb-0.5"
              style={
                msg.role === "assistant"
                  ? { background: "linear-gradient(135deg, #1a3d22, #2d6640)" }
                  : { background: "#090f0a", border: "1px solid #0d160e" }
              }
            >
              {msg.role === "assistant"
                ? <Bot size={12} style={{ color: "#c9a84c" }} />
                : <User size={12} style={{ color: "#2d4a35" }} />}
            </div>
            <div
              className="max-w-[85%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap"
              style={
                msg.role === "assistant"
                  ? {
                      background: "linear-gradient(135deg, #0a1209, #080e09)",
                      border: "1px solid #0d160e",
                      borderRadius: "16px 16px 16px 4px",
                      color: "#c8d8cc",
                    }
                  : {
                      background: "linear-gradient(135deg, #162a1c, #0f1e12)",
                      border: "1px solid #1e3824",
                      borderRadius: "16px 16px 4px 16px",
                      color: "#e8f0ea",
                    }
              }
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-2.5 items-end">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #1a3d22, #2d6640)" }}
            >
              <Bot size={12} style={{ color: "#c9a84c" }} />
            </div>
            <div
              className="px-4 py-3"
              style={{
                background: "linear-gradient(135deg, #0a1209, #080e09)",
                border: "1px solid #0d160e",
                borderRadius: "16px 16px 16px 4px",
              }}
            >
              <div className="flex gap-1 items-center h-4">
                {[0, 150, 300].map((d) => (
                  <span key={d} className="w-1.5 h-1.5 rounded-full animate-bounce"
                    style={{ background: "#2d6640", animationDelay: `${d}ms` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-4 flex-shrink-0" style={{ borderTop: "1px solid #0d160e", background: "#060b07" }}>
        <div
          className="flex items-center gap-3 rounded-2xl px-4 py-3"
          style={{ background: "#090f0a", border: "1px solid #0f1a10" }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
            placeholder={`Stratégie trou ${hole.number}...`}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "#e8f0ea" }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="w-9 h-9 rounded-xl flex items-center justify-center disabled:opacity-30 flex-shrink-0 transition-opacity"
            style={{ background: "linear-gradient(135deg, #1a3d22, #2d6640)" }}
          >
            <Send size={14} style={{ color: "#c9a84c" }} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CourseReconnaissance ──────────────────────────────────────────────────────

function CourseReconnaissance({
  course,
  profile,
  onBack,
}: {
  course: Course;
  profile: PlayerProfile;
  onBack: () => void;
}) {
  const holes = MOCK_HOLES[course.id] ?? [];
  const [selectedHole, setSelectedHole] = useState<Hole>(holes[0]);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const diffStyle = DIFFICULTE_STYLE[course.difficulte];

  return (
    <div className="flex flex-col h-full">
      {/* Sub-header */}
      <div
        className="px-5 py-2.5 flex items-center gap-3 flex-shrink-0"
        style={{ borderBottom: "1px solid #0d160e", background: "#060b07" }}
      >
        <button onClick={onBack} className="text-xs font-medium flex items-center gap-1.5 flex-shrink-0 transition-opacity hover:opacity-70" style={{ color: "#4a6855" }}>
          <span style={{ fontSize: 14 }}>←</span> Parcours
        </button>
        <span style={{ color: "#0d160e" }}>·</span>
        <p className="text-xs font-bold truncate flex-1" style={{ color: "#e8f0ea" }}>
          {course.nom}
        </p>
        <span
          className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0"
          style={{ background: diffStyle.bg, color: diffStyle.color, border: `1px solid ${diffStyle.border}` }}
        >
          {course.difficulte}
        </span>
      </div>

      {/* Layout */}
      <div className="flex-1 min-h-0 flex flex-col md:flex-row">

        {/* Colonne gauche — trous */}
        <div
          className="md:w-80 lg:w-96 flex-shrink-0 overflow-y-auto"
          style={{ borderRight: "1px solid #0d160e" }}
        >
          <div
            className="px-4 py-2.5 flex items-center justify-between sticky top-0 z-10"
            style={{ background: "#060b07", borderBottom: "1px solid #0a1009" }}
          >
            <p className="text-[9px] font-semibold tracking-[0.2em] uppercase" style={{ color: "#2d4a35" }}>
              {course.trous} trous · Par {course.par}
            </p>
            <p className="text-[9px] font-semibold" style={{ color: "#1a2e1c" }}>
              Trou actif : {selectedHole.number}
            </p>
          </div>

          <div className="flex flex-col gap-2 p-3">
            {holes.map((hole) => (
              <HoleCard
                key={hole.number}
                hole={hole}
                courseId={course.id}
                isActive={hole.number === selectedHole.number}
                note={notes[hole.number] ?? ""}
                onSelect={() => setSelectedHole(hole)}
                onNoteChange={(note) => setNotes((prev) => ({ ...prev, [hole.number]: note }))}
              />
            ))}
          </div>
        </div>

        {/* Colonne droite — chat */}
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <HoleChat
            course={course}
            hole={selectedHole}
            profile={profile}
            note={notes[selectedHole.number] ?? ""}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Sélection du parcours ────────────────────────────────────────────────────

function CourseSelector({ onSelect }: { onSelect: (c: Course) => void }) {
  return (
    <div className="flex-1 overflow-y-auto px-5 py-6">
      <p className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: "#2d6640" }}>
        Reconaissance
      </p>
      <h2 className="font-serif text-xl font-bold mb-1" style={{ color: "#e8f0ea" }}>
        Choisir un parcours
      </h2>
      <p className="text-sm mb-6" style={{ color: "#3d6648" }}>
        Préparez chaque trou avant d'arriver sur le parcours.
      </p>

      <div className="flex flex-col gap-3">
        {MOCK_COURSES.map((course) => {
          const diff = DIFFICULTE_STYLE[course.difficulte];
          return (
            <button
              key={course.id}
              onClick={() => onSelect(course)}
              className="group text-left rounded-2xl overflow-hidden transition-all duration-200 hover:scale-[1.01]"
              style={{
                background: "linear-gradient(160deg, #080e09 0%, #060b07 100%)",
                border: "1px solid #0d160e",
              }}
            >
              <div className="p-4 flex items-center gap-4">
                {/* Left accent */}
                <div
                  className="w-1 self-stretch rounded-full flex-shrink-0"
                  style={{ background: diff.color, opacity: 0.6 }}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <MapPin size={10} style={{ color: "#2d4a35" }} />
                    <span className="text-[10px] font-medium" style={{ color: "#2d4a35" }}>
                      {course.region}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base mb-2" style={{ color: "#e8f0ea" }}>
                    {course.nom}
                  </h3>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-xs" style={{ color: "#3d6648" }}>
                      {course.trous} trous
                    </span>
                    <span style={{ color: "#1a2e1c", fontSize: 10 }}>·</span>
                    <span className="text-xs" style={{ color: "#3d6648" }}>
                      Par {course.par}
                    </span>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: diff.bg, color: diff.color, border: `1px solid ${diff.border}` }}
                    >
                      {course.difficulte}
                    </span>
                  </div>
                </div>

                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                  style={{ background: "#0a1209", border: "1px solid #0f1a10" }}
                >
                  <ChevronRight size={14} style={{ color: "#2d6640" }} />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── ReconnaissanceModule ──────────────────────────────────────────────────────

export default function ReconnaissanceModule({ profile }: { profile: PlayerProfile }) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  if (selectedCourse) {
    return (
      <CourseReconnaissance
        course={selectedCourse}
        profile={profile}
        onBack={() => setSelectedCourse(null)}
      />
    );
  }

  return <CourseSelector onSelect={setSelectedCourse} />;
}
