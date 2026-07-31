"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
    Menu,      // Para abrir menú móvil
    X          // Para cerrar menú móvil
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLanguage } from "@/context/LanguageContext";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { t } = useLanguage();

    const links = [
        { href: "/", label: t("nav.home") },
        { href: "/servicios", label: t("nav.services") },
        { href: "/testimonios", label: t("nav.testimonials") },
    ];

    return (
        <header className="cabecera-principal">
            <div className="contenedor-nav">
                <div className="fila-nav">

                    {/* 1. LOGO */}
                    <Link href="/" className="logo-completo group">
                        <div className="circulo-logo shrink-0">
                            <Image src="/logo/logo.webp" alt="Autonet" width={36} height={36} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                        </div>
                        <div className="textos-logo">
                            <span className="titulo-logo font-display text-base sm:text-xl">
                                AUTONET
                            </span>
                            <span className="subtitulo-logo hidden xs:block text-[8px] sm:text-[9px]">
                                {t("nav.logoSubtitle")}
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
                                            className={`enlace-texto ${activo ? "enlace-activo" : "enlace-inactivo"
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

                    {/* 3. CONTROLES */}
                    <div className="contenedor-boton gap-3 lg:gap-4">
                        <LanguageToggle />
                        <ThemeToggle />
                    </div>

                    {/* BOTÓN MENÚ MÓVIL */}
                    <div className="boton-menu-movil items-center gap-1.5 sm:gap-3">
                        <LanguageToggle />
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="icono-menu-movil p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                            aria-label="Abrir menú"
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
                                    className={`enlace-movil ${activo ? "enlace-movil-activo" : "enlace-movil-inactivo"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </header>
    );
}
