import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-heading text-3xl mb-4">AYRA</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Coliving con propósito en Bogotá. Comunidad, sostenibilidad y bienestar en cada espacio.
            </p>
            
            {/* Redes Sociales */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-primary-foreground mb-3">Síguenos</p>
              <div className="flex items-center gap-3">
                
                  href="https://www.instagram.com/ayra.spaces"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-all group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-primary-foreground group-hover:scale-110 transition-transform" />
                </a>

                
                  href="https://www.facebook.com/profile.php?id=61587665052443"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-all group"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-primary-foreground group-hover:scale-110 transition-transform" />
                </a>

                
                  href="mailto:info@ayracoliving.com"
                  className="w-11 h-11 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-all group"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5 text-primary-foreground group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-body font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/60">
              Explorar
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Ubicaciones", to: "/ubicaciones" },
                { label: "Comunidad", to: "/comunidad" },
                { label: "Preguntas frecuentes", to: "/preguntas" },
                { label: "Contacto", to: "/contacto" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-body font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/60">
              Ubicaciones
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Modelia", to: "/ubicaciones/modelia" },
                { label: "Teusaquillo", to: "/ubicaciones/teusaquillo" },   
                { label: "Ferias", to: "/ubicaciones/ferias" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/60">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li>info@ayracoliving.com</li>
              <li>+57 302 836 6373</li>
              <li>Bogotá, Colombia</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-sm text-primary-foreground/60">
            © 2025 AYRA Coliving. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
