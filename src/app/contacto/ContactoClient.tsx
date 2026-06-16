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
            <main className="contacto-seccion">
                <div className="contacto-contenedor">

                    {/* Cabecera de la página */}
                    <div className="contacto-cabecera">
                        <span className="contacto-subtitulo">
                            ¿Hablamos?
                        </span>
                        <h1 className="contacto-titulo">
                            Ponte en contacto
                        </h1>
                        <p className="contacto-descripcion">
                            ¿Tienes alguna duda sobre nuestros servicios de detallado o quieres reservar un lavado especial? Escríbenos y te responderemos lo antes posible.
                        </p>
                    </div>

                    {/* Rejilla de Dos Columnas */}
                    <div className="contacto-rejilla">

                        {/* Columna Izquierda: Tarjetas de Información de Contacto Interactivas */}
                        <div className="contacto-columna-tarjetas">
                            {/* Tarjeta 1: Escríbenos */}
                            <a 
                                href="mailto:info@autonet.es" 
                                className="group contacto-tarjeta-enlace"
                            >
                                <div className="contacto-tarjeta-icono">
                                    <Mail size={24} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="contacto-tarjeta-categoria">
                                        Escríbenos
                                    </p>
                                    <h3 className="contacto-tarjeta-valor">
                                        info@autonet.es
                                    </h3>
                                    <p className="contacto-tarjeta-detalles">
                                        Respuesta en 2-4 horas
                                    </p>
                                </div>
                            </a>

                            {/* Tarjeta 2: Llámanos */}
                            <a 
                                href="tel:+34123456789" 
                                className="group contacto-tarjeta-enlace"
                            >
                                <div className="contacto-tarjeta-icono">
                                    <Phone size={24} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="contacto-tarjeta-categoria">
                                        Llámanos
                                    </p>
                                    <h3 className="contacto-tarjeta-valor">
                                        +34 123 456 789
                                    </h3>
                                    <p className="contacto-tarjeta-detalles">
                                        Disponible L-V 9:00 - 19:00
                                    </p>
                                </div>
                            </a>

                            {/* Tarjeta 3: Visítanos */}
                            <div 
                                className="group contacto-tarjeta-enlace"
                            >
                                <div className="contacto-tarjeta-icono">
                                    <MapPin size={24} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="contacto-tarjeta-categoria">
                                        Visítanos
                                    </p>
                                    <h3 className="contacto-tarjeta-valor">
                                        Calle de la Limpieza 123, BCN
                                    </h3>
                                    <p className="contacto-tarjeta-detalles">
                                        Servicio con cita previa
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Columna Derecha: Formulario de Contacto */}
                        <div className="contacto-formulario-contenedor">
                            <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>

                            {enviado ? (
                                <div className="contacto-exito-contenedor">
                                    <div className="contacto-exito-icono">
                                        <Send size={24} />
                                    </div>
                                    <h3 className="contacto-exito-titulo">¡Mensaje enviado con éxito!</h3>
                                    <p className="contacto-exito-descripcion">
                                        Muchas gracias por contactar con Autonet. Nos pondremos en contacto contigo muy pronto.
                                    </p>
                                    <button
                                        onClick={() => setEnviado(false)}
                                        className="contacto-exito-boton"
                                    >
                                        Enviar otro mensaje
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="contacto-formulario">
                                    <div>
                                        <label htmlFor="nombre" className="contacto-etiqueta">
                                            Nombre Completo
                                        </label>
                                        <input
                                            type="text"
                                            id="nombre"
                                            required
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            className="contacto-entrada"
                                            placeholder="Ej. Juan Pérez"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="contacto-etiqueta">
                                            Correo Electrónico
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="contacto-entrada"
                                            placeholder="juan@ejemplo.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="mensaje" className="contacto-etiqueta">
                                            Mensaje
                                        </label>
                                        <textarea
                                            id="mensaje"
                                            required
                                            rows={5}
                                            value={mensaje}
                                            onChange={(e) => setMensaje(e.target.value)}
                                            className="contacto-entrada resize-none"
                                            placeholder="Cuéntanos en qué podemos ayudarte..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="contacto-boton-enviar"
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
