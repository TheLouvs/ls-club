"use client";

import { useState } from "react";
import { Settings, CreditCard, Bell, HelpCircle, LogOut, Trophy, Play, Flame, ChevronRight, Target, Star, CheckCircle, Lock, X, Brain } from "lucide-react";
import Link from "next/link";
import { useGolfIndex } from "@/lib/hooks/useGolfIndex";
import { usePlayerProfile } from "@/lib/hooks/usePlayerProfile";

const stats = [
  { label: "Vidéos vues", value: "14", icon: Play, color: "#C9A84C", bg: "rgba(201,168,76,0.12)" },
  { label: "Jours de suite", value: "7", icon: Flame, color: "#D09030", bg: "rgba(176,90,16,0.12)" },
  { label: "Défis", value: "3", icon: Trophy, color: "#C9A84C", bg: "rgba(201,168,76,0.12)" },
];

const menuItems = [
  { icon: Bell, label: "Notifications", href: "/profil/notifications", iconColor: "#7AAEE8", iconBg: "rgba(74,124,191,0.12)" },
  { icon: CreditCard, label: "Abonnement", href: "/profil/abonnement", badge: "Premium", iconColor: "#C9A84C", iconBg: "rgba(201,168,76,0.12)" },
  { icon: Settings, label: "Paramètres", href: "/profil/parametres", iconColor: "#7A8A7A", iconBg: "#132B1E" },
  { icon: HelpCircle, label: "Aide & Support", href: "/profil/aide", iconColor: "#D09030", iconBg: "rgba(176,90,16,0.12)" },
];

const progression = [
  { title: "Les Fondamentaux", progress: 100, done: 8, total: 8 },
  { title: "Le Swing", progress: 40, done: 5, total: 12 },
];

const INSCRIPTION_INDEX = 24;
const OBJECTIF_TARGET = 15;

const achievements = [
  { label: "Première vidéo", icon: Play,         color: "#C9A84C", bg: "rgba(201,168,76,0.12)", earned: true  },
  { label: "7 jours de suite", icon: Flame,      color: "#D09030", bg: "rgba(176,90,16,0.12)",  earned: true  },
  { label: "Module terminé",  icon: CheckCircle, color: "#7AAEE8", bg: "rgba(74,124,191,0.12)", earned: true  },
  { label: "Pro du swing",    icon: Star,        color: "#C9A84C", bg: "rgba(201,168,76,0.12)", earned: false },
];

const POINTS_OPTIONS = ["Drive", "Putting", "Approche", "Bunker", "Short game", "Mental", "Règles"];
const FREQUENCE_OPTIONS = ["Moins d'1×/mois", "1×/mois", "2×/mois", "1×/semaine", "2-3×/semaine", "+3×/semaine"];
const NIVEAU_LABELS: Record<string, string> = { debutant: "Débutant", intermediaire: "Intermédiaire", avance: "Avancé" };

export default function ProfilPage() {
  const { index, updatedAt, daysSinceUpdate, neverSet } = useGolfIndex();
  const { profile, updateProfile } = usePlayerProfile();
  const [editingProfile, setEditingProfile] = useState(false);

  // Local draft state for the modal
  const [draft, setDraft] = useState({ ...profile });

  function openModal() {
    setDraft({ ...profile });
    setEditingProfile(true);
  }

  function saveProfile() {
    updateProfile(draft);
    setEditingProfile(false);
  }

  function togglePoint(point: string) {
    setDraft((d) => ({
      ...d,
      pointsAmeliorer: d.pointsAmeliorer.includes(point)
        ? d.pointsAmeliorer.filter((p) => p !== point)
        : [...d.pointsAmeliorer, point],
    }));
  }

  const objectifProgress = Math.max(
    0,
    Math.min(100, Math.round(((INSCRIPTION_INDEX - index) / (INSCRIPTION_INDEX - OBJECTIF_TARGET)) * 100))
  );

  const showUpdateNudge = neverSet || (daysSinceUpdate !== null && daysSinceUpdate > 60);
  void showUpdateNudge;

  return (
    <div className="px-4 py-3 md:px-8 max-w-3xl mx-auto w-full pb-6">

      <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: "#7A8A7A" }}>
        Mon profil
      </p>

      {/* Carte membre */}
      <div className="card-dark-green p-4 mb-3 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #C9A84C, transparent)" }} />
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "#C9A84C" }}>
            <span className="font-serif font-bold text-lg" style={{ color: "#1A3410" }}>TL</span>
          </div>
          <div>
            <h1 className="font-serif font-bold text-lg leading-tight" style={{ color: "#FFFFFF" }}>Thomas Louvrière</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-xs" style={{ color: "#C9A84C" }}>Index {index.toFixed(1)} · Membre LS Club</p>
              {profile.clubGolf && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)" }}>
                  {profile.clubGolf}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)" }}>
                Premium
              </span>
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Actif depuis le 12 Avril</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="card-white px-3 py-2 flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
              style={{ background: bg }}>
              <Icon size={11} style={{ color }} />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-base leading-none" style={{ color: "#F5F0E8" }}>{value}</p>
              <p className="text-[9px] mt-0.5 font-semibold leading-tight truncate" style={{ color: "#7A8A7A" }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Objectif */}
      <div className="card-white p-3 mb-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(201,168,76,0.12)" }}>
            <Target size={12} style={{ color: "#C9A84C" }} />
          </div>
          <p className="text-sm font-bold" style={{ color: "#F5F0E8" }}>Mon objectif</p>
        </div>
        <p className="text-xs font-medium mb-2" style={{ color: "#7A8A7A" }}>Passer à l&apos;index {OBJECTIF_TARGET} avant décembre</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${objectifProgress}%`, background: "linear-gradient(90deg, #C9A84C, #E8C870)" }} />
          </div>
          <span className="text-[10px] font-bold" style={{ color: "#C9A84C" }}>
            {index.toFixed(1)} → {OBJECTIF_TARGET}
          </span>
        </div>
      </div>

      {/* Profil golf IA */}
      <div className="card-white p-3 mb-3">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(201,168,76,0.12)" }}>
              <Brain size={12} style={{ color: "#C9A84C" }} />
            </div>
            <p className="text-sm font-bold" style={{ color: "#F5F0E8" }}>Mon profil golf</p>
          </div>
          <button
            onClick={openModal}
            className="text-xs font-semibold px-2.5 py-1 rounded-lg"
            style={{ background: "rgba(201,168,76,0.12)", color: "#C9A84C" }}
          >
            Modifier
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "#7A8A7A" }}>Niveau</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(201,168,76,0.1)", color: "#C9A84C" }}>
              {NIVEAU_LABELS[profile.niveau]}
            </span>
          </div>
          {profile.frequenceJeu && (
            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: "#7A8A7A" }}>Fréquence</span>
              <span className="text-xs font-medium" style={{ color: "#F5F0E8" }}>{profile.frequenceJeu}</span>
            </div>
          )}
          {profile.typeJeu && (
            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: "#7A8A7A" }}>Type de jeu</span>
              <span className="text-xs font-medium capitalize" style={{ color: "#F5F0E8" }}>{profile.typeJeu === "competition" ? "Compétition" : "Loisir"}</span>
            </div>
          )}
          {profile.clubGolf && (
            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: "#7A8A7A" }}>Club</span>
              <span className="text-xs font-medium" style={{ color: "#F5F0E8" }}>{profile.clubGolf}</span>
            </div>
          )}
          {profile.pointsAmeliorer.length > 0 && (
            <div>
              <p className="text-xs mb-1.5" style={{ color: "#7A8A7A" }}>Points à améliorer</p>
              <div className="flex flex-wrap gap-1">
                {profile.pointsAmeliorer.map((p) => (
                  <span key={p} className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(201,168,76,0.1)", color: "#C9A84C" }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}
          {profile.blessure && (
            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: "#7A8A7A" }}>Contrainte physique</span>
              <span className="text-xs font-medium" style={{ color: "#F5F0E8" }}>{profile.blessure}</span>
            </div>
          )}
          {!profile.frequenceJeu && !profile.typeJeu && !profile.clubGolf && profile.pointsAmeliorer.length === 0 && (
            <p className="text-xs" style={{ color: "#7A8A7A" }}>Complète ton profil pour que Lolo IA personnalise ses réponses.</p>
          )}
        </div>
      </div>

      {/* Progression */}
      <div className="card-white p-3 mb-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-bold" style={{ color: "#F5F0E8" }}>Ma progression</p>
          <Link href="/bibliotheque" className="text-xs font-semibold" style={{ color: "#C9A84C" }}>Voir tout →</Link>
        </div>
        <div className="space-y-2">
          {progression.map((m) => (
            <div key={m.title}>
              <div className="flex justify-between text-xs mb-1">
                <div>
                  <span className="font-medium" style={{ color: "#7A8A7A" }}>{m.title}</span>
                  <span className="ml-1.5 text-[10px]" style={{ color: "#7A8A7A" }}>{m.done}/{m.total} vidéos</span>
                </div>
                <span className="font-bold" style={{ color: "#C9A84C" }}>
                  {m.progress === 100 ? "✓ Terminé" : `${m.progress}%`}
                </span>
              </div>
              <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                <div className="h-full rounded-full" style={{
                  width: `${m.progress}%`,
                  background: "linear-gradient(90deg, #C9A84C, #DFC060)",
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="card-white p-3 mb-3">
        <p className="text-sm font-bold mb-2.5" style={{ color: "#F5F0E8" }}>Succès</p>
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {achievements.map(({ label, icon: Icon, color, bg, earned }) => (
            <div key={label} className="flex-shrink-0 flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl"
              style={{ background: earned ? bg : "#132B1E", minWidth: 72, opacity: earned ? 1 : 0.55 }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: earned ? color : "#2A4A35" }}>
                {earned
                  ? <Icon size={15} style={{ color: "#fff" }} />
                  : <Lock size={13} style={{ color: "#fff" }} />
                }
              </div>
              <p className="text-[9px] font-semibold text-center leading-tight" style={{ color: earned ? color : "#7A8A7A" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="card-white overflow-hidden mb-3">
        {menuItems.map(({ icon: Icon, label, href, badge, iconColor, iconBg }, i) => (
          <Link key={label} href={href}
            className="flex items-center gap-3 px-3 py-2.5 transition-colors"
            style={{ borderBottom: i < menuItems.length - 1 ? "1px solid #2A4A35" : "none" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1F4230"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: iconBg }}>
              <Icon size={13} style={{ color: iconColor }} />
            </div>
            <span className="text-sm font-medium flex-1" style={{ color: "#F5F0E8" }}>{label}</span>
            {badge && (
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full mr-1"
                style={{ background: "rgba(201,168,76,0.12)", color: "#C9A84C" }}>
                {badge}
              </span>
            )}
            <ChevronRight size={13} style={{ color: "#3A4A3A" }} />
          </Link>
        ))}
      </div>

      {/* Déconnexion */}
      <button className="w-full flex items-center justify-center gap-2 text-sm font-semibold py-3 rounded-2xl"
        style={{ color: "#C04040", background: "rgba(192,64,64,0.1)", border: "1px solid rgba(192,64,64,0.15)" }}>
        <LogOut size={14} />Se déconnecter
      </button>

      {/* Modal profil golf */}
      {editingProfile && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={() => setEditingProfile(false)}>
          <div className="w-full max-w-sm mx-4 mb-0 md:mb-0 rounded-t-2xl md:rounded-2xl p-5 max-h-[90vh] overflow-y-auto"
            style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}
            onClick={(e) => e.stopPropagation()}>

            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-sm" style={{ color: "#F5F0E8" }}>Mon profil golf</p>
              <button onClick={() => setEditingProfile(false)}>
                <X size={16} style={{ color: "#7A8A7A" }} />
              </button>
            </div>

            {/* Niveau */}
            <div className="mb-4">
              <p className="text-xs font-semibold mb-2" style={{ color: "#7A8A7A" }}>Niveau</p>
              <div className="flex gap-2">
                {(["debutant", "intermediaire", "avance"] as const).map((n) => (
                  <button key={n}
                    onClick={() => setDraft((d) => ({ ...d, niveau: n }))}
                    className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      background: draft.niveau === n ? "#C9A84C" : "#132B1E",
                      color: draft.niveau === n ? "#0F2318" : "#7A8A7A",
                      border: "1px solid",
                      borderColor: draft.niveau === n ? "#C9A84C" : "#2A4A35",
                    }}>
                    {NIVEAU_LABELS[n]}
                  </button>
                ))}
              </div>
            </div>

            {/* Points à améliorer */}
            <div className="mb-4">
              <p className="text-xs font-semibold mb-2" style={{ color: "#7A8A7A" }}>Points à améliorer</p>
              <div className="flex flex-wrap gap-1.5">
                {POINTS_OPTIONS.map((pt) => {
                  const active = draft.pointsAmeliorer.includes(pt);
                  return (
                    <button key={pt} onClick={() => togglePoint(pt)}
                      className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                      style={{
                        background: active ? "rgba(201,168,76,0.2)" : "#132B1E",
                        color: active ? "#C9A84C" : "#7A8A7A",
                        border: "1px solid",
                        borderColor: active ? "#C9A84C" : "#2A4A35",
                      }}>
                      {pt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Objectif d'index */}
            <div className="mb-4">
              <p className="text-xs font-semibold mb-2" style={{ color: "#7A8A7A" }}>Objectif d&apos;index</p>
              <input
                type="number"
                min={0} max={54} step={0.1}
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                style={{ background: "#132B1E", color: "#F5F0E8", border: "1px solid #2A4A35" }}
                placeholder="Ex : 12"
                value={draft.objectifIndex ?? ""}
                onChange={(e) => setDraft((d) => ({ ...d, objectifIndex: e.target.value ? parseFloat(e.target.value) : undefined }))}
              />
            </div>

            {/* Fréquence de jeu */}
            <div className="mb-4">
              <p className="text-xs font-semibold mb-2" style={{ color: "#7A8A7A" }}>Fréquence de jeu</p>
              <div className="flex flex-wrap gap-1.5">
                {FREQUENCE_OPTIONS.map((f) => {
                  const active = draft.frequenceJeu === f;
                  return (
                    <button key={f} onClick={() => setDraft((d) => ({ ...d, frequenceJeu: f }))}
                      className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                      style={{
                        background: active ? "rgba(201,168,76,0.2)" : "#132B1E",
                        color: active ? "#C9A84C" : "#7A8A7A",
                        border: "1px solid",
                        borderColor: active ? "#C9A84C" : "#2A4A35",
                      }}>
                      {f}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Type de jeu */}
            <div className="mb-4">
              <p className="text-xs font-semibold mb-2" style={{ color: "#7A8A7A" }}>Type de jeu</p>
              <div className="flex gap-2">
                {(["competition", "loisir"] as const).map((t) => (
                  <button key={t}
                    onClick={() => setDraft((d) => ({ ...d, typeJeu: t }))}
                    className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      background: draft.typeJeu === t ? "#C9A84C" : "#132B1E",
                      color: draft.typeJeu === t ? "#0F2318" : "#7A8A7A",
                      border: "1px solid",
                      borderColor: draft.typeJeu === t ? "#C9A84C" : "#2A4A35",
                    }}>
                    {t === "competition" ? "Compétition" : "Loisir"}
                  </button>
                ))}
              </div>
            </div>

            {/* Club de golf */}
            <div className="mb-4">
              <p className="text-xs font-semibold mb-2" style={{ color: "#7A8A7A" }}>Club de golf</p>
              <input
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                style={{ background: "#132B1E", color: "#F5F0E8", border: "1px solid #2A4A35" }}
                placeholder="Ex : Golf de Saint-Cloud"
                value={draft.clubGolf ?? ""}
                onChange={(e) => setDraft((d) => ({ ...d, clubGolf: e.target.value }))}
              />
            </div>

            {/* Blessure */}
            <div className="mb-5">
              <p className="text-xs font-semibold mb-2" style={{ color: "#7A8A7A" }}>Contrainte physique (optionnel)</p>
              <input
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                style={{ background: "#132B1E", color: "#F5F0E8", border: "1px solid #2A4A35" }}
                placeholder="Ex : douleur au dos, genou fragile…"
                value={draft.blessure ?? ""}
                onChange={(e) => setDraft((d) => ({ ...d, blessure: e.target.value || undefined }))}
              />
            </div>

            <button
              className="w-full py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: "#C9A84C", color: "#0F2318" }}
              onClick={saveProfile}
            >
              Enregistrer
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
