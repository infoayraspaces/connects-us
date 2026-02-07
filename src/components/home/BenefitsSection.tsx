import { Users, Leaf, Wifi, ShieldCheck, Droplets } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Users,
    title: "Comunidad real",
    description: "Aquí nadie vive solo. Una convivencia natural entre personas que se apoyan en el día a día.",
  },
  {
    icon: Leaf,
    title: "Sostenibilidad",
    description: "Sistemas de recolección de agua lluvia y prácticas responsables en cada sede.",
  },
  {
    icon: Wifi,
    title: "Productividad",
    description: "Internet de fibra óptica de alta velocidad y espacios diseñados para que puedas enfocarte.",
  },
  {
    icon: ShieldCheck,
    title: "Todo incluido",
    description: "Servicios, limpieza, mantenimiento y comunidad. Un solo pago, cero preocupaciones.",
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
            Lo que incluye vivir en AYRA
          </h2>
          <p className="text-muted-foreground text-lg">
            Todo pensado para que llegues y vivas, sin preocuparte por nada más.
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
