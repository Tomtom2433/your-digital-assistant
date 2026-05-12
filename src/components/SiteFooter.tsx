import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[color:var(--gold)]/30 bg-[#071735] text-[#F7F4EF]">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="display text-xl mb-3" style={{color:"#CFA27A"}}>MELIYA</h3>
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
      <div className="text-center text-xs opacity-60 pb-6">© {new Date().getFullYear()} MELIYA — Tous droits réservés</div>
    </footer>
  );
}
