"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        transform: show ? "translateY(0)" : "translateY(110%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        padding: "10px 14px calc(10px + env(safe-area-inset-bottom))",
        background: "rgba(15,35,24,0.97)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid #2A4A35",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.3)",
      }}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm leading-tight" style={{ color: "#F5F0E8" }}>
            19€/mois
            <span className="font-normal" style={{ color: "#7A8A7A" }}> · 14 jours gratuits</span>
          </p>
          <p className="text-[10px] leading-tight" style={{ color: "#7A8A7A" }}>
            Sans CB · Annulation 1 clic
          </p>
        </div>
        <Link
          href="/auth/inscription"
          className="inline-flex items-center gap-1 font-bold text-sm px-4 py-2.5 rounded-xl flex-shrink-0"
          style={{ background: "#C9A84C", color: "#0F2318" }}
        >
          Démarrer
          <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
}
