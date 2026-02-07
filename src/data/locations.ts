import chapineroImg from "@/assets/location-chapinero.jpg";
import usaquenImg from "@/assets/location-usaquen.jpg";
import candelariaImg from "@/assets/location-candelaria.jpg";

export interface RoomType {
  name: string;
  priceFrom: string;
  description: string;
}

export interface Location {
  id: string;
  name: string;
  neighborhood: string;
  tagline: string;
  description: string;
  image: string;
  gallery: string[];
  amenities: string[];
  roomTypes: RoomType[];
  address: string;
  mapUrl: string;
  faqs: { question: string; answer: string }[];
}

export const locations: Location[] = [
  {
    id: "teusaquillo",
    name: "AYRA Teusaquillo",
    neighborhood: "Teusaquillo",
    tagline: "Tradición, calma y ubicación estratégica",
    description:
      "En uno de los barrios más tradicionales y arbolados de Bogotá, AYRA Teusaquillo ofrece un entorno residencial tranquilo con acceso rápido a toda la ciudad. Arquitectura con carácter, calles amplias y una comunidad que valora la buena convivencia.",
    image: chapineroImg,
    gallery: [chapineroImg, chapineroImg, chapineroImg],
    amenities: [
      "Espacios de trabajo",
      "Cocina compartida",
      "Terraza",
      "Internet fibra óptica",
      "Lavandería",
      "Recolección de agua lluvia",
      "Zonas comunes amplias",
      "Seguridad 24/7",
    ],
    roomTypes: [
      { name: "Habitación Individual", priceFrom: "$1.200.000 COP", description: "Espacio privado con escritorio y baño compartido" },
      { name: "Habitación con Baño Privado", priceFrom: "$1.800.000 COP", description: "Suite privada con baño incluido" },
      { name: "Habitación Doble", priceFrom: "$900.000 COP", description: "Comparte habitación y reduce costos" },
    ],
    address: "Calle 34 #17-50, Teusaquillo, Bogotá",
    mapUrl: "https://maps.google.com/?q=4.6286,-74.0728",
    faqs: [
      { question: "¿Cuál es la estadía mínima?", answer: "La estadía mínima es de 1 mes, con descuentos para estadías de 3+ meses." },
      { question: "¿Están incluidos los servicios?", answer: "Sí, todos los servicios (agua, luz, internet, gas) están incluidos en el precio." },
      { question: "¿Puedo llevar mascotas?", answer: "Aceptamos mascotas pequeñas (menos de 10kg) con un depósito adicional." },
    ],
  },
  {
    id: "modelia",
    name: "AYRA Modelia",
    neighborhood: "Modelia",
    tagline: "Comodidad residencial con fácil acceso",
    description:
      "En el tranquilo y bien conectado barrio de Modelia, este coliving es ideal para quienes buscan un ambiente residencial con acceso rápido al aeropuerto y a las principales vías de la ciudad. Espacios cómodos y una comunidad acogedora.",
    image: usaquenImg,
    gallery: [usaquenImg, usaquenImg, usaquenImg],
    amenities: [
      "Zona de trabajo silenciosa",
      "Jardín interior",
      "Cocina equipada compartida",
      "Internet fibra óptica",
      "Lavandería",
      "Parking bicicletas",
      "Recolección de agua lluvia",
      "Seguridad 24/7",
    ],
    roomTypes: [
      { name: "Habitación Individual", priceFrom: "$1.400.000 COP", description: "Espacio privado con vista al jardín" },
      { name: "Suite Premium", priceFrom: "$2.200.000 COP", description: "Habitación amplia con baño y balcón privado" },
      { name: "Habitación Doble", priceFrom: "$1.000.000 COP", description: "Habitación compartida con escritorios individuales" },
    ],
    address: "Calle 25G #75-30, Modelia, Bogotá",
    mapUrl: "https://maps.google.com/?q=4.6716,-74.1214",
    faqs: [
      { question: "¿Cuál es la estadía mínima?", answer: "La estadía mínima es de 1 mes." },
      { question: "¿Hay estacionamiento?", answer: "No tenemos estacionamiento para autos, pero sí un amplio parking de bicicletas." },
      { question: "¿Qué tan cerca está del aeropuerto?", answer: "Estamos a aproximadamente 15 minutos del Aeropuerto El Dorado." },
    ],
  },
  {
    id: "la-feria",
    name: "AYRA La Feria",
    neighborhood: "La Feria",
    tagline: "Barrio auténtico, vida accesible",
    description:
      "En el corazón del occidente de Bogotá, AYRA La Feria combina la autenticidad de un barrio con carácter y la comodidad de un espacio completamente equipado. Bien conectado por transporte público y rodeado de comercio local.",
    image: candelariaImg,
    gallery: [candelariaImg, candelariaImg, candelariaImg],
    amenities: [
      "Espacios de trabajo",
      "Cocina compartida",
      "Internet fibra óptica",
      "Terraza",
      "Lavandería",
      "Recolección de agua lluvia",
      "Zonas comunes",
      "Seguridad 24/7",
    ],
    roomTypes: [
      { name: "Habitación Estándar", priceFrom: "$1.100.000 COP", description: "Habitación cómoda con buena iluminación natural" },
      { name: "Habitación con Baño Privado", priceFrom: "$1.600.000 COP", description: "Espacio privado con baño incluido" },
      { name: "Habitación Compartida", priceFrom: "$800.000 COP", description: "La opción más accesible para empezar" },
    ],
    address: "Carrera 69 #6-25, La Feria, Bogotá",
    mapUrl: "https://maps.google.com/?q=4.6264,-74.1330",
    faqs: [
      { question: "¿Es seguro el barrio?", answer: "La Feria es un barrio residencial con buen ambiente. Nuestro coliving tiene seguridad 24/7." },
      { question: "¿Hay transporte cercano?", answer: "Estamos a pocos minutos de TransMilenio y múltiples rutas de bus." },
      { question: "¿Puedo hacer check-in cualquier día?", answer: "Sí, coordinamos check-in flexible según tu llegada." },
    ],
  },
];

export const testimonials = [
  {
    name: "Camila R.",
    role: "Diseñadora UX · 8 meses en AYRA",
    quote: "AYRA cambió mi forma de vivir. Encontré no solo un lugar donde dormir, sino un hogar donde siempre hay alguien con quien contar.",
  },
  {
    name: "Tomás M.",
    role: "Desarrollador · Residente AYRA",
    quote: "Llegué a Bogotá sin conocer a nadie y en AYRA encontré todo resuelto: internet excelente, todo incluido y buena compañía.",
  },
  {
    name: "Isabella G.",
    role: "Emprendedora · 1 año en AYRA",
    quote: "Lo que más valoro es la honestidad. Lo que te prometen es lo que encuentras. Sin sorpresas, sin letras pequeñas.",
  },
];
