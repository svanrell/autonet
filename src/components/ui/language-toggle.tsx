"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { languageNames, type Language } from "@/locales/translations";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check, ChevronDown } from "lucide-react";

export function LanguageToggle() {
    const { language, changeLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const languagesList: Language[] = ["es", "ca", "en", "de"];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (lang: Language) => {
        changeLanguage(lang);
        setIsOpen(false);
    };

    const currentInfo = languageNames[language] || languageNames["es"];

    return (
        <div className="relative inline-block text-left" ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="relative h-10 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900/60 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 flex items-center gap-2 text-xs font-bold text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-all duration-300 shadow-sm cursor-pointer active:scale-95"
                aria-label="Cambiar idioma / Select language"
            >
                <Globe className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 group-hover:text-blue-500" />
                <span className="text-sm leading-none">{currentInfo.flag}</span>
                <span className="font-display uppercase tracking-wider text-[11px] font-bold">
                    {currentInfo.short}
                </span>
                <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-44 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-black/10 dark:shadow-black/40 py-2 z-50 overflow-hidden backdrop-blur-lg"
                    >
                        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-zinc-800/60 mb-1">
                            Idioma / Language
                        </div>
                        {languagesList.map((langKey) => {
                            const info = languageNames[langKey];
                            const isSelected = language === langKey;
                            return (
                                <button
                                    key={langKey}
                                    onClick={() => handleSelect(langKey)}
                                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left transition-colors cursor-pointer ${
                                        isSelected
                                            ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold"
                                            : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                                    }`}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <span className="text-base">{info.flag}</span>
                                        <span>{info.name}</span>
                                    </div>
                                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                                </button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
