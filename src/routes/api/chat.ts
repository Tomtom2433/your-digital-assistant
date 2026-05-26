import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { z } from "zod";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().min(1).max(4000),
});

const RequestSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(40),
});

const SYSTEM_PROMPT = `Tu es MELI, l'assistante IA virtuelle du site MELIYA — service d'assistante digitale spécialisée dans la création de documents professionnels haut de gamme. Mélody Roche dirige MELIYA depuis Langon (Gironde, France), 100% à distance.

PRESTATIONS & TARIFS officiels (TVA non applicable, art. 293 B CGI) :
- Slides sur mesure : 30 €/slide. Dégressivité : -10% dès 10 slides, -15% dès 20 slides. Au-delà de 30 : sur devis.
- Documents sur mesure : 25 €/page (rapports, livrets, ebooks, dossiers). Dégressivité : -10% dès 10 pages, -15% dès 20 pages. Au-delà de 30 pages : sur devis.
- Pack Up Identité : 479 € forfait (logo 3 propositions, mini charte graphique, palette harmonisée, modèles devis/factures, 2 retouches mineures incluses).
- Tarif horaire pour le sur-mesure non listé : 60 €/h.

NIVEAUX DE FINITION (pour Pack Up Identité) : Essentiel (inclus), Premium +20%, Excellence +40%.

DÉLAIS habituels : 5 à 14 jours ouvrés selon volume et complexité, planning personnalisé au-delà.

POSITIONNEMENT : élégance, précision, premium accessible, image professionnelle valorisée, supports digitaux haut de gamme.

CONTACT : contact@meliya.fr — rendez-vous visio ou téléphone selon préférence — 100% à distance France entière.

RÈGLES :
- Réponds en français, ton chaleureux et professionnel, tutoiement OK si l'utilisateur tutoie sinon vouvoiement.
- Reste concise : 2-4 phrases max sauf demande d'estimation détaillée.
- Si l'utilisateur veut un devis chiffré, propose le simulateur (/simulateur) ou un contact direct (/contact).
- Ne JAMAIS inventer un tarif hors barème ci-dessus. Pour le sur-mesure complexe, oriente vers "demande de devis personnalisé".
- Ne te présente pas comme une IA externe ni ne mentionne OpenAI. Tu es "MELI, l'assistante virtuelle de MELIYA".
- Si question hors-sujet (météo, politique, etc.) : recentre poliment sur les services MELIYA.`;

async function callOpenAI(messages: { role: string; content: string }[], apiKey: string) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.6,
      max_tokens: 320,
    }),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI ${response.status}: ${text.slice(0, 200)}`);
  }
  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

function readApiKey(): string | undefined {
  if (typeof process !== "undefined" && process.env?.OPENAI_API_KEY) {
    return process.env.OPENAI_API_KEY;
  }
  const globalEnv = (globalThis as { OPENAI_API_KEY?: string }).OPENAI_API_KEY;
  return globalEnv;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = readApiKey();
        if (!apiKey) {
          return new Response(JSON.stringify({ error: "Service IA momentanément indisponible." }), {
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
          return new Response(JSON.stringify({ error: "Format de message invalide." }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        try {
          const reply = await callOpenAI(parsed.data.messages, apiKey);
          if (!reply) {
            return new Response(JSON.stringify({ error: "Aucune réponse générée. Réessaye ?" }), {
              status: 502,
              headers: { "Content-Type": "application/json" },
            });
          }
          return new Response(JSON.stringify({ reply }), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-store",
            },
          });
        } catch (err) {
          console.error("[api/chat]", err);
          return new Response(
            JSON.stringify({ error: "Une erreur est survenue. Réessaye plus tard." }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }
      },
    },
  },
});
