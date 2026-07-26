"use client";

import { ShieldCheck, Leaf, Clock, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Features() {
    const { t } = useLanguage();

    const features = [
        {
            icon: Leaf,
            title: t("features.items.ecological.title"),
            description: t("features.items.ecological.description"),
            gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
            iconColor: "text-green-400",
            borderColor: "hover:border-green-500/30"
        },
        {
            icon: ShieldCheck,
            title: t("features.items.quality.title"),
            description: t("features.items.quality.description"),
            gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
            iconColor: "text-blue-400",
            borderColor: "hover:border-blue-500/30"
        },
        {
            icon: Clock,
            title: t("features.items.efficiency.title"),
            description: t("features.items.efficiency.description"),
            gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
            iconColor: "text-amber-400",
            borderColor: "hover:border-amber-500/30"
        },
        {
            icon: Sparkles,
            title: t("features.items.detail.title"),
            description: t("features.items.detail.description"),
            gradient: "from-purple-500/20 via-fuchsia-500/10 to-transparent",
            iconColor: "text-purple-400",
            borderColor: "hover:border-purple-500/30"
        }
    ];

    return (
        <section className="py-24 bg-zinc-50/40 dark:bg-zinc-950/40 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-120 h-120 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-650 dark:text-blue-500 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/10">
                        {t("features.badge")}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black mt-6 mb-4 uppercase tracking-tight text-zinc-900 dark:text-white font-display">
                        {t("features.title")}
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
                        {t("features.subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {features.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={idx}
                                className={`relative group p-8 rounded-2xl bg-white dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-900/80 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-all duration-500 ${item.borderColor} overflow-hidden shadow-sm dark:shadow-none`}
                            >
                                {/* Glow Effect on Hover */}
                                <div className={`absolute inset-0 bg-linear-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                                <div className="relative z-10 flex flex-col sm:flex-row items-start gap-5">
                                    <div className={`p-4 rounded-xl bg-zinc-100 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 ${item.iconColor} group-hover:scale-110 transition-transform duration-300 shadow-inner shrink-0`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-zinc-650 dark:text-zinc-400 text-sm leading-relaxed">
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
