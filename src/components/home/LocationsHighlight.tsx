import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { locations } from "@/data/locations";

const LocationsHighlight = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-body font-semibold uppercase tracking-widest text-accent mb-3 block">
            Nuestras sedes
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
            Tres barrios, una comunidad
          </h2>
          <p className="text-muted-foreground text-lg">
            Cada sede tiene su personalidad, pero todas comparten los mismos valores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Link
                to={`/ubicaciones/${loc.id}`}
                className="group block rounded-xl overflow-hidden bg-card hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-6">
                    <div className="flex items-center gap-1.5 text-background/80 text-sm mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {loc.neighborhood}
                    </div>
                    <h3 className="font-heading text-2xl text-background">{loc.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{loc.tagline}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                    Conocer más <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationsHighlight;
