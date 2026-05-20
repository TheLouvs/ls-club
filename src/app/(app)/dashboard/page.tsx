import { Radio, Play, Flame, Clock, TrendingDown, ChevronRight, Users, MapPin, Target, CalendarDays } from "lucide-react";
import Link from "next/link";

const isLiveNow = false;
const liveData = { title: "Maîtriser le driver", viewers: 342 };
const resumeData = {
  title: "La rotation des hanches",
  module: "Module 2",
  lesson: "Leçon 3",
  duration: "12 min",
  progress: 60,
  href: "/bibliotheque/module-2",
};
const userStats = {
  streak: 7,
  videosWatched: 14,
  totalTime: "3h20",
  golfIndex: 18,
  memberSince: "12 Avril 2025",
  modulesCompleted: 1,
  totalModules: 4,
  indexInscription: 24,
  indexActuel: 18,
};
const activeModules = [
  { id: 1, title: "Les Fondamentaux", lessons: 8, progress: 100, done: true },
  { id: 2, title: "Le Swing", lessons: 12, progress: 40, done: false },
];
const recentVideos = [
  { title: "La rotation des hanches", module: "Module 2", duration: "12 min", color: "#1A3410" },
  { title: "Grip et posture", module: "Module 1", duration: "8 min", color: "#1E3D18" },
  { title: "Le chip shot parfait", module: "Short Game", duration: "15 min", color: "#2A3A10" },
  { title: "Gestion du stress", module: "Mental", duration: "10 min", color: "#1A2E1A" },
];

const recommendedVideos = [
  { title: "Le putting sous pression", module: "Short Game", duration: "9 min", color: "#1A3A2A" },
  { title: "Lire un green en pente", module: "Stratégie", duration: "11 min", color: "#2A3A10" },
  { title: "Sortie de bunker", module: "Module 3", duration: "7 min", color: "#1E2A3A" },
  { title: "Le drive en fade", module: "Module 2", duration: "13 min", color: "#1A3410" },
];

const nextSession = {
  date: "Samedi 17 mai",
  time: "10h00",
  title: "Masterclass : Le jeu court",
  description: "Focus sur le chipping, le pitching et le putting",
};

const STATS = [
  { label: "Handicap", value: userStats.indexActuel, icon: TrendingDown, bg: "rgba(201,168,76,0.1)", color: "#C9A84C" },
  { label: "Streak", value: `${userStats.streak}j`, icon: Flame, bg: "rgba(232,160,32,0.1)", color: "#E8A020" },
  { label: "Vidéos", value: userStats.videosWatched, icon: Play, bg: "rgba(201,168,76,0.1)", color: "#C9A84C" },
  { label: "Temps", value: userStats.totalTime, icon: Clock, bg: "rgba(201,168,76,0.08)", color: "#C9A84C" },
];

export default function DashboardPage() {
  const progressPercent = Math.round((userStats.modulesCompleted / userStats.totalModules) * 100);

  return (
    <div className="px-4 py-3 md:px-8 max-w-4xl mx-auto">

      {/* Header + Stats (desktop: inline row) */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <div className="flex items-center gap-1 mb-0.5">
            <MapPin size={10} style={{ color: "#7A8A7A" }} />
            <p className="text-[10px] font-medium" style={{ color: "#7A8A7A" }}>LS Club · Index {userStats.golfIndex}</p>
          </div>
          <h1 className="font-serif text-2xl font-bold" style={{ color: "#F5F0E8" }}>Bonjour, Thomas !</h1>
          <p className="text-xs mt-0.5" style={{ color: "#7A8A7A" }}>Membre depuis le {userStats.memberSince}</p>
        </div>
        {/* Stats desktop */}
        <div className="hidden md:flex gap-1.5 flex-shrink-0">
          {STATS.map(({ label, value, icon: Icon, bg, color }) => (
            <div key={label} className="card-white-sm px-2.5 py-2 flex items-center gap-1.5">
              <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: bg }}>
                <Icon size={11} style={{ color }} />
              </div>
              <div>
                <p className="text-[8px] font-semibold tracking-widest uppercase leading-none" style={{ color: "#7A8A7A" }}>{label}</p>
                <p className="text-xs font-bold leading-tight" style={{ color: "#F5F0E8" }}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats mobile */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-4 px-4 md:hidden mb-3">
        {STATS.map(({ label, value, icon: Icon, bg, color }) => (
          <div key={label} className="card-white-sm flex-shrink-0 px-2.5 py-2 flex items-center gap-1.5">
            <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: bg }}>
              <Icon size={11} style={{ color }} />
            </div>
            <div>
              <p className="text-[8px] font-semibold tracking-widest uppercase leading-none" style={{ color: "#7A8A7A" }}>{label}</p>
              <p className="text-xs font-bold leading-tight" style={{ color: "#F5F0E8" }}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Hero card */}
      <div className="mb-3">
        {isLiveNow ? (
          <Link href="/live">
            <div className="card-dark-green relative overflow-hidden p-4">
              <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, #C9A84C, transparent)" }} />
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  EN DIRECT
                </div>
                <div className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-full"
                  style={{ background: "rgba(0,0,0,0.3)", color: "rgba(245,240,232,0.7)" }}>
                  <Users size={10} />{liveData.viewers} spectateurs
                </div>
              </div>
              <p className="font-serif font-bold text-xl leading-tight mb-1" style={{ color: "#F5F0E8" }}>{liveData.title}</p>
              <p className="text-xs mb-3" style={{ color: "rgba(245,240,232,0.5)" }}>Laurent Seinger · En direct</p>
              <div className="inline-flex items-center gap-2 font-bold text-sm px-4 py-2 rounded-xl"
                style={{ background: "#C9A84C", color: "#0F2318" }}>
                <Radio size={14} />Rejoindre le live
              </div>
            </div>
          </Link>
        ) : (
          <Link href={resumeData.href}>
            <div className="card-dark-green relative overflow-hidden p-4">
              <div className="absolute -left-6 -bottom-6 w-32 h-32 rounded-full opacity-15"
                style={{ background: "radial-gradient(circle, #C9A84C, transparent)" }} />
              <p className="text-[10px] font-bold tracking-widest uppercase mb-1.5" style={{ color: "rgba(245,240,232,0.4)" }}>
                Reprendre
              </p>
              <p className="font-serif font-bold text-xl leading-tight mb-0.5" style={{ color: "#F5F0E8" }}>{resumeData.title}</p>
              <p className="text-xs mb-3" style={{ color: "rgba(245,240,232,0.4)" }}>
                {resumeData.module} · {resumeData.lesson} · {resumeData.duration}
              </p>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs" style={{ color: "rgba(245,240,232,0.4)" }}>{resumeData.progress}% complété</span>
                <div className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-1.5 rounded-xl"
                  style={{ background: "#C9A84C", color: "#0F2318" }}>
                  <Play size={12} fill="#0F2318" />Reprendre
                </div>
              </div>
              <div className="h-1.5 rounded-full" style={{ background: "rgba(245,240,232,0.1)" }}>
                <div className="h-full rounded-full" style={{ width: `${resumeData.progress}%`, background: "#C9A84C" }} />
              </div>
            </div>
          </Link>
        )}
      </div>

      {/* Index + Modules — 2 colonnes desktop */}
      <div className="grid md:grid-cols-2 gap-5 mb-4">

        {/* Index */}
        <div>
          <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#7A8A7A" }}>Mes informations</p>
          <div className="card-white p-3 flex gap-0">
            <div className="flex-1 text-center">
              <p className="text-[9px] font-semibold uppercase tracking-wide mb-1" style={{ color: "#7A8A7A" }}>Index inscription</p>
              <p className="text-xl font-bold" style={{ color: "#F5F0E8" }}>{userStats.indexInscription}</p>
            </div>
            <div className="w-px self-stretch mx-2" style={{ background: "#2A4A35" }} />
            <div className="flex-1 text-center">
              <p className="text-[9px] font-semibold uppercase tracking-wide mb-1" style={{ color: "#7A8A7A" }}>Index actuel</p>
              <p className="text-xl font-bold" style={{ color: "#C9A84C" }}>{userStats.indexActuel}</p>
              {userStats.indexActuel < userStats.indexInscription && (
                <p className="text-[10px] flex items-center justify-center gap-0.5 mt-0.5" style={{ color: "#C9A84C" }}>
                  <TrendingDown size={10} />-{userStats.indexInscription - userStats.indexActuel} pts
                </p>
              )}
            </div>
            <div className="w-px self-stretch mx-2" style={{ background: "#2A4A35" }} />
            <div className="flex-1 text-center">
              <p className="text-[9px] font-semibold uppercase tracking-wide mb-1" style={{ color: "#7A8A7A" }}>Progression</p>
              <p className="text-xl font-bold" style={{ color: "#F5F0E8" }}>{progressPercent}%</p>
            </div>
          </div>
        </div>

        {/* Modules */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#7A8A7A" }}>Continuer</p>
            <Link href="/bibliotheque" className="text-xs font-semibold" style={{ color: "#C9A84C" }}>
              Tout voir →
            </Link>
          </div>
          <div className="flex flex-col gap-1.5">
            {activeModules.map((m) => (
              <Link key={m.id} href={`/bibliotheque/module-${m.id}`} className="card-white flex items-center gap-3 p-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.25)" }}>
                  <span className="text-sm font-bold" style={{ color: "#C9A84C" }}>{m.id}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold" style={{ color: "#F5F0E8" }}>{m.title}</p>
                    {m.done
                      ? <span className="text-xs font-bold" style={{ color: "#C9A84C" }}>✓</span>
                      : <span className="text-xs font-semibold" style={{ color: "#7A8A7A" }}>{m.progress}%</span>
                    }
                  </div>
                  <div className="h-1 rounded-full" style={{ background: "#1F3828" }}>
                    <div className="h-full rounded-full" style={{
                      width: `${m.progress}%`,
                      background: m.done ? "#C9A84C" : "linear-gradient(90deg, #8A6A28, #C9A84C)",
                    }} />
                  </div>
                  <p className="text-[10px] mt-0.5" style={{ color: "#7A8A7A" }}>{m.lessons} leçons</p>
                </div>
                <ChevronRight size={14} style={{ color: "#2A4A35" }} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Nouveautés */}
      <div className="mt-5">
        <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#7A8A7A" }}>Nouveautés</p>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4">
          {recentVideos.map((v) => (
            <div key={v.title} className="card-white flex-shrink-0 w-36 md:w-auto overflow-hidden cursor-pointer">
              <div className="h-[72px] flex items-center justify-center relative"
                style={{ background: `linear-gradient(145deg, ${v.color}, #1E3A14)` }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.15)" }}>
                  <Play size={12} fill="white" style={{ color: "white" }} />
                </div>
                <span className="absolute bottom-1 right-1 text-[9px] font-semibold text-white/70 bg-black/30 px-1.5 py-0.5 rounded">
                  {v.duration}
                </span>
              </div>
              <div className="p-2">
                <p className="text-[11px] font-semibold leading-tight line-clamp-2" style={{ color: "#F5F0E8" }}>{v.title}</p>
                <p className="text-[9px] mt-0.5" style={{ color: "#7A8A7A" }}>{v.module}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommandé pour vous */}
      <div className="mt-6">
        <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#7A8A7A" }}>Recommandé pour vous</p>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4">
          {recommendedVideos.map((v) => (
            <div key={v.title} className="card-white flex-shrink-0 w-36 md:w-auto overflow-hidden cursor-pointer">
              <div className="h-[72px] flex items-center justify-center relative"
                style={{ background: `linear-gradient(145deg, ${v.color}, #1E3A14)` }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.15)" }}>
                  <Play size={12} fill="white" style={{ color: "white" }} />
                </div>
                <span className="absolute bottom-1 right-1 text-[9px] font-semibold text-white/70 bg-black/30 px-1.5 py-0.5 rounded">
                  {v.duration}
                </span>
              </div>
              <div className="p-2">
                <p className="text-[11px] font-semibold leading-tight line-clamp-2" style={{ color: "#F5F0E8" }}>{v.title}</p>
                <p className="text-[9px] mt-0.5" style={{ color: "#7A8A7A" }}>{v.module}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prochaine session live */}
      <div className="mt-6 mb-2">
        <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#7A8A7A" }}>Prochaine session live</p>
        <div className="card-white relative overflow-hidden p-4 flex items-center gap-4" style={{
          borderLeft: "3px solid #C9A84C",
          background: "rgba(201,168,76,0.04)",
        }}>
          {/* Pulsing dot — top-right */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#E05050" }} />
          </div>

          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(201,168,76,0.1)" }}>
            <CalendarDays size={22} style={{ color: "#C9A84C" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold" style={{ color: "#F5F0E8" }}>{nextSession.title}</p>
            <p className="text-xs mt-0.5 truncate" style={{ color: "#7A8A7A" }}>{nextSession.description}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(201,168,76,0.12)", color: "#C9A84C" }}>
                {nextSession.date}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "#1F3828", color: "#C9A84C" }}>
                {nextSession.time}
              </span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl"
              style={{ background: "#C9A84C", color: "#0F2318" }}>
              <Target size={12} />S'inscrire
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
