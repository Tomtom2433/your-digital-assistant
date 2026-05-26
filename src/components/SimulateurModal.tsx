import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, ArrowRight, ArrowLeft, Sparkles, Minus, Plus, Presentation, FileText, BookOpen, Palette, Check } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface SimulateurModalProps {
  open: boolean;
  onClose: () => void;
}

/* ── Données — tarifs alignés sur la page Prestations (PDF officiel) ──────── */
const SERVICES = [
  {
    key: "slides",
    label: "Slides sur mesure",
    sub: "Présentations, pitchs, formations",
    unit: "slide",
    unitLabel: "slide",
    unitPrice: 30,
    Icon: Presentation,
    emoji: "✨",
    color: "#C89B6D",
    colorMid: "#B0875A",
    colorLight: "rgba(200,155,109,0.10)",
    colorBorder: "rgba(200,155,109,0.45)",
    bg: "linear-gradient(135deg, rgba(200,155,109,0.10) 0%, rgba(230,180,174,0.08) 100%)",
    subTypes: [
      "Présentation client",
      "Pitch deck",
      "Support de formation",
      "Présentation académique",
      "Autre / mixte",
    ],
  },
  {
    key: "documents",
    label: "Documents sur mesure",
    sub: "Rapports, ebooks, livrets, dossiers",
    unit: "page",
    unitLabel: "page",
    unitPrice: 25,
    Icon: FileText,
    emoji: "📄",
    color: "#C89B6D",
    colorMid: "#B0875A",
    colorLight: "rgba(200,155,109,0.10)",
    colorBorder: "rgba(200,155,109,0.45)",
    bg: "linear-gradient(135deg, rgba(200,155,109,0.10) 0%, rgba(212,177,137,0.08) 100%)",
    subTypes: [
      "Rapport professionnel",
      "Ebook / Guide",
      "Livret / Brochure",
      "Dossier de présentation",
      "Document corporate",
    ],
  },
  {
    key: "identite",
    label: "Pack Up Identité",
    sub: "Branding complet (forfait)",
    unit: null,
    unitLabel: null,
    unitPrice: 479,
    Icon: Palette,
    emoji: "🎨",
    color: "#E6B4AE",
    colorMid: "#C89B6D",
    colorLight: "rgba(230,180,174,0.10)",
    colorBorder: "rgba(230,180,174,0.45)",
    bg: "linear-gradient(135deg, rgba(230,180,174,0.12) 0%, rgba(200,155,109,0.10) 100%)",
    subTypes: null,
  },
] as const;

type ServiceKey = (typeof SERVICES)[number]["key"];

const FINITIONS = [
  {
    key: "essentiel",
    label: "Essentiel",
    mult: 1.0,
    badge: null,
    desc: "Structure & mise en forme propre",
  },
  {
    key: "premium",
    label: "Premium",
    mult: 1.2,
    badge: "+20 %",
    desc: "Design sur-mesure & identité visuelle",
  },
  {
    key: "excellence",
    label: "Excellence",
    mult: 1.4,
    badge: "+40 %",
    desc: "Livraison premium + suivi & itérations",
  },
] as const;

type FinitionKey = (typeof FINITIONS)[number]["key"];

const CHIPS = [5, 10, 15, 20, 30] as const;

/* ── Calcul tarif ─────────────────────────────────────────── */
function calcPrice(qty: number, unitPrice: number) {
  if (qty >= 20) return { base: qty * unitPrice * 0.85, discountRate: 15 };
  if (qty >= 10) return { base: qty * unitPrice * 0.9, discountRate: 10 };
  return { base: qty * unitPrice, discountRate: 0 };
}

/* ── Compteur animé ───────────────────────────────────────── */
function AnimatedPrice({ target }: { target: number }) {
  const [display, setDisplay] = useState(target);
  const prev = useRef<number>(target);

  useEffect(() => {
    const start = prev.current;
    const end = target;
    if (start === end) return;
    const dur = 550;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(start + (end - start) * ease));
      if (p < 1) requestAnimationFrame(tick);
      else {
        prev.current = end;
      }
    };
    requestAnimationFrame(tick);
  }, [target]);

  return <>{display.toLocaleString("fr-FR")}</>;
}

/* ── Barre d'étapes ───────────────────────────────────────── */
function StepBar({ step }: { step: number }) {
  const steps = ["Service", "Volume", "Estimation"];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1.8rem",
      }}
    >
      {steps.map((label, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background:
                  i < step
                    ? "linear-gradient(135deg, #C89B6D, #D4B189)"
                    : i === step
                      ? "linear-gradient(135deg, #C89B6D, #E6B4AE)"
                      : "rgba(200,155,109,0.08)",
                border: i <= step ? "none" : "1px solid rgba(200,155,109,0.20)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.45s cubic-bezier(0.22,1,0.36,1)",
                boxShadow:
                  i === step
                    ? "0 4px 16px rgba(200,155,109,0.32)"
                    : i < step
                      ? "0 3px 10px rgba(200,155,109,0.28)"
                      : "none",
              }}
            >
              {i < step ? (
                <span style={{ color: "#3A2010", fontSize: "13px", fontWeight: 800 }}>✓</span>
              ) : (
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: i === step ? "#5E5248" : "rgba(200,155,109,0.40)",
                  }}
                >
                  {i + 1}
                </span>
              )}
            </div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "8px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: i === step ? 700 : 500,
                color: i <= step ? "#5E5248" : "rgba(94,82,72,0.30)",
                transition: "all 0.3s ease",
              }}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              style={{
                width: "55px",
                height: "1px",
                margin: "0 6px",
                marginBottom: "18px",
                background:
                  i < step ? "linear-gradient(90deg, #C89B6D, #E6CEB0)" : "rgba(200,155,109,0.14)",
                transition: "background 0.4s ease",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════ */
export function SimulateurModal({ open, onClose }: SimulateurModalProps) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<ServiceKey[]>([]);
  const [volumes, setVolumes] = useState<Record<string, number>>({});
  const [subTypes, setSubTypes] = useState<Record<string, string>>({});
  const [finition, setFinition] = useState<FinitionKey>("essentiel");
  const [entering, setEntering] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    if (open) {
      setStep(0);
      setSelected([]);
      setVolumes({});
      setSubTypes({});
      setFinition("essentiel");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const goTo = (n: number) => {
    setEntering(true);
    setTimeout(() => {
      setStep(n);
      setEntering(false);
    }, 210);
  };

  const toggleService = (key: ServiceKey) => {
    setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const getVol = (key: string) => volumes[key] ?? (key === "identite" ? 1 : 5);
  const setVol = (key: string, val: number) => {
    const clamped = Math.max(1, val);
    setVolumes((prev) => ({ ...prev, [key]: clamped }));
    setPulseKey((k) => k + 1);
  };

  /* Calcul */
  const breakdown = selected.map((key) => {
    const svc = SERVICES.find((s) => s.key === key)!;
    if (key === "identite") return { svc, qty: 1, base: 479, discountRate: 0 };
    const qty = getVol(key);
    const { base, discountRate } = calcPrice(qty, svc.unitPrice);
    return { svc, qty, base, discountRate };
  });

  const finMult = FINITIONS.find((f) => f.key === finition)!.mult;
  const subtotal = breakdown.reduce((acc, b) => acc + b.base, 0);
  const total = Math.round(subtotal * finMult);
  const surDevis = selected.some((k) => k !== "identite" && getVol(k) >= 30);

  if (!open) return null;

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(20, 6, 40, 0.60)",
        backdropFilter: "blur(22px)",
        WebkitBackdropFilter: "blur(22px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        animation: "modal-fade-in 0.22s ease both",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "680px",
          maxHeight: "92vh",
          overflowY: "auto",
          borderRadius: "28px",
          background: "linear-gradient(158deg, #FFFAF7 0%, #FDF5F0 48%, #FAF0E8 100%)",
          border: "1px solid rgba(200,155,109,0.20)",
          boxShadow: [
            "0 2px 6px rgba(0,0,0,0.04)",
            "0 30px 90px rgba(94,82,72,0.24)",
            "0 0 0 0.5px rgba(200,155,109,0.10)",
            "inset 0 1.5px 0 rgba(255,255,255,0.96)",
          ].join(", "),
          padding: "clamp(1.5rem,3.5vw,2.4rem)",
          opacity: entering ? 0 : 1,
          transform: entering ? "scale(0.96) translateY(8px)" : "scale(1) translateY(0)",
          transition: "opacity 0.21s ease, transform 0.21s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* ── Fermer ── */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: "rgba(200,155,109,0.08)",
            border: "0.5px solid rgba(200,155,109,0.22)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#5E5248",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(200,155,109,0.18)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(200,155,109,0.08)";
          }}
        >
          <X size={13} />
        </button>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "1.4rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "8.5px",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "#C89B6D",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              marginBottom: "0.45rem",
            }}
          >
            <Sparkles size={9} /> Simulateur MELIYA
          </div>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(19px,2.8vw,26px)",
              fontWeight: 600,
              color: "#5E5248",
              letterSpacing: "-0.01em",
              margin: "0 0 0.45rem",
            }}
          >
            {step === 0 && "Quel service vous intéresse ?"}
            {step === 1 && "Volume & niveau de finition"}
            {step === 2 && "Votre estimation"}
          </h2>
          <div
            style={{
              height: "1px",
              maxWidth: "70px",
              margin: "0 auto",
              background: "linear-gradient(90deg, transparent, #C89B6D, transparent)",
            }}
          />
        </div>

        <StepBar step={step} />

        {/* ══════════ STEP 0 Choix du service ══════════ */}
        {step === 0 && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {SERVICES.map((svc) => {
                const isSel = selected.includes(svc.key);
                const isHov = hovered === svc.key;
                return (
                  <div
                    key={svc.key}
                    onClick={() => toggleService(svc.key)}
                    onMouseEnter={() => setHovered(svc.key)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      borderRadius: "18px",
                      padding: "1.2rem 1.3rem",
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                      border: isSel
                        ? `2px solid ${svc.color}`
                        : isHov
                          ? `1.5px solid ${svc.colorBorder}`
                          : "1.5px solid rgba(200,155,109,0.12)",
                      background: isSel || isHov ? svc.bg : "rgba(255,255,255,0.68)",
                      boxShadow: isSel
                        ? `0 6px 26px ${svc.color}25, inset 0 1px 0 rgba(255,255,255,0.88)`
                        : isHov
                          ? `0 4px 16px ${svc.color}15, inset 0 1px 0 rgba(255,255,255,0.82)`
                          : "0 2px 8px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.78)",
                      transform: isSel
                        ? "translateY(-3px) scale(1.015)"
                        : isHov
                          ? "translateY(-1px)"
                          : "translateY(0)",
                      transition: "all 0.30s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    {/* Bande colorée en haut */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "2.5px",
                        background: `linear-gradient(90deg, transparent, ${svc.color}, transparent)`,
                        opacity: isSel ? 1 : isHov ? 0.65 : 0.25,
                        transition: "opacity 0.3s ease",
                      }}
                    />

                    {/* Coche sélection */}
                    {isSel && (
                      <div
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${svc.color} 0%, ${svc.colorMid} 100%)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: `0 3px 10px ${svc.color}55`,
                          animation: "pop-in 0.28s cubic-bezier(0.34,1.56,0.64,1) both",
                        }}
                      >
                        <span style={{ color: "white", fontSize: "10px", fontWeight: 800 }}>✓</span>
                      </div>
                    )}

                    {/* Icône lucide + emoji ludique sur hover */}
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "12px",
                        background: isSel ? `${svc.color}30` : `${svc.color}14`,
                        border: `1px solid ${isSel ? svc.color + "55" : svc.color + "22"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "0.85rem",
                        transition: "all 0.40s cubic-bezier(0.34,1.56,0.64,1)",
                        transform: isHov || isSel ? "rotate(-4deg) scale(1.05)" : "rotate(0) scale(1)",
                        position: "relative",
                      }}
                    >
                      <svc.Icon size={18} strokeWidth={1.6} style={{ color: svc.colorMid }} />
                      {/* Emoji ludique qui pop quand selected */}
                      {isSel && (
                        <span
                          aria-hidden
                          style={{
                            position: "absolute",
                            top: "-10px",
                            right: "-10px",
                            fontSize: "16px",
                            animation: "pop-in 0.42s cubic-bezier(0.34,1.56,0.64,1) both",
                            filter: "drop-shadow(0 2px 4px rgba(200,155,109,0.3))",
                          }}
                        >
                          {svc.emoji}
                        </span>
                      )}
                    </div>

                    {/* Nom */}
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#5E5248",
                        letterSpacing: "0.02em",
                        textTransform: "uppercase",
                        marginBottom: "3px",
                      }}
                    >
                      {svc.label}
                    </div>

                    {/* Sous-titre */}
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "11px",
                        color: "rgba(94,82,72,0.65)",
                        marginBottom: "0.9rem",
                        lineHeight: 1.4,
                      }}
                    >
                      {svc.sub}
                    </div>

                    {/* ── PRIX élément héro ── */}
                    <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "30px",
                          fontWeight: 600,
                          color: isSel ? svc.colorMid : "rgba(94,82,72,0.75)",
                          lineHeight: 1,
                          transition: "color 0.30s ease, transform 0.30s ease",
                          transform: isSel ? "scale(1.04)" : "scale(1)",
                          letterSpacing: "0.01em",
                        }}
                      >
                        {svc.unitPrice}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "9px",
                          fontWeight: 600,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: isSel ? svc.color : "rgba(94,82,72,0.42)",
                          transition: "color 0.30s ease",
                        }}
                      >
                        {svc.key === "identite" ? "€ forfait" : `€ / ${svc.unit}`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Indicateur sélection */}
            <div style={{ minHeight: "36px", marginTop: "0.9rem" }}>
              {selected.length === 0 ? (
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "10px",
                    color: "rgba(94,82,72,0.32)",
                    fontStyle: "italic",
                    fontFamily: "var(--font-serif)",
                    margin: 0,
                  }}
                >
                  Sélectionnez un ou plusieurs services pour continuer
                </p>
              ) : (
                <div
                  style={{
                    padding: "9px 16px",
                    borderRadius: "12px",
                    background: "rgba(200,155,109,0.06)",
                    border: "1px solid rgba(200,155,109,0.14)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: "10.5px",
                      color: "rgba(94,82,72,0.48)",
                    }}
                  >
                    {selected.length} service{selected.length > 1 ? "s" : ""} sélectionné
                    {selected.length > 1 ? "s" : ""}
                  </span>
                  <div style={{ display: "flex", gap: "5px" }}>
                    {selected.map((k) => {
                      const s = SERVICES.find((sv) => sv.key === k)!;
                      return (
                        <div
                          key={k}
                          style={{
                            width: "7px",
                            height: "7px",
                            borderRadius: "50%",
                            background: s.color,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
              <button
                onClick={() => selected.length > 0 && goTo(1)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 26px",
                  borderRadius: "100px",
                  background:
                    selected.length > 0
                      ? "linear-gradient(135deg, #C89B6D 0%, #C4A0E8 55%, #EEE0FF 100%)"
                      : "rgba(200,155,109,0.07)",
                  border:
                    selected.length > 0
                      ? "1px solid rgba(200,155,109,0.50)"
                      : "1px solid rgba(200,155,109,0.13)",
                  color: selected.length > 0 ? "#5E5248" : "rgba(94,82,72,0.28)",
                  fontFamily: "var(--font-display)",
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  cursor: selected.length > 0 ? "pointer" : "not-allowed",
                  boxShadow:
                    selected.length > 0
                      ? "0 6px 22px rgba(200,155,109,0.28), inset 0 1px 0 rgba(255,255,255,0.72)"
                      : "none",
                  transition: "all 0.28s cubic-bezier(0.22,1,0.36,1)",
                }}
                onMouseEnter={(e) => {
                  if (selected.length > 0)
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-2px) scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
                }}
              >
                Continuer <ArrowRight size={13} />
              </button>
            </div>
          </div>
        )}

        {/* ══════════ STEP 1 Volume & Finition ══════════ */}
        {step === 1 && (
          <div>
            {selected.map((key) => {
              const svc = SERVICES.find((s) => s.key === key)!;
              const vol = getVol(key);
              const isFixed = key === "identite";
              const { base, discountRate } = isFixed
                ? { base: 479, discountRate: 0 }
                : calcPrice(vol, svc.unitPrice);

              return (
                <div
                  key={key}
                  style={{
                    marginBottom: "0.9rem",
                    borderRadius: "18px",
                    border: `1.5px solid ${svc.colorBorder}`,
                    background: svc.bg,
                    padding: "1.3rem 1.4rem",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Bande top */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: `linear-gradient(90deg, transparent, ${svc.color}, transparent)`,
                    }}
                  />

                  {/* En-tête service */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1.1rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: svc.color,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#5E5248",
                          letterSpacing: "0.015em",
                        }}
                      >
                        {svc.label}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "8.5px",
                        fontWeight: 700,
                        letterSpacing: "0.10em",
                        textTransform: "uppercase",
                        color: svc.colorMid,
                        background: `${svc.color}16`,
                        border: `1px solid ${svc.color}30`,
                        padding: "3px 10px",
                        borderRadius: "100px",
                      }}
                    >
                      {svc.unitPrice} € / {svc.unit ?? "forfait"}
                    </span>
                  </div>

                  {isFixed ? (
                    /* Pack Up Identité forfait */
                    <div style={{ textAlign: "center", padding: "0.5rem 0 0.8rem" }}>
                      <div
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "56px",
                          fontWeight: 800,
                          color: svc.colorMid,
                          lineHeight: 1,
                        }}
                      >
                        479 €
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontStyle: "italic",
                          fontSize: "10.5px",
                          color: "rgba(94,82,72,0.42)",
                          marginTop: "5px",
                        }}
                      >
                        Forfait tout compris
                      </div>
                    </div>
                  ) : (
                    <div>
                      {/* ── Dropdown sous-type (slides + documents) ── */}
                      {svc.subTypes && (
                        <div style={{ marginBottom: "1.1rem" }}>
                          <label
                            style={{
                              display: "block",
                              fontFamily: "var(--font-display)",
                              fontSize: "9px",
                              letterSpacing: "0.18em",
                              textTransform: "uppercase",
                              color: "rgba(94,82,72,0.55)",
                              marginBottom: "6px",
                              fontWeight: 600,
                            }}
                          >
                            Type de {svc.unitLabel === "slide" ? "présentation" : "document"}
                          </label>
                          <select
                            value={subTypes[key] ?? svc.subTypes[0]}
                            onChange={(e) =>
                              setSubTypes((prev) => ({ ...prev, [key]: e.target.value }))
                            }
                            style={{
                              width: "100%",
                              padding: "10px 14px",
                              borderRadius: "12px",
                              border: `1px solid ${svc.colorBorder}`,
                              background: "rgba(255,255,255,0.75)",
                              fontFamily: "var(--font-body)",
                              fontSize: "13px",
                              color: "#5E5248",
                              cursor: "pointer",
                              outline: "none",
                              appearance: "none",
                              WebkitAppearance: "none",
                              backgroundImage:
                                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M1 1.5L6 6.5L11 1.5' stroke='%23C89B6D' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>\")",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 14px center",
                              paddingRight: "36px",
                              transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.borderColor = svc.color;
                              e.currentTarget.style.boxShadow = `0 0 0 3px ${svc.color}20`;
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.borderColor = svc.colorBorder;
                              e.currentTarget.style.boxShadow = "none";
                            }}
                          >
                            {svc.subTypes.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* ── Grand compteur interactif ── */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "22px",
                          marginBottom: "1rem",
                        }}
                      >
                        {/* Bouton − */}
                        <button
                          onClick={() => setVol(key, vol - 1)}
                          disabled={vol <= 1}
                          style={{
                            width: "46px",
                            height: "46px",
                            borderRadius: "50%",
                            background: vol <= 1 ? "rgba(200,155,109,0.05)" : `${svc.color}18`,
                            border: `1.5px solid ${vol <= 1 ? "rgba(200,155,109,0.10)" : svc.colorBorder}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: vol <= 1 ? "not-allowed" : "pointer",
                            color: vol <= 1 ? "rgba(94,82,72,0.22)" : "#5E5248",
                            transition: "all 0.22s ease",
                            flexShrink: 0,
                          }}
                          onMouseEnter={(e) => {
                            if (vol > 1) {
                              (e.currentTarget as HTMLElement).style.background = `${svc.color}28`;
                              (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background =
                              vol <= 1 ? "rgba(200,155,109,0.05)" : `${svc.color}18`;
                            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                          }}
                        >
                          <Minus size={18} strokeWidth={2.5} />
                        </button>

                        {/* Chiffre central */}
                        <div style={{ textAlign: "center", minWidth: "90px" }}>
                          <div
                            key={`${key}-${vol}`}
                            style={{
                              fontFamily: "var(--font-serif)",
                              fontSize: "68px",
                              fontWeight: 800,
                              color: svc.colorMid,
                              lineHeight: 1,
                              animation: "num-pop 0.20s cubic-bezier(0.34,1.56,0.64,1) both",
                            }}
                          >
                            {vol}
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "8.5px",
                              letterSpacing: "0.15em",
                              textTransform: "uppercase",
                              color: "rgba(94,82,72,0.38)",
                              marginTop: "2px",
                            }}
                          >
                            {svc.unitLabel}
                            {vol > 1 ? "s" : ""}
                          </div>
                        </div>

                        {/* Bouton + */}
                        <button
                          onClick={() => setVol(key, vol + 1)}
                          style={{
                            width: "46px",
                            height: "46px",
                            borderRadius: "50%",
                            background: `${svc.color}18`,
                            border: `1.5px solid ${svc.colorBorder}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            color: "#5E5248",
                            transition: "all 0.22s ease",
                            flexShrink: 0,
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background = `${svc.color}28`;
                            (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = `${svc.color}18`;
                            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                          }}
                        >
                          <Plus size={18} strokeWidth={2.5} />
                        </button>
                      </div>

                      {/* ── Slider visuel ── */}
                      <div style={{ padding: "0 4px", marginBottom: "1rem" }}>
                        <input
                          type="range"
                          min={1}
                          max={40}
                          step={1}
                          value={Math.min(vol, 40)}
                          onChange={(e) => setVol(key, parseInt(e.target.value, 10))}
                          className="meliya-slider"
                          style={{
                            width: "100%",
                            // Variables CSS pour styliser le track via styles.css
                            ["--slider-fill" as never]: `${(Math.min(vol, 40) / 40) * 100}%`,
                            ["--slider-color" as never]: svc.color,
                            ["--slider-color-mid" as never]: svc.colorMid,
                          }}
                          aria-label={`Nombre de ${svc.unitLabel}s`}
                        />
                        {/* Repères chiffrés discrets */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "5px",
                            padding: "0 2px",
                            fontFamily: "var(--font-display)",
                            fontSize: "9px",
                            letterSpacing: "0.08em",
                            color: "rgba(94,82,72,0.35)",
                          }}
                        >
                          <span>1</span>
                          <span>10</span>
                          <span>20</span>
                          <span>30</span>
                          <span>40+</span>
                        </div>
                      </div>

                      {/* Chips rapides */}
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                          justifyContent: "center",
                          flexWrap: "wrap",
                          marginBottom: "0.9rem",
                        }}
                      >
                        {CHIPS.map((n) => {
                          const isChip = vol === n;
                          return (
                            <button
                              key={n}
                              onClick={() => setVol(key, n)}
                              style={{
                                padding: "5px 14px",
                                borderRadius: "100px",
                                border: isChip
                                  ? `1.5px solid ${svc.color}`
                                  : "1px solid rgba(200,155,109,0.16)",
                                background: isChip ? `${svc.color}20` : "rgba(255,255,255,0.50)",
                                color: isChip ? "#5E5248" : "rgba(94,82,72,0.42)",
                                fontFamily: "var(--font-display)",
                                fontSize: "10px",
                                fontWeight: isChip ? 700 : 500,
                                letterSpacing: "0.04em",
                                cursor: "pointer",
                                transition: "all 0.20s ease",
                                transform: isChip ? "scale(1.06)" : "scale(1)",
                              }}
                            >
                              {n}
                            </button>
                          );
                        })}
                        <button
                          onClick={() => setVol(key, 35)}
                          style={{
                            padding: "5px 14px",
                            borderRadius: "100px",
                            border:
                              vol > 30
                                ? `1.5px solid ${svc.color}`
                                : "1px solid rgba(200,155,109,0.16)",
                            background: vol > 30 ? `${svc.color}20` : "rgba(255,255,255,0.50)",
                            color: vol > 30 ? "#5E5248" : "rgba(94,82,72,0.42)",
                            fontFamily: "var(--font-display)",
                            fontSize: "10px",
                            fontWeight: 500,
                            cursor: "pointer",
                            transition: "all 0.20s ease",
                          }}
                        >
                          30+
                        </button>
                      </div>

                      {/* Prix live de ce service */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          paddingTop: "0.75rem",
                          borderTop: "1px solid rgba(200,155,109,0.10)",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontStyle: "italic",
                            fontSize: "11px",
                            color: "rgba(94,82,72,0.40)",
                          }}
                        >
                          soit ≈
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "20px",
                            fontWeight: 800,
                            color: svc.colorMid,
                          }}
                        >
                          <AnimatedPrice target={Math.round(base)} />
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: 500,
                              color: "rgba(94,82,72,0.40)",
                              marginLeft: "3px",
                            }}
                          >
                            € HT
                          </span>
                        </span>
                        {discountRate > 0 && (
                          <span
                            style={{
                              padding: "2px 9px",
                              borderRadius: "100px",
                              background: "linear-gradient(135deg, #C89B6D, #D4B189)",
                              color: "#3A2010",
                              fontSize: "8px",
                              fontWeight: 700,
                              fontFamily: "var(--font-display)",
                              letterSpacing: "0.06em",
                            }}
                          >
                            −{discountRate}%
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* ── Finition ── */}
            <div
              style={{
                borderRadius: "18px",
                border: "1px solid rgba(200,155,109,0.16)",
                background: "rgba(255,255,255,0.52)",
                padding: "1.2rem 1.3rem",
                marginBottom: "0.9rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "8.5px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#C89B6D",
                  marginBottom: "0.9rem",
                }}
              >
                Niveau de finition
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                {FINITIONS.map((fin) => {
                  const isAct = finition === fin.key;
                  return (
                    <div
                      key={fin.key}
                      onClick={() => setFinition(fin.key as FinitionKey)}
                      style={{
                        borderRadius: "14px",
                        padding: "12px 10px",
                        textAlign: "center",
                        cursor: "pointer",
                        border: isAct
                          ? "1.5px solid rgba(200,155,109,0.55)"
                          : "1px solid rgba(200,155,109,0.12)",
                        background: isAct
                          ? "linear-gradient(135deg, rgba(200,155,109,0.14) 0%, rgba(239,219,195,0.12) 100%)"
                          : "transparent",
                        boxShadow: isAct ? "0 4px 18px rgba(200,155,109,0.18)" : "none",
                        transform: isAct ? "translateY(-2px)" : "translateY(0)",
                        transition: "all 0.26s cubic-bezier(0.22,1,0.36,1)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "11px",
                          fontWeight: 700,
                          color: isAct ? "#5E5248" : "rgba(94,82,72,0.50)",
                          marginBottom: "4px",
                          transition: "color 0.2s ease",
                        }}
                      >
                        {fin.label}
                      </div>
                      {fin.badge && (
                        <div
                          style={{
                            display: "inline-block",
                            padding: "1.5px 8px",
                            borderRadius: "100px",
                            background: isAct
                              ? "linear-gradient(135deg, #C89B6D, #D4B189)"
                              : "rgba(200,155,109,0.10)",
                            color: isAct ? "#3A2010" : "rgba(94,82,72,0.38)",
                            fontSize: "8px",
                            fontWeight: 700,
                            fontFamily: "var(--font-display)",
                            marginBottom: "5px",
                            letterSpacing: "0.05em",
                            transition: "all 0.22s ease",
                          }}
                        >
                          {fin.badge}
                        </div>
                      )}
                      <div
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontStyle: "italic",
                          fontSize: "9px",
                          color: "rgba(94,82,72,0.38)",
                          lineHeight: 1.35,
                        }}
                      >
                        {fin.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Total courant ── */}
            {subtotal > 0 && (
              <div
                style={{
                  borderRadius: "14px",
                  padding: "11px 18px",
                  background:
                    "linear-gradient(135deg, rgba(200,155,109,0.10) 0%, rgba(200,155,109,0.07) 100%)",
                  border: "1px solid rgba(200,155,109,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.1rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "11px",
                    color: "rgba(94,82,72,0.45)",
                  }}
                >
                  Total estimé{finition !== "essentiel" ? ` (finition ×${finMult})` : ""}
                </span>
                <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "24px",
                      fontWeight: 800,
                      color: "#5E5248",
                    }}
                  >
                    <AnimatedPrice target={total} />
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "9px",
                      color: "rgba(94,82,72,0.42)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    € HT
                  </span>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                onClick={() => goTo(0)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 18px",
                  borderRadius: "100px",
                  background: "transparent",
                  border: "1px solid rgba(200,155,109,0.18)",
                  color: "rgba(94,82,72,0.45)",
                  fontFamily: "var(--font-display)",
                  fontSize: "9.5px",
                  letterSpacing: "0.11em",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.22s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,155,109,0.38)";
                  (e.currentTarget as HTMLElement).style.color = "#5E5248";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,155,109,0.18)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(94,82,72,0.45)";
                }}
              >
                <ArrowLeft size={11} /> Retour
              </button>
              <button
                onClick={() => goTo(2)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 26px",
                  borderRadius: "100px",
                  background: "linear-gradient(135deg, #C89B6D 0%, #D4B189 50%, #E6B4AE 100%)",
                  border: "1px solid rgba(200,155,109,0.55)",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-display)",
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  cursor: "pointer",
                  boxShadow:
                    "0 6px 22px rgba(200,155,109,0.28), inset 0 1px 0 rgba(255,255,255,0.72)",
                  transition: "all 0.28s cubic-bezier(0.22,1,0.36,1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px) scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
                }}
              >
                Voir mon estimation <ArrowRight size={13} />
              </button>
            </div>
          </div>
        )}

        {/* ══════════ STEP 2 Estimation ══════════ */}
        {step === 2 && (
          <div>
            {/* Récap services */}
            <div
              style={{
                borderRadius: "18px",
                overflow: "hidden",
                border: "1px solid rgba(200,155,109,0.14)",
                marginBottom: "1.1rem",
              }}
            >
              {breakdown.map((b, i) => (
                <div
                  key={b.svc.key}
                  style={{
                    padding: "0.95rem 1.3rem",
                    borderBottom:
                      i < breakdown.length - 1 ? "1px solid rgba(200,155,109,0.10)" : "none",
                    background: i % 2 === 0 ? "rgba(255,255,255,0.72)" : "rgba(250,246,255,0.55)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        marginBottom: "2px",
                      }}
                    >
                      <div
                        style={{
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          background: b.svc.color,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "11.5px",
                          fontWeight: 700,
                          color: "#5E5248",
                        }}
                      >
                        {b.svc.label}
                      </span>
                      {b.discountRate > 0 && (
                        <span
                          style={{
                            padding: "1px 7px",
                            borderRadius: "100px",
                            background: "linear-gradient(135deg, #C89B6D, #D4B189)",
                            color: "#3A2010",
                            fontSize: "7.5px",
                            fontWeight: 700,
                            fontFamily: "var(--font-display)",
                          }}
                        >
                          −{b.discountRate}%
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: "10px",
                        color: "rgba(94,82,72,0.42)",
                        paddingLeft: "14px",
                      }}
                    >
                      {b.svc.key === "identite"
                        ? "Forfait tout compris"
                        : `${b.qty} ${b.svc.unit}${b.qty > 1 ? "s" : ""} × ${b.svc.unitPrice} €`}
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "17px",
                      fontWeight: 800,
                      color: b.svc.colorMid,
                    }}
                  >
                    {Math.round(b.base).toLocaleString("fr-FR")} €
                  </span>
                </div>
              ))}
              {finition !== "essentiel" && (
                <div
                  style={{
                    padding: "0.7rem 1.3rem",
                    background: "rgba(200,155,109,0.04)",
                    borderTop: "1px solid rgba(200,155,109,0.10)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "8.5px",
                      fontWeight: 600,
                      letterSpacing: "0.13em",
                      textTransform: "uppercase",
                      color: "#C89B6D",
                    }}
                  >
                    Finition {FINITIONS.find((f) => f.key === finition)?.label} × {finMult}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "9px",
                      color: "#C89B6D",
                      fontWeight: 700,
                    }}
                  >
                    +{Math.round((finMult - 1) * 100)} %
                  </span>
                </div>
              )}
            </div>

            {/* ── TOTAL hero ── */}
            <div
              style={{
                borderRadius: "20px",
                padding: "1.6rem 1.8rem",
                background:
                  "linear-gradient(135deg, rgba(200,155,109,0.18) 0%, rgba(200,155,109,0.13) 50%, rgba(228,200,120,0.18) 100%)",
                border: "1px solid rgba(200,155,109,0.22)",
                boxShadow:
                  "0 10px 36px rgba(200,155,109,0.10), inset 0 1.5px 0 rgba(255,255,255,0.85)",
                marginBottom: "1.1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "8px",
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(94,82,72,0.45)",
                    marginBottom: "5px",
                  }}
                >
                  {surDevis ? "Sur devis" : "Estimation totale"}
                </div>
                {surDevis ? (
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: "15px",
                      color: "#5E5248",
                    }}
                  >
                    Contactez-moi pour un devis personnalisé
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "baseline", gap: "7px" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(44px,6vw,58px)",
                        fontWeight: 800,
                        color: "#5E5248",
                        lineHeight: 1,
                      }}
                    >
                      <AnimatedPrice target={total} />
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "13px",
                        color: "rgba(94,82,72,0.50)",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      € HT
                    </span>
                  </div>
                )}
              </div>
              <Link
                to="/contact"
                onClick={onClose}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "13px 20px",
                  borderRadius: "100px",
                  flexShrink: 0,
                  background: "linear-gradient(135deg, #F6E6B8 0%, #C89B6D 100%)",
                  color: "#3A2614",
                  fontFamily: "var(--font-display)",
                  fontSize: "9.5px",
                  letterSpacing: "0.14em",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  textDecoration: "none",
                  border: "1px solid #C89B6D",
                  boxShadow:
                    "0 8px 25px rgba(230,180,174,0.10), inset 0 0.5px 0 rgba(255,255,255,0.55)",
                  transition: "all 0.28s cubic-bezier(0.22,1,0.36,1)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-1px) scale(1.02)";
                  el.style.background = "linear-gradient(135deg, #E6B4AE, #B0875A)";
                  el.style.color = "#FFFFFF";
                  el.style.borderColor = "#B0875A";
                  el.style.boxShadow = "0 12px 35px rgba(176,135,90,0.22)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0) scale(1)";
                  el.style.background = "linear-gradient(135deg, #F6E6B8 0%, #C89B6D 100%)";
                  el.style.color = "#3A2614";
                  el.style.borderColor = "#C89B6D";
                  el.style.boxShadow =
                    "0 8px 25px rgba(230,180,174,0.10), inset 0 0.5px 0 rgba(255,255,255,0.55)";
                }}
              >
                Demander mon devis <ArrowRight size={12} />
              </Link>
            </div>

            {/* Bas de page */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                onClick={() => goTo(1)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 18px",
                  borderRadius: "100px",
                  background: "transparent",
                  border: "1px solid rgba(200,155,109,0.18)",
                  color: "rgba(94,82,72,0.45)",
                  fontFamily: "var(--font-display)",
                  fontSize: "9.5px",
                  letterSpacing: "0.11em",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.22s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,155,109,0.38)";
                  (e.currentTarget as HTMLElement).style.color = "#5E5248";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,155,109,0.18)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(94,82,72,0.45)";
                }}
              >
                <ArrowLeft size={11} /> Modifier
              </button>
              <p
                style={{
                  fontSize: "9px",
                  color: "rgba(94,82,72,0.32)",
                  fontStyle: "italic",
                  fontFamily: "var(--font-serif)",
                  margin: 0,
                }}
              >
                Estimation indicative devis personnalisé sous 24h
              </p>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
