"use client";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useLanguage } from "@/context/LanguageContext";

export default function LegalClient() {
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
            {t("legal.title")}
          </h1>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-10">
            {t("legal.lastUpdated")}: {lastUpdated}
          </p>

          <section className="prose dark:prose-invert max-w-none">
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm md:text-base leading-relaxed">
              {t("legal.intro")}
            </p>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              {t("legal.s1Title")}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              {t("legal.s1Body")}
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-zinc-600 dark:text-zinc-400 text-sm md:text-base">
              <li>{t("legal.s1Company")}</li>
              <li>{t("legal.s1Cif")}</li>
              <li>{t("legal.s1Address")}</li>
            </ul>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              {t("legal.s2Title")}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              {t("legal.s2Body1")}
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              {t("legal.s2Body2")}
            </p>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              {t("legal.s3Title")}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              {t("legal.s3Body1")}
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              {t("legal.s3Body2")}
            </p>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              {t("legal.s4Title")}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              {t("legal.s4Body")}
            </p>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              {t("legal.s5Title")}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              {t("legal.s5Body")}
            </p>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              {t("legal.s6Title")}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              {t("legal.s6Body")}
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
