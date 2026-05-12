import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[color:var(--gold)]/30 bg-[#FDF5F7] text-[#071735]">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="display text-4xl md:text-5xl mb-3" style={{color:"#CFA27A"}}>MELIYA</h3>
          <p className="text-sm opacity-80 serif italic">L'élégance au service de vos documents.</p>
        </div>
        <div>
          <h4 className="display text-sm tracking-widest mb-3" style={{color:"#CFA27A"}}>Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/prestations" className="hover:text-[#CFA27A]">Prestations</Link></li>
            <li><Link to="/a-propos" className="hover:text-[#CFA27A]">À Propos</Link></li>
            <li><Link to="/faq" className="hover:text-[#CFA27A]">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-[#CFA27A]">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="display text-sm tracking-widest mb-3" style={{color:"#CFA27A"}}>Contact</h4>
          <p className="text-sm opacity-80">Mélody Roche<br/>Assistante digitale spécialisée</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 pb-6 px-6">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] opacity-70">
          <Link to="/mentions-legales" className="hover:text-[#CFA27A]">Mentions légales</Link>
          <span aria-hidden>·</span>
          <Link to="/mentions-legales" hash="confidentialite" className="hover:text-[#CFA27A]">Politique de confidentialité</Link>
          <span aria-hidden>·</span>
          <Link to="/mentions-legales" hash="cgv" className="hover:text-[#CFA27A]">CGV</Link>
        </div>
        <div className="text-center text-xs opacity-60">© {new Date().getFullYear()} MELIYA — Tous droits réservés</div>
      </div>
    </footer>
  );
}
