import React from "react";
import { motion } from "framer-motion";
import { User, Phone, Mail, FileText } from "lucide-react";
import { ClientInfo } from "../types";

interface PasoDatosProps {
  clientInfo: ClientInfo;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function PasoDatos({ clientInfo, onFormChange }: PasoDatosProps) {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <h2 className="text-lg font-bold text-white mb-2">3. Completa tus datos personales</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-2">
            Nombre Completo
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-600 pointer-events-none">
              <User size={14} />
            </span>
            <input
              type="text"
              id="name"
              required
              value={clientInfo.name}
              onChange={onFormChange}
              className="w-full bg-zinc-950/60 border border-zinc-900 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white transition-all"
              placeholder="Ej. Juan Pérez"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-2">
            Teléfono
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-600 pointer-events-none">
              <Phone size={14} />
            </span>
            <input
              type="tel"
              id="phone"
              required
              value={clientInfo.phone}
              onChange={onFormChange}
              className="w-full bg-zinc-950/60 border border-zinc-900 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white transition-all"
              placeholder="Ej. +34 600 000 000"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-2">
          Correo Electrónico
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-600 pointer-events-none">
            <Mail size={14} />
          </span>
          <input
            type="email"
            id="email"
            required
            value={clientInfo.email}
            onChange={onFormChange}
            className="w-full bg-zinc-950/60 border border-zinc-900 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white transition-all"
            placeholder="juan@ejemplo.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-2">
          Notas Adicionales (Opcional)
        </label>
        <div className="relative">
          <span className="absolute top-3.5 left-3.5 text-zinc-600 pointer-events-none">
            <FileText size={14} />
          </span>
          <textarea
            id="notes"
            rows={3}
            value={clientInfo.notes}
            onChange={onFormChange}
            className="w-full bg-zinc-950/60 border border-zinc-900 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white transition-all resize-none"
            placeholder="Ej. Mi coche es un SUV grande, o detalles sobre manchas específicas..."
          />
        </div>
      </div>
    </motion.div>
  );
}
