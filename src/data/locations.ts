import chapineroImg from "@/assets/location-chapinero.jpg";
import usaquenImg from "@/assets/location-usaquen.jpg";
import candelariaImg from "@/assets/location-candelaria.jpg";
import modeliaPatioImg from "@/assets/modelia-patio.jpg";
import modeliaKitchen1Img from "@/assets/modelia-kitchen-1.jpg";
import modeliaKitchen2Img from "@/assets/modelia-kitchen-2.jpg";
import modeliaKitchen3Img from "@/assets/modelia-kitchen-3.jpg";
import modeliaMezzanineImg from "@/assets/modelia-mezzanine.jpg";
import modeliaRoom1Img from "@/assets/modelia-room-1.jpg";
import modeliaRoom2Img from "@/assets/modelia-room-2.jpg";
import modeliaRoom3Img from "@/assets/modelia-room-3.jpg";
import modeliaCoworkImg from "@/assets/modelia-cowork.jpg";
import modeliaPatioWorkImg from "@/assets/modelia-patio-work.jpg";
import modeliaPatioExteriorImg from "@/assets/modelia-patio-exterior.jpg";

export interface RoomType {
  name: string;
  priceFrom: string;
  description: string;
  profile?: string;
  minimumStay?: string;
  images?: string[];
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
  roomImages?: string[];
  address: string;
  mapUrl: string;
  embedMapUrl?: string;
  amenityImages?: string[];
  virtualTourUrl?: string;
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
    image: modeliaPatioImg,
    gallery: [modeliaKitchen1Img, modeliaMezzanineImg, modeliaKitchen2Img],
    amenityImages: [modeliaKitchen1Img, modeliaMezzanineImg, modeliaKitchen2Img, modeliaCoworkImg, modeliaPatioWorkImg, modeliaPatioExteriorImg],
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
      {
        name: "Habitación Tipo 1",
        priceFrom: "$1.400.000 COP",
        description: "Espacio privado con buena iluminación",
        profile: "La habitación más amplia de nuestra sede, con iluminación natural gracias a ventanales con vista exterior.",
        minimumStay: "3 meses",
        images: [modeliaRoom1Img, modeliaRoom2Img],
      },
      {
        name: "Habitación Tipo 2",
        priceFrom: "$1.250.000 COP",
        description: "Habitación amplia con baño y balcón privado",
        profile: "Una habitación amplia, equipada con nevera minibar y microondas interno dentro de la habitación.",
        minimumStay: "3 meses",
        images: [modeliaRoom2Img, modeliaRoom3Img],
      },
      {
        name: "Habitación Tipo 3",
        priceFrom: "$1.000.000 COP",
        description: "Habitación compartida con escritorios individuales",
        profile: "Opción más compacta, pero con todo lo necesario para vivir con comodidad y el estándar AYRA.",
        minimumStay: "3 meses",
        images: [modeliaRoom3Img, modeliaRoom1Img],
      },
    ],
    roomImages: [modeliaRoom1Img, modeliaRoom2Img, modeliaRoom3Img],
    address: "Carrera 81Bis #22-62, Modelia, Bogotá",
    mapUrl: "https://maps.google.com/?q=4.6716,-74.1214",
    embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d993.7!2d-74.12568!3d4.66887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bf33e1c1c1d%3A0x5f1c1c1c1c1c1c1c!2sCarrera%2081Bis%20%2322-62%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco",
    virtualTourUrl: "https://vivanova.com.co/tour/La_Nevera/",
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
