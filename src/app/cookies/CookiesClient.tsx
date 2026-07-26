"use client";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useLanguage } from "@/context/LanguageContext";

export default function CookiesClient() {
  const { t } = useLanguage();
  const lastUpdated = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col">
        <div className="flex-1 max-w-4xl mx-auto px-6 py-32 md:py-40 w-full">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 font-display text-zinc-950 dark:text-white">
            {t("cookies.title")}
          </h1>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-10">
            {t("cookies.lastUpdated")}: {lastUpdated}
          </p>

          <section className="prose dark:prose-invert max-w-none">
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm md:text-base leading-relaxed">
              {t("cookies.intro")}
            </p>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              {t("cookies.s1Title")}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              {t("cookies.s1Body")}
            </p>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              {t("cookies.s2Title")}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              {t("cookies.s2Body")}
            </p>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              {t("cookies.s3Title")}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              {t("cookies.s3Body")}
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-zinc-600 dark:text-zinc-400 text-sm md:text-base">
              <li>
                <strong>{t("cookies.s3Item1Title")}</strong> {t("cookies.s3Item1Body")}
              </li>
              <li>
                <strong>{t("cookies.s3Item2Title")}</strong> {t("cookies.s3Item2Body")}
              </li>
            </ul>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              {t("cookies.s4Title")}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              {t("cookies.s4Body1")}
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              {t("cookies.s4Body2")}
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-zinc-600 dark:text-zinc-400 text-sm md:text-base">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Microsoft Edge</a></li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
