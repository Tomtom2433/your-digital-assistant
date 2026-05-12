import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — MELIYA" },
      { name: "description", content: "Contactez Mélody Roche, MELIYA, pour discuter de votre projet de structuration de documents." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
      <div className="text-center mb-14">
        <span className="text-xs tracking-[0.25em] uppercase text-[color:var(--gold)]">Échangeons</span>
        <h1 className="display text-4xl md:text-5xl mt-3 text-[#071735]">Contact</h1>
        <div className="gold-divider mt-4 max-w-xs mx-auto" />
        <p className="serif italic text-xl text-[#0D2B6B]/80 mt-6 max-w-2xl mx-auto">
          Parlez-moi de votre projet — je vous réponds sous 24h.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_1.5fr] gap-8">
        <div className="space-y-4">
          <div className="card-meliya">
            <Mail className="h-6 w-6 mb-3" style={{color:"#CFA27A"}} />
            <div className="text-xs uppercase tracking-widest text-[#071735]/60">Email</div>
            <div className="display text-base text-[#071735]">contact@meliya.fr</div>
          </div>
          <div className="card-meliya">
            <Phone className="h-6 w-6 mb-3" style={{color:"#CFA27A"}} />
            <div className="text-xs uppercase tracking-widest text-[#071735]/60">Téléphone</div>
            <div className="display text-base text-[#071735]">Sur rendez-vous</div>
          </div>
          <div className="card-meliya">
            <MapPin className="h-6 w-6 mb-3" style={{color:"#CFA27A"}} />
            <div className="text-xs uppercase tracking-widest text-[#071735]/60">Localisation</div>
            <div className="display text-base text-[#071735]">100% à distance — France</div>
          </div>
        </div>

        <form
          className="card-meliya space-y-4"
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        >
          <h2 className="display text-2xl text-[#071735] mb-2">Votre projet</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <input required placeholder="Prénom & Nom" className="w-full px-4 py-3 rounded-lg border border-[#CFA27A]/40 bg-white focus:outline-none focus:ring-2 focus:ring-[#CFA27A]" />
            <input required type="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg border border-[#CFA27A]/40 bg-white focus:outline-none focus:ring-2 focus:ring-[#CFA27A]" />
          </div>
          <select className="w-full px-4 py-3 rounded-lg border border-[#CFA27A]/40 bg-white focus:outline-none focus:ring-2 focus:ring-[#CFA27A]">
            <option>Type de prestation</option>
            <option>Mise en forme de slides</option>
            <option>Mise en forme de pages</option>
            <option>Pack visuel — démarrage</option>
            <option>Sur-mesure</option>
          </select>
          <textarea required rows={5} placeholder="Décrivez votre projet…" className="w-full px-4 py-3 rounded-lg border border-[#CFA27A]/40 bg-white focus:outline-none focus:ring-2 focus:ring-[#CFA27A]" />
          <button type="submit" className="btn-primary-meliya w-full justify-center">
            <Send className="h-4 w-4" /> Envoyer ma demande
          </button>
          {sent && (
            <p className="text-sm text-center text-[#0D2B6B] mt-2">
              ✨ Merci ! Votre message a été pris en compte. Réponse sous 24h.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
