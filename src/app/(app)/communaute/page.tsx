"use client";

import { useState } from "react";
import {
  Heart, MessageCircle, Share2, Trophy, Plus, ArrowLeft,
  Users, Clock, Gift, CheckCircle, ImagePlus, X, Copy, Send, Image
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

type Post = {
  id: number;
  user: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  liked: boolean;
  hasMedia: boolean;
  mockComments: { user: string; avatar: string; text: string }[];
};

type LeaderboardEntry = {
  rank: number;
  user: string;
  avatar: string;
  score: string;
  likes: number;
};

type Challenge = {
  id: number;
  title: string;
  category: string;
  description: string;
  rules: string[];
  howToParticipate: string[];
  prize: string;
  participants: number;
  deadline: string;
  daysLeft: number;
  leaderboard: LeaderboardEntry[];
};

// ─── Mock data ────────────────────────────────────────────────────────────────

const initialPosts: Post[] = [
  {
    id: 1, user: "Thomas L.", avatar: "TL", time: "il y a 2h",
    content: "Premier eagle de ma vie aujourd'hui sur le trou 7 ! La méthode de Laurent sur le driver commence vraiment à payer 🎉",
    likes: 24, comments: 8, liked: false, hasMedia: true,
    mockComments: [
      { user: "Marie F.", avatar: "MF", text: "Félicitations ! C'est un souvenir inoubliable 🏆" },
      { user: "Paul D.", avatar: "PD", text: "Incroyable, quel trou c'était ?" },
      { user: "Sophie R.", avatar: "SR", text: "La méthode LS fait des miracles, bravo !" },
    ],
  },
  {
    id: 2, user: "Marie F.", avatar: "MF", time: "il y a 5h",
    content: "Question sur le grip : j'ai tendance à trop serrer le club sous pression. Lolo IA m'a donné des super conseils, mais vous avez des astuces personnelles ?",
    likes: 12, comments: 15, liked: true, hasMedia: false,
    mockComments: [
      { user: "Thomas L.", avatar: "TL", text: "Pense à tenir le club comme si c'était un oiseau — ni trop fort, ni trop léger." },
      { user: "Julien M.", avatar: "JM", text: "Exercice : tenir une feuille de papier sous chaque main, ça force la légèreté." },
    ],
  },
  {
    id: 3, user: "Paul D.", avatar: "PD", time: "il y a 1j",
    content: "J'ai terminé le Module 1 ! 8 leçons en une semaine, les bases sont enfin claires. Le Module 2 m'attend 💪",
    likes: 31, comments: 6, liked: false, hasMedia: false,
    mockComments: [
      { user: "Sophie R.", avatar: "SR", text: "Bravo Paul ! Le Module 2 est encore meilleur 🔥" },
      { user: "Marie F.", avatar: "MF", text: "Super rythme, continue comme ça !" },
    ],
  },
  {
    id: 4, user: "Sophie R.", avatar: "SR", time: "il y a 2j",
    content: "Mon swing avant/après 3 semaines de travail sur la rotation avec la méthode LS. La différence est incroyable.",
    likes: 67, comments: 22, liked: false, hasMedia: true,
    mockComments: [
      { user: "Thomas L.", avatar: "TL", text: "Wow, la différence est énorme sur la rotation des hanches !" },
      { user: "Paul D.", avatar: "PD", text: "Ça m'encourage vraiment, merci de partager 👏" },
      { user: "Julien M.", avatar: "JM", text: "Tu as mis combien de temps avant de sentir le changement ?" },
    ],
  },
];

const challenges: Challenge[] = [
  {
    id: 1,
    title: "Putting à 5 mètres",
    category: "Putting",
    description: "Testez votre régularité sur les putts de 5 mètres — le vrai écart entre les niveaux. Un classement communautaire détermine le meilleur putteur du mois.",
    rules: [
      "Filmer 3 essais consécutifs sans interruption",
      "Comptabiliser les putts réussis sur 10 tentatives",
      "Utiliser n'importe quel green (practice ou parcours)",
      "Une seule soumission par participant",
    ],
    howToParticipate: [
      "Filmez-vous en train de réaliser 10 putts à 5 mètres",
      "Publiez votre vidéo avec votre score dans les commentaires du challenge",
      "La communauté vote pour les meilleures techniques",
      "Laurent sélectionne le grand gagnant en fin de semaine",
    ],
    prize: "Analyse personnalisée de votre putting par Laurent",
    participants: 48,
    deadline: "3 jours restants",
    daysLeft: 3,
    leaderboard: [
      { rank: 1, user: "Sophie R.", avatar: "SR", score: "8/10", likes: 34 },
      { rank: 2, user: "Thomas L.", avatar: "TL", score: "7/10", likes: 28 },
      { rank: 3, user: "Paul D.", avatar: "PD", score: "6/10", likes: 19 },
      { rank: 4, user: "Marie F.", avatar: "MF", score: "6/10", likes: 15 },
      { rank: 5, user: "Julien M.", avatar: "JM", score: "5/10", likes: 11 },
    ],
  },
  {
    id: 2,
    title: "Mon meilleur drive",
    category: "Drive",
    description: "Publiez la vidéo de votre drive le plus solide de la semaine. Technique, distance, régularité — tout compte dans le vote communautaire.",
    rules: [
      "Vidéo en face ou de côté (vue complète du swing)",
      "Drive réalisé sur un vrai parcours ou driving range",
      "Inclure la distance approximative si possible",
      "Pas de ralenti — vitesse normale uniquement",
    ],
    howToParticipate: [
      "Choisissez votre meilleur drive de la semaine",
      "Filmez la séquence complète du swing",
      "Publiez avec le hashtag #MonMeilleurDrive",
      "La communauté vote, les 3 premiers reçoivent un badge",
    ],
    prize: "Badge « Longue Distance » + session live avec Laurent",
    participants: 32,
    deadline: "5 jours restants",
    daysLeft: 5,
    leaderboard: [
      { rank: 1, user: "Julien M.", avatar: "JM", score: "285m", likes: 41 },
      { rank: 2, user: "Thomas L.", avatar: "TL", score: "272m", likes: 29 },
      { rank: 3, user: "Paul D.", avatar: "PD", score: "258m", likes: 22 },
      { rank: 4, user: "Sophie R.", avatar: "SR", score: "241m", likes: 18 },
      { rank: 5, user: "Marie F.", avatar: "MF", score: "229m", likes: 14 },
    ],
  },
  {
    id: 3,
    title: "Chip & Run parfait",
    category: "Petit jeu",
    description: "Maîtrisez le chip & run depuis 10 mètres du green. La précision prime sur la distance — visez le plus proche du drapeau.",
    rules: [
      "Utiliser uniquement un fer 7, 8 ou 9",
      "Départ à 10 mètres maximum du green",
      "Filmer le résultat complet jusqu'à l'arrêt de la balle",
      "Mesurer la distance finale au drapeau",
    ],
    howToParticipate: [
      "Trouvez une situation de chip réaliste sur le parcours",
      "Réalisez 3 tentatives et soumettez la meilleure",
      "Précisez le club utilisé et la distance au drapeau",
      "Le plus proche du drapeau gagne",
    ],
    prize: "Module « Petit jeu » offert + coaching personnalisé",
    participants: 19,
    deadline: "7 jours restants",
    daysLeft: 7,
    leaderboard: [
      { rank: 1, user: "Marie F.", avatar: "MF", score: "42 cm", likes: 27 },
      { rank: 2, user: "Sophie R.", avatar: "SR", score: "68 cm", likes: 21 },
      { rank: 3, user: "Thomas L.", avatar: "TL", score: "91 cm", likes: 16 },
      { rank: 4, user: "Paul D.", avatar: "PD", score: "1,2 m", likes: 9 },
      { rank: 5, user: "Julien M.", avatar: "JM", score: "1,8 m", likes: 7 },
    ],
  },
];

const avatarBgs = [
  "rgba(201,168,76,0.15)",
  "rgba(74,124,191,0.15)",
  "rgba(155,85,201,0.15)",
  "rgba(176,112,32,0.15)",
  "rgba(192,64,96,0.15)",
];
const avatarColors = ["#DFC060", "#7AAEE8", "#B080E0", "#D09030", "#E06080"];

const rankMedals: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

// ─── Component ────────────────────────────────────────────────────────────────

export default function CommunautePage() {
  const [activeTab, setActiveTab] = useState<"feed" | "challenges" | "membres">("feed");

  // Feed state
  const [postsList, setPostsList] = useState<Post[]>(initialPosts);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set([2]));
  const [openComments, setOpenComments] = useState<Set<number>>(new Set());
  const [shareOpenId, setShareOpenId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Publish modal state
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostHasMedia, setNewPostHasMedia] = useState(false);

  // Challenge detail state
  const [selectedChallengeId, setSelectedChallengeId] = useState<number | null>(null);
  const [submittedChallenges, setSubmittedChallenges] = useState<Set<number>>(new Set());

  function toggleLike(id: number) {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleComments(id: number) {
    setShareOpenId(null);
    setOpenComments((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function handleShare(id: number) {
    setOpenComments((prev) => { const s = new Set(prev); s.delete(id); return s; });
    setShareOpenId((prev) => (prev === id ? null : id));
  }

  function handleCopyLink(id: number) {
    setCopiedId(id);
    setShareOpenId(null);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function handlePublish() {
    if (!newPostContent.trim()) return;
    const newPost: Post = {
      id: Date.now(),
      user: "Vous",
      avatar: "ME",
      time: "À l'instant",
      content: newPostContent.trim(),
      likes: 0,
      comments: 0,
      liked: false,
      hasMedia: newPostHasMedia,
      mockComments: [],
    };
    setPostsList((prev) => [newPost, ...prev]);
    setNewPostContent("");
    setNewPostHasMedia(false);
    setShowPublishModal(false);
  }

  const selectedChallenge = challenges.find((c) => c.id === selectedChallengeId) ?? null;

  return (
    <div className="px-4 py-4 pb-6 md:px-8 max-w-2xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] font-bold tracking-widest uppercase mb-0.5" style={{ color: "#7A8A7A" }}>
            La famille LS Club
          </p>
          <h1 className="font-serif text-2xl font-bold" style={{ color: "#F5F0E8" }}>Communauté</h1>
        </div>
        <button
          onClick={() => setShowPublishModal(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold select-none
            transition-all duration-150 hover:scale-105 hover:brightness-110 active:scale-95"
          style={{ background: "#C9A84C", color: "#0F2318" }}
        >
          <Plus size={13} />Publier
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {(["feed", "challenges", "membres"] as const).map((key) => (
          <button key={key} onClick={() => { setActiveTab(key); setSelectedChallengeId(null); }}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize select-none",
              "transition-all duration-150",
              activeTab === key
                ? "hover:brightness-110 active:scale-95"
                : "hover:scale-105 hover:shadow-sm active:scale-95"
            )}
            style={activeTab === key ? {
              background: "#C9A84C",
              color: "#0F2318",
            } : {
              background: "#1B3A2A",
              color: "#7A8A7A",
              border: "1px solid #2A4A35",
            }}
          >
            {key === "feed" ? "Feed" : key === "challenges" ? "Challenges" : "Membres"}
          </button>
        ))}
      </div>

      {/* ── FEED ── */}
      {activeTab === "feed" && (
        <div className="flex flex-col" style={{ gap: 10 }}>
          {postsList.map((post, i) => {
            const isLiked = likedPosts.has(post.id);
            const commentsOpen = openComments.has(post.id);
            const shareOpen = shareOpenId === post.id;
            return (
              <div
                key={post.id}
                className="card-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                style={{ paddingTop: 14, paddingBottom: 14, paddingLeft: 16, paddingRight: 16 }}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                    transition-transform duration-150 hover:scale-110"
                    style={{ background: avatarBgs[i % avatarBgs.length] }}>
                    <span className="text-xs font-bold" style={{ color: avatarColors[i % avatarColors.length] }}>{post.avatar}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold leading-tight" style={{ color: "#F5F0E8" }}>{post.user}</p>
                    <p className="text-[10px]" style={{ color: "#7A8A7A" }}>{post.time}</p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-3" style={{ color: "#7A8A7A" }}>{post.content}</p>

                {post.hasMedia && (
                  <div className="rounded-xl flex items-center justify-center gap-2 mb-3"
                    style={{ background: "#132B1E", border: "1px solid #2A4A35", height: 60 }}>
                    <Image size={14} style={{ color: "#7A8A7A" }} />
                    <p className="text-xs font-medium" style={{ color: "#7A8A7A" }}>Vidéo / Photo</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-4 pt-3 relative" style={{ borderTop: "1px solid #2A4A35" }}>
                  <button
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center gap-1 text-xs font-semibold select-none
                      transition-all duration-150 hover:scale-110 active:scale-90"
                    style={{ color: isLiked ? "#e8507a" : "#7A8A7A" }}
                  >
                    <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
                    {post.likes + (isLiked && !post.liked ? 1 : !isLiked && post.liked ? -1 : 0)}
                  </button>
                  <button
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center gap-1 text-xs font-semibold select-none
                      transition-all duration-150 hover:scale-110 active:scale-90"
                    style={{ color: commentsOpen ? "#C9A84C" : "#7A8A7A" }}
                  >
                    <MessageCircle size={14} fill={commentsOpen ? "currentColor" : "none"} />
                    {post.comments}
                  </button>

                  {/* Share */}
                  <div className="ml-auto relative">
                    <button
                      onClick={() => handleShare(post.id)}
                      className="flex items-center gap-1 text-xs font-semibold select-none
                        transition-all duration-150 hover:scale-110 active:scale-90"
                      style={{ color: copiedId === post.id ? "#C9A84C" : "#7A8A7A" }}
                    >
                      <Share2 size={13} />
                      {copiedId === post.id ? "Copié !" : "Partager"}
                    </button>
                    {shareOpen && (
                      <div className="absolute bottom-7 right-0 rounded-xl shadow-lg z-10 overflow-hidden"
                        style={{ background: "#1B3A2A", border: "1px solid #2A4A35", minWidth: 160 }}>
                        <button
                          onClick={() => handleCopyLink(post.id)}
                          className="flex items-center gap-2 w-full px-3 py-2.5 text-xs font-semibold text-left transition-colors duration-150"
                          style={{ color: "#F5F0E8" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1F4230"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                        >
                          <Copy size={13} style={{ color: "#7A8A7A" }} />Copier le lien
                        </button>
                        <button
                          onClick={() => setShareOpenId(null)}
                          className="flex items-center gap-2 w-full px-3 py-2.5 text-xs font-semibold text-left transition-colors duration-150"
                          style={{ color: "#F5F0E8", borderTop: "1px solid #2A4A35" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1F4230"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                        >
                          <Send size={13} style={{ color: "#7A8A7A" }} />Partager dans le feed
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Comments section */}
                {commentsOpen && (
                  <div className="mt-3 pt-3" style={{ borderTop: "1px solid #2A4A35" }}>
                    {post.mockComments.length > 0 && (
                      <div className="flex flex-col gap-2.5 mb-3">
                        {post.mockComments.map((c, ci) => (
                          <div key={ci} className="flex gap-2 items-start
                            transition-transform duration-150 hover:translate-x-0.5">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{ background: avatarBgs[ci % avatarBgs.length] }}>
                              <span className="text-[9px] font-bold" style={{ color: avatarColors[ci % avatarColors.length] }}>{c.avatar}</span>
                            </div>
                            <div className="flex-1 rounded-xl px-3 py-2" style={{ background: "#132B1E" }}>
                              <p className="text-[10px] font-bold mb-0.5" style={{ color: "#F5F0E8" }}>{c.user}</p>
                              <p className="text-xs leading-relaxed" style={{ color: "#7A8A7A" }}>{c.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2 items-center">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(201,168,76,0.12)" }}>
                        <span className="text-[9px] font-bold" style={{ color: "#C9A84C" }}>ME</span>
                      </div>
                      <div className="flex-1 rounded-xl px-3 py-2 text-xs cursor-text transition-all duration-150"
                        style={{ background: "#132B1E", color: "#7A8A7A", border: "1px solid #2A4A35" }}>
                        Écrire un commentaire...
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── CHALLENGES ── */}
      {activeTab === "challenges" && !selectedChallenge && (
        <div className="flex flex-col gap-3">
          {/* Featured */}
          <div
            className="card-dark-green p-5 relative overflow-hidden cursor-pointer
              transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110"
            onClick={() => setSelectedChallengeId(challenges[0].id)}
          >
            <p className="text-[10px] font-bold tracking-widest uppercase mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
              Challenge actif · {challenges[0].category}
            </p>
            <p className="font-serif font-bold text-xl mb-1.5" style={{ color: "#FFFFFF" }}>{challenges[0].title}</p>
            <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
              {challenges[0].description.split(" — ")[0]}
            </p>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5">
                <Users size={11} style={{ color: "rgba(255,255,255,0.5)" }} />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{challenges[0].participants} participants</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={11} style={{ color: "rgba(255,255,255,0.5)" }} />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{challenges[0].deadline}</span>
              </div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedChallengeId(challenges[0].id); }}
              className="px-4 py-2 rounded-xl text-xs font-bold select-none
                transition-all duration-150 hover:scale-105 hover:brightness-110 active:scale-95"
              style={{ background: "#C9A84C", color: "#0F2318" }}
            >
              Participer →
            </button>
          </div>

          {/* List */}
          {challenges.slice(1).map((c) => (
            <div
              key={c.id}
              className="card-white p-4 flex items-center gap-3 cursor-pointer
                transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              onClick={() => setSelectedChallengeId(c.id)}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                transition-transform duration-150 hover:scale-110"
                style={{ background: "rgba(201,168,76,0.12)" }}>
                <Trophy size={15} style={{ color: "#C9A84C" }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: "#F5F0E8" }}>{c.title}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs font-semibold" style={{ color: "#C9A84C" }}>{c.participants} participants</span>
                  <span style={{ color: "#3A4A3A" }}>·</span>
                  <span className="text-xs" style={{ color: "#7A8A7A" }}>{c.deadline}</span>
                </div>
              </div>
              <button
                className="text-xs font-bold px-3 py-1.5 rounded-xl select-none
                  transition-all duration-150 hover:scale-105 active:scale-95"
                style={{ background: "rgba(201,168,76,0.12)", color: "#C9A84C" }}
                onClick={(e) => { e.stopPropagation(); setSelectedChallengeId(c.id); }}
              >
                Jouer
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── CHALLENGE DETAIL ── */}
      {activeTab === "challenges" && selectedChallenge && (
        <div className="flex flex-col gap-3">
          {/* Back */}
          <button
            onClick={() => setSelectedChallengeId(null)}
            className="flex items-center gap-1.5 text-xs font-semibold w-fit mb-1 select-none
              transition-all duration-150 hover:-translate-x-1 hover:brightness-75 active:scale-95"
            style={{ color: "#7A8A7A" }}
          >
            <ArrowLeft size={14} />Retour aux challenges
          </button>

          {/* Hero */}
          <div className="card-dark-green p-5 relative overflow-hidden">
            <p className="text-[10px] font-bold tracking-widest uppercase mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
              {selectedChallenge.category}
            </p>
            <p className="font-serif font-bold text-2xl mb-2" style={{ color: "#FFFFFF" }}>{selectedChallenge.title}</p>
            <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>{selectedChallenge.description}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Users size={12} style={{ color: "rgba(255,255,255,0.5)" }} />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{selectedChallenge.participants} participants</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={12} style={{ color: "rgba(255,255,255,0.5)" }} />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{selectedChallenge.deadline}</span>
              </div>
            </div>
          </div>

          {/* Prize */}
          <div className="card-white p-4 flex items-center gap-3
            transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
              transition-transform duration-150 hover:scale-110"
              style={{ background: "rgba(201,168,76,0.12)" }}>
              <Gift size={15} style={{ color: "#C9A84C" }} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide mb-0.5" style={{ color: "#7A8A7A" }}>Prix à gagner</p>
              <p className="text-sm font-semibold" style={{ color: "#F5F0E8" }}>{selectedChallenge.prize}</p>
            </div>
          </div>

          {/* How to participate */}
          <div className="card-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "#7A8A7A" }}>Comment participer</p>
            <div className="flex flex-col gap-2.5">
              {selectedChallenge.howToParticipate.map((step, i) => (
                <div key={i} className="flex gap-3 items-start
                  transition-transform duration-150 hover:translate-x-1">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "#C9A84C" }}>
                    <span className="text-[10px] font-bold" style={{ color: "#0F2318" }}>{i + 1}</span>
                  </div>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "#7A8A7A" }}>{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div className="card-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "#7A8A7A" }}>Règles du challenge</p>
            <div className="flex flex-col gap-2">
              {selectedChallenge.rules.map((rule, i) => (
                <div key={i} className="flex gap-2.5 items-start
                  transition-transform duration-150 hover:translate-x-1">
                  <CheckCircle size={13} className="flex-shrink-0 mt-0.5" style={{ color: "#C9A84C" }} />
                  <p className="text-sm" style={{ color: "#7A8A7A" }}>{rule}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="card-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "#7A8A7A" }}>Classement actuel</p>
            <div className="flex flex-col gap-2">
              {selectedChallenge.leaderboard.map((entry, i) => (
                <div
                  key={entry.rank}
                  className="flex items-center gap-3 rounded-xl p-3
                    transition-all duration-150 hover:scale-[1.02] hover:shadow-sm cursor-default"
                  style={{
                    background: entry.rank === 1 ? "rgba(201,168,76,0.12)" : "#132B1E",
                    border: entry.rank === 1 ? "1px solid rgba(201,168,76,0.3)" : "1px solid transparent",
                  }}
                >
                  <span className="text-base w-6 text-center">{rankMedals[entry.rank] ?? `#${entry.rank}`}</span>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: avatarBgs[i % avatarBgs.length] }}>
                    <span className="text-[10px] font-bold" style={{ color: avatarColors[i % avatarColors.length] }}>{entry.avatar}</span>
                  </div>
                  <p className="flex-1 text-sm font-semibold" style={{ color: "#F5F0E8" }}>{entry.user}</p>
                  <span className="text-xs font-bold px-2 py-1 rounded-lg"
                    style={{ background: "rgba(201,168,76,0.12)", color: entry.rank === 1 ? "#C9A84C" : "#7A8A7A" }}>
                    {entry.score}
                  </span>
                  <div className="flex items-center gap-1 text-xs" style={{ color: "#7A8A7A" }}>
                    <Heart size={11} style={{ color: "#e8507a" }} />
                    {entry.likes}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit CTA */}
          <button
            onClick={() => setSubmittedChallenges((prev) => { const s = new Set(prev); s.add(selectedChallenge.id); return s; })}
            className="w-full py-3.5 rounded-xl text-sm font-bold select-none
              transition-all duration-150 hover:scale-[1.01] hover:brightness-105 active:scale-[0.99]"
            style={submittedChallenges.has(selectedChallenge.id) ? {
              background: "rgba(201,168,76,0.12)",
              color: "#C9A84C",
              border: "1px solid rgba(201,168,76,0.3)",
            } : {
              background: "#C9A84C",
              color: "#0F2318",
            }}
          >
            {submittedChallenges.has(selectedChallenge.id)
              ? "✓ Participation soumise"
              : "Soumettre ma participation"}
          </button>
        </div>
      )}

      {/* ── MEMBRES ── */}
      {activeTab === "membres" && (
        <div className="card-white p-8 text-center">
          <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center
            transition-transform duration-300 hover:scale-110 hover:rotate-6"
            style={{ background: "rgba(201,168,76,0.1)" }}>
            <span className="text-2xl">👥</span>
          </div>
          <p className="font-serif font-semibold text-base" style={{ color: "#F5F0E8" }}>Bientôt disponible</p>
          <p className="text-xs mt-1" style={{ color: "#7A8A7A" }}>L&apos;annuaire des membres arrive prochainement</p>
        </div>
      )}

      {/* ── PUBLISH MODAL ── */}
      {showPublishModal && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowPublishModal(false); }}
        >
          <div className="w-full max-w-lg rounded-2xl p-5 flex flex-col gap-4"
            style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}>
            {/* Modal header */}
            <div className="flex items-center justify-between">
              <p className="font-serif font-bold text-lg" style={{ color: "#F5F0E8" }}>Nouvelle publication</p>
              <button
                onClick={() => setShowPublishModal(false)}
                className="transition-all duration-150 hover:scale-110 hover:rotate-90 active:scale-90"
                style={{ color: "#7A8A7A" }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Author row */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(201,168,76,0.12)" }}>
                <span className="text-xs font-bold" style={{ color: "#C9A84C" }}>ME</span>
              </div>
              <p className="text-sm font-bold" style={{ color: "#F5F0E8" }}>Vous</p>
            </div>

            {/* Textarea */}
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Partagez une victoire, une question, un conseil..."
              rows={4}
              className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-all duration-150"
              style={{
                background: "#132B1E",
                border: "1px solid #2A4A35",
                color: "#F5F0E8",
              }}
            />

            {/* Media preview */}
            {newPostHasMedia && (
              <div className="rounded-xl h-24 flex items-center justify-center"
                style={{ background: "#132B1E", border: "1px solid #2A4A35" }}>
                <p className="text-xs font-medium" style={{ color: "#7A8A7A" }}>Vidéo / Photo ajoutée</p>
              </div>
            )}

            {/* Media button */}
            <button
              onClick={() => setNewPostHasMedia((v) => !v)}
              className="flex items-center gap-2 text-xs font-semibold w-fit px-3 py-2 rounded-xl select-none
                transition-all duration-150 hover:scale-105 active:scale-95"
              style={newPostHasMedia ? {
                background: "rgba(201,168,76,0.12)",
                color: "#C9A84C",
              } : {
                background: "#132B1E",
                color: "#7A8A7A",
              }}
            >
              <ImagePlus size={14} />
              {newPostHasMedia ? "Retirer la photo/vidéo" : "Ajouter une photo / vidéo"}
            </button>

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setShowPublishModal(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold select-none
                  transition-all duration-150 hover:brightness-95 active:scale-[0.98]"
                style={{ background: "#132B1E", color: "#7A8A7A" }}
              >
                Annuler
              </button>
              <button
                onClick={handlePublish}
                disabled={!newPostContent.trim()}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold select-none
                  transition-all duration-150 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: newPostContent.trim() ? "#C9A84C" : "#2A4A35",
                  color: newPostContent.trim() ? "#0F2318" : "#3A4A3A",
                }}
              >
                Publier
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
