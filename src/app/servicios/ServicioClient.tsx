"use client";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Image from "next/image";
import { services } from "@/data/services";
import { useLanguage } from "@/context/LanguageContext";

export default function ServiciosClient() {
    const { t } = useLanguage();

    return (
        <>
            <Navbar />
            <main className="py-24 md:py-32">
                <div className="contenedor-principal-servicios">
                    <div className="contenedor-servicios">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 font-bold text-xs md:text-sm tracking-wider uppercase mb-3 border border-blue-500/20">
                            {t("serviciosPage.serviceTypeHeader")}
                        </span>
                        <h1>{t("serviciosPage.title")}</h1>
                        <p>{t("serviciosPage.subtitle")}</p>
                    </div>
                    <div className="contenedor-servicios-tipos">
                        {services.map((servicio, index) => {
                            const localizedName = t(`services.${servicio.id}.name`);
                            const localizedDescription = t(`services.${servicio.id}.description`);
                            return (
                                <div key={index} className="contenedor-servicio">
                                    <div className="contenedor-servicio-texto">
                                        <div className="flex items-start justify-between gap-4 mb-3">
                                            <h2>{localizedName !== `services.${servicio.id}.name` ? localizedName : servicio.name}</h2>
                                            <span className="shrink-0 px-3.5 py-1.5 rounded-full bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 font-extrabold text-base md:text-lg border border-blue-500/20 shadow-xs">
                                                {servicio.price}
                                            </span>
                                        </div>
                                        <p>{localizedDescription !== `services.${servicio.id}.description` ? localizedDescription : servicio.description}</p>
                                    </div>
                                    <div className="contenedor-servicio-imagen-wrapper">
                                        <Image src={servicio.imagen} alt={localizedName} width={500} height={500} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}