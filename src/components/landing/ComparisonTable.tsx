import { Check, X } from "lucide-react";

type Cell = string | boolean;

const headers = ["LS Club", "Coach particulier", "YouTube", "Apps golf classiques"];

const rows: { label: string; cells: Cell[] }[] = [
  { label: "Prix mensuel", cells: ["19€", "≈ 280€", "Gratuit", "10–25€"] },
  { label: "Méthode structurée", cells: [true, true, false, false] },
  { label: "IA personnalisée", cells: [true, false, false, false] },
  { label: "Reconnaissance de parcours", cells: [true, false, false, false] },
  { label: "Communauté active", cells: [true, false, false, false] },
  { label: "Disponibilité 24h/24", cells: [true, false, true, true] },
  { label: "Analyse vidéo de swing", cells: [true, true, false, false] },
  { label: "Historique IA & sessions", cells: [true, false, false, false] },
];

function CellContent({ value, highlight }: { value: Cell; highlight: boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check size={16} style={{ color: highlight ? "#C9A84C" : "#4A6A50", margin: "0 auto" }} />
    ) : (
      <X size={16} style={{ color: "#3A4A3A", margin: "0 auto" }} />
    );
  }
  return (
    <span
      style={{
        fontWeight: highlight ? 700 : 500,
        color: highlight ? "#C9A84C" : "#7A8A7A",
        fontSize: 12,
      }}
    >
      {value}
    </span>
  );
}

export function ComparisonTable() {
  return (
    <section className="px-5 py-12 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#7A8A7A" }}>
          Pourquoi LS Club
        </p>
        <h2 className="font-serif font-bold text-2xl md:text-3xl" style={{ color: "#F5F0E8" }}>
          Compare et tu verras
        </h2>
      </div>

      {/* Desktop / tablet table */}
      <div className="hidden md:block">
        <div
          className="overflow-hidden"
          style={{
            background: "#1B3A2A",
            border: "1px solid #2A4A35",
            borderRadius: 16,
            padding: 0,
          }}
        >
          <table className="w-full" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ padding: "14px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#7A8A7A", textTransform: "uppercase", letterSpacing: 1 }}>
                  &nbsp;
                </th>
                {headers.map((h, i) => (
                  <th
                    key={h}
                    style={{
                      padding: "14px 12px",
                      textAlign: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      color: i === 0 ? "#C9A84C" : "#7A8A7A",
                      background: i === 0 ? "rgba(201,168,76,0.1)" : "transparent",
                      borderTopLeftRadius: i === 0 ? 12 : 0,
                      borderTopRightRadius: i === 0 ? 12 : 0,
                    }}
                  >
                    {i === 0 ? (
                      <span className="flex flex-col items-center gap-1">
                        <span>{h}</span>
                        <span
                          style={{
                            fontSize: 9,
                            fontWeight: 800,
                            background: "#C9A84C",
                            color: "#0F2318",
                            borderRadius: 20,
                            padding: "2px 7px",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                          }}
                        >
                          Meilleur choix
                        </span>
                      </span>
                    ) : h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ label, cells }, rIdx) => (
                <tr key={label} style={{ borderTop: "1px solid #2A4A35" }}>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#F5F0E8",
                    }}
                  >
                    {label}
                  </td>
                  {cells.map((cell, i) => (
                    <td
                      key={i}
                      style={{
                        padding: "12px 8px",
                        textAlign: "center",
                        background: i === 0 ? "rgba(201,168,76,0.05)" : "transparent",
                        borderBottomLeftRadius: i === 0 && rIdx === rows.length - 1 ? 12 : 0,
                        borderBottomRightRadius: i === 0 && rIdx === rows.length - 1 ? 12 : 0,
                      }}
                    >
                      <CellContent value={cell} highlight={i === 0} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-2.5">
        {rows.map(({ label, cells }) => (
          <div
            key={label}
            className="p-4"
            style={{
              background: "#1B3A2A",
              border: "1px solid #2A4A35",
              borderRadius: 12,
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-2.5" style={{ color: "#7A8A7A" }}>
              {label}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {headers.map((h, i) => (
                <div
                  key={h}
                  className="flex items-center justify-between gap-2"
                  style={{
                    background: i === 0 ? "rgba(201,168,76,0.1)" : "rgba(245,240,232,0.04)",
                    borderRadius: 8,
                    padding: "6px 10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: i === 0 ? 700 : 600,
                      color: i === 0 ? "#C9A84C" : "#7A8A7A",
                      lineHeight: 1.2,
                    }}
                  >
                    {h}
                  </span>
                  <CellContent value={cells[i]} highlight={i === 0} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
