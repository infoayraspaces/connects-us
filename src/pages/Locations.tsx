import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { locations } from "@/data/locations";

const Locations = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-warm">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-body font-semibold uppercase tracking-widest text-accent mb-3 block">
              Nuestras sedes
            </span>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
              Encuentra tu AYRA ideal
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Tres ubicaciones únicas en Bogotá, cada una con su propia esencia pero unidas por los mismos valores.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Locations grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-16">
            {locations.map((loc, i) => (
              <motion.div
                key={loc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${i % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}
              >
                <div className={i % 2 !== 0 ? "lg:col-start-2" : ""}>
                  <Link to={`/ubicaciones/${loc.id}`} className="block rounded-xl overflow-hidden group">
                    <img
                      src={loc.image}
                      alt={loc.name}
                      className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </Link>
                </div>
                <div className={i % 2 !== 0 ? "lg:col-start-1" : ""}>
                  <div className="flex items-center gap-2 text-accent text-sm font-semibold mb-3">
                    <MapPin className="w-4 h-4" />
                    {loc.neighborhood}, Bogotá
                  </div>
                  <h2 className="font-heading text-3xl text-foreground mb-2">{loc.name}</h2>
                  <p className="text-lg text-muted-foreground italic mb-4">{loc.tagline}</p>
                  <p className="text-muted-foreground leading-relaxed mb-6">{loc.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {loc.amenities.slice(0, 5).map((a) => (
                      <span key={a} className="text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full">
                        {a}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Desde <span className="font-semibold text-foreground">{loc.roomTypes[loc.roomTypes.length - 1].priceFrom}</span> / mes
                  </p>
                  <Link
                    to={`/ubicaciones/${loc.id}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                  >
                    Ver detalles <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Locations;
