import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, FileText, Presentation, Palette, Clock } from "lucide-react";

export const Route = createFileRoute("/prestations")({
  head: () => ({
    meta: [
      { title: "Prestations & Tarifs — MELIYA" },
      { name: "description", content: "Prestations professionnelles à tarif accessible — jusqu'à 3x moins cher qu'un graphiste freelance. Slides dès 30€, pages dès 25€, pack identité 579€." },
    ],
  }),
  component: Prestations,
});

function Prestations() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
      <div className="text-center mb-14">
        <span className="text-xs tracking-[0.25em] uppercase text-[color:var(--gold)]">Tarifs</span>
        <h1 className="display text-4xl md:text-5xl mt-3 text-[#071735]">Mes prestations</h1>
        <div className="gold-divider mt-4 max-w-xs mx-auto" />
        <p className="serif italic text-xl text-[#0D2B6B]/80 mt-6 max-w-3xl mx-auto">
          Des prestations professionnelles à tarif accessible — jusqu'à 3x moins cher qu'un graphiste freelance.
        </p>
        <p className="text-xs text-[#071735]/60 mt-3 max-w-2xl mx-auto">
          Tous les tarifs sont fermes et définitifs. TVA non applicable — art. 293 B du CGI.
        </p>
      </div>

      {/* Tarifs à l'unité */}
      <div className="grid md:grid-cols-2 gap-6 mb-14">
        <div className="card-meliya relative">
          <Presentation className="h-8 w-8 mb-4" style={{color:"#CFA27A"}} />
          <h2 className="display text-2xl text-[#071735] mb-1">Mise en forme de slides</h2>
          <p className="text-sm text-[#071735]/60 mb-6">Présentations, pitchs, formations</p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="display text-5xl text-[#0D2B6B]">30€</span>
            <span className="text-sm text-[#071735]/60">/ slide (1 à 5 slides)</span>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between gap-2 py-1.5 border-b border-[#CFA27A]/20"><span>Pack 15 slides</span><span className="display text-[#0D2B6B]">389€</span></li>
            <li className="flex justify-between gap-2 py-1.5 border-b border-[#CFA27A]/20"><span>Pack 20 slides</span><span className="display text-[#0D2B6B]">499€</span></li>
            <li className="flex justify-between gap-2 py-1.5"><span>21 slides et +</span><span className="display text-[#0D2B6B]">Sur devis</span></li>
          </ul>
          <p className="text-xs text-[#071735]/60 mt-4 italic">2 retouches incluses (ajustements mineurs) - au-delà : 60€/h</p>
        </div>

        <div className="card-meliya relative">
          <FileText className="h-8 w-8 mb-4" style={{color:"#CFA27A"}} />
          <h2 className="display text-2xl text-[#071735] mb-1">Mise en forme de pages</h2>
          <p className="text-sm text-[#071735]/60 mb-6">Rapports, livrets, ebooks, dossiers</p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="display text-5xl text-[#0D2B6B]">25€</span>
            <span className="text-sm text-[#071735]/60">/ page (1 à 5 pages)</span>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between gap-2 py-1.5 border-b border-[#CFA27A]/20"><span>Pack 15 pages</span><span className="display text-[#0D2B6B]">319€</span></li>
            <li className="flex justify-between gap-2 py-1.5 border-b border-[#CFA27A]/20"><span>Pack 20 pages</span><span className="display text-[#0D2B6B]">399€</span></li>
            <li className="flex justify-between gap-2 py-1.5"><span>21 pages et +</span><span className="display text-[#0D2B6B]">Sur devis</span></li>
          </ul>
          <p className="text-xs text-[#071735]/60 mt-4 italic">2 retouches incluses (ajustements mineurs) - au-delà : 60€/h</p>
        </div>
      </div>

      {/* Pack visuel */}
      <div className="card-meliya mb-14 relative overflow-hidden" style={{background:"#071735", color:"#F7F4EF", borderColor:"#CFA27A"}}>
        <div className="btn-blink absolute top-4 right-4">BEST-SELLER</div>
        <Palette className="h-8 w-8 mb-4" style={{color:"#CFA27A"}} />
        <h2 className="display text-3xl mb-1">Pack identité visuelle</h2>
        <p className="serif italic opacity-80 mb-6">Pour créateurs d'entreprise qui veulent démarrer avec une identité simple, cohérente et prête à l'emploi.</p>
        <div className="flex items-baseline gap-2 mb-6">
          <span className="display text-5xl" style={{color:"#CFA27A"}}>579€</span>
          <span className="text-sm opacity-70">prix unique</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          {[
            "Logo simple — 3 propositions",
            "Palette de couleurs harmonisée",
            "Mini charte graphique",
            "Modèles devis & factures personnalisés",
            "100 cartes de visite imprimées et livrées (finition standard, livraison prioritaire incluses).",
            "2 retouches incluses (ajustements mineurs)",
          ].map((f) => (
            <div key={f} className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" style={{color:"#CFA27A"}} /> {f}</div>
          ))}
        </div>
        <ul className="text-xs opacity-80 mt-6 space-y-1">
          <li>• Livraison en 10 jours ouvrés après réception du brief complet</li>
          <li>• Le tarif de ce pack est fixe et non modulable. Toute demande hors périmètre fera l'objet d'un devis séparé.</li>
          <li>• Carte de visite : finitions premium (bords arrondis, effet glacé, pelliculage, etc.) disponibles en option, facturées au coût réel d'impression.</li>
        </ul>
        <p className="text-xs opacity-60 mt-4 italic">Ce pack ne remplace pas le travail d'un graphiste designer - Il vous aide à démarrer professionnellement.</p>
      </div>

      {/* Tarif horaire */}
      <div className="card-meliya text-center max-w-2xl mx-auto">
        <Clock className="h-8 w-8 mx-auto mb-4" style={{color:"#CFA27A"}} />
        <h2 className="display text-2xl text-[#071735] mb-2">Tarif horaire</h2>
        <p className="text-sm text-[#071735]/60 mb-4">Pour toute prestation sur-mesure définie au cas par cas</p>
        <div className="flex items-baseline justify-center gap-2">
          <span className="display text-5xl text-[#0D2B6B]">60€</span>
          <span className="text-sm text-[#071735]/60">/ heure</span>
        </div>
        <p className="text-xs text-[#071735]/60 mt-4">Devis personnalisé systématique avant toute intervention.</p>
      </div>

      <div className="text-center mt-14">
        <Link to="/simulateur" className="btn-primary-meliya">Simuler mon devis</Link>
      </div>
    </div>
  );
}
