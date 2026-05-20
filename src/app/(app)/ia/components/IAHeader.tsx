"use client";

import { TrendingDown, MessageCircle, Camera, Map, History } from "lucide-react";
import { MOCK_PROFILE } from "../data";

type Mode  = "questions" | "swing" | "strategie";
type Level = "debutant" | "intermediaire" | "avance";

const LEVELS: Level[] = ["debutant", "intermediaire", "avance"];

const NIVEAU_COLORS: Record<Level, string> = {
  debutant:      "#6ab0d9",
  intermediaire: "#c9a84c",
  avance:        "#c26ad9",
};

const NIVEAU_LABELS: Record<Level, string> = {
  debutant:      "Débutant",
  intermediaire: "Intermédiaire",
  avance:        "Avancé",
};

const MODE_META: Record<Mode, { label: string; icon: React.ElementType; color: string }> = {
  questions: { label: "Discussion",  icon: MessageCircle, color: "#5aad75" },
  swing:     { label: "Mon Swing",   icon: Camera,        color: "#c9a84c" },
  strategie: { label: "Stratégie",   icon: Map,           color: "#6ab0d9" },
};

type Props = {
  mode: Mode;
  level?: Level;
  onLevelChange?: (level: Level) => void;
  onHistoryOpen?: () => void;
};

export default function IAHeader({ mode, level, onLevelChange, onHistoryOpen }: Props) {
  const profile = MOCK_PROFILE;
  const activeLevel = level ?? (profile.niveau as Level);
  const niveauColor = NIVEAU_COLORS[activeLevel];
  const meta = MODE_META[mode];
  const ModeIcon = meta.icon;

  function cycleLevel() {
    if (!onLevelChange) return;
    const idx = LEVELS.indexOf(activeLevel);
    onLevelChange(LEVELS[(idx + 1) % LEVELS.length]);
  }

  return (
    <div
      className="flex items-center gap-3 px-4 py-3"
      style={{ borderBottom: `0.5px solid #1e3a1e`, background: "#0a1a0a" }}
    >
      {/* History button — top-left, only in questions mode */}
      {onHistoryOpen && (
        <button
          onClick={onHistoryOpen}
          className="flex items-center justify-center rounded-lg transition-colors flex-shrink-0"
          style={{ color: "#4a6855", padding: 6 }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#8aab92")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#4a6855")}
          title="Historique des conversations"
        >
          <History size={17} />
        </button>
      )}

      {/* LS avatar */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: "#1a3a0a", border: "1px solid #3a6a1a", boxShadow: "0 0 14px rgba(26,58,10,0.4)" }}
      >
        <span className="text-[11px] font-bold" style={{ color: "#c0dd97" }}>LS</span>
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-serif font-semibold text-sm" style={{ color: "#e8f0ea" }}>Lolo IA</p>

          {/* Level badge — tappable in questions mode */}
          {onLevelChange ? (
            <button
              onClick={cycleLevel}
              className="text-[10px] font-bold px-2 py-0.5 rounded-full transition-all active:scale-95"
              style={{
                background: `${niveauColor}25`,
                color: niveauColor,
                border: `1px solid ${niveauColor}55`,
              }}
              title="Changer le niveau"
            >
              {NIVEAU_LABELS[activeLevel]}
            </button>
          ) : (
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: `${niveauColor}18`, color: niveauColor, border: `1px solid ${niveauColor}33` }}
            >
              {NIVEAU_LABELS[activeLevel]}
            </span>
          )}
        </div>
        <p className="text-[10px] flex items-center gap-1.5 mt-0.5" style={{ color: meta.color }}>
          <ModeIcon size={9} />
          {meta.label}
        </p>
      </div>

      {/* Index */}
      <div
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl flex-shrink-0"
        style={{ background: "#0d200d", border: "0.5px solid #1e3a1e" }}
      >
        <TrendingDown size={10} style={{ color: "#5aad75" }} />
        <span className="text-xs font-bold" style={{ color: "#e8f0ea" }}>{profile.handicap}</span>
        <span className="text-[10px]" style={{ color: "#4a6855" }}>idx</span>
      </div>
    </div>
  );
}
