"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search, Play, Bot, Users, Radio, User, MessageCircle, Camera,
  Map, Trophy, BookOpen, ArrowRight, Command
} from "lucide-react";

type Result = {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  category: "Action" | "Vidéo" | "Module" | "Lolo IA" | "Communauté" | "Page";
  icon: typeof Play;
  iconBg: string;
  iconColor: string;
};

const ITEMS: Result[] = [
  // Quick actions
  { id: "a1", title: "Filme ton swing", subtitle: "Analyse Mon Swing par l'IA", href: "/ia/swing", category: "Action", icon: Camera, iconBg: "rgba(201,168,76,0.12)", iconColor: "#C9A84C" },
  { id: "a2", title: "Pose une question à Lolo", subtitle: "Discussion IA", href: "/ia/questions", category: "Action", icon: MessageCircle, iconBg: "rgba(201,168,76,0.12)", iconColor: "#C9A84C" },
  { id: "a3", title: "Stratégie de parcours", subtitle: "Analyse tactique IA", href: "/ia/strategie", category: "Action", icon: Map, iconBg: "rgba(201,168,76,0.12)", iconColor: "#C9A84C" },

  // Pages
  { id: "p1", title: "Accueil", subtitle: "Tableau de bord", href: "/dashboard", category: "Page", icon: Play, iconBg: "#1B3A2A", iconColor: "#7A8A7A" },
  { id: "p2", title: "Bibliothèque", subtitle: "Toutes les vidéos", href: "/bibliotheque", category: "Page", icon: BookOpen, iconBg: "#1B3A2A", iconColor: "#7A8A7A" },
  { id: "p3", title: "Live", subtitle: "Sessions avec Laurent", href: "/live", category: "Page", icon: Radio, iconBg: "rgba(224,80,80,0.12)", iconColor: "#E05050" },
  { id: "p4", title: "Lolo IA", subtitle: "Assistant intelligent", href: "/ia", category: "Page", icon: Bot, iconBg: "rgba(201,168,76,0.12)", iconColor: "#C9A84C" },
  { id: "p5", title: "Communauté", subtitle: "La famille LS Club", href: "/communaute", category: "Page", icon: Users, iconBg: "#1B3A2A", iconColor: "#7A8A7A" },
  { id: "p6", title: "Profil", subtitle: "Mon compte", href: "/profil", category: "Page", icon: User, iconBg: "#1B3A2A", iconColor: "#7A8A7A" },

  // Mock videos
  { id: "v1", title: "La rotation des hanches", subtitle: "Module 2 · 12 min", href: "/bibliotheque", category: "Vidéo", icon: Play, iconBg: "rgba(201,168,76,0.12)", iconColor: "#C9A84C" },
  { id: "v2", title: "Grip et prise en main", subtitle: "Module 1 · 8 min", href: "/bibliotheque", category: "Vidéo", icon: Play, iconBg: "rgba(201,168,76,0.12)", iconColor: "#C9A84C" },
  { id: "v3", title: "Le chip shot parfait", subtitle: "Short Game · 15 min", href: "/bibliotheque", category: "Vidéo", icon: Play, iconBg: "rgba(201,168,76,0.12)", iconColor: "#C9A84C" },
  { id: "v4", title: "Maîtriser le driver", subtitle: "Replay · 58 min", href: "/live", category: "Vidéo", icon: Play, iconBg: "rgba(224,80,80,0.12)", iconColor: "#E05050" },

  // Modules
  { id: "m1", title: "Les Fondamentaux", subtitle: "8 leçons · Terminé", href: "/bibliotheque", category: "Module", icon: BookOpen, iconBg: "rgba(201,168,76,0.12)", iconColor: "#C9A84C" },
  { id: "m2", title: "Le Swing", subtitle: "12 leçons · 40 %", href: "/bibliotheque", category: "Module", icon: BookOpen, iconBg: "rgba(201,168,76,0.12)", iconColor: "#C9A84C" },

  // Communauté
  { id: "c1", title: "Putting à 5 mètres", subtitle: "Challenge · 48 participants", href: "/communaute", category: "Communauté", icon: Trophy, iconBg: "rgba(201,168,76,0.12)", iconColor: "#C9A84C" },
  { id: "c2", title: "Mon meilleur drive", subtitle: "Challenge · 32 participants", href: "/communaute", category: "Communauté", icon: Trophy, iconBg: "rgba(201,168,76,0.12)", iconColor: "#C9A84C" },
];

export function SearchPalette({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ITEMS;
    return ITEMS.filter(
      (it) =>
        it.title.toLowerCase().includes(q) ||
        (it.subtitle?.toLowerCase().includes(q) ?? false) ||
        it.category.toLowerCase().includes(q)
    );
  }, [query]);

  // Group by category preserving order
  const grouped = useMemo(() => {
    const groups: Record<string, Result[]> = {};
    filtered.forEach((it) => {
      if (!groups[it.category]) groups[it.category] = [];
      groups[it.category].push(it);
    });
    return Object.entries(groups);
  }, [filtered]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = filtered[activeIdx];
      if (target) {
        router.push(target.href);
        onClose();
      }
    }
  }

  let runningIdx = -1;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center pt-[12vh] px-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: "#1B3A2A",
          border: "1px solid #2A4A35",
          maxHeight: "70vh",
          boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div
          className="flex items-center gap-3 px-4 py-3.5"
          style={{ borderBottom: "1px solid #2A4A35" }}
        >
          <Search size={16} style={{ color: "#7A8A7A" }} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIdx(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Rechercher des vidéos, modules, posts…"
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: "#F5F0E8" }}
          />
          <button
            onClick={onClose}
            className="text-[10px] font-bold px-2 py-1 rounded-md tracking-wider"
            style={{ background: "#132B1E", color: "#7A8A7A", border: "1px solid #2A4A35" }}
            aria-label="Fermer"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto flex-1">
          {filtered.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm" style={{ color: "#7A8A7A" }}>
                Aucun résultat pour « {query} »
              </p>
            </div>
          ) : (
            grouped.map(([cat, items]) => (
              <div key={cat} className="py-2">
                <p
                  className="text-[10px] font-bold tracking-widest uppercase px-4 pb-1.5"
                  style={{ color: "#7A8A7A" }}
                >
                  {cat}
                </p>
                {items.map((it) => {
                  runningIdx++;
                  const isActive = runningIdx === activeIdx;
                  const Icon = it.icon;
                  return (
                    <Link
                      key={it.id}
                      href={it.href}
                      onClick={onClose}
                      onMouseEnter={() => setActiveIdx(runningIdx)}
                      className="flex items-center gap-3 px-4 py-2.5"
                      style={{
                        background: isActive ? "#1F4230" : "transparent",
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: it.iconBg }}
                      >
                        <Icon size={14} style={{ color: it.iconColor }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate" style={{ color: "#F5F0E8" }}>
                          {it.title}
                        </p>
                        {it.subtitle && (
                          <p className="text-xs truncate" style={{ color: "#7A8A7A" }}>
                            {it.subtitle}
                          </p>
                        )}
                      </div>
                      {isActive && (
                        <ArrowRight size={14} style={{ color: "#C9A84C", flexShrink: 0 }} />
                      )}
                    </Link>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer hints */}
        <div
          className="flex items-center justify-between px-4 py-2.5 text-[10px]"
          style={{ borderTop: "1px solid #2A4A35", color: "#7A8A7A" }}
        >
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded font-bold" style={{ background: "#132B1E", color: "#C9A84C", border: "1px solid #2A4A35" }}>↑↓</kbd>
              naviguer
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded font-bold" style={{ background: "#132B1E", color: "#C9A84C", border: "1px solid #2A4A35" }}>↵</kbd>
              ouvrir
            </span>
          </span>
          <span className="flex items-center gap-1 font-medium" style={{ color: "#C9A84C" }}>
            <Command size={11} />
            <span>K</span>
          </span>
        </div>
      </div>
    </div>
  );
}
