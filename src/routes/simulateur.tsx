import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Sparkles, Calculator } from "lucide-react";

export const Route = createFileRoute("/simulateur")({
  head: () => ({
    meta: [
      { title: "Simulateur de prestations — MELIYA" },
      { name: "description", content: "Estimez le coût de votre projet en quelques clics. Tarifs dégressifs intégrés." },
    ],
  }),
  component: Simulateur,
});

function Simulateur() {
  const [slides, setSlides] = useState(10);
  const [pages, setPages] = useState(0);
  const [pack, setPack] = useState(false);

  const total = useMemo(() => {
    const calc = (qty: number, unit: number) => {
      if (qty <= 0) return 0;
      const base = qty * unit;
      if (qty >= 30) return base * 0.8;
      if (qty >= 15) return base * 0.9;
      return base;
    };
    return calc(slides, 30) + calc(pages, 25) + (pack ? 490 : 0);
  }, [slides, pages, pack]);

  const discount = useMemo(() => {
    if (slides >= 30 || pages >= 30) return "−20%";
    if (slides >= 15 || pages >= 15) return "−10%";
    return null;
  }, [slides, pages]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
      <div className="text-center mb-14">
        <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[color:var(--gold)]">
          <Sparkles className="h-3.5 w-3.5" /> Simulateur
        </span>
        <h1 className="display text-4xl md:text-5xl mt-3 text-[#071735]">Estimez votre projet</h1>
        <div className="gold-divider mt-4 max-w-xs mx-auto" />
        <p className="serif italic text-xl text-[#0D2B6B]/80 mt-6 max-w-2xl mx-auto">
          Une estimation instantanée — un devis personnalisé sous 24h.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-6">
          <div className="card-meliya">
            <label className="display text-sm uppercase tracking-widest text-[#071735]/70">Nombre de slides — 30€/u</label>
            <div className="flex items-center gap-4 mt-3">
              <input type="range" min={0} max={60} value={slides} onChange={(e) => setSlides(+e.target.value)} className="flex-1 accent-[#CFA27A]" />
              <input type="number" min={0} value={slides} onChange={(e) => setSlides(+e.target.value)} className="w-20 px-3 py-2 rounded-lg border border-[#CFA27A]/40 bg-white text-center" />
            </div>
          </div>

          <div className="card-meliya">
            <label className="display text-sm uppercase tracking-widest text-[#071735]/70">Nombre de pages — 25€/u</label>
            <div className="flex items-center gap-4 mt-3">
              <input type="range" min={0} max={60} value={pages} onChange={(e) => setPages(+e.target.value)} className="flex-1 accent-[#CFA27A]" />
              <input type="number" min={0} value={pages} onChange={(e) => setPages(+e.target.value)} className="w-20 px-3 py-2 rounded-lg border border-[#CFA27A]/40 bg-white text-center" />
            </div>
          </div>

          <label className="card-meliya flex items-start gap-4 cursor-pointer">
            <input type="checkbox" checked={pack} onChange={(e) => setPack(e.target.checked)} className="mt-1 h-5 w-5 accent-[#CFA27A]" />
            <div>
              <div className="display text-base text-[#071735]">Ajouter le Pack visuel — 490€</div>
              <div className="text-sm text-[#071735]/60">Logo + carte de visite + modèles + mini charte graphique</div>
            </div>
          </label>
        </div>

        <div className="card-meliya h-fit sticky top-28" style={{background:"#071735", color:"#F7F4EF", borderColor:"#CFA27A"}}>
          <Calculator className="h-7 w-7 mb-3" style={{color:"#CFA27A"}} />
          <div className="text-xs uppercase tracking-widest opacity-70">Estimation totale</div>
          <div className="display text-5xl mt-2" style={{color:"#CFA27A"}}>{total.toFixed(0)}€</div>
          {discount && (
            <div className="mt-3 inline-block text-xs px-3 py-1 rounded-full" style={{background:"#CFA27A", color:"#071735"}}>
              Remise dégressive {discount} appliquée
            </div>
          )}
          <div className="gold-divider my-5 opacity-50" />
          <ul className="text-sm space-y-1 opacity-90">
            {slides > 0 && <li>{slides} slides × 30€</li>}
            {pages > 0 && <li>{pages} pages × 25€</li>}
            {pack && <li>Pack visuel — 490€</li>}
            {total === 0 && <li className="opacity-60 italic">Configurez votre projet…</li>}
          </ul>
          <Link to="/contact" className="mt-6 inline-flex justify-center w-full btn-secondary-meliya">
            Demander mon devis
          </Link>
          <p className="text-[10px] opacity-60 mt-3 text-center italic">Estimation indicative — devis personnalisé envoyé sous 24h.</p>
        </div>
      </div>
    </div>
  );
}
