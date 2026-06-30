import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
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

      <Link
        href="/"
        className="px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all cursor-pointer"
      >
        Volver a Inicio
      </Link>
    </motion.div>
  );
}
