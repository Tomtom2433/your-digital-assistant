import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("meliya-theme") : null;
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const setTheme = (next: boolean) => {
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("meliya-theme", next ? "dark" : "light"); } catch {}
  };

  const base: React.CSSProperties = {
    padding: "4px 10px",
    borderRadius: "16px",
    fontSize: "12px",
    lineHeight: 1,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    transition: "all .2s ease",
    fontFamily: "var(--font-sans)",
  };
  const active: React.CSSProperties = { background: "#CFA27A", color: "#F7F4EF" };
  const inactive: React.CSSProperties = { background: "transparent", color: "#CFA27A" };

  return (
    <div
      role="group"
      aria-label="Choix du thème"
      className="inline-flex items-center shrink-0"
      style={{
        border: "1px solid #CFA27A",
        borderRadius: "20px",
        padding: "2px",
        gap: "2px",
      }}
    >
      <button
        type="button"
        onClick={() => setTheme(false)}
        aria-pressed={!dark}
        style={{ ...base, ...(!dark ? active : inactive) }}
      >
        ☀️ Jour
      </button>
      <button
        type="button"
        onClick={() => setTheme(true)}
        aria-pressed={dark}
        style={{ ...base, ...(dark ? active : inactive) }}
      >
        🌙 Nuit
      </button>
    </div>
  );
}