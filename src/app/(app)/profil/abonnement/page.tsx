import { ArrowLeft, Check, ChevronRight, Play, Cpu, Radio, Users, Zap, Receipt } from "lucide-react";
import Link from "next/link";

const avantages = [
  { icon: Play, label: "Accès illimité à toutes les vidéos" },
  { icon: Cpu, label: "Suivi IA personnalisé avec Lolo IA" },
  { icon: Radio, label: "Sessions live avec Laurent" },
  { icon: Users, label: "Accès à la communauté LS Club" },
  { icon: Zap, label: "Nouveaux contenus chaque semaine" },
];

export default function AbonnementPage() {
  return (
    <div className="px-4 py-4 md:px-8 max-w-3xl mx-auto w-full">

      <div className="flex items-center gap-3 mb-4">
        <Link href="/profil" className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}>
          <ArrowLeft size={15} style={{ color: "#7A8A7A" }} />
        </Link>
        <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#7A8A7A" }}>
          Abonnement
        </p>
      </div>

      {/* Card plan actuel */}
      <div className="card-dark-green p-5 mb-4 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #C9A84C, transparent)" }} />
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
              style={{ background: "rgba(201,168,76,0.2)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)" }}>
              Premium
            </span>
            <p className="font-serif font-bold text-2xl mt-2" style={{ color: "#FFFFFF" }}>19,99 €</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>par mois</p>
          </div>
          <div className="text-right">
            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>Renouvellement</p>
            <p className="text-sm font-semibold mt-0.5" style={{ color: "rgba(255,255,255,0.85)" }}>12 Mai 2026</p>
            <p className="text-[10px] mt-1" style={{ color: "#C9A84C" }}>● Actif</p>
          </div>
        </div>
        <div className="h-px mb-3" style={{ background: "rgba(255,255,255,0.08)" }} />
        <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.4)" }}>
          Membre depuis <span style={{ color: "rgba(255,255,255,0.75)" }}>13 mois</span> · Membre depuis le 12 Avril 2025
        </p>
      </div>

      {/* Avantages inclus */}
      <p className="text-[10px] font-bold tracking-widest uppercase mb-3 px-1" style={{ color: "#7A8A7A" }}>
        INCLUS DANS VOTRE PLAN
      </p>
      <div className="card-white overflow-hidden mb-4">
        {avantages.map(({ icon: Icon, label }, i) => (
          <div key={label}
            className="flex items-center gap-3 px-4 py-3.5"
            style={{ borderTop: i > 0 ? "1px solid #2A4A35" : "none" }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(201,168,76,0.12)" }}>
              <Icon size={14} style={{ color: "#C9A84C" }} />
            </div>
            <span className="text-sm font-medium flex-1" style={{ color: "#F5F0E8" }}>{label}</span>
            <Check size={14} style={{ color: "#C9A84C" }} />
          </div>
        ))}
      </div>

      {/* Historique */}
      <div className="card-white overflow-hidden mb-4">
        <div className="flex items-center gap-3 px-4 py-3.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#132B1E" }}>
            <Receipt size={14} style={{ color: "#7A8A7A" }} />
          </div>
          <span className="text-sm font-medium flex-1" style={{ color: "#F5F0E8" }}>Historique de facturation</span>
          <ChevronRight size={13} style={{ color: "#3A4A3A" }} />
        </div>
      </div>

      {/* Actions abonnement */}
      <div className="flex gap-2">
        <button className="flex-1 py-3 rounded-2xl text-sm font-semibold"
          style={{ background: "#132B1E", color: "#7A8A7A", border: "1px solid #2A4A35" }}>
          Modifier le plan
        </button>
        <button className="flex-1 py-3 rounded-2xl text-sm font-semibold"
          style={{ background: "rgba(192,64,64,0.1)", color: "#C04040", border: "1px solid rgba(192,64,64,0.15)" }}>
          Résilier
        </button>
      </div>

    </div>
  );
}
