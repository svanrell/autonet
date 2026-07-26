"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function NuestraHistoria() {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-zinc-50/20 dark:bg-zinc-950/20 relative overflow-hidden border-t border-zinc-200 dark:border-zinc-900/60">
            {/* Soft decorative background glow */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* Left Column - Large Typography Focus */}
                    <div className="lg:col-span-5 space-y-6">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-zinc-900 dark:text-white font-display leading-tight">
                            {t("nuestraHistoria.title")} <br className="hidden lg:block" />
                            <span className="bg-linear-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400 bg-clip-text text-transparent">
                                {t("nuestraHistoria.titleHighlight")}
                            </span>
                        </h2>
                    </div>

                    {/* Right Column - Deep Narrative & Paragraphs */}
                    <div className="lg:col-span-7 space-y-8 text-zinc-650 dark:text-zinc-400 text-sm md:text-base leading-relaxed font-normal">
                        <div className="space-y-6">
                            <p>{t("nuestraHistoria.p1")}</p>
                            <p>{t("nuestraHistoria.p2")}</p>
                            <p>{t("nuestraHistoria.p3")}</p>
                        </div>
                        <div className="servicios-inicio">
                            <Link href="/servicios" className="boton-servicios-secundario group">
                                {t("nuestraHistoria.btn")}
                                <span className="arrow-icon">→</span>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
