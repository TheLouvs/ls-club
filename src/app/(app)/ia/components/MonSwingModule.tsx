"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Camera, Upload, X, RotateCcw, ChevronRight, Play } from "lucide-react";
import { type PlayerProfile, type SwingAnalysis, MOCK_SWING_HISTORY } from "../data";

type View = "list" | "detail" | "upload";

const MOCK_ANALYSE_RESPONSES = [
  "**Points positifs**\n\nVotre posture générale est correcte — la flexion des genoux est appropriée et le dos bien incliné. La largeur d'appui semble adaptée au club utilisé.\n\n**Points à corriger**\n\n1. **Grip** — La main droite semble légèrement trop sous le club. Tournez-la légèrement vers la gauche pour un grip plus neutre.\n\n2. **Alignement des épaules** — Elles paraissent ouvertes d'environ 5° par rapport à la cible. Alignez-les parallèlement à la ligne de jeu.\n\n3. **Position de la tête** — Elle est légèrement trop haute. Laissez-la descendre naturellement jusqu'à ce que vous voyiez la balle dans le bas de votre champ de vision.\n\n**Exercices conseillés**\n\n• Drill du miroir : filmez-vous de face et comparez votre alignement d'épaules avec une ligne tracée sur l'écran.\n• Posez un club au sol pour matérialiser la ligne cible lors de vos entraînements.",
];

export default function MonSwingModule({ profile }: { profile: PlayerProfile }) {
  const [view, setView] = useState<View>("list");
  const [selectedAnalysis, setSelectedAnalysis] = useState<SwingAnalysis | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [context, setContext] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [result]);

  function handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  }

  async function analyse() {
    if (!imagePreview || loading) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setResult(MOCK_ANALYSE_RESPONSES[0]);
    setLoading(false);
  }

  function resetUpload() {
    setImagePreview(null);
    setContext("");
    setResult(null);
  }

  // ── Vue liste ──────────────────────────────────────────────────────────────

  if (view === "list") return (
    <div className="flex-1 overflow-y-auto px-4 py-5">
      {/* CTA nouvelle analyse */}
      <button
        onClick={() => setView("upload")}
        className="w-full flex items-center justify-between px-4 py-4 rounded-2xl mb-6"
        style={{ background: "linear-gradient(135deg, #1a3d22, #0d2414)", border: "1px solid #2d6640" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.25)" }}>
            <Camera size={17} style={{ color: "#c9a84c" }} />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold" style={{ color: "#e8f0ea" }}>Nouvelle analyse</p>
            <p className="text-xs mt-0.5" style={{ color: "#4a6855" }}>Upload ou photo directe</p>
          </div>
        </div>
        <ChevronRight size={16} style={{ color: "#2d6640" }} />
      </button>

      {/* Historique */}
      <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#4a6855" }}>
        Analyses récentes
      </p>

      <div className="flex flex-col gap-3">
        {MOCK_SWING_HISTORY.map((analysis) => (
          <button
            key={analysis.id}
            onClick={() => { setSelectedAnalysis(analysis); setView("detail"); }}
            className="flex items-center gap-4 p-4 rounded-2xl text-left transition-all"
            style={{ background: "linear-gradient(135deg, #0d1e10, #0a160c)", border: "1px solid #162a1c" }}
          >
            {/* Gradient thumbnail */}
            <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: analysis.gradient }}>
              <Play size={18} fill="#c9a84c" style={{ color: "#c9a84c" }} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-bold tracking-wide" style={{ color: "#c9a84c" }}>
                  {analysis.type}
                </span>
                <span className="text-xs" style={{ color: "#2d4a35" }}>·</span>
                <span className="text-xs" style={{ color: "#4a6855" }}>{analysis.date}</span>
              </div>
              <p className="text-sm font-medium truncate" style={{ color: "#e8f0ea" }}>{analysis.summary}</p>
              <p className="text-xs mt-1" style={{ color: "#2d6640" }}>Voir l'analyse complète →</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // ── Vue détail ─────────────────────────────────────────────────────────────

  if (view === "detail" && selectedAnalysis) return (
    <div className="flex-1 overflow-y-auto px-4 py-5">
      <button onClick={() => { setView("list"); setSelectedAnalysis(null); }}
        className="flex items-center gap-1.5 text-xs font-semibold mb-4"
        style={{ color: "#4a6855" }}>
        ← Retour aux analyses
      </button>

      {/* Thumbnail */}
      <div className="w-full h-40 rounded-2xl mb-4 flex items-center justify-center"
        style={{ background: selectedAnalysis.gradient }}>
        <div className="text-center">
          <p className="font-serif font-bold text-lg" style={{ color: "#e8f0ea" }}>{selectedAnalysis.type}</p>
          <p className="text-xs mt-1" style={{ color: "rgba(232,240,234,0.6)" }}>{selectedAnalysis.date}</p>
        </div>
      </div>

      {/* Analyse */}
      <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg, #0d1e10, #0a160c)", border: "1px solid #162a1c" }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #1a3d22, #2d6640)" }}>
            <Bot size={13} style={{ color: "#c9a84c" }} />
          </div>
          <span className="text-xs font-semibold" style={{ color: "#5aad75" }}>Analyse Lolo IA</span>
        </div>
        <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "#e8f0ea" }}>
          {selectedAnalysis.fullAnalysis}
        </p>
      </div>
    </div>
  );

  // ── Vue upload ─────────────────────────────────────────────────────────────

  return (
    <div className="flex-1 overflow-y-auto px-4 py-5">
      <button onClick={() => { setView("list"); resetUpload(); }}
        className="flex items-center gap-1.5 text-xs font-semibold mb-4"
        style={{ color: "#4a6855" }}>
        ← Retour
      </button>

      {!imagePreview ? (
        <div>
          <p className="text-sm mb-1" style={{ color: "#e8f0ea" }}>
            Envoie une photo de ton swing, ta posture ou ton grip.
          </p>
          <p className="text-xs mb-6" style={{ color: "#4a6855" }}>
            Lolo IA analysera ta technique en détail.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <button onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center gap-3 py-8 rounded-2xl"
              style={{ background: "#0a160c", border: "1px dashed #254a30" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(90,173,117,0.12)", border: "1px solid rgba(90,173,117,0.2)" }}>
                <Upload size={18} style={{ color: "#5aad75" }} />
              </div>
              <span className="text-xs font-semibold" style={{ color: "#8aab92" }}>Uploader</span>
            </button>

            <button onClick={() => cameraInputRef.current?.click()}
              className="flex flex-col items-center gap-3 py-8 rounded-2xl"
              style={{ background: "#0a160c", border: "1px dashed #254a30" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(90,173,117,0.12)", border: "1px solid rgba(90,173,117,0.2)" }}>
                <Camera size={18} style={{ color: "#5aad75" }} />
              </div>
              <span className="text-xs font-semibold" style={{ color: "#8aab92" }}>Prendre une photo</span>
            </button>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
          <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />

          <div className="rounded-xl p-4" style={{ background: "#0a160c", border: "1px solid #162a1c" }}>
            <p className="text-xs font-semibold mb-2" style={{ color: "#4a6855" }}>Conseils photo</p>
            {["Corps entier visible dans le cadre", "De face ou de côté", "Bonne luminosité"].map((tip) => (
              <p key={tip} className="text-xs mb-1 flex items-center gap-2" style={{ color: "#4a6855" }}>
                <span style={{ color: "#c9a84c" }}>·</span> {tip}
              </p>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {/* Preview */}
          <div className="relative rounded-2xl overflow-hidden mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imagePreview} alt="Swing" className="w-full object-cover max-h-64" />
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center"
                style={{ background: "rgba(7,16,9,0.75)" }}>
                <div className="text-center">
                  <div className="flex gap-1.5 justify-center mb-2">
                    {[0, 150, 300].map((d) => (
                      <span key={d} className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{ background: "#c9a84c", animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                  <p className="text-xs font-semibold" style={{ color: "#c9a84c" }}>Analyse en cours…</p>
                </div>
              </div>
            )}
            <button onClick={resetUpload}
              className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(7,16,9,0.85)", border: "1px solid #254a30" }}>
              <X size={13} style={{ color: "#e8f0ea" }} />
            </button>
          </div>

          {!result && !loading && (
            <>
              <textarea value={context} onChange={(e) => setContext(e.target.value)}
                placeholder="Optionnel — décris ce que tu veux analyser..."
                rows={2}
                className="w-full bg-transparent text-sm outline-none resize-none rounded-xl px-4 py-3 mb-3"
                style={{ background: "#0d1e10", border: "1px solid #162a1c", color: "#e8f0ea" }} />
              <button onClick={analyse}
                className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #1a3d22, #2d6640)", color: "#e8f0ea" }}>
                Analyser avec Lolo IA
              </button>
            </>
          )}

          {result && (
            <>
              <div className="rounded-2xl p-4 mb-3"
                style={{ background: "linear-gradient(135deg, #0d1e10, #0a160c)", border: "1px solid #162a1c" }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #1a3d22, #2d6640)" }}>
                    <Bot size={13} style={{ color: "#c9a84c" }} />
                  </div>
                  <span className="text-xs font-semibold" style={{ color: "#5aad75" }}>Analyse Lolo IA</span>
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "#e8f0ea" }}>{result}</p>
              </div>
              <button onClick={resetUpload}
                className="w-full py-2.5 rounded-xl text-sm flex items-center justify-center gap-2"
                style={{ background: "#0a160c", border: "1px solid #162a1c", color: "#4a6855" }}>
                <RotateCcw size={13} /> Nouvelle analyse
              </button>
            </>
          )}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}
