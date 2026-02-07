import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-24 bg-primary">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-heading text-3xl md:text-4xl text-primary-foreground mb-4">
            ¿Listo para vivir diferente?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            Agenda un tour y descubre cómo es vivir en comunidad. Sin compromisos, solo una visita para que veas si AYRA es para ti.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contacto">Agenda un tour</Link>
            </Button>
            <Button
              variant="hero-outline"
              size="xl"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <a
                href="https://wa.me/573001234567?text=Hola%2C%20quiero%20saber%20más%20sobre%20AYRA%20Coliving"
                target="_blank"
                rel="noopener noreferrer"
              >
                Escríbenos por WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
