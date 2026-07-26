import React from "react";
import { motion } from "framer-motion";
import type { Service } from "@/data/services";
import { ClientInfo, DateObject } from "../../types";
import { useLanguage } from "@/context/LanguageContext";

interface PasoResumenProps {
  selectedService: Service | null;
  selectedDate: DateObject | null;
  selectedTime: string;
  clientInfo: ClientInfo;
}

export default function PasoResumen({
  selectedService,
  selectedDate,
  selectedTime,
  clientInfo
}: PasoResumenProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-5"
    >
      <h2 className="text-lg font-bold text-white mb-2">{t("reservas.stepTitles.summary")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Service & Date details */}
        <div className="p-5 rounded-xl border border-zinc-800/80 bg-zinc-950/40 space-y-3.5">
          <h3 className="text-xs uppercase font-bold tracking-widest text-blue-400 mb-2">{t("reservas.summary.serviceDetails")}</h3>

          <div className="flex justify-between text-xs">
            <span className="text-zinc-500">{t("reservas.summary.selectedService")}</span>
            <span className="text-white font-bold">{selectedService ? t(`services.${selectedService.id}.name`) : ""}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-zinc-500">{t("reservas.summary.duration")}</span>
            <span className="text-white font-bold">{selectedService?.duration}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-zinc-500">{t("reservas.summary.date")}</span>
            <span className="text-white font-bold">
              {selectedDate?.dayOfWeek}, {selectedDate?.dayNumber} {selectedDate?.month}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-zinc-500">{t("reservas.summary.time")}</span>
            <span className="text-white font-bold">{selectedTime}</span>
          </div>
          <div className="flex justify-between text-xs border-t border-zinc-900 pt-3">
            <span className="text-zinc-500 font-medium">{t("reservas.summary.price")}</span>
            <span className="text-emerald-400 font-extrabold text-sm">{selectedService?.price}€</span>
          </div>
        </div>

        {/* Customer contact & vehicle details */}
        <div className="p-5 rounded-xl border border-zinc-800/80 bg-zinc-950/40 space-y-3.5">
          <h3 className="text-xs uppercase font-bold tracking-widest text-blue-400 mb-2">{t("reservas.summary.contactDetails")}</h3>

          <div className="flex justify-between text-xs">
            <span className="text-zinc-500">{t("reservas.summary.name")}</span>
            <span className="text-white font-bold">{clientInfo.name}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-zinc-500">{t("reservas.summary.phone")}</span>
            <span className="text-white font-bold">{clientInfo.phone}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-zinc-500">{t("reservas.summary.email")}</span>
            <span className="text-white font-bold truncate max-w-[200px]">{clientInfo.email}</span>
          </div>
          <div className="flex justify-between text-xs border-t border-zinc-900 pt-3">
            <span className="text-zinc-400 font-bold">{t("reservas.summary.carModel")}</span>
            <span className="text-white font-extrabold">{clientInfo.carModel}</span>
          </div>

          {clientInfo.notes && (
            <div className="flex flex-col text-xs border-t border-zinc-900 pt-3">
              <span className="text-zinc-500 mb-1">{t("reservas.summary.notes")}</span>
              <span className="text-zinc-300 italic line-clamp-2">&ldquo;{clientInfo.notes}&rdquo;</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
