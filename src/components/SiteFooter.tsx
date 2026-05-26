import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const navLinks = [
  { to: "/prestations", label: "Prestations & Tarifs" },
  { to: "/a-propos", label: "À Propos" },
  { to: "/simulateur", label: "Simulateur" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

const legalLinks = [
  { to: "/mentions-legales", hash: "mentions",        label: "Mentions légales" },
  { to: "/mentions-legales", hash: "confidentialite", label: "Confidentialité" },
  { to: "/mentions-legales", hash: "cgv",             label: "CGV" },
  { to: "/mentions-legales", hash: "cookies",         label: "Politique cookies" },
];

export function SiteFooter() {
  return (
    <footer
      style={{
        position: "relative",
        background: "linear-gradient(160deg, #F1E4D3 0%, #EFDBC3 40%, #F1E4D3 70%, #F4E9DD 100%)",
        color: "#D9BF9A",
        overflow: "hidden",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* ── Halos atmosphériques ── */}
      <div style={{
        position: "absolute", top: "-40%", right: "-8%",
        width: "48%", height: "90%",
        background: "radial-gradient(ellipse at 65% 25%, rgba(217,191,154,0.18) 0%, transparent 68%)",
        filter: "blur(65px)", pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "absolute", bottom: "-25%", left: "-5%",
        width: "38%", height: "65%",
        background: "radial-gradient(ellipse at 25% 75%, rgba(197,163,116,0.12) 0%, transparent 68%)",
        filter: "blur(55px)", pointerEvents: "none", zIndex: 0,
      }} />

      {/* ── Ligne top ── */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent 0%, rgba(197,163,116,0.35) 20%, rgba(197,163,116,0.55) 50%, rgba(197,163,116,0.35) 80%, transparent 100%)",
      }} />

      {/* ── Main content ── */}
      <div style={{ padding: "4.5rem 1.5rem 4rem", position: "relative", zIndex: 1 }}>
        <div className="max-w-7xl mx-auto">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "clamp(2rem, 4vw, 5rem)",
              alignItems: "start",
            }}
          >

            {/* ── Colonne 1 : Brand ── */}
            <div>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(20px,2.2vw,26px)",
                color: "#C5A374",
                letterSpacing: "0.1em",
                lineHeight: 1,
                marginBottom: "1.1rem",
                fontWeight: 600,
              }}>
                MELIYA
              </h3>
              <p style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(13px,1.3vw,15px)",
                color: "rgba(197,163,116,0.65)",
                lineHeight: 1.68,
                letterSpacing: "0.01em",
                marginBottom: "1.6rem",
              }}>
                L'élégance au service de vos supports professionnels.
              </p>
              <div style={{
                height: "1px", width: "42px",
                background: "linear-gradient(90deg, rgba(197,163,116,0.65), transparent)",
              }} />
            </div>

            {/* ── Colonne 2 : Navigation ── */}
            <div>
              <h4 style={{
                fontFamily: "var(--font-sans)",
                fontSize: "9px",
                letterSpacing: "0.3em",
                textTransform: "uppercase" as const,
                color: "rgba(197,163,116,0.70)",
                marginBottom: "1.6rem",
                fontWeight: 500,
              }}>
                Navigation
              </h4>
              <ul style={{ display: "flex", flexDirection: "column", gap: "13px", listStyle: "none", padding: 0, margin: 0 }}>
                {navLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      style={{
                        fontSize: "13px",
                        color: "rgba(197,163,116,0.65)",
                        textDecoration: "none",
                        fontFamily: "var(--font-sans)",
                        fontWeight: 400,
                        letterSpacing: "0.008em",
                        transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
                        display: "inline-block",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.color = "#C5A374";
                        el.style.transform = "translateX(5px)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.color = "rgba(197,163,116,0.65)";
                        el.style.transform = "translateX(0)";
                      }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Colonne 3 : Contact + CTA ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2.2rem" }}>
              <div>
                <h4 style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "9px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase" as const,
                  color: "rgba(197,163,116,0.70)",
                  marginBottom: "1.6rem",
                  fontWeight: 500,
                }}>
                  Contact
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                  <p style={{
                    fontSize: "13px", color: "#C5A374",
                    fontFamily: "var(--font-sans)", fontWeight: 500, lineHeight: 1.5,
                  }}>
                    Mélody Roche
                  </p>
                  <p style={{
                    fontSize: "12.5px", color: "rgba(197,163,116,0.55)",
                    fontFamily: "var(--font-sans)", fontStyle: "italic",
                    lineHeight: 1.65, marginTop: "2px",
                  }}>
                    Assistante digitale spécialisée<br />
                    100% à distance — France
                  </p>
                </div>
              </div>

              {/* CTA */}
              <Link
                to="/contact"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "11px 20px", borderRadius: "100px",
                  background: "linear-gradient(135deg, #C5A374 0%, #D9BF9A 55%, #EFDBC3 100%)",
                  color: "#F6F0EC",
                  fontFamily: "var(--font-display)", fontSize: "10px",
                  letterSpacing: "0.13em", fontWeight: 700,
                  textTransform: "uppercase" as const,
                  textDecoration: "none",
                  border: "none",
                  boxShadow: [
                    "0 1px 3px rgba(0,0,0,0.04)",
                    "0 4px 16px rgba(197,163,116,0.28)",
                    "0 12px 32px rgba(197,163,116,0.16)",
                    "inset 0 1px 0 rgba(255,255,255,0.45)",
                  ].join(", "),
                  transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)",
                  whiteSpace: "nowrap",
                  alignSelf: "flex-start",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-2px) scale(1.02)";
                  el.style.boxShadow = [
                    "0 2px 6px rgba(0,0,0,0.06)",
                    "0 8px 28px rgba(197,163,116,0.38)",
                    "0 20px 44px rgba(197,163,116,0.20)",
                    "inset 0 1px 0 rgba(255,255,255,0.45)",
                  ].join(", ");
                  el.style.background = "linear-gradient(135deg, #D9BF9A 0%, #C5A374 55%, #D9BF9A 100%)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0) scale(1)";
                  el.style.boxShadow = [
                    "0 1px 3px rgba(0,0,0,0.04)",
                    "0 4px 16px rgba(197,163,116,0.28)",
                    "0 12px 32px rgba(197,163,116,0.16)",
                    "inset 0 1px 0 rgba(255,255,255,0.45)",
                  ].join(", ");
                  el.style.background = "linear-gradient(135deg, #C5A374 0%, #D9BF9A 55%, #EFDBC3 100%)";
                }}
              >
                Démarrer un projet <ArrowRight size={11} />
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* ── Séparateur ── */}
      <div style={{ padding: "0 1.5rem" }}>
        <div style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(197,163,116,0.30) 20%, rgba(197,163,116,0.45) 50%, rgba(197,163,116,0.30) 80%, transparent 100%)",
        }} />
      </div>

      {/* ── Bottom ── */}
      <div style={{ padding: "1.5rem 1.5rem", position: "relative", zIndex: 1 }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p style={{
            fontSize: "10.5px",
            color: "rgba(197,163,116,0.45)",
            fontFamily: "var(--font-sans)",
            letterSpacing: "0.025em",
          }}>
            © {new Date().getFullYear()} MELIYA — Tous droits réservés
          </p>
          <div style={{ display: "flex", gap: "18px", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
            {legalLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                hash={l.hash}
                style={{
                  fontSize: "10.5px",
                  color: "rgba(197,163,116,0.45)",
                  textDecoration: "none",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "0.025em",
                  transition: "color 0.4s cubic-bezier(0.22,1,0.36,1)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(197,163,116,0.85)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(197,163,116,0.45)"; }}
              >
                {l.label}
              </Link>
            ))}

            <span style={{ color: "rgba(197,163,116,0.25)", fontSize: "10px" }}>|</span>

            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("meliya:show-cookie-banner"))}
              style={{
                background: "none", border: "none", cursor: "pointer", padding: 0,
                fontSize: "10.5px", color: "rgba(197,163,116,0.45)",
                fontFamily: "var(--font-sans)", letterSpacing: "0.025em",
                transition: "color 0.4s cubic-bezier(0.22,1,0.36,1)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(197,163,116,0.85)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(197,163,116,0.45)"; }}
            >
              🍪 Gérer mes cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
