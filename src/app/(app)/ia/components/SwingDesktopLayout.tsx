"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Play, Pause, Maximize2, ArrowUp, Camera, Video } from "lucide-react";
import { MOCK_PROFILE } from "../data";

/* ─── Types ──────────────────────────────────────────────────── */

type Level = "debutant" | "intermediaire" | "avance";

type Media = { url: string; type: "image" | "video"; file: File } | null;

type Metric = { score: number; verdict: string };

type Analysis = {
  globalScore: number;
  clubType: string;
  date: string;
  metrics: { posture: Metric; rotation: Metric; impact: Metric; suivi: Metric };
};

type Message = {
  role: "assistant" | "user";
  content: string;
  showScorecard?: boolean;
};

/* ─── Constants ──────────────────────────────────────────────── */

const LEVELS: Level[] = ["debutant", "intermediaire", "avance"];

const LEVEL_LABELS: Record<Level, string> = {
  debutant: "Débutant",
  intermediaire: "Intermédiaire",
  avance: "Avancé",
};

const LEVEL_COLORS: Record<Level, string> = {
  debutant: "#6ab0d9",
  intermediaire: "#c9a84c",
  avance: "#c26ad9",
};

const METRIC_KEYS = ["posture", "rotation", "impact", "suivi"] as const;

const METRIC_LABELS: Record<typeof METRIC_KEYS[number], string> = {
  posture: "Posture",
  rotation: "Rotation",
  impact: "Impact",
  suivi: "Suivi",
};

const CHIPS = ["Mon putting", "Exercice complet", "Comparer mes swings", "Préparer un tournoi"];

/* ─── Markdown renderer ──────────────────────────────────────── */

function renderMarkdown(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} style={{ color: "#7ab84a" }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part.split("\n").map((line, j) => (
      <span key={`${i}-${j}`}>
        {j > 0 && <br />}
        {line}
      </span>
    ));
  });
}

/* ─── Component ──────────────────────────────────────────────── */

export default function SwingDesktopLayout() {
  const [media, setMedia] = useState<Media>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [level, setLevel] = useState<Level>(MOCK_PROFILE.niveau as Level);
  const [inputValue, setInputValue] = useState("");
  const [showChips, setShowChips] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [hoveredChip, setHoveredChip] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  /* ── File handling ── */

  function handleFile(file: File) {
    const isVideo = file.type.startsWith("video/");
    const url = URL.createObjectURL(file);
    setMedia({ url, type: isVideo ? "video" : "image", file });
    setAnalysis(null);
    setMessages([]);
    setShowChips(true);
    setIsPlaying(false);
    setVideoCurrentTime(0);
    setVideoDuration(0);
    analyzeFile(file);
  }

  async function analyzeFile(file: File) {
    setIsAnalyzing(true);

    if (file.type.startsWith("video/")) {
      await new Promise((r) => setTimeout(r, 2000));
      const mockAnalysis: Analysis = {
        globalScore: 74,
        clubType: "Driver",
        date: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "short" }),
        metrics: {
          posture:  { score: 80, verdict: "Bonne flexion" },
          rotation: { score: 72, verdict: "Légère anticipation" },
          impact:   { score: 65, verdict: "Poids trop en arrière" },
          suivi:    { score: 78, verdict: "Extension correcte" },
        },
      };
      setAnalysis(mockAnalysis);
      setMessages([{
        role: "assistant",
        content:
          "**Analyse vidéo terminée** — Voici votre bilan de swing.\n\nVotre posture générale est bonne avec une flexion des genoux adaptée. Le point principal à corriger est le **transfert de poids à l'impact** — vous restez trop sur le pied arrière.\n\nLa rotation est légèrement anticipée par les épaules. Travaillez à laisser les **hanches initier la descente** avant les bras.\n\nPosez-moi vos questions ci-dessous !",
        showScorecard: true,
      }]);
      setIsAnalyzing(false);
      return;
    }

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve((e.target?.result as string).split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const res = await fetch("/api/ia/swing-analyse-structured", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64, mimeType: file.type, level }),
      });

      const data = await res.json();

      const result: Analysis = {
        globalScore: data.globalScore ?? 70,
        clubType: data.clubType ?? "Driver",
        date: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "short" }),
        metrics: {
          posture:  data.metrics?.posture  ?? { score: 70, verdict: "—" },
          rotation: data.metrics?.rotation ?? { score: 70, verdict: "—" },
          impact:   data.metrics?.impact   ?? { score: 70, verdict: "—" },
          suivi:    data.metrics?.suivi    ?? { score: 70, verdict: "—" },
        },
      };

      setAnalysis(result);
      setMessages([{
        role: "assistant",
        content: data.summary ?? "Analyse terminée. Posez vos questions ci-dessous !",
        showScorecard: true,
      }]);
    } catch {
      setMessages([{
        role: "assistant",
        content: "Je n'ai pas pu analyser cette image. Réessayez avec une photo plus nette.",
      }]);
    }

    setIsAnalyzing(false);
  }

  /* ── Chat ── */

  async function sendMessage(text: string) {
    if (!text.trim() || isSending) return;
    const userMsg: Message = { role: "user", content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInputValue("");
    setShowChips(false);
    setIsSending(true);

    try {
      const res = await fetch("/api/ia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "swing",
          playerProfile: MOCK_PROFILE,
          extraContext: analysis
            ? `Analyse de swing disponible — score global : ${analysis.globalScore}/100. Posture : ${analysis.metrics.posture.score}/100 (${analysis.metrics.posture.verdict}). Rotation : ${analysis.metrics.rotation.score}/100 (${analysis.metrics.rotation.verdict}). Impact : ${analysis.metrics.impact.score}/100 (${analysis.metrics.impact.verdict}). Suivi : ${analysis.metrics.suivi.score}/100 (${analysis.metrics.suivi.verdict}).`
            : undefined,
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Désolé, une erreur est survenue. Réessayez." },
      ]);
    }
    setIsSending(false);
  }

  /* ── Level ── */

  function cycleLevel() {
    setLevel((prev) => LEVELS[(LEVELS.indexOf(prev) + 1) % LEVELS.length]);
  }

  /* ── Video controls ── */

  function togglePlay() {
    if (!videoRef.current) return;
    if (isPlaying) { videoRef.current.pause(); setIsPlaying(false); }
    else           { videoRef.current.play();  setIsPlaying(true);  }
  }

  function handleProgressClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!videoRef.current || !videoDuration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    videoRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * videoDuration;
  }

  function formatTime(s: number) {
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  }

  /* ── Drag & drop ── */

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  /* ─────────────────────────────────────────────────── RENDER ── */

  const scoreColor = (s: number) => (s >= 70 ? "#7ab84a" : "#e8a020");
  const verdictColor = (s: number) => (s >= 70 ? "#8aab92" : "#e8a020");

  // suppress unused warning — kept for future level-color theming
  void LEVEL_COLORS;

  return (
    <>
      <style>{`.swing-input::placeholder { color: #aaaaaa; }`}</style>
      <div
        className="hidden lg:flex"
        style={{ height: "calc(100vh - 56px)", background: "#071009", overflow: "hidden" }}
      >

        {/* ══════════════ LEFT PANEL ══════════════ */}
        <div
          style={{
            width: "55%", height: "100%",
            borderRight: "0.5px solid #1c1c1c",
            display: "flex", flexDirection: "column", overflow: "hidden",
          }}
        >
          {/* ── Media / upload zone ── */}
          <div
            style={{ flex: 1, position: "relative", overflow: "hidden", minHeight: 0 }}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
          >
            {!media ? (
              <div
                className="w-full h-full flex items-center justify-center select-none"
                style={{ position: "relative" }}
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
              >
                {/* Golf illustration — CSS only */}
                <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                  {/* Sky */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "45%", background: "#071009" }} />
                  {/* Horizon line */}
                  <div style={{ position: "absolute", left: 0, right: 0, top: "45%", height: "0.5px", background: "#0f1a0f" }} />
                  {/* Fairway */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "55%", background: "#0f1a0a" }} />
                  {/* Outer putting green */}
                  <div style={{
                    position: "absolute", bottom: -70, right: 30,
                    width: 190, height: 190, borderRadius: "50%",
                    background: "#111f0a", border: "0.5px solid #1a2a10",
                  }} />
                  {/* Inner putting green */}
                  <div style={{
                    position: "absolute", bottom: -45, right: 15,
                    width: 120, height: 120, borderRadius: "50%",
                    background: "#132212", border: "0.5px solid #1a2a10",
                  }} />
                  {/* Flag pole */}
                  <div style={{
                    position: "absolute", bottom: 85, right: 115,
                    width: 1, height: 65, background: "#1e3a1e",
                  }} />
                  {/* Flag triangle */}
                  <div style={{
                    position: "absolute", bottom: 147, right: 116,
                    width: 0, height: 0,
                    borderTop: "7px solid transparent",
                    borderBottom: "7px solid transparent",
                    borderLeft: "13px solid #3d8c3d",
                  }} />
                  {/* Bunker */}
                  <div style={{
                    position: "absolute", bottom: 25, left: 25,
                    width: 90, height: 32, borderRadius: "50%",
                    background: "#141a0c", border: "0.5px solid #1a2a10",
                  }} />
                  {/* Stars */}
                  <div style={{ position: "absolute", top: "8%", left: "15%", width: 2, height: 2, borderRadius: "50%", background: "#1e3a1e" }} />
                  <div style={{ position: "absolute", top: "15%", left: "65%", width: 1.5, height: 1.5, borderRadius: "50%", background: "#1e3a1e" }} />
                  <div style={{ position: "absolute", top: "30%", left: "35%", width: 2, height: 2, borderRadius: "50%", background: "#1e3a1e" }} />
                  <div style={{ position: "absolute", top: "22%", left: "80%", width: 1.5, height: 1.5, borderRadius: "50%", background: "#1e3a1e" }} />
                </div>

                {/* Upload zone card */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    position: "relative", zIndex: 2, width: "72%",
                    background: "rgba(13,13,13,0.92)",
                    border: `1px dashed ${isDragOver ? "#7ab84a" : "#1e3a1e"}`,
                    borderRadius: 20, padding: "30px 26px",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
                    cursor: "pointer", transition: "border-color 0.2s",
                  }}
                >
                  <div style={{
                    width: 58, height: 58, borderRadius: "50%",
                    background: "#0d200d", border: "0.5px solid #2a2a2a",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Video size={24} style={{ color: "#7ab84a" }} />
                  </div>

                  <p style={{ fontSize: 15, fontWeight: 500, color: "#e8f0ea", textAlign: "center", margin: 0 }}>
                    Déposer une vidéo ou photo
                  </p>

                  <p style={{ fontSize: 11, color: "#8aab92", textAlign: "center", margin: 0 }}>
                    MP4, MOV, JPG · max 60 sec
                  </p>

                  <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                      style={{
                        padding: "9px 20px", borderRadius: 10,
                        background: "#7ab84a", border: "none", cursor: "pointer",
                        fontSize: 12, fontWeight: 500, color: "#ffffff",
                        display: "flex", alignItems: "center", gap: 6,
                      }}
                    >
                      <Upload size={13} />
                      Sélectionner
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        padding: "9px 20px", borderRadius: 10,
                        background: "transparent", border: "0.5px solid #2a2a2a", cursor: "pointer",
                        fontSize: 12, fontWeight: 500, color: "#8aab92",
                        display: "flex", alignItems: "center", gap: 6,
                      }}
                    >
                      <Camera size={13} />
                      Filmer en direct
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {media.type === "image" ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={media.url}
                    alt="Swing"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                  />
                ) : (
                  <video
                    ref={videoRef}
                    src={media.url}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onTimeUpdate={() => videoRef.current && setVideoCurrentTime(videoRef.current.currentTime)}
                    onLoadedMetadata={() => videoRef.current && setVideoDuration(videoRef.current.duration)}
                    onEnded={() => setIsPlaying(false)}
                  />
                )}

                {analysis && (
                  <div style={{
                    position: "absolute", top: 12, left: 12,
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "5px 11px", borderRadius: 20,
                    background: "#0d200d", border: "0.5px solid #1c1c1c",
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#e8f0ea" }}>
                      {analysis.clubType} · {analysis.date}
                    </span>
                  </div>
                )}

                {analysis && (
                  <div style={{
                    position: "absolute", top: 12, right: 12,
                    display: "flex", alignItems: "center", gap: 7,
                    padding: "5px 11px", borderRadius: 20,
                    background: "#0d200d", border: "0.5px solid #1c1c1c",
                  }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#7ab84a", display: "block" }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#e8f0ea" }}>
                      {analysis.globalScore} / 100
                    </span>
                  </div>
                )}

                {!isAnalyzing && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      position: "absolute", bottom: 12, right: 12,
                      padding: "5px 12px", borderRadius: 16, cursor: "pointer",
                      background: "rgba(13,13,13,0.85)", border: "0.5px solid #1c1c1c",
                      fontSize: 11, color: "#8aab92",
                    }}
                  >
                    Changer
                  </button>
                )}
              </>
            )}

            {/* Loading overlay */}
            {isAnalyzing && (
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(13,13,13,0.88)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                gap: 14,
              }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="animate-bounce"
                      style={{ width: 8, height: 8, borderRadius: "50%", background: "#7ab84a", display: "block", animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
                <p style={{ fontSize: 12, color: "#7ab84a", fontWeight: 500 }}>Analyse en cours…</p>
              </div>
            )}
          </div>

          {/* ── Video controls ── */}
          {media?.type === "video" && (
            <div style={{
              background: "#0a1a0a", borderTop: "0.5px solid #1c1c1c",
              padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0,
            }}>
              <button
                onClick={togglePlay}
                style={{
                  width: 30, height: 30, borderRadius: "50%", flexShrink: 0, cursor: "pointer",
                  background: "#0d200d", border: "0.5px solid #252525",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                {isPlaying
                  ? <Pause size={12} style={{ color: "#7ab84a" }} />
                  : <Play size={12} fill="#7ab84a" style={{ color: "#7ab84a" }} />
                }
              </button>

              <div
                style={{
                  flex: 1, height: 4, background: "#1e3a1e", borderRadius: 2,
                  cursor: "pointer", position: "relative",
                }}
                onClick={handleProgressClick}
              >
                <div style={{
                  height: "100%", borderRadius: 2, background: "#7ab84a", position: "relative",
                  width: videoDuration ? `${(videoCurrentTime / videoDuration) * 100}%` : "0%",
                }}>
                  <div style={{
                    position: "absolute", right: -5, top: "50%", transform: "translateY(-50%)",
                    width: 10, height: 10, borderRadius: "50%", background: "#7ab84a",
                  }} />
                </div>
              </div>

              <span style={{ fontSize: 11, color: "#8aab92", flexShrink: 0 }}>
                {formatTime(videoCurrentTime)} / {formatTime(videoDuration)}
              </span>

              <button
                onClick={() => videoRef.current?.requestFullscreen()}
                style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0, cursor: "pointer",
                  background: "#0d200d", border: "0.5px solid #252525",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <Maximize2 size={11} style={{ color: "#444444" }} />
              </button>
            </div>
          )}

          {/* ── Metrics row ── */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            height: 90, flexShrink: 0, overflow: "hidden",
            borderTop: "0.5px solid #1e3a1e", background: "#071009",
          }}>
            {METRIC_KEYS.map((key, i) => {
              const m = analysis?.metrics[key] ?? null;
              return (
                <div
                  key={key}
                  style={{
                    padding: "14px 16px",
                    display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center",
                    borderRight: i < 3 ? "0.5px solid #1e3a1e" : "none",
                  }}
                >
                  <p style={{ fontSize: 10, letterSpacing: "1.2px", textTransform: "uppercase", color: "#8aab92", margin: 0 }}>
                    {METRIC_LABELS[key]}
                  </p>
                  {m ? (
                    <>
                      <p style={{ fontSize: 20, fontWeight: 600, color: "#e8f0ea", lineHeight: 1, marginTop: 4, marginBottom: 0 }}>
                        {m.score}<span style={{ fontSize: 11, fontWeight: 400, color: "#4a6855" }}>/100</span>
                      </p>
                      <div style={{ width: "100%", height: 3, background: "#0a1a0a", borderRadius: 3, margin: "7px 0 4px" }}>
                        <div style={{ height: "100%", borderRadius: 3, width: `${m.score}%`, background: scoreColor(m.score) }} />
                      </div>
                      <p style={{ fontSize: 11, color: verdictColor(m.score), margin: 0 }}>
                        {m.verdict}
                      </p>
                    </>
                  ) : (
                    <>
                      <div style={{ width: 36, height: 2, background: "#0a1a0a", borderRadius: 2, margin: "6px 0 4px" }} />
                      <p style={{ fontSize: 10, color: "#8aab92", margin: 0 }}>En attente</p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ══════════════ RIGHT PANEL ══════════════ */}
        <div style={{ width: "45%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* ── Chat header ── */}
          <div style={{
            flexShrink: 0, minHeight: 56,
            padding: "12px 18px", borderBottom: "0.5px solid #1c1c1c", background: "#071009",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
              background: "#0d200d", border: "1px solid #252525",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 11, fontWeight: 500, color: "#e8f0ea" }}>LS</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: "#e8f0ea", lineHeight: 1.2, margin: 0 }}>
                Laurent Seinger · Coach IA
              </p>
              <p style={{ fontSize: 11, color: "#8aab92", marginTop: 2, marginBottom: 0 }}>
                {isAnalyzing
                  ? "Analyse de swing en cours"
                  : analysis
                  ? "Analyse de swing en cours"
                  : "En attente d'un swing…"}
              </p>
            </div>
            <button
              onClick={cycleLevel}
              style={{
                padding: "3px 10px", borderRadius: 20, cursor: "pointer",
                background: "#0d200d", border: "0.5px solid #2a3a2a",
                fontSize: 10, fontWeight: 500, color: "#7ab84a",
                whiteSpace: "nowrap",
              }}
              title="Changer le niveau"
            >
              {LEVEL_LABELS[level]}
            </button>
          </div>

          {/* ── Messages area ── */}
          <div style={{
            flex: 1, overflowY: "auto", padding: 12,
            display: "flex", flexDirection: "column", gap: 10, minHeight: 0,
          }}>
            {/* Empty state */}
            {messages.length === 0 && !isAnalyzing && (
              <div style={{
                flex: 1, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ width: 290, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  {[
                    { n: 1, title: "Uploadez votre swing", desc: "Vidéo ou photo · face-on ou de côté" },
                    { n: 2, title: "Analyse automatique", desc: "Score détaillé sur 4 critères en quelques secondes" },
                    { n: 3, title: "Discutez avec Laurent", desc: "Corrections personnalisées selon votre niveau" },
                  ].map((step, idx) => (
                    <div
                      key={step.n}
                      style={{
                        width: "100%", display: "flex", gap: 14, padding: "13px 0",
                        borderBottom: idx < 2 ? "0.5px solid #161616" : "none",
                      }}
                    >
                      <div style={{
                        width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                        background: "#0d200d", border: "0.5px solid #252525",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <span style={{ fontSize: 11, fontWeight: 500, color: "#7ab84a" }}>{step.n}</span>
                      </div>
                      <div style={{ flex: 1, textAlign: "left" }}>
                        <p style={{ fontSize: 13, fontWeight: 500, color: "#e8f0ea", margin: 0, marginBottom: 2 }}>{step.title}</p>
                        <p style={{ fontSize: 11, color: "#8aab92", lineHeight: 1.5, margin: 0 }}>{step.desc}</p>
                      </div>
                    </div>
                  ))}

                  <div style={{ width: "100%", height: "0.5px", background: "#0f1a0f", margin: "22px 0" }} />

                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
                    {["Analyser ma posture", "Corriger mon impact", "Comparer mes swings"].map((c) => (
                      <span
                        key={c}
                        style={{
                          padding: "5px 12px", borderRadius: 20,
                          background: "#0a1a0a", border: "0.5px solid #1e1e1e",
                          fontSize: 11, color: "#8aab92",
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((msg, i) =>
              msg.role === "assistant" ? (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                    background: "#0d200d", border: "0.5px solid #252525",
                    display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2,
                  }}>
                    <span style={{ fontSize: 8, fontWeight: 500, color: "#e8f0ea" }}>LS</span>
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      padding: "10px 12px",
                      background: "#0d200d", border: "0.5px solid #1c1c1c",
                      borderRadius: 14, borderTopLeftRadius: 3,
                      fontSize: 12, color: "#e8f0ea", lineHeight: 1.55,
                    }}>
                      {renderMarkdown(msg.content)}
                    </div>

                    {msg.showScorecard && analysis && (
                      <div style={{
                        marginTop: 6, padding: "8px 10px",
                        background: "#0a1a0a", border: "0.5px solid #1c1c1c", borderRadius: 10,
                      }}>
                        {METRIC_KEYS.map((key, j) => {
                          const m = analysis.metrics[key];
                          return (
                            <div
                              key={key}
                              style={{
                                display: "flex", alignItems: "center", gap: 8,
                                paddingTop: j > 0 ? 8 : 0, marginTop: j > 0 ? 8 : 0,
                                borderTop: j > 0 ? "0.5px solid #161616" : "none",
                              }}
                            >
                              <div style={{
                                width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                                background: m.score >= 70 ? "rgba(61,140,61,0.12)" : "rgba(232,160,32,0.12)",
                                border: `0.5px solid ${scoreColor(m.score)}`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 9, color: scoreColor(m.score),
                              }}>
                                {m.score >= 70 ? "✓" : "!"}
                              </div>
                              <span style={{ fontSize: 11, color: "#8aab92", flex: 1 }}>
                                {METRIC_LABELS[key]}
                              </span>
                              <span style={{ fontSize: 11, fontWeight: 600, color: scoreColor(m.score) }}>
                                {m.score}/100
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div key={i} style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div style={{
                    maxWidth: "75%", padding: "10px 12px",
                    background: "#0a1a0a", border: "0.5px solid #252525",
                    borderRadius: 14, borderTopRightRadius: 3,
                    fontSize: 12, color: "#e8f0ea", lineHeight: 1.55,
                  }}>
                    {msg.content}
                  </div>
                </div>
              )
            )}

            {/* Typing indicator */}
            {isSending && (
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <div style={{
                  width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                  background: "#0d200d", border: "0.5px solid #252525",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 8, fontWeight: 500, color: "#e8f0ea" }}>LS</span>
                </div>
                <div style={{
                  padding: "10px 14px",
                  background: "#0d200d", border: "0.5px solid #1c1c1c",
                  borderRadius: 14, borderTopLeftRadius: 3,
                  display: "flex", gap: 4, alignItems: "center",
                }}>
                  {[0, 150, 300].map((d) => (
                    <span key={d} className="animate-bounce" style={{
                      width: 5, height: 5, borderRadius: "50%", background: "#7ab84a",
                      display: "block", animationDelay: `${d}ms`,
                    }} />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Quick chips row ── */}
          {showChips && messages.length > 0 && (
            <div
              style={{
                height: 44, flexShrink: 0,
                padding: "0 14px", background: "#071009", borderTop: "0.5px solid #1c1c1c",
                display: "flex", alignItems: "center", gap: 6, overflowX: "auto",
              }}
              className="scrollbar-none"
            >
              {CHIPS.map((chip, idx) => (
                <button
                  key={chip}
                  onClick={() => sendMessage(chip)}
                  onMouseEnter={() => setHoveredChip(idx)}
                  onMouseLeave={() => setHoveredChip(null)}
                  style={{
                    flexShrink: 0, padding: "5px 12px", borderRadius: 20, cursor: "pointer",
                    background: "#0a1a0a",
                    border: `0.5px solid ${hoveredChip === idx ? "#1e3a1e" : "#1a3a1a"}`,
                    fontSize: 12, color: hoveredChip === idx ? "#e8f0ea" : "#8aab92",
                    whiteSpace: "nowrap", transition: "color 0.15s, border-color 0.15s",
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* ── Input bar ── */}
          <div style={{
            flexShrink: 0, borderTop: "0.5px solid #1c1c1c",
            padding: "10px 12px", background: "#071009",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <input
              type="text"
              className="swing-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(inputValue);
                }
              }}
              placeholder="Pose une question sur ton swing…"
              style={{
                flex: 1,
                background: "#0a1a0a", border: "0.5px solid #222222",
                borderRadius: 20, padding: "9px 14px",
                fontSize: 12, color: "#e8f0ea", outline: "none",
              }}
            />
            <button
              onClick={() => sendMessage(inputValue)}
              disabled={!inputValue.trim() || isSending}
              style={{
                width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
                background: "#1a3a0a", border: "0.5px solid #2a3a2a",
                cursor: inputValue.trim() && !isSending ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: inputValue.trim() && !isSending ? 1 : 0.45,
                transition: "opacity 0.2s",
              }}
            >
              <ArrowUp size={15} style={{ color: "#7ab84a" }} />
            </button>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => { if (e.target.files?.[0]) { handleFile(e.target.files[0]); e.target.value = ""; } }}
        />
      </div>
    </>
  );
}
