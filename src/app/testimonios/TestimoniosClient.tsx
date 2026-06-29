"use client";

import NavBar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import reviews from "@/reviews.json";
import { Star, Quote, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const getInitials = (name: string) => {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
};

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
        },
    },
} as const;

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
} as const;

export default function TestimoniosClient() {
    return (
        <>
            <NavBar />
            <main className="contenedor-principal-testimonios">
                {/* Glow Effects */}
                <div className="glow-testimonios-1" />
                <div className="glow-testimonios-2" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {/* Header Section */}
                    <div className="cabecera-testimonios">
                        <div className="badge-testimonios">
                            <Sparkles className="w-3.5 h-3.5" />
                            Opiniones de nuestros clientes
                        </div>
                        <h1 className="titulo-testimonios">
                            Lo que dicen de nosotros
                        </h1>
                        <p className="descripcion-testimonios">
                            La satisfacción de nuestros clientes es nuestra mayor prioridad. Descubre las experiencias y opiniones de quienes ya confían en nosotros para el cuidado de sus vehículos.
                        </p>
                    </div>

                    {/* Testimonials Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="rejilla-testimonios"
                    >
                        {reviews.map((review, index) => {
                            const initials = getInitials(review.nombre);
                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ y: -6 }}
                                    className="tarjeta-testimonio"
                                >
                                    {/* Decorative Quote Icon */}
                                    <div className="tarjeta-comilla">
                                        <Quote className="w-12 h-12 rotate-180" />
                                    </div>

                                    <div>
                                        {/* Stars */}
                                        <div className="estrellas-contenedor">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < review.estrellas
                                                            ? "fill-amber-400 text-amber-400"
                                                            : "text-zinc-700"
                                                        }`}
                                                />
                                            ))}
                                        </div>

                                        {/* Review text */}
                                        <p className="texto-reseña">
                                            "{review.reseña}"
                                        </p>
                                    </div>

                                    {/* Client info footer */}
                                    <div className="cliente-info-footer">
                                        <div className="avatar-iniciales">
                                            {initials}
                                        </div>
                                        <div>
                                            <h3 className="cliente-nombre">
                                                {review.nombre}
                                            </h3>
                                            <p className="cliente-rol">
                                                Cliente Verificado
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* CTA / Reservas section */}
                    <div className="contenedor-boton-reserva-testimonios">
                        <div className="reserva-testimonios-contenido">
                            <h2 className="reserva-testimonios-titulo">
                                ¿Quieres dejar tu opinión?
                            </h2>
                            <p className="reserva-testimonios-desc">
                                La experiencia de cada cliente es muy valiosa para nosotros. Agenda una cita hoy y experimenta nuestro servicio excepcional de detallado.
                            </p>
                            <Link href="/reservas" className="boton-reserva">
                                Reservar Cita
                            </Link>
                        </div>
                        {/* Ambient blobs */}
                        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}