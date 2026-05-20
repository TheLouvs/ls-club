import type { ReactNode } from "react";

type Screen = "ia" | "video" | "parcours" | "community" | "progress";

export function AppMockup({
  screen,
  width = 240,
  float = false,
  className = "",
}: {
  screen: Screen;
  width?: number;
  float?: boolean;
  className?: string;
}) {
  const height = Math.round(width * 2.05);

  return (
    <div
      className={className}
      style={{
        width,
        height,
        position: "relative",
        animation: float ? "lsFloat 6s ease-in-out infinite" : undefined,
      }}
      aria-hidden
    >
      <style>{`
        @keyframes lsFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-mockup-frame] { animation: none !important; }
        }
      `}</style>
      <div
        data-mockup-frame
        style={{
          position: "absolute",
          inset: 0,
          background: "#0D1A09",
          borderRadius: width * 0.13,
          padding: 6,
          boxShadow:
            "0 30px 60px rgba(0,0,0,0.35), 0 12px 24px rgba(0,0,0,0.18), inset 0 0 0 1.5px rgba(255,255,255,0.05)",
          animation: float ? "lsFloat 6s ease-in-out infinite" : undefined,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            background: "#0F2318",
            borderRadius: width * 0.105,
            overflow: "hidden",
          }}
        >
          {/* Dynamic island */}
          <div
            style={{
              position: "absolute",
              top: 8,
              left: "50%",
              transform: "translateX(-50%)",
              width: width * 0.32,
              height: width * 0.06,
              background: "#0D1A09",
              borderRadius: 20,
              zIndex: 10,
            }}
          />
          <ScreenContent screen={screen} />
        </div>
      </div>
    </div>
  );
}

function ScreenContent({ screen }: { screen: Screen }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        paddingTop: 28,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {screen === "ia" && <IaScreen />}
      {screen === "video" && <VideoScreen />}
      {screen === "parcours" && <ParcoursScreen />}
      {screen === "community" && <CommunityScreen />}
      {screen === "progress" && <ProgressScreen />}
    </div>
  );
}

/* ─── Screens ─────────────────────────────────────────── */

function ScreenHeader({ title, accent = "#C9A84C" }: { title: string; accent?: string }) {
  return (
    <div style={{ padding: "8px 12px 6px", borderBottom: "1px solid #2A4A35" }}>
      <p style={{ fontSize: 7, color: "#7A8A7A", letterSpacing: 1, margin: 0 }}>LS CLUB</p>
      <p style={{ fontSize: 11, fontWeight: 700, color: accent, margin: 0, lineHeight: 1.2 }}>{title}</p>
    </div>
  );
}

function IaScreen() {
  return (
    <>
      <ScreenHeader title="Lolo IA · en ligne" />
      <div style={{ flex: 1, padding: 8, display: "flex", flexDirection: "column", gap: 6, overflow: "hidden" }}>
        <Bubble side="user">Comment jouer le trou 4 du Médoc ?</Bubble>
        <Bubble side="ia">
          Dog-leg gauche, 380m. Vise le bunker droit au drive (215m), fer 7 sur green protégé à droite. Évite l&apos;eau à 240m.
        </Bubble>
        <Bubble side="user">Et avec mon index 22 ?</Bubble>
        <Bubble side="ia">Joue plus court : ton drive à 180m max, puis 2 fers moyens. Score réaliste : bogey.</Bubble>
      </div>
      <div style={{ padding: "6px 8px", borderTop: "1px solid #2A4A35", display: "flex", gap: 4, alignItems: "center" }}>
        <div style={{ flex: 1, height: 18, background: "#132B1E", borderRadius: 9, border: "1px solid #2A4A35" }} />
        <div style={{ width: 18, height: 18, background: "#C9A84C", borderRadius: 9 }} />
      </div>
    </>
  );
}

function Bubble({ side, children }: { side: "user" | "ia"; children: ReactNode }) {
  const isUser = side === "user";
  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
      <div
        style={{
          maxWidth: "82%",
          background: isUser ? "#C9A84C" : "#1B3A2A",
          color: isUser ? "#0F2318" : "#F5F0E8",
          padding: "5px 8px",
          borderRadius: 10,
          fontSize: 7.5,
          lineHeight: 1.4,
          boxShadow: isUser ? "none" : "0 1px 3px rgba(0,0,0,0.2)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function VideoScreen() {
  return (
    <>
      <ScreenHeader title="Bibliothèque" />
      <div style={{ flex: 1, padding: 8, display: "flex", flexDirection: "column", gap: 6 }}>
        {/* Featured video */}
        <div
          style={{
            height: 90,
            background: "linear-gradient(145deg, #1A3410, #2D4D1A)",
            borderRadius: 8,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 22,
              height: 22,
              background: "#FFFFFF",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "6px solid #1A3410",
                borderTop: "4px solid transparent",
                borderBottom: "4px solid transparent",
                marginLeft: 2,
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              background: "rgba(255,255,255,0.2)",
            }}
          >
            <div style={{ width: "60%", height: "100%", background: "#C9A84C" }} />
          </div>
        </div>
        <div>
          <p style={{ fontSize: 9, fontWeight: 700, color: "#F5F0E8", margin: 0 }}>La rotation des hanches</p>
          <p style={{ fontSize: 7, color: "#7A8A7A", margin: 0 }}>Module 2 · 12 min · 60 %</p>
        </div>
        {/* Thumbnails */}
        {[
          { t: "Grip et posture", m: "Module 1", c: "#1E3D18" },
          { t: "Le chip parfait", m: "Short Game", c: "#2A3A10" },
        ].map(({ t, m, c }) => (
          <div key={t} style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <div style={{ width: 36, height: 26, background: c, borderRadius: 4, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 8, fontWeight: 600, color: "#F5F0E8", margin: 0, lineHeight: 1.2 }}>{t}</p>
              <p style={{ fontSize: 6.5, color: "#7A8A7A", margin: 0 }}>{m}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function ParcoursScreen() {
  return (
    <>
      <ScreenHeader title="Trou 4 · Par 4 · 380m" accent="#DFC060" />
      <div style={{ flex: 1, padding: 8, display: "flex", flexDirection: "column", gap: 6 }}>
        {/* Map */}
        <div
          style={{
            flex: 1,
            background: "linear-gradient(160deg, #5A8C3A 0%, #3A7010 100%)",
            borderRadius: 8,
            position: "relative",
            overflow: "hidden",
            minHeight: 110,
          }}
        >
          {/* Fairway */}
          <div
            style={{
              position: "absolute",
              left: "20%",
              top: "10%",
              width: "60%",
              height: "75%",
              background: "linear-gradient(180deg, rgba(180,220,140,0.65), rgba(140,200,90,0.5))",
              borderRadius: "40% 40% 30% 30% / 30% 30% 40% 40%",
              transform: "rotate(-8deg)",
            }}
          />
          {/* Bunkers */}
          <div
            style={{ position: "absolute", left: "55%", top: "35%", width: 14, height: 10, background: "#F0E5C8", borderRadius: "50%" }}
          />
          <div
            style={{ position: "absolute", left: "30%", top: "60%", width: 10, height: 8, background: "#F0E5C8", borderRadius: "50%" }}
          />
          {/* Water */}
          <div
            style={{
              position: "absolute",
              right: "12%",
              top: "55%",
              width: 18,
              height: 14,
              background: "rgba(80,140,200,0.85)",
              borderRadius: "50%",
            }}
          />
          {/* Pin */}
          <div
            style={{
              position: "absolute",
              left: "48%",
              top: "12%",
              width: 4,
              height: 4,
              background: "#FFFFFF",
              borderRadius: "50%",
              boxShadow: "0 0 0 2px rgba(255,255,255,0.4)",
            }}
          />
          {/* Tag */}
          <div
            style={{
              position: "absolute",
              bottom: 6,
              left: 6,
              padding: "3px 6px",
              background: "rgba(13,26,9,0.88)",
              color: "#FFFFFF",
              fontSize: 7,
              borderRadius: 4,
              fontWeight: 600,
            }}
          >
            Drive 215m → bunker droit
          </div>
        </div>
        <div
          style={{
            background: "#1B3A2A",
            borderRadius: 6,
            padding: "5px 7px",
            border: "1px solid rgba(201,168,76,0.25)",
          }}
        >
          <p style={{ fontSize: 7, color: "#DFC060", margin: 0, fontWeight: 700 }}>STRATÉGIE IA</p>
          <p style={{ fontSize: 7.5, color: "#F5F0E8", margin: 0, lineHeight: 1.35 }}>
            Évite l&apos;eau à 240m. Ouvre face club +5° au drive.
          </p>
        </div>
      </div>
    </>
  );
}

function CommunityScreen() {
  return (
    <>
      <ScreenHeader title="Communauté" accent="#B080E0" />
      <div style={{ flex: 1, padding: 8, display: "flex", flexDirection: "column", gap: 6 }}>
        {/* Challenge banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #7040A0, #A060D0)",
            borderRadius: 6,
            padding: "5px 7px",
            color: "#FFFFFF",
          }}
        >
          <p style={{ fontSize: 6.5, opacity: 0.85, margin: 0, fontWeight: 600 }}>CHALLENGE DU MOIS</p>
          <p style={{ fontSize: 8.5, fontWeight: 700, margin: 0 }}>Best birdie · 142 participants</p>
        </div>
        {/* Posts */}
        {[
          { n: "Marie L.", v: "green", t: "−2 sur Chiberta aujourd'hui ! Merci Lolo IA pour le 14 🔥", l: 24, c: 7 },
          { n: "Thomas R.", v: "blue", t: "Premier birdie sur un par 5 grâce à la reco parcours.", l: 18, c: 4 },
        ].map(({ n, v, t, l, c }) => (
          <div
            key={n}
            style={{
              background: "#1B3A2A",
              borderRadius: 6,
              padding: 7,
              border: "1px solid #2A4A35",
            }}
          >
            <div style={{ display: "flex", gap: 5, alignItems: "center", marginBottom: 3 }}>
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background:
                    v === "green"
                      ? "linear-gradient(135deg, #1B3A2A, #2A5A3A)"
                      : "linear-gradient(135deg, #1A2A4A, #2A4060)",
                  flexShrink: 0,
                }}
              />
              <p style={{ fontSize: 7.5, fontWeight: 700, color: "#F5F0E8", margin: 0 }}>{n}</p>
            </div>
            <p style={{ fontSize: 7, color: "#7A8A7A", margin: 0, lineHeight: 1.35 }}>{t}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <span style={{ fontSize: 6.5, color: "#7A8A7A" }}>♥ {l}</span>
              <span style={{ fontSize: 6.5, color: "#7A8A7A" }}>💬 {c}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function ProgressScreen() {
  return (
    <>
      <ScreenHeader title="Ma progression" />
      <div style={{ flex: 1, padding: 8, display: "flex", flexDirection: "column", gap: 6 }}>
        <div
          style={{
            background: "linear-gradient(145deg, #1A3410, #2D4D1A)",
            borderRadius: 8,
            padding: 8,
            color: "#FFFFFF",
          }}
        >
          <p style={{ fontSize: 6.5, color: "rgba(255,255,255,0.5)", margin: 0, letterSpacing: 1 }}>INDEX</p>
          <p style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "#FFFFFF" }}>16,4</p>
          <p style={{ fontSize: 7, color: "#C9A84C", margin: 0, fontWeight: 600 }}>−8 pts en 4 mois</p>
        </div>
        {/* Mini chart */}
        <div
          style={{
            background: "#132B1E",
            borderRadius: 8,
            padding: 8,
            height: 60,
            position: "relative",
            border: "1px solid #2A4A35",
          }}
        >
          <svg viewBox="0 0 100 40" style={{ width: "100%", height: "100%" }} preserveAspectRatio="none">
            <polyline
              points="0,8 15,12 30,18 45,16 60,24 75,28 90,32 100,34"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="0,8 15,12 30,18 45,16 60,24 75,28 90,32 100,34 100,40 0,40"
              fill="rgba(201,168,76,0.12)"
            />
          </svg>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {["7j", "12 vidéos", "3h20"].map((s) => (
            <div
              key={s}
              style={{
                flex: 1,
                background: "#1B3A2A",
                borderRadius: 6,
                padding: "4px 5px",
                fontSize: 7,
                fontWeight: 600,
                color: "#C9A84C",
                textAlign: "center",
                border: "1px solid #2A4A35",
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
