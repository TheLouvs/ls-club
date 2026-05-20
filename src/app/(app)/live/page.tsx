"use client";

import { useState } from "react";
import { Radio, Send, Users, Calendar, Play, Clock, Eye, ChevronRight, Star, Mic, Bell, Filter } from "lucide-react";

// ─── Mock data ─────────────────────────────────────────────────────────────────

type ReplayCategory = "technique" | "putting" | "mental" | "strategie" | "equipement";

type Level = "debutant" | "intermediaire" | "avance";

interface Replay {
  id: string;
  title: string;
  description: string;
  date: string;
  dateIso: string;
  viewers: number;
  duration: string;
  category: ReplayCategory;
  level: Level;
  isNew?: boolean;
  featured?: boolean;
}

const REPLAYS: Replay[] = [
  {
    id: "r1",
    title: "Maîtriser le driver",
    description: "Optimisez votre prise en main du driver pour gagner en distance et en précision.",
    date: "28 Avril 2026",
    dateIso: "2026-04-28",
    viewers: 312,
    duration: "58 min",
    category: "technique",
    level: "intermediaire",
    isNew: true,
    featured: true,
  },
  {
    id: "r2",
    title: "Putting : la lecture des greens",
    description: "Apprenez à lire les pentes, les grains et les vitesses pour un putting chirurgical.",
    date: "21 Avril 2026",
    dateIso: "2026-04-21",
    viewers: 289,
    duration: "45 min",
    category: "putting",
    level: "debutant",
  },
  {
    id: "r3",
    title: "Sortir du bunker en 3 étapes",
    description: "Trois étapes simples pour sortir de n'importe quel bunker avec confiance.",
    date: "14 Avril 2026",
    dateIso: "2026-04-14",
    viewers: 401,
    duration: "1h02",
    category: "technique",
    level: "debutant",
  },
  {
    id: "r4",
    title: "Le mental du compétiteur",
    description: "Comment rester concentré et gérer la pression lors des compétitions.",
    date: "7 Avril 2026",
    dateIso: "2026-04-07",
    viewers: 256,
    duration: "50 min",
    category: "mental",
    level: "avance",
  },
  {
    id: "r5",
    title: "Le petit jeu autour du green",
    description: "Chips, pitches et flops : maîtrisez les 50 derniers mètres.",
    date: "30 Mars 2026",
    dateIso: "2026-03-30",
    viewers: 318,
    duration: "55 min",
    category: "technique",
    level: "debutant",
  },
  {
    id: "r6",
    title: "Stratégie sur un links écossais",
    description: "Adaptez votre jeu au vent, aux fairways étroits et aux greens rapides.",
    date: "23 Mars 2026",
    dateIso: "2026-03-23",
    viewers: 192,
    duration: "1h10",
    category: "strategie",
    level: "avance",
  },
  {
    id: "r7",
    title: "Comprendre son index de golf",
    description: "Comment est calculé votre index, et comment l'utiliser pour progresser.",
    date: "16 Mars 2026",
    dateIso: "2026-03-16",
    viewers: 276,
    duration: "42 min",
    category: "strategie",
    level: "debutant",
  },
  {
    id: "r8",
    title: "Optimiser son backswing",
    description: "Analyse technique détaillée du backswing : rotation, position des mains, tempo.",
    date: "9 Mars 2026",
    dateIso: "2026-03-09",
    viewers: 344,
    duration: "48 min",
    category: "technique",
    level: "intermediaire",
  },
  {
    id: "r9",
    title: "Choisir ses clubs pour progresser",
    description: "Quel matériel choisir selon votre niveau ? Les vraies différences qui comptent.",
    date: "2 Mars 2026",
    dateIso: "2026-03-02",
    viewers: 287,
    duration: "40 min",
    category: "equipement",
    level: "debutant",
  },
];

const LEVEL_META: Record<Level, { label: string; bg: string; text: string }> = {
  debutant:      { label: "Débutant",      bg: "rgba(74,124,191,0.15)",  text: "#7AAEE8" },
  intermediaire: { label: "Intermédiaire", bg: "rgba(201,168,76,0.15)",  text: "#DFC060" },
  avance:        { label: "Avancé",        bg: "rgba(155,85,201,0.15)",  text: "#B080E0" },
};

const CATEGORY_META: Record<ReplayCategory, { label: string; bg: string; text: string }> = {
  technique:  { label: "Technique",  bg: "rgba(201,168,76,0.12)", text: "#C9A84C" },
  putting:    { label: "Putting",    bg: "rgba(74,124,191,0.12)", text: "#7AAEE8" },
  mental:     { label: "Mental",     bg: "rgba(155,85,201,0.12)", text: "#B080E0" },
  strategie:  { label: "Stratégie", bg: "rgba(201,168,76,0.12)", text: "#DFC060" },
  equipement: { label: "Équipement", bg: "rgba(154,106,42,0.12)", text: "#D09030" },
};

// ─── Planning ──────────────────────────────────────────────────────────────────

interface ScheduledLive {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  hasGuest: boolean;
  guest?: {
    name: string;
    role: string;
    initials: string;
    color: string;
  };
  category: ReplayCategory;
  level: Level;
  spotsLeft?: number;
  isNext?: boolean;
}

const PLANNING: ScheduledLive[] = [
  {
    id: "p1",
    title: "Le putting sous pression",
    description: "Techniques mentales et gestuelles pour garder un putting solide en compétition.",
    date: "Lundi 12 Mai",
    time: "18h00",
    hasGuest: false,
    category: "putting",
    level: "debutant",
    spotsLeft: 48,
    isNext: true,
  },
  {
    id: "p2",
    title: "Swing analysis en direct",
    description: "Analyse de swings en direct envoyés par les membres, avec corrections en temps réel.",
    date: "Lundi 19 Mai",
    time: "18h00",
    hasGuest: true,
    guest: {
      name: "Tom Collu",
      role: "Coach certifié PGA",
      initials: "TC",
      color: "rgba(201,168,76,0.15)",
    },
    category: "technique",
    level: "intermediaire",
  },
  {
    id: "p3",
    title: "La force mentale au golf",
    description: "Comment développer une routine mentale solide et gérer les moments difficiles.",
    date: "Lundi 26 Mai",
    time: "18h30",
    hasGuest: true,
    guest: {
      name: "Dr. Émile Vance",
      role: "Préparateur mental",
      initials: "EV",
      color: "rgba(155,85,201,0.15)",
    },
    category: "mental",
    level: "avance",
  },
  {
    id: "p4",
    title: "L'approche de moins de 100 m",
    description: "Maîtrisez les distances courtes : sélection du club, trajectoire, spin.",
    date: "Lundi 2 Juin",
    time: "18h00",
    hasGuest: false,
    category: "technique",
    level: "intermediaire",
  },
  {
    id: "p5",
    title: "Golf féminin : conseils spécifiques",
    description: "Adaptations techniques et physiques propres au golf féminin avec une joueuse de circuit.",
    date: "Lundi 9 Juin",
    time: "18h00",
    hasGuest: true,
    guest: {
      name: "Camille Dupont",
      role: "Pro tour féminin",
      initials: "CD",
      color: "rgba(192,64,96,0.15)",
    },
    category: "strategie",
    level: "avance",
  },
  {
    id: "p6",
    title: "Préparation physique du golfeur",
    description: "Mobilité, souplesse et renforcement : ce que tout golfeur devrait faire.",
    date: "Lundi 16 Juin",
    time: "18h00",
    hasGuest: true,
    guest: {
      name: "Marc Aubert",
      role: "Coach sportif spécialisé golf",
      initials: "MA",
      color: "rgba(74,124,191,0.15)",
    },
    category: "technique",
    level: "intermediaire",
  },
];

const chatMessages = [
  { user: "Paul D.", msg: "Super conseil Laurent !", time: "14:32" },
  { user: "Léa M.", msg: "Merci, ça fait des semaines que j'essaie de comprendre ça", time: "14:33" },
  { user: "Marc T.", msg: "Question sur le driver svp ?", time: "14:33" },
  { user: "Sophie R.", msg: "Incroyable le live aujourd'hui !", time: "14:34" },
  { user: "Thomas L.", msg: "Est-ce que tu peux revenir sur la rotation ?", time: "14:35" },
  { user: "Julien B.", msg: "Merci pour les détails sur la prise !", time: "14:36" },
];

// ─── Component ─────────────────────────────────────────────────────────────────

type Tab = "live" | "replays" | "planning";

export default function LivePage() {
  const [chatInput, setChatInput] = useState("");
  const [tab, setTab] = useState<Tab>("live");
  const [replayFilter, setReplayFilter] = useState<ReplayCategory | "all">("all");
  const [levelFilter, setLevelFilter] = useState<"all" | Level>("all");
  const [reminded, setReminded] = useState<Set<string>>(new Set());

  const filteredReplays = REPLAYS
    .filter((r) => replayFilter === "all" || r.category === replayFilter)
    .filter((r) => levelFilter === "all" || r.level === levelFilter);

  const filteredPlanning = PLANNING
    .filter((s) => levelFilter === "all" || s.level === levelFilter);

  const featuredReplay = REPLAYS.find((r) => r.featured);

  const toggleRemind = (id: string) => {
    setReminded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="px-4 py-4 md:px-8 max-w-5xl mx-auto space-y-5">

      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] font-bold tracking-widest uppercase mb-0.5" style={{ color: "#7A8A7A" }}>
            Sessions avec Laurent
          </p>
          <h1 className="font-serif text-2xl font-bold" style={{ color: "#F5F0E8" }}>Live</h1>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{ background: "rgba(224,80,80,0.1)", color: "#E05050" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          En direct maintenant
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {([
          { key: "live" as Tab, label: "En direct", icon: Radio },
          { key: "replays" as Tab, label: "Rediffusions", icon: Play },
          { key: "planning" as Tab, label: "Planning", icon: Calendar },
        ]).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all"
            style={
              tab === key
                ? { background: "#C9A84C", color: "#0F2318" }
                : { background: "#1B3A2A", color: "#7A8A7A", border: "1px solid #2A4A35" }
            }
          >
            <Icon size={13} />
            {label}
            {key === "live" && (
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Level filter */}
      <div className="flex gap-1.5 flex-wrap">
        {([
          { key: "all", label: "Tous" },
          { key: "debutant", label: "Débutant" },
          { key: "intermediaire", label: "Intermédiaire" },
          { key: "avance", label: "Avancé" },
        ] as const).map(({ key, label }) => {
          const active = levelFilter === key;
          const meta = key !== "all" ? LEVEL_META[key] : null;
          return (
            <button
              key={key}
              onClick={() => setLevelFilter(key)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={
                active
                  ? { background: "#C9A84C", color: "#0F2318" }
                  : meta
                  ? { background: meta.bg, color: meta.text }
                  : { background: "#1B3A2A", color: "#7A8A7A", border: "1px solid #2A4A35" }
              }
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* ── TAB: LIVE ─────────────────────────────────────────────────── */}
      {tab === "live" && (
        <div className="grid md:grid-cols-3 gap-4">

          {/* Lecteur + infos */}
          <div className="md:col-span-2 flex flex-col gap-3">

            {/* Player */}
            <div
              className="relative overflow-hidden rounded-2xl aspect-video flex items-center justify-center"
              style={{ background: "linear-gradient(145deg, #0D1A09, #1A3410)" }}
            >
              {/* Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                EN DIRECT
              </div>
              <div
                className="absolute top-3 right-3 flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full"
                style={{ background: "rgba(0,0,0,0.45)", color: "rgba(255,255,255,0.85)" }}
              >
                <Users size={11} />
                <span>342 spectateurs</span>
              </div>

              {/* Central content */}
              <div className="text-center px-8">
                <div
                  className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.25)" }}
                >
                  <Radio size={24} style={{ color: "#C9A84C" }} />
                </div>
                <p className="font-serif font-bold text-lg leading-tight" style={{ color: "#FFFFFF" }}>
                  Maîtriser le driver
                </p>
                <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Laurent Seinger · En direct depuis 24 min
                </p>
              </div>

              {/* Bottom gradient */}
              <div
                className="absolute bottom-0 inset-x-0 h-16"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }}
              />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Démarré à 18h00
                </p>
                <div className="flex items-center gap-1" style={{ color: "#C9A84C" }}>
                  <Star size={11} fill="#C9A84C" />
                  <span className="text-[11px] font-bold">4.9 · 98 avis</span>
                </div>
              </div>
            </div>

            {/* Info card */}
            <div className="rounded-2xl p-4" style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-serif font-bold text-base" style={{ color: "#F5F0E8" }}>
                    Maîtriser le driver
                  </h2>
                  <p className="text-sm mt-1 leading-relaxed" style={{ color: "#7A8A7A" }}>
                    Dans ce live, Laurent vous explique comment optimiser votre prise en main du driver pour gagner de la distance et de la précision. Questions ouvertes en direct.
                  </p>
                </div>
                <span
                  className="flex-shrink-0 text-[10px] font-bold px-2 py-1 rounded-lg"
                  style={{ background: "rgba(201,168,76,0.12)", color: "#C9A84C" }}
                >
                  Technique
                </span>
              </div>
            </div>

            {/* Prochains lives */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}>
              <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: "1px solid #2A4A35" }}>
                <p className="text-sm font-bold" style={{ color: "#F5F0E8" }}>Prochains lives</p>
                <button onClick={() => setTab("planning")} className="text-xs font-semibold" style={{ color: "#C9A84C" }}>
                  Voir tout →
                </button>
              </div>
              {filteredPlanning.slice(0, 3).map((session, i, arr) => {
                const isReminded = reminded.has(session.id);
                const lMeta = LEVEL_META[session.level];
                return (
                  <div
                    key={session.id}
                    className="flex items-center gap-3 px-4 py-3"
                    style={i < arr.length - 1 ? { borderBottom: "1px solid #2A4A35" } : {}}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(201,168,76,0.1)" }}>
                      <Calendar size={14} style={{ color: "#C9A84C" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate" style={{ color: "#F5F0E8" }}>{session.title}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] font-medium" style={{ color: "#C9A84C" }}>{session.date} · {session.time}</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: lMeta.bg, color: lMeta.text }}>{lMeta.label}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleRemind(session.id)}
                      className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all"
                      style={isReminded ? { background: "rgba(201,168,76,0.12)", color: "#C9A84C" } : { background: "#132B1E", color: "#7A8A7A" }}
                    >
                      <Bell size={10} />
                      {isReminded ? "✓ Rappel" : "Me rappeler"}
                    </button>
                  </div>
                );
              })}
              {filteredPlanning.length === 0 && (
                <p className="px-4 py-6 text-center text-xs" style={{ color: "#7A8A7A" }}>Aucun live pour ce niveau</p>
              )}
            </div>

            {/* Rediffusions récentes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#7A8A7A" }}>Rediffusions récentes</p>
                <button onClick={() => setTab("replays")} className="text-xs font-semibold" style={{ color: "#C9A84C" }}>Voir tout →</button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0">
                {(levelFilter === "all" ? REPLAYS : REPLAYS.filter((r) => r.level === levelFilter)).slice(0, 4).map((replay) => {
                  const cMeta = CATEGORY_META[replay.category];
                  const lMeta = LEVEL_META[replay.level];
                  return (
                    <div
                      key={replay.id}
                      className="flex-shrink-0 w-44 overflow-hidden cursor-pointer transition-transform active:scale-[0.98]"
                      style={{ borderRadius: 14, background: "#1B3A2A", border: "1px solid #2A4A35" }}
                    >
                      <div className="relative flex items-center justify-center"
                        style={{ aspectRatio: "16/9", background: "linear-gradient(145deg, #0D1A09, #1A3410)" }}>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ background: "rgba(201,168,76,0.18)" }}>
                          <Play size={13} fill="#C9A84C" style={{ color: "#C9A84C" }} />
                        </div>
                        <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-md"
                          style={{ background: "rgba(0,0,0,0.6)", color: "rgba(255,255,255,0.9)" }}>
                          {replay.duration}
                        </span>
                      </div>
                      <div className="px-2.5 py-2">
                        <p className="text-[11px] font-semibold leading-snug line-clamp-2 mb-1" style={{ color: "#F5F0E8" }}>{replay.title}</p>
                        <div className="flex items-center gap-1 flex-wrap">
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md" style={{ background: cMeta.bg, color: cMeta.text }}>{cMeta.label}</span>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md" style={{ background: lMeta.bg, color: lMeta.text }}>{lMeta.label}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Chat */}
          <div
            className="rounded-2xl flex flex-col overflow-hidden md:h-[600px]"
            style={{ background: "#1B3A2A", border: "1px solid #2A4A35", minHeight: 280 }}
          >
            <div className="px-4 py-3" style={{ borderBottom: "1px solid #2A4A35" }}>
              <p className="text-sm font-bold" style={{ color: "#F5F0E8" }}>Chat en direct</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <p className="text-[11px]" style={{ color: "#7A8A7A" }}>342 membres actifs</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {chatMessages.map((m, i) => (
                <div key={i}>
                  <div className="flex items-baseline gap-1.5 mb-0.5">
                    <span className="text-xs font-bold" style={{ color: "#C9A84C" }}>{m.user}</span>
                    <span className="text-[9px]" style={{ color: "#3A4A3A" }}>{m.time}</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#7A8A7A" }}>{m.msg}</p>
                </div>
              ))}
            </div>

            <div className="px-4 py-3" style={{ borderTop: "1px solid #2A4A35" }}>
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-2"
                style={{ background: "#132B1E", border: "1px solid #2A4A35" }}
              >
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Votre message..."
                  className="flex-1 bg-transparent text-xs outline-none"
                  style={{ color: "#F5F0E8" }}
                />
                <button
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-opacity"
                  style={{ background: "linear-gradient(145deg, #1A3410, #2D4D1A)" }}
                >
                  <Send size={11} style={{ color: "#C9A84C" }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: REPLAYS ──────────────────────────────────────────────── */}
      {tab === "replays" && (
        <div className="space-y-4">

          {/* Featured replay */}
          {featuredReplay && (
            <div
              className="rounded-2xl overflow-hidden cursor-pointer"
              style={{ background: "linear-gradient(145deg, #0D1A09, #1A3410)", border: "1px solid #2A4A35" }}
            >
              <div className="p-5 flex items-start gap-5">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 relative"
                  style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.2)" }}
                >
                  <Play size={22} fill="#C9A84C" style={{ color: "#C9A84C" }} />
                  <span
                    className="absolute -top-1.5 -right-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: "#C9A84C", color: "#0F2318" }}
                  >
                    NEW
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                      style={{
                        background: CATEGORY_META[featuredReplay.category].bg,
                        color: CATEGORY_META[featuredReplay.category].text,
                      }}
                    >
                      {CATEGORY_META[featuredReplay.category].label}
                    </span>
                    <span className="text-[10px] font-semibold" style={{ color: "rgba(255,255,255,0.35)" }}>
                      Dernière session
                    </span>
                  </div>
                  <p className="font-serif font-bold text-base leading-snug" style={{ color: "#FFFFFF" }}>
                    {featuredReplay.title}
                  </p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {featuredReplay.description}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                      <Eye size={11} />
                      <span className="text-[11px]">{featuredReplay.viewers} vues</span>
                    </div>
                    <div className="flex items-center gap-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                      <Clock size={11} />
                      <span className="text-[11px]">{featuredReplay.duration}</span>
                    </div>
                    <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {featuredReplay.date}
                    </span>
                  </div>
                </div>
                <button
                  className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold"
                  style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.2)" }}
                >
                  <Play size={12} fill="#C9A84C" />
                  Regarder
                </button>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1" style={{ color: "#7A8A7A" }}>
              <Filter size={12} />
              <span className="text-[11px] font-semibold">Filtrer</span>
            </div>
            <button
              onClick={() => setReplayFilter("all")}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={
                replayFilter === "all"
                  ? { background: "#C9A84C", color: "#0F2318" }
                  : { background: "#1B3A2A", color: "#7A8A7A", border: "1px solid #2A4A35" }
              }
            >
              Tous ({REPLAYS.length})
            </button>
            {(Object.keys(CATEGORY_META) as ReplayCategory[]).map((cat) => {
              const count = REPLAYS.filter((r) => r.category === cat).length;
              if (count === 0) return null;
              const meta = CATEGORY_META[cat];
              const active = replayFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setReplayFilter(cat)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={
                    active
                      ? { background: "#C9A84C", color: "#0F2318" }
                      : { background: meta.bg, color: meta.text }
                  }
                >
                  {meta.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Replay list */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}
          >
            {filteredReplays.filter((r) => !r.featured).map((replay, i, arr) => {
              const meta = CATEGORY_META[replay.category];
              return (
                <div
                  key={replay.id}
                  className="flex items-center gap-4 px-5 py-4 cursor-pointer transition-colors"
                  style={i < arr.length - 1 ? { borderBottom: "1px solid #2A4A35" } : {}}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1F4230"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  {/* Thumbnail */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(145deg, #1A3410, #2D4D1A)" }}
                  >
                    <Play size={16} fill="#C9A84C" style={{ color: "#C9A84C" }} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold truncate" style={{ color: "#F5F0E8" }}>
                        {replay.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0"
                        style={{ background: meta.bg, color: meta.text }}
                      >
                        {meta.label}
                      </span>
                      <span className="text-[11px]" style={{ color: "#7A8A7A" }}>{replay.date}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                    <div className="flex items-center gap-1" style={{ color: "#7A8A7A" }}>
                      <Eye size={11} />
                      <span className="text-[11px]">{replay.viewers}</span>
                    </div>
                    <div className="flex items-center gap-1" style={{ color: "#7A8A7A" }}>
                      <Clock size={11} />
                      <span className="text-[11px]">{replay.duration}</span>
                    </div>
                  </div>

                  <ChevronRight size={15} style={{ color: "#3A4A3A", flexShrink: 0 }} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── TAB: PLANNING ─────────────────────────────────────────────── */}
      {tab === "planning" && (
        <div className="space-y-4">

          {/* Intro banner */}
          <div
            className="rounded-2xl p-5 flex items-start gap-4"
            style={{ background: "linear-gradient(145deg, #1A3410, #2D4D1A)" }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(201,168,76,0.15)" }}
            >
              <Calendar size={18} style={{ color: "#C9A84C" }} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: "#FFFFFF" }}>
                Prochains lives avec Laurent
              </p>
              <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                Chaque lundi à 18h · Sessions en direct avec questions ouvertes · Invités spéciaux réguliers
              </p>
            </div>
          </div>

          {/* Sessions list */}
          <div className="space-y-3">
            {filteredPlanning.map((session) => {
              const catMeta = CATEGORY_META[session.category];
              const isReminded = reminded.has(session.id);
              return (
                <div
                  key={session.id}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "#1B3A2A",
                    border: session.isNext ? `1.5px solid rgba(201,168,76,0.4)` : "1px solid #2A4A35",
                  }}
                >
                  {session.isNext && (
                    <div
                      className="px-5 py-2 flex items-center gap-2"
                      style={{ background: "rgba(201,168,76,0.1)", borderBottom: "1px solid rgba(201,168,76,0.2)" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#C9A84C" }} />
                      <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "#C9A84C" }}>
                        Prochain live
                      </span>
                    </div>
                  )}

                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      {/* Date block */}
                      <div
                        className="flex flex-col items-center justify-center flex-shrink-0 w-14 h-14 rounded-2xl text-center"
                        style={{
                          background: session.isNext ? "rgba(201,168,76,0.12)" : "#132B1E",
                          border: session.isNext ? "1px solid rgba(201,168,76,0.2)" : "1px solid #2A4A35",
                        }}
                      >
                        <span
                          className="text-[9px] font-bold uppercase tracking-wide leading-none"
                          style={{ color: session.isNext ? "#C9A84C" : "#7A8A7A" }}
                        >
                          {session.date.split(" ")[1]}
                        </span>
                        <span
                          className="text-xl font-bold leading-none mt-0.5"
                          style={{ color: "#F5F0E8" }}
                        >
                          {session.date.split(" ")[2]}
                        </span>
                        <span
                          className="text-[9px] font-semibold leading-none mt-0.5"
                          style={{ color: session.isNext ? "#C9A84C" : "#7A8A7A" }}
                        >
                          {session.date.split(" ")[3]}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span
                                className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                                style={{ background: catMeta.bg, color: catMeta.text }}
                              >
                                {catMeta.label}
                              </span>
                              <span className="text-xs font-semibold" style={{ color: "#C9A84C" }}>
                                {session.time}
                              </span>
                              {session.spotsLeft !== undefined && (
                                <span className="text-[10px] font-semibold" style={{ color: "#E05050" }}>
                                  {session.spotsLeft} places restantes
                                </span>
                              )}
                            </div>
                            <p className="text-sm font-bold" style={{ color: "#F5F0E8" }}>
                              {session.title}
                            </p>
                            <p className="text-xs mt-1 leading-relaxed" style={{ color: "#7A8A7A" }}>
                              {session.description}
                            </p>
                          </div>

                          <button
                            onClick={() => toggleRemind(session.id)}
                            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                            style={
                              isReminded
                                ? { background: "rgba(201,168,76,0.12)", color: "#C9A84C" }
                                : { background: "#132B1E", color: "#7A8A7A" }
                            }
                          >
                            <Bell size={11} />
                            {isReminded ? "Rappel ✓" : "Rappel"}
                          </button>
                        </div>

                        {/* Guest */}
                        {session.hasGuest && session.guest && (
                          <div
                            className="flex items-center gap-3 mt-3 p-3 rounded-xl"
                            style={{ background: "#132B1E", border: "1px solid #2A4A35" }}
                          >
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                              style={{ background: session.guest.color, color: "#F5F0E8" }}
                            >
                              {session.guest.initials}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <Mic size={10} style={{ color: "#7A8A7A" }} />
                                <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "#7A8A7A" }}>
                                  Invité
                                </span>
                              </div>
                              <p className="text-xs font-bold" style={{ color: "#F5F0E8" }}>
                                {session.guest.name}
                              </p>
                              <p className="text-[10px]" style={{ color: "#7A8A7A" }}>
                                {session.guest.role}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
