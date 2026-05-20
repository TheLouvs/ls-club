"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Play, CheckCircle, Lock, ChevronRight, ArrowLeft,
  Target, Circle, Zap, Wind, BookOpen, Heart,
  MessageSquare, ChevronLeft, Clock, Sparkles,
} from "lucide-react";
import Link from "next/link";

/* ─── Types ───────────────────────────────────────────────────── */

type Video = {
  id: number;
  title: string;
  duration: string;
  laurentNote: string;
};

type Category = {
  key: string;
  label: string;
  icon: React.ElementType;
  videos: Video[];
};

type Level = {
  key: string;
  label: string;
  range: string;
  tagline: string;
  color: string;
  bgColor: string;
  locked: boolean;
  categories?: Category[];
};

/* ─── Data ────────────────────────────────────────────────────── */

const levels: Level[] = [
  {
    key: "debutant",
    label: "Débutant",
    range: "Index 54 → 36",
    tagline: "Maîtrisez les fondamentaux",
    color: "#4A7CBF",
    bgColor: "rgba(74,124,191,0.15)",
    locked: false,
    categories: [
      {
        key: "fer-bois",
        label: "Jeu de fer / Bois",
        icon: Target,
        videos: [
          { id: 1, title: "Grip et prise en main",           duration: "8 min",  laurentNote: "Le grip est la seule connexion entre vous et le club. Un grip neutre vous donnera une bien meilleure sensation de contrôle dès vos premières balles." },
          { id: 2, title: "La posture à l'adresse",          duration: "7 min",  laurentNote: "Une posture athlétique — genoux légèrement fléchis, dos droit — est le point de départ de tout bon swing." },
          { id: 3, title: "L'alignement des pieds",          duration: "6 min",  laurentNote: "La majorité des débutants visent à droite de la cible. Posez un club au sol pour vérifier votre ligne d'alignement à chaque entraînement." },
          { id: 4, title: "La position de la balle",         duration: "5 min",  laurentNote: "La position de la balle dans le stance change selon le club utilisé. Pour un fer, elle se centre ; pour un bois, elle avance vers le pied avant." },
          { id: 5, title: "Le mouvement des bras au départ", duration: "10 min", laurentNote: "Le take-away détermine 80% de la qualité du swing. Concentrez-vous sur un départ lent et uni, bras et épaules ensemble." },
        ],
      },
      {
        key: "putting",
        label: "Putting",
        icon: Circle,
        videos: [
          { id: 6, title: "Introduction au putting",         duration: "8 min",  laurentNote: "Le putting représente environ 40% de vos coups sur un tour. C'est le secteur le plus rentable à travailler en priorité." },
          { id: 7, title: "Votre première routine pré-shot", duration: "9 min",  laurentNote: "Une routine reproductible élimine le doute. Lisez la ligne, visualisez la trajectoire, puis frappez en 5 secondes maximum." },
          { id: 8, title: "L'importance du rythme",          duration: "7 min",  laurentNote: "Un rythme 2:1 (back-swing deux fois plus lent que le through-swing) est la base du putting solide." },
        ],
      },
      {
        key: "petit-jeu",
        label: "Petit jeu",
        icon: Zap,
        videos: [
          { id: 9,  title: "Les erreurs classiques du débutant", duration: "12 min", laurentNote: "Les erreurs les plus courantes : accélérer trop tôt, lever la tête, et vouloir frapper trop fort. La patience est votre meilleure arme." },
          { id: 10, title: "Comment compter ses coups",          duration: "5 min",  laurentNote: "Apprendre à scorer honnêtement fait partie du respect des règles. N'hésitez pas à tenir un carnet de score dès le début." },
        ],
      },
      {
        key: "bunker",
        label: "Bunker",
        icon: Wind,
        videos: [
          { id: 11, title: "Les règles essentielles du golf", duration: "11 min", laurentNote: "Connaître les règles vous évitera bien des pénalités inutiles. Les règles les plus utiles : drop, hors-limites, obstacles." },
          { id: 12, title: "Votre premier tour de 9 trous",   duration: "14 min", laurentNote: "Le premier tour est une expérience unique. Ne comptez pas vos coups, observez, amusez-vous. Le golf se découvre par la pratique." },
        ],
      },
    ],
  },
  {
    key: "intermediaire",
    label: "Intermédiaire",
    range: "Index 36 → 18",
    tagline: "Perfectionnez votre technique",
    color: "#C9A84C",
    bgColor: "rgba(201,168,76,0.15)",
    locked: true,
  },
  {
    key: "avance",
    label: "Avancé",
    range: "Index < 18",
    tagline: "Maîtrise & compétition",
    color: "#9B55C9",
    bgColor: "rgba(155,85,201,0.15)",
    locked: true,
  },
];

const THUMB_GRADIENTS = [
  "linear-gradient(145deg, #1A3410, #2C4E1A)",
  "linear-gradient(145deg, #1E2E10, #2A3E18)",
  "linear-gradient(145deg, #10261A, #183A26)",
  "linear-gradient(145deg, #1A2A10, #283A18)",
  "linear-gradient(145deg, #102018, #183018)",
  "linear-gradient(145deg, #1E1A10, #302A18)",
];

function parseDurationMin(d: string): number {
  const m = d.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

function formatTotalDuration(videos: Video[]): string {
  const total = videos.reduce((acc, v) => acc + parseDurationMin(v.duration), 0);
  if (total >= 60) return `${Math.floor(total / 60)}h ${total % 60}min`;
  return `${total} min`;
}

/* ─── localStorage helpers ───────────────────────────────────── */

function useLibraryState() {
  const [watchedIds, setWatchedIds] = useState<Set<number>>(new Set());
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());
  const [notes, setNotes] = useState<Record<number, string>>({});

  useEffect(() => {
    try {
      const w = localStorage.getItem("ls_watched");
      if (w) setWatchedIds(new Set(JSON.parse(w)));
      const f = localStorage.getItem("ls_favorites");
      if (f) setFavoriteIds(new Set(JSON.parse(f)));
      const n = localStorage.getItem("ls_notes");
      if (n) setNotes(JSON.parse(n));
    } catch { /* ignore */ }
  }, []);

  const toggleWatched = useCallback((id: number) => {
    setWatchedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      localStorage.setItem("ls_watched", JSON.stringify([...next]));
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((id: number) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      localStorage.setItem("ls_favorites", JSON.stringify([...next]));
      return next;
    });
  }, []);

  const saveNote = useCallback((id: number, text: string) => {
    setNotes((prev) => {
      const next = { ...prev, [id]: text };
      localStorage.setItem("ls_notes", JSON.stringify(next));
      return next;
    });
  }, []);

  return { watchedIds, favoriteIds, notes, toggleWatched, toggleFavorite, saveNote };
}

/* ─── VideoCard ──────────────────────────────────────────────── */

function VideoCard({
  video, index, watched, favorite,
  onPlay, onToggleFavorite,
}: {
  video: Video;
  index: number;
  watched: boolean;
  favorite: boolean;
  onPlay: () => void;
  onToggleFavorite: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      onClick={onPlay}
      className="overflow-hidden cursor-pointer transition-all active:scale-[0.98]"
      style={{ borderRadius: 14, background: "#1B3A2A", border: "1px solid #2A4A35" }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ aspectRatio: "16/9", background: THUMB_GRADIENTS[index % THUMB_GRADIENTS.length] }}
      >
        {/* Watched overlay */}
        {watched && <div className="absolute inset-0" style={{ background: "rgba(201,168,76,0.08)" }} />}

        {/* Watched badge */}
        {watched && (
          <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#C9A84C" }}>
            <CheckCircle size={11} color="#0F2318" />
          </div>
        )}

        {/* Favorite */}
        <button
          onClick={onToggleFavorite}
          className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: favorite ? "rgba(201,168,76,0.9)" : "rgba(0,0,0,0.35)" }}
        >
          <Heart size={9} fill={favorite ? "white" : "none"} color="white" />
        </button>

        {/* Play */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: watched ? "rgba(201,168,76,0.25)" : "rgba(255,255,255,0.18)", backdropFilter: "blur(4px)" }}
        >
          <Play size={13} fill="white" style={{ color: "white", marginLeft: 1 }} />
        </div>

        {/* Duration */}
        <span
          className="absolute bottom-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-md"
          style={{ background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.9)" }}
        >
          {video.duration}
        </span>
      </div>

      <div className="px-2.5 py-2">
        <p className="text-[11px] font-semibold leading-snug line-clamp-2" style={{ color: watched ? "#7A8A7A" : "#F5F0E8" }}>
          {video.title}
        </p>
        {watched && <p className="text-[9px] font-medium mt-0.5" style={{ color: "#C9A84C" }}>Vue</p>}
      </div>
    </div>
  );
}

/* ─── VideoPlayerView ─────────────────────────────────────────── */

function VideoPlayerView({
  video, category, allVideos, watched, favorite, note,
  onBack, onToggleWatched, onToggleFavorite, onSaveNote, onNavigate,
}: {
  video: Video;
  category: Category;
  allVideos: Video[];
  watched: boolean;
  favorite: boolean;
  note: string;
  onBack: () => void;
  onToggleWatched: () => void;
  onToggleFavorite: () => void;
  onSaveNote: (text: string) => void;
  onNavigate: (video: Video) => void;
}) {
  const CatIcon = category.icon;
  const currentIdx = allVideos.findIndex((v) => v.id === video.id);
  const prev = currentIdx > 0 ? allVideos[currentIdx - 1] : null;
  const next = currentIdx < allVideos.length - 1 ? allVideos[currentIdx + 1] : null;

  return (
    <div className="px-4 py-4 md:px-8 max-w-3xl mx-auto pb-12">

      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 mb-4 transition-opacity hover:opacity-70"
        style={{ color: "#7A8A7A", fontSize: 13, fontWeight: 600 }}
      >
        <ArrowLeft size={14} />
        {category.label}
      </button>

      {/* Video thumbnail */}
      <div
        className="relative w-full flex items-center justify-center mb-4 overflow-hidden"
        style={{ aspectRatio: "16/9", borderRadius: 18, background: THUMB_GRADIENTS[video.id % THUMB_GRADIENTS.length] }}
      >
        {watched && <div className="absolute inset-0" style={{ background: "rgba(201,168,76,0.06)" }} />}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
        >
          <Play size={28} fill="white" style={{ color: "white", marginLeft: 3 }} />
        </div>
        <span
          className="absolute bottom-3 left-3 text-xs font-bold px-2 py-1 rounded-lg"
          style={{ background: "rgba(0,0,0,0.55)", color: "white" }}
        >
          {video.duration}
        </span>
        {watched && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full" style={{ background: "#C9A84C" }}>
            <CheckCircle size={11} color="#0F2318" />
            <span className="text-[10px] font-bold" style={{ color: "#0F2318" }}>Vue</span>
          </div>
        )}
      </div>

      {/* Title + actions */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-4 h-4 rounded flex items-center justify-center" style={{ background: "rgba(74,124,191,0.15)" }}>
              <CatIcon size={9} style={{ color: "#4A7CBF" }} />
            </div>
            <span className="text-[10px] font-semibold" style={{ color: "#4A7CBF" }}>{category.label}</span>
          </div>
          <h1 className="font-serif text-xl font-bold leading-snug" style={{ color: "#F5F0E8" }}>{video.title}</h1>
        </div>
        <button
          onClick={onToggleFavorite}
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
          style={{ background: favorite ? "rgba(201,168,76,0.12)" : "#132B1E", border: `1px solid ${favorite ? "rgba(201,168,76,0.35)" : "transparent"}` }}
        >
          <Heart size={15} fill={favorite ? "#C9A84C" : "none"} style={{ color: favorite ? "#C9A84C" : "#7A8A7A" }} />
        </button>
      </div>

      {/* Marquer comme vue */}
      <button
        onClick={onToggleWatched}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold mb-4 transition-all"
        style={{
          background: watched ? "rgba(201,168,76,0.12)" : "#C9A84C",
          color: watched ? "#C9A84C" : "#0F2318",
          border: watched ? "1px solid rgba(201,168,76,0.2)" : "none",
        }}
      >
        <CheckCircle size={15} />
        {watched ? "Marquer comme non vue" : "Marquer comme vue"}
      </button>

      {/* Note de Laurent */}
      <div className="card-white p-4 mb-3">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#C9A84C" }}>
            <span className="text-[10px] font-bold" style={{ color: "#1A3410" }}>L</span>
          </div>
          <p className="text-xs font-bold" style={{ color: "#F5F0E8" }}>Note de Laurent</p>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "#7A8A7A" }}>
          {video.laurentNote}
        </p>
      </div>

      {/* Lien Lolo IA */}
      <Link
        href="/ia"
        className="flex items-center gap-3 p-3.5 mb-4 rounded-2xl transition-opacity hover:opacity-90"
        style={{ background: "linear-gradient(135deg, #1A3410, #2C4E1A)", textDecoration: "none" }}
      >
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(201,168,76,0.25)" }}>
          <Sparkles size={15} style={{ color: "#C9A84C" }} />
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold text-white">Poser une question à Lolo IA</p>
          <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
            Demande un conseil sur &quot;{video.title}&quot;
          </p>
        </div>
        <ChevronRight size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
      </Link>

      {/* Notes personnelles */}
      <div className="card-white p-4 mb-4">
        <div className="flex items-center gap-2 mb-2.5">
          <MessageSquare size={13} style={{ color: "#7A8A7A" }} />
          <p className="text-xs font-bold" style={{ color: "#F5F0E8" }}>Mes notes</p>
        </div>
        <textarea
          value={note}
          onChange={(e) => onSaveNote(e.target.value)}
          placeholder="Tes observations, points à retenir…"
          rows={3}
          className="w-full text-sm resize-none outline-none bg-transparent leading-relaxed"
          style={{ color: "#F5F0E8" }}
        />
        {note && (
          <p className="text-[10px] mt-1.5" style={{ color: "#7A8A7A" }}>Sauvegardé automatiquement</p>
        )}
      </div>

      {/* Navigation prev / next */}
      <div className="flex gap-2">
        <button
          onClick={() => prev && onNavigate(prev)}
          disabled={!prev}
          className="flex-1 flex items-center gap-2 px-3 py-3 rounded-2xl text-sm font-semibold transition-opacity"
          style={{ background: "#132B1E", color: prev ? "#7A8A7A" : "#3A4A3A", opacity: prev ? 1 : 0.5 }}
        >
          <ChevronLeft size={15} />
          <span className="truncate">{prev ? prev.title : "Première vidéo"}</span>
        </button>
        <button
          onClick={() => next && onNavigate(next)}
          disabled={!next}
          className="flex-1 flex items-center justify-end gap-2 px-3 py-3 rounded-2xl text-sm font-semibold transition-opacity"
          style={{ background: next ? "#C9A84C" : "#132B1E", color: next ? "#0F2318" : "#3A4A3A", opacity: next ? 1 : 0.5 }}
        >
          <span className="truncate">{next ? next.title : "Dernière vidéo"}</span>
          <ChevronRight size={15} />
        </button>
      </div>

    </div>
  );
}

/* ─── DebutantView ────────────────────────────────────────────── */

function DebutantView({
  level, watchedIds, favoriteIds, notes,
  onBack, onPlayVideo, onToggleWatched, onToggleFavorite,
}: {
  level: Level;
  watchedIds: Set<number>;
  favoriteIds: Set<number>;
  notes: Record<number, string>;
  onBack: () => void;
  onPlayVideo: (video: Video, category: Category) => void;
  onToggleWatched: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}) {
  const allVideos = level.categories!.flatMap((c) => c.videos);
  const watchedCount = allVideos.filter((v) => watchedIds.has(v.id)).length;
  const total = allVideos.length;
  const pct = Math.round((watchedCount / total) * 100);

  // Next unwatched video for "Reprendre"
  let nextUnwatched: { video: Video; category: Category } | null = null;
  for (const cat of level.categories!) {
    for (const v of cat.videos) {
      if (!watchedIds.has(v.id)) { nextUnwatched = { video: v, category: cat }; break; }
    }
    if (nextUnwatched) break;
  }

  let globalIndex = 0;

  return (
    <div className="px-4 py-4 md:px-8 max-w-3xl mx-auto">

      {/* Hero header */}
      <div className="relative overflow-hidden p-4 mb-4" style={{ background: "linear-gradient(145deg, #1A3410, #263D18)", borderRadius: 20 }}>
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(74,124,191,0.3), transparent)" }} />
        <div className="absolute -left-4 -bottom-4 w-24 h-24 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(74,124,191,0.15), transparent)" }} />

        <button onClick={onBack} className="flex items-center gap-1 mb-3 hover:opacity-70 transition-opacity"
          style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600 }}>
          <ArrowLeft size={13} />Bibliothèque
        </button>

        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full mb-2"
              style={{ background: "rgba(74,124,191,0.25)", border: "1px solid rgba(74,124,191,0.4)" }}>
              <BookOpen size={9} style={{ color: "#7AAEE8" }} />
              <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: "#7AAEE8" }}>{level.range}</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-white leading-tight">{level.label}</h1>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{level.tagline}</p>
          </div>
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="relative w-12 h-12">
              <svg viewBox="0 0 40 40" className="w-full h-full -rotate-90">
                <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3.5" />
                <circle cx="20" cy="20" r="16" fill="none" stroke="#C9A84C" strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 16}`}
                  strokeDashoffset={`${2 * Math.PI * 16 * (1 - pct / 100)}`} />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-white">{pct}%</span>
            </div>
            <span className="text-[9px] mt-1 font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>{watchedCount}/{total} vues</span>
          </div>
        </div>
      </div>

      {/* Bandeau Reprendre */}
      {nextUnwatched && (
        <button
          onClick={() => onPlayVideo(nextUnwatched!.video, nextUnwatched!.category)}
          className="w-full flex items-center gap-3 p-3.5 mb-4 rounded-2xl text-left transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #C9A84C, #DFC060)" }}
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(0,0,0,0.15)" }}>
            <Play size={14} fill="#0F2318" style={{ color: "#0F2318", marginLeft: 1 }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold mb-0.5" style={{ color: "rgba(15,35,24,0.65)" }}>
              REPRENDRE · {nextUnwatched.category.label}
            </p>
            <p className="text-sm font-bold truncate" style={{ color: "#0F2318" }}>{nextUnwatched.video.title}</p>
          </div>
          <ChevronRight size={15} style={{ color: "rgba(15,35,24,0.5)" }} />
        </button>
      )}

      {/* Compartiments */}
      <div className="flex flex-col gap-5 pb-8">
        {level.categories!.map((cat, catIdx) => {
          const CatIcon = cat.icon;
          const catWatched = cat.videos.filter((v) => watchedIds.has(v.id)).length;
          const catTotal = cat.videos.length;
          const catPct = Math.round((catWatched / catTotal) * 100);
          const allDone = catWatched === catTotal;
          const accentColor = allDone ? "#C9A84C" : "#4A7CBF";
          const accentBg = allDone ? "rgba(201,168,76,0.1)" : "rgba(74,124,191,0.1)";

          return (
            <div
              key={cat.key}
              className="overflow-hidden"
              style={{
                borderRadius: 18,
                border: `1.5px solid ${allDone ? "rgba(201,168,76,0.3)" : "rgba(74,124,191,0.2)"}`,
                background: "#1B3A2A",
              }}
            >
              {/* Header compartiment */}
              <div className="px-4 py-3.5 flex items-center justify-between"
                style={{ background: accentBg, borderBottom: `1px solid ${allDone ? "rgba(201,168,76,0.18)" : "rgba(74,124,191,0.13)"}` }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: allDone ? "rgba(201,168,76,0.2)" : "rgba(74,124,191,0.18)" }}>
                    <CatIcon size={16} style={{ color: accentColor }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold" style={{ color: "#F5F0E8" }}>{cat.label}</p>
                      {allDone && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                          style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C" }}>
                          ✓ Terminé
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-[11px]" style={{ color: "#7A8A7A" }}>
                        Compartiment {catIdx + 1} · {catTotal} vidéo{catTotal > 1 ? "s" : ""}
                      </p>
                      <span className="text-[10px]" style={{ color: "#3A4A3A" }}>·</span>
                      <div className="flex items-center gap-0.5" style={{ color: "#7A8A7A" }}>
                        <Clock size={9} />
                        <span className="text-[10px]">{formatTotalDuration(cat.videos)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="text-xs font-bold" style={{ color: accentColor }}>{catWatched}/{catTotal}</span>
                  <div className="w-20 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${catPct}%`, background: accentColor }} />
                  </div>
                </div>
              </div>

              {/* Grille vidéos */}
              <div className="p-3 grid grid-cols-2 md:grid-cols-3 gap-2.5">
                {cat.videos.map((video) => {
                  const idx = globalIndex++;
                  return (
                    <VideoCard
                      key={video.id}
                      video={video}
                      index={idx}
                      watched={watchedIds.has(video.id)}
                      favorite={favoriteIds.has(video.id)}
                      onPlay={() => onPlayVideo(video, cat)}
                      onToggleFavorite={(e) => { e.stopPropagation(); onToggleFavorite(video.id); }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── LandingView ─────────────────────────────────────────────── */

function LandingView({ watchedIds, onSelect }: { watchedIds: Set<number>; onSelect: (key: string) => void }) {
  const debutant = levels[0];
  const allVideos = debutant.categories!.flatMap((c) => c.videos);
  const watchedCount = allVideos.filter((v) => watchedIds.has(v.id)).length;
  const total = allVideos.length;
  const pct = Math.round((watchedCount / total) * 100);
  const totalDuration = formatTotalDuration(allVideos);

  return (
    <div className="px-4 py-4 md:px-8 max-w-3xl mx-auto">
      <div className="mb-5">
        <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "#7A8A7A" }}>Votre parcours</p>
        <h1 className="font-serif text-2xl font-bold" style={{ color: "#F5F0E8" }}>Bibliothèque</h1>
      </div>

      {/* Carte Débutant */}
      <button onClick={() => onSelect("debutant")} className="w-full text-left mb-3 transition-transform active:scale-[0.99]">
        <div className="relative overflow-hidden p-5" style={{ background: "linear-gradient(145deg, #1A3410, #263D18)", borderRadius: 20 }}>
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(74,124,191,0.35), transparent)" }} />
          <div className="absolute left-0 -bottom-8 w-32 h-32 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(74,124,191,0.12), transparent)" }} />

          <div className="flex items-start justify-between mb-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{ background: "rgba(74,124,191,0.25)", border: "1px solid rgba(74,124,191,0.4)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#7AAEE8" }} />
              <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#7AAEE8" }}>Niveau débutant</span>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(74,124,191,0.2)" }}>
              <ChevronRight size={16} color="#7AAEE8" />
            </div>
          </div>

          <p className="font-serif text-3xl font-bold text-white leading-none mb-1">Débutant</p>
          <div className="flex items-center gap-3 mb-5">
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>Maîtrisez les fondamentaux · Index 54 → 36</p>
            <div className="flex items-center gap-1" style={{ color: "rgba(255,255,255,0.3)" }}>
              <Clock size={10} />
              <span className="text-[10px] font-medium">{totalDuration}</span>
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {debutant.categories!.map((c) => {
              const Icon = c.icon;
              const done = c.videos.every((v) => watchedIds.has(v.id));
              return (
                <div key={c.key} className="flex items-center gap-1 px-2 py-1 rounded-full"
                  style={{ background: done ? "rgba(201,168,76,0.2)" : "rgba(255,255,255,0.08)", border: `1px solid ${done ? "rgba(201,168,76,0.35)" : "rgba(255,255,255,0.12)"}` }}>
                  <Icon size={9} style={{ color: done ? "#C9A84C" : "rgba(255,255,255,0.5)" }} />
                  <span className="text-[9px] font-semibold" style={{ color: done ? "#DFC060" : "rgba(255,255,255,0.55)" }}>{c.label}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>Progression</span>
            <span className="text-xs font-bold" style={{ color: "#C9A84C" }}>{watchedCount}/{total} vidéos vues</span>
          </div>
          <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #C9A84C, #DFC060)" }} />
          </div>
          <p className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>{pct}% complété</p>
        </div>
      </button>

      {/* Niveaux verrouillés */}
      <p className="text-[10px] font-bold tracking-widest uppercase mb-2 mt-5" style={{ color: "#7A8A7A" }}>Prochains niveaux</p>
      <div className="flex flex-col gap-2">
        {levels.slice(1).map((level) => (
          <div key={level.key} className="card-white overflow-hidden" style={{ cursor: "not-allowed", borderRadius: 16 }}>
            <div className="flex items-center gap-3 p-4" style={{ opacity: 0.6 }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: level.bgColor }}>
                <Lock size={17} style={{ color: level.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold font-serif" style={{ color: "#F5F0E8" }}>{level.label}</p>
                <p className="text-xs" style={{ color: "#7A8A7A" }}>{level.range} · {level.tagline}</p>
              </div>
              <div className="flex-shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: level.bgColor, color: level.color }}>
                Bientôt
              </div>
            </div>
            <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${level.color}22, ${level.color}08)` }} />
          </div>
        ))}
      </div>

      {/* Explorer */}
      <div className="mt-6">
        <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#7A8A7A" }}>Explorer</p>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0">
          {debutant.categories!.flatMap((c) => c.videos).slice(0, 6).map((video, i) => (
            <div
              key={video.id}
              className="flex-shrink-0 w-36 overflow-hidden cursor-pointer transition-transform active:scale-[0.98]"
              style={{ borderRadius: 14, background: "#1B3A2A", border: "1px solid #2A4A35" }}
            >
              <div
                className="relative flex items-center justify-center"
                style={{ aspectRatio: "16/9", background: THUMB_GRADIENTS[i % THUMB_GRADIENTS.length] }}
              >
                <div className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.18)" }}>
                  <Play size={11} fill="white" style={{ color: "white", marginLeft: 1 }} />
                </div>
                <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-md"
                  style={{ background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.9)" }}>
                  {video.duration}
                </span>
              </div>
              <div className="px-2.5 py-2">
                <p className="text-[11px] font-semibold leading-snug line-clamp-2" style={{ color: "#F5F0E8" }}>{video.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Catégories */}
      <div className="mt-5 mb-4">
        <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#7A8A7A" }}>Catégories</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {[
            ...debutant.categories!.map((c) => ({ key: c.key, label: c.label, icon: c.icon, count: c.videos.length, locked: false })),
            { key: "mental", label: "Mental", icon: Heart, count: null, locked: true },
            { key: "strategie", label: "Stratégie", icon: BookOpen, count: null, locked: true },
          ].map(({ key, label, icon: Icon, count, locked }) => (
            <div
              key={key}
              className="flex items-center gap-3 p-3 rounded-2xl transition-all"
              style={{
                background: locked ? "#132B1E" : "#1B3A2A",
                border: `1px solid #2A4A35`,
                cursor: locked ? "not-allowed" : "pointer",
                opacity: locked ? 0.65 : 1,
              }}
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: locked ? "#0A1A10" : "rgba(201,168,76,0.12)" }}>
                <Icon size={15} style={{ color: locked ? "#3A4A3A" : "#C9A84C" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold" style={{ color: locked ? "#7A8A7A" : "#F5F0E8" }}>{label}</p>
                <p className="text-[10px]" style={{ color: "#3A4A3A" }}>
                  {locked ? "Bientôt" : `${count} vidéo${count !== 1 ? "s" : ""}`}
                </p>
              </div>
              {locked
                ? <Lock size={11} style={{ color: "#3A4A3A", flexShrink: 0 }} />
                : <ChevronRight size={13} style={{ color: "#3A4A3A", flexShrink: 0 }} />
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */

export default function BibliothequePage() {
  const { watchedIds, favoriteIds, notes, toggleWatched, toggleFavorite, saveNote } = useLibraryState();

  const [view, setView] = useState<"landing" | "level" | "player">("landing");
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [playerState, setPlayerState] = useState<{ video: Video; category: Category } | null>(null);

  function handleSelectLevel(key: string) {
    const lvl = levels.find((l) => l.key === key);
    if (lvl && !lvl.locked) { setActiveLevel(lvl); setView("level"); }
  }

  function handlePlayVideo(video: Video, category: Category) {
    setPlayerState({ video, category });
    setView("player");
  }

  if (view === "player" && playerState && activeLevel) {
    const allCatVideos = activeLevel.categories!.find((c) => c.key === playerState.category.key)!.videos;
    return (
      <VideoPlayerView
        video={playerState.video}
        category={playerState.category}
        allVideos={allCatVideos}
        watched={watchedIds.has(playerState.video.id)}
        favorite={favoriteIds.has(playerState.video.id)}
        note={notes[playerState.video.id] ?? ""}
        onBack={() => setView("level")}
        onToggleWatched={() => toggleWatched(playerState.video.id)}
        onToggleFavorite={() => toggleFavorite(playerState.video.id)}
        onSaveNote={(text) => saveNote(playerState.video.id, text)}
        onNavigate={(video) => setPlayerState({ video, category: playerState.category })}
      />
    );
  }

  if (view === "level" && activeLevel) {
    return (
      <DebutantView
        level={activeLevel}
        watchedIds={watchedIds}
        favoriteIds={favoriteIds}
        notes={notes}
        onBack={() => setView("landing")}
        onPlayVideo={handlePlayVideo}
        onToggleWatched={toggleWatched}
        onToggleFavorite={toggleFavorite}
      />
    );
  }

  return <LandingView watchedIds={watchedIds} onSelect={handleSelectLevel} />;
}
