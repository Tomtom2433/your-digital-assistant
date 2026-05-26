import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, ArrowRight, Star, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import heroLight from "@/assets/hero-light.png";
import { OrnamentWrap } from "@/components/OrnamentButton";
import { SimulateurModal } from "@/components/SimulateurModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MELIYA — Assistante digitale spécialisée en documents" },
      { name: "description", content: "Structuration, mise en forme et valorisation de vos documents professionnels. Une approche éditoriale haut de gamme." },
    ],
  }),
  component: Home,
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const marqueeItems = [
  "Slides professionnels", "Rapports élégants", "Identité visuelle", "Mise en page premium",
  "Documents impactants", "Livrables haut de gamme", "Ebooks structurés", "Présentations clés en main",
  "Slides professionnels", "Rapports élégants", "Identité visuelle", "Mise en page premium",
  "Documents impactants", "Livrables haut de gamme", "Ebooks structurés", "Présentations clés en main",
];

const differenceCards = [
  {
    label: "Assistante administrative",
    subtitle: "Modèle traditionnel",
    bullets: [
      "Gestion administrative classique",
      "Courriers & correspondances",
      "Agenda & facturation sur site",
      "Présence physique requise",
    ],
    frontGradient: "linear-gradient(145deg, #F4E9DD 0%, #EFDBC3 28%, #E0CFB7 58%, #D9BF9A 100%)",
    backGradient:  "linear-gradient(145deg, #D9BF9A 0%, #C5A374 35%, #D9BF9A 65%, #EFDBC3 100%)",
    frontLight:    "radial-gradient(ellipse at 25% 20%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)",
    glowColor:     "rgba(197,163,116,0.35)",
    delay: "",
    featured: false,
  },
  {
    label: "Assistante virtuelle",
    subtitle: "Profil généraliste",
    bullets: [
      "Tâches administratives à distance",
      "Profil généraliste & polyvalent",
      "Sans spécialité document",
      "Qualité variable selon prestataire",
    ],
    frontGradient: "linear-gradient(145deg, #F4E9DD 0%, #EFDBC3 28%, #E0CFB7 58%, #D9BF9A 100%)",
    backGradient:  "linear-gradient(145deg, #D9BF9A 0%, #C5A374 35%, #D9BF9A 65%, #EFDBC3 100%)",
    frontLight:    "radial-gradient(ellipse at 25% 20%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)",
    glowColor:     "rgba(197,163,116,0.35)",
    delay: "delay-100",
    featured: false,
  },
  {
    label: "MELIYA",
    subtitle: "votre Assistante Digitale",
    bullets: [
      "Image professionnelle valorisée",
      "Supports digitaux premium",
      "Contenus clairs & structurés",
      "Communication cohérente & élégante",
      "Réactivité & gain de temps",
    ],
    frontGradient: "linear-gradient(145deg, #F4E9DD 0%, #EFDBC3 28%, #E0CFB7 58%, #D9BF9A 100%)",
    backGradient:  "linear-gradient(145deg, #D9BF9A 0%, #C5A374 35%, #D9BF9A 65%, #EFDBC3 100%)",
    frontLight:    "radial-gradient(ellipse at 25% 20%, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.12) 40%, transparent 70%)",
    glowColor:     "rgba(197,163,116,0.38)",
    delay: "delay-200",
    featured: true,
  },
];

function FlipCards() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {differenceCards.map((c, i) => (
        <div
          key={c.label}
          className={`reveal ${c.delay}`}
          style={{ perspective: "1200px" }}
        >
          <div className="flip-card-premium">
            <div className="flip-card-premium-inner">

              {/* ══ FACE AVANT ══ */}
              <div
                className="flip-card-premium-face flip-card-premium-front"
                style={{ background: c.frontGradient }}
              >
                {/* Lumière interne top-left */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: c.frontLight,
                  pointerEvents: "none", zIndex: 0, borderRadius: "inherit",
                }} />
                {/* Reflet glossy haut */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "38%",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.04) 70%, transparent 100%)",
                  borderRadius: "1.75rem 1.75rem 0 0",
                  pointerEvents: "none", zIndex: 0,
                }} />
                {/* Bord brillant bas */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                  pointerEvents: "none", zIndex: 0,
                }} />

                {/* Contenu */}
                <div style={{
                  position: "relative", zIndex: 1,
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "0",
                }}>
                  {c.featured && (
                    <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                      {[...Array(5)].map((_, k) => (
                        <Star key={k} size={16} fill="rgba(255,255,255,0.92)" style={{ color: "rgba(255,255,255,0.92)", filter: "drop-shadow(0 1px 4px rgba(255,255,255,0.5))" }} />
                      ))}
                    </div>
                  )}

                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: c.featured ? "clamp(24px, 2.4vw, 28px)" : "clamp(19px, 2vw, 22px)",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    color: "#C5A374",
                    lineHeight: 1.15,
                    textAlign: "center",
                    textShadow: "0 1px 0 rgba(255,255,255,0.7), 0 2px 12px rgba(0,0,0,0.06)",
                    margin: 0,
                  }}>
                    {c.label}
                  </h3>

                  <p style={{
                    fontFamily: "var(--font-serif)", fontStyle: "italic",
                    fontSize: "clamp(13px, 1.3vw, 15px)",
                    color: "rgba(140,106,67,0.65)",
                    marginTop: "8px",
                    textAlign: "center",
                  }}>
                    {c.subtitle}
                  </p>

                  <div style={{
                    marginTop: "28px",
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "6px 14px",
                    borderRadius: "100px",
                    background: "rgba(255,255,255,0.28)",
                    border: "0.5px solid rgba(255,255,255,0.55)",
                    backdropFilter: "blur(4px)",
                  }}>
                    <span style={{
                      fontSize: "10px",
                      letterSpacing: "0.16em", textTransform: "uppercase",
                      color: "rgba(140,106,67,0.65)", fontFamily: "var(--font-display)",
                      fontWeight: 600,
                    }}>
                      Survoler
                    </span>
                    <span style={{ fontSize: "9px", color: "rgba(140,106,67,0.38)" }}>→</span>
                  </div>
                </div>
              </div>

              {/* ══ FACE ARRIÈRE ══ */}
              <div
                className="flip-card-premium-face flip-card-premium-back"
                style={{ background: c.backGradient }}
              >
                {/* Lumière interne */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "radial-gradient(ellipse at 20% 15%, rgba(255,255,255,0.28) 0%, transparent 60%)",
                  pointerEvents: "none", zIndex: 0, borderRadius: "inherit",
                }} />
                {/* Reflet glossy haut */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "32%",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, transparent 100%)",
                  borderRadius: "1.75rem 1.75rem 0 0",
                  pointerEvents: "none", zIndex: 0,
                }} />

                {/* Contenu back */}
                <div style={{
                  position: "relative", zIndex: 1,
                  width: "100%", display: "flex", flexDirection: "column", gap: "10px",
                }}>
                  {/* Header mini */}
                  <div style={{
                    marginBottom: "4px",
                    paddingBottom: "12px",
                    borderBottom: "0.5px solid rgba(255,255,255,0.25)",
                  }}>
                    <p style={{
                      fontFamily: "var(--font-display)", fontSize: "11px",
                      letterSpacing: "0.14em", textTransform: "uppercase",
                      color: "rgba(255,255,255,0.65)", fontWeight: 600, margin: 0,
                    }}>
                      {c.label}
                    </p>
                  </div>

                  {/* Bullets */}
                  <ul style={{
                    listStyle: "none", padding: 0, margin: 0,
                    display: "flex", flexDirection: "column", gap: "9px",
                  }}>
                    {c.bullets.map((bullet, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <span style={{
                          width: "5px", height: "5px", borderRadius: "50%",
                          background: "rgba(255,255,255,0.7)",
                          flexShrink: 0, marginTop: "6px",
                          boxShadow: "0 0 6px rgba(255,255,255,0.4)",
                        }} />
                        <span style={{
                          fontSize: "clamp(12.5px, 1.35vw, 14.5px)",
                          lineHeight: 1.5,
                          color: "rgba(255,255,255,0.92)",
                          fontWeight: 450,
                          textAlign: "left",
                          letterSpacing: "0.01em",
                        }}>
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
                        display: "inline-flex", alignItems: "center", gap: "7px",
                        padding: "8px 16px",
                        borderRadius: "100px",
                        background: "rgba(255,255,255,0.2)",
                        border: "0.5px solid rgba(255,255,255,0.45)",
                        fontSize: "11px",
                        fontFamily: "var(--font-display)", letterSpacing: "0.1em",
                        textTransform: "uppercase", fontWeight: 700,
                        color: "rgba(255,255,255,0.95)", textDecoration: "none",
                        backdropFilter: "blur(6px)",
                        transition: "all 0.25s ease",
                        alignSelf: "flex-start",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.32)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.2)";
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
      {/* ═══ HERO — plein écran ═══ */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          minHeight: "600px",
          overflow: "hidden",
          background: "#F6F0EC",
          marginTop: "-72px",
        }}
      >
        {/* Image hero — plein écran, object-fit cover */}
        <img
          src={heroLight}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
            display: "block",
          }}
        />

        {/* ── Tagline overlay bottom-left ── */}
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "6%",
            zIndex: 10,
            maxWidth: "340px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(15px, 1.6vw, 21px)",
              lineHeight: 1.65,
              color: "#C5A374",
              letterSpacing: "0.015em",
              margin: 0,
              textShadow: "0 1px 18px rgba(246,240,236,0.80)",
            }}
          >
            Meliya, votre assistante digitale spécialisée
            <br />dans la création de supports professionnels.
          </p>
        </div>

      </section>

      {/* ═══ MARQUEE ═══ */}
      <div
        className="marquee-strip"
        style={{
          background: "linear-gradient(90deg, #E0CFB7 0%, #EFDBC3 25%, #F5EEE6 50%, #EFDBC3 75%, #E0CFB7 100%)",
          padding: "12px 0",
          overflow: "hidden",
          borderTop: "1px solid rgba(197,163,116,0.22)",
          borderBottom: "1px solid rgba(197,163,116,0.16)",
        }}
      >
        <div className="marquee-track flex gap-8" style={{ width: "max-content" }}>
          {marqueeItems.map((item, i) => (
            <span key={i} style={{
              fontFamily: "var(--font-display)",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C5A374",
              whiteSpace: "nowrap",
              display: "flex", alignItems: "center", gap: "24px",
            }}>
              {item}
              <span style={{ color: "#C5A374", fontSize: "14px" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ MON APPROCHE — layout éditorial ═══ */}
      <section
        className="bento-section py-32"
        style={{
          position: "relative", overflow: "hidden", WebkitFontSmoothing: "antialiased",
          background: "transparent",
        }}
      >
        {/* ── Halos atmosphériques champagne ── */}
        <div style={{
          position: "absolute", top: "-10%", left: "-5%",
          width: "50%", height: "65%",
          background: "radial-gradient(ellipse at 28% 38%, rgba(217,191,154,0.18) 0%, rgba(239,219,195,0.08) 45%, transparent 72%)",
          filter: "blur(90px)", pointerEvents: "none", zIndex: 0,
        }} />
        <div style={{
          position: "absolute", bottom: "-10%", right: "-5%",
          width: "55%", height: "65%",
          background: "radial-gradient(ellipse at 72% 62%, rgba(197,163,116,0.12) 0%, rgba(217,191,154,0.06) 48%, transparent 72%)",
          filter: "blur(100px)", pointerEvents: "none", zIndex: 0,
        }} />

        <div className="max-w-7xl mx-auto px-6 sm:px-10" style={{ position: "relative", zIndex: 1 }}>
          {/* ── En-tête section ── */}
          <div className="text-center mb-20 reveal">
            <span className="tag-pill mb-4 inline-flex">Mon approche</span>
            <h2
              style={{
                fontFamily: "var(--font-serif)", fontStyle: "italic",
                fontSize: "clamp(34px,4.5vw,54px)", fontWeight: 600,
                color: "#C5A374", letterSpacing: "-0.02em", lineHeight: 1.1,
                marginTop: "1rem",
              }}
            >
              Pourquoi choisir MELIYA ?
            </h2>
            <p style={{
              fontFamily: "var(--font-serif)", fontStyle: "italic",
              fontSize: "clamp(15px,1.4vw,17px)", color: "rgba(140,106,67,0.65)",
              marginTop: "1rem", lineHeight: 1.75,
            }}>
              Une approche éditoriale pensée jusqu'au dernier détail.
            </p>
          </div>

          {/* ══ LAYOUT ÉDITORIAL — 4 colonnes typographiques ══ */}
          <div style={{ position: "relative" }}>

            {/* Ligne or horizontale — top */}
            <div style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent 0%, rgba(197,163,116,0.35) 12%, #C8A03C 38%, #E4C878 55%, #C8A03C 72%, rgba(197,163,116,0.35) 88%, transparent 100%)",
              marginBottom: "0",
            }} />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "rgba(197,163,116,0.13)" }}>

              {/* ── 01 Structuration — violet doux ── */}
              <div
                className="reveal gentle-float"
                style={{
                  padding: "3.5rem 2.6rem 3rem",
                  display: "flex", flexDirection: "column",
                  background: "rgba(245,238,230,0.85)",
                  position: "relative", overflow: "hidden",
                  transition: "background 0.45s ease, transform 0.40s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(241,228,211,0.97)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(197,163,116,0.20), 0 2px 8px rgba(197,163,116,0.10)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(245,238,230,0.85)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Accent coloré vertical gauche */}
                <div style={{
                  position: "absolute", top: "2.5rem", left: 0, width: "3px", height: "48px",
                  background: "linear-gradient(180deg, #D9BF9A 0%, rgba(197,163,116,0.15) 100%)",
                  borderRadius: "0 2px 2px 0",
                }} />
                {/* Grand chiffre avec halo */}
                <div style={{
                  fontFamily: "var(--font-serif)", fontStyle: "italic",
                  fontSize: "clamp(72px,8vw,110px)",
                  color: "rgba(217,191,154,0.48)", lineHeight: 0.9,
                  letterSpacing: "-0.05em", userSelect: "none",
                  marginBottom: "1.8rem",
                  textShadow: "0 4px 20px rgba(217,191,154,0.28)",
                  filter: "drop-shadow(0 2px 12px rgba(197,163,116,0.20))",
                }}>01</div>
                {/* Trait or + étoile */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.4rem" }}>
                  <div style={{ width: "28px", height: "1.5px", background: "linear-gradient(90deg, #C8A03C, rgba(197,163,116,0.20))", borderRadius: "2px" }} />
                  <span style={{ color: "#C5A374", fontSize: "10px", opacity: 0.80 }}>✦</span>
                </div>
                <h3 style={{
                  fontFamily: "var(--font-serif)", fontSize: "clamp(18px,2vw,24px)",
                  color: "#C5A374", fontWeight: 600, lineHeight: 1.15,
                  letterSpacing: "-0.01em", marginBottom: "1rem",
                }}>
                  Structuration rigoureuse
                </h3>
                <p style={{
                  fontFamily: "var(--font-sans)", fontStyle: "italic", fontWeight: 400,
                  fontSize: "13.5px", color: "rgba(140,106,67,0.65)", lineHeight: 1.82,
                  flex: 1,
                }}>
                  Chaque document est pensé comme un tout cohérent — architecture de l'information, hiérarchie visuelle, logique de lecture.
                </p>
                {/* Accent bas coloré */}
                <div style={{
                  marginTop: "2rem", height: "2px", borderRadius: "2px",
                  background: "linear-gradient(90deg, #D9BF9A 0%, rgba(197,163,116,0.20) 100%)",
                }} />
              </div>

              {/* ── 02 Haut de gamme — or ── */}
              <div
                className="reveal delay-100 gentle-float-d1"
                style={{
                  padding: "3.5rem 2.6rem 3rem",
                  display: "flex", flexDirection: "column",
                  background: "rgba(245,238,230,0.85)",
                  position: "relative", overflow: "hidden",
                  transition: "background 0.45s ease, transform 0.40s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(241,228,211,0.97)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(197,163,116,0.18), 0 2px 8px rgba(197,163,116,0.10)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(245,238,230,0.85)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div style={{
                  position: "absolute", top: "2.5rem", left: 0, width: "3px", height: "48px",
                  background: "linear-gradient(180deg, #C8A03C 0%, rgba(200,160,60,0.15) 100%)",
                  borderRadius: "0 2px 2px 0",
                }} />
                <div style={{
                  fontFamily: "var(--font-serif)", fontStyle: "italic",
                  fontSize: "clamp(72px,8vw,110px)",
                  color: "rgba(197,163,116,0.42)", lineHeight: 0.9,
                  letterSpacing: "-0.05em", userSelect: "none",
                  marginBottom: "1.8rem",
                  textShadow: "0 4px 20px rgba(197,163,116,0.22)",
                  filter: "drop-shadow(0 2px 12px rgba(197,163,116,0.18))",
                }}>02</div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.4rem" }}>
                  <div style={{ width: "28px", height: "1.5px", background: "linear-gradient(90deg, #C8A03C, rgba(197,163,116,0.20))", borderRadius: "2px" }} />
                  <span style={{ color: "#C5A374", fontSize: "10px", opacity: 0.80 }}>✦</span>
                </div>
                <h3 style={{
                  fontFamily: "var(--font-serif)", fontSize: "clamp(18px,2vw,24px)",
                  color: "#C5A374", fontWeight: 600, lineHeight: 1.15,
                  letterSpacing: "-0.01em", marginBottom: "1rem",
                }}>
                  Haut de gamme
                </h3>
                <p style={{
                  fontFamily: "var(--font-sans)", fontStyle: "italic", fontWeight: 400,
                  fontSize: "13.5px", color: "rgba(140,106,67,0.65)", lineHeight: 1.82,
                  flex: 1,
                }}>
                  Une esthétique premium, moderne et cohérente avec votre identité.
                </p>
                <div style={{
                  marginTop: "2rem", height: "2px", borderRadius: "2px",
                  background: "linear-gradient(90deg, #C8A03C 0%, rgba(197,163,116,0.20) 100%)",
                }} />
              </div>

              {/* ── 03 Valorisation — ivoire chaud ── */}
              <div
                className="reveal delay-200 gentle-float-d2"
                style={{
                  padding: "3.5rem 2.6rem 3rem",
                  display: "flex", flexDirection: "column",
                  background: "rgba(245,238,230,0.85)",
                  position: "relative", overflow: "hidden",
                  transition: "background 0.45s ease, transform 0.40s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(241,228,211,0.97)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(197,163,116,0.18), 0 2px 8px rgba(197,163,116,0.10)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(245,238,230,0.85)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div style={{
                  position: "absolute", top: "2.5rem", left: 0, width: "3px", height: "48px",
                  background: "linear-gradient(180deg, #D4A868 0%, rgba(212,168,104,0.15) 100%)",
                  borderRadius: "0 2px 2px 0",
                }} />
                <div style={{
                  fontFamily: "var(--font-serif)", fontStyle: "italic",
                  fontSize: "clamp(72px,8vw,110px)",
                  color: "rgba(197,163,116,0.40)", lineHeight: 0.9,
                  letterSpacing: "-0.05em", userSelect: "none",
                  marginBottom: "1.8rem",
                  textShadow: "0 4px 20px rgba(197,163,116,0.22)",
                  filter: "drop-shadow(0 2px 12px rgba(197,163,116,0.18))",
                }}>03</div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.4rem" }}>
                  <div style={{ width: "28px", height: "1.5px", background: "linear-gradient(90deg, #C8A03C, rgba(197,163,116,0.20))", borderRadius: "2px" }} />
                  <span style={{ color: "#C5A374", fontSize: "10px", opacity: 0.80 }}>✦</span>
                </div>
                <h3 style={{
                  fontFamily: "var(--font-serif)", fontSize: "clamp(18px,2vw,24px)",
                  color: "#C5A374", fontWeight: 600, lineHeight: 1.15,
                  letterSpacing: "-0.01em", marginBottom: "1rem",
                }}>
                  Valorisation
                </h3>
                <p style={{
                  fontFamily: "var(--font-sans)", fontStyle: "italic", fontWeight: 400,
                  fontSize: "13.5px", color: "rgba(140,106,67,0.65)", lineHeight: 1.82,
                  flex: 1,
                }}>
                  Clarifiez vos idées. Sublimez votre image. Vos documents deviennent un atout à part entière.
                </p>
                <div style={{
                  marginTop: "2rem", height: "2px", borderRadius: "2px",
                  background: "linear-gradient(90deg, #D4A868 0%, rgba(212,168,104,0.20) 100%)",
                }} />
              </div>

              {/* ── 04 Confidentialité — violet ── */}
              <div
                className="reveal delay-300 gentle-float-d3"
                style={{
                  padding: "3.5rem 2.6rem 3rem",
                  display: "flex", flexDirection: "column",
                  background: "rgba(245,238,230,0.85)",
                  position: "relative", overflow: "hidden",
                  transition: "background 0.45s ease, transform 0.40s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(241,228,211,0.97)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(197,163,116,0.20), 0 2px 8px rgba(197,163,116,0.10)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(245,238,230,0.85)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div style={{
                  position: "absolute", top: "2.5rem", left: 0, width: "3px", height: "48px",
                  background: "linear-gradient(180deg, #D9BF9A 0%, rgba(197,163,116,0.15) 100%)",
                  borderRadius: "0 2px 2px 0",
                }} />
                <div style={{
                  fontFamily: "var(--font-serif)", fontStyle: "italic",
                  fontSize: "clamp(72px,8vw,110px)",
                  color: "rgba(217,191,154,0.48)", lineHeight: 0.9,
                  letterSpacing: "-0.05em", userSelect: "none",
                  marginBottom: "1.8rem",
                  textShadow: "0 4px 20px rgba(217,191,154,0.28)",
                  filter: "drop-shadow(0 2px 12px rgba(197,163,116,0.20))",
                }}>04</div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.4rem" }}>
                  <div style={{ width: "28px", height: "1.5px", background: "linear-gradient(90deg, #C8A03C, rgba(197,163,116,0.20))", borderRadius: "2px" }} />
                  <span style={{ color: "#C5A374", fontSize: "10px", opacity: 0.80 }}>✦</span>
                </div>
                <h3 style={{
                  fontFamily: "var(--font-serif)", fontSize: "clamp(18px,2vw,24px)",
                  color: "#C5A374", fontWeight: 600, lineHeight: 1.15,
                  letterSpacing: "-0.01em", marginBottom: "1rem",
                }}>
                  Confidentialité totale
                </h3>
                <p style={{
                  fontFamily: "var(--font-sans)", fontStyle: "italic", fontWeight: 400,
                  fontSize: "13.5px", color: "rgba(140,106,67,0.65)", lineHeight: 1.82,
                  flex: 1,
                }}>
                  Discrétion absolue sur tous vos projets, garantie par accord de confidentialité.
                </p>
                <div style={{
                  marginTop: "2rem", height: "2px", borderRadius: "2px",
                  background: "linear-gradient(90deg, #D9BF9A 0%, rgba(197,163,116,0.20) 100%)",
                }} />
              </div>

            </div>

            {/* Ligne or horizontale — bottom */}
            <div style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent 0%, rgba(197,163,116,0.35) 12%, #C8A03C 38%, #E4C878 55%, #C8A03C 72%, rgba(197,163,116,0.35) 88%, transparent 100%)",
            }} />

          </div>

          {/* ── FIN SECTION ── */}
          <div style={{ display: "none" }}><div>
              {/* Lumière douce top-left */}
              <div style={{
                position: "absolute", top: 0, left: 0, width: "65%", height: "70%",
                background: "radial-gradient(ellipse at 18% 16%, rgba(255,255,255,0.75) 0%, rgba(240,230,255,0.42) 45%, transparent 72%)",
                pointerEvents: "none",
              }} />
              {/* Halo violet bas-droite */}
              <div style={{
                position: "absolute", bottom: "-50px", right: "-30px",
                width: "320px", height: "320px", borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(217,191,154,0.28) 0%, rgba(239,219,195,0.12) 55%, transparent 80%)",
                filter: "blur(40px)", pointerEvents: "none",
              }} />
              {/* Anneaux top-right */}
              <div style={{
                position: "absolute", top: "6%", right: "5%",
                width: "180px", height: "180px", borderRadius: "50%",
                border: "1px solid rgba(168,128,208,0.38)",
                pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", top: "12%", right: "11%",
                width: "100px", height: "100px", borderRadius: "50%",
                border: "0.5px solid rgba(168,128,208,0.52)",
                background: "radial-gradient(ellipse, rgba(197,163,116,0.10) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />
              {/* Grande citation */}
              <div style={{
                position: "absolute", top: "4%", left: "5%",
                fontFamily: "var(--font-serif)", fontSize: "160px", fontStyle: "italic",
                color: "rgba(168,128,208,0.13)", lineHeight: 1,
                userSelect: "none", pointerEvents: "none",
              }}>"</div>
              {/* Sparkles */}
              <span style={{ position: "absolute", top: "28%", left: "56%", color: "rgba(168,128,208,0.75)", fontSize: "11px", pointerEvents: "none", animation: "sparkle-twinkle 3.5s ease-in-out infinite 0.8s" }}>✦</span>
              <span style={{ position: "absolute", top: "18%", right: "14%", color: "rgba(200,160,60,0.55)", fontSize: "8px", pointerEvents: "none", animation: "sparkle-twinkle 4.5s ease-in-out infinite 2s" }}>✦</span>
              {/* Badge */}
              <div style={{
                position: "absolute", top: "1.4rem", right: "1.4rem",
                fontFamily: "var(--font-display)", fontSize: "9.5px", fontWeight: 700,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color: "rgba(197,163,116,0.65)",
                background: "rgba(255,255,255,0.55)",
                border: "0.5px solid rgba(168,128,208,0.52)",
                borderRadius: "100px", padding: "4px 13px",
                backdropFilter: "blur(8px)",
              }}>01 / 04</div>
              {/* Vignette bas */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "52%",
                background: "linear-gradient(0deg, rgba(197,163,116,0.22) 0%, rgba(197,163,116,0.08) 50%, transparent 100%)",
                pointerEvents: "none",
              }} />
              {/* Texte */}
              <div style={{ position: "relative", zIndex: 2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.1rem" }}>
                  <div style={{ width: "36px", height: "1.5px", background: "linear-gradient(90deg, #C8A03C, rgba(197,163,116,0.18))", borderRadius: "2px" }} />
                  <span style={{ color: "#C5A374", fontSize: "11px", opacity: 0.78 }}>✦</span>
                  <div style={{ width: "36px", height: "1.5px", background: "linear-gradient(270deg, #C8A03C, rgba(197,163,116,0.18))", borderRadius: "2px" }} />
                </div>
                <h3 style={{
                  fontFamily: "var(--font-serif)", fontSize: "clamp(26px,3.2vw,40px)",
                  color: "#C5A374", marginBottom: "0.70rem", fontWeight: 600,
                  lineHeight: 1.10, letterSpacing: "-0.02em",
                  textShadow: "0 1px 12px rgba(255,255,255,0.70)",
                }}>
                  Structuration rigoureuse
                </h3>
                <div style={{ width: "40px", height: "2px", borderRadius: "2px", background: "linear-gradient(90deg, #D9BF9A, rgba(197,163,116,0.22))", marginBottom: "1rem" }} />
                <p style={{
                  fontFamily: "var(--font-sans)", fontWeight: 400, fontStyle: "italic",
                  fontSize: "14px", color: "rgba(140,106,67,0.65)", lineHeight: 1.80, maxWidth: "400px",
                }}>
                  Chaque document est pensé comme un tout cohérent — architecture de l'information, hiérarchie visuelle, logique de lecture.
                </p>
              </div>
            </div>

            {/* ══ 02 — Haut de gamme — OR, petite droite row 1 ══ */}
            <div
              className="bento-card bento-card-premium reveal delay-100 gentle-float-d1"
              style={{
                gridColumn: "span 5",
                background: "linear-gradient(145deg, #C5A374 0%, #D9BF9A 25%, #EFDBC3 50%, #F1E4D3 72%, #F4E9DD 88%, #F5EEE6 100%)",
                border: "1px solid rgba(255,255,255,0.48)",
                minHeight: "380px",
                display: "flex", flexDirection: "column", justifyContent: "flex-end",
                boxShadow: [
                  "0 2px 8px rgba(0,0,0,0.07)",
                  "0 10px 32px rgba(200,160,60,0.32)",
                  "0 32px 80px rgba(197,163,116,0.18)",
                  "0 70px 130px rgba(197,163,116,0.10)",
                  "inset 0 1.5px 0 rgba(255,255,255,0.75)",
                ].join(", "),
                overflow: "hidden",
              }}
            >
              {/* Lumière solaire top-left */}
              <div style={{
                position: "absolute", top: 0, left: 0, width: "72%", height: "65%",
                background: "radial-gradient(ellipse at 18% 14%, rgba(255,252,225,0.82) 0%, rgba(255,238,160,0.35) 45%, transparent 72%)",
                pointerEvents: "none",
              }} />
              {/* Halo bas-droite */}
              <div style={{
                position: "absolute", bottom: "-35px", right: "-35px",
                width: "200px", height: "200px", borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(197,163,116,0.28) 0%, rgba(232,200,100,0.10) 55%, transparent 80%)",
                filter: "blur(24px)", pointerEvents: "none",
              }} />
              {/* Anneau déco top-right */}
              <div style={{
                position: "absolute", top: "4%", right: "4%",
                width: "160px", height: "160px", borderRadius: "50%",
                border: "1px solid rgba(197,163,116,0.30)",
                pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", top: "10%", right: "10%",
                width: "90px", height: "90px", borderRadius: "50%",
                border: "0.5px solid rgba(197,163,116,0.42)",
                background: "radial-gradient(ellipse, rgba(197,163,116,0.10) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />
              {/* Sparkle */}
              <span style={{ position: "absolute", top: "22%", left: "58%", color: "rgba(200,160,60,0.68)", fontSize: "10px", pointerEvents: "none", animation: "sparkle-twinkle 4s ease-in-out infinite 1s" }}>✦</span>
              <span style={{ position: "absolute", top: "12%", right: "20%", color: "rgba(200,160,60,0.45)", fontSize: "7px", pointerEvents: "none", animation: "sparkle-twinkle 3.5s ease-in-out infinite 2.2s" }}>✦</span>
              {/* Badge */}
              <div style={{
                position: "absolute", top: "1.4rem", right: "1.4rem",
                fontFamily: "var(--font-display)", fontSize: "9.5px", fontWeight: 700,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color: "rgba(197,163,116,0.90)",
                background: "linear-gradient(135deg, rgba(255,255,255,0.50) 0%, rgba(255,248,200,0.35) 100%)",
                border: "0.5px solid rgba(197,163,116,0.40)",
                borderRadius: "100px", padding: "4px 13px",
                backdropFilter: "blur(8px)",
              }}>02 / 04</div>
              {/* Vignette bas */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
                background: "linear-gradient(0deg, rgba(170,120,20,0.20) 0%, rgba(197,163,116,0.08) 50%, transparent 100%)",
                pointerEvents: "none",
              }} />
              {/* Texte */}
              <div style={{ position: "relative", zIndex: 2 }}>
                <div style={{ width: "40px", height: "2px", borderRadius: "2px", background: "linear-gradient(90deg, rgba(197,163,116,0.90), rgba(197,163,116,0.22))", marginBottom: "1rem" }} />
                <h3 style={{
                  fontFamily: "var(--font-serif)", fontSize: "clamp(24px,3vw,36px)",
                  color: "#C5A374", marginBottom: "0.65rem", fontWeight: 600,
                  lineHeight: 1.10, letterSpacing: "-0.02em",
                  textShadow: "0 1px 12px rgba(255,248,200,0.75)",
                }}>
                  Haut de gamme
                </h3>
                <div style={{ width: "36px", height: "2px", borderRadius: "2px", background: "linear-gradient(90deg, rgba(197,163,116,0.80), rgba(197,163,116,0.18))", marginBottom: "0.85rem" }} />
                <p style={{
                  fontFamily: "var(--font-sans)", fontWeight: 400, fontStyle: "italic",
                  fontSize: "13px", color: "rgba(140,106,67,0.65)", lineHeight: 1.78,
                }}>
                  Une esthétique premium, moderne et cohérente avec votre identité.
                </p>
              </div>
            </div>

            {/* ══ 03 — Valorisation — BLANC / IVOIRE, petite gauche row 2 ══ */}
            <div
              className="bento-card bento-card-premium reveal delay-200 gentle-float-d2"
              style={{
                gridColumn: "span 5",
                background: "linear-gradient(145deg, #F6F0EC 0%, #F5EEE6 28%, #F4E9DD 55%, #F1E4D3 78%, #EFDBC3 100%)",
                border: "1px solid rgba(224,207,183,0.85)",
                boxShadow: [
                  "0 2px 6px rgba(0,0,0,0.05)",
                  "0 8px 28px rgba(200,160,60,0.12)",
                  "0 24px 60px rgba(197,163,116,0.10)",
                  "0 50px 90px rgba(0,0,0,0.04)",
                  "inset 0 1.5px 0 rgba(255,255,255,1)",
                ].join(", "),
                overflow: "hidden",
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "3.5px",
                background: "linear-gradient(90deg, transparent 0%, #D9BF9A 22%, #E0CFB7 55%, #D9BF9A 80%, transparent 100%)",
                pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", top: 0, left: 0, width: "70%", height: "60%",
                background: "radial-gradient(ellipse at 15% 14%, rgba(255,255,255,1) 0%, rgba(255,252,250,0.55) 45%, transparent 72%)",
                pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", bottom: "-25px", right: "-25px",
                width: "160px", height: "160px", borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(217,191,154,0.22) 0%, rgba(239,219,195,0.10) 55%, transparent 80%)",
                filter: "blur(18px)", pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", top: "1.3rem", right: "1.5rem",
                fontFamily: "var(--font-display)", fontSize: "9px", fontWeight: 700,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color: "rgba(197,163,116,0.28)",
              }}>03 / 04</div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
                <div style={{ width: "36px", height: "1.5px", borderRadius: "2px", background: "linear-gradient(90deg, #C8A03C, rgba(197,163,116,0.14))" }} />
                <span style={{ color: "#C5A374", fontSize: "13px", lineHeight: 1, opacity: 0.75 }}>✦</span>
                <div style={{ width: "36px", height: "1.5px", borderRadius: "2px", background: "linear-gradient(270deg, #C8A03C, rgba(197,163,116,0.14))" }} />
              </div>
              <h3 style={{
                fontFamily: "var(--font-serif)", fontSize: "clamp(22px,2.5vw,30px)",
                color: "#C5A374", marginBottom: "0.60rem", fontWeight: 600,
                letterSpacing: "-0.02em", lineHeight: 1.10,
                textShadow: "0 1px 8px rgba(255,255,255,0.62)",
              }}>
                Valorisation
              </h3>
              <div style={{ width: "30px", height: "2px", borderRadius: "2px", background: "linear-gradient(90deg, #C8A03C, rgba(197,163,116,0.18))", marginBottom: "0.85rem" }} />
              <p style={{
                fontFamily: "var(--font-sans)", fontWeight: 400, fontStyle: "italic",
                fontSize: "14px", color: "rgba(140,106,67,0.65)", lineHeight: 1.80,
              }}>
                Clarifiez vos idées.<br/>Sublimez votre image.
              </p>
            </div>

            {/* ══ 04 — Confidentialité — ROSE → OR, grande droite row 2 ══ */}
            <div
              className="bento-card bento-card-premium reveal delay-300 gentle-float-d3"
              style={{
                gridColumn: "span 7",
                background: "linear-gradient(135deg, #D9BF9A 0%, #C5A374 25%, #D9BF9A 50%, #EFDBC3 75%, #D9BF9A 100%)",
                border: "1px solid rgba(255,255,255,0.40)",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                boxShadow: [
                  "0 2px 8px rgba(0,0,0,0.08)",
                  "0 10px 32px rgba(197,163,116,0.22)",
                  "0 32px 80px rgba(197,163,116,0.18)",
                  "0 70px 130px rgba(197,163,116,0.10)",
                  "inset 0 1.5px 0 rgba(255,255,255,0.58)",
                ].join(", "),
                overflow: "hidden",
              }}
            >
              {/* Lumière violet top-left */}
              <div style={{
                position: "absolute", top: 0, left: 0, width: "55%", height: "60%",
                background: "radial-gradient(ellipse at 16% 16%, rgba(240,230,255,0.62) 0%, rgba(210,190,255,0.28) 45%, transparent 72%)",
                pointerEvents: "none",
              }} />
              {/* Halo or bas-droite */}
              <div style={{
                position: "absolute", bottom: "-30px", right: "-30px",
                width: "220px", height: "220px", borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(200,160,60,0.24) 0%, rgba(220,185,80,0.08) 55%, transparent 80%)",
                filter: "blur(26px)", pointerEvents: "none",
              }} />
              {/* Anneau droite */}
              <div style={{
                position: "absolute", right: "-45px", top: "50%", transform: "translateY(-50%)",
                width: "200px", height: "200px", borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.28)",
                pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", right: "-5px", top: "50%", transform: "translateY(-50%)",
                width: "115px", height: "115px", borderRadius: "50%",
                border: "0.5px solid rgba(255,255,255,0.38)",
                pointerEvents: "none",
              }} />

              {/* Haut : sparkle + badge NDA */}
              <div style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "rgba(255,255,255,0.70)", fontSize: "10px" }}>✦</span>
                  <div style={{ width: "1.5px", height: "38px", borderRadius: "2px", background: "linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.18) 100%)" }} />
                </div>
                <div style={{
                  fontFamily: "var(--font-display)", fontSize: "9.5px", fontWeight: 700,
                  letterSpacing: "0.20em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.85)",
                  background: "rgba(255,255,255,0.20)",
                  border: "0.5px solid rgba(255,255,255,0.40)",
                  borderRadius: "100px", padding: "5px 14px",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.30)",
                }}>NDA</div>
              </div>

              {/* Bas : texte */}
              <div style={{ position: "relative", zIndex: 2 }}>
                <h3 style={{
                  fontFamily: "var(--font-serif)", fontSize: "clamp(22px,2.6vw,34px)",
                  color: "#FFFFFF", marginBottom: "0.45rem", fontWeight: 600,
                  letterSpacing: "-0.02em", lineHeight: 1.15,
                  textShadow: "0 2px 18px rgba(100,50,10,0.28)",
                }}>
                  Confidentialité totale
                </h3>
                <div style={{ width: "32px", height: "2px", borderRadius: "2px", background: "linear-gradient(90deg, rgba(255,255,255,0.85), rgba(255,255,255,0.18))", marginBottom: "0.72rem" }} />
                <p style={{
                  fontFamily: "var(--font-sans)", fontWeight: 400, fontStyle: "italic",
                  fontSize: "13px", color: "rgba(255,255,255,0.80)", lineHeight: 1.72,
                }}>
                  Discrétion absolue sur tous vos projets.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ DIFFÉRENCE ═══ */}
      <section
        className="py-32 relative overflow-hidden"
        style={{
          background: "transparent",
        }}
      >
        <div className="orb orb-gold" style={{ width: 350, height: 350, bottom: "-80px", right: "-60px", opacity: 0.2 }} />

        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <div className="text-center mb-14 reveal">
            <span className="tag-pill mb-4 inline-flex">La différence MELIYA</span>
            <h2
              className="display mt-4"
              style={{ fontSize: "clamp(28px,4vw,44px)", color: "#C5A374", letterSpacing: "-0.01em" }}
            >
              Pas une simple assistante
            </h2>
            <p className="serif italic mt-3" style={{ fontSize: "18px", color: "rgba(140,106,67,0.75)" }}>
              Une spécialiste — la nuance qui fait toute la différence.
            </p>
          </div>

          <FlipCards />
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
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
              background: "linear-gradient(150deg, #C5A374 0%, #D9BF9A 30%, #EFDBC3 60%, #F1E4D3 80%, #F4E9DD 100%)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              border: "1px solid rgba(197,163,116,0.35)",
              boxShadow: [
                "0 1px 2px rgba(0,0,0,0.06)",
                "0 6px 24px rgba(197,163,116,0.22)",
                "0 24px 64px rgba(197,163,116,0.14)",
                "0 60px 100px rgba(197,163,116,0.10)",
                "inset 0 1px 0 rgba(255,255,255,0.35)",
                "inset 0 -1px 0 rgba(0,0,0,0.04)",
              ].join(", "),
              WebkitFontSmoothing: "antialiased",
            }}
          >
            {/* ── Halos atmosphériques ── */}
            <div style={{
              position: "absolute", top: "-45%", right: "-8%",
              width: "55%", height: "85%",
              background: "radial-gradient(ellipse at 65% 25%, rgba(217,191,154,0.22) 0%, rgba(217,191,154,0.14) 45%, transparent 70%)",
              filter: "blur(55px)", pointerEvents: "none", zIndex: 0,
            }} />
            <div style={{
              position: "absolute", bottom: "-35%", left: "-8%",
              width: "50%", height: "70%",
              background: "radial-gradient(ellipse at 30% 75%, rgba(239,219,195,0.20) 0%, rgba(217,191,154,0.14) 50%, transparent 75%)",
              filter: "blur(50px)", pointerEvents: "none", zIndex: 0,
            }} />
            {/* Reflet glossy haut */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "50%",
              background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
              borderRadius: "32px 32px 0 0", pointerEvents: "none", zIndex: 0,
            }} />
            {/* Bord lumineux bas */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
              pointerEvents: "none", zIndex: 0,
            }} />
            {/* Grain texture */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: "inherit",
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: "160px 160px",
              opacity: 0.032,
              mixBlendMode: "overlay",
              pointerEvents: "none", zIndex: 1,
            }} />
            {/* Inner vignette top */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "35%",
              background: "radial-gradient(ellipse at 30% 0%, rgba(255,255,255,0.18) 0%, transparent 70%)",
              pointerEvents: "none", zIndex: 1,
            }} />

            {/* Sparkles */}
            <span style={{ position: "absolute", top: "12%", left: "6%", color: "rgba(255,255,255,0.5)", fontSize: "11px", pointerEvents: "none", zIndex: 2, animation: "sparkle-rare 8s ease-in-out 0s infinite" }}>✦</span>
            <span style={{ position: "absolute", top: "16%", right: "7%", color: "rgba(255,255,255,0.35)", fontSize: "8px", pointerEvents: "none", zIndex: 2, animation: "sparkle-rare 12s ease-in-out 3.5s infinite" }}>✦</span>
            <span style={{ position: "absolute", bottom: "18%", left: "10%", color: "rgba(255,255,255,0.3)", fontSize: "9px", pointerEvents: "none", zIndex: 2, animation: "sparkle-rare 14s ease-in-out 6s infinite" }}>✦</span>
            <span style={{ position: "absolute", bottom: "14%", right: "9%", color: "rgba(255,255,255,0.42)", fontSize: "10px", pointerEvents: "none", zIndex: 2, animation: "sparkle-rare 10s ease-in-out 1.8s infinite" }}>✦</span>

            {/* ── Contenu ── */}
            <div style={{ position: "relative", zIndex: 3 }}>

              {/* Badge Prêt(e) */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                padding: "5px 18px", borderRadius: "100px",
                background: "rgba(255,255,255,0.18)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "0.5px solid rgba(255,255,255,0.5)",
                boxShadow: "0 1px 14px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.32)",
                marginBottom: "2.2rem",
                fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" as const,
                fontFamily: "var(--font-sans)", fontWeight: 500,
                color: "rgba(255,255,255,0.92)",
              }}>
                <span style={{ fontSize: "7px", opacity: 0.65 }}>✦</span>
                Prêt(e) ?
                <span style={{ fontSize: "7px", opacity: 0.65 }}>✦</span>
              </div>

              {/* Titre */}
              <h2 style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(36px,5.5vw,62px)",
                fontWeight: 600,
                color: "#FEFEFE",
                letterSpacing: "-0.018em",
                lineHeight: 1.1,
                marginBottom: "1.8rem",
                textShadow: "0 1px 0 rgba(255,255,255,0.07), 0 1px 4px rgba(0,0,0,0.05)",
              }}>
                Donnons vie à vos documents.
              </h2>

              {/* Sous-titre */}
              <p style={{
                fontFamily: "var(--font-sans)",
                fontStyle: "italic",
                fontSize: "clamp(14px,1.6vw,16px)",
                fontWeight: 400,
                color: "rgba(255,255,255,0.88)",
                letterSpacing: "0.015em",
                lineHeight: 1.72,
                marginBottom: "3.5rem",
                maxWidth: "400px",
                marginLeft: "auto",
                marginRight: "auto",
              }}>
                Un échange de 20 minutes suffit pour tout définir.
              </p>

              {/* Boutons */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center", alignItems: "center" }}>

                {/* Bouton principal */}
                <OrnamentWrap style={{ margin: "0 4px" }}>
                  <Link
                    to="/contact"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "9px",
                      padding: "15px 38px", borderRadius: "100px",
                      background: "linear-gradient(135deg, #F6E6B8 0%, #C5A374 100%)",
                      color: "#3A2614",
                      fontFamily: "var(--font-display)", fontSize: "11.5px",
                      letterSpacing: "0.1em", fontWeight: 700, textTransform: "uppercase" as const,
                      textDecoration: "none",
                      border: "1px solid #C5A374",
                      boxShadow: "0 8px 25px rgba(216,180,166,0.10), inset 0 0.5px 0 rgba(255,255,255,0.55)",
                      transition: "all 0.55s cubic-bezier(0.22,1,0.36,1)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(-1px) scale(1.015)";
                      el.style.background = "linear-gradient(135deg, #D8B4A6, #B8915E)";
                      el.style.color = "#FFFFFF";
                      el.style.borderColor = "#B8915E";
                      el.style.boxShadow = "0 12px 35px rgba(184,145,94,0.22)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(0) scale(1)";
                      el.style.background = "linear-gradient(135deg, #F6E6B8 0%, #C5A374 100%)";
                      el.style.color = "#3A2614";
                      el.style.borderColor = "#C5A374";
                      el.style.boxShadow = "0 8px 25px rgba(216,180,166,0.10), inset 0 0.5px 0 rgba(255,255,255,0.55)";
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
                      display: "inline-flex", alignItems: "center", gap: "8px",
                      padding: "15px 30px", borderRadius: "100px",
                      background: "rgba(246,240,236,0.75)",
                      color: "#8C6A43",
                      fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 700,
                      textDecoration: "none",
                      border: "1px solid #E0CFB7",
                      boxShadow: "0 8px 25px rgba(216,180,166,0.10), inset 0 0.5px 0 rgba(255,255,255,0.55)",
                      transition: "all 0.55s cubic-bezier(0.22,1,0.36,1)",
                      letterSpacing: "0.10em",
                      textTransform: "uppercase" as const,
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(-1px) scale(1.012)";
                      el.style.background = "linear-gradient(135deg, #D8B4A6, #B8915E)";
                      el.style.color = "#FFFFFF";
                      el.style.borderColor = "#B8915E";
                      el.style.boxShadow = "0 12px 35px rgba(184,145,94,0.22)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(0) scale(1)";
                      el.style.background = "rgba(246,240,236,0.75)";
                      el.style.color = "#8C6A43";
                      el.style.borderColor = "#E0CFB7";
                      el.style.boxShadow = "0 8px 25px rgba(216,180,166,0.10), inset 0 0.5px 0 rgba(255,255,255,0.55)";
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
    </>
  );
}
