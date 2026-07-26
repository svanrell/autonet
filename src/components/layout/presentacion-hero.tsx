"use client";

import { Hero } from "@/components/ui/animated-hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

function HeroDemo() {
    const { t } = useLanguage();

    return (
        <div className="block">
            <Hero
                title={t("hero.title")}
                subtitle={t("hero.subtitle")}
                actions={
                    <>
                        <Button variant="default" size="lg" asChild className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold tracking-wider uppercase text-xs px-8 py-6 rounded-xl border border-blue-400/20 hover:border-blue-500 shadow-lg shadow-blue-600/15 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer">
                            <Link href="/reservas">
                                {t("hero.bookBtn")}
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" asChild className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900/60 dark:hover:bg-zinc-900 text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white font-bold tracking-wider uppercase text-xs px-8 py-6 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-550 dark:hover:border-blue-500 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm transition-all duration-300 cursor-pointer">
                            <Link href="/servicios">
                                {t("hero.servicesBtn")}
                            </Link>
                        </Button>
                    </>
                }
            />
        </div>
    );
}

export { HeroDemo };
