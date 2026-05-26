import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, ArrowRight, Star, Sparkles, Briefcase, Globe, Crown } from "lucide-react";
import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import heroLight from "@/assets/hero-light.png";
import heroSatinBg from "@/assets/hero-satin-bg.png";
import meliyaLogoComplete from "@/assets/meliya-logo-complete.png";
import { OrnamentWrap } from "@/components/OrnamentButton";

const SimulateurModal = lazy(() =>
  import("@/components/SimulateurModal").then((m) => ({ default: m.SimulateurModal })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MELIYA Assistante digitale spécialisée en documents" },
      {
        name: "description",
        content:
          "Structuration, mise en forme et valorisation de vos documents professionnels. Une approche éditoriale haut de gamme.",
      },
      {
        name: "keywords",
        content:
          "assistante digitale, mise en forme documents, slides professionnels, présentation PowerPoint, identité visuelle, documents haut de gamme, MELIYA",
      },
      { property: "og:title", content: "MELIYA Assistante digitale spécialisée en documents" },
      {
        property: "og:description",
        content:
          "Structuration, mise en forme et valorisation de vos documents professionnels. Une approche éditoriale haut de gamme.",
      },
      { property: "og:url", content: "https://meliya.fr/" },
      { name: "twitter:title", content: "MELIYA Assistante digitale spécialisée en documents" },
      {
        name: "twitter:description",
        content: "Documents professionnels haut de gamme. Slides, rapports, identité visuelle.",
      },
    ],
    links: [{ rel: "canonical", href: "https://meliya.fr/" }],
  }),
  component: Home,
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── Scroll zoom on entry — CSS class-based (no framer-motion) ───────────── */
function ScrollZoomSection({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      el.classList.add("in-view");
      return;
    }
    el.classList.add("scroll-zoom-section");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio > 0.12) {
          el.classList.add("in-view");
          io.disconnect();
        }
      },
      { threshold: [0, 0.12] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

const marqueeItems = [
  "Slides professionnels",
  "Rapports élégants",
  "Identité visuelle",
  "Mise en page premium",
  "Documents impactants",
  "Livrables haut de gamme",
  "Ebooks structurés",
  "Présentations clés en main",
  "Slides professionnels",
  "Rapports élégants",
  "Identité visuelle",
  "Mise en page premium",
  "Documents impactants",
  "Livrables haut de gamme",
  "Ebooks structurés",
  "Présentations clés en main",
];

const differenceCards = [
  {
    label: "Assistante administrative",
    subtitle: "Modèle traditionnel",
    Icon: Briefcase,
    bullets: [
      "Gestion administrative classique",
      "Courriers & correspondances",
      "Agenda & facturation sur site",
      "Présence physique requise",
    ],
    frontGradient: "linear-gradient(160deg, #FFFFFF 0%, #FDF8F4 55%, #F7F2EE 100%)",
    backGradient: "linear-gradient(160deg, #FDF8F4 0%, #FBEEEA 50%, #F2E0DA 100%)",
    frontLight:
      "radial-gradient(ellipse at 28% 18%, rgba(230,180,174,0.10) 0%, rgba(230,180,174,0.03) 45%, transparent 75%)",
    glowColor: "rgba(200,132,124,0.18)",
    delay: "",
    featured: false,
  },
  {
    label: "Assistante virtuelle",
    subtitle: "Profil généraliste",
    Icon: Globe,
    bullets: [
      "Tâches administratives à distance",
      "Profil généraliste & polyvalent",
      "Sans spécialité document",
      "Qualité variable selon prestataire",
    ],
    frontGradient: "linear-gradient(160deg, #FFFFFF 0%, #FDF8F4 55%, #F7F2EE 100%)",
    backGradient: "linear-gradient(160deg, #FDF8F4 0%, #FBEEEA 50%, #F2E0DA 100%)",
    frontLight:
      "radial-gradient(ellipse at 28% 18%, rgba(230,180,174,0.10) 0%, rgba(230,180,174,0.03) 45%, transparent 75%)",
    glowColor: "rgba(200,132,124,0.18)",
    delay: "delay-100",
    featured: false,
  },
  {
    label: "MELIYA",
    subtitle: "votre Assistante Digitale",
    Icon: Crown,
    bullets: [
      "Image professionnelle valorisée",
      "Supports digitaux premium",
      "Contenus clairs & structurés",
      "Communication cohérente & élégante",
      "Réactivité & gain de temps",
    ],
    frontGradient: "linear-gradient(160deg, #FFFFFF 0%, #FDF8F4 55%, #F7F2EE 100%)",
    backGradient: "linear-gradient(160deg, #FDF8F4 0%, #FBEEEA 50%, #F2E0DA 100%)",
    frontLight:
      "radial-gradient(ellipse at 28% 18%, rgba(230,180,174,0.10) 0%, rgba(230,180,174,0.03) 45%, transparent 75%)",
    glowColor: "rgba(230,180,174,0.18)",
    delay: "delay-200",
    featured: true,
  },
];

function FlipCards() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {differenceCards.map((c, i) => (
        <div key={c.label} className={`reveal ${c.delay}`} style={{ perspective: "1200px" }}>
          <div className="flip-card-premium">
            <div className="flip-card-premium-inner">
              {/* ══ FACE AVANT ══ */}
              <div
                className="flip-card-premium-face flip-card-premium-front"
                style={{ background: c.frontGradient }}
              >
                {/* Lumière interne top-left */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: c.frontLight,
                    pointerEvents: "none",
                    zIndex: 0,
                    borderRadius: "inherit",
                  }}
                />
                {/* Reflet glossy haut */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "38%",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.04) 70%, transparent 100%)",
                    borderRadius: "1.75rem 1.75rem 0 0",
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                />
                {/* Bord brillant bas */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                />

                {/* Contenu */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0",
                  }}
                >
                  {/* Icône thématique */}
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "16px",
                      marginBottom: "18px",
                      background: c.featured
                        ? "linear-gradient(135deg, #C8847C 0%, #D8A09A 100%)"
                        : "linear-gradient(135deg, #FBDDD7 0%, #F0CFC9 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: c.featured
                        ? "0 8px 22px rgba(200,132,124,0.32)"
                        : "0 6px 16px rgba(200,132,124,0.18)",
                    }}
                  >
                    <c.Icon
                      size={26}
                      strokeWidth={1.5}
                      style={{
                        color: c.featured ? "#FFFFFF" : "#C8847C",
                      }}
                    />
                  </div>

                  {c.featured && (
                    <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                      {[...Array(5)].map((_, k) => (
                        <Star
                          key={k}
                          size={16}
                          fill="#E6B4AE"
                          style={{
                            color: "#E6B4AE",
                            filter: "drop-shadow(0 1px 3px rgba(230,180,174,0.45))",
                          }}
                        />
                      ))}
                    </div>
                  )}

                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: c.featured ? "clamp(24px, 2.4vw, 28px)" : "clamp(19px, 2vw, 22px)",
                      fontWeight: 700,
                      letterSpacing: "0.02em",
                      color: "#C8847C",
                      lineHeight: 1.15,
                      textAlign: "center",
                      textShadow: "0 1px 0 rgba(255,255,255,0.7), 0 2px 12px rgba(0,0,0,0.06)",
                      margin: 0,
                    }}
                  >
                    {c.label}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: "clamp(13px, 1.3vw, 15px)",
                      color: "rgba(94,82,72,0.65)",
                      marginTop: "8px",
                      textAlign: "center",
                    }}
                  >
                    {c.subtitle}
                  </p>

                  <div
                    style={{
                      marginTop: "28px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 14px",
                      borderRadius: "100px",
                      background: c.featured ? "rgba(230,180,174,0.12)" : "rgba(200,132,124,0.08)",
                      border: c.featured
                        ? "0.5px solid rgba(230,180,174,0.45)"
                        : "0.5px solid rgba(200,132,124,0.30)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: c.featured ? "#C8847C" : "rgba(94,82,72,0.70)",
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                      }}
                    >
                      Survoler
                    </span>
                    <span
                      style={{
                        fontSize: "9px",
                        color: c.featured ? "#E6B4AE" : "rgba(94,82,72,0.45)",
                      }}
                    >
                      →
                    </span>
                  </div>
                </div>
              </div>

              {/* ══ FACE ARRIÈRE ══ */}
              <div
                className="flip-card-premium-face flip-card-premium-back"
                style={{ background: c.backGradient }}
              >
                {/* Lumière interne */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(ellipse at 20% 15%, rgba(255,255,255,0.28) 0%, transparent 60%)",
                    pointerEvents: "none",
                    zIndex: 0,
                    borderRadius: "inherit",
                  }}
                />
                {/* Reflet glossy haut */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "32%",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, transparent 100%)",
                    borderRadius: "1.75rem 1.75rem 0 0",
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                />

                {/* Contenu back */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {/* Header mini */}
                  <div
                    style={{
                      marginBottom: "4px",
                      paddingBottom: "12px",
                      borderBottom: "0.5px solid rgba(200,132,124,0.22)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "11px",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#C8847C",
                        fontWeight: 700,
                        margin: 0,
                      }}
                    >
                      {c.label}
                    </p>
                  </div>

                  {/* Bullets */}
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "9px",
                    }}
                  >
                    {c.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
                      >
                        <span
                          style={{
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            background: "#C8847C",
                            flexShrink: 0,
                            marginTop: "7px",
                            boxShadow: "0 0 6px rgba(200,132,124,0.35)",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "clamp(12.5px, 1.35vw, 14.5px)",
                            lineHeight: 1.5,
                            color: "#5E5248",
                            fontWeight: 500,
                            textAlign: "left",
                            letterSpacing: "0.01em",
                          }}
                        >
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {c.featured && (
                    <Link
                      to="/contact"
                      style={{
                        marginTop: "10px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "7px",
                        padding: "8px 16px",
                        borderRadius: "100px",
                        background: "linear-gradient(135deg, #C8847C 0%, #D8A09A 100%)",
                        border: "0.5px solid rgba(200,132,124,0.55)",
                        fontSize: "11px",
                        fontFamily: "var(--font-display)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        color: "#FFFFFF",
                        textDecoration: "none",
                        boxShadow: "0 6px 18px rgba(200,132,124,0.28)",
                        transition: "all 0.25s ease",
                        alignSelf: "flex-start",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      }}
                    >
                      Discutons <ArrowRight size={11} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Home() {
  useReveal();
  const [simulOpen, setSimulOpen] = useState(false);

  return (
    <>
      {/* ═══ HERO fond satiné MELIYA + logo M centré (légèrement en haut) ═══ */}
      <section
        id="hero"
        aria-label="MELIYA Assistante digitale"
        className="hero-bg-animate"
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          overflow: "hidden",
          backgroundColor: "#F7F2EE",
          backgroundImage: `url(${heroSatinBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          marginTop: "-76px",
          paddingTop: "76px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Sparkles orbitales autour du logo */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "calc(76px + clamp(2rem, 5vh, 4.5rem) + min(290px, 33vw))",
            left: "50%",
            width: 0,
            height: 0,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <span className="hero-sparkle" />
          <span className="hero-sparkle hero-sparkle-2" />
          <span className="hero-sparkle hero-sparkle-3" />
          <span className="hero-sparkle hero-sparkle-4" />
        </div>

        {/* Logo complet MELIYA (M cercle + wordmark intégré) centré */}
        <div
          style={{
            position: "relative",
            display: "inline-block",
            marginTop: "clamp(2rem, 5vh, 4.5rem)",
            animation: "meliya-logo-float 9s ease-in-out infinite",
          }}
        >
          <img
            src={meliyaLogoComplete}
            alt="MELIYA"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            style={{
              display: "block",
              width: "min(581px, 66vw)",
              height: "auto",
              objectFit: "contain",
              filter:
                "drop-shadow(0 20px 50px rgba(230,180,174,0.32)) drop-shadow(0 6px 16px rgba(200,132,124,0.18))",
              pointerEvents: "none",
              userSelect: "none",
            }}
          />
        </div>

        {/* ── Tagline « L'élégance comme signature » juste sous MELIYA, plus grand ── */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "clamp(18px, 2.4vw, 30px)",
            marginTop: "clamp(4rem, 10vh, 8rem)",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 2,
          }}
          aria-label="L'élégance comme signature"
        >
          {/* ✦ gauche */}
          <span
            style={{
              color: "#E6B4AE",
              fontSize: "clamp(14px, 1.4vw, 18px)",
              lineHeight: 1,
              textShadow: "0 1px 6px rgba(230,180,174,0.45)",
            }}
          >
            ✦
          </span>

          <span
            className="hero-tagline-shimmer"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(22px, 2.4vw, 32px)",
              letterSpacing: "0.025em",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            L&apos;élégance comme{" "}
            <span
              style={{
                color: "#E6B4AE",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              signature
            </span>
          </span>

          {/* ✦ droite */}
          <span
            style={{
              color: "#E6B4AE",
              fontSize: "clamp(14px, 1.4vw, 18px)",
              lineHeight: 1,
              textShadow: "0 1px 6px rgba(230,180,174,0.45)",
            }}
          >
            ✦
          </span>
        </div>

        {/* ── Bouton DECOUVRIR sans contour, en bas du hero, scroll smooth vers section suivante ── */}
        <button
          type="button"
          onClick={() => {
            const marquee = document.querySelector(".marquee-strip");
            if (marquee) {
              marquee.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
              window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
            }
          }}
          aria-label="Découvrir la suite"
          style={{
            position: "absolute",
            bottom: "clamp(2rem, 4vh, 3.5rem)",
            left: "50%",
            transform: "translateX(-50%)",
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            background: "transparent",
            border: "none",
            outline: "none",
            cursor: "pointer",
            color: "#C8847C",
            fontFamily: "var(--font-display)",
            fontSize: "11px",
            letterSpacing: "0.32em",
            fontWeight: 600,
            textTransform: "uppercase",
            zIndex: 3,
            transition:
              "color 0.45s cubic-bezier(0.22,1,0.36,1), transform 0.45s cubic-bezier(0.22,1,0.36,1)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#A86660";
            (e.currentTarget as HTMLElement).style.transform = "translateX(-50%) translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#C8847C";
            (e.currentTarget as HTMLElement).style.transform = "translateX(-50%) translateY(0)";
          }}
        >
          Découvrir
          {/* Filet vertical animé sous le mot */}
          <span
            aria-hidden
            style={{
              width: "0.5px",
              height: "26px",
              background: "linear-gradient(180deg, currentColor, transparent)",
              animation: "meliya-scroll-hint 2.6s ease-in-out infinite",
            }}
          />
        </button>
      </section>

      {/* ═══ SERVICES PREVIEW — Quick access aux prestations ═══ */}
      <ScrollZoomSection>
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6 sm:px-10">
            <div
              style={{
                textAlign: "center",
                marginBottom: "clamp(2rem, 4vw, 3rem)",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "5px 16px",
                  borderRadius: "100px",
                  background: "rgba(230,180,174,0.10)",
                  border: "0.5px solid rgba(200,132,124,0.30)",
                  fontFamily: "var(--font-display)",
                  fontSize: "10px",
                  letterSpacing: "0.20em",
                  textTransform: "uppercase",
                  color: "#C8847C",
                  fontWeight: 600,
                  marginBottom: "1.4rem",
                }}
              >
                <Sparkles size={11} /> Mes prestations
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(28px, 3.6vw, 44px)",
                  color: "#C8847C",
                  marginBottom: "0.6rem",
                  fontWeight: 500,
                }}
              >
                Un service à la hauteur de votre image
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(15px, 1.4vw, 17px)",
                  color: "rgba(94,82,72,0.75)",
                  maxWidth: "540px",
                  margin: "0 auto",
                }}
              >
                Trois prestations sur mesure, chacune pensée pour valoriser vos contenus.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  Icon: Sparkles,
                  title: "Slides sur mesure",
                  desc: "Présentations, pitchs, formations.",
                  price: "30€",
                  unit: "/ slide",
                },
                {
                  Icon: ShieldCheck,
                  title: "Documents sur mesure",
                  desc: "Rapports, livrets, ebooks, dossiers.",
                  price: "25€",
                  unit: "/ page",
                },
                {
                  Icon: Crown,
                  title: "Pack Up Identité",
                  desc: "Logo, charte, modèles & cohérence.",
                  price: "479€",
                  unit: "forfait",
                },
              ].map((s, i) => (
                <Link
                  key={i}
                  to="/prestations"
                  className="reveal"
                  style={{
                    display: "block",
                    padding: "1.8rem",
                    borderRadius: "1.25rem",
                    background: "linear-gradient(150deg, #FFFFFF 0%, #FDF8F4 100%)",
                    border: "1px solid rgba(230,180,174,0.22)",
                    boxShadow:
                      "0 10px 40px -20px rgba(200,132,124,0.18), inset 0 1px 0 rgba(255,255,255,0.85)",
                    textDecoration: "none",
                    transition: "all 0.45s cubic-bezier(0.16,1,0.3,1)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-6px) scale(1.012)";
                    el.style.borderColor = "rgba(200,132,124,0.55)";
                    el.style.boxShadow =
                      "0 18px 50px -18px rgba(200,132,124,0.30), 0 4px 14px rgba(200,132,124,0.10), inset 0 1px 0 rgba(255,255,255,0.9)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(0)";
                    el.style.borderColor = "rgba(230,180,174,0.22)";
                    el.style.boxShadow =
                      "0 10px 40px -20px rgba(200,132,124,0.18), inset 0 1px 0 rgba(255,255,255,0.85)";
                  }}
                >
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "14px",
                      background: "linear-gradient(135deg, #FBDDD7 0%, #F0CFC9 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1.2rem",
                      boxShadow: "0 4px 14px rgba(200,132,124,0.18)",
                    }}
                  >
                    <s.Icon size={24} strokeWidth={1.5} style={{ color: "#C8847C" }} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "16px",
                      letterSpacing: "0.06em",
                      fontWeight: 600,
                      color: "#C8847C",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "13.5px",
                      color: "rgba(94,82,72,0.78)",
                      marginBottom: "1.2rem",
                      lineHeight: 1.55,
                    }}
                  >
                    {s.desc}
                  </p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "28px",
                        fontWeight: 700,
                        color: "#B57068",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {s.price}
                    </span>
                    <span style={{ fontSize: "12px", color: "rgba(94,82,72,0.55)" }}>{s.unit}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "clamp(2rem, 4vw, 3rem)",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/prestations"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  borderRadius: "100px",
                  background: "linear-gradient(135deg, #C8847C 0%, #D8A09A 100%)",
                  border: "1px solid rgba(200,132,124,0.55)",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-display)",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 8px 24px rgba(200,132,124,0.28)",
                  transition: "transform 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                Voir le détail des tarifs <ArrowRight size={14} />
              </Link>
              <button
                type="button"
                onClick={() => setSimulOpen(true)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  borderRadius: "100px",
                  background: "transparent",
                  border: "1px solid rgba(200,132,124,0.55)",
                  color: "#C8847C",
                  fontFamily: "var(--font-display)",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(230,180,174,0.10)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "transparent";
                  el.style.transform = "translateY(0)";
                }}
              >
                <Sparkles size={14} /> Estimer mon projet
              </button>
            </div>
          </div>
        </section>
      </ScrollZoomSection>

      {/* ═══ MARQUEE ═══ */}
      <ScrollZoomSection>
        <div
          className="marquee-strip"
          style={{
            background:
              "linear-gradient(90deg, #E6B4AE 0%, #DDA098 22%, #E6B4AE 44%, #D9A493 60%, #E6B4AE 78%, #DDA098 100%)",
            padding: "14px 0",
            overflow: "hidden",
            borderTop: "0.5px solid rgba(200,140,130,0.45)",
            borderBottom: "0.5px solid rgba(200,132,124,0.30)",
            position: "relative",
          }}
        >
          {/* Voile shimmer doux blanc/or — reflets satinés subtils */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 25%, transparent 50%, rgba(244,217,185,0.20) 75%, transparent 100%)",
              pointerEvents: "none",
              mixBlendMode: "overlay",
            }}
          />
          {/* Bord lumineux haut */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
              pointerEvents: "none",
            }}
          />
          <div
            className="marquee-track flex gap-8"
            style={{ width: "max-content", position: "relative" }}
          >
            {marqueeItems.map((item, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "11px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: "24px",
                  fontWeight: 700,
                  textShadow: "0 1px 3px rgba(120,70,65,0.55), 0 0 12px rgba(180,110,100,0.30)",
                }}
              >
                {item}
                <span
                  style={{
                    color: "#FFFFFF",
                    fontSize: "13px",
                    textShadow: "0 1px 4px rgba(200,132,124,0.55)",
                  }}
                >
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </ScrollZoomSection>

      {/* ═══ MON APPROCHE layout éditorial ═══ */}
      <ScrollZoomSection>
        <section
          className="bento-section py-32"
          style={{
            position: "relative",
            overflow: "hidden",
            WebkitFontSmoothing: "antialiased",
            background: "transparent",
          }}
        >
          {/* ── Halo rose subtil — accent charte ── */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "20%",
              right: "-12%",
              width: "45%",
              height: "55%",
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(230,180,174,0.14) 0%, rgba(230,180,174,0.04) 50%, transparent 75%)",
              filter: "blur(95px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          {/* ── Halos atmosphériques champagne ── */}
          <div
            style={{
              position: "absolute",
              top: "-10%",
              left: "-5%",
              width: "50%",
              height: "65%",
              background:
                "radial-gradient(ellipse at 28% 38%, rgba(212,177,137,0.18) 0%, rgba(239,219,195,0.08) 45%, transparent 72%)",
              filter: "blur(90px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-10%",
              right: "-5%",
              width: "55%",
              height: "65%",
              background:
                "radial-gradient(ellipse at 72% 62%, rgba(200,132,124,0.12) 0%, rgba(212,177,137,0.06) 48%, transparent 72%)",
              filter: "blur(100px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          <div
            className="max-w-7xl mx-auto px-6 sm:px-10"
            style={{ position: "relative", zIndex: 1 }}
          >
            {/* ── En-tête section ── */}
            <div className="text-center mb-20 reveal">
              <span className="tag-pill mb-4 inline-flex">Mon approche</span>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(34px,4.5vw,54px)",
                  fontWeight: 600,
                  color: "#C8847C",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  marginTop: "1rem",
                }}
              >
                Pourquoi choisir MELIYA ?
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(15px,1.4vw,17px)",
                  color: "rgba(94,82,72,0.65)",
                  marginTop: "1rem",
                  lineHeight: 1.75,
                }}
              >
                Une approche éditoriale pensée jusqu'au dernier détail.
              </p>
            </div>

            {/* ══ LAYOUT ÉDITORIAL 4 colonnes typographiques ══ */}
            <div style={{ position: "relative" }}>
              {/* Ligne or horizontale top */}
              <div
                style={{
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(200,132,124,0.35) 12%, #C8847C 38%, #F0CFC9 55%, #C8847C 72%, rgba(200,132,124,0.35) 88%, transparent 100%)",
                  marginBottom: "0",
                }}
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "1px",
                  background: "rgba(200,132,124,0.13)",
                }}
              >
                {/* ── 01 Structuration violet doux ── */}
                <div
                  className="reveal gentle-float"
                  style={{
                    padding: "3.5rem 2.6rem 3rem",
                    display: "flex",
                    flexDirection: "column",
                    background: "rgba(245,238,230,0.85)",
                    position: "relative",
                    overflow: "hidden",
                    transition:
                      "background 0.45s ease, transform 0.40s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(241,228,211,0.97)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 12px 40px rgba(200,132,124,0.20), 0 2px 8px rgba(200,132,124,0.10)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(245,238,230,0.85)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  {/* Accent coloré vertical gauche */}
                  <div
                    style={{
                      position: "absolute",
                      top: "2.5rem",
                      left: 0,
                      width: "3px",
                      height: "48px",
                      background:
                        "linear-gradient(180deg, #D8A09A 0%, rgba(200,132,124,0.15) 100%)",
                      borderRadius: "0 2px 2px 0",
                    }}
                  />
                  {/* Grand chiffre avec halo */}
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: "clamp(72px,8vw,110px)",
                      color: "rgba(212,177,137,0.48)",
                      lineHeight: 0.9,
                      letterSpacing: "-0.05em",
                      userSelect: "none",
                      marginBottom: "1.8rem",
                      textShadow: "0 4px 20px rgba(212,177,137,0.28)",
                      filter: "drop-shadow(0 2px 12px rgba(200,132,124,0.20))",
                    }}
                  >
                    01
                  </div>
                  {/* Trait or + étoile */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "1.4rem",
                    }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "1.5px",
                        background: "linear-gradient(90deg, #C8847C, rgba(200,132,124,0.20))",
                        borderRadius: "2px",
                      }}
                    />
                    <span style={{ color: "#C8847C", fontSize: "10px", opacity: 0.8 }}>✦</span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(18px,2vw,24px)",
                      color: "#C8847C",
                      fontWeight: 600,
                      lineHeight: 1.15,
                      letterSpacing: "-0.01em",
                      marginBottom: "1rem",
                    }}
                  >
                    Structuration rigoureuse
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "13.5px",
                      color: "rgba(94,82,72,0.65)",
                      lineHeight: 1.82,
                      flex: 1,
                    }}
                  >
                    Chaque document est pensé comme un tout cohérent architecture de l'information,
                    hiérarchie visuelle, logique de lecture.
                  </p>
                  {/* Accent bas coloré */}
                  <div
                    style={{
                      marginTop: "2rem",
                      height: "2px",
                      borderRadius: "2px",
                      background: "linear-gradient(90deg, #D8A09A 0%, rgba(200,132,124,0.20) 100%)",
                    }}
                  />
                </div>

                {/* ── 02 Haut de gamme or ── */}
                <div
                  className="reveal delay-100 gentle-float-d1"
                  style={{
                    padding: "3.5rem 2.6rem 3rem",
                    display: "flex",
                    flexDirection: "column",
                    background: "rgba(245,238,230,0.85)",
                    position: "relative",
                    overflow: "hidden",
                    transition:
                      "background 0.45s ease, transform 0.40s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(241,228,211,0.97)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 12px 40px rgba(200,132,124,0.18), 0 2px 8px rgba(200,132,124,0.10)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(245,238,230,0.85)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "2.5rem",
                      left: 0,
                      width: "3px",
                      height: "48px",
                      background:
                        "linear-gradient(180deg, #C8847C 0%, rgba(200,132,124,0.15) 100%)",
                      borderRadius: "0 2px 2px 0",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: "clamp(72px,8vw,110px)",
                      color: "rgba(200,132,124,0.42)",
                      lineHeight: 0.9,
                      letterSpacing: "-0.05em",
                      userSelect: "none",
                      marginBottom: "1.8rem",
                      textShadow: "0 4px 20px rgba(200,132,124,0.22)",
                      filter: "drop-shadow(0 2px 12px rgba(200,132,124,0.18))",
                    }}
                  >
                    02
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "1.4rem",
                    }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "1.5px",
                        background: "linear-gradient(90deg, #C8847C, rgba(200,132,124,0.20))",
                        borderRadius: "2px",
                      }}
                    />
                    <span style={{ color: "#C8847C", fontSize: "10px", opacity: 0.8 }}>✦</span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(18px,2vw,24px)",
                      color: "#C8847C",
                      fontWeight: 600,
                      lineHeight: 1.15,
                      letterSpacing: "-0.01em",
                      marginBottom: "1rem",
                    }}
                  >
                    Haut de gamme
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "13.5px",
                      color: "rgba(94,82,72,0.65)",
                      lineHeight: 1.82,
                      flex: 1,
                    }}
                  >
                    Une esthétique premium, moderne et cohérente avec votre identité.
                  </p>
                  <div
                    style={{
                      marginTop: "2rem",
                      height: "2px",
                      borderRadius: "2px",
                      background: "linear-gradient(90deg, #C8847C 0%, rgba(200,132,124,0.20) 100%)",
                    }}
                  />
                </div>

                {/* ── 03 Valorisation ivoire chaud ── */}
                <div
                  className="reveal delay-200 gentle-float-d2"
                  style={{
                    padding: "3.5rem 2.6rem 3rem",
                    display: "flex",
                    flexDirection: "column",
                    background: "rgba(245,238,230,0.85)",
                    position: "relative",
                    overflow: "hidden",
                    transition:
                      "background 0.45s ease, transform 0.40s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(241,228,211,0.97)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 12px 40px rgba(200,132,124,0.18), 0 2px 8px rgba(200,132,124,0.10)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(245,238,230,0.85)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "2.5rem",
                      left: 0,
                      width: "3px",
                      height: "48px",
                      background:
                        "linear-gradient(180deg, #D8A09A 0%, rgba(216,160,154,0.15) 100%)",
                      borderRadius: "0 2px 2px 0",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: "clamp(72px,8vw,110px)",
                      color: "rgba(200,132,124,0.40)",
                      lineHeight: 0.9,
                      letterSpacing: "-0.05em",
                      userSelect: "none",
                      marginBottom: "1.8rem",
                      textShadow: "0 4px 20px rgba(200,132,124,0.22)",
                      filter: "drop-shadow(0 2px 12px rgba(200,132,124,0.18))",
                    }}
                  >
                    03
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "1.4rem",
                    }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "1.5px",
                        background: "linear-gradient(90deg, #C8847C, rgba(200,132,124,0.20))",
                        borderRadius: "2px",
                      }}
                    />
                    <span style={{ color: "#C8847C", fontSize: "10px", opacity: 0.8 }}>✦</span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(18px,2vw,24px)",
                      color: "#C8847C",
                      fontWeight: 600,
                      lineHeight: 1.15,
                      letterSpacing: "-0.01em",
                      marginBottom: "1rem",
                    }}
                  >
                    Valorisation
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "13.5px",
                      color: "rgba(94,82,72,0.65)",
                      lineHeight: 1.82,
                      flex: 1,
                    }}
                  >
                    Clarifiez vos idées. Sublimez votre image. Vos documents deviennent un atout à
                    part entière.
                  </p>
                  <div
                    style={{
                      marginTop: "2rem",
                      height: "2px",
                      borderRadius: "2px",
                      background: "linear-gradient(90deg, #D8A09A 0%, rgba(216,160,154,0.20) 100%)",
                    }}
                  />
                </div>

                {/* ── 04 Confidentialité violet ── */}
                <div
                  className="reveal delay-300 gentle-float-d3"
                  style={{
                    padding: "3.5rem 2.6rem 3rem",
                    display: "flex",
                    flexDirection: "column",
                    background: "rgba(245,238,230,0.85)",
                    position: "relative",
                    overflow: "hidden",
                    transition:
                      "background 0.45s ease, transform 0.40s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(241,228,211,0.97)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 12px 40px rgba(200,132,124,0.20), 0 2px 8px rgba(200,132,124,0.10)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(245,238,230,0.85)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "2.5rem",
                      left: 0,
                      width: "3px",
                      height: "48px",
                      background:
                        "linear-gradient(180deg, #D8A09A 0%, rgba(200,132,124,0.15) 100%)",
                      borderRadius: "0 2px 2px 0",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: "clamp(72px,8vw,110px)",
                      color: "rgba(212,177,137,0.48)",
                      lineHeight: 0.9,
                      letterSpacing: "-0.05em",
                      userSelect: "none",
                      marginBottom: "1.8rem",
                      textShadow: "0 4px 20px rgba(212,177,137,0.28)",
                      filter: "drop-shadow(0 2px 12px rgba(200,132,124,0.20))",
                    }}
                  >
                    04
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "1.4rem",
                    }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "1.5px",
                        background: "linear-gradient(90deg, #C8847C, rgba(200,132,124,0.20))",
                        borderRadius: "2px",
                      }}
                    />
                    <span style={{ color: "#C8847C", fontSize: "10px", opacity: 0.8 }}>✦</span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(18px,2vw,24px)",
                      color: "#C8847C",
                      fontWeight: 600,
                      lineHeight: 1.15,
                      letterSpacing: "-0.01em",
                      marginBottom: "1rem",
                    }}
                  >
                    Confidentialité totale
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "13.5px",
                      color: "rgba(94,82,72,0.65)",
                      lineHeight: 1.82,
                      flex: 1,
                    }}
                  >
                    Discrétion absolue sur tous vos projets, garantie par accord de confidentialité.
                  </p>
                  <div
                    style={{
                      marginTop: "2rem",
                      height: "2px",
                      borderRadius: "2px",
                      background: "linear-gradient(90deg, #D8A09A 0%, rgba(200,132,124,0.20) 100%)",
                    }}
                  />
                </div>
              </div>

              {/* Ligne or horizontale bottom */}
              <div
                style={{
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(200,132,124,0.35) 12%, #C8847C 38%, #F0CFC9 55%, #C8847C 72%, rgba(200,132,124,0.35) 88%, transparent 100%)",
                }}
              />
            </div>

            {/* ── FIN SECTION ── */}
            <div style={{ display: "none" }}>
              <div>
                {/* Lumière douce top-left */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "65%",
                    height: "70%",
                    background:
                      "radial-gradient(ellipse at 18% 16%, rgba(255,255,255,0.75) 0%, rgba(240,230,255,0.42) 45%, transparent 72%)",
                    pointerEvents: "none",
                  }}
                />
                {/* Halo violet bas-droite */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-50px",
                    right: "-30px",
                    width: "320px",
                    height: "320px",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(ellipse, rgba(212,177,137,0.28) 0%, rgba(239,219,195,0.12) 55%, transparent 80%)",
                    filter: "blur(40px)",
                    pointerEvents: "none",
                  }}
                />
                {/* Anneaux top-right */}
                <div
                  style={{
                    position: "absolute",
                    top: "6%",
                    right: "5%",
                    width: "180px",
                    height: "180px",
                    borderRadius: "50%",
                    border: "1px solid rgba(168,128,208,0.38)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "12%",
                    right: "11%",
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    border: "0.5px solid rgba(168,128,208,0.52)",
                    background:
                      "radial-gradient(ellipse, rgba(200,132,124,0.10) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                {/* Grande citation */}
                <div
                  style={{
                    position: "absolute",
                    top: "4%",
                    left: "5%",
                    fontFamily: "var(--font-serif)",
                    fontSize: "160px",
                    fontStyle: "italic",
                    color: "rgba(168,128,208,0.13)",
                    lineHeight: 1,
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  "
                </div>
                {/* Sparkles */}
                <span
                  style={{
                    position: "absolute",
                    top: "28%",
                    left: "56%",
                    color: "rgba(168,128,208,0.75)",
                    fontSize: "11px",
                    pointerEvents: "none",
                    animation: "sparkle-twinkle 3.5s ease-in-out infinite 0.8s",
                  }}
                >
                  ✦
                </span>
                <span
                  style={{
                    position: "absolute",
                    top: "18%",
                    right: "14%",
                    color: "rgba(200,132,124,0.55)",
                    fontSize: "8px",
                    pointerEvents: "none",
                    animation: "sparkle-twinkle 4.5s ease-in-out infinite 2s",
                  }}
                >
                  ✦
                </span>
                {/* Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "1.4rem",
                    right: "1.4rem",
                    fontFamily: "var(--font-display)",
                    fontSize: "9.5px",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(200,132,124,0.65)",
                    background: "rgba(255,255,255,0.55)",
                    border: "0.5px solid rgba(168,128,208,0.52)",
                    borderRadius: "100px",
                    padding: "4px 13px",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  01 / 04
                </div>
                {/* Vignette bas */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "52%",
                    background:
                      "linear-gradient(0deg, rgba(200,132,124,0.22) 0%, rgba(200,132,124,0.08) 50%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                />
                {/* Texte */}
                <div style={{ position: "relative", zIndex: 2 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "1.1rem",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "1.5px",
                        background: "linear-gradient(90deg, #C8847C, rgba(200,132,124,0.18))",
                        borderRadius: "2px",
                      }}
                    />
                    <span style={{ color: "#C8847C", fontSize: "11px", opacity: 0.78 }}>✦</span>
                    <div
                      style={{
                        width: "36px",
                        height: "1.5px",
                        background: "linear-gradient(270deg, #C8847C, rgba(200,132,124,0.18))",
                        borderRadius: "2px",
                      }}
                    />
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(26px,3.2vw,40px)",
                      color: "#C8847C",
                      marginBottom: "0.70rem",
                      fontWeight: 600,
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                      textShadow: "0 1px 12px rgba(255,255,255,0.70)",
                    }}
                  >
                    Structuration rigoureuse
                  </h3>
                  <div
                    style={{
                      width: "40px",
                      height: "2px",
                      borderRadius: "2px",
                      background: "linear-gradient(90deg, #D8A09A, rgba(200,132,124,0.22))",
                      marginBottom: "1rem",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 400,
                      fontStyle: "italic",
                      fontSize: "14px",
                      color: "rgba(94,82,72,0.65)",
                      lineHeight: 1.8,
                      maxWidth: "400px",
                    }}
                  >
                    Chaque document est pensé comme un tout cohérent architecture de l'information,
                    hiérarchie visuelle, logique de lecture.
                  </p>
                </div>
              </div>

              {/* ══ 02 Haut de gamme OR, petite droite row 1 ══ */}
              <div
                className="bento-card bento-card-premium card-glow reveal delay-100 gentle-float-d1"
                style={{
                  gridColumn: "span 5",
                  background:
                    "linear-gradient(145deg, #C8847C 0%, #D8A09A 25%, #F0CFC9 50%, #FBE6E0 72%, #F2E0DA 88%, #FBEEEA 100%)",
                  border: "1px solid rgba(255,255,255,0.48)",
                  minHeight: "380px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  boxShadow: [
                    "0 2px 8px rgba(0,0,0,0.07)",
                    "0 10px 32px rgba(200,132,124,0.32)",
                    "0 32px 80px rgba(200,132,124,0.18)",
                    "0 70px 130px rgba(200,132,124,0.10)",
                    "inset 0 1.5px 0 rgba(255,255,255,0.75)",
                  ].join(", "),
                  overflow: "hidden",
                }}
              >
                {/* Lumière solaire top-left */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "72%",
                    height: "65%",
                    background:
                      "radial-gradient(ellipse at 18% 14%, rgba(255,252,225,0.82) 0%, rgba(255,238,160,0.35) 45%, transparent 72%)",
                    pointerEvents: "none",
                  }}
                />
                {/* Halo bas-droite */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-35px",
                    right: "-35px",
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(ellipse, rgba(200,132,124,0.28) 0%, rgba(232,200,100,0.10) 55%, transparent 80%)",
                    filter: "blur(24px)",
                    pointerEvents: "none",
                  }}
                />
                {/* Anneau déco top-right */}
                <div
                  style={{
                    position: "absolute",
                    top: "4%",
                    right: "4%",
                    width: "160px",
                    height: "160px",
                    borderRadius: "50%",
                    border: "1px solid rgba(200,132,124,0.30)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "10%",
                    right: "10%",
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    border: "0.5px solid rgba(200,132,124,0.42)",
                    background:
                      "radial-gradient(ellipse, rgba(200,132,124,0.10) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                {/* Sparkle */}
                <span
                  style={{
                    position: "absolute",
                    top: "22%",
                    left: "58%",
                    color: "rgba(200,132,124,0.68)",
                    fontSize: "10px",
                    pointerEvents: "none",
                    animation: "sparkle-twinkle 4s ease-in-out infinite 1s",
                  }}
                >
                  ✦
                </span>
                <span
                  style={{
                    position: "absolute",
                    top: "12%",
                    right: "20%",
                    color: "rgba(200,132,124,0.45)",
                    fontSize: "7px",
                    pointerEvents: "none",
                    animation: "sparkle-twinkle 3.5s ease-in-out infinite 2.2s",
                  }}
                >
                  ✦
                </span>
                {/* Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "1.4rem",
                    right: "1.4rem",
                    fontFamily: "var(--font-display)",
                    fontSize: "9.5px",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(200,132,124,0.90)",
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.50) 0%, rgba(255,248,200,0.35) 100%)",
                    border: "0.5px solid rgba(200,132,124,0.40)",
                    borderRadius: "100px",
                    padding: "4px 13px",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  02 / 04
                </div>
                {/* Vignette bas */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "50%",
                    background:
                      "linear-gradient(0deg, rgba(170,120,20,0.20) 0%, rgba(200,132,124,0.08) 50%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                />
                {/* Texte */}
                <div style={{ position: "relative", zIndex: 2 }}>
                  <div
                    style={{
                      width: "40px",
                      height: "2px",
                      borderRadius: "2px",
                      background:
                        "linear-gradient(90deg, rgba(200,132,124,0.90), rgba(200,132,124,0.22))",
                      marginBottom: "1rem",
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(24px,3vw,36px)",
                      color: "#C8847C",
                      marginBottom: "0.65rem",
                      fontWeight: 600,
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                      textShadow: "0 1px 12px rgba(255,248,200,0.75)",
                    }}
                  >
                    Haut de gamme
                  </h3>
                  <div
                    style={{
                      width: "36px",
                      height: "2px",
                      borderRadius: "2px",
                      background:
                        "linear-gradient(90deg, rgba(200,132,124,0.80), rgba(200,132,124,0.18))",
                      marginBottom: "0.85rem",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 400,
                      fontStyle: "italic",
                      fontSize: "13px",
                      color: "rgba(94,82,72,0.65)",
                      lineHeight: 1.78,
                    }}
                  >
                    Une esthétique premium, moderne et cohérente avec votre identité.
                  </p>
                </div>
              </div>

              {/* ══ 03 Valorisation BLANC / IVOIRE, petite gauche row 2 ══ */}
              <div
                className="bento-card bento-card-premium card-glow reveal delay-200 gentle-float-d2"
                style={{
                  gridColumn: "span 5",
                  background:
                    "linear-gradient(145deg, #F7F2EE 0%, #FBEEEA 28%, #F2E0DA 55%, #FBE6E0 78%, #F0CFC9 100%)",
                  border: "1px solid rgba(224,207,183,0.85)",
                  boxShadow: [
                    "0 2px 6px rgba(0,0,0,0.05)",
                    "0 8px 28px rgba(200,132,124,0.12)",
                    "0 24px 60px rgba(200,132,124,0.10)",
                    "0 50px 90px rgba(0,0,0,0.04)",
                    "inset 0 1.5px 0 rgba(255,255,255,1)",
                  ].join(", "),
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3.5px",
                    background:
                      "linear-gradient(90deg, transparent 0%, #D8A09A 22%, #E8C2BC 55%, #D8A09A 80%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "70%",
                    height: "60%",
                    background:
                      "radial-gradient(ellipse at 15% 14%, rgba(255,255,255,1) 0%, rgba(255,252,250,0.55) 45%, transparent 72%)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "-25px",
                    right: "-25px",
                    width: "160px",
                    height: "160px",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(ellipse, rgba(212,177,137,0.22) 0%, rgba(239,219,195,0.10) 55%, transparent 80%)",
                    filter: "blur(18px)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "1.3rem",
                    right: "1.5rem",
                    fontFamily: "var(--font-display)",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(200,132,124,0.28)",
                  }}
                >
                  03 / 04
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "1.5px",
                      borderRadius: "2px",
                      background: "linear-gradient(90deg, #C8847C, rgba(200,132,124,0.14))",
                    }}
                  />
                  <span
                    style={{ color: "#C8847C", fontSize: "13px", lineHeight: 1, opacity: 0.75 }}
                  >
                    ✦
                  </span>
                  <div
                    style={{
                      width: "36px",
                      height: "1.5px",
                      borderRadius: "2px",
                      background: "linear-gradient(270deg, #C8847C, rgba(200,132,124,0.14))",
                    }}
                  />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(22px,2.5vw,30px)",
                    color: "#C8847C",
                    marginBottom: "0.60rem",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    textShadow: "0 1px 8px rgba(255,255,255,0.62)",
                  }}
                >
                  Valorisation
                </h3>
                <div
                  style={{
                    width: "30px",
                    height: "2px",
                    borderRadius: "2px",
                    background: "linear-gradient(90deg, #C8847C, rgba(200,132,124,0.18))",
                    marginBottom: "0.85rem",
                  }}
                />
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    fontSize: "14px",
                    color: "rgba(94,82,72,0.65)",
                    lineHeight: 1.8,
                  }}
                >
                  Clarifiez vos idées.
                  <br />
                  Sublimez votre image.
                </p>
              </div>

              {/* ══ 04 Confidentialité ROSE → OR, grande droite row 2 ══ */}
              <div
                className="bento-card bento-card-premium card-glow reveal delay-300 gentle-float-d3"
                style={{
                  gridColumn: "span 7",
                  background:
                    "linear-gradient(135deg, #D8A09A 0%, #C8847C 25%, #D8A09A 50%, #F0CFC9 75%, #D8A09A 100%)",
                  border: "1px solid rgba(255,255,255,0.40)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: [
                    "0 2px 8px rgba(0,0,0,0.08)",
                    "0 10px 32px rgba(200,132,124,0.22)",
                    "0 32px 80px rgba(200,132,124,0.18)",
                    "0 70px 130px rgba(200,132,124,0.10)",
                    "inset 0 1.5px 0 rgba(255,255,255,0.58)",
                  ].join(", "),
                  overflow: "hidden",
                }}
              >
                {/* Lumière violet top-left */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "55%",
                    height: "60%",
                    background:
                      "radial-gradient(ellipse at 16% 16%, rgba(240,230,255,0.62) 0%, rgba(210,190,255,0.28) 45%, transparent 72%)",
                    pointerEvents: "none",
                  }}
                />
                {/* Halo or bas-droite */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-30px",
                    right: "-30px",
                    width: "220px",
                    height: "220px",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(ellipse, rgba(200,132,124,0.24) 0%, rgba(220,185,80,0.08) 55%, transparent 80%)",
                    filter: "blur(26px)",
                    pointerEvents: "none",
                  }}
                />
                {/* Anneau droite */}
                <div
                  style={{
                    position: "absolute",
                    right: "-45px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.28)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    right: "-5px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "115px",
                    height: "115px",
                    borderRadius: "50%",
                    border: "0.5px solid rgba(255,255,255,0.38)",
                    pointerEvents: "none",
                  }}
                />

                {/* Haut : sparkle + badge NDA */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "rgba(255,255,255,0.70)", fontSize: "10px" }}>✦</span>
                    <div
                      style={{
                        width: "1.5px",
                        height: "38px",
                        borderRadius: "2px",
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.18) 100%)",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "9.5px",
                      fontWeight: 700,
                      letterSpacing: "0.20em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.85)",
                      background: "rgba(255,255,255,0.20)",
                      border: "0.5px solid rgba(255,255,255,0.40)",
                      borderRadius: "100px",
                      padding: "5px 14px",
                      backdropFilter: "blur(10px)",
                      boxShadow:
                        "0 2px 10px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.30)",
                    }}
                  >
                    NDA
                  </div>
                </div>

                {/* Bas : texte */}
                <div style={{ position: "relative", zIndex: 2 }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(22px,2.6vw,34px)",
                      color: "#FFFFFF",
                      marginBottom: "0.45rem",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.15,
                      textShadow: "0 2px 18px rgba(100,50,10,0.28)",
                    }}
                  >
                    Confidentialité totale
                  </h3>
                  <div
                    style={{
                      width: "32px",
                      height: "2px",
                      borderRadius: "2px",
                      background:
                        "linear-gradient(90deg, rgba(255,255,255,0.85), rgba(255,255,255,0.18))",
                      marginBottom: "0.72rem",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 400,
                      fontStyle: "italic",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.80)",
                      lineHeight: 1.72,
                    }}
                  >
                    Discrétion absolue sur tous vos projets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollZoomSection>

      {/* ═══ DIFFÉRENCE ═══ */}
      <ScrollZoomSection>
        <section
          className="py-32 relative overflow-hidden"
          style={{
            background: "transparent",
          }}
        >
          {/* Halo rose subtil top-left */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "5%",
              left: "-10%",
              width: "40%",
              height: "55%",
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(230,180,174,0.16) 0%, transparent 70%)",
              filter: "blur(90px)",
              pointerEvents: "none",
            }}
          />
          <div
            className="orb orb-gold"
            style={{ width: 350, height: 350, bottom: "-80px", right: "-60px", opacity: 0.2 }}
          />

          <div className="max-w-6xl mx-auto px-6 sm:px-10">
            <div className="text-center mb-14 reveal">
              <span className="tag-pill mb-4 inline-flex">La différence MELIYA</span>
              <h2
                className="display mt-4"
                style={{
                  fontSize: "clamp(28px,4vw,44px)",
                  color: "#C8847C",
                  letterSpacing: "-0.01em",
                }}
              >
                Pas une simple assistante
              </h2>
              <p
                className="serif italic mt-3"
                style={{ fontSize: "18px", color: "rgba(94,82,72,0.75)" }}
              >
                Une spécialiste la nuance qui fait toute la différence.
              </p>
            </div>

            <FlipCards />
          </div>
        </section>
      </ScrollZoomSection>

      {/* ═══ CTA FINAL ═══ */}
      <ScrollZoomSection>
        <section
          className="py-28"
          style={{
            background: "transparent",
          }}
        >
          <div className="max-w-4xl mx-auto reveal" style={{ padding: "0 1.5rem" }}>
            <div
              className="cta-block"
              style={{
                borderRadius: "32px",
                padding: "clamp(3.5rem,7vw,5.5rem) clamp(2rem,5vw,4rem)",
                background: "linear-gradient(150deg, #FFFFFF 0%, #FDF8F4 55%, #FAF0E8 100%)",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                border: "1.5px solid rgba(200,132,124,0.28)",
                boxShadow: [
                  "0 1px 2px rgba(0,0,0,0.04)",
                  "0 10px 40px -20px rgba(200,132,124,0.18)",
                  "0 24px 64px rgba(200,132,124,0.08)",
                  "inset 0 1px 0 rgba(255,255,255,0.96)",
                ].join(", "),
                WebkitFontSmoothing: "antialiased",
              }}
            >
              {/* ── Halos atmosphériques ── */}
              <div
                style={{
                  position: "absolute",
                  top: "-45%",
                  right: "-8%",
                  width: "55%",
                  height: "85%",
                  background:
                    "radial-gradient(ellipse at 65% 25%, rgba(212,177,137,0.22) 0%, rgba(212,177,137,0.14) 45%, transparent 70%)",
                  filter: "blur(55px)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-35%",
                  left: "-8%",
                  width: "50%",
                  height: "70%",
                  background:
                    "radial-gradient(ellipse at 30% 75%, rgba(239,219,195,0.20) 0%, rgba(212,177,137,0.14) 50%, transparent 75%)",
                  filter: "blur(50px)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
              {/* Reflet glossy haut */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "50%",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
                  borderRadius: "32px 32px 0 0",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
              {/* Bord lumineux bas */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
              {/* Grain texture */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "inherit",
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
                  backgroundSize: "160px 160px",
                  opacity: 0.032,
                  mixBlendMode: "overlay",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />
              {/* Inner vignette top */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "35%",
                  background:
                    "radial-gradient(ellipse at 30% 0%, rgba(255,255,255,0.18) 0%, transparent 70%)",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />

              {/* Sparkles */}
              <span
                style={{
                  position: "absolute",
                  top: "12%",
                  left: "6%",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "11px",
                  pointerEvents: "none",
                  zIndex: 2,
                  animation: "sparkle-rare 8s ease-in-out 0s infinite",
                }}
              >
                ✦
              </span>
              <span
                style={{
                  position: "absolute",
                  top: "16%",
                  right: "7%",
                  color: "rgba(255,255,255,0.35)",
                  fontSize: "8px",
                  pointerEvents: "none",
                  zIndex: 2,
                  animation: "sparkle-rare 12s ease-in-out 3.5s infinite",
                }}
              >
                ✦
              </span>
              <span
                style={{
                  position: "absolute",
                  bottom: "18%",
                  left: "10%",
                  color: "rgba(255,255,255,0.3)",
                  fontSize: "9px",
                  pointerEvents: "none",
                  zIndex: 2,
                  animation: "sparkle-rare 14s ease-in-out 6s infinite",
                }}
              >
                ✦
              </span>
              <span
                style={{
                  position: "absolute",
                  bottom: "14%",
                  right: "9%",
                  color: "rgba(255,255,255,0.42)",
                  fontSize: "10px",
                  pointerEvents: "none",
                  zIndex: 2,
                  animation: "sparkle-rare 10s ease-in-out 1.8s infinite",
                }}
              >
                ✦
              </span>

              {/* ── Contenu ── */}
              <div style={{ position: "relative", zIndex: 3 }}>
                {/* Badge Prêt(e) */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "5px 18px",
                    borderRadius: "100px",
                    background: "rgba(200,132,124,0.08)",
                    border: "0.5px solid rgba(200,132,124,0.30)",
                    boxShadow: "0 1px 8px rgba(200,132,124,0.10)",
                    marginBottom: "2.2rem",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase" as const,
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    color: "#C8847C",
                  }}
                >
                  <span style={{ fontSize: "7px", opacity: 0.65 }}>✦</span>
                  Prêt(e) ?<span style={{ fontSize: "7px", opacity: 0.65 }}>✦</span>
                </div>

                {/* Titre */}
                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "clamp(36px,5.5vw,62px)",
                    fontWeight: 600,
                    color: "#5E5248",
                    letterSpacing: "-0.018em",
                    lineHeight: 1.1,
                    marginBottom: "1.8rem",
                  }}
                >
                  Donnons vie à vos documents.
                </h2>

                {/* Sous-titre */}
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontStyle: "italic",
                    fontSize: "clamp(14px,1.6vw,16px)",
                    fontWeight: 400,
                    color: "#5E5248",
                    opacity: 0.68,
                    letterSpacing: "0.015em",
                    lineHeight: 1.72,
                    marginBottom: "3.5rem",
                    maxWidth: "400px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  Un échange de 20 minutes suffit pour tout définir.
                </p>

                {/* Boutons */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "14px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* Bouton principal */}
                  <OrnamentWrap style={{ margin: "0 4px" }}>
                    <Link
                      to="/contact"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "9px",
                        padding: "15px 38px",
                        borderRadius: "100px",
                        background: "linear-gradient(135deg, #FBDDD7 0%, #C8847C 100%)",
                        color: "#4A2820",
                        fontFamily: "var(--font-display)",
                        fontSize: "11.5px",
                        letterSpacing: "0.1em",
                        fontWeight: 700,
                        textTransform: "uppercase" as const,
                        textDecoration: "none",
                        border: "1px solid #C8847C",
                        boxShadow:
                          "0 8px 25px rgba(230,180,174,0.10), inset 0 0.5px 0 rgba(255,255,255,0.55)",
                        transition: "all 0.55s cubic-bezier(0.22,1,0.36,1)",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.transform = "translateY(-1px) scale(1.015)";
                        el.style.background = "linear-gradient(135deg, #E6B4AE, #A86660)";
                        el.style.color = "#FFFFFF";
                        el.style.borderColor = "#A86660";
                        el.style.boxShadow = "0 12px 35px rgba(168,102,96,0.22)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.transform = "translateY(0) scale(1)";
                        el.style.background = "linear-gradient(135deg, #FBDDD7 0%, #C8847C 100%)";
                        el.style.color = "#4A2820";
                        el.style.borderColor = "#C8847C";
                        el.style.boxShadow =
                          "0 8px 25px rgba(230,180,174,0.10), inset 0 0.5px 0 rgba(255,255,255,0.55)";
                      }}
                    >
                      Me contacter <ArrowRight size={13} />
                    </Link>
                  </OrnamentWrap>

                  {/* Bouton secondaire */}
                  <OrnamentWrap style={{ margin: "0 4px" }}>
                    <Link
                      to="/simulateur"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "15px 30px",
                        borderRadius: "100px",
                        background: "rgba(246,240,236,0.75)",
                        color: "#5E5248",
                        fontFamily: "var(--font-display)",
                        fontSize: "11px",
                        fontWeight: 700,
                        textDecoration: "none",
                        border: "1px solid #E8C2BC",
                        boxShadow:
                          "0 8px 25px rgba(230,180,174,0.10), inset 0 0.5px 0 rgba(255,255,255,0.55)",
                        transition: "all 0.55s cubic-bezier(0.22,1,0.36,1)",
                        letterSpacing: "0.10em",
                        textTransform: "uppercase" as const,
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.transform = "translateY(-1px) scale(1.012)";
                        el.style.background = "linear-gradient(135deg, #E6B4AE, #A86660)";
                        el.style.color = "#FFFFFF";
                        el.style.borderColor = "#A86660";
                        el.style.boxShadow = "0 12px 35px rgba(168,102,96,0.22)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.transform = "translateY(0) scale(1)";
                        el.style.background = "rgba(246,240,236,0.75)";
                        el.style.color = "#5E5248";
                        el.style.borderColor = "#E8C2BC";
                        el.style.boxShadow =
                          "0 8px 25px rgba(230,180,174,0.10), inset 0 0.5px 0 rgba(255,255,255,0.55)";
                      }}
                    >
                      Estimer mon projet
                    </Link>
                  </OrnamentWrap>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollZoomSection>

      <Suspense fallback={null}>
        <SimulateurModal open={simulOpen} onClose={() => setSimulOpen(false)} />
      </Suspense>
    </>
  );
}
