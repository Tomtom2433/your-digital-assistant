import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import logoMicrosoft365 from "@/assets/logo_microsoft_365_ivoire.png";
import { ArrowRight } from "lucide-react";

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
      { title: "Qui est Meliya ? Mélody Roche" },
      {
        name: "description",
        content:
          "Mélody Roche, fondatrice de MELIYA. Assistante digitale spécialisée en mise en forme et valorisation de supports professionnels depuis 2005.",
      },
    ],
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
        background: hovered ? "rgba(212,184,150,0.22)" : "rgba(255,255,255,0.75)",
        border: hovered ? "0.5px solid rgba(212,168,67,0.55)" : "0.5px solid rgba(212,168,67,0.3)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: hovered
          ? "0 3px 14px rgba(212,168,67,0.14), inset 0 1px 0 rgba(255,255,255,0.7)"
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

/* ─── Tool logo with hover ───────────────────────────────────────────────── */
function ToolLogo({ name, src, size = 44 }: { name: string; src: string; size?: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        opacity: hovered ? 1 : 0.72,
      }}
    >
      <img
        src={src}
        alt={name}
        style={{ height: `${size}px`, width: `${size}px`, objectFit: "contain" }}
      />
      <span
        style={{
          fontSize: "9.5px",
          fontFamily: "var(--font-display)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#5E5248",
          opacity: hovered ? 0.7 : 0.4,
          transition: "opacity 0.3s ease",
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
            background: "linear-gradient(90deg, transparent, #C89B6D, transparent)",
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
              color: "#C89B6D",
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
              border: "0.5px solid rgba(212,168,67,0.22)",
              boxShadow: "0 4px 32px rgba(200,155,109,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                marginBottom: "1.25rem",
                background: "linear-gradient(135deg, #F6E6B8 0%, #E6CEB0 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
            >
              ✦
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
              border: "0.5px solid rgba(212,168,67,0.22)",
              boxShadow: "0 4px 32px rgba(200,155,109,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                marginBottom: "1.25rem",
                background: "linear-gradient(135deg, #F6E6B8 0%, #E6CEB0 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
            >
              ◇
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
                  <span style={{ color: "#C89B6D", flexShrink: 0, marginTop: "1px" }}>✦</span>
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
              color: "#C89B6D",
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
              { name: "Gamma", src: "https://gamma.app/favicon.ico" },
              { name: "Lovable", src: "https://lovable.dev/favicon.ico" },
              { name: "Google", src: "https://cdn.simpleicons.org/google" },
              { name: "Microsoft", src: logoMicrosoft365 },
              { name: "Notion", src: "https://cdn.simpleicons.org/notion/4A2A3A" },
            ].map((t) => (
              <ToolLogo key={t.name} name={t.name} src={t.src} />
            ))}
          </div>
        </div>

        {/* Séparateur */}
        <div
          style={{
            height: "0.5px",
            background: "linear-gradient(90deg, transparent, rgba(212,168,67,0.3), transparent)",
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
              color: "#C89B6D",
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
              { name: "Claude", src: "https://cdn.simpleicons.org/claude/D97757" },
              {
                name: "ChatGPT",
                src: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
              },
              { name: "Gemini", src: "https://cdn.simpleicons.org/googlegemini" },
              { name: "Perplexity", src: "https://cdn.simpleicons.org/perplexity/20808C" },
            ].map((t) => (
              <ToolLogo key={t.name} name={t.name} src={t.src} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Pour qui CTA ───────────────────────────────────────────────── */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 1.5rem 5rem" }}>
        <div
          className="bento-card reveal"
          style={{
            background: "linear-gradient(145deg, #C89B6D 0%, #D4B189 55%, #E6CEB0 100%)",
            border: "0.5px solid rgba(255,255,255,0.35)",
            boxShadow:
              "0 20px 60px rgba(200,155,109,0.22), 0 0 80px rgba(200,155,109,0.10), inset 0 1px 0 rgba(255,255,255,0.45)",
            textAlign: "center",
            padding: "clamp(2rem,5vw,3.5rem)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Halos */}
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
                "radial-gradient(ellipse at center, rgba(200,155,109,0.12) 0%, transparent 72%)",
              filter: "blur(28px)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-40px",
              left: "-40px",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(200,155,109,0.10) 0%, transparent 70%)",
              filter: "blur(24px)",
              pointerEvents: "none",
            }}
          />

          <span
            className="tag-pill"
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "0.5px solid rgba(255,255,255,0.22)",
              color: "rgba(240,230,255,0.85)",
              display: "inline-flex",
              marginBottom: "1.25rem",
            }}
          >
            Pour qui ?
          </span>

          <h2
            className="display"
            style={{
              fontSize: "clamp(24px,3vw,34px)",
              color: "#FAFAFA",
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
              color: "rgba(58,38,20,0.75)",
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
              background: "linear-gradient(135deg, #F6E6B8 0%, #C89B6D 100%)",
              color: "#3A2614",
              textDecoration: "none",
              fontFamily: "var(--font-display)",
              fontSize: "11.5px",
              letterSpacing: "0.1em",
              fontWeight: 700,
              textTransform: "uppercase",
              border: "1px solid #C89B6D",
              boxShadow:
                "0 8px 25px rgba(230,180,174,0.10), inset 0 0.5px 0 rgba(255,255,255,0.55)",
              transition: "all 0.55s cubic-bezier(0.22,1,0.36,1)",
              WebkitFontSmoothing: "antialiased",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(-1px)";
              el.style.background = "linear-gradient(135deg, #E6B4AE, #B0875A)";
              el.style.color = "#FFFFFF";
              el.style.borderColor = "#B0875A";
              el.style.boxShadow = "0 12px 35px rgba(176,135,90,0.22)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(0)";
              el.style.background = "linear-gradient(135deg, #F6E6B8 0%, #C89B6D 100%)";
              el.style.color = "#3A2614";
              el.style.borderColor = "#C89B6D";
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
