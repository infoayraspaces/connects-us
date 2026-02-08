import { useParams, Link } from "react-router-dom";
import { MapPin, Check, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { locations } from "@/data/locations";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
const LocationDetail = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const location = locations.find(l => l.id === id);
  if (!location) {
    return <Layout>
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="font-heading text-3xl mb-4">Ubicación no encontrada</h1>
          <Link to="/ubicaciones" className="text-primary font-semibold">
            Ver todas las ubicaciones
          </Link>
        </div>
      </Layout>;
  }
  return <Layout>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px]">
        <img src={location.image} alt={location.name} className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 lg:px-8 pb-12">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }}>
              <Link to="/ubicaciones" className="inline-flex items-center gap-2 text-sm text-background/80 hover:text-background mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Todas las ubicaciones
              </Link>
              <div className="flex items-center gap-2 text-background/80 text-sm mb-2">
                <MapPin className="w-4 h-4" />
                {location.address}
              </div>
              <h1 className="font-heading text-4xl md:text-5xl text-background mb-2">
                {location.name}
              </h1>
              <p className="text-xl text-background/80 italic">{location.tagline}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl text-foreground mb-4">Sobre este espacio</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{location.description}</p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {location.gallery.map((img, i) => <motion.div key={i} initial={{
            opacity: 0,
            scale: 0.95
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.4,
            delay: i * 0.1
          }} className="rounded-xl overflow-hidden">
                <img src={img} alt={`${location.name} - imagen ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 bg-warm">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-heading text-2xl text-foreground mb-8">Amenidades</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {location.amenities.map(amenity => <div key={amenity} className="flex items-center gap-3 bg-background rounded-lg p-4">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">{amenity}</span>
              </div>)}
          </div>
        </div>
      </section>

      {/* Room types */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-heading text-2xl text-foreground mb-8">Tipos de habitación</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {location.roomTypes.map(room => <div key={room.name} className="border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
                <h3 className="font-heading text-xl text-foreground mb-2">{room.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{room.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-muted-foreground">Desde</span>
                  <span className="font-semibold text-lg text-accent">{room.priceFrom}</span>
                  <span className="text-sm text-muted-foreground">/ mes</span>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-warm">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-heading text-2xl text-foreground mb-8">Preguntas frecuentes</h2>
          <div className="max-w-2xl">
            <Accordion type="single" collapsible>
              {location.faqs.map((faq, i) => <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-body font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>)}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading text-3xl text-primary-foreground mb-4">
            ¿Te gustaría conocer {location.name}?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-lg mx-auto">
            Agenda una visita y descubre tu próximo hogar en {location.neighborhood}.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/contacto">Agenda un tour</Link>
          </Button>
        </div>
      </section>
    </Layout>;
};
export default LocationDetail;