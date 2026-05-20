"use client";

import { useEffect, useState } from "react";

export default function LoadingBar() {
  const [show, setShow] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("ls_loading")) return;
    sessionStorage.removeItem("ls_loading");
    setShow(true);
  }, []);

  if (!show) return null;

  return (
    <>
      <style>{`
        @keyframes ls-bar {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes ls-bar-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "#0a1a0a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          animation: "ls-bar-fade-in 300ms ease forwards",
          opacity: fadeOut ? 0 : 1,
          transition: fadeOut ? "opacity 400ms ease" : "none",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "#1B3A2A",
              border: "1px solid rgba(201,168,76,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: "#C9A84C",
                fontFamily: "var(--font-serif, Georgia, serif)",
                letterSpacing: "-0.01em",
              }}
            >
              LS
            </span>
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 15, fontWeight: 500, color: "#C9A84C", marginBottom: 3 }}>
              LS Club
            </p>
            <p style={{ fontSize: 12, color: "#7A8A7A" }}>
              Chargement de votre espace…
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: 180,
            height: 2,
            background: "#2A4A35",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            onAnimationEnd={() => {
              setFadeOut(true);
              setTimeout(() => setShow(false), 400);
            }}
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #C9A84C, #DFC060)",
              borderRadius: 2,
              transformOrigin: "left",
              animation: "ls-bar 5s linear forwards",
            }}
          />
        </div>
      </div>
    </>
  );
}
