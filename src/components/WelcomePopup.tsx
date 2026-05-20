"use client";

import { useEffect, useState } from "react";
import { X, ChevronRight } from "lucide-react";
import { usePlayerProfile } from "@/lib/hooks/usePlayerProfile";

const STORAGE_KEY = "ls_welcome_done";

const POINTS_OPTIONS = ["Drive", "Putting", "Approche", "Bunker", "Short game", "Mental", "Règles"];
const FREQUENCE_OPTIONS = ["Moins d'1×/mois", "1×/mois", "2×/mois", "1×/semaine", "2-3×/semaine", "+3×/semaine"];

const selectStyle = {
  width: "100%",
  padding: "9px 12px",
  borderRadius: 10,
  border: "1px solid #2a4a1a",
  fontSize: 13,
  color: "#e8f0ea",
  background: "#0f1f0f",
  outline: "none",
} as const;

const inputStyle = {
  ...selectStyle,
};

export function WelcomePopup() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState<"video" | "questionnaire">("video");
  const { profile, updateProfile } = usePlayerProfile();
  const [draft, setDraft] = useState({ ...profile });

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setShow(true);
  }, []);

  useEffect(() => {
    setDraft({ ...profile });
  }, [profile]);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setShow(false);
  }

  function handleSubmit() {
    updateProfile(draft);
    dismiss();
  }

  function togglePoint(point: string) {
    setDraft((d) => ({
      ...d,
      pointsAmeliorer: d.pointsAmeliorer.includes(point)
        ? d.pointsAmeliorer.filter((p) => p !== point)
        : [...d.pointsAmeliorer, point],
    }));
  }

  if (!show) return null;

  const videoUrl = process.env.NEXT_PUBLIC_WELCOME_VIDEO_URL;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
      style={{ background: "rgba(0,0,0,0.88)" }}
    >
      <div
        className="w-full md:max-w-lg md:rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: "#0a1a0a",
          border: "1px solid #2a4a1a",
          maxHeight: "95dvh",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 flex-shrink-0">
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#4a8a2a" }}>
              Bienvenue
            </p>
            <h2 className="font-serif font-bold text-lg leading-tight" style={{ color: "#e8f0ea" }}>
              {step === "video" ? "Découvre LS Club" : "Ton profil golf"}
            </h2>
          </div>
          <button
            onClick={dismiss}
            className="w-8 h-8 flex items-center justify-center rounded-full"
            style={{ background: "#1a3a1a" }}
          >
            <X size={14} color="#7ab84a" />
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5 px-5 pb-3 flex-shrink-0">
          {(["video", "questionnaire"] as const).map((s) => (
            <div
              key={s}
              className="h-1 rounded-full transition-all"
              style={{
                width: step === s ? 20 : 8,
                background: step === s ? "#7ab84a" : "#2a4a1a",
              }}
            />
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          {step === "video" ? (
            <div className="px-5 pb-5">
              {/* Video */}
              <div
                className="w-full rounded-xl overflow-hidden mb-4 flex items-center justify-center"
                style={{ aspectRatio: "16/9", background: "#0f2a0f", border: "1px solid #1e3a1e" }}
              >
                {videoUrl ? (
                  videoUrl.includes("youtube") || videoUrl.includes("youtu.be") || videoUrl.includes("vimeo") ? (
                    <iframe
                      src={videoUrl}
                      className="w-full h-full"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                    />
                  ) : (
                    <video src={videoUrl} controls className="w-full h-full object-cover" />
                  )
                ) : (
                  <div className="flex flex-col items-center gap-2 opacity-40">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: "#1a3a1a", border: "1px solid #3a6a1a" }}
                    >
                      <ChevronRight size={20} color="#7ab84a" />
                    </div>
                    <p className="text-xs" style={{ color: "#4a6855" }}>Vidéo de présentation</p>
                  </div>
                )}
              </div>

              <p className="text-sm leading-relaxed mb-5" style={{ color: "#a0c080" }}>
                LS Club est ton coach golf digital. Analyse ton swing, pose tes questions à Lolo IA, et progresse à ton rythme avec des vidéos adaptées à ton niveau.
              </p>

              <button
                onClick={() => setStep("questionnaire")}
                className="w-full font-bold text-sm py-3 rounded-xl"
                style={{ background: "#3a6a1a", color: "#c0dd97" }}
              >
                Continuer — Personnalise ton expérience
              </button>
            </div>
          ) : (
            <div className="px-5 pb-5 space-y-4">
              {/* Niveau */}
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#7ab84a" }}>
                  Ton niveau de golf
                </label>
                <div className="flex gap-2">
                  {(["debutant", "intermediaire", "avance"] as const).map((n) => (
                    <button
                      key={n}
                      onClick={() => setDraft((d) => ({ ...d, niveau: n }))}
                      className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
                      style={{
                        background: draft.niveau === n ? "#3a6a1a" : "#0f1f0f",
                        color: draft.niveau === n ? "#c0dd97" : "#4a6855",
                        border: `1px solid ${draft.niveau === n ? "#3a6a1a" : "#1e3a1e"}`,
                      }}
                    >
                      {n === "debutant" ? "Débutant" : n === "intermediaire" ? "Inter." : "Avancé"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Points à améliorer */}
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#7ab84a" }}>
                  Ce que tu veux améliorer
                </label>
                <div className="flex flex-wrap gap-2">
                  {POINTS_OPTIONS.map((p) => {
                    const active = draft.pointsAmeliorer.includes(p);
                    return (
                      <button
                        key={p}
                        onClick={() => togglePoint(p)}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                        style={{
                          background: active ? "#3a6a1a" : "#0f1f0f",
                          color: active ? "#c0dd97" : "#4a6855",
                          border: `1px solid ${active ? "#3a6a1a" : "#1e3a1e"}`,
                        }}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fréquence */}
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#7ab84a" }}>
                  Fréquence de jeu
                </label>
                <select
                  value={draft.frequenceJeu ?? ""}
                  onChange={(e) => setDraft((d) => ({ ...d, frequenceJeu: e.target.value }))}
                  style={selectStyle}
                >
                  <option value="">Sélectionner…</option>
                  {FREQUENCE_OPTIONS.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              {/* Type de jeu */}
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#7ab84a" }}>
                  Type de jeu
                </label>
                <div className="flex gap-2">
                  {(["loisir", "competition"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setDraft((d) => ({ ...d, typeJeu: t }))}
                      className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
                      style={{
                        background: draft.typeJeu === t ? "#3a6a1a" : "#0f1f0f",
                        color: draft.typeJeu === t ? "#c0dd97" : "#4a6855",
                        border: `1px solid ${draft.typeJeu === t ? "#3a6a1a" : "#1e3a1e"}`,
                      }}
                    >
                      {t === "loisir" ? "Loisir" : "Compétition"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Club de golf */}
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#7ab84a" }}>
                  Ton club de golf <span style={{ color: "#2a4a1a" }}>(optionnel)</span>
                </label>
                <input
                  type="text"
                  value={draft.clubGolf ?? ""}
                  onChange={(e) => setDraft((d) => ({ ...d, clubGolf: e.target.value }))}
                  placeholder="ex. Golf de Bordeaux"
                  style={inputStyle}
                />
              </div>

              {/* Blessures */}
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#7ab84a" }}>
                  Blessures / restrictions <span style={{ color: "#2a4a1a" }}>(optionnel)</span>
                </label>
                <input
                  type="text"
                  value={draft.blessure ?? ""}
                  onChange={(e) => setDraft((d) => ({ ...d, blessure: e.target.value }))}
                  placeholder="ex. Dos, épaule droite…"
                  style={inputStyle}
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full font-bold text-sm py-3 rounded-xl mt-2"
                style={{ background: "#3a6a1a", color: "#c0dd97" }}
              >
                C&apos;est parti !
              </button>

              <button
                onClick={() => setStep("video")}
                className="w-full text-xs py-2"
                style={{ color: "#4a6855" }}
              >
                ← Retour
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
