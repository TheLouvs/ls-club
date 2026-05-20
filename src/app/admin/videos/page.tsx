"use client";

import { MEMBERS, MODULES, VIDEO_PROGRESS } from "@/lib/mock-admin";

function getCompletion(memberId: string, moduleId: string): number {
  const p = VIDEO_PROGRESS.find((v) => v.memberId === memberId && v.moduleId === moduleId);
  if (!p) return -1; // not started
  return Math.round((p.completedLessons / p.totalLessons) * 100);
}

function getCellStyle(pct: number): React.CSSProperties {
  if (pct < 0) return { background: "#132B1E", color: "#3A4A3A" };
  if (pct === 100) return { background: "#C9A84C", color: "#0F2318" };
  if (pct >= 60) return { background: "rgba(201,168,76,0.4)", color: "#F5F0E8" };
  if (pct >= 30) return { background: "rgba(201,168,76,0.2)", color: "#C9A84C" };
  if (pct > 0) return { background: "rgba(201,168,76,0.1)", color: "#7A8A7A" };
  return { background: "#132B1E", color: "#3A4A3A" };
}

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

// Grouper les modules par niveau
const modulesByLevel = {
  debutant: MODULES.filter((m) => m.level === "debutant"),
  intermediaire: MODULES.filter((m) => m.level === "intermediaire"),
  avance: MODULES.filter((m) => m.level === "avance"),
};

const activeMembers = MEMBERS.filter((m) => m.subscription === "active");

export default function VideosPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-bold" style={{ color: "#F5F0E8" }}>Progression vidéos</h1>
        <p className="text-sm mt-1" style={{ color: "#7A8A7A" }}>
          Avancement de chaque membre par module
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-xs font-semibold" style={{ color: "#7A8A7A" }}>Légende :</p>
        {[
          { label: "100%", style: { background: "#C9A84C", color: "#0F2318" } },
          { label: "60–99%", style: { background: "rgba(201,168,76,0.4)", color: "#F5F0E8" } },
          { label: "30–59%", style: { background: "rgba(201,168,76,0.2)", color: "#C9A84C" } },
          { label: "1–29%", style: { background: "rgba(201,168,76,0.1)", color: "#7A8A7A" } },
          { label: "Non commencé", style: { background: "#132B1E", color: "#3A4A3A", border: "1px solid #2A4A35" } },
        ].map(({ label, style }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded text-[9px] font-bold flex items-center justify-center" style={style}>%</div>
            <span className="text-xs" style={{ color: "#7A8A7A" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Tableau par niveau */}
      {(["debutant", "intermediaire", "avance"] as const).map((level) => {
        const modules = modulesByLevel[level];
        const levelStyle = LEVEL_COLORS[level];

        return (
          <div key={level} className="rounded-2xl overflow-hidden" style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}>
            {/* Level header */}
            <div className="px-5 py-3 flex items-center gap-3" style={{ background: "#132B1E", borderBottom: "1px solid #2A4A35" }}>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-lg"
                style={{ background: levelStyle.bg, color: levelStyle.text }}
              >
                {LEVEL_LABEL[level]}
              </span>
              <span className="text-xs" style={{ color: "#7A8A7A" }}>{modules.length} modules</span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid #2A4A35" }}>
                    <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wide w-44" style={{ color: "#7A8A7A" }}>
                      Module
                    </th>
                    {activeMembers.map((m) => (
                      <th key={m.id} className="px-2 py-3 text-[11px] font-bold text-center min-w-[52px]" style={{ color: "#F5F0E8" }}>
                        {m.initials}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-right" style={{ color: "#7A8A7A" }}>
                      Moy.
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map((mod, rowIdx) => {
                    const pcts = activeMembers.map((m) => getCompletion(m.id, mod.id));
                    const validPcts = pcts.filter((p) => p >= 0);
                    const avg = validPcts.length > 0 ? Math.round(validPcts.reduce((a, b) => a + b, 0) / validPcts.length) : 0;

                    return (
                      <tr key={mod.id} style={{ borderBottom: rowIdx < modules.length - 1 ? "1px solid #2A4A35" : "none" }}>
                        <td className="px-5 py-3">
                          <p className="text-sm font-medium" style={{ color: "#F5F0E8" }}>{mod.name}</p>
                          <p className="text-[11px]" style={{ color: "#7A8A7A" }}>{mod.totalLessons} leçons</p>
                        </td>
                        {activeMembers.map((m) => {
                          const pct = getCompletion(m.id, mod.id);
                          const cellStyle = getCellStyle(pct);
                          return (
                            <td key={m.id} className="px-2 py-3 text-center">
                              <div
                                className="mx-auto w-10 h-10 rounded-xl flex items-center justify-center text-[11px] font-bold"
                                style={cellStyle}
                              >
                                {pct < 0 ? "—" : `${pct}%`}
                              </div>
                            </td>
                          );
                        })}
                        <td className="px-4 py-3 text-right">
                          <span className="text-sm font-bold" style={{ color: avg >= 70 ? "#C9A84C" : avg >= 30 ? "#DFC060" : "#3A4A3A" }}>
                            {avg}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      {/* Members legend */}
      <div className="rounded-2xl p-4" style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}>
        <p className="text-xs font-semibold mb-3" style={{ color: "#7A8A7A" }}>Correspondance initiales</p>
        <div className="flex flex-wrap gap-3">
          {activeMembers.map((m) => (
            <div key={m.id} className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                style={{ background: m.avatarColor, color: "#0D1A09" }}
              >
                {m.initials}
              </div>
              <span className="text-xs" style={{ color: "#7A8A7A" }}>{m.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
