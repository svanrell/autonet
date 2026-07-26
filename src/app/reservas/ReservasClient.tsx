"use client";

import React, { useState, useEffect } from "react";
import NavBar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Calendar } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { type Service } from "@/data/services";

import { ClientInfo, DateObject } from "./types";
import { getNextDays } from "./utils";
import PasosProgreso from "./components/PasosProgreso";
import PantallaExito from "./components/PantallaExito";
import PasoServicio from "./components/steps/PasoServicio";
import PasoFechaHora from "./components/steps/PasoFechaHora";
import PasoDatos from "./components/steps/PasoDatos";
import PasoResumen from "./components/steps/PasoResumen";
import BotonesAccion from "./components/BotonesAccion";
import { useLanguage } from "@/context/LanguageContext";

export default function ReservasClient() {
  const { language, t } = useLanguage();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<DateObject | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    name: "",
    email: "",
    phone: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableDays, setAvailableDays] = useState<DateObject[]>([]);

  useEffect(() => {
    setAvailableDays(getNextDays(language));
  }, [language]);

  const [occupiedSlots, setOccupiedSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  const handleDateSelect = (day: DateObject) => {
    setSelectedDate(day);
    setSelectedTime("");
  };

  useEffect(() => {
    if (!selectedDate) return;

    const fetchOccupiedSlots = async () => {
      setIsLoadingSlots(true);
      try {
        const response = await fetch(`/api/reservas?date=${selectedDate.dateString}`);
        if (response.ok) {
          const data = await response.json();
          setOccupiedSlots(data.occupiedSlots || []);
        } else {
          console.error("Error al obtener horas ocupadas");
        }
      } catch (err) {
        console.error("Error de conexión al obtener horas ocupadas:", err);
      } finally {
        setIsLoadingSlots(false);
      }
    };

    fetchOccupiedSlots();
  }, [selectedDate]);

  const handleNextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setTimeout(() => handleNextStep(), 200); // Smooth auto-advance
  };

  const isStepValid = () => {
    if (step === 1) return selectedService !== null;
    if (step === 2) return selectedDate !== null && selectedTime !== "" && !isLoadingSlots;
    if (step === 3) return clientInfo.name !== "" && clientInfo.email !== "" && clientInfo.phone !== "";
    return true;
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setClientInfo(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          service: selectedService,
          dateString: selectedDate?.dateString,
          time: selectedTime,
          clientInfo
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t("reservas.errors.generic"));
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("Error al enviar reserva:", err);
      const message = err instanceof Error ? err.message : t("reservas.errors.generic");
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NavBar />
      <main className="contenedor-principal-reservas">
        {/* Decorative backdrop glows */}
        <div className="glow-reservas-1" />
        <div className="glow-reservas-2" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Page Header */}
          {!isSubmitted && (
            <div className="cabecera-reservas">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <Calendar className="w-3.5 h-3.5" />
                {t("nav.book")}
              </span>
              <h1 className="titulo-reservas">{t("reservas.title")}</h1>
              <p className="descripcion-reservas">
                {t("reservas.subtitle")}
              </p>
            </div>
          )}
        
          {/* Stepper container */}
          <div className="reserva-contenedor-pasos">

            {/* Steps Progress Header */}
            {!isSubmitted && <PasosProgreso step={step} />}

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                /* Success Screen */
                <PantallaExito
                  selectedService={selectedService}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                />
              ) : (
                /* Stepper Forms */
                <form onSubmit={handleSubmit}>

                  {step === 1 && (
                    <PasoServicio
                      selectedService={selectedService}
                      onServiceSelect={handleServiceSelect}
                    />
                  )}

                  {step === 2 && (
                    <PasoFechaHora
                      availableDays={availableDays}
                      selectedDate={selectedDate}
                      setSelectedDate={handleDateSelect}
                      selectedTime={selectedTime}
                      setSelectedTime={setSelectedTime}
                      occupiedSlots={occupiedSlots}
                      isLoadingSlots={isLoadingSlots}
                    />
                  )}

                  {step === 3 && (
                    <PasoDatos
                      clientInfo={clientInfo}
                      onFormChange={handleFormChange}
                    />
                  )}

                  {step === 4 && (
                    <PasoResumen
                      selectedService={selectedService}
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      clientInfo={clientInfo}
                    />
                  )}

                  {error && (
                    <div className="mb-4 p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-semibold text-center">
                      {error}
                    </div>
                  )}

                  {/* Actions buttons footer */}
                  <BotonesAccion
                    step={step}
                    handlePrevStep={handlePrevStep}
                    handleNextStep={handleNextStep}
                    isStepValid={isStepValid()}
                    isSubmitting={isSubmitting}
                  />

                </form>
              )}
            </AnimatePresence>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}