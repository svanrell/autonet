import Link from "next/link";


export default function NuestraHistoria() {
    return (
        <section className="py-24 bg-zinc-950/20 relative overflow-hidden border-t border-zinc-900/60">
            {/* Soft decorative background glow */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* Left Column - Large Typography Focus */}
                    <div className="lg:col-span-5 space-y-6">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-display leading-tight">
                            El Arte del <br className="hidden lg:block" />
                            <span className="bg-linear-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                                Detallado
                            </span>
                        </h2>
                    </div>

                    {/* Right Column - Deep Narrative & Paragraphs */}
                    <div className="lg:col-span-7 space-y-8 text-zinc-400 text-sm md:text-base leading-relaxed font-normal">
                        <div className="space-y-6">
                            <p>
                                Autonet nació de una insatisfacción con el lavado convencional de coches. Creíamos que los vehículos merecían algo mejor que los rodillos mecánicos agresivos que rayan la pintura y los químicos industriales abrasivos que deterioran los acabados con el tiempo.
                            </p>
                            <p>
                                Por eso, decidimos redefinir el concepto de limpieza automotriz. Nos especializamos en el <strong>detallado (detailing) ecológico de alta gama</strong>. Esto significa que analizamos el estado de cada superficie (cuero, alcántara, plásticos, pintura metálica) para aplicar el tratamiento perfecto que no solo limpia, sino que nutre, acondiciona y protege frente a los rayos UV, la lluvia ácida y la contaminación diaria.
                            </p>
                            <p>
                                Entendemos que tu coche es una de tus mayores inversiones y una parte esencial de tu día a día. Nuestro equipo de apasionados del motor trata cada automóvil como si fuera propio, combinando técnicas artesanales meticulosas con fórmulas poliméricas y nanotecnología avanzada. El resultado es un acabado con efecto espejo y un interior que recupera el tacto y el aroma a nuevo.
                            </p>
                        </div>
                        <div className="servicios-inicio">
                            <Link href="/servicios" className="boton-servicios-secundario group">
                                Ver Todos los Servicios
                                <span className="arrow-icon">→</span>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
