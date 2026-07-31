import { Car, Truck, ShieldCheck } from "lucide-react";
import React from "react";

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  imagen: string;
}

export const services: Service[] = [
  {
    id: "pequeno",
    name: "Vehículo Pequeño",
    description: "Seat Ibiza, Ford Fiesta, Volkswagen Polo",
    price: "29 €",
    imagen: "/images/coche1.webp"
  },
  {
    id: "mediano",
    name: "Vehículo Mediano",
    description: "Seat León, Ford Focus, Volkswagen Golf",
    price: "32 €",
    imagen: "/images/coche2.webp"
  },
  {
    id: "grande",
    name: "Vehículo Grande",
    description: "Skoda Octavia, Mercedes, BMW",
    price: "33 €",
    imagen: "/images/coche3.webp"
  },
  {
    id: "furgoneta",
    name: "Furgoneta Pequeña",
    description: "Monovolumen, Todoterreno Pequeño",
    price: "36 € - 38 €",
    imagen: "/images/coche4.webp"
  },
  {
    id: "todoterreno",
    name: "Todoterreno Grande",
    description: "Furgoneta Grande",
    price: "40 €",
    imagen: "/images/coche5.webp"
  }
];
