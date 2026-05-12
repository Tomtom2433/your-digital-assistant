import { createFileRoute, Link } from "@tanstack/react-router";
import logoIcon from "@/assets/meliya-logo-icon.png";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À Propos — Mélody Roche, MELIYA" },
      { name: "description", content: "Mélody Roche, assistante digitale indépendante depuis 2005. Spécialiste de la structuration et valorisation de documents." },
    ],
  }),
  component: APropos,
});

function APropos() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
      <div className="text-center mb-14">
        <span className="text-xs tracking-[0.25em] uppercase text-[color:var(--gold)]">Qui suis-je</span>
        <h1 className="display text-4xl md:text-5xl mt-3 text-[#071735]">MELIYA, qui est-ce ?</h1>
        <div className="gold-divider mt-4 max-w-xs mx-auto" />
      </div>

      <div className="grid md:grid-cols-[260px_1fr] gap-12 items-start">
        <div className="flex justify-center">
          <img src={logoIcon} alt="MELIYA" className="h-56 w-auto mix-blend-multiply" />
        </div>
        <div className="space-y-6 text-[#071735]/85 leading-relaxed">
          <p className="serif text-2xl italic text-[#0D2B6B]">
            Aux commandes de MELIYA, je suis <strong>Mélody Roche</strong>, assistante digitale indépendante spécialisée dans la structuration, la mise en forme et la valorisation de documents professionnels.
          </p>
          <p>
            Depuis <strong>2005</strong>, j'accompagne professionnels et particuliers dans la gestion administrative de leur entreprise. Mais ce qui me passionne par-dessus tout, c'est de rendre les supports — de toutes sortes — plus beaux, plus professionnels et plus impactants.
          </p>
          <p>
            Forte d'une expérience acquise dans des secteurs variés — médical, immobilier, social, viticole, automobile, associations, commerce et relation client — j'ai développé une vision globale et une grande capacité d'adaptation à chaque activité.
          </p>
        </div>
      </div>

      <div className="gold-divider my-14" />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card-meliya">
          <h2 className="display text-2xl text-[#071735] mb-4">Ma mission</h2>
          <p className="serif italic text-lg text-[#0D2B6B]">
            Transformer des contenus souvent flous ou dispersés en documents clairs, cohérents et professionnels, prêts à être utilisés ou présentés.
          </p>
          <p className="mt-4 text-sm text-[#071735]/70">
            Aujourd'hui, le véritable enjeu n'est plus de savoir faire, mais de <strong>savoir structurer et valoriser</strong>.
          </p>
        </div>
        <div className="card-meliya">
          <h2 className="display text-2xl text-[#071735] mb-4">Mon approche</h2>
          <ul className="space-y-3 text-sm">
            <li>✦ Une organisation rigoureuse</li>
            <li>✦ Une communication fluide</li>
            <li>✦ Une confidentialité totale</li>
            <li>✦ Un accompagnement humain et personnalisé</li>
          </ul>
          <p className="mt-4 text-xs text-[#071735]/60 italic">
            J'utilise des outils modernes ainsi que des solutions d'IA, toujours avec un contrôle humain, pour garantir qualité, précision et cohérence.
          </p>
        </div>
      </div>

      <div className="mt-14 p-8 rounded-2xl text-center" style={{background:"#071735", color:"#F7F4EF"}}>
        <h2 className="display text-2xl mb-3" style={{color:"#CFA27A"}}>Pour qui ?</h2>
        <p className="serif italic text-lg">
          J'accompagne toute personne ou structure ayant besoin de clarté dans ses documents : indépendants, entreprises, associations ou particuliers.
        </p>
        <div className="mt-6">
          <Link to="/contact" className="btn-secondary-meliya">Discutons de votre projet</Link>
        </div>
      </div>
    </div>
  );
}
