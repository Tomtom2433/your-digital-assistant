import { Link, useRouterState } from "@tanstack/react-router";
import { MoreVertical, X, ArrowRight } from "lucide-react";
import { useState, useEffect, lazy, Suspense } from "react";

const SimulateurModal = lazy(() =>
  import("@/components/SimulateurModal").then((m) => ({ default: m.SimulateurModal })),
);

/* ─── Charte MELIYA ────────────────────────────────────────────
 Champagne Gold #C8847C CTA / contours premium
 Rose Gold #E6B4AE Accueil actif + accents
 Taupe Luxe #5E5248 Textes nav
 Ivoire Premium #F7F2EE Fond
─────────────────────────────────────────────────────────────── */

const navItems = [
  { to: "/a-propos", label: "Qui est Méliya" },
  { to: "/prestations", label: "Mes prestations" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [simulOpen, setSimulOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const isHome = currentPath === "/";

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > lastY && y > 80) setHidden(true);
      else setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    setIsDark(html.classList.contains("dark"));
    const obs = new MutationObserver(() => setIsDark(html.classList.contains("dark")));
    obs.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const navBg = scrolled
    ? isDark
      ? "rgba(26, 22, 16, 0.82)"
      : "rgba(247, 242, 238, 0.88)"
    : "transparent";
  const navBackdrop = scrolled ? "blur(24px) saturate(1.05)" : "none";
  const navBorderBot = scrolled ? "0.5px solid rgba(200,132,124,0.18)" : "none";
  const navShadow = scrolled
    ? isDark
      ? "0 2px 32px rgba(0,0,0,0.45)"
      : "0 2px 24px rgba(200,132,124,0.08)"
    : "none";

  /* ── CTA : pill contour fin Champagne Gold → fond Rose Gold/Champagne au hover ── */
  const ctaBorder = ctaHovered ? "1px solid #E6B4AE" : "1px solid #C8847C";
  const ctaBg = ctaHovered
    ? "linear-gradient(135deg, rgba(230,180,174,0.14), rgba(200,132,124,0.10))"
    : "transparent";
  const ctaColor = ctaHovered ? "#E6B4AE" : "#C8847C";
  const ctaShadow = ctaHovered
    ? "0 10px 28px rgba(230,180,174,0.25), 0 3px 10px rgba(200,132,124,0.14)"
    : "0 4px 14px rgba(200,132,124,0.10)";

  return (
    <header
      className="z-50"
      style={{
        position: "sticky",
        top: 0,
        overflow: "visible",
        transition: [
          "transform 0.50s cubic-bezier(0.16,1,0.3,1)",
          "opacity 0.45s cubic-bezier(0.16,1,0.3,1)",
          "background 0.65s cubic-bezier(0.16,1,0.3,1)",
          "border-color 0.65s cubic-bezier(0.16,1,0.3,1)",
          "box-shadow 0.65s cubic-bezier(0.16,1,0.3,1)",
          "backdrop-filter 0.65s ease",
        ].join(", "),
        transform: hidden ? "translateY(-110%)" : "translateY(0)",
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
        background: navBg,
        backdropFilter: navBackdrop,
        WebkitBackdropFilter: navBackdrop,
        borderBottom: navBorderBot,
        boxShadow: navShadow,
      }}
    >
      <div
        className="max-w-[1480px] mx-auto px-6 sm:px-10"
        style={{
          minHeight: "84px",
          display: "flex",
          alignItems: "center",
          gap: "0",
          overflow: "visible",
        }}
      >
        {/* ─── GAUCHE : ACCUEIL (Rose Gold + ornement ✦ actif) ─── */}
        <Link
          to="/"
          style={{
            position: "relative",
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "7px",
            padding: "10px 6px 8px",
            color: isHome ? "#E6B4AE" : "#5E5248",
            fontFamily: "var(--font-display)",
            fontSize: "14px",
            letterSpacing: "0.26em",
            fontWeight: 600,
            textTransform: "uppercase",
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "color 0.50s cubic-bezier(0.22,1,0.36,1)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#E6B4AE";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = isHome ? "#E6B4AE" : "#5E5248";
          }}
        >
          Accueil
          {/* Ornement ✦ visible uniquement sur la home (actif) */}
          {isHome && (
            <span
              aria-hidden
              style={{
                fontSize: "11px",
                color: "#E6B4AE",
                letterSpacing: "0",
                lineHeight: 1,
                transform: "translateY(-2px)",
              }}
            >
              ✦
            </span>
          )}
        </Link>

        {/* ─── CENTRE : nav desktop ─── */}
        <nav
          className="hidden md:flex items-center flex-1 justify-center"
          style={{ gap: "clamp(24px, 3.5vw, 64px)" }}
        >
          {navItems.map((item) => {
            const isActive = currentPath === item.to || currentPath.startsWith(item.to + "/");
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`nav-link-premium${isActive ? " nav-active" : ""}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "10px 4px",
                  fontSize: "11.5px",
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  color: "#5E5248",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* ─── DROITE : CTA + ThemeToggle vertical ─── */}
        <div className="hidden md:flex items-center gap-5 shrink-0">
          <button
            type="button"
            onClick={() => setSimulOpen(true)}
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
            className="btn-simulateur"
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "13px 28px",
              borderRadius: "100px",
              background: ctaBg,
              color: ctaColor,
              fontSize: "11px",
              fontFamily: "var(--font-display)",
              letterSpacing: "0.22em",
              fontWeight: 600,
              textTransform: "uppercase",
              border: ctaBorder,
              outline: "none",
              cursor: "pointer",
              boxShadow: ctaShadow,
              transform: ctaHovered ? "translateY(-2px)" : "translateY(0)",
              transition: [
                "transform 0.45s cubic-bezier(0.16,1,0.3,1)",
                "background 0.50s ease",
                "color 0.50s ease",
                "border-color 0.50s ease",
                "box-shadow 0.50s ease",
              ].join(", "),
            }}
          >
            Estimer mon projet
            <ArrowRight size={14} strokeWidth={1.6} style={{ marginTop: "-1px" }} />
          </button>
        </div>

        <Suspense fallback={null}>
          <SimulateurModal open={simulOpen} onClose={() => setSimulOpen(false)} />
        </Suspense>

        {/* ─── Mobile burger : 3 points verticaux ─── */}
        <button
          className="md:hidden ml-auto p-2.5 rounded-full"
          style={{
            color: isDark ? "#D8A09A" : "#C8847C",
            background: "transparent",
            border: isDark
              ? "0.5px solid rgba(200,132,124,0.25)"
              : "0.5px solid rgba(200,132,124,0.30)",
            transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
          }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "#E6B4AE";
            el.style.color = "#E6B4AE";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = isDark ? "rgba(200,132,124,0.25)" : "rgba(200,132,124,0.30)";
            el.style.color = isDark ? "#D8A09A" : "#C8847C";
          }}
        >
          {mobileOpen ? (
            <X size={18} strokeWidth={1.6} />
          ) : (
            <MoreVertical size={18} strokeWidth={1.8} />
          )}
        </button>
      </div>

      {/* ─── Mobile menu ─── */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-2"
          style={{
            borderTop: isDark
              ? "0.5px solid rgba(200,132,124,0.16)"
              : "0.5px solid rgba(200,132,124,0.20)",
            background: isDark ? "rgba(26, 22, 16, 0.97)" : "rgba(247, 242, 238, 0.97)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          {navItems.map((item) => {
            const isActive = currentPath === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 24px",
                  borderRadius: "100px",
                  fontSize: "11px",
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  background: isActive ? "rgba(94,82,72,0.06)" : "transparent",
                  color: "#5E5248",
                  textDecoration: "none",
                  border: isActive ? "0.5px solid #C8847C" : "0.5px solid rgba(200,132,124,0.20)",
                  transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                {item.label}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              setSimulOpen(true);
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              padding: "13px 26px",
              borderRadius: "100px",
              background: "transparent",
              color: "#C8847C",
              fontSize: "11px",
              fontFamily: "var(--font-display)",
              letterSpacing: "0.22em",
              fontWeight: 600,
              textTransform: "uppercase",
              border: "1px solid #C8847C",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Estimer mon projet
            <ArrowRight size={14} strokeWidth={1.6} />
          </button>
        </div>
      )}
    </header>
  );
}
