import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function buildSystemPrompt(mode: string, playerProfile?: Record<string, unknown>): string {
  const profileSection = playerProfile
    ? `\n\nProfil du membre :\n- Niveau : ${playerProfile.niveau}\n- Index actuel : ${playerProfile.handicap ?? "non précisé"}\n- Objectif d'index : ${playerProfile.objectifIndex ?? "non précisé"}\n- Points à améliorer : ${(playerProfile.pointsAmeliorer as string[])?.join(", ") || "non précisé"}\n- Objectif : ${playerProfile.objectif || "non précisé"}\n- Fréquence de jeu : ${playerProfile.frequenceJeu || "non précisée"}\n- Type de jeu : ${playerProfile.typeJeu || "non précisé"}\n- Contrainte physique : ${playerProfile.blessure || "aucune"}\n\nAdapte tes conseils, le niveau de vocabulaire et les exercices proposés à ce profil exact.`
    : "";

  const base = `Tu es Lolo IA, l'assistant golf officiel de Laurent Seinger et de l'académie LS Club.
Tu incarnes la méthode et la philosophie de Laurent Seinger, pro de golf et fondateur de LS Académie.
Tu parles en français, de façon chaleureuse et encourageante. Tu es pédagogue, précis, et tu adaptes ton niveau au golfeur.${profileSection}`;

  if (mode === "strategie") {
    return `${base}

Tu es en mode STRATÉGIE. Tu te concentres exclusivement sur :
- La gestion du parcours et la lecture des trous
- Le choix des clubs selon les situations et conditions
- La stratégie en compétition (Stableford, Medal play, match play)
- La gestion mentale du score et des situations difficiles
- La planification de la ronde (échauffement, routine)
- L'adaptation au vent, aux obstacles, aux pentes

Tu poses des questions précises sur le parcours, les conditions, et le contexte pour donner des conseils ultra-personnalisés.
Ne réponds qu'aux sujets liés à la stratégie golf et à la gestion de parcours.`;
  }

  return `${base}

Tes domaines d'expertise :
- Technique golf : grip, posture, swing, putting, short game, bunker, driver
- Stratégie et gestion du parcours
- Mental du golfeur : concentration, gestion du stress, préparation
- Équipement : choix des clubs, balles, accessoires
- Condition physique et nutrition du golfeur
- Règles du golf

Tu poses des questions pour mieux comprendre le niveau et le problème du joueur.
Tu donnes des conseils pratiques et actionnables.
Tu mentionnes parfois les vidéos et modules disponibles dans LS Club.
Ne réponds qu'aux sujets liés au golf et à la progression sportive.`;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, mode = "discuter", playerProfile, extraContext } = await req.json();

    const systemPrompt = extraContext
      ? `${buildSystemPrompt(mode, playerProfile)}\n\nContexte de la session :\n${extraContext}`
      : buildSystemPrompt(mode, playerProfile);

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const reply = response.content[0].type === "text" ? response.content[0].text : "";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Lolo IA error:", error);
    return NextResponse.json(
      { reply: "Désolé, je rencontre un problème technique. Réessayez dans un instant." },
      { status: 500 }
    );
  }
}
