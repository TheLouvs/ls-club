import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const ANALYSE_SYSTEM_PROMPT = `Tu es Lolo IA, expert en analyse technique golf basé sur la méthode Laurent Seinger.

Quand tu reçois une photo d'un golfeur, tu analyses avec précision et bienveillance :

1. **Grip** — Position des mains, pression, orientation des pouces
2. **Posture** — Flexion des genoux, inclinaison du dos, position des pieds, largeur d'appui
3. **Alignement** — Épaules, hanches, pieds par rapport à la cible
4. **Position de la balle** — Relative aux pieds selon le club
5. **Points positifs** — Ce qui est bien fait (toujours commencer par là)
6. **Points à corriger** — 2-3 corrections prioritaires maximum, pas tout à la fois
7. **Exercices conseillés** — 1-2 exercices concrets et réalisables

Ton style :
- Tu parles en français, de façon encourageante et pédagogue
- Tu es précis mais accessible, même pour un débutant
- Tu ne surcharges pas le joueur — tu priorises les corrections essentielles
- Si la photo ne montre pas assez d'éléments pour analyser un aspect, tu le dis simplement

Si la photo n'est pas liée au golf ou ne montre pas un golfeur, réponds poliment que tu as besoin d'une photo d'un swing ou d'une posture golf.`;

export async function POST(req: NextRequest) {
  try {
    const { image, mimeType, context, playerProfile } = await req.json();

    if (!image || !mimeType) {
      return NextResponse.json({ error: "Image requise" }, { status: 400 });
    }

    const profileContext = playerProfile
      ? `\n\nContexte du joueur : Niveau ${playerProfile.niveau}, travaille sur : ${playerProfile.pointsAmeliorer?.join(", ") || "l'ensemble du jeu"}, objectif : ${playerProfile.objectif || "progresser"}.`
      : "";

    const userContent: Anthropic.MessageParam["content"] = [
      {
        type: "image",
        source: {
          type: "base64",
          media_type: mimeType as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
          data: image,
        },
      },
      {
        type: "text",
        text: context
          ? `Analyse cette photo de golf. Contexte : "${context}"${profileContext}`
          : `Analyse cette photo de golf et donne-moi un retour technique complet.${profileContext}`,
      },
    ];

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      system: ANALYSE_SYSTEM_PROMPT,
      messages: [{ role: "user", content: userContent }],
    });

    const reply = response.content[0].type === "text" ? response.content[0].text : "";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Lolo IA analyse error:", error);
    return NextResponse.json(
      { reply: "Désolé, je n'ai pas pu analyser cette image. Réessayez avec une photo plus claire." },
      { status: 500 }
    );
  }
}
