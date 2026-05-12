import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, FileText, Presentation, Palette, Clock } from "lucide-react";

export const Route = createFileRoute("/prestations")({
  head: () => ({
    meta: [
      { title: "Prestations & Tarifs — MELIYA" },
      { name: "description", content: "Mise en forme de slides à 30€, pages à 25€, pack visuel à 490€. Tarifs clairs et dégressifs." },
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
        <p className="serif italic text-xl text-[#0D2B6B]/80 mt-6 max-w-2xl mx-auto">
          Des tarifs clairs, simples et dégressifs. Un devis personnalisé pour chaque projet.
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
            <span className="text-sm text-[#071735]/60">/ slide</span>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" style={{color:"#CFA27A"}} /> Mise en page éditoriale premium</li>
            <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" style={{color:"#CFA27A"}} /> Harmonisation visuelle complète</li>
            <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" style={{color:"#CFA27A"}} /> Iconographie & visuels intégrés</li>
            <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" style={{color:"#CFA27A"}} /> 2 retouches incluses</li>
          </ul>
          <div className="mt-6 inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full" style={{background:"#EFC1CB", color:"#071735"}}>
            ✨ Dégressif dès 15 slides
          </div>
        </div>

        <div className="card-meliya relative">
          <FileText className="h-8 w-8 mb-4" style={{color:"#CFA27A"}} />
          <h2 className="display text-2xl text-[#071735] mb-1">Mise en forme de pages</h2>
          <p className="text-sm text-[#071735]/60 mb-6">Rapports, livrets, ebooks, dossiers</p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="display text-5xl text-[#0D2B6B]">25€</span>
            <span className="text-sm text-[#071735]/60">/ page</span>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" style={{color:"#CFA27A"}} /> Structuration claire & cohérente</li>
            <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" style={{color:"#CFA27A"}} /> Typographie soignée</li>
            <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" style={{color:"#CFA27A"}} /> Sommaire & numérotation</li>
            <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" style={{color:"#CFA27A"}} /> 2 retouches incluses</li>
          </ul>
          <div className="mt-6 inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full" style={{background:"#EFC1CB", color:"#071735"}}>
            ✨ Dégressif dès 15 pages
          </div>
        </div>
      </div>

      {/* Tarif dégressif */}
      <div className="card-meliya mb-14" style={{background:"linear-gradient(135deg, #F7F4EF, #fff)"}}>
        <h3 className="display text-xl text-[#071735] mb-4 text-center">Tarifs dégressifs</h3>
        <div className="grid sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-lg bg-white border border-[#CFA27A]/30">
            <div className="text-xs uppercase tracking-wider text-[#071735]/60 mb-1">1 — 14 unités</div>
            <div className="display text-2xl text-[#0D2B6B]">Tarif plein</div>
          </div>
          <div className="p-4 rounded-lg bg-white border border-[#CFA27A]/30">
            <div className="text-xs uppercase tracking-wider text-[#071735]/60 mb-1">15 — 29 unités</div>
            <div className="display text-2xl text-[#0D2B6B]">−10%</div>
          </div>
          <div className="p-4 rounded-lg" style={{background:"#CFA27A", color:"#071735"}}>
            <div className="text-xs uppercase tracking-wider mb-1">30 unités & +</div>
            <div className="display text-2xl">−20%</div>
          </div>
        </div>
      </div>

      {/* Pack visuel */}
      <div className="card-meliya mb-14 relative overflow-hidden" style={{background:"#071735", color:"#F7F4EF", borderColor:"#CFA27A"}}>
        <div className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full" style={{background:"#CFA27A", color:"#071735"}}>BEST-SELLER</div>
        <Palette className="h-8 w-8 mb-4" style={{color:"#CFA27A"}} />
        <h2 className="display text-3xl mb-1">Pack visuel — Aide au démarrage</h2>
        <p className="serif italic opacity-80 mb-6">Pour créateurs & créatrices d'entreprise qui veulent démarrer avec une identité simple, cohérente et prête à l'emploi.</p>
        <div className="flex items-baseline gap-2 mb-6">
          <span className="display text-5xl" style={{color:"#CFA27A"}}>490€</span>
          <span className="text-sm opacity-70">tarif unique</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          {[
            "Logo simple — 3 propositions + retouches",
            "Carte de visite (avec ou sans QR Code) — 100 ex.",
            "Modèles de devis & factures personnalisés",
            "Palette de couleurs harmonisée",
            "Mini charte graphique offerte",
            "Identité visuelle cohérente sur tous supports",
          ].map((f) => (
            <div key={f} className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" style={{color:"#CFA27A"}} /> {f}</div>
          ))}
        </div>
        <p className="text-xs opacity-60 mt-6 italic">Ce pack ne remplace pas le travail d'un graphiste designer — il vous aide à démarrer professionnellement.</p>
      </div>

      {/* Tarif horaire */}
      <div className="card-meliya text-center max-w-2xl mx-auto">
        <Clock className="h-8 w-8 mx-auto mb-4" style={{color:"#CFA27A"}} />
        <h2 className="display text-2xl text-[#071735] mb-2">Tarif horaire</h2>
        <p className="text-sm text-[#071735]/60 mb-4">Pour toute prestation sur-mesure définie au cas par cas</p>
        <div className="flex items-baseline justify-center gap-2">
          <span className="display text-5xl text-[#0D2B6B]">45€</span>
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
