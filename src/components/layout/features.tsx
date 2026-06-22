import { ShieldCheck, Leaf, Clock, Sparkles } from "lucide-react";

const features = [
    {
        icon: Leaf,
        title: "Tecnología Ecológica",
        description: "Utilizamos productos 100% biodegradables y un sistema inteligente de ahorro de agua que cuida el medio ambiente sin perder eficacia.",
        gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
        iconColor: "text-green-400",
        borderColor: "hover:border-green-500/30"
    },
    {
        icon: ShieldCheck,
        title: "Garantía de Calidad",
        description: "Cada vehículo es tratado por profesionales certificados con herramientas de última generación, garantizando un Acabado impecable y seguro.",
        gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
        iconColor: "text-blue-400",
        borderColor: "hover:border-blue-500/30"
    },
    {
        icon: Clock,
        title: "Máxima Eficiencia",
        description: "Olvídate de las largas esperas. Nuestro sistema de reserva automatizado te asegura el servicio a la hora exacta, optimizando tu tiempo.",
        gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
        iconColor: "text-amber-400",
        borderColor: "hover:border-amber-500/30"
    },
    {
        icon: Sparkles,
        title: "Detallado Premium",
        description: "Cuidamos hasta el más mínimo detalle. Limpieza profunda de tapicería, pulido de faros y tratamientos cerámicos para que brille como nuevo.",
        gradient: "from-purple-500/20 via-fuchsia-500/10 to-transparent",
        iconColor: "text-purple-400",
        borderColor: "hover:border-purple-500/30"
    }
];

export default function Features() {
    return (
        <section className="py-24 bg-zinc-950/40 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-120 h-120 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-500 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/10">
                        ¿Por qué elegirnos?
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black mt-6 mb-4 uppercase tracking-tight text-white font-display">
                        Elevamos el estándar del cuidado automotriz
                    </h2>
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                        Combinamos innovación, sostenibilidad y pasión por el detalle para ofrecerte un servicio inigualable.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {features.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={idx}
                                className={`relative group p-8 rounded-2xl bg-zinc-900/20 border border-zinc-900/80 hover:bg-zinc-900/40 transition-all duration-500 ${item.borderColor} overflow-hidden`}
                            >
                                {/* Glow Effect on Hover */}
                                <div className={`absolute inset-0 bg-linear-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                                
                                <div className="relative z-10 flex flex-col sm:flex-row items-start gap-5">
                                    <div className={`p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 ${item.iconColor} group-hover:scale-110 transition-transform duration-300 shadow-inner shrink-0`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-zinc-400 text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
