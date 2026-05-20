"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [show, setShow] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("ls_splash_shown")) return;
    sessionStorage.setItem("ls_splash_shown", "1");

    setShow(true);

    // Start fade-out after 1.8s
    const t1 = setTimeout(() => setFadeOut(true), 1800);
    // Hide completely after fade-out (400ms)
    const t2 = setTimeout(() => setDone(true), 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!show || done) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0F2318",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        opacity: fadeOut ? 0 : 1,
        transition: fadeOut ? "opacity 400ms ease" : "none",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      <style>{`
        @keyframes ls-splash-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <span
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: "#F5F0E8",
          fontFamily: "var(--font-serif, Georgia, serif)",
          letterSpacing: "-0.01em",
          animation: "ls-splash-in 600ms ease forwards",
          opacity: 0,
        }}
      >
        LS Club
      </span>

      <span
        style={{
          fontSize: 13,
          color: "#C9A84C",
          fontStyle: "italic",
          fontFamily: "var(--font-serif, Georgia, serif)",
          animation: "ls-splash-in 600ms ease 200ms forwards",
          opacity: 0,
        }}
      >
        Basé sur la méthode Laurent Seinger
      </span>
    </div>
  );
}
