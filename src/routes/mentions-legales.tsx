import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales & Politique de confidentialité — MELIYA" },
      { name: "description", content: "Mentions légales, politique de confidentialité (RGPD) et conditions générales de vente de MELIYA." },
      { property: "og:title", content: "Mentions légales & Politique de confidentialité — MELIYA" },
      { property: "og:description", content: "Informations légales, RGPD et CGV de MELIYA." },
    ],
  }),
  component: LegalPage,
});

function LegalPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="display text-4xl md:text-5xl mb-4 text-[color:var(--ink)]">
        Mentions légales & Politique de confidentialité
      </h1>
      <div className="gold-divider mb-12" />

      <section className="mb-12">
        <h2 className="display text-2xl md:text-3xl mb-2 text-[color:var(--ink)]">Mentions légales</h2>
        <p className="serif italic text-sm opacity-70 mb-4">Conformément à la loi LCEN du 21 juin 2004</p>
        <ul className="space-y-2 text-[15px] leading-relaxed">
          <li><strong>Responsable de la publication :</strong> Melody Roche</li>
          <li><strong>Statut juridique :</strong> Micro-entreprise</li>
          <li><strong>Adresse :</strong> Preignac, France</li>
          <li><strong>Email :</strong> contact@meliya.fr</li>
          <li><strong>SIRET :</strong> À compléter</li>
          <li><strong>Hébergeur :</strong> À compléter</li>
        </ul>
      </section>

      <div className="gold-divider mb-12" />

      <section id="confidentialite" className="mb-12 scroll-mt-24">
        <h2 className="display text-2xl md:text-3xl mb-2 text-[color:var(--ink)]">Politique de confidentialité</h2>
        <p className="serif italic text-sm opacity-70 mb-6">
          Conformément au Règlement Général sur la Protection des Données — RGPD UE 2016/679
        </p>

        <h3 className="display text-lg mt-6 mb-2">Responsable du traitement</h3>
        <p>Melody Roche — contact@meliya.fr</p>

        <h3 className="display text-lg mt-6 mb-2">Données collectées</h3>
        <p>
          Dans le cadre de l'utilisation du formulaire de contact de ce site, les données suivantes sont collectées :
          nom, prénom, adresse email, numéro de téléphone.
        </p>

        <h3 className="display text-lg mt-6 mb-2">Base légale du traitement</h3>
        <p>
          Le traitement est fondé sur votre consentement explicite, donné au moment de l'envoi du formulaire de contact.
        </p>

        <h3 className="display text-lg mt-6 mb-2">Finalité</h3>
        <p>
          Ces données sont collectées uniquement pour répondre à vos demandes de contact ou de devis. Elles ne sont
          ni vendues, ni cédées, ni transmises à des tiers.
        </p>

        <h3 className="display text-lg mt-6 mb-2">Durée de conservation</h3>
        <p>Les données sont conservées pendant une durée maximale de 3 ans à compter du dernier contact.</p>

        <h3 className="display text-lg mt-6 mb-2">Vos droits</h3>
        <p>Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Droit d'accès</li>
          <li>Droit de rectification</li>
          <li>Droit à l'effacement</li>
          <li>Droit d'opposition</li>
          <li>Droit à la portabilité</li>
        </ul>
        <p className="mt-3">Pour exercer ces droits, contactez : contact@meliya.fr</p>
        <p>
          En cas de réclamation non résolue, vous pouvez saisir la CNIL :{" "}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="underline hover:text-[color:var(--gold)]">
            www.cnil.fr
          </a>
        </p>

        <h3 className="display text-lg mt-6 mb-2">Cookies</h3>
        <p>
          Ce site utilise des cookies techniques nécessaires à son fonctionnement, ainsi que des cookies de mesure
          d'audience. Les cookies non essentiels ne sont déposés qu'après votre consentement.
        </p>
      </section>

      <div className="gold-divider mb-12" />

      <section id="cgv" className="mb-12 scroll-mt-24">
        <h2 className="display text-2xl md:text-3xl mb-2 text-[color:var(--ink)]">Conditions générales de vente</h2>
        <p className="serif italic text-sm opacity-70 mb-6">
          Obligatoires pour toute prestation de services à des particuliers
        </p>

        <h3 className="display text-lg mt-6 mb-2">Objet</h3>
        <p>
          Les présentes CGV régissent les relations contractuelles entre Melody Roche, micro-entreprise (ci-après
          « le Prestataire ») et tout client particulier ou professionnel (ci-après « le Client »).
        </p>

        <h3 className="display text-lg mt-6 mb-2">Prestations</h3>
        <p>
          Le Prestataire propose des services de mise en forme de slides, de pages et de création d'identité visuelle,
          dont les tarifs sont affichés sur le site meliya.fr. Tous les tarifs sont fermes et définitifs.
          TVA non applicable — art. 293 B du CGI.
        </p>

        <h3 className="display text-lg mt-6 mb-2">Commande</h3>
        <p>Toute commande est confirmée après réception du devis signé et du règlement de l'acompte convenu.</p>

        <h3 className="display text-lg mt-6 mb-2">Modalités de paiement</h3>
        <p>
          Le paiement s'effectue selon les modalités précisées sur le devis. Tout retard de paiement entraîne des
          pénalités égales à 3 fois le taux d'intérêt légal en vigueur.
        </p>

        <h3 className="display text-lg mt-6 mb-2">Délais de livraison</h3>
        <p>
          Les délais indiqués sur le site sont donnés à titre indicatif et courent à compter de la réception du brief
          complet et du règlement de l'acompte.
        </p>

        <h3 className="display text-lg mt-6 mb-2">Droit de rétractation</h3>
        <p>
          Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne s'applique pas aux
          prestations de services pleinement exécutées avant la fin du délai de rétractation, avec l'accord préalable
          exprès du Client.
        </p>

        <h3 className="display text-lg mt-6 mb-2">Propriété intellectuelle</h3>
        <p>Les livrables sont transmis au Client après règlement intégral de la prestation.</p>

        <h3 className="display text-lg mt-6 mb-2">Médiation</h3>
        <p>En cas de litige, le Client peut recourir gratuitement à un médiateur de la consommation.</p>

        <h3 className="display text-lg mt-6 mb-2">Droit applicable</h3>
        <p>Les présentes CGV sont soumises au droit français. Tribunal compétent : Bordeaux.</p>
      </section>
    </div>
  );
}
