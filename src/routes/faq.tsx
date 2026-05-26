import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ MELIYA" },
      {
        name: "description",
        content: "Réponses aux questions fréquentes sur les prestations MELIYA.",
      },
    ],
  }),
  component: FAQ,
});

const faqs = [
  {
    q: "Quelle est la différence entre vous et une assistante administrative ?",
    a: "Une assistante administrative gère le quotidien (courriers, factures, agenda). MELIYA est une assistante digitale spécialisée : je structure, mets en forme et valorise vos documents pour qu'ils soient professionnels, cohérents et impactants.",
  },
  {
    q: "Sous quel format livrez-vous mes documents ?",
    a: "Je livre en PDF haute qualité par défaut, et je vous fournis également les fichiers sources modifiables (PowerPoint, Word, Canva selon le projet).",
  },
  {
    q: "Quels sont les délais de livraison ?",
    a: "📊 Slides sur mesure\n• 1 à 5 slides : 2 à 4 jours ouvrés\n• 10 à 19 slides : 5 à 8 jours ouvrés\n• 20 slides et + : planning personnalisé\n\n📄 Documents sur mesure\n• 1 à 10 pages : 3 à 5 jours ouvrés\n• 10 à 20 pages : 5 à 8 jours ouvrés\n• 20 pages et + : planning personnalisé\n\n🎨 Pack identité visuelle\n• 7 à 14 jours ouvrés selon les éléments demandés\n\n✨ Les délais peuvent varier selon la complexité du projet et les retours.",
  },
  {
    q: "Combien de temps prend une prestation ?",
    a: "Cela dépend du volume. Comptez 2 à 5 jours ouvrés pour une présentation de 10-20 slides, 5 à 10 jours pour un document de 20+ pages. Un délai précis est indiqué dans votre devis.",
  },
  {
    q: "Combien de retouches sont incluses ?",
    a: "2 séries de retouches sont incluses dans tous les tarifs unitaires et le Pack Up. Au-delà, des retouches complémentaires sont facturées au tarif horaire.",
  },
  {
    q: "Travaillez-vous à distance ?",
    a: "Oui, exclusivement à distance. Tous les échanges se font par email, visio ou téléphone selon votre préférence.",
  },
  {
    q: "Comment se déroule un projet ?",
    a: "1. Échange initial gratuit pour cerner votre besoin. 2. Devis personnalisé. 3. Acompte de 30%. 4. Réalisation. 5. Retouches. 6. Livraison finale et solde.",
  },
  {
    q: "Le Pack Up remplace-t-il un graphiste ?",
    a: "Non. Il s'agit d'une aide au démarrage pour les créateurs d'entreprise qui ont besoin d'une identité cohérente rapidement. Pour un projet de branding complet et stratégique, je vous recommande un graphiste designer.",
  },
  {
    q: "Mes documents restent-ils confidentiels ?",
    a: "Absolument. Confidentialité totale, contrat de NDA possible sur demande, et vos fichiers ne sont jamais partagés ni utilisés à d'autres fins.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
      <div className="text-center mb-14">
        <span className="text-xs tracking-[0.25em] uppercase text-[color:var(--gold)]">
          Questions fréquentes
        </span>
        <h1 className="display text-4xl md:text-5xl mt-3 text-[#5E5248]">FAQ</h1>
        <div className="gold-divider mt-4 max-w-xs mx-auto" />
      </div>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="card-meliya !p-0 overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 p-6 text-left"
            >
              <span className="display text-base md:text-lg text-[#5E5248]">{f.q}</span>
              {open === i ? (
                <Minus className="h-5 w-5 shrink-0" style={{ color: "#D4B896" }} />
              ) : (
                <Plus className="h-5 w-5 shrink-0" style={{ color: "#D4B896" }} />
              )}
            </button>
            {open === i && (
              <div
                className="px-6 pb-6 text-sm text-[#5E5248] leading-relaxed border-t border-[#D4B896]/20 pt-4"
                style={{ whiteSpace: "pre-line" }}
              >
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
