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
      {/* Level badge */}
      <div style={{ padding: "4px 12px 0" }}>
        <span style={{ fontSize: 6.5, fontWeight: 700, color: "#C9A84C", background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: 20, padding: "2px 6px" }}>
          Index 22 · Intermédiaire
        </span>
      </div>
      {/* Swing analysis card */}
      <div style={{ margin: "6px 8px 0", background: "#132B1E", borderRadius: 7, padding: "6px 8px", border: "1px solid #2A4A35" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
          <p style={{ fontSize: 7, fontWeight: 700, color: "#F5F0E8", margin: 0 }}>Analyse swing · 14 mai</p>
          <span style={{ fontSize: 8, fontWeight: 800, color: "#C9A84C" }}>74/100</span>
        </div>
        {[
          { label: "Posture", pct: 82, color: "#C9A84C" },
          { label: "Rotation", pct: 64, color: "#DFC060" },
          { label: "Impact", pct: 78, color: "#C9A84C" },
        ].map(({ label, pct, color }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
            <p style={{ fontSize: 6.5, color: "#7A8A7A", margin: 0, width: 38, flexShrink: 0 }}>{label}</p>
            <div style={{ flex: 1, height: 4, background: "#1B3A2A", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 2 }} />
            </div>
            <p style={{ fontSize: 6.5, color: color, margin: 0, width: 18, textAlign: "right", fontWeight: 700 }}>{pct}%</p>
          </div>
        ))}
      </div>
      {/* Chat */}
      <div style={{ flex: 1, padding: "6px 8px", display: "flex", flexDirection: "column", gap: 5, overflow: "hidden" }}>
        <Bubble side="ia">
          Ta rotation démarre trop tôt. Retarde les hanches au backswing — objectif : +15 pts impact.
        </Bubble>
        <Bubble side="user">Quel exercice pour corriger ça ?</Bubble>
        <Bubble side="ia">Pieds joints, 20 balles fer 7. Force la séquence épaules → hanches.</Bubble>
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
      {/* Category pills */}
      <div style={{ padding: "5px 8px 0", display: "flex", gap: 4 }}>
        {[
          { label: "Tout", active: true },
          { label: "Drive", active: false },
          { label: "Putting", active: false },
          { label: "Mental", active: false },
        ].map(({ label, active }) => (
          <span
            key={label}
            style={{
              fontSize: 6,
              fontWeight: 700,
              padding: "2px 6px",
              borderRadius: 20,
              background: active ? "#C9A84C" : "#132B1E",
              color: active ? "#0F2318" : "#7A8A7A",
              border: active ? "none" : "1px solid #2A4A35",
            }}
          >
            {label}
          </span>
        ))}
      </div>
      <div style={{ flex: 1, padding: "6px 8px", display: "flex", flexDirection: "column", gap: 5 }}>
        {/* Featured video */}
        <div
          style={{
            height: 80,
            background: "linear-gradient(145deg, #1A3410 0%, #2D5020 60%, #3A6A1A 100%)",
            borderRadius: 8,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle texture lines */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.06,
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 6px, #fff 6px, #fff 7px)" }} />
          {/* Play button */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -60%)",
              width: 22,
              height: 22,
              background: "rgba(255,255,255,0.92)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 0, height: 0, borderLeft: "7px solid #1A3410", borderTop: "4px solid transparent", borderBottom: "4px solid transparent", marginLeft: 2 }} />
          </div>
          {/* Title overlay */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 7px 5px", background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
            <p style={{ fontSize: 7.5, fontWeight: 700, color: "#FFFFFF", margin: 0, lineHeight: 1.2 }}>La rotation des hanches</p>
            <p style={{ fontSize: 6, color: "rgba(255,255,255,0.65)", margin: 0 }}>Module 2 · 12 min</p>
          </div>
          {/* Progress bar */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2.5, background: "rgba(255,255,255,0.15)" }}>
            <div style={{ width: "62%", height: "100%", background: "#C9A84C" }} />
          </div>
        </div>
        {/* Compact video list */}
        {[
          { t: "Grip et posture de base", m: "Module 1", dur: "8 min", done: true, c: "#1A3D15" },
          { t: "Le chip parfait", m: "Short Game", dur: "14 min", done: false, c: "#253A10" },
          { t: "Driver : alignement & stance", m: "Drive", dur: "10 min", done: false, c: "#1E3A28" },
        ].map(({ t, m, dur, done, c }) => (
          <div key={t} style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {/* Thumbnail */}
            <div style={{ width: 40, height: 28, background: c, borderRadius: 5, flexShrink: 0, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {done ? (
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#C9A84C", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="7" height="7" viewBox="0 0 7 7" fill="none"><polyline points="1.5,3.5 3,5 5.5,2" stroke="#0F2318" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                ) : (
                  <div style={{ width: 0, height: 0, borderLeft: "5px solid rgba(255,255,255,0.7)", borderTop: "3px solid transparent", borderBottom: "3px solid transparent", marginLeft: 1 }} />
                )}
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 7.5, fontWeight: 600, color: "#F5F0E8", margin: 0, lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t}</p>
              <p style={{ fontSize: 6, color: "#7A8A7A", margin: 0 }}>{m} · {dur}</p>
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
      <ScreenHeader title="Parcours du Médoc · T.7" accent="#DFC060" />
      {/* Recognition badge */}
      <div style={{ padding: "4px 12px 0", display: "flex", alignItems: "center", gap: 5 }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ADE80", flexShrink: 0 }} />
        <span style={{ fontSize: 6.5, fontWeight: 700, color: "#4ADE80" }}>Reconnu · 97% confiance</span>
        <span style={{ fontSize: 6, color: "#7A8A7A", marginLeft: "auto" }}>Par 4 · 380m</span>
      </div>
      <div style={{ flex: 1, padding: "5px 8px", display: "flex", flexDirection: "column", gap: 5 }}>
        {/* Map */}
        <div
          style={{
            flex: 1,
            background: "linear-gradient(160deg, #5A8C3A 0%, #3A7010 100%)",
            borderRadius: 8,
            position: "relative",
            overflow: "hidden",
            minHeight: 100,
          }}
        >
          {/* Rough texture */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 80%, rgba(20,50,10,0.4) 0%, transparent 60%)" }} />
          {/* Fairway */}
          <div
            style={{
              position: "absolute",
              left: "22%",
              top: "8%",
              width: "58%",
              height: "78%",
              background: "linear-gradient(180deg, rgba(200,240,160,0.55), rgba(150,210,90,0.45))",
              borderRadius: "35% 40% 25% 30% / 25% 30% 40% 35%",
              transform: "rotate(-6deg)",
            }}
          />
          {/* Bunker right */}
          <div style={{ position: "absolute", left: "57%", top: "34%", width: 16, height: 11, background: "#F0E5C0", borderRadius: "50%", border: "1px solid rgba(240,229,192,0.5)" }}>
            <p style={{ fontSize: 5, color: "#8A7A40", margin: 0, textAlign: "center", lineHeight: "11px", fontWeight: 700 }}>B</p>
          </div>
          {/* Water */}
          <div style={{ position: "absolute", right: "10%", top: "52%", width: 22, height: 16, background: "rgba(70,130,190,0.88)", borderRadius: "50% 40% 50% 40%" }}>
            <p style={{ fontSize: 5, color: "rgba(255,255,255,0.9)", margin: 0, textAlign: "center", lineHeight: "16px", fontWeight: 700 }}>~</p>
          </div>
          {/* Tee */}
          <div style={{ position: "absolute", left: "42%", bottom: "10%", width: 7, height: 7, background: "#FFFFFF", borderRadius: "50%", border: "2px solid #C9A84C" }} />
          {/* Pin */}
          <div style={{ position: "absolute", left: "45%", top: "8%", width: 5, height: 5, background: "#FF4444", borderRadius: "50%", boxShadow: "0 0 0 2px rgba(255,255,255,0.5)" }} />
          {/* Distance labels */}
          <div style={{ position: "absolute", left: "34%", top: "45%", fontSize: 5, color: "rgba(255,255,255,0.75)", fontWeight: 700 }}>215m</div>
          <div style={{ position: "absolute", right: "18%", top: "44%", fontSize: 5, color: "rgba(255,255,255,0.75)", fontWeight: 700 }}>240m</div>
          {/* Top-right badge */}
          <div style={{ position: "absolute", top: 5, right: 5, padding: "2px 5px", background: "rgba(13,26,9,0.85)", borderRadius: 4, border: "1px solid rgba(201,168,76,0.3)" }}>
            <p style={{ fontSize: 6, color: "#DFC060", margin: 0, fontWeight: 700 }}>Reco IA</p>
          </div>
        </div>
        {/* Detected obstacles */}
        <div style={{ display: "flex", gap: 4 }}>
          {[
            { label: "Bunker 215m", color: "#DFC060", bg: "rgba(223,192,96,0.12)" },
            { label: "Eau 240m", color: "#60A0DF", bg: "rgba(96,160,223,0.12)" },
            { label: "Dog-leg G", color: "#90C060", bg: "rgba(144,192,96,0.12)" },
          ].map(({ label, color, bg }) => (
            <div key={label} style={{ flex: 1, background: bg, border: `1px solid ${color}30`, borderRadius: 5, padding: "3px 4px", textAlign: "center" }}>
              <p style={{ fontSize: 6, color, margin: 0, fontWeight: 700, lineHeight: 1.2 }}>{label}</p>
            </div>
          ))}
        </div>
        {/* Strategy */}
        <div style={{ background: "#1B3A2A", borderRadius: 6, padding: "5px 7px", border: "1px solid rgba(201,168,76,0.25)" }}>
          <p style={{ fontSize: 7, color: "#DFC060", margin: 0, fontWeight: 700 }}>STRATÉGIE IA</p>
          <p style={{ fontSize: 7.5, color: "#F5F0E8", margin: 0, lineHeight: 1.35 }}>
            Drive 215m max, visez centre fairway. Bois 3 ou hybrid conseillé.
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
      <div style={{ flex: 1, padding: "5px 8px", display: "flex", flexDirection: "column", gap: 5, overflow: "hidden" }}>
        {/* Challenge banner */}
        <div style={{ background: "linear-gradient(135deg, #6030A0, #9050C8)", borderRadius: 7, padding: "6px 8px", color: "#FFFFFF", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -10, right: -10, width: 50, height: 50, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
          <p style={{ fontSize: 6.5, opacity: 0.8, margin: 0, fontWeight: 700, letterSpacing: 0.5 }}>CHALLENGE DU MOIS</p>
          <p style={{ fontSize: 9, fontWeight: 800, margin: "1px 0 4px" }}>Best birdie · 142 joueurs</p>
          {/* Progress bar */}
          <div style={{ height: 4, background: "rgba(255,255,255,0.18)", borderRadius: 2 }}>
            <div style={{ width: "71%", height: "100%", background: "rgba(255,255,255,0.85)", borderRadius: 2 }} />
          </div>
          <p style={{ fontSize: 6, opacity: 0.7, margin: "3px 0 0", textAlign: "right" }}>71% de l&apos;objectif</p>
        </div>
        {/* Leaderboard */}
        <div style={{ background: "#1B3A2A", borderRadius: 6, padding: "5px 7px", border: "1px solid #2A4A35" }}>
          <p style={{ fontSize: 6.5, fontWeight: 700, color: "#B080E0", margin: "0 0 4px", letterSpacing: 0.5 }}>CLASSEMENT</p>
          {[
            { rank: "1", n: "Pierre M.", score: "−4", color: "#DFC060" },
            { rank: "2", n: "Sophie B.", score: "−3", color: "#A0A0B0" },
            { rank: "3", n: "Thomas R.", score: "−2", color: "#A06030" },
          ].map(({ rank, n, score, color }) => (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
              <span style={{ fontSize: 6.5, fontWeight: 800, color, width: 10, textAlign: "center" }}>{rank}</span>
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#2A4A35", flexShrink: 0 }} />
              <p style={{ fontSize: 7, color: "#F5F0E8", margin: 0, flex: 1 }}>{n}</p>
              <span style={{ fontSize: 7.5, fontWeight: 800, color }}>{score}</span>
            </div>
          ))}
        </div>
        {/* Posts */}
        {[
          { n: "Marie L.", bg: "#2A4A20", t: "−2 sur Chiberta ! La reco IA m'a sauvé sur le 14.", l: 28, c: 9 },
          { n: "Julien D.", bg: "#1A2A50", t: "Premier eagle de ma vie sur le par 5 du Bordelais.", l: 41, c: 14 },
          { n: "Sarah K.", bg: "#3A2A20", t: "Index 32 → 24 en 3 mois. Merci la comm !", l: 55, c: 18 },
        ].map(({ n, bg, t, l, c }) => (
          <div key={n} style={{ background: "#1B3A2A", borderRadius: 6, padding: "6px 7px", border: "1px solid #2A4A35" }}>
            <div style={{ display: "flex", gap: 5, alignItems: "center", marginBottom: 3 }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: bg, flexShrink: 0, border: "1px solid rgba(255,255,255,0.08)" }} />
              <p style={{ fontSize: 7.5, fontWeight: 700, color: "#F5F0E8", margin: 0 }}>{n}</p>
              <span style={{ fontSize: 6, color: "#7A8A7A", marginLeft: "auto" }}>à l&apos;instant</span>
            </div>
            <p style={{ fontSize: 7, color: "rgba(245,240,232,0.75)", margin: 0, lineHeight: 1.4 }}>{t}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <span style={{ fontSize: 6.5, color: "#B080E0" }}>♥ {l}</span>
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
