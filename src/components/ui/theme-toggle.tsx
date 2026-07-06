"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    useEffect(() => {
        setMounted(true);
        // Get initial theme
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme as "light" | "dark");
        } else if (document.documentElement.classList.contains("dark")) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }, []);

    const applyTheme = (newTheme: "light" | "dark") => {
        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
        const newTheme = theme === "dark" ? "light" : "dark";
        
        const isReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const docWithTransition = document as any;

        if (!docWithTransition.startViewTransition || isReducedMotion) {
            setTheme(newTheme);
            applyTheme(newTheme);
            return;
        }

        const x = event.clientX;
        const y = event.clientY;
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = docWithTransition.startViewTransition(() => {
            setTheme(newTheme);
            applyTheme(newTheme);
        });

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ];
            
            // Animate the new theme view (expand circle + fade in opacity)
            document.documentElement.animate(
                {
                    clipPath: clipPath,
                    opacity: [0, 1],
                },
                {
                    duration: 500,
                    easing: "ease-in-out",
                    pseudoElement: "::view-transition-new(root)",
                }
            );

            // Animate the old theme view (fade out opacity)
            document.documentElement.animate(
                {
                    opacity: [1, 0],
                },
                {
                    duration: 500,
                    easing: "ease-in-out",
                    pseudoElement: "::view-transition-old(root)",
                }
            );
        });
    };

    // Render a placeholder during SSR to avoid layout shifts or hydration mismatches
    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800" />
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className="relative w-10 h-10 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 flex items-center justify-center text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-all duration-300 shadow-md cursor-pointer overflow-hidden group active:scale-95"
            aria-label="Cambiar tema"
        >
            <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                    <motion.div
                        key="moon"
                        initial={{ y: 20, opacity: 0, rotate: 40 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -20, opacity: 0, rotate: -40 }}
                        transition={{ duration: 0.2 }}
                        className="text-blue-400 group-hover:text-blue-300"
                    >
                        <Moon className="w-5 h-5" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sun"
                        initial={{ y: 20, opacity: 0, rotate: -40 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -20, opacity: 0, rotate: 40 }}
                        transition={{ duration: 0.2 }}
                        className="text-amber-500 group-hover:text-amber-400"
                    >
                        <Sun className="w-5 h-5" />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
}

function DefaultToggle() {
    return (
        <div className="space-y-2 text-center">
            <div className="flex justify-center">
                <ThemeToggle />
            </div>
        </div>
    );
}

export { DefaultToggle };