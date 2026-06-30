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
import PasoServicio from "./components/PasoServicio";
import PasoFechaHora from "./components/PasoFechaHora";
import PasoDatos from "./components/PasoDatos";
import PasoResumen from "./components/PasoResumen";
import BotonesAccion from "./components/BotonesAccion";

export default function ReservasClient() {
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
  const [availableDays, setAvailableDays] = useState<DateObject[]>([]);

  useEffect(() => {
    setAvailableDays(getNextDays());
  }, []);

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
    if (step === 2) return selectedDate !== null && selectedTime !== "";
    if (step === 3) return clientInfo.name !== "" && clientInfo.email !== "" && clientInfo.phone !== "";
    return true;
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setClientInfo(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid()) return;

    setIsSubmitting(true);

    // Simulate submission to the user's future API
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
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
                Reserva Online
              </span>
              <h1 className="titulo-reservas">Reserva tu cita</h1>
              <p className="descripcion-reservas">
                Agenda tu limpieza de coche en menos de 2 minutos. Rellena los datos y confirmaremos tu cita por correo electrónico.
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
                      setSelectedDate={setSelectedDate}
                      selectedTime={selectedTime}
                      setSelectedTime={setSelectedTime}
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