import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ChevronRight, Play, Star, DollarSign, Map, UserX, TrendingDown, Users, Shield, CreditCard, RotateCcw, HelpCircle, Brain, Video, Wifi, MessageSquare, Trophy } from "lucide-react";
import { AppMockup } from "@/components/landing/AppMockup";
import { Avatar } from "@/components/landing/Avatar";
import { ComparisonTable } from "@/components/landing/ComparisonTable";
import { FounderSection } from "@/components/landing/FounderSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { StickyCTA } from "@/components/landing/StickyCTA";

/* ─── DATA ──────────────────────────────────────────────────── */

const stats = [
  { value: "2 400+", label: "membres actifs" },
  { value: "4,9/5", label: "satisfaction" },
  { value: "−8 pts", label: "d'index en moyenne" },
];

const painPoints = [
  { icon: DollarSign, text: "Tu paies 80€ de l'heure pour qu'on te dise des choses que tu sais déjà." },
  { icon: Map, text: "Tu arrives sur un parcours inconnu en compétition et tu joues le 1er trou en aveugle." },
  { icon: UserX, text: "Tu joues seul. Personne pour corriger ce putt qui tire à gauche depuis 3 ans." },
  { icon: Video, text: "Tu as 200 vidéos YouTube en favoris. Tu n'en as regardé aucune en entier." },
  { icon: TrendingDown, text: "Tu t'entraînes 2 fois par semaine. Ton index ne bouge plus depuis 18 mois." },
  { icon: Users, text: "Tu progresses sans communauté, sans challenge, sans personne pour t'élever." },
];

const features = [
  {
    screen: "video" as const,
    title: "Vidéothèque de progression",
    subtitle: "Du premier drive au putting décisif.",
    body: "Bibliothèque complète signée Laurent Seinger : drive, fer, approche, bunker, putting, mental. Structuré par niveau et par thématique — tu sais quoi travailler, dans quel ordre.",
    benefits: [
      "Contenu organisé par niveau et objectif",
      "Nouvelles vidéos chaque semaine",
      "Hors-ligne sur mobile, accessible 24h/24",
    ],
    accentColor: "#3A7010",
    accentBg: "#DFF0C4",
  },
  {
    screen: "ia" as const,
    title: "Lolo IA — Coaching & Analyse de swing",
    subtitle: "Ton partenaire d'entraînement intelligent.",
    body: "Lolo IA connaît ton index, tes faiblesses et s'adapte à ton niveau — Débutant, Intermédiaire ou Avancé. Envoie une vidéo de ton swing pour une analyse complète (posture, rotation, impact). Historique de toutes tes sessions conservé, disponible à 3h du matin.",
    benefits: [
      "Coaching adapté à 3 niveaux de jeu en temps réel",
      "Analyse vidéo de swing — posture, rotation, impact",
      "Historique complet de tes sessions consultable à tout moment",
    ],
    accentColor: "#2A5C8F",
    accentBg: "#EAF2FC",
  },
  {
    screen: "parcours" as const,
    title: "Reconnaissance de parcours IA",
    subtitle: "Arrête de découvrir les pièges en tombant dedans.",
    body: "L'IA analyse chaque trou avant que tu poses le pied sur le départ. Stratégie optimale, zones à éviter, club conseillé : tu joues avec une longueur d'avance, même sur un parcours inconnu.",
    benefits: [
      "Analyse stratégique trou par trou",
      "Conseils en temps réel pendant ta partie",
      "Centaines de parcours, nouveaux ajoutés chaque mois",
    ],
    accentColor: "#9A6A10",
    accentBg: "#FFF5E4",
  },
  {
    screen: "community" as const,
    title: "Communauté & Challenges",
    subtitle: "Progresser entouré, c'est une autre histoire.",
    body: "Communauté de golfeurs sérieux qui partagent tes ambitions. Challenges mensuels, classements, partage de scores et de victoires. C'est ça, le progrès partagé.",
    benefits: [
      "Espace de discussion actif entre membres",
      "Challenges mensuels avec classements",
      "Partage de scores et de conseils",
    ],
    accentColor: "#7040A0",
    accentBg: "#F5EDFB",
  },
];

const testimonials = [
  {
    name: "Marie L.",
    initials: "ML",
    variant: "green" as const,
    meta: "42 ans · Lyon · Index 36 → 28",
    detail: "Joue 1× par semaine au Golf de Salvagny",
    text: "J'avais essayé plusieurs apps, aucune ne m'a autant aidée. L'IA m'a fait comprendre pourquoi je ratais mes approches. 8 points d'index en 4 mois — ma coach me disait qu'il fallait un an minimum.",
    tag: "Débutante",
    tagBg: "#DFF0C4",
    tagColor: "#3A7010",
  },
  {
    name: "Thomas R.",
    initials: "TR",
    variant: "blue" as const,
    meta: "35 ans · Paris · Index 22 → 16",
    detail: "Joue en compétition régionale",
    text: "La reconnaissance de parcours a tout changé. Dernière sortie dans le Périgord : 88, alors que je tourne à 95 sur des inconnus. L'IA avait identifié les dog-legs et les greens en faux plat.",
    tag: "Intermédiaire",
    tagBg: "#EAF2FC",
    tagColor: "#2A5C8F",
  },
  {
    name: "Pierre M.",
    initials: "PM",
    variant: "gold" as const,
    meta: "51 ans · Bordeaux · Index 9 → 5",
    detail: "Joue 3× par semaine, ancien -1 amateur",
    text: "À mon niveau, je pensais avoir tout vu. Lolo IA a pointé un défaut de transition que je traînais depuis longtemps — le genre de détail qu'on ne voit qu'avec un œil extérieur. Et la communauté est sérieuse.",
    tag: "Confirmé",
    tagBg: "#FFF5E4",
    tagColor: "#9A6A10",
  },
];

const faqItems = [
  {
    icon: HelpCircle,
    q: "Je suis débutant complet, c'est fait pour moi ?",
    a: "Oui. La bibliothèque démarre des bases — prise en main, posture, premier swing — et progresse graduellement. L'IA adapte ses conseils à ton profil dès le premier jour.",
  },
  {
    icon: Brain,
    q: "L'IA remplace-t-elle un coach humain ?",
    a: "Pas entièrement. Un coach a les yeux sur toi sur le practice. Lolo IA, elle, est dispo 24h/24 et ne facture pas 70€/h. La plupart de nos membres réduisent leurs leçons et progressent plus vite.",
  },
  {
    icon: Map,
    q: "Combien de parcours dans la reconnaissance IA ?",
    a: "Plusieurs centaines de parcours français et européens, avec des ajouts chaque mois. Si ton parcours manque, signale-le dans l'app — il est ajouté en priorité.",
  },
  {
    icon: RotateCcw,
    q: "Puis-je annuler à tout moment ?",
    a: "Oui, sans condition, en un clic depuis ton espace membre. Aucun engagement. Tu peux aussi mettre en pause et reprendre — ton historique est conservé.",
  },
  {
    icon: MessageSquare,
    q: "La communauté est-elle active ?",
    a: "Des membres postent chaque jour : scores, questions, conseils, birdies. Laurent Seinger interagit régulièrement. Pas un forum fantôme — un vrai espace vivant.",
  },
  {
    icon: Trophy,
    q: "Comment fonctionnent les challenges ?",
    a: "Chaque mois, plusieurs défis sont lancés — technique, score, créatif. Tu postes ton résultat, un classement se crée, les meilleurs sont mis en avant. Bonus : ça te force à jouer.",
  },
  {
    icon: Video,
    q: "Comment fonctionne l'analyse de swing ?",
    a: "Tu envoies une photo ou vidéo de ton swing directement dans le chat avec Lolo IA. Elle analyse posture, rotation, impact et suivi en quelques secondes, et te donne les 2-3 corrections prioritaires adaptées à ton niveau.",
  },
  {
    icon: Wifi,
    q: "Puis-je utiliser l'app hors connexion ?",
    a: "Les vidéos peuvent être téléchargées pour une lecture hors connexion sur mobile. L'IA et la reconnaissance de parcours nécessitent une connexion, mais tout ton historique et tes notes sont accessibles à tout moment.",
  },
];

const includes = [
  "Accès à toute la vidéothèque",
  "Lives hebdomadaires + replays",
  "Lolo IA illimitée + analyse de swing",
  "Reconnaissance de parcours IA",
  "Communauté & challenges",
  "Nouvelles vidéos chaque semaine",
  "Accès mobile et web",
];

/* ─── HELPERS ───────────────────────────────────────────────── */

function GoldDivider() {
  return (
    <div
      style={{
        height: 1,
        background: "linear-gradient(to right, transparent, #C9A84C, transparent)",
        maxWidth: 600,
        margin: "0 auto",
      }}
    />
  );
}

/* ─── PAGE ──────────────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <div style={{ background: "#0F2318", color: "#F5F0E8" }}>
      {/* Inline styles for FAQ + reduced motion */}
      <style>{`
        details[data-faq] summary .ls-faq-icon {
          transition: transform 0.25s ease;
        }
        details[data-faq][open] summary .ls-faq-icon {
          transform: rotate(45deg);
        }
        details[data-faq]:hover summary {
          background: rgba(42,74,53,0.4);
        }
        details[data-faq]:hover {
          border-left: 3px solid #C9A84C;
        }
        details[data-faq] {
          border-left: 3px solid transparent;
          transition: border-color 0.2s ease;
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
          [data-scroll-reveal] { opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      {/* NAV */}
      <nav
        className="flex items-center justify-between px-5 py-3 sticky top-0 z-40"
        style={{
          background: "rgba(15,35,24,0.94)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #2A4A35",
        }}
      >
        <div className="flex items-center gap-2">
          <Image src="/ls-club-logo.svg" alt="LS Club" width={32} height={32} className="rounded-xl" />
          <span className="font-serif font-bold text-base" style={{ color: "#F5F0E8" }}>
            LS Club
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/auth/connexion"
            className="text-xs font-semibold px-3 py-1.5 rounded-xl transition-opacity hover:opacity-80"
            style={{ color: "#C9A84C" }}
          >
            Se connecter
          </Link>
          <Link
            href="/auth/inscription"
            className="text-xs font-bold px-3 py-1.5 rounded-xl transition-opacity hover:opacity-80"
            style={{ color: "#0F2318", background: "#C9A84C" }}
          >
            S&apos;inscrire
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section
        className="relative overflow-hidden px-5 py-14 md:py-20"
        style={{ background: "radial-gradient(ellipse at 50% 40%, #132B1E 0%, #0F2318 70%)" }}
      >
        {/* Gold watermark */}
        <div
          className="absolute pointer-events-none select-none"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(200px, 30vw, 340px)",
            color: "#C9A84C",
            opacity: 0.04,
            letterSpacing: -8,
            whiteSpace: "nowrap",
            zIndex: 0,
          }}
        >
          LS
        </div>

        <div
          className="absolute pointer-events-none"
          style={{
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.15), transparent 70%)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: -80,
            left: -80,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.06), transparent 70%)",
          }}
        />

        <div className="relative max-w-5xl mx-auto grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-6 items-center" style={{ zIndex: 1 }}>
          {/* Copy */}
          <div className="text-center md:text-left">
            <div
              className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
              style={{
                background: "rgba(201,168,76,0.18)",
                color: "#C9A84C",
                border: "1px solid rgba(201,168,76,0.3)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "#C9A84C" }}
              />
              2 400+ membres · −8 pts d&apos;index en moyenne
            </div>

            <h1
              className="font-serif font-bold leading-[1.05] mb-4"
              style={{ fontSize: "clamp(34px, 5.2vw, 60px)", color: "#F5F0E8" }}
            >
              Le golf devrait coûter
              <br />
              <em style={{ color: "#C9A84C" }}>moins cher que ça.</em>
            </h1>

            {/* Gold rule under headline */}
            <div
              className="mb-5 mx-auto md:mx-0"
              style={{ width: 60, height: 1, background: "#C9A84C" }}
            />

            <p
              className="text-base md:text-lg mb-8 max-w-xl mx-auto md:mx-0"
              style={{ color: "rgba(245,240,232,0.78)", lineHeight: 1.7 }}
            >
              19€/mois pour la méthode Laurent Seinger, une IA qui analyse ton swing, et une
              communauté qui t&apos;élève. Soit 70€ de moins qu&apos;une seule leçon particulière.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-4">
              <Link
                href="/auth/inscription"
                className="inline-flex items-center justify-center gap-2 font-bold text-sm px-6 py-3.5 rounded-2xl transition-opacity hover:opacity-90"
                style={{ background: "#C9A84C", color: "#0F2318" }}
              >
                Démarre tes 14 jours gratuits
                <ChevronRight size={16} />
              </Link>
              <Link
                href="/auth/inscription"
                className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-6 py-3.5 rounded-2xl transition-opacity hover:opacity-80"
                style={{
                  background: "rgba(201,168,76,0.08)",
                  color: "#C9A84C",
                  border: "1px solid rgba(201,168,76,0.35)",
                }}
              >
                <Play size={14} fill="currentColor" />
                Voir Lolo IA en action
              </Link>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="flex -space-x-1.5">
                {[["#3A6A1A","ML"],["#1A4A6A","TR"],["#6A4A10","PM"]].map(([bg, initials]) => (
                  <div
                    key={initials}
                    className="flex items-center justify-center rounded-full font-bold flex-shrink-0"
                    style={{ width: 26, height: 26, background: bg, fontSize: 8, color: "#F5F0E8", border: "2px solid rgba(201,168,76,0.3)" }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-xs" style={{ color: "rgba(245,240,232,0.72)" }}>
                Rejoignez <strong style={{ color: "#C9A84C" }}>2 400+</strong> golfeurs qui progressent
              </p>
            </div>
            <p className="text-xs mt-1.5" style={{ color: "rgba(245,240,232,0.38)" }}>
              Pas de CB demandée · Annulation 1 clic
            </p>
          </div>

          {/* Mockup */}
          <div className="flex justify-center md:justify-end">
            <AppMockup screen="ia" width={240} float />
          </div>
        </div>
      </section>

      {/* GOLD DIVIDER */}
      <GoldDivider />

      {/* STATS */}
      <section className="px-5 py-7 max-w-2xl mx-auto">
        <ScrollReveal>
          <div className="grid grid-cols-3 gap-3">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="p-3 text-center"
                style={{
                  background: "#1B3A2A",
                  border: "1px solid #2A4A35",
                  borderRadius: 16,
                }}
              >
                <div
                  className="font-serif font-bold text-xl md:text-2xl mb-0.5"
                  style={{ color: "#C9A84C" }}
                >
                  {value}
                </div>
                <div className="text-[11px] leading-tight" style={{ color: "#7A8A7A" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* PAIN */}
      <section className="px-5 py-12 max-w-2xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-9">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "#7A8A7A" }}
            >
              Tu te reconnais ?
            </p>
            <h2 className="font-serif font-bold text-2xl md:text-3xl" style={{ color: "#F5F0E8" }}>
              Le golf peut être <em style={{ color: "#C9A84C", fontStyle: "italic" }}>frustrant</em>
            </h2>
          </div>
        </ScrollReveal>
        <div className="space-y-2.5">
          {painPoints.map(({ icon: Icon, text }, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div
                className="flex items-start gap-3 px-4 py-3.5 rounded-2xl"
                style={{
                  background: "#1B3A2A",
                  borderLeft: "3px solid #8A6A28",
                  border: "1px solid #2A4A35",
                  borderLeftWidth: 3,
                  borderLeftColor: "#8A6A28",
                }}
              >
                <span
                  className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ background: "rgba(201,168,76,0.08)", marginTop: 1 }}
                >
                  <Icon size={13} style={{ color: "#C9A84C" }} />
                </span>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.72)" }}>
                  {text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <ScrollReveal>
        <HowItWorks />
      </ScrollReveal>

      {/* GOLD DIVIDER */}
      <GoldDivider />

      {/* SOLUTION PIVOT */}
      <section className="px-5 pb-10 max-w-2xl mx-auto">
        <ScrollReveal>
          <div
            className="p-8 text-center relative overflow-hidden"
            style={{
              background: "#1B3A2A",
              border: "1px solid #C9A84C",
              borderRadius: 16,
            }}
          >
            <div
              className="absolute pointer-events-none"
              style={{
                top: -40,
                right: -40,
                width: 180,
                height: 180,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(201,168,76,0.18), transparent 70%)",
              }}
            />
            <div className="relative">
              <div className="text-4xl mb-4">⛳</div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "#C9A84C" }}
              >
                La solution
              </p>
              <h2
                className="font-serif font-bold text-xl md:text-2xl mb-3"
                style={{ color: "#F5F0E8" }}
              >
                Un coach intelligent,
                <br />
                disponible <em style={{ color: "#C9A84C" }}>quand tu joues</em>.
              </h2>
              <p
                className="text-sm max-w-md mx-auto"
                style={{ color: "rgba(245,240,232,0.82)", lineHeight: 1.85 }}
              >
                Méthode structurée, IA qui te connaît, communauté qui t&apos;élève. Pour moins de 0,65€
                par jour.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* FEATURES */}
      <section className="px-5 py-10 max-w-4xl mx-auto" style={{ background: "#132B1E" }}>
        <ScrollReveal>
          <div className="text-center mb-10">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "#7A8A7A" }}
            >
              Ce que tu obtiens
            </p>
            <h2 className="font-serif font-bold text-2xl md:text-3xl" style={{ color: "#F5F0E8" }}>
              Tout ce qu&apos;il te faut
              <br />
              pour vraiment progresser
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          {features.map(({ screen, title, subtitle, body, benefits }, i) => {
            const reverse = i % 2 === 1;
            return (
              <ScrollReveal key={title}>
                <div
                  className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center relative overflow-hidden"
                  style={{
                    background: "#1B3A2A",
                    border: "1px solid #2A4A35",
                    borderRadius: 16,
                    transition: "border-color 0.2s ease",
                  }}
                >
                  {/* Gold corner accent */}
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      top: 12,
                      left: 12,
                      width: 12,
                      height: 12,
                      borderTop: "1px solid #C9A84C",
                      borderLeft: "1px solid #C9A84C",
                    }}
                  />
                  <div className={`flex-1 ${reverse ? "md:order-2" : ""}`}>
                    <div
                      className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg mb-3"
                      style={{ background: "rgba(201,168,76,0.1)" }}
                    >
                      <span style={{ fontSize: 14 }}>
                        {screen === "video" && "🎥"}
                        {screen === "ia" && "🤖"}
                        {screen === "parcours" && "🗺️"}
                        {screen === "community" && "👥"}
                      </span>
                      <span className="text-xs font-bold" style={{ color: "#C9A84C" }}>
                        {subtitle}
                      </span>
                    </div>
                    <h3
                      className="font-serif font-bold text-xl md:text-2xl mb-3"
                      style={{ color: "#F5F0E8" }}
                    >
                      {title}
                    </h3>
                    <p className="text-sm mb-4" style={{ color: "rgba(245,240,232,0.72)", lineHeight: 1.8 }}>
                      {body}
                    </p>
                    <div className="space-y-2">
                      {benefits.map((b) => (
                        <div key={b} className="flex items-start gap-2">
                          <CheckCircle
                            size={14}
                            className="flex-shrink-0 mt-0.5"
                            style={{ color: "#C9A84C" }}
                          />
                          <span className="text-sm" style={{ color: "#F5F0E8" }}>
                            {b}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`flex justify-center flex-shrink-0 ${reverse ? "md:order-1" : ""}`}>
                    <AppMockup screen={screen} width={200} />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* GOLD DIVIDER */}
      <GoldDivider />

      {/* LOLO IA DEMO */}
      <section
        className="relative overflow-hidden px-5 py-12"
        style={{ background: "linear-gradient(145deg, #0F2318 0%, #132B1E 100%)" }}
      >
        <div
          className="absolute pointer-events-none"
          style={{ top: -60, right: -60, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.12), transparent 70%)" }}
        />
        <ScrollReveal>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#7A8A7A" }}>
                En pratique
              </p>
              <h2 className="font-serif font-bold text-2xl md:text-3xl mb-2" style={{ color: "#F5F0E8" }}>
                Lolo IA, en action
              </h2>
              <div className="flex justify-center gap-2 mt-3">
                {["Débutant", "Intermédiaire", "Avancé"].map((lvl, i) => (
                  <span
                    key={lvl}
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: i === 1 ? "rgba(201,168,76,0.25)" : "rgba(245,240,232,0.06)",
                      color: i === 1 ? "#C9A84C" : "rgba(245,240,232,0.5)",
                      border: i === 1 ? "1px solid rgba(201,168,76,0.4)" : "1px solid rgba(245,240,232,0.1)",
                    }}
                  >
                    {lvl}
                  </span>
                ))}
              </div>
            </div>

            {/* Chat simulation */}
            <div className="space-y-3 mb-6">
              {/* User message */}
              <div className="flex justify-end">
                <div
                  className="max-w-[80%] px-4 py-3 text-sm"
                  style={{ background: "rgba(201,168,76,0.1)", borderRadius: "14px 14px 4px 14px", color: "#F5F0E8", border: "1px solid rgba(201,168,76,0.2)" }}
                >
                  Mon drive part systématiquement à gauche. Comment corriger ça ?
                </div>
              </div>
              {/* AI response 1 */}
              <div className="flex gap-2.5 items-end">
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0 font-bold"
                  style={{ width: 30, height: 30, background: "#1B3A2A", border: "1px solid #C9A84C", fontSize: 9, color: "#C9A84C" }}
                >
                  LS
                </div>
                <div
                  className="max-w-[80%] px-4 py-3 text-sm leading-relaxed"
                  style={{ background: "rgba(245,240,232,0.05)", borderRadius: "14px 14px 14px 4px", color: "rgba(245,240,232,0.88)", border: "1px solid #2A4A35" }}
                >
                  Un drive qui part à gauche (pour un droitier) indique souvent une <strong style={{ color: "#C9A84C" }}>face de club fermée à l&apos;impact</strong> ou une rotation des hanches trop rapide.
                </div>
              </div>
              {/* AI response 2 */}
              <div className="flex gap-2.5 items-end">
                <div style={{ width: 30, flexShrink: 0 }} />
                <div
                  className="max-w-[80%] px-4 py-3 text-sm leading-relaxed"
                  style={{ background: "rgba(245,240,232,0.05)", borderRadius: "14px 14px 14px 4px", color: "rgba(245,240,232,0.88)", border: "1px solid #2A4A35" }}
                >
                  Exercice prioritaire : place un tee 10cm devant ta balle et entraîne-toi à <strong style={{ color: "#C9A84C" }}>frapper les deux en séquence</strong>. Ça force la face à rester ouverte plus longtemps. Essaie 20 répétitions avec un fer 7 d&apos;abord.
                </div>
              </div>
            </div>

            <p className="text-center text-xs" style={{ color: "rgba(245,240,232,0.35)" }}>
              Chat illimité · Adapté à ton niveau · 24h/24
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* FOUNDER */}
      <ScrollReveal>
        <FounderSection />
      </ScrollReveal>

      {/* COMPARISON */}
      <ScrollReveal>
        <ComparisonTable />
      </ScrollReveal>

      {/* GOLD DIVIDER */}
      <GoldDivider />

      {/* TESTIMONIALS */}
      <section className="px-5 py-12 max-w-2xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-9">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "#7A8A7A" }}
            >
              Ils ont progressé
            </p>
            <h2 className="font-serif font-bold text-2xl md:text-3xl" style={{ color: "#F5F0E8" }}>
              Ce que disent nos membres
            </h2>
          </div>
        </ScrollReveal>
        <div className="space-y-4">
          {testimonials.map(({ name, initials, variant, meta, detail, text, tag }, i) => (
            <ScrollReveal key={name} delay={i * 80}>
              <div
                className="p-5"
                style={{
                  background: "#1B3A2A",
                  border: "1px solid #2A4A35",
                  borderLeft: "3px solid #C9A84C",
                  borderRadius: 16,
                }}
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={14} fill="#C9A84C" stroke="#C9A84C" />
                  ))}
                </div>
                <p
                  className="text-sm italic mb-4"
                  style={{ color: "#F5F0E8", lineHeight: 1.85 }}
                >
                  &ldquo;{text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <Avatar initials={initials} variant={variant} size={44} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold" style={{ color: "#F5F0E8" }}>
                      {name}
                    </p>
                    <p className="text-xs" style={{ color: "#7A8A7A" }}>
                      {meta}
                    </p>
                    <p className="text-[11px]" style={{ color: "#7A8A7A" }}>
                      {detail}
                    </p>
                  </div>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
                    style={{ background: "rgba(201,168,76,0.12)", color: "#C9A84C" }}
                  >
                    {tag}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* GARANTIE STRIP */}
      <section className="px-5 py-6 max-w-2xl mx-auto">
        <ScrollReveal>
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 px-6 py-4 rounded-2xl"
            style={{ background: "#1B3A2A", border: "1px solid #2A4A35" }}
          >
            {[
              { icon: Shield, label: "Satisfait ou remboursé 14 jours" },
              { icon: CreditCard, label: "Aucune CB pour l'essai" },
              { icon: RotateCcw, label: "Annulation en 1 clic" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className="flex items-center justify-center rounded-lg flex-shrink-0"
                  style={{ width: 32, height: 32, background: "rgba(201,168,76,0.1)" }}
                >
                  <Icon size={15} style={{ color: "#C9A84C" }} />
                </div>
                <span className="text-xs font-semibold" style={{ color: "#C9A84C" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* PRICING */}
      <section className="px-5 py-12 max-w-2xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-2">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "#7A8A7A" }}
            >
              L&apos;investissement
            </p>
            <h2
              className="font-serif font-bold text-2xl md:text-3xl mb-2"
              style={{ color: "#F5F0E8" }}
            >
              Moins cher qu&apos;une leçon particulière
            </h2>
            <p className="text-sm" style={{ color: "#7A8A7A" }}>
              <span style={{ textDecoration: "line-through", color: "#3A4A3A" }}>70€/h</span>
              {" "}pour un coach particulier. Ici, c&apos;est moins de 0,65€/jour.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 mt-8">
          {/* Mensuel */}
          <ScrollReveal>
            <div
              className="p-5 h-full"
              style={{
                background: "#1B3A2A",
                border: "1px solid #2A4A35",
                borderRadius: 16,
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "#7A8A7A" }}
              >
                Mensuel
              </p>
              <div className="flex items-end gap-1 mb-1">
                <span className="font-serif text-4xl font-bold" style={{ color: "#C9A84C" }}>
                  19€
                </span>
                <span className="text-sm mb-1.5" style={{ color: "#7A8A7A" }}>
                  /mois
                </span>
              </div>
              <p className="text-xs mb-5" style={{ color: "#7A8A7A" }}>
                Sans engagement
              </p>
              <div className="space-y-2 mb-5">
                {includes.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle size={12} className="flex-shrink-0" style={{ color: "#C9A84C" }} />
                    <span className="text-xs" style={{ color: "#F5F0E8" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/auth/inscription"
                className="block w-full font-bold text-sm py-3 rounded-xl text-center transition-opacity hover:opacity-80"
                style={{ background: "rgba(201,168,76,0.12)", color: "#C9A84C" }}
              >
                Commencer
              </Link>
            </div>
          </ScrollReveal>

          {/* Annuel */}
          <ScrollReveal delay={100}>
            <div
              className="p-5 h-full relative"
              style={{
                background: "#1B3A2A",
                border: "2px solid #C9A84C",
                borderRadius: 16,
              }}
            >
              <div
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap tracking-wider"
                style={{
                  background: "linear-gradient(135deg, #C9A84C, #DFC060)",
                  color: "#0F2318",
                  boxShadow: "0 4px 12px rgba(201,168,76,0.4)",
                }}
              >
                ⭐ MEILLEUR CHOIX
              </div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "#7A8A7A" }}
              >
                Annuel
              </p>
              <div className="flex items-end gap-1 mb-1">
                <span className="font-serif text-4xl font-bold" style={{ color: "#C9A84C" }}>
                  149€
                </span>
                <span className="text-sm mb-1.5" style={{ color: "#7A8A7A" }}>
                  /an
                </span>
              </div>
              <p className="text-xs mb-5 font-semibold" style={{ color: "#C9A84C" }}>
                soit 12,40€/mois · Tu économises 79€ (−35 %)
              </p>
              <div className="space-y-2 mb-5">
                {includes.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle size={12} className="flex-shrink-0" style={{ color: "#C9A84C" }} />
                    <span className="text-xs" style={{ color: "#F5F0E8" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/auth/inscription"
                className="block w-full font-bold text-sm py-3 rounded-xl text-center transition-opacity hover:opacity-90"
                style={{ background: "#C9A84C", color: "#0F2318" }}
              >
                Commencer · Meilleur tarif
              </Link>
              <p className="text-xs mt-2.5 text-center" style={{ color: "#7A8A7A" }}>
                Satisfait ou remboursé 14 jours
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-12 max-w-2xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-8">
            <h2 className="font-serif font-bold text-2xl md:text-3xl" style={{ color: "#F5F0E8" }}>
              Questions fréquentes
            </h2>
          </div>
        </ScrollReveal>
        <div className="space-y-2">
          {faqItems.map(({ icon: Icon, q, a }) => (
            <details
              key={q}
              data-faq
              className="overflow-hidden"
              style={{
                background: "#1B3A2A",
                borderRadius: 12,
                boxShadow: "none",
              }}
            >
              <summary
                className="flex items-center justify-between px-4 py-4 cursor-pointer font-semibold text-sm [&::-webkit-details-marker]:hidden select-none"
                style={{ color: "#F5F0E8", listStyle: "none" }}
              >
                <span className="flex items-center gap-2.5">
                  <Icon size={14} style={{ color: "#C9A84C", flexShrink: 0 }} />
                  {q}
                </span>
                <span
                  className="ls-faq-icon text-xl flex-shrink-0 ml-3 font-light"
                  style={{ color: "#C9A84C" }}
                >
                  +
                </span>
              </summary>
              <p className="px-4 pb-4 text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.72)" }}>
                {a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* GOLD DIVIDER */}
      <GoldDivider />

      {/* CTA FINAL */}
      <section
        className="relative overflow-hidden px-5 py-16"
        style={{ background: "linear-gradient(145deg, #0F2318 0%, #132B1E 100%)" }}
      >
        <div
          className="absolute pointer-events-none"
          style={{
            top: -80,
            right: -80,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.15), transparent 70%)",
          }}
        />
        <div className="relative max-w-xl mx-auto text-center">
          <h2
            className="font-serif font-bold text-2xl md:text-4xl mb-5 leading-tight"
            style={{ color: "#F5F0E8" }}
          >
            Dans 6 mois, tu seras le même golfeur.
            <br />
            <em style={{ color: "#C9A84C" }}>Ou pas.</em>
          </h2>
          <p
            className="text-sm md:text-base mb-8 max-w-md mx-auto"
            style={{ color: "rgba(245,240,232,0.72)", lineHeight: 1.85 }}
          >
            14 jours pour découvrir. Aucun risque. La progression, elle, est au bout.
          </p>

          <Link
            href="/auth/inscription"
            className="inline-flex items-center justify-center gap-2 font-bold text-sm md:text-base px-7 py-4 rounded-2xl mb-3 transition-opacity hover:opacity-90"
            style={{ background: "#C9A84C", color: "#0F2318" }}
          >
            Démarre tes 14 jours gratuits
            <ChevronRight size={18} />
          </Link>
          <p className="text-xs" style={{ color: "rgba(245,240,232,0.38)" }}>
            Pas de CB · Annulation 1 clic · Sans engagement
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="px-5 py-8 text-center"
        style={{ borderTop: "1px solid #2A4A35", background: "#0A1A10" }}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Image src="/ls-club-logo.svg" alt="LS Club" width={24} height={24} className="rounded-lg" />
          <span className="font-serif font-bold text-sm" style={{ color: "#F5F0E8" }}>
            LS Club
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 mb-3 text-xs" style={{ color: "#7A8A7A" }}>
          <Link href="/auth/connexion" className="hover:underline" style={{ color: "#7A8A7A" }}>
            Se connecter
          </Link>
          <a href="#" className="hover:underline" style={{ color: "#7A8A7A" }}>
            Mentions légales
          </a>
          <a href="#" className="hover:underline" style={{ color: "#7A8A7A" }}>
            CGU
          </a>
          <a href="#" className="hover:underline" style={{ color: "#7A8A7A" }}>
            Confidentialité
          </a>
          <a href="#" className="hover:underline" style={{ color: "#7A8A7A" }}>
            Contact
          </a>
        </div>
        <div className="flex justify-center gap-3 mb-3">
          <a
            href="#"
            className="flex items-center justify-center rounded-lg transition-opacity hover:opacity-70"
            style={{ width: 30, height: 30, background: "rgba(201,168,76,0.08)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
              <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#C9A84C" stroke="none"/>
            </svg>
          </a>
          <a
            href="#"
            className="flex items-center justify-center rounded-lg transition-opacity hover:opacity-70"
            style={{ width: 30, height: 30, background: "rgba(201,168,76,0.08)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="#C9A84C" stroke="none"/>
            </svg>
          </a>
        </div>
        <p className="text-xs" style={{ color: "#3A4A3A" }}>
          © 2025 LS Club · Laurent Seinger · Tous droits réservés
        </p>
      </footer>

      {/* STICKY MOBILE CTA */}
      <StickyCTA />
    </div>
  );
}
