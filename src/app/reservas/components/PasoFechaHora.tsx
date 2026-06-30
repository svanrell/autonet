import React from "react";
import { motion } from "framer-motion";
import { DateObject } from "../types";
import { timeSlots } from "../utils";

interface PasoFechaHoraProps {
  availableDays: DateObject[];
  selectedDate: DateObject | null;
  setSelectedDate: (day: DateObject) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}

export default function PasoFechaHora({
  availableDays,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime
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
          
          <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-2">Mañana</p>
          <div className="reserva-horas-grid">
            {timeSlots.morning.map((time) => (
              <div
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`reserva-hora-tarjeta ${
                  selectedTime === time ? "seleccionado" : ""
                }`}
              >
                {time}
              </div>
            ))}
          </div>

          <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-2 mt-4">Tarde</p>
          <div className="reserva-horas-grid">
            {timeSlots.afternoon.map((time) => (
              <div
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`reserva-hora-tarjeta ${
                  selectedTime === time ? "seleccionado" : ""
                }`}
              >
                {time}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
