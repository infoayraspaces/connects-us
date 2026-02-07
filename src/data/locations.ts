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
    id: "chapinero",
    name: "AYRA Chapinero",
    neighborhood: "Chapinero",
    tagline: "Energía urbana y conexión natural",
    description:
      "Ubicado en el corazón de Chapinero, nuestro coliving combina la vibrante vida urbana con espacios verdes y sostenibles. Paneles solares, huerta urbana y una comunidad diversa de profesionales y creativos te esperan.",
    image: chapineroImg,
    gallery: [chapineroImg, chapineroImg, chapineroImg],
    amenities: [
      "Coworking 24/7",
      "Huerta urbana",
      "Paneles solares",
      "Cocina compartida",
      "Terraza con vista",
      "WiFi de alta velocidad",
      "Lavandería",
      "Bicicletas compartidas",
      "Yoga deck",
      "Recolección de agua lluvia",
    ],
    roomTypes: [
      { name: "Habitación Individual", priceFrom: "$1.200.000 COP", description: "Espacio privado con escritorio y baño compartido" },
      { name: "Habitación con Baño Privado", priceFrom: "$1.800.000 COP", description: "Suite privada con baño incluido" },
      { name: "Habitación Doble", priceFrom: "$900.000 COP", description: "Comparte habitación y ahorra, ideal para nómadas" },
    ],
    address: "Calle 59 #9-45, Chapinero, Bogotá",
    mapUrl: "https://maps.google.com/?q=4.6486,-74.0628",
    faqs: [
      { question: "¿Cuál es la estadía mínima?", answer: "La estadía mínima es de 1 mes, con descuentos para estadías de 3+ meses." },
      { question: "¿Están incluidos los servicios?", answer: "Sí, todos los servicios (agua, luz, internet, gas) están incluidos en el precio." },
      { question: "¿Puedo llevar mascotas?", answer: "Aceptamos mascotas pequeñas (menos de 10kg) con un depósito adicional." },
    ],
  },
  {
    id: "usaquen",
    name: "AYRA Usaquén",
    neighborhood: "Usaquén",
    tagline: "Tranquilidad con alma de barrio",
    description:
      "En el encantador barrio de Usaquén, este coliving ofrece la calma que necesitas para trabajar y vivir bien. Rodeado de restaurantes, parques y la famosa feria de pulgas, aquí encontrarás tu equilibrio.",
    image: usaquenImg,
    gallery: [usaquenImg, usaquenImg, usaquenImg],
    amenities: [
      "Coworking silencioso",
      "Jardín interior",
      "Paneles solares",
      "Cocina gourmet compartida",
      "Sala de meditación",
      "WiFi de alta velocidad",
      "Lavandería",
      "Parking bicicletas",
      "Biblioteca compartida",
      "Sistema de compostaje",
    ],
    roomTypes: [
      { name: "Habitación Individual", priceFrom: "$1.400.000 COP", description: "Espacio privado con vista al jardín" },
      { name: "Suite Premium", priceFrom: "$2.200.000 COP", description: "Habitación amplia con baño y balcón privado" },
      { name: "Habitación Doble", priceFrom: "$1.000.000 COP", description: "Habitación compartida con escritorios individuales" },
    ],
    address: "Carrera 6 #119-20, Usaquén, Bogotá",
    mapUrl: "https://maps.google.com/?q=4.6946,-74.0314",
    faqs: [
      { question: "¿Cuál es la estadía mínima?", answer: "La estadía mínima es de 1 mes." },
      { question: "¿Hay estacionamiento?", answer: "No tenemos estacionamiento para autos, pero sí un amplio parking de bicicletas." },
      { question: "¿Organizan eventos comunitarios?", answer: "Sí, organizamos cenas comunitarias semanales, talleres y salidas grupales." },
    ],
  },
  {
    id: "candelaria",
    name: "AYRA La Candelaria",
    neighborhood: "La Candelaria",
    tagline: "Historia, cultura y comunidad",
    description:
      "En una casona colonial restaurada del centro histórico de Bogotá, este coliving es perfecto para quienes buscan inspiración cultural. Patio interior, muros de piedra y el espíritu de la Candelaria en cada rincón.",
    image: candelariaImg,
    gallery: [candelariaImg, candelariaImg, candelariaImg],
    amenities: [
      "Patio colonial",
      "Coworking creativo",
      "Cocina compartida",
      "WiFi de alta velocidad",
      "Sala de arte",
      "Terraza con vista a los cerros",
      "Lavandería",
      "Biblioteca",
      "Eventos culturales",
      "Huerta en terraza",
    ],
    roomTypes: [
      { name: "Habitación Colonial", priceFrom: "$1.100.000 COP", description: "Habitación con carácter, techos altos y muros de piedra" },
      { name: "Suite del Patio", priceFrom: "$1.600.000 COP", description: "Vista al patio interior con baño privado" },
      { name: "Habitación Compartida", priceFrom: "$800.000 COP", description: "La opción más económica en el corazón histórico" },
    ],
    address: "Calle 12 #2-35, La Candelaria, Bogotá",
    mapUrl: "https://maps.google.com/?q=4.5964,-74.0730",
    faqs: [
      { question: "¿Es seguro el barrio?", answer: "La Candelaria ha mejorado mucho en seguridad. Nuestro coliving tiene seguridad 24/7 y estamos en una zona bien iluminada." },
      { question: "¿Hay transporte cercano?", answer: "Estamos a 5 minutos del TransMilenio y múltiples rutas de bus." },
      { question: "¿Puedo hacer check-in cualquier día?", answer: "Sí, coordinamos check-in flexible según tu llegada." },
    ],
  },
];

export const testimonials = [
  {
    name: "Camila R.",
    role: "Diseñadora UX · 8 meses en AYRA",
    quote: "AYRA cambió mi forma de vivir. Encontré no solo un lugar donde dormir, sino una familia. Las cenas comunitarias son lo mejor de mi semana.",
  },
  {
    name: "Tomás M.",
    role: "Desarrollador · Nómada digital",
    quote: "Llevo 6 meses viviendo entre Chapinero y Usaquén. La flexibilidad, el internet increíble y la comunidad hacen que AYRA sea mi base en Bogotá.",
  },
  {
    name: "Isabella G.",
    role: "Emprendedora · 1 año en AYRA",
    quote: "Lo que más valoro es el compromiso con la sostenibilidad. No es marketing, es real: los paneles solares, la huerta, el compostaje. Vivir aquí tiene propósito.",
  },
];
