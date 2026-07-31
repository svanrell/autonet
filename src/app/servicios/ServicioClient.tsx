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
            <main>
                <div className="contenedor-principal-servicios">
                    <div className="contenedor-servicios">
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
                                        <h2>{localizedName !== `services.${servicio.id}.name` ? localizedName : servicio.name}</h2>
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