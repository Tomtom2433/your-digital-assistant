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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <div className="text-center mb-14">
        <span className="text-xs tracking-[0.25em] uppercase text-[color:var(--gold)]">Qui suis-je</span>
        <h1 className="display text-4xl md:text-5xl mt-3 text-[#071735]">Mais qui est MELIYA ?</h1>
        <div className="gold-divider mt-4 max-w-xs mx-auto" />
      </div>

      <div className="grid md:grid-cols-[260px_1fr] gap-12 items-start">
        <div className="flex justify-start">
          <img src={logoIcon} alt="MELIYA" className="h-56 w-auto mix-blend-multiply" />
        </div>
        <div className="space-y-6 text-[#071735]/85 leading-relaxed text-justify">
          <p className="serif text-2xl italic text-[#0D2B6B]">
            Je suis <strong>Mélody Roche</strong>, fondatrice de MELIYA et assistante digitale indépendante. Mon métier&nbsp;: structurer, mettre en forme et valoriser vos documents professionnels pour qu'ils reflètent l'exigence de votre activité.
          </p>
          <p>
            Depuis <strong>2005</strong>, j'accompagne entreprises, indépendants et particuliers dans leur gestion administrative. Très vite, une évidence s'est imposée&nbsp;: ce qui me passionne réellement, c'est de transformer chaque support — quel qu'il soit — en un document plus clair, plus élégant et plus impactant.
          </p>
          <p>
            Au fil des années, j'ai exercé dans des univers très différents&nbsp;: médical, immobilier, social, viticole, automobile, associatif, commerce et relation client. Cette diversité m'a permis de développer une vision globale et une véritable capacité d'adaptation aux exigences de chaque secteur.
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
