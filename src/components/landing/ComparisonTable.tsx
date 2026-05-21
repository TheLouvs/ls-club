import { Check, X } from "lucide-react";

type Cell = string | boolean;

const headers = ["LS Club", "Coach particulier", "YouTube", "Apps golf"];

const features: { label: string; cells: Cell[] }[] = [
  { label: "Méthode structurée",          cells: [true,  true,  false, false] },
  { label: "IA personnalisée",             cells: [true,  false, false, false] },
  { label: "Reconnaissance de parcours",  cells: [true,  false, false, false] },
  { label: "Communauté active",           cells: [true,  false, false, false] },
  { label: "Disponibilité 24h/24",        cells: [true,  false, true,  true]  },
  { label: "Analyse vidéo de swing",      cells: [true,  true,  false, false] },
  { label: "Historique IA & sessions",    cells: [true,  false, false, false] },
];

const prices = ["19€/mois", "≈ 280€/mois", "Gratuit", "10–25€/mois"];

// Score = nb of true cells per competitor (excluding LS Club)
const competitorScores = [1, 2, 3].map((col) =>
  features.filter((r) => r.cells[col] === true).length
);

function CheckIcon({ on, highlight }: { on: boolean; highlight?: boolean }) {
  if (on) return <Check size={15} style={{ color: highlight ? "#C9A84C" : "#4A8A58", flexShrink: 0 }} />;
  return <X size={15} style={{ color: "#2A3A2A", flexShrink: 0 }} />;
}

export function ComparisonTable() {
  return (
    <section className="px-5 py-8 md:py-12 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#7A8A7A" }}>
          Pourquoi LS Club
        </p>
        <h2 className="font-serif font-bold text-2xl md:text-3xl" style={{ color: "#F5F0E8" }}>
          Compare et tu verras
        </h2>
      </div>

      {/* ── DESKTOP TABLE ─────────────────────────────────── */}
      <div className="hidden md:block overflow-hidden" style={{ background: "#1B3A2A", border: "1px solid #2A4A35", borderRadius: 16 }}>
        <table className="w-full" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ padding: "16px 18px", width: "38%", textAlign: "left" }}>&nbsp;</th>
              {headers.map((h, i) => (
                <th
                  key={h}
                  style={{
                    padding: "16px 12px",
                    textAlign: "center",
                    background: i === 0 ? "rgba(201,168,76,0.12)" : "transparent",
                    borderBottom: i === 0 ? "2px solid rgba(201,168,76,0.4)" : "1px solid #2A4A35",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    {i === 0 && (
                      <span style={{ fontSize: 8, fontWeight: 800, background: "#C9A84C", color: "#0F2318", borderRadius: 20, padding: "2px 8px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        Meilleur choix
                      </span>
                    )}
                    <span style={{ fontSize: 12, fontWeight: 700, color: i === 0 ? "#C9A84C" : "#7A8A7A" }}>{h}</span>
                    <span style={{ fontSize: 11, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? "#DFC060" : "#4A5A4A" }}>{prices[i]}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map(({ label, cells }) => (
              <tr key={label} style={{ borderTop: "1px solid #2A4A35" }}>
                <td style={{ padding: "11px 18px", fontSize: 13, fontWeight: 500, color: "#F5F0E8" }}>{label}</td>
                {cells.map((cell, i) => (
                  <td key={i} style={{ padding: "11px 8px", textAlign: "center", background: i === 0 ? "rgba(201,168,76,0.05)" : "transparent" }}>
                    {typeof cell === "boolean" ? (
                      <CheckIcon on={cell} highlight={i === 0} />
                    ) : (
                      <span style={{ fontSize: 12, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? "#C9A84C" : "#7A8A7A" }}>{cell}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── MOBILE LAYOUT ─────────────────────────────────── */}
      <div className="md:hidden space-y-4">

        {/* LS Club — full feature card */}
        <div style={{ background: "#1B3A2A", border: "2px solid #C9A84C", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ background: "rgba(201,168,76,0.12)", padding: "12px 16px", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <span style={{ fontSize: 8, fontWeight: 800, background: "#C9A84C", color: "#0F2318", borderRadius: 20, padding: "2px 8px", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
                  Meilleur choix
                </span>
                <p style={{ fontSize: 17, fontWeight: 800, color: "#C9A84C", margin: "4px 0 0" }}>LS Club</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 22, fontWeight: 800, color: "#C9A84C", margin: 0, lineHeight: 1 }}>19€</p>
                <p style={{ fontSize: 11, color: "#7A8A7A", margin: 0 }}>/mois</p>
              </div>
            </div>
          </div>
          <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
            {features.map(({ label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(201,168,76,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Check size={12} style={{ color: "#C9A84C" }} />
                </div>
                <span style={{ fontSize: 13, color: "#F5F0E8", fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* "vs" separator */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1, height: 1, background: "#2A4A35" }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: "#4A5A4A", letterSpacing: 1, textTransform: "uppercase" as const }}>vs les alternatives</span>
          <div style={{ flex: 1, height: 1, background: "#2A4A35" }} />
        </div>

        {/* Competitors — 3 compact cards in a row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {[1, 2, 3].map((col) => {
            const score = competitorScores[col - 1];
            return (
              <div
                key={col}
                style={{ background: "#132B1E", border: "1px solid #2A4A35", borderRadius: 12, padding: "10px 10px", display: "flex", flexDirection: "column", gap: 6 }}
              >
                <p style={{ fontSize: 10, fontWeight: 700, color: "#7A8A7A", margin: 0, lineHeight: 1.2 }}>{headers[col]}</p>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#4A5A4A", margin: 0 }}>{prices[col]}</p>
                <div style={{ height: 1, background: "#2A4A35" }} />
                {/* Score bar */}
                <div>
                  <p style={{ fontSize: 9, color: "#4A6A50", margin: "0 0 3px", fontWeight: 600 }}>{score}/{features.length} fonct.</p>
                  <div style={{ height: 4, background: "#1B3A2A", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ width: `${(score / features.length) * 100}%`, height: "100%", background: "#3A6A40", borderRadius: 2 }} />
                  </div>
                </div>
                {/* Feature list */}
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {features.map(({ label, cells }) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      {cells[col] ? (
                        <Check size={10} style={{ color: "#4A8A58", flexShrink: 0 }} />
                      ) : (
                        <X size={10} style={{ color: "#2A3A2A", flexShrink: 0 }} />
                      )}
                      <span style={{ fontSize: 9, color: cells[col] ? "#7A9A80" : "#3A4A3A", lineHeight: 1.3 }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
