"use client";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacidadClient() {
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
            {t("privacidad.title")}
          </h1>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-10">
            {t("privacidad.lastUpdated")}: {lastUpdated}
          </p>

          <section className="prose dark:prose-invert max-w-none">
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm md:text-base leading-relaxed">
              {t("privacidad.intro")}
            </p>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              {t("privacidad.s1Title")}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              {t("privacidad.s1Body")}
            </p>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              {t("privacidad.s2Title")}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              {t("privacidad.s2Body")}
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-zinc-600 dark:text-zinc-400 text-sm md:text-base">
              <li>
                <strong>{t("privacidad.s2Item1Title")}</strong> {t("privacidad.s2Item1Body")}
              </li>
              <li>
                <strong>{t("privacidad.s2Item2Title")}</strong> {t("privacidad.s2Item2Body")}
              </li>
            </ul>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              {t("privacidad.s3Title")}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              {t("privacidad.s3Body")}
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-zinc-600 dark:text-zinc-400 text-sm md:text-base">
              <li>{t("privacidad.s3Items.0")}</li>
              <li>{t("privacidad.s3Items.1")}</li>
              <li>{t("privacidad.s3Items.2")}</li>
              <li>{t("privacidad.s3Items.3")}</li>
              <li>{t("privacidad.s3Items.4")}</li>
            </ul>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              {t("privacidad.s4Title")}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              {t("privacidad.s4Body")}
            </p>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              {t("privacidad.s5Title")}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              {t("privacidad.s5Body")}
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-zinc-600 dark:text-zinc-400 text-sm md:text-base">
              <li>
                <strong>{t("privacidad.s5Item1Title")}</strong> {t("privacidad.s5Item1Body")}
              </li>
            </ul>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              {t("privacidad.s6Title")}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              {t("privacidad.s6Body1")}
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              {t("privacidad.s6Body2")}
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
