import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Leaf, Calendar, Users, Utensils, BookOpen } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import communityImg from "@/assets/community.jpg";

const values = [
  {
    icon: Heart,
    title: "Conexión humana",
    description: "Creemos que las mejores experiencias suceden cuando las compartes. Fomentamos relaciones genuinas entre residentes.",
  },
  {
    icon: Leaf,
    title: "Sostenibilidad real",
    description: "No es un eslogan. Es nuestra práctica diaria: energía solar, reuso de agua lluvia, huertas urbanas y compostaje.",
  },
  {
    icon: Users,
    title: "Diversidad",
    description: "Colombianos, extranjeros, creativos, ingenieros, emprendedores. La diversidad es nuestra riqueza.",
  },
];

const events = [
  { icon: Utensils, title: "Cenas comunitarias", frequency: "Cada semana", description: "Cocina un residente diferente, todos disfrutan." },
  { icon: Calendar, title: "Talleres y charlas", frequency: "Quincenal", description: "Desde finanzas personales hasta cerámica." },
  { icon: BookOpen, title: "Club de lectura", frequency: "Mensual", description: "Un libro, muchas perspectivas." },
];

const Community = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px]">
        <img
          src={communityImg}
          alt="Comunidad AYRA compartiendo una cena"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-4xl md:text-5xl text-background mb-4">
              Nuestra comunidad
            </h1>
            <p className="text-background/80 text-lg max-w-md mx-auto">
              Más que vecinos: una familia que eliges.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-body font-semibold uppercase tracking-widest text-accent mb-3 block">
              Nuestros valores
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground">
              Lo que nos define
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
                  <v.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-heading text-xl text-foreground mb-3">{v.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-20 bg-warm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-body font-semibold uppercase tracking-widest text-accent mb-3 block">
              Vida en AYRA
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground">
              Siempre pasa algo bueno
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background rounded-xl p-8"
              >
                <e.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-heading text-xl text-foreground mb-1">{e.title}</h3>
                <p className="text-accent text-sm font-semibold mb-3">{e.frequency}</p>
                <p className="text-muted-foreground">{e.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-center">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-heading text-3xl text-primary-foreground mb-4">
            Sé parte de la comunidad
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-lg mx-auto">
            Ven a conocernos. La mejor forma de entender AYRA es vivirla.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/contacto">Agenda un tour</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Community;
