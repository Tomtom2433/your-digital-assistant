import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import logoIcon from "@/assets/meliya-logo-icon.png";
import wordmark from "@/assets/meliya-wordmark.png";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { to: "/a-propos", label: "Qui est MELIYA ?" },
  { to: "/prestations", label: "Prestations" },
  { to: "/contact", label: "Parlons de votre projet" },
  { to: "/faq", label: "FAQ" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[color:var(--background)]/85 border-b border-[color:var(--gold)]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-1 shrink-0">
          <img src={wordmark} alt="MELIYA" className="h-20 md:h-28 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-2">
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

        <div className="flex items-center gap-2 shrink-0">
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
