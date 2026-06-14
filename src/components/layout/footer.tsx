"use client";

import Link from "next/link";
import Image from "next/image";
import {
    Mail,
    Phone,
    MapPin,
    ShieldCheck
} from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="pie-principal">
            <div className="contenedor-footer">
                <div className="rejilla-footer">
                    
                    {/* COLUMNA 1: INFO DE MARCA */}
                    <div className="columna-footer info-marca">
                        <Link href="/" className="logo-completo-footer group">
                            <div className="circulo-logo-footer">
                                <Image src="/logo/logo.webp" alt="Autonet" width={36} height={36} />
                            </div>
                            <div className="textos-logo">
                                <span className="titulo-logo font-display">AUTONET</span>
                                <span className="subtitulo-logo">Limpieza de Coches</span>
                            </div>
                        </Link>
                        <p className="descripcion-marca">
                            Líderes en detallado y limpieza ecológica de vehículos. Cuidamos cada detalle de tu coche utilizando tecnología avanzada y productos respetuosos con el medio ambiente.
                        </p>
                        <div className="redes-sociales">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icono-red" aria-label="Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="icono-red" aria-label="Facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="icono-red" aria-label="Twitter">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                            </a>
                        </div>
                    </div>

                    {/* COLUMNA 2: ENLACES RÁPIDOS */}
                    <div className="columna-footer">
                        <h3 className="titulo-columna">Enlaces Rápidos</h3>
                        <ul className="lista-enlaces-footer">
                            <li>
                                <Link href="/" className="enlace-footer">Inicio</Link>
                            </li>
                            <li>
                                <Link href="/servicios" className="enlace-footer">Servicios</Link>
                            </li>
                            <li>
                                <Link href="/proceso" className="enlace-footer">El Proceso</Link>
                            </li>
                            <li>
                                <Link href="/galeria" className="enlace-footer">Galería</Link>
                            </li>
                            <li>
                                <Link href="/testimonios" className="enlace-footer">Testimonios</Link>
                            </li>
                            <li>
                                <Link href="/contacto" className="enlace-footer">Contacto</Link>
                            </li>
                        </ul>
                    </div>

                    {/* COLUMNA 3: HORARIOS */}
                    <div className="columna-footer">
                        <h3 className="titulo-columna">Horarios</h3>
                        <ul className="horarios-footer">
                            <li className="horario-item">
                                <span className="dia-semana">Lunes a Viernes</span>
                                <span className="horas">09:00 - 18:00</span>
                            </li>
                            <li className="horario-item">
                                <span className="dia-semana">Sábados</span>
                                <span className="horas">09:00 - 14:00</span>
                            </li>
                            <li className="horario-item">
                                <span className="dia-semana">Domingos</span>
                                <span className="horas cerrado">Cerrado</span>
                            </li>
                        </ul>
                        <div className="garantia-calidad">
                            <ShieldCheck size={16} className="text-blue-500" />
                            <span>Garantía de satisfacción Autonet</span>
                        </div>
                    </div>

                    {/* COLUMNA 4: CONTACTO */}
                    <div className="columna-footer">
                        <h3 className="titulo-columna">Contacto</h3>
                        <ul className="contacto-footer">
                            <li className="contacto-item">
                                <Phone size={16} className="icono-contacto" />
                                <a href="tel:+34123456789" className="contacto-texto">+34 123 456 789</a>
                            </li>
                            <li className="contacto-item">
                                <Mail size={16} className="icono-contacto" />
                                <a href="mailto:info@autonet.es" className="contacto-texto">info@autonet.es</a>
                            </li>
                            <li className="contacto-item-dir">
                                <MapPin size={16} className="icono-contacto flex-shrink-0 mt-1" />
                                <span className="contacto-texto">
                                    Calle de la Limpieza 123<br />
                                    08001 Barcelona, España
                                </span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* BARRA INFERIOR DE DERECHOS */}
                <div className="barra-derechos">
                    <p className="texto-derechos">
                        &copy; {currentYear} Autonet Limpieza de Coches. Todos los derechos reservados.
                    </p>
                    <div className="enlaces-legales">
                        <Link href="/privacidad" className="enlace-legal">Política de Privacidad</Link>
                        <span className="separador-legal">|</span>
                        <Link href="/cookies" className="enlace-legal">Política de Cookies</Link>
                        <span className="separador-legal">|</span>
                        <Link href="/legal" className="enlace-legal">Aviso Legal</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
