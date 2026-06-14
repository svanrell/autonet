"use client";

import { useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactoClient() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [enviado, setEnviado] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí conectarías con tu API, servicio de email (ej. EmailJS, Resend) o Base de datos.
        setEnviado(true);
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-zinc-950 text-white pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Cabecera de la página */}
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-500">
                            ¿Hablamos?
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black mt-3 mb-4 font-display uppercase tracking-tight">
                            Ponte en contacto
                        </h1>
                        <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                            ¿Tienes alguna duda sobre nuestros servicios de detallado o quieres reservar un lavado especial? Escríbenos y te responderemos lo antes posible.
                        </p>
                    </div>

                    {/* Rejilla de Dos Columnas */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

                        {/* Columna Izquierda: Información de contacto */}
                        <div className="lg:col-span-5 flex flex-col justify-between p-8 md:p-10 rounded-2xl bg-zinc-900/40 border border-zinc-900 backdrop-blur-md">
                            <div>
                                <h2 className="text-2xl font-bold mb-8">Información Directa</h2>
                                <ul className="space-y-8">
                                    <li className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                                            <Phone size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold mb-1">Llámanos</p>
                                            <a href="tel:+34123456789" className="text-white hover:text-blue-400 font-semibold transition-colors">
                                                +34 123 456 789
                                            </a>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                                            <Mail size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold mb-1">Escríbenos</p>
                                            <a href="mailto:info@autonet.es" className="text-white hover:text-blue-400 font-semibold transition-colors">
                                                info@autonet.es
                                            </a>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                                            <MapPin size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold mb-1">Visítanos</p>
                                            <p className="text-zinc-300 text-sm leading-relaxed">
                                                Calle de la Limpieza 123<br />
                                                08001 Barcelona, España
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Pequeño mapa de decoración o texto informativo */}
                            <div className="border-t border-zinc-900 pt-8 mt-8 text-xs text-zinc-500">
                                <p>Te responderemos en un plazo máximo de 24 horas laborables.</p>
                            </div>
                        </div>

                        {/* Columna Derecha: Formulario de Contacto */}
                        <div className="lg:col-span-7 p-8 md:p-10 rounded-2xl bg-zinc-900/40 border border-zinc-900 backdrop-blur-md">
                            <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>

                            {enviado ? (
                                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center mb-6">
                                        <Send size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">¡Mensaje enviado con éxito!</h3>
                                    <p className="text-zinc-400 text-sm max-w-sm">
                                        Muchas gracias por contactar con Autonet. Nos pondremos en contacto contigo muy pronto.
                                    </p>
                                    <button
                                        onClick={() => setEnviado(false)}
                                        className="mt-6 text-xs text-blue-400 hover:text-white uppercase tracking-wider font-bold"
                                    >
                                        Enviar otro mensaje
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="nombre" className="block text-xs uppercase tracking-wider font-bold text-zinc-400 mb-2">
                                            Nombre Completo
                                        </label>
                                        <input
                                            type="text"
                                            id="nombre"
                                            required
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            className="w-full bg-zinc-950/60 border border-zinc-900 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white transition-all"
                                            placeholder="Ej. Juan Pérez"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-xs uppercase tracking-wider font-bold text-zinc-400 mb-2">
                                            Correo Electrónico
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-zinc-950/60 border border-zinc-900 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white transition-all"
                                            placeholder="juan@ejemplo.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="mensaje" className="block text-xs uppercase tracking-wider font-bold text-zinc-400 mb-2">
                                            Mensaje
                                        </label>
                                        <textarea
                                            id="mensaje"
                                            required
                                            rows={5}
                                            value={mensaje}
                                            onChange={(e) => setMensaje(e.target.value)}
                                            className="w-full bg-zinc-950/60 border border-zinc-900 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white transition-all resize-none"
                                            placeholder="Cuéntanos en qué podemos ayudarte..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 active:scale-[0.98]"
                                    >
                                        <span>Enviar Mensaje</span>
                                        <Send size={12} />
                                    </button>
                                </form>
                            )}
                        </div>

                    </div>

                </div>
            </main>
            <Footer />
        </>
    );
}
