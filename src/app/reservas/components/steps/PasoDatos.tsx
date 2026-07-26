import React from "react";
import { motion } from "framer-motion";
import { User, Phone, Mail, FileText, Car } from "lucide-react";
import { ClientInfo } from "../../types";
import { useLanguage } from "@/context/LanguageContext";

interface PasoDatosProps {
  clientInfo: ClientInfo;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function PasoDatos({ clientInfo, onFormChange }: PasoDatosProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <h2 className="text-lg font-bold text-white mb-2">{t("reservas.stepTitles.details")}</h2>
      
      {/* Grid: Name & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-2">
            {t("reservas.form.fullName")}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-500 pointer-events-none">
              <User size={14} />
            </span>
            <input
              type="text"
              id="name"
              required
              value={clientInfo.name}
              onChange={onFormChange}
              className="w-full bg-zinc-950/60 border border-zinc-800 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white transition-all"
              placeholder={t("reservas.form.fullNamePlaceholder")}
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-2">
            {t("reservas.form.phone")}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-500 pointer-events-none">
              <Phone size={14} />
            </span>
            <input
              type="tel"
              id="phone"
              required
              value={clientInfo.phone}
              onChange={onFormChange}
              className="w-full bg-zinc-950/60 border border-zinc-800 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white transition-all"
              placeholder={t("reservas.form.phonePlaceholder")}
            />
          </div>
        </div>
      </div>

      {/* Grid: Email & Car Model */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-2">
            {t("reservas.form.email")}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-500 pointer-events-none">
              <Mail size={14} />
            </span>
            <input
              type="email"
              id="email"
              required
              value={clientInfo.email}
              onChange={onFormChange}
              className="w-full bg-zinc-950/60 border border-zinc-800 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white transition-all"
              placeholder={t("reservas.form.emailPlaceholder")}
            />
          </div>
        </div>

        <div>
          <label htmlFor="carModel" className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-2">
            {t("reservas.form.carModel")}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-500 pointer-events-none">
              <Car size={14} />
            </span>
            <input
              type="text"
              id="carModel"
              required
              value={clientInfo.carModel}
              onChange={onFormChange}
              className="w-full bg-zinc-950/60 border border-zinc-800 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white transition-all"
              placeholder={t("reservas.form.carModelPlaceholder")}
            />
          </div>
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <label htmlFor="notes" className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-2">
          {t("reservas.form.notes")}
        </label>
        <div className="relative">
          <span className="absolute top-3.5 left-3.5 text-zinc-500 pointer-events-none">
            <FileText size={14} />
          </span>
          <textarea
            id="notes"
            rows={3}
            value={clientInfo.notes}
            onChange={onFormChange}
            className="w-full bg-zinc-950/60 border border-zinc-800 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white transition-all resize-none"
            placeholder={t("reservas.form.notesPlaceholder")}
          />
        </div>
      </div>
    </motion.div>
  );
}
