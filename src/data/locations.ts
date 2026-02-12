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

// Teusaquillo imports
import teusaquilloRoom1_1Img from "@/assets/teusaquillo-room1-1.jpg";
import teusaquilloRoom1_2Img from "@/assets/teusaquillo-room1-2.jpg";
import teusaquilloRoom1_3Img from "@/assets/teusaquillo-room1-3.jpg";
import teusaquilloRoom2_1Img from "@/assets/teusaquillo-room2-1.jpg";
import teusaquilloRoom2_2Img from "@/assets/teusaquillo-room2-2.jpg";
import teusaquilloRoom3_1Img from "@/assets/teusaquillo-room3-1.jpg";
import teusaquilloRoom3_2Img from "@/assets/teusaquillo-room3-2.jpg";
import teusaquilloStudio1Img from "@/assets/teusaquillo-studio-1.jpg";
import teusaquilloStudio2Img from "@/assets/teusaquillo-studio-2.jpg";
import teusaquilloStudio3Img from "@/assets/teusaquillo-studio-3.jpg";
import teusaquilloCoworkImg from "@/assets/teusaquillo-coworking.jpg";
import teusaquilloKitchenImg from "@/assets/teusaquillo-kitchen.jpg";
import teusaquilloLaundryImg from "@/assets/teusaquillo-laundry.jpg";
import teusaquilloStudio4Img from "@/assets/teusaquillo-studio-4.jpeg";
import teusaquilloCowork2Img from "@/assets/coworking.jpeg";
import teusaquilloLockerImg from "@/assets/Locker.jpeg";
import teusaquilloBathroom8Img from "@/assets/BañoH8.jpeg";
import teusaquilloBathroom7Img from "@/assets/BañoH7.jpeg";
import modeliaBathroom1Img from "@/assets/H1_6.jpg";
import modeliaBathroom3Img from "@/assets/H3_4.jpg";
import modeliaBathroom8Img from "@/assets/H8_4.jpg";


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
    amenityImages: [modeliaCoworkImg, modeliaMezzanineImg, modeliaKitchen2Img, modeliaKitchen1Img, modeliaPatioWorkImg, modeliaPatioExteriorImg],
    amenities: [
      "Zona de trabajo silenciosa",
      "Cocina equipada compartida",
      "Internet fibra óptica",
      "Lavandería",
      "Parking bicicletas",
      "Parking para motos",
      "Zonas comunes",
    ],
    roomTypes: [
      {
        name: "Habitación Tipo 1",
        priceFrom: "$1.000.000 COP",
        description: "La opción más compacta, pero con todo lo necesario para vivir con comodidad y el estándar AYRA.",
        profile: "La opción más compacta, pero con todo lo necesario para vivir con comodidad y el estándar AYRA.",
        minimumStay: "3 meses",
        images: [modeliaRoom3Img, modeliaBathroom3Img],
      },
      {
        name: "Habitación Tipo 2",
        priceFrom: "$1.250.000 COP",
        description: "Habitación amplia con baño y balcón privado",
        profile: "Una habitación amplia, equipada con nevera minibar y microondas interno dentro de la habitación.",
        minimumStay: "3 meses",
        images: [modeliaRoom1Img, modeliaBathroom1Img],
      },
      {
        name: "Habitación Tipo 3",
        priceFrom: "$1.400.000 COP",
        description: "La habitación más amplia de nuestra sede, con iluminación natural gracias a ventanales con vista exterior.",
        profile: "La habitación más amplia de nuestra sede, con iluminación natural gracias a ventanales con vista exterior.",
        minimumStay: "3 meses",
        images: [modeliaRoom2Img, modeliaBathroom8Img],
      },
    ],
    roomImages: [],
    address: "Carrera 81Bis #22-62, Modelia, Bogotá",
    mapUrl: "https://maps.google.com/?q=4.6716,-74.1214",
    embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d993.7!2d-74.12568!3d4.66887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bf33e1c1c1d%3A0x5f1c1c1c1c1c1c1c!2sCarrera%2081Bis%20%2322-62%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco",
    virtualTourUrl: "https://tour-modelia.ayracoliving.com",
    faqs: [
      { question: "¿Cuál es la estadía mínima?", answer: "La estadía mínima es de 3 meses." },
      { question: "¿Hay estacionamiento?", answer: "No tenemos estacionamiento para autos, pero sí un parking de motos y bicicletas." },
      { question: "¿Qué tan cerca está del aeropuerto?", answer: "Estamos a aproximadamente 15 minutos del Aeropuerto El Dorado." },
      { question: "¿Qué incluye el precio?", answer: "Todo está incluido: servicios públicos (agua, luz, gas, internet de alta velocidad), limpieza de áreas comunes, de tu habitación y acceso a todas las amenidades." },
    ],
  },
  {
    id: "teusaquillo",
    name: "Eco Living · by AYRA",
    neighborhood: "Teusaquillo, Bogotá",
    tagline: "Central, caminable y bien conectado",
    description:
      "Ubicado en Teusaquillo, en una zona central, caminable y bien conectada. Muy cerca de las estaciones de TransMilenio Calle 45 y Universidad Nacional, y a pocos minutos del Parkway y el Centro Comercial Galerías. Perfecta para vivir la ciudad con comodidad, con acceso rápido a universidades, centros de trabajo y vida cultural.",
    image: teusaquilloKitchenImg,
    gallery: [teusaquilloKitchenImg, teusaquilloCoworkImg, teusaquilloRoom2_1Img],
    amenityImages: [teusaquilloKitchenImg, teusaquilloLockerImg, teusaquilloCowork2Img, teusaquilloLaundryImg],
    amenities: [
      "Espacios de coworking",
      "Cocina equipada compartida",
      "Internet fibra óptica",
      "Lavandería",
      "Zonas comunes amplias",
      "Habitaciones amobladas",
      "TV en cada habitación",
    ],
    roomTypes: [
      {
        name: "Habitación Tipo 1",
        priceFrom: "Desde $980.000 COP",
        description: "Habitación privada con cama sencilla elevada y baño privado",
        profile: "Habitación privada amoblada con cama sencilla elevada, escritorio, TV y baño privado. Espacio moderno, cómodo y funcional, ideal para descanso y trabajo.",
        minimumStay: "1 mes",
        images: [teusaquilloRoom1_1Img, teusaquilloRoom1_2Img, teusaquilloRoom1_3Img, teusaquilloBathroom8Img],
      },
      {
        name: "Habitación Tipo 2",
        priceFrom: "Desde $1.280.000 COP",
        description: "Habitación privada con cama semidoble y baño privado",
        profile: "Habitación privada amoblada con cama semidoble, escritorio, TV y baño privado. Espacio moderno, cómodo y funcional, ideal para descanso y trabajo.",
        minimumStay: "1 mes",
        images: [teusaquilloRoom2_1Img, teusaquilloRoom2_2Img],
      },
      {
        name: "Habitación Tipo 3",
        priceFrom: "Desde $1.350.000 COP",
        description: "Habitación privada con cama doble, nevera minibar y baño privado",
        profile: "Habitación privada amoblada con cama doble, escritorio, TV, nevera minibar y baño privado. Espacio moderno, cómodo y funcional, ideal para descanso y trabajo.",
        minimumStay: "1 mes",
        images: [teusaquilloRoom3_2Img, teusaquilloBathroom7Img],
      },
      {
        name: "Apartaestudio Tipo 1",
        priceFrom: "Desde $1.850.000 COP",
        description: "Apartaestudio completo con cocina equipada y baño privado",
        profile: "Apartaestudio amoblado con cama doble, escritorio, TV, cocina equipada y baño privado. Espacio moderno, cómodo y funcional, ideal para descanso y trabajo. Tu espacio completamente independiente.",
        minimumStay: "1 mes",
        images: [teusaquilloStudio1Img, teusaquilloStudio4Img, teusaquilloStudio2Img, teusaquilloStudio3Img],
      },
    ],
    roomImages: [],
    address: "Carrera 20 #42A-52, Teusaquillo, Bogotá",
    mapUrl: "https://maps.app.goo.gl/trM1qJHw2RwMyAu1A",
    embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.6!2d-74.0728!3d4.6362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bd00000000%3A0x0!2sCarrera%2020%20%2342A-52!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco",
    faqs: [
      { question: "¿Cuál es la estadía mínima?", answer: "La estadía mínima es de 3 meses. Ofrecemos flexibilidad para extender tu estadía." },
      { question: "¿Están incluidos los servicios?", answer: "Sí, todos los servicios (agua, luz, internet de fibra óptica, gas) están incluidos en el precio." },
      { question: "¿Las habitaciones tienen baño privado?", answer: "Sí, todas nuestras habitaciones y apartaestudios cuentan con baño privado." },
      { question: "¿Hay espacios para trabajar?", answer: "Sí, contamos con zonas de coworking compartidas y cada habitación tiene su escritorio con TV." },
      { question: "¿Realizan aseo en las zonas sociales?", answer: "Sí, realizamos aseo en las zonas sociales cada 8 días. Además, el aseo interno de tu habitación o apartaestudio se realiza cada 15 días y está incluido en el precio." },
    ],
  },
  {
    id: "ferias",
    name: "Eco Living Terraza · by AYRA",
    neighborhood: "Ferias, Bogotá",
    tagline: "Conectividad, practicidad y vida todo incluido",
    description:
      "Ubicado en Ferias, a 7 minutos caminando de Titán Plaza. Cerca de la Calle 80 con Boyacá y a 5 minutos caminando de la estación de TransMilenio Ferias. Diseñado para quienes valoran la conectividad, la practicidad y una experiencia de vida todo incluido. Ideal para profesionales y nómadas digitales que buscan un espacio funcional y bien ubicado.",
    image: candelariaImg,
    gallery: [candelariaImg, candelariaImg, candelariaImg],
    amenityImages: [candelariaImg, candelariaImg, candelariaImg],
    amenities: [
      "Espacios de coworking",
      "Cocina equipada comunal",
      "Internet fibra óptica",
      "Terraza",
      "Lavandería",
      "Apartaestudios independientes",
      "Zonas comunes",
      "Seguridad 24/7",
    ],
    roomTypes: [
      {
        name: "Apartaestudio Estándar",
        priceFrom: "Desde $1.100.000 COP",
        description: "Apartaestudio completo con todas las comodidades",
        profile: "Apartaestudio privado totalmente equipado, ideal para quienes buscan independencia con el respaldo de una comunidad. Incluye todo lo necesario para vivir cómodamente.",
        minimumStay: "1 mes",
      },
      {
        name: "Apartaestudio Premium",
        priceFrom: "Desde $1.300.000 COP",
        description: "Apartaestudio amplio con mejores acabados",
        profile: "Apartaestudio premium con mayor espacio y acabados superiores. Perfecto para quienes valoran el confort y la privacidad sin renunciar a la vida en comunidad.",
        minimumStay: "1 mes",
      },
    ],
    roomImages: [candelariaImg, candelariaImg],
    address: "Carrera 69A #78-64, Ferias, Bogotá",
    mapUrl: "https://maps.app.goo.gl/JLvkW5UvPMZEtyUz6",
    embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6034.957322043858!2d-74.08709316045662!3d4.686423692483906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9b18b1ec1b91%3A0x5dbbc946acd63f2e!2zQ3JhLiA2OWEgIyA3OC02NCwgRW5nYXRpdsOhLCBCb2dvdMOhLCBELkMuLCBCb2dvdMOhLCBCb2dvdMOhLCBELkMu!5e0!3m2!1ses-419!2sco!4v1770813225174!5m2!1ses-419!2sco",
    faqs: [
      { question: "¿Cuál es la estadía mínima?", answer: "La estadía mínima es de 3 meses. Ofrecemos flexibilidad para extender tu estadía." },
      { question: "¿Es seguro el barrio?", answer: "Ferias es un barrio residencial con buen ambiente y excelente conectividad. Nuestro coliving cuenta con seguridad 24/7." },
      { question: "¿Hay transporte cercano?", answer: "Estamos a 5 minutos caminando de la estación de TransMilenio Ferias y cerca de la Calle 80 con Boyacá, una de las vías principales de Bogotá." },
      { question: "¿Los apartaestudios son completamente independientes?", answer: "Sí, cada apartaestudio es completamente privado, pero puedes disfrutar de las zonas comunes y la comunidad cuando lo desees." },
      { question: "¿Qué incluye el precio?", answer: "Todo está incluido: servicios públicos (agua, luz, gas, internet de alta velocidad), limpieza de áreas comunes, de tu apartaestudios y acceso a todas las amenidades." },
    ],
  },
];

export const testimonials = [
  {
    name: "Brayan Cardona",
    location: "🇨🇴 Barranquilla",
    quote: "Muy buen lugar, Tranquilo, acogedor, el sector es súper seguro, cerca a un parque donde pueden caminar y tomar aire fresco!! Recomendado!!",
  },
  {
    name: "Gloria Rodriguez",
    quote: "Hermoso lugar, me encanta!!!  Todos los espacios están muy bien diseñados, se aprecia la comodidad y la atención a los detalles.",
  },
  {
    name: "Isabella G.",
    quote: "Lo que más valoro es la honestidad. Lo que te prometen es lo que encuentras. ",
  },
];
