import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar } from "lucide-react";
import Link from "next/link";
import { type Service } from "@/data/services";
import { ClientInfo, DateObject } from "../types";
import { useLanguage } from "@/context/LanguageContext";

interface PantallaExitoProps {
  selectedService: Service | null;
  selectedDate: DateObject | null;
  selectedTime: string;
  clientInfo?: ClientInfo;
}

export default function PantallaExito({
  selectedService,
  selectedDate,
  selectedTime,
  clientInfo
}: PantallaExitoProps) {
  const { t, language } = useLanguage();

  const serviceName = selectedService ? t(`services.${selectedService.id}.name`) : "";

  const buildGoogleCalendarUrl = () => {
    if (!selectedDate || !selectedService) return "#";
    
    // Construct local Date object based on local time context
    const [year, month, day] = selectedDate.dateString.split("-").map(Number);
    const [hours, minutes] = selectedTime.split(":").map(Number);
    const localDate = new Date(year, month - 1, day, hours, minutes);
    
    const durationMin = parseInt(selectedService.duration.replace(/\D/g, "") || "60", 10);
    const endDate = new Date(localDate.getTime() + durationMin * 60 * 1000);
    
    const formatGoogleUTC = (d: Date) => {
      return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };
    
    const dates = `${formatGoogleUTC(localDate)}/${formatGoogleUTC(endDate)}`;
    
    const carInfo = clientInfo?.carModel ? ` - ${clientInfo.carModel}` : "";
    const text = encodeURIComponent(`🚗 Cita Autonet: ${serviceName}${carInfo}`);
    const location = encodeURIComponent("Carrer de Vicenç Joan i Rosselló, 42, Ponent, 07013 Palma, Illes Balears");

    const details = encodeURIComponent(
      `🚗 DETALLES DE LA RESERVA AUTONET 🚗\n\n` +
      `Servicio: ${serviceName}\n` +
      `Precio: ${selectedService.price}€\n` +
      `Duración: ${selectedService.duration}\n` +
      (clientInfo?.carModel ? `Modelo del coche: ${clientInfo.carModel}\n` : "") +
      (clientInfo?.name ? `Nombre: ${clientInfo.name}\n` : "") +
      (clientInfo?.phone ? `Teléfono: ${clientInfo.phone}\n` : "") +
      (clientInfo?.email ? `Email: ${clientInfo.email}\n` : "") +
      (clientInfo?.notes ? `Notas adicionales: ${clientInfo.notes}\n` : "") +
      `\nUbicación: Carrer de Vicenç Joan i Rosselló, 42, Palma`
    );
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
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
        {t("reservas.success.title")}
      </h2>
      <p className="text-zinc-400 text-sm md:text-base max-w-md mb-8 leading-relaxed">
        {language === "es" || language === "ca" ? (
          <>
            {t("reservas.success.registeredFor")}{" "}
            <strong className="text-white">
              {selectedDate?.dayNumber} {selectedDate?.month}
            </strong>{" "}
            {t("reservas.success.at")}{" "}
            <strong className="text-white">{selectedTime}</strong>.
          </>
        ) : (
          <>
            {t("reservas.success.registeredFor")}{" "}
            <strong className="text-white">
              {selectedDate?.month} {selectedDate?.dayNumber}
            </strong>{" "}
            {t("reservas.success.at")}{" "}
            <strong className="text-white">{selectedTime}</strong>.
          </>
        )}
        <br />
        <span className="text-amber-400 font-bold uppercase tracking-wider text-xs bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 mr-1 inline-block mt-2">
          {t("reservas.success.pendingStatus")}
        </span>
        {" "}{t("reservas.success.willNotify")}
      </p>

      <div className="w-full max-w-sm rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-5 text-left mb-8 space-y-3">
        <div className="flex justify-between border-b border-zinc-900 pb-2">
          <span className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">{t("reservas.summary.selectedService")}</span>
          <span className="text-white text-xs font-bold">{serviceName}</span>
        </div>
        {clientInfo?.carModel && (
          <div className="flex justify-between border-b border-zinc-900 pb-2">
            <span className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">{t("reservas.summary.carModel")}</span>
            <span className="text-white text-xs font-bold">{clientInfo.carModel}</span>
          </div>
        )}
        <div className="flex justify-between border-b border-zinc-900 pb-2">
          <span className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">{t("reservas.summary.date")}</span>
          <span className="text-white text-xs font-bold">
            {selectedDate?.dayOfWeek}, {selectedDate?.dayNumber} {selectedDate?.month}
          </span>
        </div>
        <div className="flex justify-between border-b border-zinc-900 pb-2">
          <span className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">{t("reservas.summary.time")}</span>
          <span className="text-white text-xs font-bold">{selectedTime}</span>
        </div>
        <div className="flex justify-between pt-1">
          <span className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">{t("reservas.summary.price")}</span>
          <span className="text-blue-400 text-sm font-black">{selectedService?.price}€</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-md justify-center">
        <a
          href={buildGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-zinc-600 transition-all cursor-pointer shadow-md"
        >
          <Calendar size={14} className="text-blue-400" />
          {t("reservas.success.addToCalendar")}
        </a>
        <Link
          href="/"
          className="flex items-center justify-center px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all cursor-pointer"
        >
          {t("reservas.backToHome")}
        </Link>
      </div>
    </motion.div>
  );
}
