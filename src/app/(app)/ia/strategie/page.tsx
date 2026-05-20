"use client";

import { useState } from "react";
import { MessageCircle, Map, ArrowRight } from "lucide-react";
import IAHeader from "../components/IAHeader";
import StrategieModule from "../components/StrategieModule";
import ReconnaissanceModule from "../components/ReconnaissanceModule";
import { MOCK_PROFILE } from "../data";

type Mode = null | "discussion" | "reconnaissance";

export default function StrategiePage() {
  const [mode, setMode] = useState<Mode>(null);

  return (
    <div className="flex flex-col h-full" style={{ background: "#071009" }}>
      <IAHeader mode="strategie" />

      {/* Hub */}
      {mode === null && (
        <div className="flex-1 overflow-y-auto px-5 py-6">

          <div className="mb-8">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: "#2d6640" }}>
              Lolo IA · Stratégie
            </p>
            <h1 className="font-serif text-2xl font-bold leading-tight" style={{ color: "#e8f0ea" }}>
              Préparez votre jeu
            </h1>
            <p className="text-sm mt-1" style={{ color: "#4a6855" }}>
              Choisissez un mode pour travailler votre stratégie.
            </p>
          </div>

          <div className="flex flex-col gap-4">

            {/* Card Discussion */}
            <button
              onClick={() => setMode("discussion")}
              className="group relative overflow-hidden rounded-3xl text-left transition-all duration-300 hover:scale-[1.01]"
              style={{
                background: "linear-gradient(145deg, #0c1f0e 0%, #071009 100%)",
                border: "1px solid rgba(90,173,117,0.2)",
                boxShadow: "0 0 40px rgba(45,102,64,0.08)",
              }}
            >
              {/* Accent glow */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{ background: "#5aad75", transform: "translate(30%,-30%)" }}
              />

              <div className="relative p-5">
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(90,173,117,0.15), rgba(90,173,117,0.05))",
                      border: "1px solid rgba(90,173,117,0.25)",
                    }}
                  >
                    <MessageCircle size={22} style={{ color: "#5aad75" }} />
                  </div>

                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1"
                    style={{ background: "rgba(90,173,117,0.1)", border: "1px solid rgba(90,173,117,0.2)" }}
                  >
                    <ArrowRight size={14} style={{ color: "#5aad75" }} />
                  </div>
                </div>

                {/* Text */}
                <h2 className="font-serif text-xl font-bold mb-1" style={{ color: "#e8f0ea" }}>
                  Discussion stratégie
                </h2>
                <p className="text-xs font-semibold tracking-wide mb-3" style={{ color: "#5aad75" }}>
                  Chat libre avec Lolo IA
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#3d6648" }}>
                  Posez vos questions sur la gestion du score, le choix des clubs, le jeu par vent ou le mental en compétition.
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {["Stableford", "Choix de clubs", "Mental", "Vent"].map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(90,173,117,0.08)", color: "#4a6855", border: "1px solid rgba(90,173,117,0.12)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </button>

            {/* Card Reconaissance */}
            <button
              onClick={() => setMode("reconnaissance")}
              className="group relative overflow-hidden rounded-3xl text-left transition-all duration-300 hover:scale-[1.01]"
              style={{
                background: "linear-gradient(145deg, #081319 0%, #040c12 100%)",
                border: "1px solid rgba(106,176,217,0.2)",
                boxShadow: "0 0 40px rgba(106,176,217,0.05)",
              }}
            >
              {/* Accent glow */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-15 blur-3xl pointer-events-none"
                style={{ background: "#6ab0d9", transform: "translate(30%,-30%)" }}
              />

              {/* Terrain texture accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-24 opacity-[0.03] pointer-events-none"
                style={{
                  background: "repeating-linear-gradient(45deg, #6ab0d9 0px, #6ab0d9 1px, transparent 1px, transparent 8px)",
                }}
              />

              <div className="relative p-5">
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(106,176,217,0.15), rgba(106,176,217,0.05))",
                      border: "1px solid rgba(106,176,217,0.25)",
                    }}
                  >
                    <Map size={22} style={{ color: "#6ab0d9" }} />
                  </div>

                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1"
                    style={{ background: "rgba(106,176,217,0.1)", border: "1px solid rgba(106,176,217,0.2)" }}
                  >
                    <ArrowRight size={14} style={{ color: "#6ab0d9" }} />
                  </div>
                </div>

                {/* Text */}
                <h2 className="font-serif text-xl font-bold mb-1" style={{ color: "#e8f0ea" }}>
                  Reconaissance
                </h2>
                <p className="text-xs font-semibold tracking-wide mb-3" style={{ color: "#6ab0d9" }}>
                  Préparer son parcours trou par trou
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#2d4a5a" }}>
                  Visualisez chaque trou, regardez les flyovers et préparez votre stratégie avec Lolo IA avant d'arriver sur le parcours.
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {["Trou par trou", "Flyovergreen", "Notes", "Préparation"].map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(106,176,217,0.08)", color: "#3a6a8a", border: "1px solid rgba(106,176,217,0.12)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </button>

          </div>
        </div>
      )}

      {/* Mode Discussion */}
      {mode === "discussion" && (
        <>
          <div
            className="px-5 py-2.5 flex items-center gap-2.5 flex-shrink-0"
            style={{ borderBottom: "1px solid #0f1a10", background: "#071009" }}
          >
            <button
              onClick={() => setMode(null)}
              className="text-xs font-medium flex items-center gap-1.5 transition-opacity hover:opacity-70"
              style={{ color: "#4a6855" }}
            >
              <span style={{ fontSize: 14 }}>←</span> Stratégie
            </button>
            <span style={{ color: "#1a2e1c" }}>·</span>
            <span className="text-xs font-semibold" style={{ color: "#e8f0ea" }}>Discussion</span>
          </div>
          <StrategieModule profile={MOCK_PROFILE} />
        </>
      )}

      {/* Mode Reconaissance */}
      {mode === "reconnaissance" && (
        <>
          <div
            className="px-5 py-2.5 flex items-center gap-2.5 flex-shrink-0"
            style={{ borderBottom: "1px solid #0f1a10", background: "#071009" }}
          >
            <button
              onClick={() => setMode(null)}
              className="text-xs font-medium flex items-center gap-1.5 transition-opacity hover:opacity-70"
              style={{ color: "#4a6855" }}
            >
              <span style={{ fontSize: 14 }}>←</span> Stratégie
            </button>
            <span style={{ color: "#1a2e1c" }}>·</span>
            <span className="text-xs font-semibold" style={{ color: "#e8f0ea" }}>Reconaissance</span>
          </div>
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            <ReconnaissanceModule profile={MOCK_PROFILE} />
          </div>
        </>
      )}
    </div>
  );
}
