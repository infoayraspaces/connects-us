import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    category: "Sobre el coliving",
    items: [
      { q: "¿Qué es un coliving?", a: "Un coliving es un espacio de vida compartida donde tienes tu habitación privada y compartes áreas comunes como cocina, sala, coworking y terraza. Es vivir en comunidad de forma intencional." },
      { q: "¿Cuál es la diferencia con un apartamento compartido?", a: "En AYRA, además del espacio físico, ofrecemos una comunidad activa con eventos, soporte, mantenimiento y una filosofía de vida. No es solo compartir techo, es compartir experiencias." },
      { q: "¿Para quién es AYRA?", a: "Para profesionales jóvenes, nómadas digitales, emprendedores y cualquier persona que valore la comunidad, la sostenibilidad y un estilo de vida con propósito." },
    ],
  },
  {
    category: "Precios y estadía",
    items: [
      { q: "¿Cuál es la estadía mínima?", a: "La estadía mínima es de 1 mes. Ofrecemos descuentos para estadías de 3, 6 y 12 meses." },
      { q: "¿Qué incluye el precio?", a: "Todo. Servicios públicos (agua, luz, gas, internet de alta velocidad), limpieza de áreas comunes, mantenimiento, acceso al coworking y eventos comunitarios." },
      { q: "¿Necesito fiador o depósito?", a: "No necesitas fiador. Solo pedimos un depósito equivalente a un mes que se devuelve al finalizar tu estadía." },
      { q: "¿Los precios suben?", a: "Si renuevas tu estadía, mantenemos el mismo precio durante tu primera renovación." },
    ],
  },
  {
    category: "Vida diaria",
    items: [
      { q: "¿Puedo llevar mascotas?", a: "Aceptamos mascotas pequeñas (menos de 10kg) en algunas de nuestras sedes, con un pequeño depósito adicional." },
      { q: "¿Puedo recibir visitas?", a: "Sí, puedes recibir visitas durante el día. Para estadías nocturnas de invitados, tenemos una política de visitantes que se comparte al ingresar." },
      { q: "¿Cómo es la convivencia?", a: "Tenemos acuerdos de convivencia claros que todos firmamos. Respeto, limpieza y consideración son la base. Además, contamos con un community manager que facilita la vida en comunidad." },
      { q: "¿Hay reglas de ruido?", a: "Sí, mantenemos horarios de silencio (10pm - 7am) para garantizar el descanso de todos." },
    ],
  },
  {
    category: "Proceso de ingreso",
    items: [
      { q: "¿Cómo puedo aplicar?", a: "Agenda un tour por nuestra web o WhatsApp. Después de la visita, si decides unirte, completamos un breve proceso de aplicación y listo." },
      { q: "¿Cuánto tarda el proceso?", a: "Desde tu tour hasta la mudanza puede ser tan rápido como 48 horas, dependiendo de la disponibilidad." },
      { q: "¿Puedo elegir mi habitación?", a: "Sí, durante el tour te mostramos las opciones disponibles y tú eliges la que más te guste." },
    ],
  },
];

const FAQs = () => {
  return (
    <Layout>
      <section className="py-20 bg-warm">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-body font-semibold uppercase tracking-widest text-accent mb-3 block">
              FAQ
            </span>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
              Preguntas frecuentes
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Todo lo que necesitas saber sobre vivir en AYRA.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          {faqs.map((section, si) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: si * 0.1 }}
              className="mb-12"
            >
              <h2 className="font-heading text-2xl text-foreground mb-6">{section.category}</h2>
              <Accordion type="single" collapsible>
                {section.items.map((item, i) => (
                  <AccordionItem key={i} value={`${si}-${i}`}>
                    <AccordionTrigger className="text-left font-body font-medium text-foreground">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default FAQs;
