import React from "react";
import { CheckCircle2 } from "lucide-react";

interface PasosProgresoProps {
  step: number;
}

export default function PasosProgreso({ step }: PasosProgresoProps) {
  const steps = [
    { num: 1, label: "Servicio" },
    { num: 2, label: "Fecha y Hora" },
    { num: 3, label: "Tus Datos" },
    { num: 4, label: "Resumen" }
  ];

  return (
    <div className="reserva-pasos-cabecera">
      {steps.map((item) => {
        const isCompleted = step > item.num;
        const isActive = step === item.num;
        
        return (
          <div key={item.num} className="reserva-paso-indicador">
            <div className={`reserva-paso-numero ${
              isCompleted ? "completado" : isActive ? "activo" : "inactivo"
            }`}>
              {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : item.num}
            </div>
            <span className={`reserva-paso-texto ${
              isActive || isCompleted ? "activo" : "inactivo"
            }`}>
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
