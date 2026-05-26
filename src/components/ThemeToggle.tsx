import { useEffect, useState } from "react";

function SunIcon({ active, lightMode }: { active: boolean; lightMode?: boolean }) {
  /* Chaud brun/or en mode clair, or champagne en mode sombre */
  const c = active
    ? lightMode
      ? "#B0875A"
      : "#E6CEB0"
    : lightMode
      ? "rgba(94,82,72,0.35)"
      : "rgba(200,155,109,0.38)";
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4.5" fill={c} />
      <line x1="12" y1="2" x2="12" y2="5.5" stroke={c} strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="18.5" x2="12" y2="22" stroke={c} strokeWidth="2" strokeLinecap="round" />
      <line x1="2" y1="12" x2="5.5" y2="12" stroke={c} strokeWidth="2" strokeLinecap="round" />
      <line x1="18.5" y1="12" x2="22" y2="12" stroke={c} strokeWidth="2" strokeLinecap="round" />
      <line
        x1="4.93"
        y1="4.93"
        x2="7.34"
        y2="7.34"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="16.66"
        y1="16.66"
        x2="19.07"
        y2="19.07"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="19.07"
        y1="4.93"
        x2="16.66"
        y2="7.34"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="7.34"
        y1="16.66"
        x2="4.93"
        y2="19.07"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon({ active, lightMode }: { active: boolean; lightMode?: boolean }) {
  /* Ivoire en mode sombre actif, brun pâle désactivé en mode clair */
  const c = active
    ? lightMode
      ? "#5E5248"
      : "#FDF5E0"
    : lightMode
      ? "rgba(94,82,72,0.30)"
      : "rgba(200,155,109,0.38)";
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        fill={c}
        stroke={c}
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ThemeToggle({
  orientation = "horizontal",
}: { orientation?: "horizontal" | "vertical" } = {}) {
  const [dark, setDark] = useState(false);
  const isVertical = orientation === "vertical";

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("meliya-theme") : null;
    const isDark = stored === "dark"; /* light par défaut */
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const setTheme = (next: boolean) => {
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("meliya-theme", next ? "dark" : "light");
    } catch {}
  };

  const base: React.CSSProperties = {
    padding: "5px 8px",
    borderRadius: "14px",
    lineHeight: 1,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    transition: "all 0.38s cubic-bezier(0.22, 1, 0.36, 1)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  /* Pill bouton actif champagne chaud en mode clair, aubergine en mode sombre */
  const activeSunLight: React.CSSProperties = {
    background: "linear-gradient(135deg, rgba(200,155,109,0.18) 0%, rgba(224,207,183,0.28) 100%)",
    boxShadow: [
      "0 2px 10px rgba(176,135,90,0.22)",
      "0 0 0 0.5px rgba(200,155,109,0.50)",
      "inset 0 0.5px 0 rgba(255,255,255,0.60)",
    ].join(", "),
  };
  const activeMoonDark: React.CSSProperties = {
    background: "linear-gradient(135deg, #3B1250 0%, #2E0D40 100%)",
    boxShadow: [
      "0 2px 10px rgba(46,13,64,0.55)",
      "0 0 0 0.5px rgba(200,155,109,0.38)",
      "inset 0 0.5px 0 rgba(255,255,255,0.08)",
    ].join(", "),
  };
  const inactive: React.CSSProperties = { background: "transparent", opacity: 0.45 };

  /* Conteneur pill : ivoire/champagne en clair, aubergine en sombre */
  const pillBg = dark
    ? "linear-gradient(135deg, #2E0D40 0%, #3B1250 100%)"
    : "linear-gradient(135deg, #EDE0CC 0%, #F7F2EE 100%)";
  const pillShadow = dark
    ? "0 2px 16px rgba(46,13,64,0.50), inset 0 0.5px 0 rgba(255,255,255,0.06)"
    : "0 2px 12px rgba(176,135,90,0.16), 0 0 0 0.5px rgba(200,155,109,0.28), inset 0 0.5px 0 rgba(255,255,255,0.70)";

  return (
    <div
      role="group"
      aria-label="Choix du thème"
      className="inline-flex shrink-0"
      style={{
        flexDirection: isVertical ? "column" : "row",
        alignItems: "center",
        border: "none",
        borderRadius: "22px",
        padding: "3px",
        gap: "1px",
        background: pillBg,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: pillShadow,
        transition: "all 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* Soleil mode clair */}
      <button
        type="button"
        onClick={() => setTheme(false)}
        aria-pressed={!dark}
        style={{ ...base, ...(!dark ? activeSunLight : inactive) }}
        title="Mode clair"
      >
        <SunIcon active={!dark} lightMode={!dark} />
      </button>

      {/* Lune mode sombre */}
      <button
        type="button"
        onClick={() => setTheme(true)}
        aria-pressed={dark}
        style={{ ...base, ...(dark ? activeMoonDark : inactive) }}
        title="Mode sombre"
      >
        <MoonIcon active={dark} lightMode={!dark} />
      </button>
    </div>
  );
}
