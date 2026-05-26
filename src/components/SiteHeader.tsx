import { Link, useRouterState } from "@tanstack/react-router";
import { Sparkles, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SimulateurModal } from "@/components/SimulateurModal";
import { useState, useEffect } from "react";


const navItems = [
  { to: "/prestations", label: "Mes prestations" },
  { to: "/a-propos",    label: "Qui est Meliya ?" },
  { to: "/contact",     label: "Contact" },
  { to: "/faq",         label: "FAQ" },
] as const;

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [simulOpen,  setSimulOpen]  = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [hidden,     setHidden]     = useState(false);
  const [isDark,     setIsDark]     = useState(false);
  const [btnHovered,  setBtnHovered]  = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      /* Cache vers le bas, réapparaît vers le haut */
      if (y > lastY && y > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Sync dark mode — lecture immédiate + MutationObserver */
  useEffect(() => {
    const html = document.documentElement;
    setIsDark(html.classList.contains("dark"));
    const obs = new MutationObserver(() => setIsDark(html.classList.contains("dark")));
    obs.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  /* ── Navbar : quasi-transparente à tout moment ──────────────────────
     On n'affiche JAMAIS un fond opaque blanc/crème.
     Au scroll, on ajoute seulement un très léger flou backdrop + une
     micro-bordure champagne pour signaler le "niveau" visuellement.
  ─────────────────────────────────────────────────────────────────── */
  const navBg = scrolled
    ? isDark
      ? "rgba(26, 22, 16, 0.82)"
      : "rgba(246, 240, 236, 0.88)"
    : "transparent";

  const navBackdrop   = scrolled ? "blur(24px) saturate(1.1)" : "none";
  const navBorderBot  = scrolled
    ? isDark
      ? "0.5px solid rgba(197,163,116,0.18)"
      : "0.5px solid rgba(197,163,116,0.22)"
    : "none";
  const navShadow     = scrolled
    ? isDark
      ? "0 2px 32px rgba(0,0,0,0.45)"
      : "0 2px 24px rgba(197,163,116,0.10)"
    : "none";

  /* ── Simulateur — signature gold ── */
  const simBg        = "linear-gradient(135deg, #C5A374 0%, #D9BF9A 50%, #EFDBC3 100%)";
  const simBgHover   = "linear-gradient(135deg, #D9BF9A 0%, #C5A374 55%, #D9BF9A 100%)";
  const simShadow    = "0 8px 28px rgba(197,163,116,0.28), 0 2px 8px rgba(197,163,116,0.14), inset 0 0.5px 0 rgba(255,255,255,0.50)";
  const simShadowHov = "0 14px 38px rgba(197,163,116,0.38), 0 4px 12px rgba(197,163,116,0.18), inset 0 0.5px 0 rgba(255,255,255,0.45)";

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
        className="max-w-7xl mx-auto px-8 sm:px-12"
        style={{
          height: "72px",
          display: "flex",
          alignItems: "center",
          gap: "0",
          overflow: "visible",
        }}
      >

        {/* Logo supprimé — le nom MELIYA est dans le hero */}

        {/* ── Nav desktop ── */}
        <nav
          className="hidden md:flex items-center flex-1 justify-center"
          style={{ gap: "18px" }}
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
                  padding: "0.65rem 1.0rem",
                  fontSize: "10.5px",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* ── Droite : ThemeToggle + Simulateur ── */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <ThemeToggle />

          {/* Bouton Simulateur — sauge → champagne premium */}
          <button
            type="button"
            onClick={() => setSimulOpen(true)}
            className="btn-simulateur"
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              padding: "10px 24px",
              borderRadius: "100px",
              background: btnHovered ? simBgHover : simBg,
              color: "#F6F0EC",
              fontSize: "10.5px",
              fontFamily: "var(--font-display)",
              letterSpacing: "0.15em",
              fontWeight: 700,
              textTransform: "uppercase",
              border: "none",
              outline: "none",
              cursor: "pointer",
              boxShadow: btnHovered ? simShadowHov : simShadow,
              transform: btnHovered ? "translateY(-2px) scale(1.025)" : "translateY(0) scale(1)",
              transition: [
                "transform 0.40s cubic-bezier(0.16,1,0.3,1)",
                "background 0.40s ease",
                "box-shadow 0.40s ease",
                "border-color 0.40s ease",
              ].join(", "),
            }}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
          >
            <Sparkles size={12} strokeWidth={2.1} />
            Simulateur
          </button>
        </div>

        <SimulateurModal open={simulOpen} onClose={() => setSimulOpen(false)} />

        {/* ── Mobile burger ── */}
        <button
          className="md:hidden ml-auto p-2 rounded-xl"
          style={{
            color: isDark ? "#D9BF9A" : "#C5A374",
            background: isDark ? "rgba(35,30,22,0.55)" : "rgba(224,207,183,0.30)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: isDark
              ? "0.5px solid rgba(197,163,116,0.25)"
              : "0.5px solid #E0CFB7",
            transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
          }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-2"
          style={{
            borderTop: isDark
              ? "0.5px solid rgba(197,163,116,0.16)"
              : "0.5px solid #E0CFB7",
            background: isDark
              ? "rgba(26, 22, 16, 0.97)"
              : "rgba(246, 240, 236, 0.97)",
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
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  background: isDark
                    ? isActive ? "rgba(197,163,116,0.14)" : "rgba(35,30,22,0.55)"
                    : isActive ? "rgba(197,163,116,0.12)" : "rgba(224,207,183,0.20)",
                  color: isDark
                    ? isActive ? "#EFDBC3" : "rgba(217,191,154,0.80)"
                    : isActive ? "#D9BF9A" : "#C5A374",
                  textDecoration: "none",
                  border: isDark
                    ? isActive
                      ? "0.5px solid rgba(197,163,116,0.45)"
                      : "0.5px solid rgba(197,163,116,0.22)"
                    : isActive
                      ? "0.5px solid #D9BF9A"
                      : "0.5px solid #E0CFB7",
                  boxShadow: isActive
                    ? isDark
                      ? "0 2px 14px rgba(197,163,116,0.14)"
                      : "0 2px 14px rgba(197,163,116,0.12)"
                    : "none",
                  transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Simulateur mobile */}
          <button
            type="button"
            onClick={() => { setMobileOpen(false); setSimulOpen(true); }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "7px",
              padding: "12px 24px",
              borderRadius: "100px",
              background: simBg,
              color: "#F6F0EC",
              fontSize: "11px",
              fontFamily: "var(--font-display)",
              letterSpacing: "0.13em",
              fontWeight: 700,
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
              boxShadow: simShadow,
            }}
          >
            <Sparkles size={12} strokeWidth={2.1} /> Simulateur
          </button>
        </div>
      )}
    </header>
  );
}
