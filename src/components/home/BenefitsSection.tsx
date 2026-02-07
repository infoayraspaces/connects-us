import { Users, Leaf, Wifi, ShieldCheck, Sun, Droplets } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Users,
    title: "Comunidad real",
    description: "Cenas compartidas, eventos y conexiones que duran. Aquí nadie vive solo.",
  },
  {
    icon: Leaf,
    title: "Sostenibilidad",
    description: "Paneles solares, recolección de agua lluvia y huertas urbanas en cada sede.",
  },
  {
    icon: Wifi,
    title: "Productividad",
    description: "Coworking 24/7, WiFi de alta velocidad y espacios diseñados para enfocarte.",
  },
  {
    icon: ShieldCheck,
    title: "Todo incluido",
    description: "Servicios, limpieza, mantenimiento y comunidad. Un solo pago, cero preocupaciones.",
  },
  {
    icon: Sun,
    title: "Bienestar",
    description: "Yoga, meditación, jardines y espacios pensados para tu salud mental.",
  },
  {
    icon: Droplets,
    title: "Flexibilidad",
    description: "Estadías desde 1 mes, sin fiador ni procesos complicados. Llega y vive.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const BenefitsSection = () => {
  return (
    <section className="py-24 bg-warm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-body font-semibold uppercase tracking-widest text-accent mb-3 block">
            ¿Por qué AYRA?
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
            Más que un lugar para vivir
          </h2>
          <p className="text-muted-foreground text-lg">
            Diseñamos cada espacio y experiencia para que tu vida en Bogotá sea extraordinaria.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={item}
              className="bg-background rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl text-foreground mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
