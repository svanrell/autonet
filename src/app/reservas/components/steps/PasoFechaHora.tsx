import React from "react";
import { motion } from "framer-motion";
import { DateObject } from "../../types";
import { timeSlots } from "../../utils";

interface PasoFechaHoraProps {
  availableDays: DateObject[];
  selectedDate: DateObject | null;
  setSelectedDate: (day: DateObject) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  occupiedSlots: string[];
  isLoadingSlots: boolean;
}

export default function PasoFechaHora({
  availableDays,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  occupiedSlots = [],
  isLoadingSlots
}: PasoFechaHoraProps) {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-lg font-bold text-white mb-3">2. Selecciona la Fecha</h2>
        <div className="reserva-dias-grid">
          {availableDays.map((day) => {
            const isSelected = selectedDate?.dateString === day.dateString;
            
            return (
              <div
                key={day.dateString}
                onClick={() => setSelectedDate(day)}
                className={`reserva-dia-tarjeta ${
                  isSelected ? "seleccionado" : ""
                }`}
              >
                <span className="reserva-dia-semana">{day.dayOfWeek}</span>
                <span className="reserva-dia-numero">{day.dayNumber}</span>
                <span className="reserva-dia-mes">{day.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="reserva-horas-titulo">
            Horas Disponibles para el {selectedDate.dayNumber} de {selectedDate.month}
          </h3>

          {isLoadingSlots ? (
            <div className="flex flex-col items-center justify-center py-8 text-zinc-400 gap-3">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
              <p className="text-xs font-medium">Buscando horas disponibles...</p>
            </div>
          ) : (
            <>
              <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-2">Mañana</p>
              <div className="reserva-horas-grid">
                {timeSlots.morning.map((time) => {
                  const isOccupied = occupiedSlots.includes(time);
                  const isSelected = selectedTime === time;
                  
                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={isOccupied}
                      onClick={() => setSelectedTime(time)}
                      className={`reserva-hora-tarjeta text-left w-full transition-all duration-200 ${
                        isSelected ? "seleccionado" : ""
                      } ${
                        isOccupied ? "opacity-30 cursor-not-allowed bg-zinc-900/50 text-zinc-500 line-through border-transparent" : ""
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>

              <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-2 mt-4">Tarde</p>
              <div className="reserva-horas-grid">
                {timeSlots.afternoon.map((time) => {
                  const isOccupied = occupiedSlots.includes(time);
                  const isSelected = selectedTime === time;

                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={isOccupied}
                      onClick={() => setSelectedTime(time)}
                      className={`reserva-hora-tarjeta text-left w-full transition-all duration-200 ${
                        isSelected ? "seleccionado" : ""
                      } ${
                        isOccupied ? "opacity-30 cursor-not-allowed bg-zinc-900/50 text-zinc-500 line-through border-transparent" : ""
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

