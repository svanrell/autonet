"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
    Sparkles,  // Para el icono del logo
    Menu,      // Para abrir menú móvil
    X          // Para cerrar menú móvil
} from "lucide-react";

const links = [
    { href: "/", label: "Inicio" },
    { href: "/servicios", label: "Servicios" },
    { href: "/proceso", label: "El Proceso" },
    { href: "/galeria", label: "Galería" },
    { href: "/testimonios", label: "Testimonios" },
    { href: "/contacto", label: "Contacto" },
];

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="cabecera-principal">
            <div className="contenedor-nav">
                <div className="fila-nav">

                    {/* 1. LOGO */}
                    <Link href="/" className="logo-completo group">
                        <div className="circulo-logo">
                            <Image src="/favicon.ico" alt="Autonet" width={40} height={40} />
                        </div>
                        <div className="textos-logo">
                            <span className="titulo-logo font-display">
                                AUTONET
                            </span>
                            <span className="subtitulo-logo">
                                Limpieza de Coches
                            </span>
                        </div>
                    </Link>

                    {/* 2. ENLACES (Escritorio) */}
                    <nav className="enlaces-escritorio">
                        <ul className="lista-enlaces">
                            {links.map((link) => {
                                const activo = pathname === link.href;
                                return (
                                    <li key={link.href} className="enlace-item">
                                        <Link
                                            href={link.href}
                                            className={`enlace-texto ${
                                                activo ? "enlace-activo" : "enlace-inactivo"
                                            }`}
                                        >
                                            {link.label}
                                        </Link>

                                        {/* Línea azul activa inferior */}
                                        {activo && (
                                            <span className="barra-activa" />
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* 3. BOTÓN RESERVA */}
                    <div className="contenedor-boton">
                        <Link href="/reserva" className="boton-reserva">
                            Reserva
                        </Link>
                    </div>

                    {/* BOTÓN MENÚ MÓVIL */}
                    <div className="boton-menu-movil">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="icono-menu-movil"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>

                </div>
            </div>

            {/* MENÚ MÓVIL DESPLEGABLE */}
            {isOpen && (
                <div className="menu-desplegable-movil">
                    <div className="lista-movil">
                        {links.map((link) => {
                            const activo = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`enlace-movil ${
                                        activo ? "enlace-movil-activo" : "enlace-movil-inactivo"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="pie-menu-movil">
                        <Link
                            href="/reserva"
                            onClick={() => setIsOpen(false)}
                            className="boton-reserva-movil"
                        >
                            Reserva
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
