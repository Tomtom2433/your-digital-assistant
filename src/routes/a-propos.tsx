import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import logoMicrosoft365 from "@/assets/logo_microsoft_365_ivoire.png";
import { ArrowRight, Heart, Shield, Zap, Sparkles } from "lucide-react";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "Qui est MELIYA ? Mélody Roche, assistante digitale" },
      {
        name: "description",
        content:
          "Mélody Roche, fondatrice de MELIYA. Assistante digitale spécialisée en mise en forme et valorisation de supports professionnels depuis 2005. 100% à distance.",
      },
      {
        name: "keywords",
        content:
          "Mélody Roche, MELIYA, assistante digitale spécialisée, qui est MELIYA, création documents professionnels",
      },
      { property: "og:title", content: "Qui est MELIYA ? Mélody Roche, assistante digitale" },
      {
        property: "og:description",
        content: "20 ans d'expérience au service de vos documents professionnels.",
      },
      { property: "og:url", content: "https://meliya.fr/a-propos" },
      { name: "twitter:title", content: "Qui est MELIYA ? Mélody Roche" },
      { name: "twitter:description", content: "Assistante digitale spécialisée depuis 2005." },
    ],
    links: [{ rel: "canonical", href: "https://meliya.fr/a-propos" }],
  }),
  component: APropos,
});

/* ─── Sector pill with hover ─────────────────────────────────────────────── */
function SectorPill({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "5px 12px",
        borderRadius: "100px",
        fontSize: "10.5px",
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        letterSpacing: "0.05em",
        whiteSpace: "nowrap",
        color: hovered ? "#5E5248" : "#5E5248",
        background: hovered ? "rgba(240,207,201,0.22)" : "rgba(255,255,255,0.75)",
        border: hovered
          ? "0.5px solid rgba(230,180,174,0.55)"
          : "0.5px solid rgba(230,180,174,0.3)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: hovered
          ? "0 3px 14px rgba(230,180,174,0.14), inset 0 1px 0 rgba(255,255,255,0.7)"
          : "0 1px 6px rgba(107,74,126,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
        transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
        cursor: "default",
        userSelect: "none",
      }}
    >
      {label}
    </span>
  );
}

/* ─── Tool logo — CSS-only float + hover scale ───────────────────────────── */
function ToolLogo({
  name,
  src,
  size = 44,
  floatClass = "logo-float-1",
}: {
  name: string;
  src: string;
  size?: number;
  floatClass?: string;
}) {
  return (
    <div className={`logo-tile ${floatClass}`} style={{ opacity: 0.72 }}>
      <img
        src={src}
        alt={name}
        loading="lazy"
        decoding="async"
        style={{ height: `${size}px`, width: `${size}px`, objectFit: "contain" }}
      />
      <span
        style={{
          fontSize: "9.5px",
          fontFamily: "var(--font-display)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#5E5248",
          opacity: 0.45,
        }}
      >
        {name}
      </span>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */
function APropos() {
  useReveal();
  return (
    <div lang="fr" style={{ minHeight: "100vh" }}>
      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div
        style={{
          background: "transparent",
          padding: "5rem 1.5rem 7rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
        }}
      >
        <div
          className="orb orb-rose"
          style={{ width: 360, height: 360, top: "-80px", right: "-60px" }}
        />
        <div style={{ position: "relative", maxWidth: "720px", margin: "0 auto" }}>
          <span className="tag-pill mb-5 inline-flex">Derrière MELIYA</span>
          <h1
            className="display"
            style={{
              fontSize: "clamp(32px,4.5vw,56px)",
              color: "#5E5248",
              letterSpacing: "0.02em",
              lineHeight: 1.1,
            }}
          >
            L'élégance au service
            <br />
            de vos supports professionnels.
          </h1>
          <div className="gold-divider mt-5 max-w-xs mx-auto" />
        </div>
      </div>

      {/* ── Bio section ──────────────────────────────────────────────────── */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "4.5rem 1.5rem 0" }}>
        {/* Signature humaine */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "12px",
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              letterSpacing: "0.06em",
              color: "#5E5248",
              opacity: 0.58,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "22px",
                height: "0.5px",
                background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.6))",
              }}
            />
            Mélody Roche, fondatrice de MELIYA
            <span
              style={{
                display: "inline-block",
                width: "22px",
                height: "0.5px",
                background: "linear-gradient(90deg, rgba(201,169,110,0.6), transparent)",
              }}
            />
          </p>
        </div>

        {/* Paragraphe 1 */}
        <p
          className="serif"
          style={{
            fontSize: "clamp(16px,1.6vw,18px)",
            color: "#5E5248",
            lineHeight: 1.85,
            marginBottom: "1.6rem",
            textAlign: "justify",
          }}
        >
          Depuis 2005, j'ai évolué comme assistante administrative au sein d'entreprises aux univers
          et secteurs d'activité variés. Cette expérience m'a permis de développer une grande
          capacité d'adaptation, une vision globale des besoins professionnels et un sens aigu du
          détail.
        </p>

        {/* Paragraphe 2 */}
        <p
          className="serif"
          style={{
            fontSize: "clamp(16px,1.6vw,18px)",
            color: "#5E5248",
            lineHeight: 1.85,
            marginBottom: "1.6rem",
            textAlign: "justify",
          }}
        >
          Avec le temps, une évidence s'est imposée : ce qui me passionne réellement, c'est révéler
          le potentiel de chaque contenu. Donner à une présentation, un rapport ou un dossier la
          forme qu'il mérite pour qu'il soit lu, retenu et valorisé.
        </p>

        {/* Paragraphe 3 */}
        <p
          className="serif"
          style={{
            fontSize: "clamp(16px,1.6vw,18px)",
            color: "#5E5248",
            lineHeight: 1.85,
            marginBottom: "1.6rem",
            textAlign: "justify",
          }}
        >
          C'est donc tout naturellement que j'ai choisi de laisser le volet purement administratif
          derrière moi afin de me consacrer pleinement à ce que j'aime profondément : la création de
          supports professionnels élégants, structurés et visuellement impactants.
        </p>

        {/* Séparateur décoratif */}
        <div
          style={{
            width: "40px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #C8847C, transparent)",
            margin: "0 auto 1.6rem",
          }}
        />

        {/* Paragraphe 4 */}
        <p
          className="serif"
          style={{
            fontSize: "clamp(16px,1.6vw,18px)",
            color: "#5E5248",
            lineHeight: 1.85,
            marginBottom: "1.6rem",
            textAlign: "justify",
          }}
        >
          Aujourd'hui, à travers MELIYA, j'accompagne entreprises, indépendants et associations dans
          la mise en valeur de leurs idées grâce à des documents clairs, cohérents et soignés.
        </p>

        {/* Paragraphe 5 */}
        <p
          className="serif"
          style={{
            fontSize: "clamp(16px,1.6vw,18px)",
            color: "#5E5248",
            lineHeight: 1.85,
            marginBottom: "1.6rem",
            textAlign: "justify",
          }}
        >
          J'ai ainsi eu l'opportunité d'accompagner des professionnels issus de secteurs très
          différents, développant une approche à la fois humaine, polyvalente et exigeante de la
          communication visuelle.
        </p>

        {/* Paragraphe 6 conclusion */}
        <p
          className="serif italic"
          style={{
            fontSize: "clamp(16px,1.6vw,18px)",
            color: "#5E5248",
            lineHeight: 1.85,
            marginBottom: "3rem",
            textAlign: "justify",
          }}
        >
          Chaque création est pensée avec une même intention : transformer un simple document en une
          expérience professionnelle mémorable.
        </p>
      </div>

      {/* ── Secteurs ─────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: "4.5rem",
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontSize: "9.5px",
              fontFamily: "var(--font-display)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#C8847C",
              marginBottom: "1.25rem",
            }}
          >
            Secteurs accompagnés
          </span>
          <div
            className="sector-row"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              justifyContent: "center",
            }}
          >
            {[
              "Médical",
              "Immobilier",
              "Social",
              "Viticole",
              "Automobile",
              "Associatif",
              "Commerce",
              "Relation client",
            ].map((s) => (
              <SectorPill key={s} label={s} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Mission & Approche ───────────────────────────────────────────── */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 1.5rem 0" }}>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Mission */}
          <div
            className="bento-card reveal"
            style={{
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "0.5px solid rgba(230,180,174,0.22)",
              boxShadow: "0 4px 32px rgba(200,132,124,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                marginBottom: "1.25rem",
                background: "linear-gradient(135deg, #FBDDD7 0%, #F0CFC9 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Heart size={18} style={{ color: "rgba(200,132,124,0.55)" }} />
            </div>
            <h2
              className="display"
              style={{ fontSize: "20px", color: "#5E5248", marginBottom: "1rem" }}
            >
              Ma mission
            </h2>
            <p
              className="serif italic"
              style={{ fontSize: "16px", color: "#5E5248", lineHeight: 1.65, opacity: 0.85 }}
            >
              Transformer des contenus dispersés en documents clairs, cohérents et professionnels
              prêts à être utilisés, partagés et valorisés.
            </p>
            <p
              style={{
                marginTop: "1rem",
                fontSize: "13.5px",
                color: "#5E5248",
                opacity: 0.65,
                fontFamily: "var(--font-sans)",
                lineHeight: 1.7,
              }}
            >
              J'allie outils modernes et intelligence artificielle, toujours sous contrôle humain,
              pour garantir qualité, précision et cohérence à chaque livrable.
            </p>
          </div>

          {/* Approche */}
          <div
            className="bento-card reveal delay-100"
            style={{
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "0.5px solid rgba(230,180,174,0.22)",
              boxShadow: "0 4px 32px rgba(200,132,124,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                marginBottom: "1.25rem",
                background: "linear-gradient(135deg, #FBDDD7 0%, #F0CFC9 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Shield size={18} style={{ color: "rgba(200,132,124,0.55)" }} />
            </div>
            <h2
              className="display"
              style={{ fontSize: "20px", color: "#5E5248", marginBottom: "1rem" }}
            >
              Mon approche
            </h2>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {[
                "Une organisation rigoureuse",
                "Une communication fluide et réactive",
                "Une confidentialité totale",
                "Un accompagnement humain et personnalisé",
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    fontSize: "13.5px",
                    color: "#5E5248",
                    fontFamily: "var(--font-sans)",
                    lineHeight: 1.55,
                  }}
                >
                  <span style={{ color: "#C8847C", flexShrink: 0, marginTop: "1px" }}>✦</span>
                  {item}
                </li>
              ))}
            </ul>
            <p
              style={{
                marginTop: "1.25rem",
                fontSize: "13px",
                color: "#5E5248",
                opacity: 0.6,
                fontFamily: "var(--font-sans)",
                lineHeight: 1.65,
                fontStyle: "italic",
              }}
            >
              Le véritable enjeu aujourd'hui n'est plus de savoir faire mais de{" "}
              <strong style={{ fontStyle: "normal", opacity: 0.85 }}>
                savoir structurer et valoriser
              </strong>
              .
            </p>
          </div>
        </div>
      </div>

      {/* ── Outils ───────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "2rem 1.5rem 0" }}>
        {/* Eyebrow centré */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="tag-pill inline-flex mb-4">Mes outils</span>
          <p className="serif italic" style={{ fontSize: "16px", color: "#5E5248", opacity: 0.7 }}>
            Des technologies modernes, toujours au service du résultat.
          </p>
        </div>

        {/* Outils & Applications */}
        <div style={{ marginBottom: "2.5rem" }}>
          <p
            style={{
              textAlign: "center",
              fontSize: "9.5px",
              fontFamily: "var(--font-display)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#C8847C",
              marginBottom: "1.75rem",
            }}
          >
            Outils & Applications
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "flex-end",
              gap: "40px",
            }}
          >
            {[
              { name: "Gamma", src: "https://gamma.app/favicon.ico", floatClass: "logo-float-1" },
              {
                name: "Lovable",
                src: "https://lovable.dev/favicon.ico",
                floatClass: "logo-float-2",
              },
              {
                name: "Google",
                src: "https://cdn.simpleicons.org/google",
                floatClass: "logo-float-3",
              },
              { name: "Microsoft", src: logoMicrosoft365, floatClass: "logo-float-4" },
              {
                name: "Notion",
                src: "https://cdn.simpleicons.org/notion/4A2A3A",
                floatClass: "logo-float-5",
              },
            ].map((t) => (
              <ToolLogo key={t.name} name={t.name} src={t.src} floatClass={t.floatClass} />
            ))}
          </div>
        </div>

        {/* Séparateur */}
        <div
          style={{
            height: "0.5px",
            background: "linear-gradient(90deg, transparent, rgba(230,180,174,0.3), transparent)",
            margin: "0 auto 2.5rem",
            maxWidth: "300px",
          }}
        />

        {/* IA */}
        <div style={{ marginBottom: "4rem" }}>
          <p
            style={{
              textAlign: "center",
              fontSize: "9.5px",
              fontFamily: "var(--font-display)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#C8847C",
              marginBottom: "1.75rem",
            }}
          >
            Intelligence Artificielle
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "flex-end",
              gap: "40px",
            }}
          >
            {[
              {
                name: "Claude",
                src: "https://cdn.simpleicons.org/claude/D97757",
                floatClass: "logo-float-2",
              },
              {
                name: "ChatGPT",
                src: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
                floatClass: "logo-float-4",
              },
              {
                name: "Gemini",
                src: "https://cdn.simpleicons.org/googlegemini",
                floatClass: "logo-float-1",
              },
              {
                name: "Perplexity",
                src: "https://cdn.simpleicons.org/perplexity/20808C",
                floatClass: "logo-float-3",
              },
            ].map((t) => (
              <ToolLogo key={t.name} name={t.name} src={t.src} floatClass={t.floatClass} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Pour qui CTA ───────────────────────────────────────────────── */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 1.5rem 5rem" }}>
        <div
          className="bento-card reveal"
          style={{
            background: "linear-gradient(150deg, #FFFFFF 0%, #FDF8F4 100%)",
            border: "1.5px solid rgba(200,132,124,0.28)",
            boxShadow:
              "0 10px 40px -20px rgba(200,132,124,0.18), 0 2px 8px rgba(200,132,124,0.06), inset 0 1px 0 rgba(255,255,255,0.96)",
            textAlign: "center",
            padding: "clamp(2rem,5vw,3.5rem)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Orbe rosé décoratif */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-60px",
              right: "-60px",
              width: "260px",
              height: "260px",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(230,180,174,0.14) 0%, transparent 72%)",
              filter: "blur(28px)",
              pointerEvents: "none",
            }}
          />

          <span className="tag-pill" style={{ display: "inline-flex", marginBottom: "1.25rem" }}>
            <Sparkles size={10} style={{ color: "rgba(200,132,124,0.55)" }} />
            Pour qui ?
          </span>

          <h2
            className="display"
            style={{
              fontSize: "clamp(24px,3vw,34px)",
              color: "#5E5248",
              marginBottom: "1rem",
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
            }}
          >
            Vous avez des documents à valoriser ?
          </h2>

          <p
            className="serif italic"
            style={{
              fontSize: "17px",
              color: "#5E5248",
              opacity: 0.72,
              lineHeight: 1.7,
              maxWidth: "520px",
              margin: "0 auto 2rem",
            }}
          >
            J'accompagne indépendants, entreprises, associations et particuliers qui souhaitent
            donner à leurs supports la qualité qu'ils méritent.
          </p>

          <Link
            to="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              borderRadius: "100px",
              background: "linear-gradient(135deg, #FBDDD7 0%, #C8847C 100%)",
              color: "#4A2820",
              textDecoration: "none",
              fontFamily: "var(--font-display)",
              fontSize: "11.5px",
              letterSpacing: "0.1em",
              fontWeight: 700,
              textTransform: "uppercase",
              border: "1px solid #C8847C",
              boxShadow:
                "0 8px 25px rgba(230,180,174,0.10), inset 0 0.5px 0 rgba(255,255,255,0.55)",
              transition: "all 0.55s cubic-bezier(0.22,1,0.36,1)",
              WebkitFontSmoothing: "antialiased",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(-1px)";
              el.style.background = "linear-gradient(135deg, #E6B4AE, #A86660)";
              el.style.color = "#FFFFFF";
              el.style.borderColor = "#A86660";
              el.style.boxShadow = "0 12px 35px rgba(168,102,96,0.22)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(0)";
              el.style.background = "linear-gradient(135deg, #FBDDD7 0%, #C8847C 100%)";
              el.style.color = "#4A2820";
              el.style.borderColor = "#C8847C";
              el.style.boxShadow =
                "0 8px 25px rgba(230,180,174,0.10), inset 0 0.5px 0 rgba(255,255,255,0.55)";
            }}
          >
            Discutons de votre projet <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      <style>{`
 @media (min-width: 769px) {
 .sector-row { flex-wrap: nowrap !important; }
 }
 `}</style>
    </div>
  );
}
