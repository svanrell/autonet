"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, type Language } from "@/locales/translations";

type TranslationKey = string;

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: TranslationKey, variables?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always initialize with 'es' to match the server side render first
  const [language, setLanguage] = useState<Language>("es");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const storedLang = localStorage.getItem("language") as Language;
      if (["es", "ca", "en", "de"].includes(storedLang)) {
        setLanguage(storedLang);
      } else {
        // Fallback to browser language if available
        const browserLang = navigator.language.split("-")[0];
        if (["es", "ca", "en", "de"].includes(browserLang)) {
          setLanguage(browserLang as Language);
          localStorage.setItem("language", browserLang);
        }
      }
    } catch (e) {
      console.error("Failed to access localStorage for language setup:", e);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem("language", lang);
    } catch (e) {
      console.error("Failed to write language choice to localStorage:", e);
    }
  };

  // Helper function to resolve dot-notated translation keys (e.g. 'reservas.title')
  const t = (key: TranslationKey, variables?: Record<string, string | number>): string => {
    const keys = key.split(".");
    let currentObj: any = translations[language] || translations["es"];

    for (const k of keys) {
      if (currentObj && typeof currentObj === "object" && k in currentObj) {
        currentObj = currentObj[k];
      } else {
        // Fallback to Spanish dictionary if not found in current language
        let fallbackObj: any = translations["es"];
        for (const fk of keys) {
          if (fallbackObj && typeof fallbackObj === "object" && fk in fallbackObj) {
            fallbackObj = fallbackObj[fk];
          } else {
            fallbackObj = undefined;
            break;
          }
        }
        if (typeof fallbackObj === "string") {
          currentObj = fallbackObj;
          break;
        }
        return key; // return key if not found at all
      }
    }

    if (typeof currentObj !== "string") {
      return key;
    }

    let translatedText = currentObj;

    // Replace variables if provided
    if (variables) {
      Object.entries(variables).forEach(([vKey, vVal]) => {
        translatedText = translatedText.replace(new RegExp(`{${vKey}}`, "g"), String(vVal));
      });
    }

    return translatedText;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
