"use client";

import { ArrowLeft, ChevronRight, User, Globe, Ruler, Bell, Lock, Check, X, Mail, TrendingDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useGolfIndex } from "@/lib/hooks/useGolfIndex";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default function ParametresPage() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [editingIndex, setEditingIndex] = useState(false);
  const { index, updatedAt, history, neverSet, updateIndex } = useGolfIndex();
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="px-4 py-4 md:px-8 max-w-3xl mx-auto w-full">

      <div className="flex items-center gap-3 mb-4">
        <Link href="/profil" className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}>
          <ArrowLeft size={15} style={{ color: "#7A8A7A" }} />
        </Link>
        <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#7A8A7A" }}>
          Paramètres
        </p>
      </div>

      {/* Mon profil */}
      <p className="text-[10px] font-bold tracking-widest uppercase mb-3 px-1" style={{ color: "#7A8A7A" }}>
        MON PROFIL
      </p>
      <div className="card-white overflow-hidden mb-4">
        <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: "1px solid #2A4A35" }}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#132B1E" }}>
            <User size={14} style={{ color: "#7A8A7A" }} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-semibold" style={{ color: "#7A8A7A" }}>NOM</p>
            <p className="text-sm font-medium" style={{ color: "#F5F0E8" }}>Thomas Louvrière</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: "1px solid #2A4A35" }}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#132B1E" }}>
            <Mail size={14} style={{ color: "#7A8A7A" }} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-semibold" style={{ color: "#7A8A7A" }}>EMAIL</p>
            <p className="text-sm font-medium" style={{ color: "#F5F0E8" }}>thomas@exemple.fr</p>
          </div>
        </div>
        <div style={{ borderBottom: "1px solid #2A4A35" }}>
          {/* Ligne principale index */}
          <div className="flex items-center gap-3 px-4 py-3.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: neverSet ? "rgba(201,168,76,0.12)" : "#132B1E" }}>
              <span className="text-xs font-bold" style={{ color: neverSet ? "#C9A84C" : "#7A8A7A" }}>
                {Math.round(index)}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-semibold" style={{ color: "#7A8A7A" }}>INDEX OFFICIEL</p>
              {editingIndex ? (
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="54"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="text-sm font-medium bg-transparent outline-none border-b w-20"
                  style={{ color: "#F5F0E8", borderColor: "#C9A84C" }}
                  autoFocus
                  placeholder={String(index)}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium" style={{ color: "#F5F0E8" }}>{index.toFixed(1)}</p>
                  {updatedAt && (
                    <p className="text-[10px]" style={{ color: "#7A8A7A" }}>
                      Mis à jour le {formatDate(updatedAt.toISOString())}
                    </p>
                  )}
                </div>
              )}
            </div>
            {editingIndex ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const v = parseFloat(inputValue);
                    if (!isNaN(v) && v >= 0 && v <= 54) updateIndex(Math.round(v * 10) / 10);
                    setEditingIndex(false);
                  }}
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(201,168,76,0.12)" }}>
                  <Check size={13} style={{ color: "#C9A84C" }} />
                </button>
                <button
                  onClick={() => setEditingIndex(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(192,64,64,0.12)" }}>
                  <X size={13} style={{ color: "#C04040" }} />
                </button>
              </div>
            ) : (
              <button onClick={() => { setInputValue(String(index)); setEditingIndex(true); }}>
                <ChevronRight size={13} style={{ color: "#3A4A3A" }} />
              </button>
            )}
          </div>

          {/* Encart si jamais renseigné */}
          {neverSet && (
            <div className="mx-4 mb-3 px-3 py-2.5 rounded-xl flex items-center gap-2"
              style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.25)" }}>
              <span className="text-xs" style={{ color: "#C9A84C" }}>
                Renseigne ton index officiel pour que Lolo IA puisse personnaliser tes conseils.
              </span>
            </div>
          )}

          {/* Historique */}
          {history.length > 0 && (
            <div className="px-4 pb-3">
              <p className="text-[9px] font-bold tracking-widest uppercase mb-2" style={{ color: "#3A4A3A" }}>
                HISTORIQUE
              </p>
              <div className="space-y-1">
                {history.slice(0, 3).map((entry, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <TrendingDown size={10} style={{ color: entry.to < entry.from ? "#C9A84C" : "#D09030" }} />
                    <span className="text-[11px] font-medium" style={{ color: "#7A8A7A" }}>
                      {entry.from.toFixed(1)} → {entry.to.toFixed(1)}
                    </span>
                    <span className="text-[10px]" style={{ color: "#7A8A7A" }}>
                      {new Date(entry.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 px-4 py-3.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#132B1E" }}>
            <span className="text-[10px] font-bold" style={{ color: "#7A8A7A" }}>LS</span>
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-semibold" style={{ color: "#7A8A7A" }}>MEMBRE DEPUIS</p>
            <p className="text-sm font-medium" style={{ color: "#F5F0E8" }}>12 Avril 2025</p>
          </div>
        </div>
      </div>

      {/* Préférences */}
      <p className="text-[10px] font-bold tracking-widest uppercase mb-3 px-1" style={{ color: "#7A8A7A" }}>
        PRÉFÉRENCES
      </p>
      <div className="card-white overflow-hidden mb-4">
        <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: "1px solid #2A4A35" }}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#132B1E" }}>
            <Globe size={14} style={{ color: "#7A8A7A" }} />
          </div>
          <span className="text-sm font-medium flex-1" style={{ color: "#F5F0E8" }}>Langue</span>
          <span className="text-sm" style={{ color: "#7A8A7A" }}>Français</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: "1px solid #2A4A35" }}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#132B1E" }}>
            <Ruler size={14} style={{ color: "#7A8A7A" }} />
          </div>
          <span className="text-sm font-medium flex-1" style={{ color: "#F5F0E8" }}>Unités de distance</span>
          <span className="text-sm" style={{ color: "#7A8A7A" }}>Mètres</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#132B1E" }}>
            <Bell size={14} style={{ color: "#7A8A7A" }} />
          </div>
          <span className="text-sm font-medium flex-1" style={{ color: "#F5F0E8" }}>Notifications push</span>
          <button
            onClick={() => setPushEnabled((v) => !v)}
            className="w-11 h-6 rounded-full flex items-center px-0.5 transition-colors duration-200"
            style={{ background: pushEnabled ? "#C9A84C" : "#2A4A35" }}>
            <div className="w-5 h-5 rounded-full transition-all duration-200"
              style={{ background: "#FFFFFF", marginLeft: pushEnabled ? "auto" : "0", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
          </button>
        </div>
      </div>

      {/* Compte */}
      <p className="text-[10px] font-bold tracking-widest uppercase mb-3 px-1" style={{ color: "#7A8A7A" }}>
        COMPTE
      </p>
      <div className="card-white overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#132B1E" }}>
            <Lock size={14} style={{ color: "#7A8A7A" }} />
          </div>
          <span className="text-sm font-medium flex-1" style={{ color: "#F5F0E8" }}>Changer de mot de passe</span>
          <ChevronRight size={13} style={{ color: "#3A4A3A" }} />
        </div>
      </div>

    </div>
  );
}
