import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import logoIcon from "@/assets/meliya-logo-icon.png";
import wordmark from "@/assets/meliya-wordmark.png";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { to: "/a-propos", label: "Qui est MELIYA ?" },
  { to: "/prestations", label: "Prestations" },
  { to: "/contact", label: "Votre projet" },
  { to: "/faq", label: "FAQ" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[color:var(--background)]/85 border-b border-[color:var(--gold)]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
        <div className="flex flex-col items-start shrink-0" style={{ background: "transparent" }}>
          <Link
            to="/"
            style={{ height: "80px", display: "flex", alignItems: "center" }}
          >
            <img
              src={wordmark}
              alt="MELIYA"
              style={{ height: "80px", width: "auto", minHeight: "80px" }}
            />
          </Link>
          <Link
            to="/"
            className="serif italic text-[11px] md:text-[12px] mt-1 ml-2 transition-colors"
            style={{ color: "#CFA27A" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#D8B07A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#CFA27A")}
          >
            Retour à la page d'accueil ↩
          </Link>
        </div>

        <nav className="hidden md:flex items-center justify-center gap-3 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="nav-pill"
              activeProps={{ "data-active": "true" } as any}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 shrink-0" style={{ marginLeft: "40px" }}>
          <ThemeToggle />
          <Link to="/simulateur" className="btn-blink shrink-0">
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Simulateur</span>
            <span className="sm:hidden">Simu</span>
          </Link>
        </div>
      </div>

      {/* Mobile nav */}
      <nav className="md:hidden flex items-center gap-2 overflow-x-auto px-4 pb-3">
        {navItems.map((item) => (
          <Link key={item.to} to={item.to} className="nav-pill text-[0.7rem]" activeProps={{ "data-active": "true" } as any}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
