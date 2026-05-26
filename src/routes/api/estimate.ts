import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { z } from "zod";

const RequestSchema = z.object({
  description: z.string().min(10).max(2000),
});

const SYSTEM_PROMPT = `Tu es l'assistant d'estimation MELIYA. Analyse la description du projet d'un client et renvoie UNIQUEMENT un JSON strict (pas de Markdown, pas de texte autour) avec ces champs :

{
  "services": ["slides" | "documents" | "identite", ...],   // liste des prestations recommandées
  "slidesCount": number | null,                              // nombre de slides estimé si pertinent
  "pagesCount": number | null,                               // nombre de pages estimé si pertinent
  "identiteRetouches": number | null,                        // retouches additionnelles 0-5 si Pack Up
  "finition": "essentiel" | "premium" | "excellence",        // niveau de finition recommandé
  "totalEstime": number,                                     // total en € HT calculé selon barème ci-dessous
  "summary": string,                                         // 1-2 phrases en français, ton chaleureux pro, expliquant la reco
  "nextStep": string                                         // une seule phrase d'invitation (ex: "Réservons un échange de 20 min")
}

BARÈME OFFICIEL (TVA non applicable) :
- slides : 30 €/slide. -10% dès 10 slides, -15% dès 20 slides. Au-delà de 30 : null + "sur devis".
- documents : 25 €/page. -10% dès 10 pages, -15% dès 20 pages. Au-delà de 30 pages : null + "sur devis".
- identite : 479 € forfait. Multiplicateur finition : Essentiel ×1, Premium ×1.20, Excellence ×1.40. Retouches additionnelles : +30 €/unité (max 5).

RÈGLES :
- Si la demande est vague, propose des valeurs raisonnables (10 slides par défaut pour un "pitch", 8 pages pour un "ebook court", etc.) et explique dans summary.
- Toujours calculer totalEstime selon le barème exact, en sommant les services choisis avec les remises et le multiplicateur de finition appliqué sur identite UNIQUEMENT.
- Si la demande sort des prestations MELIYA (dev web, vidéo, etc.), renvoie services: [], totalEstime: 0 et redirige poliment dans summary.
- Ne JAMAIS inventer un service hors liste.`;

type AIResult = {
  services?: string[];
  slidesCount?: number | null;
  pagesCount?: number | null;
  identiteRetouches?: number | null;
  finition?: "essentiel" | "premium" | "excellence";
  totalEstime?: number;
  summary?: string;
  nextStep?: string;
};

async function callOpenAI(description: string, apiKey: string): Promise<AIResult> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: description },
      ],
      temperature: 0.2,
      max_tokens: 400,
      response_format: { type: "json_object" },
    }),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI ${response.status}: ${text.slice(0, 200)}`);
  }
  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const raw = data.choices?.[0]?.message?.content?.trim() ?? "{}";
  return JSON.parse(raw) as AIResult;
}

function readApiKey(): string | undefined {
  if (typeof process !== "undefined" && process.env?.OPENAI_API_KEY) {
    return process.env.OPENAI_API_KEY;
  }
  return (globalThis as { OPENAI_API_KEY?: string }).OPENAI_API_KEY;
}

export const Route = createFileRoute("/api/estimate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = readApiKey();
        if (!apiKey) {
          return new Response(JSON.stringify({ error: "Service d'estimation IA indisponible." }), {
            status: 503,
            headers: { "Content-Type": "application/json" },
          });
        }
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "Requête invalide." }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }
        const parsed = RequestSchema.safeParse(body);
        if (!parsed.success) {
          return new Response(JSON.stringify({ error: "Description trop courte." }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }
        try {
          const estimate = await callOpenAI(parsed.data.description, apiKey);
          return new Response(JSON.stringify(estimate), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-store",
            },
          });
        } catch (err) {
          console.error("[api/estimate]", err);
          return new Response(JSON.stringify({ error: "Estimation impossible pour le moment." }), {
            status: 502,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
