import React from "react";
import { motion } from "framer-motion";
import { services, type Service } from "@/data/services";

interface PasoServicioProps {
  selectedService: Service | null;
  onServiceSelect: (service: Service) => void;
}

export default function PasoServicio({ selectedService, onServiceSelect }: PasoServicioProps) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <h2 className="text-lg font-bold text-white mb-2">1. Selecciona un Servicio</h2>
      <div className="reserva-servicios-grid">
        {services.map((service) => {
          const Icon = service.icon;
          const isSelected = selectedService?.id === service.id;
          
          return (
            <div
              key={service.id}
              onClick={() => onServiceSelect(service)}
              className={`reserva-servicio-tarjeta ${
                isSelected ? "seleccionado" : ""
              }`}
            >
              <div className="reserva-servicio-info">
                <div className="reserva-servicio-icono">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="reserva-servicio-nombre">{service.name}</h3>
                  <p className="reserva-servicio-desc">{service.description}</p>
                </div>
              </div>
              <div className="reserva-servicio-precio-tiempo">
                <span className="reserva-servicio-precio">{service.price}€</span>
                <span className="reserva-servicio-tiempo">{service.duration}</span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
