"use client";

import React, { useState, useEffect } from "react";
import NavBar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { 
  Car, 
  Sparkles, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  Calendar, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  icon: React.ComponentType<any>;
}

const services: Service[] = [
  {
    id: "exterior",
    name: "Limpieza Exterior",
    description: "Lavado a mano ecológico, secado con microfibra, limpieza profunda de llantas y acondicionamiento de neumáticos.",
    price: 25,
    duration: "45 min",
    icon: Car
  },
  {
    id: "interior",
    name: "Limpieza Interior",
    description: "Aspirado completo de alfombras y asientos, limpieza de plásticos, salpicadero, cristales y desinfección de conductos.",
    price: 35,
    duration: "60 min",
    icon: Sparkles
  },
  {
    id: "tapiceria",
    name: "Limpieza de Tapicerías",
    description: "Lavado con inyección y extracción para eliminar manchas difíciles en asientos, alfombrillas e hidratación de tapicería.",
    price: 60,
    duration: "90 min",
    icon: Clock
  },
  {
    id: "premium",
    name: "Detallado Premium (Full)",
    description: "Tratamiento completo exterior e interior con descontaminado de pintura, encerado cerámico y tratamiento protector de plásticos.",
    price: 120,
    duration: "180 min",
    icon: Sparkles
  }
];

const timeSlots = {
  morning: ["09:00", "10:30", "12:00"],
  afternoon: ["14:30", "16:00", "17:30"]
};

// Generates next 7 business days (excludes Sunday)
const getNextDays = () => {
  const days = [];
  const today = new Date();
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  
  for (let i = 1; i < 15; i++) {
    const nextDay = new Date();
    nextDay.setDate(today.getDate() + i);
    // Exclude Sundays (0)
    if (nextDay.getDay() !== 0) {
      days.push({
        dateString: nextDay.toISOString().split("T")[0],
        dayOfWeek: dayNames[nextDay.getDay()],
        dayNumber: nextDay.getDate(),
        month: monthNames[nextDay.getMonth()]
      });
    }
    if (days.length === 7) break;
  }
  return days;
};

export default function ReservasClient() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<{ dateString: string; dayOfWeek: string; dayNumber: number; month: string } | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [availableDays, setAvailableDays] = useState<any[]>([]);

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
            {!isSubmitted && (
              <div className="reserva-pasos-cabecera">
                {[
                  { num: 1, label: "Servicio" },
                  { num: 2, label: "Fecha y Hora" },
                  { num: 3, label: "Tus Datos" },
                  { num: 4, label: "Resumen" }
                ].map((item) => {
                  const isCompleted = step > item.num;
                  const isActive = step === item.num;
                  
                  return (
                    <div key={item.num} className="reserva-paso-indicador">
                      <div className={`reserva-paso-numero ${
                        isCompleted ? "completado" : isActive ? "activo" : "inactivo"
                      }`}>
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : item.num}
                      </div>
                      <span className={`reserva-paso-texto ${
                        isActive || isCompleted ? "activo" : "inactivo"
                      }`}>
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                /* Success Screen */
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
                      <span className="text-white text-xs font-bold">{selectedDate?.dayOfWeek}, {selectedDate?.dayNumber} {selectedDate?.month}</span>
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

                  <Link href="/" className="px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all cursor-pointer">
                    Volver a Inicio
                  </Link>
                </motion.div>
              ) : (
                /* Stepper Forms */
                <form onSubmit={handleSubmit}>
                  
                  {/* Step 1: Select Service */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h2 className="text-lg font-bold text-white mb-2">1. Selecciona un Servicio</h2>
                      <div className="reserva-servicios-grid">
                        {services.map((service) => {
                          const Icon = service.icon;
                          const isSelected = selectedService?.id === service.id;
                          
                          return (
                            <div
                              key={service.id}
                              onClick={() => handleServiceSelect(service)}
                              className={`reserva-servicio-tarjeta ${
                                isSelected ? "seleccionado" : ""
                              }`}
                            >
                              <div className="reserva-servicio-info">
                                <div className="reserva-servicio-icono">
                                  <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                  <h3 className="reserva-servicio-nombre">{service.name}</h3>
                                  <p className="reserva-servicio-desc">{service.description}</p>
                                </div>
                              </div>
                              <div className="reserva-servicio-precio-tiempo">
                                <span className="reserva-servicio-precio">{service.price}€</span>
                                <span className="reserva-servicio-tiempo">{service.duration}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Choose Date & Hour */}
                  {step === 2 && (
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
                          <h3 className="reserva-horas-titulo">Horas Disponibles para el {selectedDate.dayNumber} de {selectedDate.month}</h3>
                          
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
                  )}

                  {/* Step 3: Client Details */}
                  {step === 3 && (
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
                              onChange={handleFormChange}
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
                              onChange={handleFormChange}
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
                            onChange={handleFormChange}
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
                            onChange={handleFormChange}
                            className="w-full bg-zinc-950/60 border border-zinc-900 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white transition-all resize-none"
                            placeholder="Ej. Mi coche es un SUV grande, o detalles sobre manchas específicas..."
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Summary Review */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <h2 className="text-lg font-bold text-white mb-2">4. Resumen de la Solicitud</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Service & Date details */}
                        <div className="p-5 rounded-xl border border-zinc-800/80 bg-zinc-950/40 space-y-3.5">
                          <h3 className="text-xs uppercase font-bold tracking-widest text-blue-400 mb-2">Datos del Servicio</h3>
                          
                          <div className="flex justify-between text-xs">
                            <span className="text-zinc-500">Servicio seleccionado</span>
                            <span className="text-white font-bold">{selectedService?.name}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-zinc-500">Duración estimada</span>
                            <span className="text-white font-bold">{selectedService?.duration}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-zinc-500">Fecha elegida</span>
                            <span className="text-white font-bold">{selectedDate?.dayOfWeek}, {selectedDate?.dayNumber} {selectedDate?.month}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-zinc-500">Hora</span>
                            <span className="text-white font-bold">{selectedTime}</span>
                          </div>
                          <div className="flex justify-between text-xs border-t border-zinc-900 pt-3">
                            <span className="text-zinc-500 font-medium">Precio total</span>
                            <span className="text-emerald-400 font-extrabold text-sm">{selectedService?.price}€</span>
                          </div>
                        </div>

                        {/* Customer contact details */}
                        <div className="p-5 rounded-xl border border-zinc-800/80 bg-zinc-950/40 space-y-3.5">
                          <h3 className="text-xs uppercase font-bold tracking-widest text-blue-400 mb-2">Contacto</h3>
                          
                          <div className="flex justify-between text-xs">
                            <span className="text-zinc-500">Nombre</span>
                            <span className="text-white font-bold">{clientInfo.name}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-zinc-500">Teléfono</span>
                            <span className="text-white font-bold">{clientInfo.phone}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-zinc-500">Email</span>
                            <span className="text-white font-bold truncate max-w-[200px]">{clientInfo.email}</span>
                          </div>
                          {clientInfo.notes && (
                            <div className="flex flex-col text-xs border-t border-zinc-900 pt-3">
                              <span className="text-zinc-500 mb-1">Notas</span>
                              <span className="text-zinc-300 italic line-clamp-2">"{clientInfo.notes}"</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Actions buttons footer */}
                  <div className="reserva-acciones">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="reserva-boton-atras"
                      >
                        <span className="flex items-center gap-1">
                          <ChevronLeft size={14} /> Atrás
                        </span>
                      </button>
                    ) : (
                      <div /> // Spacer
                    )}

                    {step < 4 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        disabled={!isStepValid()}
                        className="reserva-boton-siguiente"
                      >
                        <span className="flex items-center gap-1">
                          Siguiente <ChevronRight size={14} />
                        </span>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="reserva-boton-siguiente bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            Procesando...
                            <Loader2 className="w-4 h-4 animate-spin" />
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            Confirmar Cita <ChevronRight size={14} />
                          </span>
                        )}
                      </button>
                    )}
                  </div>

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