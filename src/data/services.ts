import { Car, Sparkles, Clock } from "lucide-react";
import React from "react";

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  icon: React.ComponentType<any>;
  imagen: string;
}

export const services: Service[] = [
  {
    id: "exterior",
    name: "Limpieza Exterior",
    description: "Lavado a mano ecológico, secado con microfibra, limpieza profunda de llantas y acondicionamiento de neumáticos.",
    price: 25,
    duration: "45 min",
    icon: Car,
    imagen: "/images/coche1.webp"
  },
  {
    id: "interior",
    name: "Limpieza Interior",
    description: "Aspirado completo de alfombras y asientos, limpieza de plásticos, salpicadero, cristales y desinfección de conductos.",
    price: 35,
    duration: "60 min",
    icon: Sparkles,
    imagen: "/images/coche2.webp"
  },
  {
    id: "tapiceria",
    name: "Limpieza de Tapicerías",
    description: "Lavado con inyección y extracción para eliminar manchas difíciles en asientos, alfombrillas e hidratación de tapicería.",
    price: 60,
    duration: "90 min",
    icon: Clock,
    imagen: "/images/coche4.webp"
  },
  {
    id: "premium",
    name: "Detallado Premium (Full)",
    description: "Tratamiento completo exterior e interior con descontaminado de pintura, encerado cerámico y tratamiento protector de plásticos.",
    price: 120,
    duration: "180 min",
    icon: Sparkles,
    imagen: "/images/coche3.webp"
  }
];
