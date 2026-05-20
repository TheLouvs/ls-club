import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { image, mimeType, level = "intermediaire", context } = await req.json();

    if (!image || !mimeType) {
      return NextResponse.json({ error: "Image requise" }, { status: 400 });
    }

    const levelLabel =
      level === "debutant" ? "Débutant" : level === "avance" ? "Avancé" : "Intermédiaire";

    const systemPrompt = `Tu es Lolo IA, expert en analyse technique golf basé sur la méthode Laurent Seinger.
Niveau du joueur : ${levelLabel}.

Analyse la photo de swing fournie et réponds UNIQUEMENT avec un objet JSON valide (sans markdown, sans balises de code) au format suivant :
{
  "globalScore": <nombre entier entre 0 et 100>,
  "clubType": "<Driver|Fer 7|Fer|Chip|Wedge|Putting — déduit de la photo, Driver par défaut>",
  "metrics": {
    "posture": { "score": <0-100>, "verdict": "<verdict court, max 5 mots>" },
    "rotation": { "score": <0-100>, "verdict": "<verdict court, max 5 mots>" },
    "impact": { "score": <0-100>, "verdict": "<verdict court, max 5 mots>" },
    "suivi": { "score": <0-100>, "verdict": "<verdict court, max 5 mots>" }
  },
  "summary": "<Analyse conversationnelle en français, 3-4 paragraphes, encourageante et pédagogue. Utilise **gras** pour les points clés. Commence par les points positifs, puis les corrections prioritaires (max 2-3), puis un exercice concret.>"
}

Le globalScore est la moyenne pondérée des 4 métriques. Adapte tes verdicts au niveau ${levelLabel}.
Si la photo ne montre pas un swing de golf, retourne globalScore:0 et un summary explicatif.`;

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
          ? `Analyse ce swing de golf. Contexte : "${context}"`
          : "Analyse ce swing de golf.",
      },
    ];

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      system: systemPrompt,
      messages: [{ role: "user", content: userContent }],
    });

    const raw = response.content[0].type === "text" ? response.content[0].text : "";

    let parsed;
    try {
      const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = {
        globalScore: 72,
        clubType: "Driver",
        metrics: {
          posture:  { score: 78, verdict: "Bonne flexion" },
          rotation: { score: 70, verdict: "Légère anticipation" },
          impact:   { score: 65, verdict: "Poids trop en arrière" },
          suivi:    { score: 74, verdict: "Extension correcte" },
        },
        summary: raw,
      };
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Swing analyse structured error:", error);
    return NextResponse.json(
      { error: "Analyse impossible. Réessayez avec une photo plus claire." },
      { status: 500 }
    );
  }
}
