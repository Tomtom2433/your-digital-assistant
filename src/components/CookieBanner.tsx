import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronUp, Shield, Settings, BarChart2 } from "lucide-react";

/* ── Constantes ─────────────────────────────────────────────── */
const KEY_CONSENT = "meliya-cookie-consent";
const KEY_DATE = "meliya-cookie-consent-date";
const MAX_AGE_MS = 13 * 30 * 24 * 60 * 60 * 1000; // ~13 mois

type Prefs = { necessary: true; functional: boolean; analytics: boolean };

function saveConsent(prefs: Prefs) {
  try {
    localStorage.setItem(KEY_CONSENT, JSON.stringify(prefs));
    localStorage.setItem(KEY_DATE, String(Date.now()));
  } catch {}
}

function loadSaved(): { visible: boolean; prefs: Prefs } {
  const defaults: Prefs = { necessary: true, functional: true, analytics: false };
  try {
    const raw = localStorage.getItem(KEY_CONSENT);
    const date = localStorage.getItem(KEY_DATE);
    const expired = date ? Date.now() - parseInt(date, 10) > MAX_AGE_MS : true;
    if (!raw || expired) return { visible: true, prefs: defaults };
    // compatibilité ancien format "accepted" / "refused"
    if (raw === "accepted")
      return { visible: false, prefs: { necessary: true, functional: true, analytics: false } };
    if (raw === "refused")
      return { visible: false, prefs: { necessary: true, functional: false, analytics: false } };
    return { visible: false, prefs: JSON.parse(raw) as Prefs };
  } catch {
    return { visible: true, prefs: defaults };
  }
}

/* ── Toggle switch ──────────────────────────────────────────── */
function Toggle({
  checked,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
}) {
  const bg = disabled
    ? "rgba(160,140,180,0.28)"
    : checked
      ? "linear-gradient(90deg, #C89B6D, #E8D4A0)"
      : "rgba(200,160,82,0.18)";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        !disabled && onChange?.(!checked);
      }}
      style={{
        flexShrink: 0,
        width: "40px",
        height: "22px",
        borderRadius: "100px",
        border: "none",
        background: bg,
        position: "relative",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background 0.3s ease",
        outline: "none",
        padding: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "3px",
          left: checked ? "21px" : "3px",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
          transition: "left 0.25s cubic-bezier(0.22,1,0.36,1)",
          display: "block",
        }}
      />
    </button>
  );
}

/* ── Catégories ─────────────────────────────────────────────── */
type CatDef = {
  id: "necessary" | "functional" | "analytics";
  icon: React.ReactNode;
  label: string;
  description: string;
  mandatory: boolean;
  cookies: { name: string; purpose: string; duration: string }[];
};

const CATEGORIES: CatDef[] = [
  {
    id: "necessary",
    icon: <Shield size={14} />,
    label: "Cookies nécessaires",
    description: "Indispensables au fonctionnement du site. Ils ne peuvent pas être désactivés.",
    mandatory: true,
    cookies: [
      {
        name: "meliya-cookie-consent",
        purpose: "Mémorise votre choix de consentement",
        duration: "13 mois",
      },
      {
        name: "meliya-cookie-consent-date",
        purpose: "Horodatage du consentement",
        duration: "13 mois",
      },
    ],
  },
  {
    id: "functional",
    icon: <Settings size={14} />,
    label: "Cookies fonctionnels",
    description: "Mémorisent vos préférences pour améliorer votre expérience de navigation.",
    mandatory: false,
    cookies: [
      {
        name: "meliya-theme",
        purpose: "Mémorise votre thème choisi (clair / sombre)",
        duration: "Local",
      },
    ],
  },
  {
    id: "analytics",
    icon: <BarChart2 size={14} />,
    label: "Cookies analytiques",
    description:
      "Permettent de mesurer l'audience du site. Aucun cookie analytique n'est utilisé actuellement.",
    mandatory: false,
    cookies: [],
  },
];

/* ── Composant principal ────────────────────────────────────── */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>({
    necessary: true,
    functional: true,
    analytics: false,
  });
  const [openCat, setOpenCat] = useState<string | null>(null);

  useEffect(() => {
    const { visible: v, prefs: p } = loadSaved();
    setVisible(v);
    setPrefs(p);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    setIsDark(html.classList.contains("dark"));
    const obs = new MutationObserver(() => setIsDark(html.classList.contains("dark")));
    obs.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  /* Réouverture depuis le footer */
  useEffect(() => {
    const handler = () => {
      setExpanded(false);
      setVisible(true);
    };
    window.addEventListener("meliya:show-cookie-banner", handler);
    return () => window.removeEventListener("meliya:show-cookie-banner", handler);
  }, []);

  const acceptAll = () => {
    saveConsent({ necessary: true, functional: true, analytics: false });
    setVisible(false);
  };
  const refuseAll = () => {
    saveConsent({ necessary: true, functional: false, analytics: false });
    setVisible(false);
  };
  const saveCustom = () => {
    saveConsent(prefs);
    setVisible(false);
  };

  if (!visible) return null;

  /* ── Tokens couleurs selon mode ── */
  const bg = isDark ? "rgba(26,22,16,0.97)" : "rgba(246,240,236,0.97)";
  const ink = isDark ? "rgba(245,240,250,0.92)" : "#5E5248";
  const inkMuted = isDark ? "rgba(245,240,250,0.52)" : "rgba(94,82,72,0.55)";
  const catBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(200,155,109,0.04)";
  const divider = isDark ? "rgba(200,160,82,0.14)" : "rgba(200,160,82,0.18)";

  /* ── Bouton helper ── */
  const btnBase: React.CSSProperties = {
    padding: "9px 18px",
    borderRadius: "100px",
    fontFamily: "var(--font-display)",
    fontSize: "10.5px",
    fontWeight: 700,
    letterSpacing: "0.11em",
    textTransform: "uppercase",
    cursor: "pointer",
    whiteSpace: "nowrap",
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Gestion des cookies"
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        right: "20px",
        margin: "0 auto",
        maxWidth: "860px",
        zIndex: 200,
        background: bg,
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(200,160,82,0.28)",
        borderRadius: "20px",
        boxShadow: isDark
          ? "0 8px 48px rgba(0,0,0,0.60), 0 2px 8px rgba(0,0,0,0.35)"
          : "0 8px 48px rgba(200,155,109,0.12), 0 2px 8px rgba(200,155,109,0.07)",
      }}
    >
      {/* ═══ VUE RAPIDE ═══ */}
      <div
        style={{
          padding: "18px 22px 16px",
          display: "flex",
          alignItems: "flex-start",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        {/* Texte */}
        <div style={{ flex: 1, minWidth: "220px" }}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: ink,
              margin: "0 0 5px",
            }}
          >
            🍪 Vos préférences de cookies
          </p>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "13px",
              color: inkMuted,
              margin: 0,
              lineHeight: 1.65,
            }}
          >
            Ce site utilise des cookies nécessaires à son fonctionnement et des cookies fonctionnels
            pour mémoriser vos préférences.{" "}
            <Link
              to="/mentions-legales"
              hash="cookies"
              style={{ color: "#C89B6D", textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              Politique des cookies ↗
            </Link>
          </p>
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            flexWrap: "wrap",
            flexShrink: 0,
          }}
        >
          <button
            type="button"
            onClick={refuseAll}
            style={{
              ...btnBase,
              border: "1px solid rgba(200,160,82,0.42)",
              background: "transparent",
              color: ink,
            }}
          >
            Tout refuser
          </button>

          <button
            type="button"
            onClick={acceptAll}
            style={{
              ...btnBase,
              border: "1px solid rgba(184,146,42,0.42)",
              background: "linear-gradient(135deg, #C89B6D 0%, #E6CEB0 50%, #FDF5E0 100%)",
              color: "#1A0E06",
              boxShadow: "0 4px 18px rgba(184,146,42,0.28), inset 0 0.5px 0 rgba(255,255,255,0.65)",
            }}
          >
            Tout accepter
          </button>

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            style={{
              ...btnBase,
              border: "1px solid rgba(200,160,82,0.22)",
              background: "transparent",
              color: inkMuted,
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            Personnaliser
            {expanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
          </button>
        </div>
      </div>

      {/* ═══ VUE ÉTENDUE ═══ */}
      {expanded && (
        <div style={{ borderTop: `1px solid ${divider}`, padding: "16px 22px 20px" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}
          >
            {CATEGORIES.map((cat) => {
              const isOpen = openCat === cat.id;
              const active = cat.mandatory ? true : prefs[cat.id as "functional" | "analytics"];

              return (
                <div
                  key={cat.id}
                  style={{
                    background: catBg,
                    border: `1px solid ${divider}`,
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  {/* Header catégorie */}
                  <div
                    onClick={() => setOpenCat(isOpen ? null : cat.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "11px 14px",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        color: "#C89B6D",
                        display: "flex",
                        alignItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      {cat.icon}
                    </span>
                    <span
                      style={{
                        flex: 1,
                        fontFamily: "var(--font-display)",
                        fontSize: "11.5px",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        color: ink,
                      }}
                    >
                      {cat.label}
                    </span>
                    {cat.mandatory && (
                      <span
                        style={{
                          fontSize: "9.5px",
                          color: "#C89B6D",
                          fontFamily: "var(--font-display)",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          opacity: 0.8,
                          border: "0.5px solid rgba(200,160,82,0.35)",
                          borderRadius: "100px",
                          padding: "2px 7px",
                        }}
                      >
                        Requis
                      </span>
                    )}
                    <Toggle
                      checked={!!active}
                      disabled={cat.mandatory}
                      onChange={(v) => !cat.mandatory && setPrefs((p) => ({ ...p, [cat.id]: v }))}
                    />
                    <span
                      style={{
                        color: inkMuted,
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "4px",
                        flexShrink: 0,
                      }}
                    >
                      {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </span>
                  </div>

                  {/* Détail catégorie */}
                  {isOpen && (
                    <div style={{ padding: "0 14px 13px", borderTop: `1px solid ${divider}` }}>
                      <p
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "12.5px",
                          color: inkMuted,
                          margin: "10px 0 10px",
                          lineHeight: 1.6,
                          fontStyle: "italic",
                        }}
                      >
                        {cat.description}
                      </p>

                      {cat.cookies.length > 0 ? (
                        <div style={{ overflowX: "auto" }}>
                          <table
                            style={{
                              width: "100%",
                              borderCollapse: "collapse",
                              fontSize: "11.5px",
                            }}
                          >
                            <thead>
                              <tr>
                                {["Nom du cookie", "Finalité", "Durée"].map((h) => (
                                  <th
                                    key={h}
                                    style={{
                                      textAlign: "left",
                                      fontFamily: "var(--font-display)",
                                      fontWeight: 600,
                                      letterSpacing: "0.06em",
                                      color: "#C89B6D",
                                      fontSize: "9.5px",
                                      textTransform: "uppercase",
                                      padding: "3px 8px 7px 0",
                                      borderBottom: `1px solid ${divider}`,
                                    }}
                                  >
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {cat.cookies.map((c) => (
                                <tr key={c.name}>
                                  <td
                                    style={{
                                      padding: "6px 8px 6px 0",
                                      color: ink,
                                      fontFamily: "monospace",
                                      fontSize: "11px",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {c.name}
                                  </td>
                                  <td
                                    style={{
                                      padding: "6px 8px 6px 0",
                                      color: inkMuted,
                                      fontFamily: "var(--font-serif)",
                                      lineHeight: 1.4,
                                    }}
                                  >
                                    {c.purpose}
                                  </td>
                                  <td
                                    style={{
                                      padding: "6px 0",
                                      color: inkMuted,
                                      fontFamily: "var(--font-serif)",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {c.duration}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "12px",
                            color: inkMuted,
                            fontStyle: "italic",
                            margin: 0,
                          }}
                        >
                          Aucun cookie de cette catégorie n'est utilisé actuellement.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={saveCustom}
              style={{
                ...btnBase,
                border: "1px solid rgba(184,146,42,0.42)",
                background: "linear-gradient(135deg, #C89B6D 0%, #E6CEB0 50%, #FDF5E0 100%)",
                color: "#1A0E06",
                boxShadow:
                  "0 4px 18px rgba(184,146,42,0.28), inset 0 0.5px 0 rgba(255,255,255,0.65)",
                padding: "10px 26px",
              }}
            >
              Enregistrer mes préférences
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
