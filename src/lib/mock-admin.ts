// ============================================================
// Mock data pour le dashboard admin LS Club
// ============================================================

export type Member = {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatarColor: string;
  handicap: number;
  level: "debutant" | "intermediaire" | "avance";
  subscription: "active" | "inactive";
  joinedAt: string;
  lastActive: string;
  streak: number;
  totalVideosWatched: number;
  totalMinutes: number;
};

export type VideoProgress = {
  memberId: string;
  moduleId: string;
  moduleName: string;
  level: "debutant" | "intermediaire" | "avance";
  totalLessons: number;
  completedLessons: number;
  lastWatchedAt: string;
  completedAt?: string;
};

export type IAQuestion = {
  id: string;
  memberId: string;
  type: "discussion" | "swing" | "strategie";
  question: string;
  answer: string;
  createdAt: string;
};

export type ActivityEvent = {
  id: string;
  memberId: string;
  type:
    | "video_watched"
    | "question_asked"
    | "challenge_completed"
    | "login"
    | "module_completed";
  description: string;
  createdAt: string;
  meta?: Record<string, string | number>;
};

// ─────────────────────────────────────────────
// MEMBRES
// ─────────────────────────────────────────────

export const MEMBERS: Member[] = [
  {
    id: "m1",
    name: "Sophie Moreau",
    email: "sophie.moreau@gmail.com",
    initials: "SM",
    avatarColor: "#DFF0C4",
    handicap: 12,
    level: "intermediaire",
    subscription: "active",
    joinedAt: "2025-01-15",
    lastActive: "2026-05-11",
    streak: 14,
    totalVideosWatched: 38,
    totalMinutes: 510,
  },
  {
    id: "m2",
    name: "Thomas Dupont",
    email: "thomas.dupont@orange.fr",
    initials: "TD",
    avatarColor: "#EAF2FC",
    handicap: 24,
    level: "debutant",
    subscription: "active",
    joinedAt: "2025-02-03",
    lastActive: "2026-05-10",
    streak: 7,
    totalVideosWatched: 22,
    totalMinutes: 290,
  },
  {
    id: "m3",
    name: "Camille Leroy",
    email: "camille.leroy@hotmail.fr",
    initials: "CL",
    avatarColor: "#FFF5E4",
    handicap: 8,
    level: "avance",
    subscription: "active",
    joinedAt: "2024-12-20",
    lastActive: "2026-05-11",
    streak: 21,
    totalVideosWatched: 54,
    totalMinutes: 720,
  },
  {
    id: "m4",
    name: "Nicolas Bernard",
    email: "n.bernard@sfr.fr",
    initials: "NB",
    avatarColor: "#F0E8F8",
    handicap: 18,
    level: "intermediaire",
    subscription: "inactive",
    joinedAt: "2025-03-10",
    lastActive: "2026-04-20",
    streak: 0,
    totalVideosWatched: 15,
    totalMinutes: 180,
  },
  {
    id: "m5",
    name: "Isabelle Martin",
    email: "i.martin@gmail.com",
    initials: "IM",
    avatarColor: "#FFE8E8",
    handicap: 30,
    level: "debutant",
    subscription: "active",
    joinedAt: "2025-04-05",
    lastActive: "2026-05-09",
    streak: 5,
    totalVideosWatched: 11,
    totalMinutes: 145,
  },
  {
    id: "m6",
    name: "Julien Petit",
    email: "julien.petit@free.fr",
    initials: "JP",
    avatarColor: "#E8F5E8",
    handicap: 6,
    level: "avance",
    subscription: "active",
    joinedAt: "2024-11-01",
    lastActive: "2026-05-11",
    streak: 31,
    totalVideosWatched: 67,
    totalMinutes: 890,
  },
  {
    id: "m7",
    name: "Marie-Claire Durand",
    email: "mc.durand@wanadoo.fr",
    initials: "MD",
    avatarColor: "#FFF0D4",
    handicap: 16,
    level: "intermediaire",
    subscription: "active",
    joinedAt: "2025-01-28",
    lastActive: "2026-05-08",
    streak: 3,
    totalVideosWatched: 29,
    totalMinutes: 380,
  },
  {
    id: "m8",
    name: "Antoine Richard",
    email: "antoine.richard@gmail.com",
    initials: "AR",
    avatarColor: "#E4EEFF",
    handicap: 22,
    level: "debutant",
    subscription: "active",
    joinedAt: "2025-05-01",
    lastActive: "2026-05-07",
    streak: 2,
    totalVideosWatched: 8,
    totalMinutes: 95,
  },
  {
    id: "m9",
    name: "Élodie Roux",
    email: "elodie.roux@gmail.com",
    initials: "ER",
    avatarColor: "#DFFAF0",
    handicap: 10,
    level: "avance",
    subscription: "inactive",
    joinedAt: "2025-02-14",
    lastActive: "2026-03-15",
    streak: 0,
    totalVideosWatched: 41,
    totalMinutes: 550,
  },
  {
    id: "m10",
    name: "François Blanc",
    email: "f.blanc@yahoo.fr",
    initials: "FB",
    avatarColor: "#F5E8FF",
    handicap: 14,
    level: "intermediaire",
    subscription: "active",
    joinedAt: "2025-03-22",
    lastActive: "2026-05-10",
    streak: 9,
    totalVideosWatched: 33,
    totalMinutes: 430,
  },
];

// ─────────────────────────────────────────────
// MODULES VIDÉO
// ─────────────────────────────────────────────

export const MODULES = [
  { id: "grip", name: "Grip & Posture", level: "debutant" as const, totalLessons: 6 },
  { id: "swing_base", name: "Swing de base", level: "debutant" as const, totalLessons: 8 },
  { id: "putting", name: "Putting", level: "debutant" as const, totalLessons: 5 },
  { id: "fer_court", name: "Fers courts", level: "intermediaire" as const, totalLessons: 7 },
  { id: "bois_hybrides", name: "Bois & Hybrides", level: "intermediaire" as const, totalLessons: 6 },
  { id: "sortie_rough", name: "Sortie de rough", level: "intermediaire" as const, totalLessons: 5 },
  { id: "driver", name: "Driver & distance", level: "avance" as const, totalLessons: 8 },
  { id: "bunker", name: "Jeu de bunker", level: "avance" as const, totalLessons: 6 },
  { id: "mental", name: "Mental & stratégie", level: "avance" as const, totalLessons: 7 },
];

// ─────────────────────────────────────────────
// PROGRESSIONS VIDÉO
// ─────────────────────────────────────────────

export const VIDEO_PROGRESS: VideoProgress[] = [
  // Sophie Moreau (m1) - intermédiaire
  { memberId: "m1", moduleId: "grip", moduleName: "Grip & Posture", level: "debutant", totalLessons: 6, completedLessons: 6, lastWatchedAt: "2026-04-10", completedAt: "2026-04-10" },
  { memberId: "m1", moduleId: "swing_base", moduleName: "Swing de base", level: "debutant", totalLessons: 8, completedLessons: 8, lastWatchedAt: "2026-04-18", completedAt: "2026-04-18" },
  { memberId: "m1", moduleId: "putting", moduleName: "Putting", level: "debutant", totalLessons: 5, completedLessons: 5, lastWatchedAt: "2026-04-22", completedAt: "2026-04-22" },
  { memberId: "m1", moduleId: "fer_court", moduleName: "Fers courts", level: "intermediaire", totalLessons: 7, completedLessons: 5, lastWatchedAt: "2026-05-08" },
  { memberId: "m1", moduleId: "bois_hybrides", moduleName: "Bois & Hybrides", level: "intermediaire", totalLessons: 6, completedLessons: 2, lastWatchedAt: "2026-05-05" },
  { memberId: "m1", moduleId: "sortie_rough", moduleName: "Sortie de rough", level: "intermediaire", totalLessons: 5, completedLessons: 0, lastWatchedAt: "2026-05-01" },

  // Thomas Dupont (m2) - débutant
  { memberId: "m2", moduleId: "grip", moduleName: "Grip & Posture", level: "debutant", totalLessons: 6, completedLessons: 6, lastWatchedAt: "2026-03-20", completedAt: "2026-03-20" },
  { memberId: "m2", moduleId: "swing_base", moduleName: "Swing de base", level: "debutant", totalLessons: 8, completedLessons: 4, lastWatchedAt: "2026-05-10" },
  { memberId: "m2", moduleId: "putting", moduleName: "Putting", level: "debutant", totalLessons: 5, completedLessons: 1, lastWatchedAt: "2026-04-15" },

  // Camille Leroy (m3) - avancé
  { memberId: "m3", moduleId: "grip", moduleName: "Grip & Posture", level: "debutant", totalLessons: 6, completedLessons: 6, lastWatchedAt: "2025-01-10", completedAt: "2025-01-10" },
  { memberId: "m3", moduleId: "swing_base", moduleName: "Swing de base", level: "debutant", totalLessons: 8, completedLessons: 8, lastWatchedAt: "2025-01-28", completedAt: "2025-01-28" },
  { memberId: "m3", moduleId: "putting", moduleName: "Putting", level: "debutant", totalLessons: 5, completedLessons: 5, lastWatchedAt: "2025-02-05", completedAt: "2025-02-05" },
  { memberId: "m3", moduleId: "fer_court", moduleName: "Fers courts", level: "intermediaire", totalLessons: 7, completedLessons: 7, lastWatchedAt: "2025-03-01", completedAt: "2025-03-01" },
  { memberId: "m3", moduleId: "bois_hybrides", moduleName: "Bois & Hybrides", level: "intermediaire", totalLessons: 6, completedLessons: 6, lastWatchedAt: "2025-03-20", completedAt: "2025-03-20" },
  { memberId: "m3", moduleId: "sortie_rough", moduleName: "Sortie de rough", level: "intermediaire", totalLessons: 5, completedLessons: 5, lastWatchedAt: "2025-04-05", completedAt: "2025-04-05" },
  { memberId: "m3", moduleId: "driver", moduleName: "Driver & distance", level: "avance", totalLessons: 8, completedLessons: 8, lastWatchedAt: "2026-02-10", completedAt: "2026-02-10" },
  { memberId: "m3", moduleId: "bunker", moduleName: "Jeu de bunker", level: "avance", totalLessons: 6, completedLessons: 5, lastWatchedAt: "2026-05-01" },
  { memberId: "m3", moduleId: "mental", moduleName: "Mental & stratégie", level: "avance", totalLessons: 7, completedLessons: 3, lastWatchedAt: "2026-05-11" },

  // Nicolas Bernard (m4) - intermédiaire, inactif
  { memberId: "m4", moduleId: "grip", moduleName: "Grip & Posture", level: "debutant", totalLessons: 6, completedLessons: 6, lastWatchedAt: "2025-04-01", completedAt: "2025-04-01" },
  { memberId: "m4", moduleId: "swing_base", moduleName: "Swing de base", level: "debutant", totalLessons: 8, completedLessons: 3, lastWatchedAt: "2026-03-15" },

  // Isabelle Martin (m5) - débutant
  { memberId: "m5", moduleId: "grip", moduleName: "Grip & Posture", level: "debutant", totalLessons: 6, completedLessons: 4, lastWatchedAt: "2026-05-09" },
  { memberId: "m5", moduleId: "swing_base", moduleName: "Swing de base", level: "debutant", totalLessons: 8, completedLessons: 2, lastWatchedAt: "2026-05-07" },

  // Julien Petit (m6) - avancé, le plus actif
  { memberId: "m6", moduleId: "grip", moduleName: "Grip & Posture", level: "debutant", totalLessons: 6, completedLessons: 6, lastWatchedAt: "2024-11-15", completedAt: "2024-11-15" },
  { memberId: "m6", moduleId: "swing_base", moduleName: "Swing de base", level: "debutant", totalLessons: 8, completedLessons: 8, lastWatchedAt: "2024-12-01", completedAt: "2024-12-01" },
  { memberId: "m6", moduleId: "putting", moduleName: "Putting", level: "debutant", totalLessons: 5, completedLessons: 5, lastWatchedAt: "2024-12-10", completedAt: "2024-12-10" },
  { memberId: "m6", moduleId: "fer_court", moduleName: "Fers courts", level: "intermediaire", totalLessons: 7, completedLessons: 7, lastWatchedAt: "2025-01-15", completedAt: "2025-01-15" },
  { memberId: "m6", moduleId: "bois_hybrides", moduleName: "Bois & Hybrides", level: "intermediaire", totalLessons: 6, completedLessons: 6, lastWatchedAt: "2025-02-01", completedAt: "2025-02-01" },
  { memberId: "m6", moduleId: "sortie_rough", moduleName: "Sortie de rough", level: "intermediaire", totalLessons: 5, completedLessons: 5, lastWatchedAt: "2025-02-20", completedAt: "2025-02-20" },
  { memberId: "m6", moduleId: "driver", moduleName: "Driver & distance", level: "avance", totalLessons: 8, completedLessons: 8, lastWatchedAt: "2025-05-01", completedAt: "2025-05-01" },
  { memberId: "m6", moduleId: "bunker", moduleName: "Jeu de bunker", level: "avance", totalLessons: 6, completedLessons: 6, lastWatchedAt: "2026-01-20", completedAt: "2026-01-20" },
  { memberId: "m6", moduleId: "mental", moduleName: "Mental & stratégie", level: "avance", totalLessons: 7, completedLessons: 6, lastWatchedAt: "2026-05-11" },

  // Marie-Claire Durand (m7)
  { memberId: "m7", moduleId: "grip", moduleName: "Grip & Posture", level: "debutant", totalLessons: 6, completedLessons: 6, lastWatchedAt: "2025-02-15", completedAt: "2025-02-15" },
  { memberId: "m7", moduleId: "swing_base", moduleName: "Swing de base", level: "debutant", totalLessons: 8, completedLessons: 7, lastWatchedAt: "2026-04-20" },
  { memberId: "m7", moduleId: "putting", moduleName: "Putting", level: "debutant", totalLessons: 5, completedLessons: 3, lastWatchedAt: "2026-04-28" },
  { memberId: "m7", moduleId: "fer_court", moduleName: "Fers courts", level: "intermediaire", totalLessons: 7, completedLessons: 2, lastWatchedAt: "2026-05-08" },

  // Antoine Richard (m8) - débutant récent
  { memberId: "m8", moduleId: "grip", moduleName: "Grip & Posture", level: "debutant", totalLessons: 6, completedLessons: 3, lastWatchedAt: "2026-05-07" },
  { memberId: "m8", moduleId: "swing_base", moduleName: "Swing de base", level: "debutant", totalLessons: 8, completedLessons: 1, lastWatchedAt: "2026-05-05" },

  // Élodie Roux (m9) - inactive
  { memberId: "m9", moduleId: "grip", moduleName: "Grip & Posture", level: "debutant", totalLessons: 6, completedLessons: 6, lastWatchedAt: "2025-03-01", completedAt: "2025-03-01" },
  { memberId: "m9", moduleId: "swing_base", moduleName: "Swing de base", level: "debutant", totalLessons: 8, completedLessons: 8, lastWatchedAt: "2025-03-25", completedAt: "2025-03-25" },
  { memberId: "m9", moduleId: "putting", moduleName: "Putting", level: "debutant", totalLessons: 5, completedLessons: 5, lastWatchedAt: "2025-04-05", completedAt: "2025-04-05" },
  { memberId: "m9", moduleId: "fer_court", moduleName: "Fers courts", level: "intermediaire", totalLessons: 7, completedLessons: 6, lastWatchedAt: "2026-02-10" },
  { memberId: "m9", moduleId: "driver", moduleName: "Driver & distance", level: "avance", totalLessons: 8, completedLessons: 3, lastWatchedAt: "2026-03-01" },

  // François Blanc (m10)
  { memberId: "m10", moduleId: "grip", moduleName: "Grip & Posture", level: "debutant", totalLessons: 6, completedLessons: 6, lastWatchedAt: "2025-04-10", completedAt: "2025-04-10" },
  { memberId: "m10", moduleId: "swing_base", moduleName: "Swing de base", level: "debutant", totalLessons: 8, completedLessons: 8, lastWatchedAt: "2025-05-05", completedAt: "2025-05-05" },
  { memberId: "m10", moduleId: "putting", moduleName: "Putting", level: "debutant", totalLessons: 5, completedLessons: 4, lastWatchedAt: "2026-04-15" },
  { memberId: "m10", moduleId: "fer_court", moduleName: "Fers courts", level: "intermediaire", totalLessons: 7, completedLessons: 4, lastWatchedAt: "2026-05-10" },
  { memberId: "m10", moduleId: "bois_hybrides", moduleName: "Bois & Hybrides", level: "intermediaire", totalLessons: 6, completedLessons: 1, lastWatchedAt: "2026-05-08" },
];

// ─────────────────────────────────────────────
// QUESTIONS IA
// ─────────────────────────────────────────────

export const IA_QUESTIONS: IAQuestion[] = [
  {
    id: "q1", memberId: "m1", type: "discussion",
    question: "Comment améliorer ma constance dans les fers moyens ?",
    answer: "La constance dans les fers moyens passe avant tout par une posture stable et un plan de swing répétable. Je recommande de travailler sur 3 points : 1) La position des pieds (légèrement plus larges que les épaules), 2) La balle centrée ou légèrement en avant du centre, 3) Un swing à 80% de puissance en privilégiant la précision. Faites 50 répétitions par jour avec un 7-fer avant d'élargir à d'autres clubs.",
    createdAt: "2026-05-11T09:23:00",
  },
  {
    id: "q2", memberId: "m3", type: "swing",
    question: "Mon swing part trop à l'intérieur, j'ai tendance à faire des hooks. Comment corriger ?",
    answer: "Un swing trop in-to-in produit effectivement des hooks. Les causes principales sont : fermeture de la face à l'impact et chemin de club trop intérieur. Exercice correctif : placez une bouteille d'eau à 20cm de votre balle (côté intérieur). Votre objectif est de frapper la balle sans toucher la bouteille, ce qui vous forcera à attaquer de l'extérieur. Filmez-vous de derrière pour vérifier votre plan.",
    createdAt: "2026-05-11T08:45:00",
  },
  {
    id: "q3", memberId: "m6", type: "strategie",
    question: "Trou 12 du Golf de Chiberta, par 4 dogleg gauche avec eau à gauche — comment jouer ce trou ?",
    answer: "Pour ce dogleg gauche avec eau, la stratégie conservatrice consiste à jouer votre driver ou 3-bois vers la droite du fairway (côté rough droit), ce qui élimine le risque de l'eau. Depuis cette position, il vous reste typiquement 160-180m vers un green légèrement surélevé. Choisissez un club donnant 10m de marge à droite. Le par est toujours jouable. N'essayez de couper le dogleg que si vous maîtrisez parfaitement la fade contrôlée.",
    createdAt: "2026-05-10T16:30:00",
  },
  {
    id: "q4", memberId: "m2", type: "discussion",
    question: "Je débute, combien de fois par semaine dois-je pratiquer pour progresser ?",
    answer: "Pour un débutant, la régularité prime sur la quantité. Je recommande 3 séances courtes (45 min) plutôt qu'une longue séance hebdomadaire. Alternez : 1 séance putting, 1 séance coups courts (pitching), 1 séance sur le practice avec fers. Les 3 premières semaines, concentrez-vous uniquement sur le grip, la posture et le contact — pas sur la distance. Vous verrez des progrès rapides avec cette méthode.",
    createdAt: "2026-05-10T14:15:00",
  },
  {
    id: "q5", memberId: "m7", type: "swing",
    question: "J'arrive pas à faire lever la balle avec mes hybrides, elle rase le sol.",
    answer: "Ce problème classique vient souvent de plusieurs erreurs : balle trop en arrière du stance, essai de 'lifter' la balle (ce qui fait l'inverse), ou un sweep trop prononcé. Avec un hybride : placez la balle en avant du centre, gardez votre poids légèrement à gauche (60%), et frappez la balle EN DESCENDENT comme un fer. L'angle de loft fera monter la balle naturellement. Ne cherchez pas à l'aider.",
    createdAt: "2026-05-10T11:00:00",
  },
  {
    id: "q6", memberId: "m5", type: "discussion",
    question: "Quelle est la différence entre un pitching wedge et un sand wedge ?",
    answer: "Excellente question pour une débutante ! Le pitching wedge (PW, ~46°) est votre club d'approche standard pour des distances de 80-120m. Il a peu de rebond, idéal pour des coups depuis le fairway. Le sand wedge (SW, ~56°) est conçu pour le sable avec beaucoup de rebond — il 'rebondit' dans le sable plutôt que de s'y planter. Il est aussi utilisé pour les coups courts autour du green (50m et moins). Commencez par maîtriser le PW avant d'utiliser le SW.",
    createdAt: "2026-05-09T17:45:00",
  },
  {
    id: "q7", memberId: "m1", type: "strategie",
    question: "Comment gérer la pression lors d'un tournoi de club ?",
    answer: "La pression en tournoi est une compétence qui se travaille. 3 techniques efficaces : 1) Routine pré-coup identique à l'entraînement (2 pratiques, 1 coup, toujours). 2) Respiration box : inspirez 4s, retenez 4s, expirez 4s — avant chaque coup difficile. 3) Focalisez-vous sur votre routine, pas le score. Acceptez que vous ferez des bogeys — l'objectif est de limiter les 'grosses' erreurs (double ou plus). Un tour à votre handicap normal est un excellent résultat en tournoi.",
    createdAt: "2026-05-09T10:20:00",
  },
  {
    id: "q8", memberId: "m6", type: "swing",
    question: "Mon driver monte trop haut et perd de la distance. Lance angle trop élevé ?",
    answer: "Un launch angle trop élevé avec le driver (au-delà de 15-16°) fait effectivement perdre de la distance. Causes probables : position de la balle trop en avant (face ouverte + effet slice), tee trop haut, ou attaque trop en montée. Corrections : 1) Tee la balle à mi-hauteur de la couronne du driver, 2) Balle alignée avec votre talon avant, 3) Visez un légère attaque en montée (2-3°) mais pas exagérée. Un driver spin autour de 2500 rpm avec 12-13° de launch est optimal.",
    createdAt: "2026-05-08T15:30:00",
  },
  {
    id: "q9", memberId: "m10", type: "discussion",
    question: "Comment mieux lire les greens pour le putting ?",
    answer: "La lecture de green est un art qui s'améliore avec la méthode. Mon approche en 4 étapes : 1) Approche à 5m derrière la balle, yeux mi-hauteur — lecture globale. 2) Vue latérale depuis le côté (à mi-chemin) — pente droite/gauche. 3) Derrière le trou — lecture montante/descendante. 4) Visualisez l'arc de la balle, pas juste le départ. Règle pratique : les greens brisent toujours légèrement vers l'eau ou vers le point bas du terrain. La vitesse compte autant que la ligne.",
    createdAt: "2026-05-08T09:10:00",
  },
  {
    id: "q10", memberId: "m3", type: "discussion",
    question: "Comment progresser de l'index 8 vers l'index 5 ?",
    answer: "Passer de 8 à 5 est un saut significatif qui nécessite une approche ciblée. À ce niveau, vos progrès viendront de : 1) Eliminer les 'grosses' erreurs — un triple bogey détruit un score. Jouez conservateur. 2) GIR (Greens in regulation) — visez 8-10 greens par tour. 3) Putting à courte distance (<2m) : 95%+ de réussite. 4) Coups de récupération — depuis le rough ou bunker, visez le green ou le fairway, jamais un coup risqué. Tenez un stats sheet pendant 10 tours pour identifier vos faiblesses précises.",
    createdAt: "2026-05-07T16:00:00",
  },
  {
    id: "q11", memberId: "m8", type: "discussion",
    question: "Quel équipement me conseilles-tu pour bien débuter ?",
    answer: "Pour bien débuter sans se ruiner : un demi-set suffit largement. Je recommande : Driver (ou 3-bois si driver trop difficile), 5-fer, 7-fer, 9-fer, pitching wedge, sand wedge, putter. Évitez les longs fers (2, 3, 4) — les hybrides sont bien plus faciles. Budget : 200-350€ d'occasion pour un set complet de qualité. Marques solides pour débutants : Wilson, Callaway Strata, Cleveland. N'investissez dans du neuf haut de gamme qu'à partir de l'index 20.",
    createdAt: "2026-05-07T13:25:00",
  },
  {
    id: "q12", memberId: "m7", type: "strategie",
    question: "Comment jouer un trou avec beaucoup de vent de face ?",
    answer: "Le vent de face amplifie les effets : une balle haute monte encore plus, une balle basse reste basse. Stratégie : 1) Prenez 1 à 2 clubs de plus selon l'intensité. 2) Ballez légèrement en arrière du stance pour compresser le loft. 3) Swing à 80% — un swing fort crée plus de spin et la balle monte plus. 4) Acceptez de jouer court et sûr plutôt que long et dans les problèmes. Règle de base : 1 club de plus tous les 15-20 km/h de vent de face.",
    createdAt: "2026-05-06T10:00:00",
  },
  {
    id: "q13", memberId: "m2", type: "swing",
    question: "J'ai tendance à lever la tête pendant mon swing. Comment arrêter ?",
    answer: "Le 'lifting de tête' est une des erreurs les plus communes — et souvent, le problème n'est pas la tête mais le reste du corps ! Causes réelles : 1) Vous essayez de regarder où va la balle avant de frapper, 2) Le corps se relève à l'impact pour 'aider' la balle. Exercice clé : Après l'impact, gardez les yeux sur l'endroit où était la balle pendant 2 secondes supplémentaires. Un autre exercice : frappez des petits coups avec les yeux fermés — vous sentirez immédiatement la différence de contact.",
    createdAt: "2026-05-06T08:30:00",
  },
  {
    id: "q14", memberId: "m10", type: "swing",
    question: "Mes coups de bunker restent dans le sable. Que faire ?",
    answer: "Problème classique ! Depuis un bunker de fairway ou de green, plusieurs erreurs courantes : 1) Vous frappez trop loin derrière la balle (3-4cm max derrière), 2) Le club s'enfonce car le rebond est mal utilisé. Technique correcte : ouvrez légèrement la face du SW, stance ouvert, frappez le sable environ 3cm derrière la balle avec un swing ample (longueur de finish importante). Le sable propulse la balle — ne cherchez pas à frapper la balle directement.",
    createdAt: "2026-05-05T15:00:00",
  },
  {
    id: "q15", memberId: "m1", type: "discussion",
    question: "Est-ce que la musculation aide vraiment pour le golf ?",
    answer: "Oui, mais de façon ciblée ! Le golf nécessite : mobilité de hanches et épaules (crucial), stabilité du tronc (core), et force explosive des jambes. Ce qui aide : yoga/pilates pour la mobilité, gainage, squats, rotations avec élastique. Ce qui peut nuire si mal fait : trop de volume de pecs/biceps — ça réduit la mobilité et crée des compensations. Rory McIlroy fait 4h de salle par semaine, mais c'est 70% mobilité/stabilité, 30% force. Objectif : swing plus libre, pas plus musclé.",
    createdAt: "2026-05-05T11:30:00",
  },
  {
    id: "q16", memberId: "m6", type: "discussion",
    question: "Quand dois-je savoir que je suis prêt pour un Open local ?",
    answer: "Pour un Open local (généralement réservé aux joueurs scratch ou +), vous devez avoir : 1) Index inférieur à +2 en conditions officielles, 2) Régularité : scorer autour de votre handicap lors de 8 tours sur 10, 3) Gestion du jeu : savoir choisir la sécurité face au risque, 4) Mental solide : gérer la pression sans s'effondrer. À index 6, vous n'êtes pas encore là, mais vous progressez bien. Visez d'abord les compétitions de club, le scratch, puis pensez Open dans 18-24 mois si vous vous entraînez sérieusement.",
    createdAt: "2026-05-04T14:00:00",
  },
  {
    id: "q17", memberId: "m5", type: "swing",
    question: "Je rate toutes mes balles à gauche. C'est quoi le problème ?",
    answer: "Des coups systématiquement à gauche (pour un droitier) = pull ou hook. Causes les plus fréquentes : 1) Pull : chemin de club outside-in (attaque de l'extérieur), face fermée. 2) Hook : chemin inside-out avec face très fermée. Diagnostic rapide : observez vos divots. Un divot pointant gauche = swing outside-in (pull). Correction pull : setup plus fermé, épaules parallèles à la cible, initiez le downswing avec les hanches (pas les épaules). Envoyez-moi une vidéo de votre swing via l'analyse pour un diagnostic précis !",
    createdAt: "2026-05-04T09:15:00",
  },
  {
    id: "q18", memberId: "m3", type: "strategie",
    question: "Comment aborder un par 5 en 2 coups (eagle) sans prendre trop de risques ?",
    answer: "Un eagle sur un par 5 est réalisable à votre niveau (index 8) avec la bonne approche. Conditions nécessaires : distance driver >250m, par 5 de moins de 490m, vent favorable. Stratégie : 1) Driver maximal mais gardé en jeu — pas de rough. 2) Depuis 220-240m, choisissez un 3-bois ou hybride seulement si le green est accessible sans obstacles majeurs. 3) Evaluez : obstacle d'eau, bunkers en approche, taille du green. Si le risque est élevé, jouez court et visez le birdie plutôt que de ruiner votre score.",
    createdAt: "2026-05-03T16:45:00",
  },
  {
    id: "q19", memberId: "m9", type: "discussion",
    question: "Pourquoi est-ce que je joue moins bien quand quelqu'un me regarde ?",
    answer: "C'est de l'anxiété de performance — totalement normale et que tous les golfeurs vivent. Le regard d'un observateur active votre cerveau conscient qui 'pense' au mouvement alors qu'il devrait être automatique. Solutions : 1) Routine identique que personne vous regarde ou non — elle est votre ancre. 2) Focus externe (cible) plutôt qu'interne (mouvement) : regardez la cible, visualisez le vol, puis frappez sans penser. 3) Entraînez-vous intentionnellement sous pression : jouez des concours imaginaires pendant vos séances solo.",
    createdAt: "2026-05-03T10:00:00",
  },
  {
    id: "q20", memberId: "m10", type: "discussion",
    question: "Comment améliorer mon jeu court autour du green ?",
    answer: "Le jeu court est là où les scores se font ou se défont ! Priorités : 1) Chipping : maîtrisez d'abord la technique 'bump and run' avec un 8-fer — balle en arrière, mains en avant, peu de loft. 2) Pitching : travaillez votre distance de contrôle avec PW et SW (10m, 20m, 30m = coups spécifiques). 3) Putting : 1h de putting pour 30min de practice par semaine est le ratio idéal. Exercice concret : depuis 3 billes autour du green à 5-10m, visez 2-putts maximum. Trackez votre 'scramble %' pendant vos tours.",
    createdAt: "2026-05-02T14:30:00",
  },
];

// ─────────────────────────────────────────────
// ÉVÉNEMENTS D'ACTIVITÉ
// ─────────────────────────────────────────────

export const ACTIVITY_EVENTS: ActivityEvent[] = [
  { id: "a1", memberId: "m1", type: "login", description: "Sophie Moreau s'est connectée", createdAt: "2026-05-11T09:00:00" },
  { id: "a2", memberId: "m3", type: "login", description: "Camille Leroy s'est connectée", createdAt: "2026-05-11T08:30:00" },
  { id: "a3", memberId: "m6", type: "login", description: "Julien Petit s'est connecté", createdAt: "2026-05-11T08:00:00" },
  { id: "a4", memberId: "m1", type: "question_asked", description: "Sophie Moreau a posé une question sur la constance dans les fers", createdAt: "2026-05-11T09:23:00", meta: { questionId: "q1" } },
  { id: "a5", memberId: "m3", type: "question_asked", description: "Camille Leroy a envoyé une vidéo swing pour analyse", createdAt: "2026-05-11T08:45:00", meta: { questionId: "q2" } },
  { id: "a6", memberId: "m6", type: "video_watched", description: "Julien Petit a regardé 'Mental & stratégie — Leçon 6'", createdAt: "2026-05-11T08:15:00", meta: { moduleId: "mental", lesson: 6 } },
  { id: "a7", memberId: "m3", type: "video_watched", description: "Camille Leroy a regardé 'Mental & stratégie — Leçon 3'", createdAt: "2026-05-11T09:10:00", meta: { moduleId: "mental", lesson: 3 } },
  { id: "a8", memberId: "m1", type: "video_watched", description: "Sophie Moreau a regardé 'Fers courts — Leçon 5'", createdAt: "2026-05-11T10:00:00", meta: { moduleId: "fer_court", lesson: 5 } },

  { id: "a9", memberId: "m2", type: "login", description: "Thomas Dupont s'est connecté", createdAt: "2026-05-10T18:30:00" },
  { id: "a10", memberId: "m6", type: "question_asked", description: "Julien Petit a posé une question sur la stratégie au Golf de Chiberta", createdAt: "2026-05-10T16:30:00", meta: { questionId: "q3" } },
  { id: "a11", memberId: "m2", type: "question_asked", description: "Thomas Dupont a posé une question sur la fréquence d'entraînement", createdAt: "2026-05-10T14:15:00", meta: { questionId: "q4" } },
  { id: "a12", memberId: "m10", type: "login", description: "François Blanc s'est connecté", createdAt: "2026-05-10T10:00:00" },
  { id: "a13", memberId: "m10", type: "video_watched", description: "François Blanc a regardé 'Fers courts — Leçon 4'", createdAt: "2026-05-10T10:30:00", meta: { moduleId: "fer_court", lesson: 4 } },
  { id: "a14", memberId: "m7", type: "question_asked", description: "Marie-Claire Durand a posé une question sur les hybrides", createdAt: "2026-05-10T11:00:00", meta: { questionId: "q5" } },

  { id: "a15", memberId: "m5", type: "login", description: "Isabelle Martin s'est connectée", createdAt: "2026-05-09T15:00:00" },
  { id: "a16", memberId: "m5", type: "question_asked", description: "Isabelle Martin a posé une question sur les wedges", createdAt: "2026-05-09T17:45:00", meta: { questionId: "q6" } },
  { id: "a17", memberId: "m5", type: "video_watched", description: "Isabelle Martin a regardé 'Grip & Posture — Leçon 4'", createdAt: "2026-05-09T15:30:00", meta: { moduleId: "grip", lesson: 4 } },
  { id: "a18", memberId: "m6", type: "challenge_completed", description: "Julien Petit a terminé le challenge 'Putting à 5 mètres' — Score: 18/20", createdAt: "2026-05-09T11:00:00", meta: { score: 18 } },

  { id: "a19", memberId: "m1", type: "login", description: "Sophie Moreau s'est connectée", createdAt: "2026-05-08T09:00:00" },
  { id: "a20", memberId: "m6", type: "question_asked", description: "Julien Petit a posé une question sur le launch angle du driver", createdAt: "2026-05-08T15:30:00", meta: { questionId: "q8" } },
  { id: "a21", memberId: "m10", type: "question_asked", description: "François Blanc a posé une question sur la lecture des greens", createdAt: "2026-05-08T09:10:00", meta: { questionId: "q9" } },
  { id: "a22", memberId: "m7", type: "video_watched", description: "Marie-Claire Durand a regardé 'Fers courts — Leçon 2'", createdAt: "2026-05-08T14:00:00", meta: { moduleId: "fer_court", lesson: 2 } },
  { id: "a23", memberId: "m8", type: "login", description: "Antoine Richard s'est connecté", createdAt: "2026-05-07T20:00:00" },

  { id: "a24", memberId: "m3", type: "question_asked", description: "Camille Leroy a posé une question sur la progression d'index", createdAt: "2026-05-07T16:00:00", meta: { questionId: "q10" } },
  { id: "a25", memberId: "m8", type: "question_asked", description: "Antoine Richard a posé une question sur l'équipement débutant", createdAt: "2026-05-07T13:25:00", meta: { questionId: "q11" } },
  { id: "a26", memberId: "m8", type: "video_watched", description: "Antoine Richard a regardé 'Swing de base — Leçon 1'", createdAt: "2026-05-07T20:30:00", meta: { moduleId: "swing_base", lesson: 1 } },
  { id: "a27", memberId: "m3", type: "module_completed", description: "Camille Leroy a terminé le module 'Driver & distance'", createdAt: "2026-02-10T17:00:00" },
  { id: "a28", memberId: "m6", type: "module_completed", description: "Julien Petit a terminé le module 'Jeu de bunker'", createdAt: "2026-01-20T16:00:00" },
  { id: "a29", memberId: "m1", type: "module_completed", description: "Sophie Moreau a terminé le module 'Putting'", createdAt: "2026-04-22T15:00:00" },
  { id: "a30", memberId: "m7", type: "challenge_completed", description: "Marie-Claire Durand a terminé le challenge 'Chip depuis 15m' — Score: 12/20", createdAt: "2026-05-06T11:00:00", meta: { score: 12 } },
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

export function getMemberById(id: string): Member | undefined {
  return MEMBERS.find((m) => m.id === id);
}

export function getProgressByMember(memberId: string): VideoProgress[] {
  return VIDEO_PROGRESS.filter((p) => p.memberId === memberId);
}

export function getQuestionsByMember(memberId: string): IAQuestion[] {
  return IA_QUESTIONS.filter((q) => q.memberId === memberId);
}

export function getActivityByMember(memberId: string): ActivityEvent[] {
  return ACTIVITY_EVENTS.filter((e) => e.memberId === memberId).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date("2026-05-11T12:00:00");
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffH = Math.floor(diffMin / 60);
  const diffD = Math.floor(diffH / 24);
  if (diffMin < 60) return `il y a ${diffMin}min`;
  if (diffH < 24) return `il y a ${diffH}h`;
  if (diffD < 7) return `il y a ${diffD}j`;
  return formatDate(dateStr);
}
