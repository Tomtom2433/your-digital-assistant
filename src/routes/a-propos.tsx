import { createFileRoute, Link } from "@tanstack/react-router";
import logoMicrosoft365 from "@/assets/logo_microsoft_365_ivoire.png";

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 a-propos-page" lang="fr">
      <style>{`.a-propos-page p { text-align: justify; hyphens: auto; -webkit-hyphens: auto; }`}</style>
      <div className="text-center mb-14">
        <span
          className="display uppercase gold-shimmer-text"
          style={{ fontSize: "22px", letterSpacing: "0.15em" }}
        >
          Qui suis-je
        </span>
        <div className="gold-divider mt-4 max-w-xs mx-auto" />
      </div>

      <div className="space-y-4 text-[#071735] leading-relaxed text-justify mx-auto">
          <p className="serif italic text-[#071735] whitespace-pre-line" style={{ fontSize: "20px" }}>
            Je suis <strong>Mélody Roche</strong>, fondatrice de MELIYA et assistante digitale indépendante.{"\n"}
            <strong>Mon métier</strong>&nbsp;: structurer, mettre en forme et valoriser vos documents professionnels pour qu'ils reflètent l'exigence de votre activité.
          </p>
          <p className="whitespace-pre-line text-justify text-[#071735]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: 1.6 }}>
            Depuis 2005, j'accompagne entreprises, indépendants et particuliers dans leur gestion administrative.{"\n"}
            Très vite, une évidence s'est imposée&nbsp;: ce qui me passionne réellement, c'est de transformer chaque support - quel qu'il soit - en un document plus clair, plus élégant et plus impactant.
          </p>
          <p className="whitespace-pre-line text-justify text-[#071735]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: 1.6 }}>
            Au fil des années, j'ai exercé dans des univers très différents.{"\n"}
            Cette diversité m'a permis de développer une vision globale et une véritable capacité d'adaptation aux exigences de chaque secteur.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Médical","Immobilier","Social","Viticole","Automobile","Associatif","Commerce","Relation client"].map((s) => (
              <span
                key={s}
                style={{
                  background: "linear-gradient(to right, #CFA27A, #D8B07A)",
                  border: "none",
                  color: "#071735",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  borderRadius: "20px",
                  padding: "4px 14px",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-14">
        <div className="text-center mb-6">
          <span
            className="display uppercase gold-shimmer-text"
            style={{ fontSize: "22px", letterSpacing: "0.15em" }}
          >
            Mes outils
          </span>
          <div className="nude-divider mt-4 max-w-xs mx-auto" />
        </div>

        <div className="mt-10">
          <h3 className="serif italic text-center text-[#071735] mb-6" style={{ fontSize: "20px" }}>
            Outils &amp; Applications
          </h3>
          <div className="flex flex-wrap justify-center items-center" style={{ gap: "48px" }}>
            {[
              { name: "Gamma", src: "https://gamma.app/favicon.ico" },
              { name: "Lovable", src: "https://lovable.dev/favicon.ico" },
              { name: "Google Workspace", src: "https://cdn.simpleicons.org/google" },
              { name: "Microsoft Office", src: logoMicrosoft365 },
              { name: "Notion", src: "https://cdn.simpleicons.org/notion/071735" },
            ].map((t) => (
              <img key={t.name} src={t.src} alt={t.name} style={{ height: "48px", width: "auto", objectFit: "contain" }} />
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h3 className="serif italic text-center text-[#071735] mb-6" style={{ fontSize: "20px" }}>
            Intelligence Artificielle
          </h3>
          <div className="flex flex-wrap justify-center items-center" style={{ gap: "48px" }}>
            {[
              { name: "Claude", src: "https://cdn.simpleicons.org/claude/D97757" },
              { name: "ChatGPT", src: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" },
              { name: "Gemini", src: "https://cdn.simpleicons.org/googlegemini" },
              { name: "Perplexity", src: "https://cdn.simpleicons.org/perplexity/20808C" },
            ].map((t) => (
              <img key={t.name} src={t.src} alt={t.name} style={{ height: "48px", width: "48px", objectFit: "contain" }} />
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider my-14" />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card-meliya">
          <h2 className="display text-2xl text-[#071735] mb-4 text-center">Ma mission</h2>
          <p className="serif italic text-lg text-[#071735]">
            Transformer des contenus souvent flous ou dispersés en documents clairs, cohérents et professionnels, prêts à être utilisés ou présentés.
          </p>
          <p className="mt-4 text-sm text-[#071735] whitespace-pre-line">
            J'utilise des outils modernes ainsi que des solutions d'IA, toujours avec un contrôle humain,{"\n"}
            pour garantir qualité, précision et cohérence.
          </p>
        </div>
        <div className="card-meliya">
          <h2 className="display text-2xl text-[#071735] mb-4 text-center">Mon approche</h2>
          <ul className="space-y-3 text-sm text-[#071735]">
            <li>✦ Une organisation rigoureuse</li>
            <li>✦ Une communication fluide</li>
            <li>✦ Une confidentialité totale</li>
            <li>✦ Un accompagnement humain et personnalisé</li>
          </ul>
          <p className="mt-4 text-sm text-[#071735]">
            Aujourd'hui, le véritable enjeu n'est plus de savoir faire, mais de <strong>savoir structurer et valoriser</strong>.
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
