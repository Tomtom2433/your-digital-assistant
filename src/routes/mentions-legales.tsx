import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales, RGPD & Politique cookies MELIYA" },
      {
        name: "description",
        content:
          "Mentions légales, politique de confidentialité RGPD, CGV et politique des cookies de MELIYA Mélody Roche, assistante digitale.",
      },
      { property: "og:title", content: "Mentions légales & Politique de confidentialité MELIYA" },
      { robots: "noindex" },
    ],
  }),
  component: LegalPage,
});

/* ── Composant section ──────────────────────────────────────── */
function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28" style={{ marginBottom: "3.5rem" }}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(20px,2.4vw,26px)",
          fontWeight: 500,
          letterSpacing: "0.02em",
          color: "#5E5248",
          marginBottom: subtitle ? "4px" : "1.2rem",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "13px",
            color: "rgba(94,82,72,0.50)",
            marginBottom: "1.2rem",
          }}
        >
          {subtitle}
        </p>
      )}
      {children}
    </section>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "#C89B6D",
        marginTop: "1.6rem",
        marginBottom: "0.5rem",
      }}
    >
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-serif)",
        fontSize: "15px",
        lineHeight: 1.8,
        color: "rgba(94,82,72,0.75)",
        marginBottom: "0.6rem",
      }}
    >
      {children}
    </p>
  );
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul
      style={{
        paddingLeft: "1.2rem",
        margin: "0.4rem 0 0.8rem",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      {children}
    </ul>
  );
}

function LI({ children }: { children: React.ReactNode }) {
  return (
    <li
      style={{
        fontFamily: "var(--font-serif)",
        fontSize: "15px",
        lineHeight: 1.75,
        color: "rgba(94,82,72,0.72)",
        listStyleType: "disc",
      }}
    >
      {children}
    </li>
  );
}

/* ── Tableau cookies ────────────────────────────────────────── */
function CookieTable({
  rows,
}: {
  rows: { name: string; purpose: string; duration: string; category: string }[];
}) {
  return (
    <div style={{ overflowX: "auto", marginTop: "1rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13.5px" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(200,160,82,0.22)" }}>
            {["Cookie", "Catégorie", "Finalité", "Durée"].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  padding: "8px 12px 10px 0",
                  fontFamily: "var(--font-display)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#C89B6D",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r.name}
              style={{
                borderBottom: "1px solid rgba(200,160,82,0.10)",
                background: i % 2 === 0 ? "rgba(94,82,72,0.02)" : "transparent",
              }}
            >
              <td
                style={{
                  padding: "9px 12px 9px 0",
                  fontFamily: "monospace",
                  fontSize: "12px",
                  color: "#5E5248",
                  whiteSpace: "nowrap",
                }}
              >
                {r.name}
              </td>
              <td
                style={{
                  padding: "9px 12px 9px 0",
                  fontFamily: "var(--font-display)",
                  fontSize: "11px",
                  color: "#C89B6D",
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                }}
              >
                {r.category}
              </td>
              <td
                style={{
                  padding: "9px 12px 9px 0",
                  fontFamily: "var(--font-serif)",
                  color: "rgba(94,82,72,0.65)",
                  lineHeight: 1.5,
                }}
              >
                {r.purpose}
              </td>
              <td
                style={{
                  padding: "9px 0",
                  fontFamily: "var(--font-serif)",
                  color: "rgba(94,82,72,0.55)",
                  whiteSpace: "nowrap",
                }}
              >
                {r.duration}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────── */
function LegalPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ── En-tête de page ── */}
      <div
        style={{
          background: "linear-gradient(145deg, #F4EEF8 0%, #FAF0F4 50%, #EEF6F4 100%)",
          padding: "clamp(5rem,10vw,8rem) 1.5rem clamp(5rem,8vw,7rem)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 14px",
            borderRadius: "100px",
            background: "rgba(200,155,109,0.12)",
            border: "0.5px solid rgba(200,160,82,0.35)",
            fontFamily: "var(--font-display)",
            fontSize: "10px",
            letterSpacing: "0.16em",
            textTransform: "uppercase" as const,
            color: "#C89B6D",
            marginBottom: "1.2rem",
          }}
        >
          Informations légales
        </span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px,4vw,44px)",
            fontWeight: 500,
            letterSpacing: "0.02em",
            color: "#5E5248",
            margin: "0 0 1rem",
            lineHeight: 1.1,
          }}
        >
          Transparence & conformité
        </h1>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(14px,1.5vw,17px)",
            color: "rgba(94,82,72,0.55)",
            maxWidth: "520px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Mentions légales, RGPD, CGV et politique des cookies tout est ici, clair et accessible.
        </p>

        {/* Navigation ancrée */}
        <nav
          style={{
            marginTop: "2.4rem",
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            { href: "#mentions", label: "Mentions légales" },
            { href: "#confidentialite", label: "Confidentialité" },
            { href: "#cgv", label: "CGV" },
            { href: "#cookies", label: "Cookies" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                padding: "7px 16px",
                borderRadius: "100px",
                border: "0.5px solid rgba(200,160,82,0.30)",
                fontFamily: "var(--font-display)",
                fontSize: "10.5px",
                letterSpacing: "0.10em",
                textTransform: "uppercase" as const,
                color: "rgba(94,82,72,0.60)",
                textDecoration: "none",
                background: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(8px)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(200,155,109,0.12)";
                (e.currentTarget as HTMLElement).style.color = "#C89B6D";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.55)";
                (e.currentTarget as HTMLElement).style.color = "rgba(94,82,72,0.60)";
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* ── Contenu principal ── */}
      <div
        style={{
          maxWidth: "780px",
          margin: "0 auto",
          padding: "clamp(3rem,5vw,5rem) 1.5rem clamp(4rem,7vw,7rem)",
        }}
      >
        {/* ══ 1. MENTIONS LÉGALES ══ */}
        <Section
          id="mentions"
          title="Mentions légales"
          subtitle="Conformément à la loi LCEN du 21 juin 2004"
        >
          <div
            style={{
              background: "rgba(94,82,72,0.03)",
              border: "1px solid rgba(200,160,82,0.18)",
              borderRadius: "14px",
              padding: "1.4rem 1.6rem",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {[
                  ["Responsable de publication", "Mélody Roche"],
                  ["Statut juridique", "Micro-entreprise"],
                  ["Activité", "Assistante digitale services aux entreprises"],
                  ["Adresse", "Preignac (33210), Gironde, France"],
                  ["Email", "contact@meliya.fr"],
                  ["SIRET", "À compléter"],
                  [
                    "N° TVA intracommunautaire",
                    "Non applicable TVA non applicable, art. 293 B du CGI",
                  ],
                  ["Hébergeur", "Cloudflare Inc. 101 Townsend St, San Francisco, CA 94107, USA"],
                ].map(([label, value]) => (
                  <tr key={label} style={{ borderBottom: "1px solid rgba(200,160,82,0.10)" }}>
                    <td
                      style={{
                        padding: "9px 12px 9px 0",
                        fontFamily: "var(--font-display)",
                        fontSize: "11.5px",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                        color: "#5E5248",
                        whiteSpace: "nowrap",
                        verticalAlign: "top",
                        width: "42%",
                      }}
                    >
                      {label}
                    </td>
                    <td
                      style={{
                        padding: "9px 0",
                        fontFamily: "var(--font-serif)",
                        fontSize: "14px",
                        color: "rgba(94,82,72,0.68)",
                        lineHeight: 1.55,
                      }}
                    >
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <P>
            Ce site est la propriété exclusive de Mélody Roche. Toute reproduction, représentation,
            modification ou adaptation de tout ou partie des éléments de ce site est strictement
            interdite sans autorisation écrite préalable.
          </P>
        </Section>

        <div className="gold-divider" style={{ marginBottom: "3.5rem" }} />

        {/* ══ 2. POLITIQUE DE CONFIDENTIALITÉ ══ */}
        <Section
          id="confidentialite"
          title="Politique de confidentialité"
          subtitle="Règlement Général sur la Protection des Données RGPD UE 2016/679"
        >
          <H3>Responsable du traitement</H3>
          <P>Mélody Roche contact@meliya.fr Preignac (33210), France</P>

          <H3>Données collectées</H3>
          <P>
            Dans le cadre du formulaire de contact, les données suivantes sont collectées : prénom,
            nom, adresse email et description du projet. Ces données sont strictement nécessaires au
            traitement de votre demande.
          </P>

          <H3>Base légale du traitement</H3>
          <P>
            Le traitement repose sur votre <strong>consentement explicite</strong> (art. 6.1.a
            RGPD), obtenu via la case à cocher présente sur le formulaire de contact, et/ou sur
            l'exécution d'un contrat ou de mesures précontractuelles (art. 6.1.b RGPD).
          </P>

          <H3>Finalité</H3>
          <P>
            Vos données sont collectées uniquement pour répondre à vos demandes de contact ou de
            devis. Elles ne sont ni vendues, ni cédées, ni transmises à des tiers.
          </P>

          <H3>Durée de conservation</H3>
          <P>
            Les données sont conservées pendant une durée maximale de <strong>3 ans</strong> à
            compter du dernier contact.
          </P>

          <H3>Vos droits</H3>
          <P>Conformément au RGPD, vous disposez des droits suivants :</P>
          <UL>
            <LI>
              <strong>Accès</strong> obtenir une copie de vos données
            </LI>
            <LI>
              <strong>Rectification</strong> corriger des données inexactes
            </LI>
            <LI>
              <strong>Effacement</strong> demander la suppression de vos données
            </LI>
            <LI>
              <strong>Opposition</strong> vous opposer à un traitement
            </LI>
            <LI>
              <strong>Portabilité</strong> recevoir vos données dans un format structuré
            </LI>
            <LI>
              <strong>Limitation</strong> restreindre le traitement dans certains cas
            </LI>
          </UL>
          <P>
            Pour exercer ces droits :{" "}
            <a
              href="mailto:contact@meliya.fr"
              style={{ color: "#C89B6D", textDecoration: "underline" }}
            >
              contact@meliya.fr
            </a>
            . Réponse sous 30 jours. En cas de réclamation non résolue, vous pouvez saisir la{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#C89B6D", textDecoration: "underline" }}
            >
              CNIL www.cnil.fr
            </a>
            .
          </P>

          <H3>Sécurité</H3>
          <P>
            Des mesures techniques et organisationnelles appropriées sont mises en œuvre pour
            protéger vos données contre tout accès non autorisé, perte ou divulgation.
          </P>
        </Section>

        <div className="gold-divider" style={{ marginBottom: "3.5rem" }} />

        {/* ══ 3. CGV ══ */}
        <Section
          id="cgv"
          title="Conditions générales de vente"
          subtitle="Obligatoires pour toute prestation de services aux particuliers et professionnels"
        >
          <H3>Objet</H3>
          <P>
            Les présentes CGV régissent les relations contractuelles entre Mélody Roche,
            micro-entreprise (ci-après « le Prestataire ») et tout client particulier ou
            professionnel (ci-après « le Client »).
          </P>

          <H3>Prestations</H3>
          <P>
            Le Prestataire propose des services de mise en forme de supports professionnels (slides,
            documents, identité visuelle), dont les tarifs sont affichés sur le site meliya.fr. Tous
            les tarifs sont exprimés en euros TTC.{" "}
            <strong>TVA non applicable art. 293 B du CGI.</strong>
          </P>

          <H3>Commande et confirmation</H3>
          <P>Toute commande est confirmée après :</P>
          <UL>
            <LI>Réception du devis signé (manuscritement ou électroniquement)</LI>
            <LI>Règlement de l'acompte convenu (généralement 30 %)</LI>
          </UL>

          <H3>Modalités de paiement</H3>
          <P>
            Le paiement s'effectue selon les modalités précisées sur le devis (virement bancaire,
            etc.). Tout retard de paiement entraîne des pénalités égales à{" "}
            <strong>3 fois le taux d'intérêt légal</strong> en vigueur, plus une indemnité
            forfaitaire de recouvrement de 40 €.
          </P>

          <H3>Délais de réalisation</H3>
          <P>
            Les délais indiqués sur le site sont donnés à titre indicatif. Ils courent à compter de
            la réception du brief complet, des éléments nécessaires et du règlement de l'acompte.
          </P>

          <H3>Rétractation</H3>
          <P>
            Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne
            s'applique pas aux prestations de services pleinement exécutées avant la fin du délai de
            rétractation, dès lors que l'exécution a commencé avec l'accord exprès préalable du
            Client.
          </P>

          <H3>Propriété intellectuelle</H3>
          <P>
            Les livrables sont cédés au Client après règlement intégral de la prestation. Le
            Prestataire se réserve le droit de mentionner la réalisation dans son portfolio, sauf
            accord contraire écrit.
          </P>

          <H3>Médiation</H3>
          <P>
            En cas de litige non résolu à l'amiable, le Client peut recourir gratuitement à un
            médiateur de la consommation conformément aux articles L611-1 et suivants du Code de la
            consommation.
          </P>

          <H3>Droit applicable Juridiction compétente</H3>
          <P>
            Les présentes CGV sont soumises au <strong>droit français</strong>. En cas de litige
            persistant, le tribunal compétent est celui de <strong>Bordeaux (33)</strong>.
          </P>
        </Section>

        <div className="gold-divider" style={{ marginBottom: "3.5rem" }} />

        {/* ══ 4. POLITIQUE DES COOKIES ══ */}
        <Section
          id="cookies"
          title="Politique des cookies"
          subtitle="Conformément à la directive ePrivacy et aux recommandations CNIL"
        >
          <H3>Qu'est-ce qu'un cookie ?</H3>
          <P>
            Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, smartphone,
            tablette) lors de la visite d'un site web. Il permet de mémoriser des informations
            relatives à votre navigation.
          </P>

          <H3>Cookies utilisés sur ce site</H3>
          <P>
            Ce site utilise exclusivement du <strong>stockage local (localStorage)</strong>,
            fonctionnellement équivalent aux cookies. Aucun cookie tiers ni aucun script d'analyse
            externe n'est déposé.
          </P>

          <CookieTable
            rows={[
              {
                name: "meliya-cookie-consent",
                category: "Nécessaire",
                purpose: "Mémorise votre choix de consentement aux cookies",
                duration: "13 mois",
              },
              {
                name: "meliya-cookie-consent-date",
                category: "Nécessaire",
                purpose: "Horodatage de votre consentement (renouvellement automatique)",
                duration: "13 mois",
              },
              {
                name: "meliya-theme",
                category: "Fonctionnel",
                purpose: "Mémorise votre préférence de thème (mode clair / mode sombre)",
                duration: "Stockage local",
              },
            ]}
          />

          <H3>Catégories de cookies</H3>
          <UL>
            <LI>
              <strong>Cookies nécessaires</strong> Indispensables au fonctionnement du site. Ils ne
              peuvent pas être refusés. Base légale : intérêt légitime (art. 6.1.f RGPD).
            </LI>
            <LI>
              <strong>Cookies fonctionnels</strong> Mémorisent vos préférences de navigation (thème
              visuel). Soumis à votre consentement.
            </LI>
            <LI>
              <strong>Cookies analytiques</strong> Aucun cookie analytique ou de traçage n'est
              utilisé actuellement sur ce site.
            </LI>
          </UL>

          <H3>Gérer vos préférences</H3>
          <P>
            Vous pouvez à tout moment modifier vos préférences en cliquant sur le bouton « 🍪 Gérer
            mes cookies » présent en bas de chaque page, ou en cliquant sur le bouton ci-dessous.
            Votre consentement est valable 13 mois et vous sera redemandé au-delà.
          </P>

          <div style={{ marginTop: "1rem" }}>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("meliya:show-cookie-banner"))}
              style={{
                padding: "10px 22px",
                borderRadius: "100px",
                border: "1px solid rgba(200,160,82,0.40)",
                background: "rgba(200,155,109,0.08)",
                color: "#C89B6D",
                fontFamily: "var(--font-display)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(200,155,109,0.16)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(200,155,109,0.08)";
              }}
            >
              🍪 Gérer mes préférences cookies
            </button>
          </div>

          <H3>Cookies navigateur</H3>
          <P>
            Vous pouvez également configurer votre navigateur pour bloquer ou supprimer les cookies
            :
          </P>
          <UL>
            <LI>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#C89B6D", textDecoration: "underline" }}
              >
                Google Chrome
              </a>
            </LI>
            <LI>
              <a
                href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#C89B6D", textDecoration: "underline" }}
              >
                Mozilla Firefox
              </a>
            </LI>
            <LI>
              <a
                href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#C89B6D", textDecoration: "underline" }}
              >
                Safari
              </a>
            </LI>
          </UL>
          <P style={{ marginTop: "0.8rem" }}>
            Notez que la désactivation de certains cookies peut affecter le bon fonctionnement du
            site.
          </P>

          <H3>Contact DPO</H3>
          <P>
            Pour toute question relative à la gestion de vos données ou cookies :{" "}
            <a
              href="mailto:contact@meliya.fr"
              style={{ color: "#C89B6D", textDecoration: "underline" }}
            >
              contact@meliya.fr
            </a>
          </P>

          <div
            style={{
              marginTop: "1.6rem",
              padding: "12px 16px",
              borderRadius: "10px",
              background: "rgba(200,155,109,0.06)",
              border: "0.5px solid rgba(200,160,82,0.22)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "12.5px",
                color: "rgba(94,82,72,0.55)",
                margin: 0,
                fontStyle: "italic",
                lineHeight: 1.65,
              }}
            >
              Dernière mise à jour : mai 2025 Cette politique peut évoluer en fonction des
              évolutions légales ou techniques. Nous vous invitons à la consulter régulièrement.
            </p>
          </div>
        </Section>
      </div>
    </div>
  );
}
