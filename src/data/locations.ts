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
    id: "modelia",
    name: "La Nevera Living · by AYRA",
    neighborhood: "Modelia, Bogotá",
    tagline: "Confort, seguridad y ubicación estratégica",
    description:
      "Ubicado en Modelia, a solo 3 minutos caminando del Centro Comercial Hayuelos y a 15 minutos del aeropuerto. Cerca de la Avenida El Dorado y las estaciones de TransMilenio Modelia y Normandía. Ideal para quienes llegan a Bogotá y buscan comodidad, seguridad y una ubicación estratégica con todo incluido.",
    image: usaquenImg,
    gallery: [usaquenImg, usaquenImg, usaquenImg],
    amenities: [
      "Zona de trabajo silenciosa",
      "Cocina equipada compartida",
      "Internet fibra óptica",
      "Lavandería",
      "Parking bicicletas",
      "Recolección de agua lluvia",
      "Zonas comunes",
      "Seguridad 24/7",
    ],
    roomTypes: [
      { name: "Habitación Individual", priceFrom: "$1.400.000 COP", description: "Espacio privado con buena iluminación" },
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
    id: "teusaquillo",
    name: "Eco Living · by AYRA",
    neighborhood: "Teusaquillo, Bogotá",
    tagline: "Central, caminable y bien conectado",
    description:
      "Ubicado en Teusaquillo, a 5 minutos caminando del Parkway. Muy cerca de las estaciones de TransMilenio Calle 45 y Universidad Nacional, y a 10 minutos caminando del Centro Comercial Galerías. Una zona central, caminable y bien conectada, perfecta para vivir la ciudad con comodidad.",
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
    id: "ferias",
    name: "Eco Living Terraza · by AYRA",
    neighborhood: "Ferias, Bogotá",
    tagline: "Conectividad, practicidad y vida todo incluido",
    description:
      "Ubicado en Ferias, a 7 minutos caminando de Titán Plaza. Cerca de la Calle 80 con Boyacá y a 5 minutos caminando de la estación de TransMilenio Ferias. Diseñado para quienes valoran la conectividad, la practicidad y una experiencia de vida todo incluido.",
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
    address: "Carrera 69 #6-25, Ferias, Bogotá",
    mapUrl: "https://maps.google.com/?q=4.6264,-74.1330",
    faqs: [
      { question: "¿Es seguro el barrio?", answer: "Ferias es un barrio residencial con buen ambiente. Nuestro coliving tiene seguridad 24/7." },
      { question: "¿Hay transporte cercano?", answer: "Estamos a 5 minutos caminando de la estación de TransMilenio Ferias y cerca de la Calle 80 con Boyacá." },
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
