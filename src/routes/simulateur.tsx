import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useRef } from "react";
import { Sparkles, Calculator, Check } from "lucide-react";

export const Route = createFileRoute("/simulateur")({
  head: () => ({
    meta: [
      { title: "Simulateur de prestations — MELIYA" },
      { name: "description", content: "Estimez le coût de votre projet en quelques clics. Tarifs dégressifs intégrés." },
    ],
  }),
  component: Simulateur,
});

/* ─── Count-up animation hook ────────────────────────────────────────────── */
function useAnimatedNumber(target: number | null, duration = 380) {
  const [displayed, setDisplayed] = useState(target ?? 0);
  const prevRef = useRef(target ?? 0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (target === null) { setDisplayed(0); prevRef.current = 0; return; }
    const start = prevRef.current;
    const end = target;
    if (start === end) return;

    cancelAnimationFrame(rafRef.current);
    const t0 = performance.now();

    const animate = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setDisplayed(Math.round(start + (end - start) * eased));
      if (p < 1) rafRef.current = requestAnimationFrame(animate);
      else prevRef.current = end;
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return displayed;
}

/* ─── Discount rule pill ─────────────────────────────────────────────────── */
function DiscountPill({
  range,
  badge,
  isGreen,
}: {
  range: string;
  badge: string;
  isGreen?: boolean;
}) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "0",
      borderRadius: "14px",
      overflow: "hidden",
      border: isGreen
        ? "0.5px solid rgba(197,163,116,0.45)"
        : "0.5px solid rgba(197,163,116,0.18)",
      boxShadow: isGreen
        ? "0 2px 10px rgba(197,163,116,0.14), inset 0 1px 0 rgba(255,255,255,0.6)"
        : "0 2px 8px rgba(197,163,116,0.08), inset 0 1px 0 rgba(255,255,255,0.5)",
    }}>
      {/* Range label */}
      <span style={{
        padding: "7px 13px",
        fontSize: "12px", fontFamily: "var(--font-sans)",
        color: isGreen ? "#B8915E" : "#8C6A43",
        opacity: 0.88,
        background: isGreen
          ? "rgba(197,163,116,0.18)"
          : "rgba(197,163,116,0.06)",
        borderRight: isGreen
          ? "0.5px solid rgba(197,163,116,0.35)"
          : "0.5px solid rgba(197,163,116,0.12)",
        lineHeight: 1,
      }}>
        {range}
      </span>
      {/* Badge */}
      <span style={{
        padding: "7px 13px",
        fontSize: "12px", fontFamily: "var(--font-display)",
        fontWeight: 700, letterSpacing: "0.05em",
        color: isGreen ? "#B8915E" : "#8C6A43",
        background: isGreen
          ? "rgba(197,163,116,0.28)"
          : "rgba(197,163,116,0.10)",
        lineHeight: 1,
        whiteSpace: "nowrap" as const,
      }}>
        {badge}
      </span>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */
function Simulateur() {
  const [slides, setSlides] = useState(10);
  const [pages, setPages] = useState(0);
  const [pack, setPack] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const glowTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const surDevis = slides >= 30 || pages >= 30;

  const total = useMemo(() => {
    if (surDevis) return null;
    const calc = (qty: number, unit: number) => {
      if (qty <= 0) return 0;
      const base = qty * unit;
      if (qty >= 20) return base * 0.85;
      if (qty >= 10) return base * 0.90;
      return base;
    };
    return calc(slides, 30) + calc(pages, 25) + (pack ? 579 : 0);
  }, [slides, pages, pack, surDevis]);

  const discountLabel = useMemo(() => {
    if (surDevis) return null;
    if (slides >= 20 || pages >= 20) return "−15 %";
    if (slides >= 10 || pages >= 10) return "−10 %";
    return null;
  }, [slides, pages, surDevis]);

  const animatedTotal = useAnimatedNumber(total);

  // Micro-glow on total change
  useEffect(() => {
    if (total === null) return;
    setIsGlowing(true);
    clearTimeout(glowTimer.current);
    glowTimer.current = setTimeout(() => setIsGlowing(false), 420);
    return () => clearTimeout(glowTimer.current);
  }, [total]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[color:var(--gold)]">
          <Sparkles className="h-3.5 w-3.5" /> Simulateur
        </span>
        <h1 className="display text-4xl md:text-5xl mt-3 text-[#8C6A43]">
          Estimez votre projet
        </h1>
        <div className="gold-divider mt-4 max-w-xs mx-auto" />
        <p className="serif italic text-xl text-[#8C6A43] mt-6 max-w-2xl mx-auto opacity-80">
          Une estimation instantanée — un devis personnalisé sous 24h.
        </p>
      </div>

      {/* ── Info block — remises volume ─────────────────────────────────────── */}
      <div style={{
        maxWidth: "620px",
        margin: "0 auto 2.75rem",
        background: "rgba(255,252,245,0.80)",
        border: "0.5px solid rgba(212,168,67,0.3)",
        borderRadius: "20px",
        padding: "22px 28px 20px",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow:
          "0 4px 28px rgba(212,168,67,0.07), 0 1px 4px rgba(212,168,67,0.04), inset 0 1px 0 rgba(255,255,255,0.92)",
        animation: "modal-fade-in 0.55s ease both",
        textAlign: "center" as const,
      }}>
        {/* Eyebrow — centré */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "7px",
          marginBottom: "16px",
        }}>
          <Sparkles size={11} style={{ color: "#C5A374", flexShrink: 0 }} />
          <span style={{
            fontSize: "10px",
            fontFamily: "var(--font-display)",
            letterSpacing: "0.18em",
            color: "#C5A374",
            textTransform: "uppercase" as const,
            fontWeight: 600,
          }}>
            Remises volume appliquées automatiquement
          </span>
          <Sparkles size={11} style={{ color: "#C5A374", flexShrink: 0 }} />
        </div>

        {/* Pills — centrées */}
        <div style={{
          display: "flex", flexWrap: "wrap" as const,
          gap: "10px", justifyContent: "center", alignItems: "center",
        }}>
          <DiscountPill range="10 – 19 slides / pages" badge="−10 %" isGreen />
          <DiscountPill range="20 – 29 slides / pages" badge="−15 %" isGreen />
          <DiscountPill range="30 et +" badge="Sur devis" />
        </div>
      </div>

      {/* ── 2-col grid ─────────────────────────────────────────────────────── */}
      <div className="grid md:grid-cols-[1fr_360px] gap-8">

        {/* Left — controls */}
        <div className="space-y-5">

          {/* Slides */}
          <div style={{
            borderRadius: "18px",
            border: "0.5px solid rgba(212,168,67,0.25)",
            padding: "1.25rem 1.4rem",
            background: "rgba(255,255,255,0.82)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0 2px 16px rgba(197,163,116,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
              marginBottom: "0.85rem",
            }}>
              <div>
                <label style={{
                  display: "block",
                  fontFamily: "var(--font-display)", fontSize: "11px",
                  textTransform: "uppercase" as const, letterSpacing: "0.12em",
                  color: "#8C6A43", fontWeight: 600,
                  marginBottom: "3px",
                }}>
                  Slides sur mesure
                </label>
                <span style={{
                  fontSize: "11px", fontFamily: "var(--font-sans)",
                  color: "#8C6A43", opacity: 0.7,
                  letterSpacing: "0.01em",
                }}>
                  Présentations · pitchs · formations
                </span>
              </div>
              <span style={{
                fontSize: "13px", fontFamily: "var(--font-display)",
                color: "#C5A374", fontWeight: 700, flexShrink: 0, marginLeft: "12px",
              }}>
                30 € / u
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <input
                type="range" min={0} max={60} value={slides}
                onChange={(e) => setSlides(+e.target.value)}
                style={{ flex: 1, accentColor: "#D4B896", height: "4px" }}
              />
              <input
                type="number" min={0} value={slides}
                onChange={(e) => setSlides(+e.target.value)}
                style={{
                  width: "68px", padding: "7px 10px",
                  borderRadius: "12px",
                  border: "0.5px solid rgba(212,168,67,0.35)",
                  background: "white",
                  textAlign: "center" as const,
                  fontFamily: "var(--font-display)", fontSize: "14px",
                  color: "#8C6A43", outline: "none",
                  boxShadow: "inset 0 1px 3px rgba(197,163,116,0.06)",
                }}
              />
            </div>
          </div>

          {/* Pages */}
          <div style={{
            borderRadius: "18px",
            border: "0.5px solid rgba(212,168,67,0.25)",
            padding: "1.25rem 1.4rem",
            background: "rgba(255,255,255,0.82)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0 2px 16px rgba(197,163,116,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
              marginBottom: "0.85rem",
            }}>
              <div>
                <label style={{
                  display: "block",
                  fontFamily: "var(--font-display)", fontSize: "11px",
                  textTransform: "uppercase" as const, letterSpacing: "0.12em",
                  color: "#8C6A43", fontWeight: 600,
                  marginBottom: "3px",
                }}>
                  Pages sur mesure
                </label>
                <span style={{
                  fontSize: "11px", fontFamily: "var(--font-sans)",
                  color: "#8C6A43", opacity: 0.7,
                  letterSpacing: "0.01em",
                }}>
                  Rapports · ebooks · dossiers · livrets
                </span>
              </div>
              <span style={{
                fontSize: "13px", fontFamily: "var(--font-display)",
                color: "#C5A374", fontWeight: 700, flexShrink: 0, marginLeft: "12px",
              }}>
                25 € / u
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <input
                type="range" min={0} max={60} value={pages}
                onChange={(e) => setPages(+e.target.value)}
                style={{ flex: 1, accentColor: "#D4B896", height: "4px" }}
              />
              <input
                type="number" min={0} value={pages}
                onChange={(e) => setPages(+e.target.value)}
                style={{
                  width: "68px", padding: "7px 10px",
                  borderRadius: "12px",
                  border: "0.5px solid rgba(212,168,67,0.35)",
                  background: "white",
                  textAlign: "center" as const,
                  fontFamily: "var(--font-display)", fontSize: "14px",
                  color: "#8C6A43", outline: "none",
                  boxShadow: "inset 0 1px 3px rgba(197,163,116,0.06)",
                }}
              />
            </div>
          </div>

          {/* Pack */}
          <label style={{
            display: "flex", alignItems: "flex-start", gap: "14px",
            borderRadius: "18px",
            border: pack ? "0.5px solid rgba(212,168,67,0.6)" : "0.5px solid rgba(212,168,67,0.25)",
            padding: "1.25rem 1.4rem",
            background: pack ? "rgba(237,216,176,0.14)" : "rgba(255,255,255,0.82)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            cursor: "pointer",
            transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
            boxShadow: pack
              ? "0 4px 20px rgba(212,168,67,0.12), inset 0 1px 0 rgba(255,255,255,0.9)"
              : "0 2px 16px rgba(197,163,116,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
          }}>
            <input
              type="checkbox" checked={pack}
              onChange={(e) => setPack(e.target.checked)}
              style={{ marginTop: "3px", width: "18px", height: "18px", accentColor: "#D4B896", cursor: "pointer", flexShrink: 0 }}
            />
            <div>
              <div style={{
                fontFamily: "var(--font-display)", fontSize: "14px",
                color: "#8C6A43", fontWeight: 700, letterSpacing: "0.02em",
                marginBottom: "4px",
              }}>
                Pack Up identité
                <span style={{
                  marginLeft: "10px",
                  fontSize: "13px", color: "#C5A374", fontWeight: 700,
                }}>579 €</span>
              </div>
              <div style={{
                fontSize: "12px", color: "#8C6A43", opacity: 0.6,
                lineHeight: 1.55, fontFamily: "var(--font-sans)",
              }}>
                Logo · Palette couleurs · Mini charte · Modèles · 100 cartes de visite
              </div>
            </div>
          </label>
        </div>

        {/* Right — result card */}
        <div style={{
          borderRadius: "20px",
          background: "linear-gradient(150deg, #C5A374 0%, #D9BF9A 40%, #EFDBC3 100%)",
          border: "0.5px solid rgba(197,163,116,0.42)",
          boxShadow: "0 12px 48px rgba(197,163,116,0.28), 0 2px 8px rgba(197,163,116,0.16), inset 0 1px 0 rgba(255,255,255,0.45)",
          padding: "1.75rem",
          height: "fit-content",
          position: "sticky" as const,
          top: "7rem",
          color: "#FAFAFA",
        }}>
          {/* Icon + label */}
          <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "0.5rem" }}>
            <Calculator size={18} style={{ color: "#3A2614" }} />
            <span style={{
              fontSize: "10px", textTransform: "uppercase" as const,
              letterSpacing: "0.22em", opacity: 0.75,
              fontFamily: "var(--font-display)",
            }}>
              Estimation totale
            </span>
          </div>

          {/* Total */}
          {surDevis ? (
            <div style={{ margin: "0.5rem 0 0.35rem" }}>
              <div style={{
                fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,36px)",
                fontWeight: 700, color: "#3A2614", lineHeight: 1.1,
              }}>
                Sur devis
              </div>
              <p style={{
                fontSize: "12px", marginTop: "7px",
                color: "rgba(255,255,255,0.72)", fontStyle: "italic",
                fontFamily: "var(--font-sans)", lineHeight: 1.55,
              }}>
                30 éléments et + — contactez-moi pour un devis personnalisé.
              </p>
            </div>
          ) : (
            <div style={{ margin: "0.5rem 0 0.35rem" }}>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px,5vw,52px)",
                fontWeight: 700,
                color: "#3A2614",
                lineHeight: 1,
                transition: "text-shadow 0.42s ease",
                textShadow: isGlowing
                  ? "0 0 28px rgba(58,38,20,0.30), 0 0 8px rgba(58,38,20,0.15)"
                  : "none",
                WebkitFontSmoothing: "antialiased",
              }}>
                {animatedTotal} €
              </div>

              {/* Discount badge */}
              {discountLabel && (
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "5px",
                  marginTop: "10px",
                  background: "linear-gradient(90deg, rgba(197,163,116,0.22), rgba(255,255,255,0.25))",
                  border: "0.5px solid rgba(255,255,255,0.45)",
                  backdropFilter: "blur(6px)",
                  color: "#3A2614",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "11px",
                  letterSpacing: "0.06em",
                  borderRadius: "100px",
                  padding: "4px 13px",
                  animation: "modal-fade-in 0.35s cubic-bezier(0.22,1,0.36,1) both",
                  boxShadow: "0 2px 10px rgba(197,163,116,0.12)",
                }}>
                  <Check size={10} style={{ flexShrink: 0 }} />
                  Remise {discountLabel} appliquée
                </div>
              )}

              {total === 0 && !pack && (
                <p style={{
                  fontSize: "12px", color: "rgba(255,255,255,0.55)",
                  fontStyle: "italic", marginTop: "6px",
                }}>
                  Configurez votre projet…
                </p>
              )}
            </div>
          )}

          {/* Divider */}
          <div style={{
            height: "0.5px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
            margin: "1.25rem 0",
          }} />

          {/* Detail lines */}
          <ul style={{
            listStyle: "none", padding: 0, margin: 0,
            display: "flex", flexDirection: "column", gap: "5px",
          }}>
            {slides > 0 && (
              <li style={{ fontSize: "13px", opacity: 0.85, fontFamily: "var(--font-sans)" }}>
                {slides} slide{slides > 1 ? "s" : ""} × 30€
                {slides >= 20 ? " (−15 %)" : slides >= 10 ? " (−10 %)" : ""}
              </li>
            )}
            {pages > 0 && (
              <li style={{ fontSize: "13px", opacity: 0.85, fontFamily: "var(--font-sans)" }}>
                {pages} page{pages > 1 ? "s" : ""} × 25 €
                {pages >= 20 ? " (−15 %)" : pages >= 10 ? " (−10 %)" : ""}
              </li>
            )}
            {pack && (
              <li style={{ fontSize: "13px", opacity: 0.85, fontFamily: "var(--font-sans)" }}>
                Pack Up identité — 579€
              </li>
            )}
            {!surDevis && total === 0 && !pack && (
              <li style={{ fontSize: "12px", opacity: 0.5, fontStyle: "italic", fontFamily: "var(--font-sans)" }}>
                Configurez votre projet…
              </li>
            )}
          </ul>

          {/* CTA */}
          <Link
            to="/contact"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: "100%", marginTop: "1.4rem",
              padding: "13px 20px", borderRadius: "100px",
              background: "rgba(246,240,236,0.75)",
              backdropFilter: "blur(8px)",
              color: "#8C6A43", textDecoration: "none",
              fontFamily: "var(--font-display)", fontSize: "11px",
              letterSpacing: "0.12em", fontWeight: 700, textTransform: "uppercase",
              border: "1px solid #E0CFB7",
              transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
              boxShadow: "0 8px 25px rgba(216,180,166,0.10)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "linear-gradient(135deg, #D8B4A6, #B8915E)";
              el.style.color = "#FFFFFF";
              el.style.borderColor = "#B8915E";
              el.style.transform = "translateY(-1px)";
              el.style.boxShadow = "0 12px 35px rgba(184,145,94,0.22)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(246,240,236,0.75)";
              el.style.color = "#8C6A43";
              el.style.borderColor = "#E0CFB7";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "0 8px 25px rgba(216,180,166,0.10)";
            }}
          >
            Demander mon devis
          </Link>

          {/* Reassurance */}
          <p style={{
            textAlign: "center",
            fontSize: "10px",
            color: "rgba(58,38,20,0.55)",
            marginTop: "10px",
            fontFamily: "var(--font-sans)",
            letterSpacing: "0.02em",
            lineHeight: 1.6,
          }}>
            Tarification transparente · Sans surprise · Devis validé avant lancement
          </p>

          <p style={{
            textAlign: "center",
            fontSize: "9.5px",
            color: "rgba(255,255,255,0.38)",
            marginTop: "5px",
            fontStyle: "italic",
            fontFamily: "var(--font-sans)",
          }}>
            Estimation indicative — devis personnalisé envoyé sous 24h.
          </p>
        </div>
      </div>
    </div>
  );
}
