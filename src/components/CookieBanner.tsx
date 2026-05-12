import { useEffect, useState } from "react";

const STORAGE_KEY = "meliya-cookie-consent";
const STORAGE_DATE_KEY = "meliya-cookie-consent-date";
const MAX_AGE_MS = 13 * 30 * 24 * 60 * 60 * 1000; // ~13 mois

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const choice = localStorage.getItem(STORAGE_KEY);
      const dateStr = localStorage.getItem(STORAGE_DATE_KEY);
      const expired = dateStr ? Date.now() - parseInt(dateStr, 10) > MAX_AGE_MS : true;
      if (!choice || expired) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const record = (value: "accepted" | "refused") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
      localStorage.setItem(STORAGE_DATE_KEY, String(Date.now()));
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consentement aux cookies"
      className="fixed bottom-4 left-4 right-4 md:left-6 md:right-6 z-[100] mx-auto max-w-4xl rounded-xl border border-[color:var(--gold)]/40 bg-[#071735] text-[#F7F4EF] shadow-2xl"
    >
      <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4">
        <p className="text-sm leading-relaxed flex-1 serif whitespace-pre-line">
          {"Ce site utilise des cookies pour améliorer votre expérience.\nCertains cookies sont nécessaires au fonctionnement du site, d'autres nous aident à mesurer l'audience."}
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => record("accepted")}
            className="px-4 py-2 rounded-md border border-[#CFA27A] bg-[#CFA27A] text-[#071735] text-xs tracking-widest uppercase font-medium hover:opacity-90 transition"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Tout accepter
          </button>
          <button
            onClick={() => record("refused")}
            className="px-4 py-2 rounded-md border border-[#CFA27A] bg-[#CFA27A] text-[#071735] text-xs tracking-widest uppercase font-medium hover:opacity-90 transition"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Tout refuser
          </button>
        </div>
      </div>
    </div>
  );
}
