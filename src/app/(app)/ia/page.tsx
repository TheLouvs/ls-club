"use client";

import Link from "next/link";
import Image from "next/image";

/* ─── Keyframes (injected via <style>) ───────────────────────── */

const STYLES = `
  @keyframes bounce-dot {
    0%, 80%, 100% { transform: scale(0.4); opacity: 0.4; }
    40% { transform: scale(1); opacity: 1; }
  }
  @keyframes float-bubble {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-4px); }
  }
  @keyframes swing-glow {
    0%, 100% { opacity: 0.12; transform: scale(1); }
    50%       { opacity: 0.35; transform: scale(1.18); }
  }
  @keyframes scan-sweep {
    0%   { transform: translateY(-4px); opacity: 0; }
    8%   { opacity: 1; }
    92%  { opacity: 0.7; }
    100% { transform: translateY(128px); opacity: 0; }
  }
`;

/* ─── Illustration 1 : Discussion ────────────────────────────── */

function IllustrationDiscussion() {
  return (
    <div className="w-full h-full relative overflow-hidden">

      {/* 1. Photo — face + buste centré, jamais coupé */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/laurent-seinger.jpg"
        alt=""
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: "cover", objectPosition: "center top" }}
      />

      {/* 2. Gradient overlay derrière les bulles (bas de carte) */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.38) 45%, transparent 70%)",
      }} />

      {/* 3. Bulles de chat — bas-gauche, 55-65% depuis le haut */}
      <div className="absolute left-4 right-4 flex flex-col gap-2" style={{ top: "55%" }}>

        {/* Bubble coach */}
        <div className="self-start max-w-[80%]" style={{ animation: "float-bubble 4s ease-in-out infinite" }}>
          <div className="px-3 py-2 rounded-2xl rounded-tl-sm"
            style={{ background: "rgba(15,20,16,0.78)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(10px)" }}>
            <p className="text-[11px] leading-snug" style={{ color: "rgba(232,240,234,0.95)" }}>
              Bonjour ! Comment puis-je vous aider ?
            </p>
          </div>
        </div>

        {/* Bubble user */}
        <div className="self-end max-w-[75%]" style={{ animation: "float-bubble 4s ease-in-out infinite 0.8s" }}>
          <div className="px-3 py-2 rounded-2xl rounded-tr-sm" style={{ background: "#5aad75" }}>
            <p className="text-[11px] leading-snug" style={{ color: "#071009", fontWeight: 600 }}>
              Mon drive part à gauche…
            </p>
          </div>
        </div>

        {/* Typing dots */}
        <div className="self-start" style={{ animation: "float-bubble 4s ease-in-out infinite 0.4s" }}>
          <div className="px-3.5 py-2.5 rounded-2xl rounded-tl-sm flex items-center gap-1.5"
            style={{ background: "rgba(15,20,16,0.78)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(10px)" }}>
            {[0, 0.2, 0.4].map((delay, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ background: "#5aad75", animation: `bounce-dot 1.2s ease-in-out ${delay}s infinite` }} />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

/* ─── Illustration 2 : Mon Swing ─────────────────────────────── */

function IllustrationSwing() {
  return (
    <div className="w-full h-full relative overflow-hidden">

      {/* Photo pleine carte — optimisée via next/image */}
      <Image
        src="/swing-analysis.jpg"
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        style={{ objectFit: "cover", objectPosition: "center top" }}
      />

      {/* Gradient overlay — léger en haut, sombre en bas pour le texte */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 35%, rgba(0,0,0,0.75) 100%)",
      }} />

      {/* Badge IA — top-right */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full" style={{
        background: "rgba(0,0,0,0.55)",
        border: "1px solid rgba(255,255,255,0.18)",
        backdropFilter: "blur(10px)",
      }}>
        <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
          <path d="M8 1.5L9.2 6H13.5L10.1 8.5L11.3 13L8 10.5L4.7 13L5.9 8.5L2.5 6H6.8Z"
            fill="#ffffff" opacity="0.9" />
        </svg>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.9)" }}>
          IA
        </span>
      </div>

    </div>
  );
}

/* ─── Illustration 3 : Stratégie ─────────────────────────────── */

function IllustrationStrategie() {
  return (
    <div className="w-full h-full relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d2535 0%, #081a28 50%, #050f18 100%)" }}>

      {/* Glow vert derrière le trou */}
      <div className="absolute" style={{
        top: "10%", left: "50%", transform: "translateX(-50%)",
        width: "60%", height: "55%",
        background: "radial-gradient(ellipse, rgba(40,140,60,0.2) 0%, transparent 70%)",
        filter: "blur(24px)",
      }} />

      {/* Golf hole — centré, occupe 70% de la hauteur */}
      <div className="absolute" style={{
        top: "5%", left: "50%", transform: "translateX(-50%)",
        width: "52%",
        aspectRatio: "0.55",
      }}>
        {/* SVG hole top-down, responsive */}
        <svg viewBox="0 0 120 220" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          {/* Rough */}
          <rect x="0" y="0" width="120" height="220" rx="55" fill="rgba(18,50,22,0.7)" />
          {/* Fairway */}
          <rect x="22" y="30" width="76" height="150" rx="35" fill="rgba(35,100,45,0.85)" />
          {/* Left bunker */}
          <ellipse cx="18" cy="120" rx="14" ry="20" fill="rgba(168,144,96,0.6)" transform="rotate(-15 18 120)" />
          {/* Right bunker */}
          <ellipse cx="102" cy="135" rx="12" ry="17" fill="rgba(168,144,96,0.55)" transform="rotate(10 102 135)" />
          {/* Green */}
          <ellipse cx="60" cy="44" rx="28" ry="28" fill="rgba(55,170,70,0.9)" />
          <ellipse cx="60" cy="44" rx="28" ry="28" fill="none" stroke="rgba(80,200,90,0.3)" strokeWidth="2" />
          {/* Flag pole */}
          <rect x="59" y="16" width="2" height="32" fill="rgba(255,255,255,0.8)" />
          {/* Flag */}
          <polygon points="61,16 78,22 61,28" fill="#6ab0d9" />
          {/* Hole cup */}
          <ellipse cx="60" cy="46" rx="4" ry="4" fill="rgba(0,0,0,0.6)" />
          {/* Tee box */}
          <rect x="44" y="185" width="32" height="16" rx="6" fill="rgba(70,150,90,0.6)" stroke="rgba(106,176,217,0.35)" strokeWidth="1" />
          {/* Player dot */}
          <circle cx="60" cy="184" r="5" fill="#6ab0d9">
            <animate attributeName="r" values="5;6.5;5" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="60" cy="184" r="9" fill="none" stroke="rgba(106,176,217,0.3)" strokeWidth="1">
            <animate attributeName="r" values="9;13;9" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
          {/* Shot line */}
          <line x1="60" y1="180" x2="60" y2="72" stroke="rgba(106,176,217,0.4)" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Distance markers (from green) */}
          <line x1="22" y1="81" x2="98" y2="81" stroke="rgba(255,255,255,0.28)" strokeWidth="0.5" strokeDasharray="3 3" />
          <text x="100" y="84" fontSize="5" fill="rgba(255,255,255,0.45)" textAnchor="start">100m</text>

          <line x1="22" y1="118" x2="98" y2="118" stroke="rgba(255,255,255,0.28)" strokeWidth="0.5" strokeDasharray="3 3" />
          <text x="100" y="121" fontSize="5" fill="rgba(255,255,255,0.45)" textAnchor="start">200m</text>

          <line x1="22" y1="155" x2="98" y2="155" stroke="rgba(255,255,255,0.28)" strokeWidth="0.5" strokeDasharray="3 3" />
          <text x="100" y="158" fontSize="5" fill="rgba(255,255,255,0.45)" textAnchor="start">300m</text>

          {/* Bunker labels */}
          <text x="18" y="98" fontSize="5.5" fill="rgba(255,220,140,0.85)" textAnchor="middle" fontWeight="bold">Bunker G.</text>
          <text x="18" y="106" fontSize="4.5" fill="rgba(255,200,100,0.65)" textAnchor="middle">~180m</text>

          <text x="102" y="122" fontSize="5.5" fill="rgba(255,220,140,0.85)" textAnchor="middle" fontWeight="bold">Bunker D.</text>
          <text x="102" y="130" fontSize="4.5" fill="rgba(255,200,100,0.65)" textAnchor="middle">~210m</text>
        </svg>
      </div>

      {/* Badges */}
      <div className="absolute top-5 left-5 flex flex-col gap-2">
        <div className="px-3 py-2 rounded-xl"
          style={{ background: "rgba(106,176,217,0.14)", border: "1px solid rgba(106,176,217,0.3)", backdropFilter: "blur(8px)" }}>
          <p className="text-[8px] font-medium leading-none mb-0.5" style={{ color: "rgba(106,176,217,0.45)" }}>Golf de Lyon Salvagny</p>
          <p className="text-[9px] font-bold tracking-widest uppercase" style={{ color: "rgba(106,176,217,0.7)" }}>Trou 7</p>
          <p className="text-base font-bold leading-none mt-0.5" style={{ color: "#6ab0d9" }}>Par 4 · <span className="text-sm">380m</span></p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-[9px] font-bold" style={{ color: "rgba(106,176,217,0.6)" }}>→</span>
            <p className="text-[9px] font-semibold" style={{ color: "rgba(106,176,217,0.6)" }}>Vent 15 km/h</p>
          </div>
        </div>
        <div className="px-3 py-2 rounded-xl"
          style={{ background: "rgba(106,176,217,0.09)", border: "1px solid rgba(106,176,217,0.2)", backdropFilter: "blur(8px)" }}>
          <p className="text-[9px] font-bold tracking-widest uppercase" style={{ color: "rgba(106,176,217,0.6)" }}>Club conseillé</p>
          <p className="text-sm font-bold leading-none mt-0.5" style={{ color: "#6ab0d9" }}>Driver</p>
        </div>
      </div>

    </div>
  );
}

/* ─── Cards data ──────────────────────────────────────────────── */

const CARDS = [
  {
    href: "/ia/questions",
    label: "DISCUSSION",
    description: "Posez vos questions à Lolo IA. Réponses expertes basées sur la méthode Seinger.",
    accentBorder: "rgba(90,173,117,0.6)",
    illustration: IllustrationDiscussion,
    inputMock: true,
  },
  {
    href: "/ia/swing",
    label: "MON SWING",
    description: "Filmez votre swing · L'IA analyse et corrige",
    accentBorder: "rgba(201,168,76,0.6)",
    illustration: IllustrationSwing,
    inputMock: false,
  },
  {
    href: "/ia/strategie",
    label: "STRATÉGIE",
    description: "Choisissez votre parcours et obtenez une stratégie trou par trou.",
    accentBorder: "rgba(106,176,217,0.6)",
    illustration: IllustrationStrategie,
    inputMock: false,
    chatMock: true,
  },
];

/* ─── Page ────────────────────────────────────────────────────── */

export default function IALandingPage() {
  return (
    <>
      <style>{STYLES}</style>

      {/* Conteneur principal : occupe exactement l'espace dispo sans déborder */}
      <div className="flex flex-col h-full overflow-hidden" style={{ background: "#080c09" }}>

        {/* ── Header centré — style TrackMan ── */}
        <div className="flex-shrink-0 text-center px-5" style={{ paddingTop: 16, paddingBottom: 12 }}>
          <p className="font-bold tracking-[0.18em] uppercase mb-1"
            style={{ fontSize: 10, color: "rgba(90,173,117,0.5)" }}>
            Intelligence Artificielle · Lolo IA
          </p>
          <h1 className="font-black uppercase leading-none"
            style={{ fontSize: 21, color: "#ffffff", letterSpacing: "0.07em",
              textShadow: "0 2px 20px rgba(90,173,117,0.2)" }}>
            Choisissez le mode
          </h1>
        </div>

        {/* ── Cards ── */}
        {/* Mobile : empilement vertical scroll | Desktop : grille 3 colonnes pleine hauteur */}
        <div
          className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-3 gap-3 px-3 pb-3 overflow-y-auto md:overflow-hidden"
        >
          {CARDS.map(({ href, label, description, accentBorder, illustration: Illustration, inputMock, chatMock = false }) => (
            <Link
              key={href}
              href={href}
              className="h-[72vw] md:h-full"
              style={{
                borderRadius: 14,
                overflow: "hidden",
                border: "2px solid rgba(255,255,255,0.09)",
                position: "relative",
                display: "block",
                textDecoration: "none",
                transition: "border-color 0.22s, transform 0.22s, box-shadow 0.22s",
                boxShadow: "0 8px 40px rgba(0,0,0,0.65)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = accentBorder;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px) scale(1.005)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.75)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 40px rgba(0,0,0,0.65)";
              }}
            >
              {/* Illustration pleine carte */}
              <div className="absolute inset-0">
                <Illustration />
              </div>

              {/* Gradient + titre + description en bas — style TrackMan */}
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{
                  padding: (inputMock || chatMock) ? "90px 18px 14px" : "90px 22px 26px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.78) 40%, transparent 100%)",
                }}
              >
                <p style={{
                  color: "#ffffff",
                  fontSize: "clamp(24px, 6vw, 30px)",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  lineHeight: 1,
                  marginBottom: 8,
                  textAlign: "center",
                  textShadow: "0 2px 12px rgba(0,0,0,0.6)",
                }}>
                  {label}
                </p>
                <p style={{
                  color: "rgba(210,225,215,0.72)",
                  fontSize: 12,
                  lineHeight: 1.55,
                  textAlign: "center",
                  marginBottom: (inputMock || chatMock) ? 10 : 0,
                }}>
                  {description}
                </p>

                {/* Input bar mock — Discussion uniquement */}
                {inputMock && (
                  <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(10px)" }}>
                    <p className="flex-1 text-[11px]" style={{ color: "rgba(180,200,185,0.45)" }}>
                      Posez votre question…
                    </p>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "#5aad75" }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1 9L9 5L1 1V4.5L6.5 5L1 5.5V9Z" fill="#071009" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Chat strip — Stratégie uniquement */}
                {chatMock && (
                  <div className="flex flex-col gap-1.5">
                    <div className="px-3 py-2 rounded-xl"
                      style={{ background: "rgba(106,176,217,0.13)", border: "1px solid rgba(106,176,217,0.22)", backdropFilter: "blur(8px)" }}>
                      <p className="text-[10px] leading-snug" style={{ color: "rgba(180,220,255,0.82)" }}>
                        Évitez le bunker gauche à 180m, visez le côté droit du fairway
                      </p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
                      <p className="flex-1 text-[10px]" style={{ color: "rgba(160,190,210,0.38)" }}>
                        Posez votre question stratégique…
                      </p>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "#6ab0d9" }}>
                        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                          <path d="M1 9L9 5L1 1V4.5L6.5 5L1 5.5V9Z" fill="#040c12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

      </div>
    </>
  );
}
