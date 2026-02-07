import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Inicio", to: "/" },
  { label: "Ubicaciones", to: "/ubicaciones" },
  { label: "Comunidad", to: "/comunidad" },
  { label: "Preguntas", to: "/preguntas" },
  { label: "Contacto", to: "/contacto" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="font-heading text-2xl tracking-wide text-primary">
          AYRA
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button variant="hero" size="lg" asChild>
            <Link to="/contacto">Agenda un tour</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border">
          <ul className="flex flex-col px-4 py-4 gap-3">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block py-2 text-base font-medium transition-colors",
                    location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Button variant="hero" size="lg" className="w-full" asChild>
                <Link to="/contacto" onClick={() => setOpen(false)}>
                  Agenda un tour
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
