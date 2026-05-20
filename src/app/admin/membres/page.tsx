"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Flame, ChevronRight } from "lucide-react";
import { MEMBERS } from "@/lib/mock-admin";

const LEVEL_LABEL: Record<string, string> = {
  debutant: "Débutant",
  intermediaire: "Intermédiaire",
  avance: "Avancé",
};

const LEVEL_COLORS: Record<string, { bg: string; text: string }> = {
  debutant: { bg: "rgba(74,191,74,0.12)", text: "#7ACCA0" },
  intermediaire: { bg: "rgba(201,168,76,0.12)", text: "#C9A84C" },
  avance: { bg: "rgba(74,124,191,0.12)", text: "#7AAEE8" },
};

export default function MembresPage() {
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState<"all" | "debutant" | "intermediaire" | "avance">("all");
  const [filterSub, setFilterSub] = useState<"all" | "active" | "inactive">("all");

  const filtered = MEMBERS.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase());
    const matchLevel = filterLevel === "all" || m.level === filterLevel;
    const matchSub = filterSub === "all" || m.subscription === filterSub;
    return matchSearch && matchLevel && matchSub;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-bold" style={{ color: "#F5F0E8" }}>Membres</h1>
        <p className="text-sm mt-1" style={{ color: "#7A8A7A" }}>
          {MEMBERS.length} membres au total · {MEMBERS.filter((m) => m.subscription === "active").length} actifs
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {/* Search */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 min-w-48"
          style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}
        >
          <Search size={14} style={{ color: "#7A8A7A" }} />
          <input
            type="text"
            placeholder="Rechercher un membre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm bg-transparent outline-none"
            style={{ color: "#F5F0E8" }}
          />
        </div>

        {/* Level filter */}
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}>
          {(["all", "debutant", "intermediaire", "avance"] as const).map((level) => (
            <button
              key={level}
              onClick={() => setFilterLevel(level)}
              className="px-3 py-1 rounded-lg text-xs font-medium transition-all"
              style={
                filterLevel === level
                  ? { background: "#C9A84C", color: "#0F2318" }
                  : { color: "#7A8A7A" }
              }
            >
              {level === "all" ? "Tous niveaux" : LEVEL_LABEL[level]}
            </button>
          ))}
        </div>

        {/* Sub filter */}
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}>
          {(["all", "active", "inactive"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterSub(s)}
              className="px-3 py-1 rounded-lg text-xs font-medium transition-all"
              style={
                filterSub === s
                  ? { background: "#C9A84C", color: "#0F2318" }
                  : { color: "#7A8A7A" }
              }
            >
              {s === "all" ? "Tous" : s === "active" ? "Actifs" : "Inactifs"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}>
        {/* Table header */}
        <div
          className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 text-[11px] font-semibold tracking-wide uppercase"
          style={{ background: "#132B1E", borderBottom: "1px solid #2A4A35", color: "#7A8A7A" }}
        >
          <span>Membre</span>
          <span>Niveau</span>
          <span>Abonnement</span>
          <span>Dernière connexion</span>
          <span>Vidéos vues</span>
          <span>Streak</span>
          <span></span>
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-sm" style={{ color: "#7A8A7A" }}>
            Aucun membre trouvé
          </div>
        ) : (
          filtered.map((member, idx) => {
            const levelStyle = LEVEL_COLORS[member.level];
            const lastActive = new Date(member.lastActive).toLocaleDateString("fr-FR", {
              day: "numeric", month: "short",
            });
            return (
              <Link
                key={member.id}
                href={`/admin/membres/${member.id}`}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 items-center px-5 py-3.5 transition-colors"
                style={{ borderBottom: idx < filtered.length - 1 ? "1px solid #2A4A35" : "none" }}
              >
                {/* Membre */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                    style={{ background: member.avatarColor, color: "#0D1A09" }}
                  >
                    {member.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "#F5F0E8" }}>{member.name}</p>
                    <p className="text-[11px] truncate" style={{ color: "#7A8A7A" }}>{member.email}</p>
                  </div>
                </div>

                {/* Niveau */}
                <span
                  className="text-[11px] font-medium px-2 py-1 rounded-lg w-fit"
                  style={{ background: levelStyle.bg, color: levelStyle.text }}
                >
                  {LEVEL_LABEL[member.level]}
                </span>

                {/* Abonnement */}
                <span
                  className="text-[11px] font-medium px-2 py-1 rounded-lg w-fit"
                  style={
                    member.subscription === "active"
                      ? { background: "rgba(201,168,76,0.12)", color: "#C9A84C" }
                      : { background: "rgba(192,64,64,0.12)", color: "#E05050" }
                  }
                >
                  {member.subscription === "active" ? "Actif" : "Inactif"}
                </span>

                {/* Dernière connexion */}
                <span className="text-sm" style={{ color: "#7A8A7A" }}>{lastActive}</span>

                {/* Vidéos */}
                <span className="text-sm font-semibold" style={{ color: "#F5F0E8" }}>
                  {member.totalVideosWatched}
                </span>

                {/* Streak */}
                <div className="flex items-center gap-1">
                  {member.streak > 0 ? (
                    <>
                      <Flame size={13} style={{ color: "#E05050" }} />
                      <span className="text-sm font-semibold" style={{ color: "#F5F0E8" }}>{member.streak}j</span>
                    </>
                  ) : (
                    <span className="text-sm" style={{ color: "#3A4A3A" }}>—</span>
                  )}
                </div>

                {/* Arrow */}
                <ChevronRight size={15} style={{ color: "#3A4A3A" }} />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
