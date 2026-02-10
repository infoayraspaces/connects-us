import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Check, ArrowLeft, ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { locations, RoomType } from "@/data/locations";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import NeighborhoodSection from "@/components/NeighborhoodSection";
const LocationDetail = () => {
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
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

      {/* Description + Virtual Tour */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl text-foreground mb-4">Sobre este espacio</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{location.description}</p>
            {location.virtualTourUrl && (
              <Button variant="outline" className="mt-6" asChild>
                <a href={location.virtualTourUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" /> Tour virtual
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 bg-warm">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-heading text-2xl text-foreground mb-8">Amenidades</h2>
          <div className="grid grid-cols-2 md:grid-cols -3 lg:grid-cols-5 gap-4 mb-8">
            {location.amenities.map(amenity => <div key={amenity} className="flex items-center gap-3 bg-background rounded-lg p-4">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">{amenity}</span>
              </div>)}
          </div>
          {/* Amenity image gallery */}
          {location.amenityImages && location.amenityImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {location.amenityImages.map((img, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="rounded-xl overflow-hidden aspect-[4/3] cursor-pointer" onClick={() => setLightboxIndex(i)}>
                  <img src={img} alt={`${location.name} - amenidad ${i + 1}`} className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Amenity Lightbox */}
      {location.amenityImages && lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={() => setLightboxIndex(null)}>
          <button onClick={() => setLightboxIndex(null)} className="absolute top-4 right-4 text-white/70 hover:text-white" aria-label="Cerrar">
            <X className="w-8 h-8" />
          </button>
          {location.amenityImages.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + location.amenityImages!.length) % location.amenityImages!.length); }} className="absolute left-4 text-white/70 hover:text-white" aria-label="Anterior">
                <ChevronLeft className="w-10 h-10" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % location.amenityImages!.length); }} className="absolute right-4 text-white/70 hover:text-white" aria-label="Siguiente">
                <ChevronRight className="w-10 h-10" />
              </button>
            </>
          )}
          <img src={location.amenityImages[lightboxIndex]} alt={`${location.name} - amenidad ${lightboxIndex + 1}`} className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {/* Room types */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-heading text-2xl text-foreground mb-8">Tipos de habitación</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {location.roomTypes.map(room => <div key={room.name} onClick={() => { setSelectedRoom(room); setGalleryIndex(0); }} className="border border-border rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer group">
                <h3 className="font-heading text-xl text-foreground mb-2 group-hover:text-primary transition-colors">{room.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{room.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-muted-foreground">Desde</span>
                  <span className="font-semibold text-lg text-accent">{room.priceFrom}</span>
                  <span className="text-sm text-muted-foreground">/ mes</span>
                </div>
                <p className="text-xs text-primary mt-3 opacity-0 group-hover:opacity-100 transition-opacity">Ver detalles →</p>
              </div>)}
          </div>
          {location.roomImages && location.roomImages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {location.roomImages.map((img, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="rounded-xl overflow-hidden aspect-[4/3]">
                  <img src={img} alt={`${location.name} - habitación ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                </motion.div>
              ))}
            </div>
          )}

          {/* Room Detail Dialog */}
          <Dialog open={!!selectedRoom} onOpenChange={(open) => !open && setSelectedRoom(null)}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-heading text-xl">{selectedRoom?.name}</DialogTitle>
                <DialogDescription className="sr-only">Detalles de {selectedRoom?.name}</DialogDescription>
              </DialogHeader>
              {selectedRoom?.images && selectedRoom.images.length > 0 && (
                <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
                  <img src={selectedRoom.images[galleryIndex]} alt={`${selectedRoom.name} - foto ${galleryIndex + 1}`} className="w-full h-full object-cover" />
                  {selectedRoom.images.length > 1 && (
                    <>
                      <button onClick={() => setGalleryIndex((galleryIndex - 1 + selectedRoom.images!.length) % selectedRoom.images!.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/70 rounded-full p-1 hover:bg-background transition-colors" aria-label="Anterior">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button onClick={() => setGalleryIndex((galleryIndex + 1) % selectedRoom.images!.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/70 rounded-full p-1 hover:bg-background transition-colors" aria-label="Siguiente">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {selectedRoom.images.map((_, i) => (
                          <span key={i} className={`w-2 h-2 rounded-full ${i === galleryIndex ? 'bg-background' : 'bg-background/50'}`} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
              <p className="text-muted-foreground text-sm leading-relaxed">{selectedRoom?.profile}</p>
              <div className="flex items-baseline justify-between border-t border-border pt-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-muted-foreground">Desde</span>
                  <span className="font-semibold text-lg text-accent">{selectedRoom?.priceFrom}</span>
                  <span className="text-sm text-muted-foreground">/ mes</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Estadía mínima: <span className="font-medium text-foreground">{selectedRoom?.minimumStay}</span>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Map */}
      {location.embedMapUrl && (
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-heading text-2xl text-foreground mb-8">Ubicación</h2>
            <div className="rounded-xl overflow-hidden aspect-[16/9] max-w-4xl">
              <iframe
                src={location.embedMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mapa de ${location.name}`}
              />
            </div>
          </div>
        </section>
      )}

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
    {/* Neighborhood Section */}
      <NeighborhoodSection locationId={location.id} />

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
