import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Mail, Video, MapPin, Check, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — MELIYA" },
      { name: "description", content: "Parlons de votre projet. Estimation personnalisée sous 24h." },
    ],
  }),
  component: Contact,
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Info card ─────────────────────────────────────────────────────────── */
function InfoCard({
  icon: Icon,
  label,
  value,
  sub,
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub: string;
  delay?: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `0.5px solid ${hovered ? "rgba(201,169,110,0.55)" : "rgba(201,169,110,0.25)"}`,
        borderRadius: "18px",
        padding: "1.75rem 1.75rem",
        boxShadow: hovered
          ? "0 12px 40px rgba(216,180,166,0.12), 0 2px 8px rgba(216,180,166,0.06)"
          : "0 4px 20px rgba(216,180,166,0.06), 0 1px 4px rgba(216,180,166,0.04)",
        transition: "all 0.45s cubic-bezier(0.22,1,0.36,1)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transitionDelay: `${delay}ms`,
        display: "flex",
        alignItems: "flex-start",
        gap: "1.1rem",
      }}
    >
      {/* Icon circle */}
      <div style={{
        width: "42px", height: "42px", borderRadius: "12px", flexShrink: 0,
        background: hovered
          ? "linear-gradient(135deg, #F6E6B8, #EFDBC3)"
          : "linear-gradient(135deg, #F6F0EC, #F5EEE6)",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background 0.4s ease",
        boxShadow: "0 2px 8px rgba(216,180,166,0.12)",
      }}>
        <Icon size={18} style={{ color: "#C5A374" }} />
      </div>

      {/* Text */}
      <div>
        <p style={{
          fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase",
          fontFamily: "var(--font-display)", fontWeight: 700,
          color: "#C9A96E", marginBottom: "4px",
        }}>
          {label}
        </p>
        <p style={{
          fontFamily: "var(--font-display)", fontSize: "15px",
          color: "#8C6A43", fontWeight: 600, marginBottom: "3px", lineHeight: 1.3,
        }}>
          {value}
        </p>
        <p style={{
          fontFamily: "var(--font-sans)", fontSize: "12px",
          color: "#8C6A43", opacity: 0.5, lineHeight: 1.5,
        }}>
          {sub}
        </p>
      </div>
    </div>
  );
}

/* ─── Styled input ───────────────────────────────────────────────────────── */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
      <label style={{
        fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase",
        fontFamily: "var(--font-display)", fontWeight: 700, color: "#C9A96E",
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function PremiumInput({
  type = "text",
  placeholder,
  required,
  value,
  onChange,
}: {
  type?: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: "100%",
        padding: "13px 16px",
        borderRadius: "12px",
        border: `1px solid ${focused ? "rgba(201,169,110,0.7)" : "rgba(212,217,220,0.6)"}`,
        background: focused ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.75)",
        color: "#8C6A43",
        fontFamily: "var(--font-sans)",
        fontSize: "14px",
        outline: "none",
        boxShadow: focused
          ? "0 0 0 3px rgba(201,169,110,0.12), 0 2px 12px rgba(216,180,166,0.08)"
          : "0 1px 4px rgba(216,180,166,0.04)",
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
      }}
    />
  );
}

const PRESTATIONS = [
  "Slides sur mesure",
  "Pages sur mesure",
  "Présentation commerciale",
  "Support de formation",
  "Refonte d'un document existant",
  "Pack identité visuelle",
  "Projet personnalisé",
  "Je ne sais pas encore",
];

/* ─── Premium custom dropdown ────────────────────────────────────────────── */
function PremiumSelect({
  value,
  onChange,
  placeholder = "Sélectionnez une prestation…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", userSelect: "none" }}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          padding: "13px 42px 13px 16px",
          borderRadius: "12px",
          border: `1px solid ${open ? "rgba(201,169,110,0.7)" : "rgba(201,169,110,0.28)"}`,
          background: open ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.82)",
          color: value ? "#8C6A43" : "rgba(140,106,67,0.38)",
          fontFamily: "var(--font-sans)",
          fontSize: "14px",
          textAlign: "left",
          cursor: "pointer",
          outline: "none",
          boxShadow: open
            ? "0 0 0 3px rgba(201,169,110,0.12), 0 4px 20px rgba(216,180,166,0.10)"
            : "0 1px 4px rgba(216,180,166,0.05)",
          transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>{value || placeholder}</span>
        <ChevronDown
          size={15}
          style={{
            position: "absolute",
            right: "14px",
            top: "50%",
            transform: `translateY(-50%) rotate(${open ? "180deg" : "0deg"})`,
            color: "#C9A96E",
            transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
            pointerEvents: "none",
            flexShrink: 0,
          }}
        />
      </button>

      {/* Dropdown panel */}
      <div
        style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          left: 0,
          right: 0,
          zIndex: 50,
          borderRadius: "16px",
          background: "rgba(255,252,249,0.98)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(201,169,110,0.28)",
          boxShadow: "0 16px 60px rgba(216,180,166,0.18), 0 4px 16px rgba(201,169,110,0.1), 0 1px 0 rgba(255,255,255,0.9) inset",
          overflow: "hidden",
          pointerEvents: open ? "all" : "none",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.98)",
          transition: "opacity 0.28s cubic-bezier(0.22,1,0.36,1), transform 0.28s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div style={{ padding: "8px" }}>
          {PRESTATIONS.map((opt, i) => {
            const isSelected = value === opt;
            const isHovered = hovered === opt;
            return (
              <div
                key={opt}
                onMouseEnter={() => setHovered(opt)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => { onChange(opt); setOpen(false); }}
                style={{
                  padding: "11px 14px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                  fontSize: "14px",
                  lineHeight: 1.45,
                  color: isSelected ? "#8C6A43" : isHovered ? "#8C6A43" : "rgba(140,106,67,0.75)",
                  fontWeight: isSelected ? 600 : 400,
                  background: isSelected
                    ? "rgba(168,218,206,0.22)"
                    : isHovered
                    ? "rgba(242,217,220,0.5)"
                    : "transparent",
                  transition: "background 0.2s ease, color 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transitionDelay: open ? `${i * 18}ms` : "0ms",
                }}
              >
                <span>{opt}</span>
                {isSelected && (
                  <span style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #A8DACE, #7DBFB4)",
                    flexShrink: 0,
                    boxShadow: "0 0 6px rgba(168,218,206,0.6)",
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */
function Contact() {
  useReveal();
  const [sent, setSent] = useState(false);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [prestation, setPrestation] = useState("");
  const [message, setMessage] = useState("");
  const [textareaFocused, setTextareaFocused] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const [rgpdAccepted, setRgpdAccepted] = useState(false);

  return (
    <div style={{ minHeight: "100vh" }}>

      {/* ══ PAGE HERO ══════════════════════════════════════════════════════ */}
      <div style={{
        background: "transparent",
        padding: "5.5rem 1.5rem 7rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
      }}>
        {/* Glow orbes */}
        <div style={{
          position: "absolute", top: "-60px", right: "-40px",
          width: "420px", height: "420px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,180,188,0.28) 0%, transparent 70%)",
          filter: "blur(60px)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-40px", left: "-60px",
          width: "320px", height: "320px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,169,110,0.15) 0%, transparent 70%)",
          filter: "blur(60px)", pointerEvents: "none",
        }} />

        <div style={{ position: "relative", maxWidth: "680px", margin: "0 auto" }}>
          {/* Tag */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase",
            color: "#C9A96E", fontFamily: "var(--font-display)", fontWeight: 700,
            marginBottom: "1.6rem",
          }}>
            <span style={{ fontSize: "10px" }}>✦</span>
            Échangeons
            <span style={{ fontSize: "10px" }}>✦</span>
          </div>

          {/* Titre */}
          <h1 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(36px, 5vw, 62px)",
            lineHeight: 1.08,
            letterSpacing: "0.03em",
            color: "#8C6A43",
            fontWeight: 600,
            marginBottom: "1.4rem",
          }}>
            Parlons de votre projet
          </h1>

          {/* Ligne décorative */}
          <div style={{
            width: "64px", height: "1px",
            background: "linear-gradient(90deg, transparent, #C9A96E, transparent)",
            margin: "0 auto 1.4rem",
          }} />

          {/* Sous-texte */}
          <p className="serif italic" style={{
            fontSize: "clamp(16px, 1.8vw, 19px)",
            color: "#8C6A43", opacity: 0.68, lineHeight: 1.65,
            maxWidth: "520px", margin: "0 auto",
          }}>
            Quelques informations suffisent pour recevoir une estimation personnalisée sous 24h.
          </p>
        </div>

      </div>

      {/* ══ CORPS ══════════════════════════════════════════════════════════ */}
      <div style={{
        maxWidth: "1100px", margin: "0 auto",
        padding: "5rem 1.5rem 6rem",
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) minmax(0,1.55fr)",
        gap: "clamp(2rem, 4vw, 4rem)",
        alignItems: "start",
      }}
        className="contact-grid"
      >

        {/* ── Colonne gauche ──────────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

          <InfoCard
            icon={Mail}
            label="Email"
            value="contact@meliya.fr"
            sub="Réponse sous 24h ouvrées"
            delay={0}
          />
          <InfoCard
            icon={Video}
            label="Échange"
            value="Sur rendez-vous"
            sub="Visio ou téléphone selon votre préférence"
            delay={80}
          />
          <InfoCard
            icon={MapPin}
            label="Disponibilité"
            value="100 % à distance — France"
            sub="Travail flexible selon vos délais et besoins"
            delay={160}
          />

          {/* Citation signature */}
          <div
            className="reveal"
            style={{
              marginTop: "0.5rem",
              padding: "1.5rem 1.75rem",
              borderRadius: "18px",
              background: "linear-gradient(135deg, rgba(242,217,220,0.35), rgba(245,237,224,0.4))",
              border: "0.5px solid rgba(201,169,110,0.2)",
            }}
          >
            <p className="serif italic" style={{
              fontSize: "14px", color: "#8C6A43", lineHeight: 1.7, opacity: 0.8,
            }}>
              « Chaque projet commence par une conversation. Partagez-moi votre vision — même imparfaite. »
            </p>
            <p style={{
              fontSize: "11px", color: "#C9A96E", marginTop: "10px",
              fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "0.08em",
            }}>
              — Mélody Roche, fondatrice MELIYA
            </p>
          </div>
        </div>

        {/* ── Formulaire ──────────────────────────────────────────────────── */}
        <div
          className="reveal"
          style={{
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: "24px",
            padding: "clamp(1.8rem, 4vw, 3rem)",
            border: "0.5px solid rgba(201,169,110,0.22)",
            boxShadow: "0 8px 48px rgba(216,180,166,0.10), 0 2px 8px rgba(216,180,166,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
          }}
        >
          {/* Titre formulaire */}
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(20px, 2.5vw, 26px)",
              color: "#8C6A43", fontWeight: 500,
              letterSpacing: "0.03em", marginBottom: "6px",
            }}>
              Décrivez votre projet
            </h2>
            <p style={{
              fontSize: "13px", color: "#8C6A43", opacity: 0.45,
              fontFamily: "var(--font-sans)",
            }}>
              Tous les champs sont confidentiels et ne seront utilisés qu'à votre intention.
            </p>
          </div>

          {sent ? (
            /* ── Message de confirmation ── */
            <div style={{
              textAlign: "center", padding: "3rem 1.5rem",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem",
            }}>
              <div style={{
                width: "56px", height: "56px", borderRadius: "50%",
                background: "#A880D0",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 8px 24px rgba(184,145,94,0.22)",
              }}>
                <Check size={24} style={{ color: "#F9F4F0" }} />
              </div>
              <h3 style={{
                fontFamily: "var(--font-display)", fontSize: "20px",
                color: "#8C6A43", fontWeight: 600,
              }}>
                Message bien reçu
              </h3>
              <p className="serif italic" style={{
                fontSize: "15px", color: "#8C6A43", opacity: 0.65, lineHeight: 1.6, maxWidth: "340px",
              }}>
                Merci pour votre confiance. Je vous réponds personnellement sous 24h ouvrées.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}
            >
              {/* Nom + Email */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
                className="form-row"
              >
                <Field label="Prénom & Nom">
                  <PremiumInput
                    placeholder="Ex : Sophie Martin"
                    required
                    value={nom}
                    onChange={setNom}
                  />
                </Field>
                <Field label="Email">
                  <PremiumInput
                    type="email"
                    placeholder="votre@email.fr"
                    required
                    value={email}
                    onChange={setEmail}
                  />
                </Field>
              </div>

              {/* Type de prestation */}
              <Field label="Type de prestation">
                <PremiumSelect value={prestation} onChange={setPrestation} />
              </Field>

              {/* Textarea */}
              <Field label="Votre projet">
                <div>
                  <textarea
                    required
                    rows={5}
                    placeholder="Expliquez votre projet, vos objectifs, le type de support souhaité ou même une simple idée de départ…"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setTextareaFocused(true)}
                    onBlur={() => setTextareaFocused(false)}
                    style={{
                      width: "100%",
                      padding: "13px 16px",
                      borderRadius: "12px",
                      border: `1px solid ${textareaFocused ? "rgba(201,169,110,0.7)" : "rgba(212,217,220,0.6)"}`,
                      background: textareaFocused ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.75)",
                      color: "#8C6A43",
                      fontFamily: "var(--font-sans)",
                      fontSize: "14px",
                      outline: "none",
                      resize: "vertical",
                      lineHeight: 1.65,
                      boxShadow: textareaFocused
                        ? "0 0 0 3px rgba(201,169,110,0.12), 0 2px 12px rgba(216,180,166,0.08)"
                        : "0 1px 4px rgba(216,180,166,0.04)",
                      transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  />
                  <p style={{
                    fontSize: "11.5px", color: "#8C6A43", opacity: 0.38,
                    fontFamily: "var(--font-sans)", fontStyle: "italic",
                    marginTop: "6px", paddingLeft: "2px",
                  }}>
                    Même une idée vague suffit pour commencer.
                  </p>
                </div>
              </Field>

              {/* ── Consentement RGPD ── */}
              <label style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "11px",
                cursor: "pointer",
                padding: "14px 16px",
                borderRadius: "12px",
                background: rgpdAccepted ? "rgba(200,160,82,0.07)" : "rgba(245,240,250,0.55)",
                border: `1px solid ${rgpdAccepted ? "rgba(200,160,82,0.35)" : "rgba(212,184,150,0.22)"}`,
                transition: "all 0.3s ease",
              }}>
                <input
                  type="checkbox"
                  required
                  checked={rgpdAccepted}
                  onChange={(e) => setRgpdAccepted(e.target.checked)}
                  style={{
                    marginTop: "2px",
                    width: "16px",
                    height: "16px",
                    accentColor: "#C8A052",
                    flexShrink: 0,
                    cursor: "pointer",
                  }}
                />
                <span style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "13px",
                  color: "rgba(140,106,67,0.70)",
                  lineHeight: 1.65,
                }}>
                  J'accepte que mes données (nom, email, message) soient traitées par Mélody Roche
                  dans le seul but de répondre à ma demande, conformément à la{" "}
                  <Link
                    to="/mentions-legales"
                    hash="confidentialite"
                    style={{ color: "#C8A052", textDecoration: "underline", textUnderlineOffset: "3px" }}
                  >
                    politique de confidentialité
                  </Link>
                  .{" "}
                  <span style={{ opacity: 0.55, fontSize: "12px" }}>
                    (Données conservées 3 ans max, aucune revente ni transmission à des tiers.)
                  </span>
                </span>
              </label>

              {/* Bouton CTA */}
              <button
                type="submit"
                disabled={!rgpdAccepted}
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
                style={{
                  width: "100%",
                  padding: "16px 24px",
                  borderRadius: "14px",
                  border: "none",
                  cursor: rgpdAccepted ? "pointer" : "not-allowed",
                  background: !rgpdAccepted
                    ? "rgba(246,240,236,0.55)"
                    : btnHovered
                    ? "linear-gradient(135deg, #D8B4A6, #B8915E)"
                    : "linear-gradient(135deg, #F6E6B8 0%, #C5A374 100%)",
                  color: !rgpdAccepted ? "#8C6A43" : btnHovered ? "#FFFFFF" : "#3A2614",
                  fontFamily: "var(--font-display)",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  opacity: rgpdAccepted ? 1 : 0.55,
                  transform: rgpdAccepted && btnHovered ? "translateY(-1px)" : "translateY(0)",
                  boxShadow: rgpdAccepted && btnHovered
                    ? "0 12px 35px rgba(184,145,94,0.22)"
                    : rgpdAccepted
                    ? "0 8px 25px rgba(216,180,166,0.10), inset 0 0.5px 0 rgba(255,255,255,0.55)"
                    : "none",
                  transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                Recevoir mon devis
              </button>

              {/* Réassurance */}
              <div style={{
                display: "flex", flexWrap: "wrap", gap: "10px 20px",
                justifyContent: "center", paddingTop: "4px",
              }}>
                {[
                  "Réponse sous 24h",
                  "3 retouches incluses",
                  "Tarif validé avant lancement",
                  "Travail 100 % personnalisé",
                ].map((item) => (
                  <span key={item} style={{
                    display: "inline-flex", alignItems: "center", gap: "5px",
                    fontSize: "11px", color: "#8C6A43", opacity: 0.45,
                    fontFamily: "var(--font-sans)",
                  }}>
                    <span style={{ color: "#C9A96E", fontSize: "10px" }}>✓</span>
                    {item}
                  </span>
                ))}
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Responsive mobile — passe en 1 colonne sous 768px */}
      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
