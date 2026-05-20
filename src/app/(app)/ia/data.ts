// ─── Types ────────────────────────────────────────────────────────────────────

export type Message = {
  role: "assistant" | "user";
  content: string;
};

export type SwingAnalysis = {
  id: string;
  date: string;
  type: "Driver" | "Fer 7" | "Chip" | "Putting";
  gradient: string;
  summary: string;
  fullAnalysis: string;
};

export type Course = {
  id: string;
  nom: string;
  region: string;
  trous: 9 | 18;
  par: number;
  difficulte: "Accessible" | "Intermédiaire" | "Difficile";
};

export type Hole = {
  number: number;
  par: 3 | 4 | 5;
  distance: number; // en mètres
  description?: string;
};

export type PlayerProfile = {
  prenom: string;
  handicap: number;
  niveau: "debutant" | "intermediaire" | "avance";
  pointsAmeliorer: string[];
  objectif: string;
  objectifIndex?: number;
  frequenceJeu?: string;
  clubGolf?: string;
  typeJeu?: "competition" | "loisir";
  blessure?: string;
};

// ─── Profil fictif ────────────────────────────────────────────────────────────

export const MOCK_PROFILE: PlayerProfile = {
  prenom: "Laurent",
  handicap: 18,
  niveau: "intermediaire",
  pointsAmeliorer: ["Drive", "Putting"],
  objectif: "Passer sous les 18",
};

// ─── Conversation pré-remplie ─────────────────────────────────────────────────

export const MOCK_CONVERSATION: Message[] = [
  {
    role: "assistant",
    content:
      "Bonjour Laurent ! Je suis Lolo IA, votre assistant golf basé sur la méthode Laurent Seinger.\n\nJ'ai noté votre profil — index 18, vous travaillez sur le drive et le putting. Objectif : passer sous les 18.\n\nQue puis-je faire pour vous aujourd'hui ?",
  },
  {
    role: "user",
    content: "J'ai du mal avec mon putting, surtout les putts entre 3 et 5 mètres.",
  },
  {
    role: "assistant",
    content:
      "C'est une distance très courante à travailler — les putts entre 3 et 5 mètres sont souvent décisifs sur le score.\n\nVoici les trois points clés à corriger en priorité :\n\n1. **La lecture de pente** — Prenez toujours le temps de lire le green depuis les deux côtés du putt avant de vous mettre en position.\n\n2. **Le rythme du pendule** — À cette distance, le mouvement doit être régulier et symétrique. Comptez mentalement « 1-2 » en montée, « 1-2 » en descente.\n\n3. **Les yeux sur la balle** — Évitez de regarder le trou trop tôt. Gardez les yeux sur la balle jusqu'à ce que vous entendiez ou sentiez l'impact.\n\nUn exercice efficace : posez 6 balles en cercle à 1m du trou. Rentrez-les toutes avant de passer à 2m, puis 3m. C'est le drill du « cercle de confiance ».",
  },
  {
    role: "user",
    content: "Et pour le drive ? Je pars souvent à gauche.",
  },
  {
    role: "assistant",
    content:
      "Un départ à gauche systématique (pour un droitier) indique généralement un de ces problèmes :\n\n• **Face fermée à l'impact** — Vérifiez votre grip : les V formés par vos pouces et index doivent pointer vers votre épaule droite, pas vers le menton.\n\n• **Rotation trop rapide des hanches** — Si vos hanches ouvrent trop tôt, les bras suivent en dehors du plan et ferment la face. Concentrez-vous sur une rotation contrôlée.\n\n• **Position de la balle trop avancée** — La balle doit être alignée sur votre talon gauche avec le driver, pas plus.\n\nJe vous conseille de regarder le module \"Le Swing\" dans votre bibliothèque — la vidéo sur le downswing explique exactement ce mécanisme.",
  },
];

// ─── Réponses IA simulées ─────────────────────────────────────────────────────

export const IA_RESPONSES_DISCUTER = [
  "C'est une excellente question. En golf, la régularité prime sur la puissance — surtout à votre niveau. Concentrez-vous sur un mouvement reproductible plutôt que sur la distance. Un swing à 80% de votre capacité maximale est souvent bien plus efficace et précis.",
  "La technique que vous décrivez est fréquente chez les joueurs d'index entre 15 et 25. La correction principale est de ralentir la montée pour bien charger le côté droit, puis de laisser la rotation des hanches initier la descente. Essayez l'exercice du club derrière le dos pour sentir la bonne séquence.",
  "Pour progresser sur ce point, je vous recommande trois séances de pratique ciblée par semaine : 20 minutes de putting, 15 minutes de chips, et une séance longue sur le parcours. La constance fait toute la différence sur 2-3 mois.",
  "Bonne observation ! La gestion mentale est souvent le maillon faible des amateurs. Une routine pré-shot de 15 à 20 secondes, toujours identique, aide à « bloquer » les pensées parasites et à entrer dans une bulle de concentration. Laurent en parle en détail dans le module Mental.",
  "En compétition, la règle d'or est de jouer à 80% de vos capacités. Évitez les coups risqués que vous ne réussissez pas régulièrement à l'entraînement. Jouez votre handicap, pas celui du leader.",
];

export const IA_RESPONSES_STRATEGIE = [
  "Sur ce parcours, la stratégie clé est de viser les centres de fairway plutôt que les drapeaux. Les green sont petits et les bunkers bien placés — jouer au-delà du green est souvent moins pénalisant qu'un bunker frontal.",
  "Avec un handicap 18 et un vent de face, je vous conseille de prendre un club de plus (voire deux) et de viser le milieu du green. Évitez de « forcer » le drive — la précision compte plus que la distance par vent fort.",
  "La gestion du score en Stableford est simple : jouez pour ne jamais rentrer un 0. Quand vous êtes en difficultés, prenez votre pitching wedge, remettez en jeu, et sauvez votre point. Un 1 régulier vaut mieux qu'alterner 3 et 0.",
  "Sur un dogleg à droite, placez-vous du côté gauche du départ pour avoir un meilleur angle d'attaque. Avec votre drive, vous pouvez viser le coude du dogleg et vous retrouver avec un fer moyen vers le green.",
  "Ce trou par 4 avec green surélevé demande de ne pas short-sider. Visez toujours le côté large du drapeau — laissez de la marge. Un putt de 10 mètres en hauteur vaut mieux qu'un chip de 2 mètres dans la pente.",
];

// ─── Historique analyses swing ────────────────────────────────────────────────

export const MOCK_SWING_HISTORY: SwingAnalysis[] = [
  {
    id: "sw-1",
    date: "28 Avr. 2025",
    type: "Driver",
    gradient: "linear-gradient(135deg, #0d2e18, #1a5c38)",
    summary: "Grip correct, légère ouverture des épaules à corriger",
    fullAnalysis:
      "**Points positifs**\n\nVotre grip est bien positionné — la pression est correcte et les V sont bien orientés. La largeur d'appui est bonne pour le driver.\n\n**Points à corriger**\n\n1. **Épaules** — Elles sont légèrement ouvertes à l'adresse (environ 5°). Alignez-les parallèlement à la cible.\n\n2. **Poids au départ** — Répartissez 60% du poids sur le pied arrière dès l'adresse avec le driver.\n\n3. **Hauteur du tee** — Le tee est un peu bas, ce qui encourage un angle d'attaque descendant. Montez-le d'un centimètre.\n\n**Exercice conseillé**\n\nPlacez un club au sol le long de vos pieds pour vérifier votre alignement. Prenez une photo de profil et comparez la ligne d'épaules avec la ligne du club.",
  },
  {
    id: "sw-2",
    date: "15 Avr. 2025",
    type: "Fer 7",
    gradient: "linear-gradient(135deg, #1a2e0d, #3a5c1a)",
    summary: "Bonne posture, position de balle à ajuster",
    fullAnalysis:
      "**Points positifs**\n\nExcellente posture générale — flexion des genoux appropriée, dos droit avec la bonne inclinaison. Le grip est neutre, ce qui est parfait pour les fers.\n\n**Points à corriger**\n\n1. **Position de la balle** — Elle est 3-4 cm trop avancée pour un fer 7. Elle devrait être légèrement avant le centre de l'appui.\n\n2. **Poids à l'impact** — Vous gardez trop de poids sur le pied arrière. Concentrez-vous sur le transfert vers le pied gauche en initiant la descente.\n\n**Exercice conseillé**\n\nDrill du « pied droit levé » : frappez des balles en levant le talon droit à l'impact pour forcer le transfert de poids. Faites 20 répétitions en pratique.",
  },
  {
    id: "sw-3",
    date: "3 Avr. 2025",
    type: "Chip",
    gradient: "linear-gradient(135deg, #2e1a0d, #5c3a1a)",
    summary: "Mouvement trop large, poignets trop actifs",
    fullAnalysis:
      "**Points positifs**\n\nBonne position des pieds (légèrement fermés) et poids bien à gauche dès l'adresse — c'est exactement ce qu'il faut pour le chip.\n\n**Points à corriger**\n\n1. **Amplitude du mouvement** — Votre backswing est trop large pour cette distance. Le chip doit être un mouvement contrôlé, pas un mini-swing.\n\n2. **Poignets** — Ils cassent trop tôt en montée. Gardez les poignets fermes — le chip est joué principalement avec les épaules et les bras.\n\n3. **Contact** — Vous frappez légèrement derrière la balle. Concentrez-vous sur un contact balle-d'abord, gazon ensuite.\n\n**Exercice conseillé**\n\nPoser une serviette à 30cm derrière la balle. Réussissez le chip sans toucher la serviette — ça force un contact balle-first.",
  },
];

// ─── Parcours fictifs ─────────────────────────────────────────────────────────

export const MOCK_COURSES: Course[] = [
  {
    id: "c-1",
    nom: "Golf de Fontainebleau",
    region: "Île-de-France",
    trous: 18,
    par: 72,
    difficulte: "Intermédiaire",
  },
  {
    id: "c-2",
    nom: "Golf du Val de l'Indre",
    region: "Centre-Val de Loire",
    trous: 9,
    par: 35,
    difficulte: "Accessible",
  },
  {
    id: "c-3",
    nom: "Golf de Morfontaine",
    region: "Hauts-de-France",
    trous: 18,
    par: 71,
    difficulte: "Difficile",
  },
];

export const MOCK_HOLES: Record<string, Hole[]> = {
  "c-1": [
    { number: 1, par: 4, distance: 380, description: "Départ ouvert, fairway large, green protégé par deux bunkers" },
    { number: 2, par: 3, distance: 165, description: "Par 3 sur green surélevé, vent dominant de gauche" },
    { number: 3, par: 5, distance: 510, description: "Long par 5 avec étang à 280m, dogleg gauche" },
    { number: 4, par: 4, distance: 355, description: "Fairway étroit entre deux rangées d'arbres" },
    { number: 5, par: 4, distance: 400, description: "Bunkers de fairway à 220m, green avec pente arrière-gauche" },
    { number: 6, par: 3, distance: 145, description: "Par 3 court, green entouré de rough profond" },
    { number: 7, par: 4, distance: 370, description: "Bunkers frontaux importants, ne pas être court" },
    { number: 8, par: 5, distance: 495, description: "Par 5 accessible, virage à droite à 260m" },
    { number: 9, par: 4, distance: 390, description: "Trou de retour difficile, vent de face en général" },
    { number: 10, par: 4, distance: 360, description: "Départ sur plateau, fairway qui descend vers le green" },
    { number: 11, par: 3, distance: 180, description: "Long par 3, eau à gauche du green" },
    { number: 12, par: 4, distance: 375, description: "Dogleg gauche, rough épais côté droit" },
    { number: 13, par: 4, distance: 345, description: "Green petit et incliné, jouer au centre" },
    { number: 14, par: 5, distance: 520, description: "Long par 5, possibilité d'atteindre en 2 coups pour les longs frappeurs" },
    { number: 15, par: 3, distance: 155, description: "Par 3 symétrique, bunker sur les deux côtés" },
    { number: 16, par: 4, distance: 395, description: "Fairway en pente, bunker de fairway à 240m à droite" },
    { number: 17, par: 4, distance: 365, description: "Île de fairway, viser le centre absolu" },
    { number: 18, par: 4, distance: 410, description: "Dogleg droite, trou de clôture spectaculaire face au clubhouse" },
  ],
  "c-2": [
    { number: 1, par: 4, distance: 320, description: "Trou d'ouverture accessible, fairway large" },
    { number: 2, par: 3, distance: 140, description: "Par 3 court avec green en cuvette" },
    { number: 3, par: 4, distance: 345, description: "Virage à gauche, arbre isolé à 200m" },
    { number: 4, par: 5, distance: 465, description: "Par 5 le plus court, green atteignable en 2 pour les bons" },
    { number: 5, par: 4, distance: 330, description: "Montée progressive, green surélevé" },
    { number: 6, par: 3, distance: 125, description: "Par 3 très court, piège devant le green" },
    { number: 7, par: 4, distance: 350, description: "Dernier fairway large, vent de côté" },
    { number: 8, par: 4, distance: 360, description: "Bunkers à 190m des deux côtés, viser le centre" },
    { number: 9, par: 4, distance: 355, description: "Trou de retour face au club, légère montée finale" },
  ],
  "c-3": [
    { number: 1, par: 4, distance: 390, description: "Départ exigeant, rough de bruyère des deux côtés" },
    { number: 2, par: 4, distance: 375, description: "Fairway ondulé, green incliné vers l'avant" },
    { number: 3, par: 3, distance: 195, description: "Long par 3 iconique, green entouré de bunkers profonds" },
    { number: 4, par: 4, distance: 420, description: "Trou le plus difficile, dogleg avec arbre centenaire" },
    { number: 5, par: 5, distance: 540, description: "Long par 5, ruisseau en travers à 380m" },
    { number: 6, par: 4, distance: 380, description: "Rough de bruyère envahissant, rester sur le fairway" },
    { number: 7, par: 3, distance: 165, description: "Par 3 avec green en belvédère, vent difficile à lire" },
    { number: 8, par: 4, distance: 400, description: "Virage à gauche, position de départ cruciale" },
    { number: 9, par: 4, distance: 370, description: "Montée finale, green difficile à lire" },
    { number: 10, par: 4, distance: 385, description: "Départ de retour, fairway en descente" },
    { number: 11, par: 4, distance: 355, description: "Rough profond à droite, viser gauche" },
    { number: 12, par: 5, distance: 505, description: "Par 5 avec mare en jeu à 460m" },
    { number: 13, par: 3, distance: 175, description: "Par 3 avec green très incliné de droite à gauche" },
    { number: 14, par: 4, distance: 395, description: "Bunkers de greenside nombreux, approche délicate" },
    { number: 15, par: 4, distance: 365, description: "Trou avec dépression au centre du fairway" },
    { number: 16, par: 3, distance: 185, description: "Long par 3 en descente, difficile à calibrer" },
    { number: 17, par: 4, distance: 410, description: "Avant-dernier trou, pression maximale" },
    { number: 18, par: 4, distance: 430, description: "Grand finale, montée vers le clubhouse historique" },
  ],
};

export const MOCK_STRATEGY_CONTEXT: Record<string, string[]> = {
  "c-1": [
    "Préparer le trou 1 (par 4, 380m)",
    "Stratégie bunkers frontaux du 7",
    "Comment aborder le 14 (par 5) ?",
    "Gestion du dogleg du 18",
  ],
  "c-2": [
    "Plan de jeu pour le trou 3 (par 3)",
    "Vent dominant sur ce parcours ?",
    "Score cible avec handicap 18",
    "Points clés du 9 trous",
  ],
  "c-3": [
    "Comment survivre au 4 (par 4 difficile) ?",
    "Stratégie rough profond Morfontaine",
    "Gestion mentale sur ce parcours",
    "Clubs recommandés pour ce tracé",
  ],
};
