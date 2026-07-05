import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar } from "lucide-react";
import Link from "next/link";
import { type Service } from "@/data/services";
import { DateObject } from "../types";

interface PantallaExitoProps {
  selectedService: Service | null;
  selectedDate: DateObject | null;
  selectedTime: string;
}

export default function PantallaExito({
  selectedService,
  selectedDate,
  selectedTime
}: PantallaExitoProps) {
  const buildGoogleCalendarUrl = () => {
    if (!selectedDate || !selectedService) return "#";
    
    // Construct local Date object based on Spanish local time context
    const [year, month, day] = selectedDate.dateString.split("-").map(Number);
    const [hours, minutes] = selectedTime.split(":").map(Number);
    const localDate = new Date(year, month - 1, day, hours, minutes);
    
    const durationMin = parseInt(selectedService.duration.replace(/\D/g, "") || "60", 10);
    const endDate = new Date(localDate.getTime() + durationMin * 60 * 1000);
    
    const formatGoogleUTC = (d: Date) => {
      return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };
    
    const dates = `${formatGoogleUTC(localDate)}/${formatGoogleUTC(endDate)}`;
    
    const text = encodeURIComponent(`🚗 Cita Autonet: ${selectedService.name}`);
    const details = encodeURIComponent(
      `Tu reserva para limpieza de coche en Autonet está registrada.\n\n` +
      `Servicio: ${selectedService.name}\n` +
      `Precio: ${selectedService.price}€\n` +
      `Duración: ${selectedService.duration}\n\n` +
      `Estado: Pendiente de confirmación.`
    );
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="flex flex-col items-center justify-center text-center py-12"
    >
      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 shadow-inner animate-bounce">
        <CheckCircle2 size={32} />
      </div>
      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-3">
        Solicitud Recibida
      </h2>
      <p className="text-zinc-400 text-sm md:text-base max-w-md mb-8 leading-relaxed">
        Hemos registrado tu reserva para el <strong className="text-white">{selectedDate?.dayNumber} de {selectedDate?.month}</strong> a las <strong className="text-white">{selectedTime}</strong>. 
        <br />
        Está <span className="text-amber-400 font-bold uppercase tracking-wider text-xs bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 ml-1">Pendiente de Aprobación</span>. Te enviaremos un correo tan pronto como el dueño confirme tu reserva.
      </p>

      <div className="w-full max-w-sm rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-5 text-left mb-8 space-y-3">
        <div className="flex justify-between border-b border-zinc-900 pb-2">
          <span className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">Servicio</span>
          <span className="text-white text-xs font-bold">{selectedService?.name}</span>
        </div>
        <div className="flex justify-between border-b border-zinc-900 pb-2">
          <span className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">Fecha</span>
          <span className="text-white text-xs font-bold">
            {selectedDate?.dayOfWeek}, {selectedDate?.dayNumber} {selectedDate?.month}
          </span>
        </div>
        <div className="flex justify-between border-b border-zinc-900 pb-2">
          <span className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">Hora</span>
          <span className="text-white text-xs font-bold">{selectedTime}</span>
        </div>
        <div className="flex justify-between pt-1">
          <span className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">Total estimado</span>
          <span className="text-blue-400 text-sm font-black">{selectedService?.price}€</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-md justify-center">
        <a
          href={buildGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-zinc-850 hover:bg-zinc-800 text-white border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer"
        >
          <Calendar size={14} className="text-blue-400" />
          Añadir a mi Calendario
        </a>
        <Link
          href="/"
          className="flex items-center justify-center px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all cursor-pointer"
        >
          Volver a Inicio
        </Link>
      </div>
    </motion.div>
  );
}
