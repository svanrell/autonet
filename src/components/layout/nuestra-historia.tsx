import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NuestraHistoria() {
    return (
        <section className="py-24 bg-zinc-950/20 relative overflow-hidden border-t border-zinc-900/60">
            {/* Soft decorative background glow */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    
                    {/* Left Column - Large Typography Focus */}
                    <div className="lg:col-span-5 space-y-6">
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-500 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/10 inline-flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" /> Nuestra Filosofía
                        </span>
                        
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-display leading-tight">
                            El Arte del <br className="hidden lg:block"/>
                            <span className="bg-linear-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                                Detallado
                            </span>
                        </h2>
                        
                        <p className="text-xl font-medium text-zinc-200 border-l-2 border-blue-500 pl-4 leading-relaxed">
                            "No nos limitamos a lavar tu vehículo; nos dedicamos a restaurar su esencia y proteger su valor a largo plazo."
                        </p>
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

                        {/* Highlight Panel */}
                        <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-900 backdrop-blur-xs space-y-4">
                            <h4 className="text-white font-bold text-base flex items-center gap-2">
                                Nuestro Compromiso Inquebrantable
                            </h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                    <span>Productos 100% biodegradables</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                    <span>Tratamiento libre de rayas (Swirl-free)</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                    <span>Técnicos especialistas certificados</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                    <span>Protección duradera garantizada</span>
                                </li>
                            </ul>
                        </div>

                        <div className="pt-2">
                            <Button variant="outline" asChild className="bg-zinc-900/60 hover:bg-zinc-900 text-zinc-300 hover:text-white font-bold tracking-wider uppercase text-xs px-8 py-6 rounded-xl border border-zinc-800 hover:border-blue-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer">
                                <Link href="/proceso" className="flex items-center gap-2">
                                    Descubre el Proceso Completo <ArrowRight className="w-4 h-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
