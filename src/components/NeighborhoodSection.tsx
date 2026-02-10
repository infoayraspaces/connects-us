import { motion } from "framer-motion";
import { ShoppingBag, Utensils, Dumbbell, Plane, MapPin, Coffee } from "lucide-react";

interface NeighborhoodPlace {
  name: string;
  distance: string;
  description?: string;
  icon: any;
  category: string;
}

interface NeighborhoodSectionProps {
  locationId: string;
}

const neighborhoodData: Record<string, NeighborhoodPlace[]> = {
  modelia: [
    {
      name: "Centro Comercial Hayuelos",
      distance: "7 min caminando",
      description: "Centro comercial con múltiples tiendas, restaurantes y entretenimiento",
      icon: ShoppingBag,
      category: "Compras",
    },
    {
      name: "Jumbo Supermercado",
      distance: "7 min caminando",
      description: "Supermercado completo para todas tus necesidades",
      icon: ShoppingBag,
      category: "Compras",
    },
    {
      name: "Éxito Supermercado",
      distance: "8 min caminando",
      description: "Supermercado de cadena con variedad de productos",
      icon: ShoppingBag,
      category: "Compras",
    },
    {
      name: "SmartFit & Bodytech",
      distance: "7 min caminando",
      description: "Gimnasios equipados para tu rutina de ejercicio",
      icon: Dumbbell,
      category: "Deporte",
    },
    {
      name: "Zona Rosa de Modelia",
      distance: "15 min caminando",
      description: "Bares, restaurantes y gastronomía diversa para explorar",
      icon: Utensils,
      category: "Gastronomía",
    },
    {
      name: "La Martina Trattoria, XL Gourmet",
      distance: "5-10 min",
      description: "Restaurantes de alta calidad cerca de casa",
      icon: Utensils,
      category: "Restaurantes",
    },
    {
      name: "Aeropuerto El Dorado",
      distance: "15 min en carro",
      description: "Aeropuerto internacional - perfecto para nómadas digitales",
      icon: Plane,
      category: "Transporte",
    },
    {
      name: "Estación TransMilenio Modelia",
      distance: "3 min caminando",
      description: "Acceso rápido al sistema de transporte masivo",
      icon: MapPin,
      category: "Transporte",
    },
  ],
  teusaquillo: [
    {
      name: "Parkway",
      distance: "5 min caminando",
      description: "Zona comercial y de entretenimiento",
      icon: ShoppingBag,
      category: "Compras",
    },
    {
      name: "Centro Comercial Galerías",
      distance: "10 min caminando",
      description: "Centro comercial con tiendas, cine y restaurantes",
      icon: ShoppingBag,
      category: "Compras",
    },
    {
      name: "Estación TransMilenio Calle 45",
      distance: "5 min caminando",
      description: "Conexión rápida con toda la ciudad",
      icon: MapPin,
      category: "Transporte",
    },
    {
      name: "Universidad Nacional",
      distance: "10 min",
      description: "Campus universitario y zonas culturales",
      icon: Coffee,
      category: "Cultura",
    },
  ],
  ferias: [
    {
      name: "Titán Plaza",
      distance: "7 min caminando",
      description: "Centro comercial con tiendas y entretenimiento",
      icon: ShoppingBag,
      category: "Compras",
    },
    {
      name: "Estación TransMilenio Ferias",
      distance: "5 min caminando",
      description: "Acceso directo al sistema de transporte",
      icon: MapPin,
      category: "Transporte",
    },
    {
      name: "Calle 80 con Boyacá",
      distance: "5 min",
      description: "Vía principal con comercio y restaurantes",
      icon: Utensils,
      category: "Gastronomía",
    },
  ],
};

const NeighborhoodSection = ({ locationId }: NeighborhoodSectionProps) => {
  const places = neighborhoodData[locationId] || [];

  if (places.length === 0) return null;

  // Agrupar por categoría
  const categories = [...new Set(places.map((p) => p.category))];

  return (
    <section className="py-20 bg-warm">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-body font-semibold uppercase tracking-widest text-accent mb-3 block">
            Explora el barrio
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
            Todo lo que necesitas cerca de casa
          </h2>
          <p className="text-muted-foreground text-lg">
            Descubre qué hace especial a este vecindario y por qué es el lugar perfecto para vivir.
          </p>
        </motion.div>

        {/* Grid de lugares */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {places.map((place, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <place.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-heading text-lg text-foreground">{place.name}</h3>
                  </div>
                  <p className="text-sm text-accent font-semibold mb-2">{place.distance}</p>
                  {place.description && (
                    <p className="text-sm text-muted-foreground">{place.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Categorías resumen */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <div className="inline-flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <span
                key={category}
                className="px-4 py-2 bg-background rounded-full text-sm font-semibold text-foreground"
              >
                {category}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Mapa placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground text-sm mb-4">
            ¿Quieres explorar más? Abre el mapa para ver la ubicación exacta y descubrir todo lo que te rodea.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NeighborhoodSection;
