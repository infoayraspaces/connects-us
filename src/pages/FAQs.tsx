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
      { q: "¿Qué es un coliving?", a: "Un coliving es un espacio de vida compartida donde tienes tu habitación privada (o apartaestudio independiente) y compartes áreas comunes como cocina, sala, coworking y terraza. Es vivir en comunidad de forma intencional, perfecta para profesionales y nómadas digitales." },
      { q: "¿Cuál es la diferencia con un apartamento compartido tradicional?", a: "En AYRA, además del espacio físico, ofrecemos una comunidad activa con eventos, soporte, mantenimiento incluido y una filosofía de vida. Todo está incluido en el precio: servicios, internet de alta velocidad, limpieza de áreas comunes. No es solo compartir techo, es compartir experiencias." },
      { q: "¿Para quién es AYRA?", a: "Para profesionales jóvenes, nómadas digitales, emprendedores, personas que llegan nuevas a Bogotá y cualquier persona que valore la comunidad, la comodidad y un estilo de vida todo incluido. Nuestros residentes vienen de toda Colombia y del mundo." },
      { q: "¿Qué diferencia a AYRA de otros colivings?", a: "Somos honestos y transparentes: lo que ves es lo que obtienes. Sin sorpresas, sin costos ocultos. Además, cada sede tiene su personalidad propia, espacios bien diseñados y una comunidad real, no solo un grupo de WhatsApp." },
    ],
  },
  {
    category: "Precios y estadía",
    items: [
      { q: "¿Cuál es la estadía mínima?", a: "La estadía mínima es de 1 mes. Ofrecemos flexibilidad para extender tu estadía y descuentos para compromisos de 3, 6 y 12 meses." },
      { q: "¿Qué incluye exactamente el precio?", a: "TODO. Servicios públicos (agua, luz, gas, internet de fibra óptica de alta velocidad), limpieza de áreas comunes dos veces por semana, mantenimiento, acceso al coworking, eventos comunitarios y soporte de nuestro equipo. Solo pagas una vez al mes y te olvidas de todo lo demás." },
      { q: "¿Necesito fiador o codeudor?", a: "No necesitas fiador ni codeudor. Solo pedimos un depósito de seguridad equivalente a un mes de renta, que se devuelve completamente al finalizar tu estadía si todo está en orden." },
      { q: "¿Los precios suben durante mi estadía?", a: "Si renuevas tu estadía antes de que termine tu periodo actual, mantenemos el mismo precio durante tu primera renovación. Después podemos ajustar según el mercado, pero siempre con previo aviso." },
      { q: "¿Hay descuentos por estadías largas?", a: "Sí, ofrecemos descuentos para compromisos de 3 meses (5%), 6 meses (8%) y 12 meses (12%). Entre más tiempo te quedes, más ahorras." },
      { q: "¿Aceptan extranjeros?", a: "¡Por supuesto! Tenemos residentes de muchos países. Solo necesitas un pasaporte válido y listo." },
    ],
  },
  {
    category: "Vida diaria y convivencia",
    items: [
      { q: "¿Puedo llevar mascotas?", a: "Aceptamos mascotas pequeñas (menos de 10kg) en algunas de nuestras sedes, con un depósito adicional de $200.000 COP. Consulta disponibilidad por sede." },
      { q: "¿Puedo recibir visitas?", a: "Sí, puedes recibir visitas durante el día sin problema. Para estadías nocturnas de invitados, tenemos una política que permite hasta 2 noches al mes sin costo adicional." },
      { q: "¿Cómo es la convivencia?", a: "Tenemos acuerdos de convivencia claros que todos firmamos al ingresar. Respeto, limpieza y consideración son la base. Además, contamos con un community manager que facilita la vida en común y organiza eventos." },
      { q: "¿Hay reglas de ruido?", a: "Sí, mantenemos horarios de silencio de 10pm a 7am para garantizar el descanso de todos. Durante el día puedes trabajar, conversar y disfrutar normalmente." },
      { q: "¿Cómo funciona la limpieza?", a: "Las áreas comunes (cocina, salas, baños compartidos, coworking) se limpian dos veces por semana por personal profesional. Tu habitación o apartaestudio es tu responsabilidad." },
      { q: "¿Hay eventos o actividades?", a: "Sí, organizamos eventos regulares: cenas comunitarias, talleres, charlas, salidas grupales y más. La participación es totalmente voluntaria." },
    ],
  },
  {
    category: "Proceso de ingreso",
    items: [
      { q: "¿Cómo puedo aplicar?", a: "Primero, agenda un tour por nuestra web, WhatsApp o Instagram para conocer la sede que te interesa. Después de la visita, si decides unirte, completamos un breve proceso de aplicación online que toma menos de 24 horas." },
      { q: "¿Cuánto tarda el proceso desde el tour hasta la mudanza?", a: "Puede ser tan rápido como 48 horas si hay disponibilidad inmediata. Normalmente toma entre 3-5 días para coordinar todo." },
      { q: "¿Puedo elegir mi habitación?", a: "Sí, durante el tour te mostramos las opciones disponibles (tipos de habitación, piso, vista) y tú eliges la que más te guste según disponibilidad." },
      { q: "¿Qué documentos necesito?", a: "Solo necesitas cédula (si eres colombiano) o pasaporte (si eres extranjero), y un método de pago (cuenta bancaria o tarjeta de crédito)." },
      { q: "¿Puedo mudarme antes de que termine el mes?", a: "Sí, puedes mudarte cualquier día del mes. El pago se prorratea según los días que vas a estar." },
    ],
  },
  {
    category: "Servicios e instalaciones",
    items: [
      { q: "¿Qué tan rápido es el internet?", a: "Tenemos fibra óptica de alta velocidad en todas las sedes (300-500 Mbps). Perfecto para trabajar en remoto, videollamadas, streaming y gaming." },
      { q: "¿Las habitaciones están amobladas?", a: "Sí, todas las habitaciones vienen completamente amobladas: cama, escritorio, silla, closet, TV. Solo trae tu ropa y laptop." },
      { q: "¿Hay espacios para trabajar desde casa?", a: "Sí, todas nuestras sedes tienen zonas de coworking compartidas, y cada habitación tiene su propio escritorio. Además, el internet es excelente." },
      { q: "¿Puedo cocinar?", a: "Sí, todas las cocinas están completamente equipadas (estufa, horno, microondas, nevera, utensilios). Cada residente tiene su espacio en la nevera y alacenas." },
      { q: "¿Hay lavandería?", a: "Sí, todas las sedes tienen lavadora. Es uso compartido y gratuito para los residentes." },
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
