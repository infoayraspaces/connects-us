import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-coliving.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Comunidad AYRA Coliving en Bogotá"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-foreground/50" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="inline-block text-sm font-body font-semibold uppercase tracking-widest text-accent mb-4">
            Coliving en Bogotá
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-background leading-tight mb-6">
            Llega a Bogotá y vive sin complicaciones
          </h1>
          <p className="text-lg md:text-xl text-background/85 font-body leading-relaxed mb-8 max-w-xl">
            Espacios completamente equipados, seguros y con todo incluido. Para profesionales que llegan a Bogotá y quieren un hogar de verdad, no un lugar temporal.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contacto">Agenda un tour</Link>
            </Button>
            <Button variant="hero-outline" size="xl" className="border-background text-background hover:bg-background hover:text-foreground" asChild>
              <Link to="/ubicaciones">Ver ubicaciones</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
