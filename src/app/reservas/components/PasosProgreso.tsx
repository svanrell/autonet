import React from "react";
import { CheckCircle2 } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

interface PasosProgresoProps {
  step: number;
}

export default function PasosProgreso({ step }: PasosProgresoProps) {
  const { t } = useLanguage();
  const steps = [
    { num: 1, label: t("reservas.steps.service") },
    { num: 2, label: t("reservas.steps.dateTime") },
    { num: 3, label: t("reservas.steps.details") },
    { num: 4, label: t("reservas.steps.summary") }
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
