import React from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface BotonesAccionProps {
  step: number;
  handlePrevStep: () => void;
  handleNextStep: () => void;
  isStepValid: boolean;
  isSubmitting: boolean;
}

export default function BotonesAccion({
  step,
  handlePrevStep,
  handleNextStep,
  isStepValid,
  isSubmitting
}: BotonesAccionProps) {
  return (
    <div className="reserva-acciones">
      {step > 1 ? (
        <button
          type="button"
          onClick={handlePrevStep}
          className="reserva-boton-atras"
        >
          <span className="flex items-center gap-1">
            <ChevronLeft size={14} /> Atrás
          </span>
        </button>
      ) : (
        <div /> // Spacer
      )}

      {step < 4 ? (
        <button
          type="button"
          onClick={handleNextStep}
          disabled={!isStepValid}
          className="reserva-boton-siguiente"
        >
          <span className="flex items-center gap-1">
            Siguiente <ChevronRight size={14} />
          </span>
        </button>
      ) : (
        <button
          type="submit"
          disabled={isSubmitting}
          className="reserva-boton-siguiente bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              Procesando...
              <Loader2 className="w-4 h-4 animate-spin" />
            </span>
          ) : (
            <span className="flex items-center gap-1">
              Confirmar Cita <ChevronRight size={14} />
            </span>
          )}
        </button>
      )}
    </div>
  );
}
