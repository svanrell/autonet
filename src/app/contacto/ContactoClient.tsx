"use client";

import { useState, SubmitEvent } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactoClient() {
    const { t } = useLanguage();
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [enviado, setEnviado] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [honeypot, setHoneypot] = useState("");

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Honeypot spam prevention
        if (honeypot) {
            return;
        }

        setIsSubmitting(true);

        console.log("Datos recibidos:");
        console.log(`Nombre: ${nombre}`);
        console.log(`Email: ${email}`);
        console.log(`Mensaje: ${mensaje}`);

        setIsSubmitting(false);
        setNombre("");
        setEmail("");
        setMensaje("");
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
                            {t("contacto.badge")}
                        </span>
                        <h1 className="contacto-titulo">
                            {t("contacto.title")}
                        </h1>
                        <p className="contacto-descripcion">
                            {t("contacto.subtitle")}
                        </p>
                    </div>

                    {/* Rejilla de Dos Columnas */}
                    <div className="contacto-rejilla">

                        {/* Columna Izquierda: Tarjetas de Información de Contacto Interactivas */}
                        <div className="contacto-columna-tarjetas">
                            {/* Tarjeta 1: Escríbenos */}
                            <div className="group contacto-tarjeta-enlace">
                                <div className="contacto-tarjeta-icono">
                                    <Mail size={24} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="contacto-tarjeta-categoria">
                                        {t("contacto.cards.writeUs")}
                                    </p>
                                    <div className="mt-1 h-7 flex items-center">
                                        <Image
                                            src="/contacto/email.svg"
                                            alt="Email de contacto"
                                            width={280}
                                            height={24}
                                            style={{ height: "auto" }}
                                            className="object-contain dark:invert"
                                        />
                                    </div>
                                    <p className="contacto-tarjeta-detalles">
                                        {t("contacto.cards.writeUsDetail")}
                                    </p>
                                </div>
                            </div>

                            {/* Tarjeta 2: Llámanos */}
                            <div className="group contacto-tarjeta-enlace">
                                <div className="contacto-tarjeta-icono">
                                    <Phone size={24} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="contacto-tarjeta-categoria">
                                        {t("contacto.cards.callUs")}
                                    </p>
                                    <div className="mt-1 h-7 flex items-center">
                                        <Image
                                            src="/contacto/telefono.svg"
                                            alt="Teléfono de contacto"
                                            width={180}
                                            height={24}
                                            style={{ height: "auto" }}
                                            className="object-contain dark:invert"
                                        />
                                    </div>
                                    <p className="contacto-tarjeta-detalles">
                                        {t("contacto.cards.callUsDetail")}
                                    </p>
                                </div>
                            </div>

                            {/* Tarjeta 3: Visítanos */}
                            <div className="group contacto-tarjeta-enlace">
                                <div className="contacto-tarjeta-icono">
                                    <MapPin size={24} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="contacto-tarjeta-categoria">
                                        {t("contacto.cards.visitUs")}
                                    </p>
                                    <h3>
                                        {t("contacto.cards.visitUsAddress")}
                                    </h3>
                                    <p className="contacto-tarjeta-detalles">
                                        {t("contacto.cards.visitUsDetail")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Columna Derecha: Formulario de Contacto */}
                        <div className="contacto-formulario-contenedor">
                            <h2 className="text-2xl font-bold mb-6">{t("contacto.form.title")}</h2>

                            {enviado ? (
                                <div className="contacto-exito-contenedor">
                                    <div className="contacto-exito-icono">
                                        <Send size={24} />
                                    </div>
                                    <h3 className="contacto-exito-titulo">{t("contacto.form.successTitle")}</h3>
                                    <p className="contacto-exito-descripcion">
                                        {t("contacto.form.successDesc")}
                                    </p>
                                    <button
                                        onClick={() => setEnviado(false)}
                                        className="contacto-exito-boton"
                                    >
                                        {t("contacto.form.sendAnotherBtn")}
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="contacto-formulario">
                                    <div>
                                        <label htmlFor="nombre" className="contacto-etiqueta">
                                            {t("contacto.form.name")}
                                        </label>
                                        <input
                                            type="text"
                                            id="nombre"
                                            required
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            className="contacto-entrada"
                                            placeholder={t("contacto.form.namePlaceholder")}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="contacto-etiqueta">
                                            {t("contacto.form.email")}
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="contacto-entrada"
                                            placeholder={t("contacto.form.emailPlaceholder")}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="mensaje" className="contacto-etiqueta">
                                            {t("contacto.form.message")}
                                        </label>
                                        <textarea
                                            id="mensaje"
                                            required
                                            rows={5}
                                            value={mensaje}
                                            onChange={(e) => setMensaje(e.target.value)}
                                            className="contacto-entrada resize-none"
                                            placeholder={t("contacto.form.messagePlaceholder")}
                                        />
                                    </div>

                                    {/* Honeypot Spam Protection */}
                                    <div className="hidden" aria-hidden="true">
                                        <input
                                            type="text"
                                            name="website_url"
                                            value={honeypot}
                                            onChange={(e) => setHoneypot(e.target.value)}
                                            tabIndex={-1}
                                            autoComplete="off"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="contacto-boton-enviar disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span>{t("contacto.form.sendingBtn")}</span>
                                                <div className="h-3 w-3 animate-spin rounded-full border border-white border-t-transparent" />
                                            </>
                                        ) : (
                                            <>
                                                <span>{t("contacto.form.sendBtn")}</span>
                                                <Send size={12} />
                                            </>
                                        )}
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
