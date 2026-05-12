import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Sparkles, Layers, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MELIYA — Assistante digitale spécialisée en documents" },
      { name: "description", content: "Structuration, mise en forme et valorisation de vos documents professionnels. Une approche éditoriale haut de gamme." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto px-6 pt-16 pb-24 lg:pt-24 lg:pb-32 text-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[color:var(--gold)] mb-6 justify-center">
              <Sparkles className="h-3.5 w-3.5" /> Assistante digitale spécialisée
            </span>
            <h1 className="display text-4xl md:text-5xl lg:text-6xl leading-tight text-[#071735]">
              L'élégance au service<br/>de vos <span style={{color:"#CFA27A"}}>documents</span>.
            </h1>
            <p className="serif text-xl md:text-2xl mt-6 text-[#0D2B6B]/80 italic whitespace-pre-line">
              Je transforme des contenus dispersés{"\n"}en supports clairs, cohérents et professionnels.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link to="/prestations" className="btn-primary-meliya">Inspirations</Link>
            </div>
            <div className="gold-divider mt-12 max-w-md mx-auto" />
            <p className="mt-6 text-sm text-[#071735]/70 max-w-md mx-auto">
              Aujourd'hui, le véritable enjeu n'est plus de savoir faire, mais de <strong>savoir structurer et valoriser</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="display text-3xl md:text-4xl text-[#071735]">Mon approche</h2>
          <div className="gold-divider mt-4 max-w-xs mx-auto" />
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: Layers, title: "Structuration", text: "Une organisation rigoureuse de chaque document." },
            { icon: FileText, title: "Mise en forme", text: "Une esthétique éditoriale moderne et premium." },
            { icon: Sparkles, title: "Valorisation", text: "Vos contenus mis en lumière avec sophistication." },
            { icon: ShieldCheck, title: "Confidentialité", text: "Une discrétion totale sur tous vos projets." },
          ].map((v) => (
            <div key={v.title} className="card-meliya text-center">
              <v.icon className="h-8 w-8 mx-auto mb-4" style={{color:"#CFA27A"}} />
              <h3 className="display text-lg mb-2 text-[#071735]">{v.title}</h3>
              <p className="text-sm text-[#071735]/70">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DIFFERENCE */}
      <section className="bg-[#071735] text-[#F7F4EF] py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="display text-3xl md:text-4xl mb-3" style={{color:"#CFA27A"}}>Pas une simple assistante</h2>
          <p className="serif text-xl italic opacity-80 mb-12">Une assistante digitale spécialisée — la nuance fait toute la différence.</p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-6 border border-[#CFA27A]/30 rounded-xl">
              <h3 className="display text-base mb-2" style={{color:"#CFA27A"}}>Assistante administrative</h3>
              <p className="text-sm opacity-80">Gestion administrative classique : courriers, agenda, facturation sur site.</p>
            </div>
            <div className="p-6 border border-[#CFA27A]/30 rounded-xl">
              <h3 className="display text-base mb-2" style={{color:"#CFA27A"}}>Assistante virtuelle</h3>
              <p className="text-sm opacity-80">Tâches administratives à distance, généralistes et polyvalentes.</p>
            </div>
            <div className="p-6 rounded-xl" style={{background:"linear-gradient(135deg, #CFA27A, #D8B07A)", color:"#071735"}}>
              <h3 className="display text-base mb-2">MELIYA — Assistante digitale spécialisée</h3>
              <p className="text-sm">Spécialiste de la <strong>structuration, mise en forme et valorisation</strong> de documents digitaux haut de gamme.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
