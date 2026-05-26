import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Check,
  FileText,
  Presentation,
  Palette,
  Clock,
  ArrowRight,
  Sparkles,
  Percent,
} from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/prestations")({
  head: () => ({
    meta: [
      { title: "Prestations & Tarifs MELIYA" },
      {
        name: "description",
        content:
          "Prestations professionnelles à tarif accessible. Slides dès 30€, pages dès 25€, Pack Up identité 479€.",
      },
    ],
  }),
  component: Prestations,
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Card hover wrapper ─────────────────────────────────────────────────── */
function HoverCard({
  children,
  style,
  className,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transition:
          "transform 0.7s cubic-bezier(0.22,1,0.36,1), box-shadow 0.7s cubic-bezier(0.22,1,0.36,1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Discount table row ─────────────────────────────────────────────────── */
function DiscountRow({
  range,
  label,
  highlight,
}: {
  range: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "9px 14px",
        borderRadius: "10px",
        background: highlight ? "rgba(200,155,109,0.14)" : "rgba(255,255,255,0.45)",
        border: highlight
          ? "0.5px solid rgba(200,155,109,0.40)"
          : "0.5px solid rgba(212,168,67,0.15)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        marginBottom: "6px",
      }}
    >
      <span
        style={{ fontSize: "13px", fontFamily: "var(--font-sans)", color: "#5A3D6E", opacity: 0.8 }}
      >
        {range}
      </span>
      <span
        className="display"
        style={{
          fontSize: "13px",
          color: highlight ? "#B0875A" : "#5E5248",
          fontWeight: 700,
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */
function Prestations() {
  useReveal();

  return (
    <div style={{ minHeight: "100vh" }}>
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
          style={{ width: 400, height: 400, top: "-100px", right: "-80px" }}
        />
        <div className="relative max-w-3xl mx-auto">
          <span className="tag-pill mb-5 inline-flex">Tarifs</span>
          <h1
            className="display"
            style={{
              fontSize: "clamp(36px,5vw,60px)",
              color: "#5E5248",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Mes prestations
          </h1>
          <div className="gold-divider mt-5 max-w-xs mx-auto" />
          <p
            className="serif italic mt-6"
            style={{ fontSize: "19px", color: "#5E5248", opacity: 0.8 }}
          >
            Un accompagnement premium à un tarif plus accessible qu'une agence traditionnelle.
          </p>
          <p
            style={{
              fontSize: "12px",
              color: "#5E5248",
              opacity: 0.5,
              marginTop: "0.75rem",
              fontFamily: "var(--font-sans)",
            }}
          >
            TVA non applicable art. 293 B du CGI.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
        {/* ── Slides & Documents ───────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Slides sur mesure */}
          <HoverCard
            className="reveal bento-card"
            style={{
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "0.5px solid rgba(212,168,67,0.22)",
              boxShadow:
                "0 4px 32px rgba(200,155,109,0.08), 0 1px 4px rgba(200,155,109,0.05), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                marginBottom: "1.5rem",
                background: "linear-gradient(135deg, #F6E6B8 0%, #E6CEB0 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 14px rgba(200,155,109,0.18)",
              }}
            >
              <Presentation size={24} style={{ color: "#C89B6D" }} />
            </div>

            <h2
              className="display"
              style={{ fontSize: "22px", color: "#5E5248", marginBottom: "4px" }}
            >
              Slides sur mesure
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "#5E5248",
                marginBottom: "1.5rem",
                fontFamily: "var(--font-sans)",
              }}
            >
              Présentations, pitchs, formations
            </p>

            {/* Price */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "8px",
                marginBottom: "1.75rem",
              }}
            >
              <span
                className="display"
                style={{ fontSize: "clamp(40px,4.5vw,56px)", color: "#5E5248", lineHeight: 1 }}
              >
                30€
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "#5E5248",
                  opacity: 0.55,
                  fontFamily: "var(--font-sans)",
                }}
              >
                / slide
              </span>
            </div>

            {/* Discount table */}
            <div style={{ marginBottom: "1.25rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "10px",
                }}
              >
                <Percent size={12} style={{ color: "#5E5248" }} />
                <span
                  style={{
                    fontSize: "11px",
                    fontFamily: "var(--font-display)",
                    letterSpacing: "0.08em",
                    color: "#5E5248",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  Dégressivité
                </span>
              </div>
              <DiscountRow range="1 – 9 slides" label="Tarif de base" />
              <DiscountRow range="10 – 19 slides" label="−10 %" highlight />
              <DiscountRow range="20 – 29 slides" label="−15 %" highlight />
              <DiscountRow range="30 slides et +" label="Sur devis" />
            </div>

            <p
              style={{
                fontSize: "11px",
                color: "#5E5248",
                opacity: 0.55,
                fontStyle: "italic",
                fontFamily: "var(--font-sans)",
                lineHeight: 1.6,
              }}
            >
              Les modifications complémentaires importantes pourront faire l'objet d'une facturation
              supplémentaire au tarif horaire (60€/h).
            </p>
          </HoverCard>

          {/* Documents sur mesure */}
          <HoverCard
            className="reveal delay-100 bento-card"
            style={{
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "0.5px solid rgba(212,168,67,0.22)",
              boxShadow:
                "0 4px 32px rgba(200,155,109,0.08), 0 1px 4px rgba(200,155,109,0.05), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                marginBottom: "1.5rem",
                background: "linear-gradient(135deg, #F6E6B8 0%, #E6CEB0 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 14px rgba(200,155,109,0.18)",
              }}
            >
              <FileText size={24} style={{ color: "#C89B6D" }} />
            </div>

            <h2
              className="display"
              style={{ fontSize: "22px", color: "#5E5248", marginBottom: "4px" }}
            >
              Documents sur mesure
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "#5E5248",
                marginBottom: "1.5rem",
                fontFamily: "var(--font-sans)",
              }}
            >
              Rapports, livrets, ebooks, dossiers
            </p>

            {/* Price */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "8px",
                marginBottom: "1.75rem",
              }}
            >
              <span
                className="display"
                style={{ fontSize: "clamp(40px,4.5vw,56px)", color: "#5E5248", lineHeight: 1 }}
              >
                25€
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "#5E5248",
                  opacity: 0.55,
                  fontFamily: "var(--font-sans)",
                }}
              >
                / page
              </span>
            </div>

            {/* Discount table */}
            <div style={{ marginBottom: "1.25rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "10px",
                }}
              >
                <Percent size={12} style={{ color: "#5E5248" }} />
                <span
                  style={{
                    fontSize: "11px",
                    fontFamily: "var(--font-display)",
                    letterSpacing: "0.08em",
                    color: "#5E5248",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  Dégressivité
                </span>
              </div>
              <DiscountRow range="1 – 9 pages" label="Tarif de base" />
              <DiscountRow range="10 – 19 pages" label="−10 %" highlight />
              <DiscountRow range="20 – 29 pages" label="−15 %" highlight />
              <DiscountRow range="30 pages et +" label="Sur devis" />
            </div>

            <p
              style={{
                fontSize: "11px",
                color: "#5E5248",
                opacity: 0.55,
                fontStyle: "italic",
                fontFamily: "var(--font-sans)",
                lineHeight: 1.6,
              }}
            >
              Les modifications complémentaires importantes pourront faire l'objet d'une facturation
              supplémentaire au tarif horaire (60€/h).
            </p>
          </HoverCard>
        </div>

        {/* ── Pack Up identité ─────────────────────────────────────────────── */}
        <HoverCard
          className="bento-card reveal mb-8"
          style={{
            background:
              "linear-gradient(145deg, #C89B6D 0%, #D4B189 40%, #E6CEB0 75%, #D4B189 100%)",
            border: "0.5px solid rgba(255,255,255,0.35)",
            padding: "clamp(1.5rem,4vw,3rem)",
            boxShadow:
              "0 8px 48px rgba(200,155,109,0.28), 0 2px 12px rgba(200,155,109,0.16), inset 0 1px 0 rgba(255,255,255,0.45)",
          }}
        >
          {/* Best-seller badge */}
          <div
            className="btn-blink"
            style={{ position: "absolute", top: "1.5rem", right: "1.5rem", fontSize: "10px" }}
          >
            BEST-SELLER
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "2rem",
              alignItems: "start",
            }}
          >
            <div>
              {/* Icon */}
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  marginBottom: "1.5rem",
                  background: "rgba(255,255,255,0.18)",
                  backdropFilter: "blur(8px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
                }}
              >
                <Palette size={24} style={{ color: "#FAFAFA" }} />
              </div>

              <span
                className="tag-pill"
                style={{
                  background: "rgba(255,255,255,0.18)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#FAFAFA",
                  marginBottom: "1rem",
                  display: "inline-flex",
                  backdropFilter: "blur(8px)",
                }}
              >
                Pack complet
              </span>

              <h2
                className="display"
                style={{
                  fontSize: "clamp(28px,3vw,40px)",
                  color: "#FAFAFA",
                  marginBottom: "0.5rem",
                }}
              >
                Pack Up identité
              </h2>

              <p
                className="serif italic"
                style={{
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.85)",
                  marginBottom: "0.6rem",
                }}
              >
                ✨ Une identité élégante et cohérente pensée pour valoriser votre image.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "8px",
                  marginBottom: "2rem",
                }}
              >
                <span
                  className="display"
                  style={{ fontSize: "clamp(48px,6vw,72px)", color: "#EDD8B0", lineHeight: 1 }}
                >
                  479€
                </span>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>
                  prix unique
                </span>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "Logo simple 3 propositions",
              "Mini charte graphique",
              "Palette de couleurs harmonisée",
              "Modèles devis & factures personnalisés",
              "2 retouches mineures incluses",
            ].map((f) => (
              <div
                key={f}
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.14)",
                  backdropFilter: "blur(6px)",
                  border: "0.5px solid rgba(255,255,255,0.22)",
                  fontSize: "13px",
                  color: "#FAFAFA",
                  fontFamily: "var(--font-sans)",
                }}
              >
                <Check size={14} style={{ color: "#EDD8B0", marginTop: "2px", flexShrink: 0 }} />{" "}
                {f}
              </div>
            ))}
          </div>

          <p
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.5)",
              marginTop: "1.5rem",
              fontStyle: "italic",
              fontFamily: "var(--font-sans)",
            }}
          >
            Cartes de visite premium et finitions spécifiques en option (facturation complémentaire)
            · Délais communiqués après validation du brief
          </p>
        </HoverCard>

        {/* ── Tarif horaire + CTA ───────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {/* Tarif horaire */}
          <HoverCard
            className="bento-card reveal"
            style={{
              background: "rgba(250,250,250,0.82)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "0.5px solid rgba(212,168,67,0.18)",
              boxShadow: "0 4px 28px rgba(107,74,126,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                margin: "0 auto 1.5rem",
                background: "linear-gradient(135deg, #D4B896 0%, #EDD8B0 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 14px rgba(212,184,150,0.3)",
              }}
            >
              <Clock size={24} style={{ color: "#5E5248" }} />
            </div>

            <span className="tag-pill mb-3 inline-flex">Sur-mesure</span>

            <h2
              className="display"
              style={{ fontSize: "22px", color: "#5E5248", marginBottom: "0.5rem" }}
            >
              Tarif horaire
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "#5E5248",
                opacity: 0.65,
                marginBottom: "1.5rem",
                fontFamily: "var(--font-sans)",
              }}
            >
              Pour toute prestation sur-mesure définie au cas par cas
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <span
                className="display"
                style={{ fontSize: "clamp(48px,5vw,64px)", color: "#5E5248" }}
              >
                60€
              </span>
              <span
                style={{
                  fontSize: "14px",
                  color: "#5E5248",
                  opacity: 0.55,
                  fontFamily: "var(--font-sans)",
                }}
              >
                / heure
              </span>
            </div>

            <p
              style={{
                fontSize: "11px",
                color: "#5E5248",
                opacity: 0.55,
                marginTop: "1rem",
                fontFamily: "var(--font-sans)",
                lineHeight: 1.65,
                padding: "0 0.5rem",
              }}
            >
              Toute demande supplémentaire hors prestation initialement définie fait l'objet d'une
              facturation complémentaire au tarif horaire. Devis personnalisé systématique avant
              toute intervention.
            </p>
          </HoverCard>

          {/* CTA dark premium */}
          <HoverCard
            className="bento-card reveal delay-100"
            style={{
              background: "linear-gradient(145deg, #5E5248 0%, #B0875A 55%, #C89B6D 100%)",
              border: "0.5px solid rgba(255,255,255,0.22)",
              boxShadow:
                "0 20px 60px rgba(200,155,109,0.22), 0 0 80px rgba(200,155,109,0.10), inset 0 1px 0 rgba(255,255,255,0.18)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "clamp(1.75rem,3.5vw,2.75rem)",
              overflow: "hidden",
            }}
          >
            {/* Halo violet ambiant coin haut-droit */}
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
                  "radial-gradient(ellipse at center, rgba(200,155,109,0.12) 0%, rgba(200,155,109,0.06) 50%, transparent 72%)",
                filter: "blur(28px)",
                pointerEvents: "none",
              }}
            />
            {/* Halo prune ambiant coin bas-gauche */}
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

            {/* Eyebrow */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                marginBottom: "1.5rem",
                position: "relative",
              }}
            >
              <Sparkles size={11} style={{ color: "#EDD8B0" }} />
              <span
                style={{
                  fontSize: "10px",
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.18em",
                  color: "rgba(237,216,176,0.8)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Démarrer un projet
              </span>
            </div>

            {/* Title */}
            <h3
              className="display"
              style={{
                fontSize: "clamp(24px,2.4vw,30px)",
                color: "#FAFAFA",
                marginBottom: "1rem",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                position: "relative",
              }}
            >
              Prêt(e) à démarrer ?
            </h3>

            {/* Subtitle */}
            <p
              style={{
                fontSize: "14px",
                color: "rgba(246,240,236,0.80)",
                marginBottom: "2.25rem",
                fontFamily: "var(--font-sans)",
                lineHeight: 1.75,
                position: "relative",
                maxWidth: "340px",
              }}
            >
              Estimez votre projet en quelques clics ou contactez-moi directement pour un devis
              personnalisé sous 24h.
            </p>

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                position: "relative",
              }}
            >
              {/* Primary Simulateur */}
              <Link
                to="/simulateur"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "14px 24px",
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
                Simulateur de devis <ArrowRight size={13} />
              </Link>

              {/* Secondary Contact */}
              <Link
                to="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "13px 24px",
                  borderRadius: "100px",
                  background: "rgba(246,240,236,0.75)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  color: "#5E5248",
                  textDecoration: "none",
                  fontFamily: "var(--font-display)",
                  fontSize: "11px",
                  fontWeight: 600,
                  border: "1px solid #DCC6B0",
                  boxShadow: "0 8px 25px rgba(230,180,174,0.10)",
                  transition: "all 0.55s cubic-bezier(0.22,1,0.36,1)",
                  WebkitFontSmoothing: "antialiased",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
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
                  el.style.background = "rgba(246,240,236,0.75)";
                  el.style.color = "#5E5248";
                  el.style.borderColor = "#DCC6B0";
                  el.style.boxShadow = "0 8px 25px rgba(230,180,174,0.10)";
                  el.style.color = "#EDD8B0";
                }}
              >
                Me contacter directement
              </Link>
            </div>
          </HoverCard>
        </div>

        {/* ── Conditions générales (extrait PDF) ───────────────────────────── */}
        <section
          className="reveal"
          style={{
            marginTop: "3.5rem",
            padding: "clamp(1.75rem, 3vw, 2.5rem) clamp(1.5rem, 3vw, 2.5rem)",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "0.5px solid rgba(200,155,109,0.22)",
            boxShadow: "0 4px 24px rgba(200,155,109,0.06)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "1rem",
            }}
          >
            <span aria-hidden style={{ color: "#E6B4AE", fontSize: "12px" }}>
              ✦
            </span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "10.5px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#C89B6D",
                fontWeight: 500,
              }}
            >
              Conditions générales
            </span>
          </div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.7rem",
            }}
          >
            {[
              "Les délais de livraison sont communiqués après validation complète du brief client.",
              "Toute modification importante après validation du projet initial peut entraîner un ajustement tarifaire.",
              "Les prestations sont réalisées sur devis personnalisé lorsque le volume ou la complexité du projet nécessitent une étude spécifique.",
            ].map((c) => (
              <li
                key={c}
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                  fontFamily: "var(--font-body)",
                  fontSize: "13.5px",
                  lineHeight: 1.7,
                  color: "#5E5248",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    marginTop: "9px",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "#C89B6D",
                  }}
                />
                {c}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
