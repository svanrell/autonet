"use client";

import Link from "next/link";
import Image from "next/image";
import Iframe from "../ui/iframe";
import { useLanguage } from "@/context/LanguageContext";

import {
    Phone,
    ShieldCheck
} from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { t } = useLanguage();

    return (
        <footer className="pie-principal">
            <div className="contenedor-footer">
                <div className="rejilla-footer">

                    {/* COLUMNA 1: INFO DE MARCA */}
                    <div className="columna-footer info-marca">
                        <Link href="/" className="logo-completo-footer group">
                            <div className="circulo-logo-footer">
                                <Image src="/logo/logo.svg" alt="Autonet" width={36} height={36} />
                            </div>
                            <div className="textos-logo">
                                <span className="titulo-logo font-display">AUTONET</span>
                                <span className="subtitulo-logo">{t("nav.logoSubtitle")}</span>
                            </div>
                        </Link>
                        <p className="descripcion-marca">
                            {t("footer.description")}
                        </p>
                    </div>

                    {/* COLUMNA 2: ENLACES RÁPIDOS */}
                    <div className="columna-footer">
                        <h3 className="titulo-columna">{t("footer.quickLinks")}</h3>
                        <ul className="lista-enlaces-footer">
                            <li>
                                <Link href="/" className="enlace-footer">{t("nav.home")}</Link>
                            </li>
                            <li>
                                <Link href="/servicios" className="enlace-footer">{t("nav.services")}</Link>
                            </li>
                            <li>
                                <Link href="/testimonios" className="enlace-footer">{t("nav.testimonials")}</Link>
                            </li>
                        </ul>
                    </div>

                    {/* COLUMNA 3: HORARIOS */}
                    <div className="columna-footer">
                        <h3 className="titulo-columna">{t("footer.schedule")}</h3>
                        <ul className="horarios-footer">
                            <li className="horario-item">
                                <span className="dia-semana">{t("footer.mondayToFriday")}</span>
                                <span className="horas">08:00 - 13:00</span>
                                <span className="horas">14:00 - 18:00</span>
                            </li>
                            <li className="horario-item">
                                <span className="dia-semana">{t("footer.saturdayAndSunday")}</span>
                                <span className="horas cerrado">{t("footer.closed")}</span>
                            </li>
                        </ul>
                        <div className="garantia-calidad">
                            <ShieldCheck size={16} className="text-blue-500" />
                            <span>{t("footer.satisfactionGuarantee")}</span>
                        </div>
                    </div>

                    {/* COLUMNA 4: CONTACTO */}
                    <div className="columna-footer">
                        <h3 className="titulo-columna">{t("footer.contact")}</h3>
                        <ul className="contacto-footer">
                            <li className="contacto-item">
                                <Phone size={16} className="icono-contacto" />
                                <Image 
                                    src="/contacto/telefono.svg" 
                                    alt="Telefono de contacto" 
                                    width={120} 
                                    height={16} 
                                    style={{ height: "auto" }}
                                    className="object-contain dark:invert" 
                                />
                            </li>
                        </ul>
                        <Iframe
                            url="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d933.4598808871987!2d2.63304404042323!3d39.57862030261687!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x129792622c3d74ef%3A0x46bb960d12573091!2sAuto%20Net!5e0!3m2!1ses!2ses!4v1782724161860!5m2!1ses!2ses"
                            containerClassName="mapaAutonet"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                        />
                    </div>

                </div>

                {/* BARRA INFERIOR DE DERECHOS */}
                <div className="barra-derechos">
                    <p className="texto-derechos">
                        &copy; {currentYear} Autonet {t("nav.logoSubtitle")}. {t("footer.allRightsReserved")}
                    </p>
                    <div className="enlaces-legales">
                        <Link href="/privacidad" className="enlace-legal">{t("footer.privacyPolicy")}</Link>
                        <span className="separador-legal">|</span>
                        <Link href="/cookies" className="enlace-legal">{t("footer.cookiePolicy")}</Link>
                        <span className="separador-legal">|</span>
                        <Link href="/legal" className="enlace-legal">{t("footer.legalNotice")}</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
