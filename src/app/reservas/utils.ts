import { DateObject } from "./types";
import { type Language } from "@/locales/translations";

export const timeSlots = {
  morning: ["09:00", "10:30", "12:00"],
  afternoon: ["14:30", "16:00", "17:30"]
};

// Generates next 7 business days (excludes Sunday)
export const getNextDays = (lang: Language = "es"): DateObject[] => {
  const days: DateObject[] = [];
  const today = new Date();
  
  const dayNamesDict: Record<Language, string[]> = {
    es: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    ca: ["Diu", "Dill", "Dim", "Dim", "Dij", "Div", "Dis"],
    en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    de: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]
  };

  const monthNamesDict: Record<Language, string[]> = {
    es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    ca: ["Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des"],
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    de: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
  };

  const dayNames = dayNamesDict[lang] || dayNamesDict.es;
  const monthNames = monthNamesDict[lang] || monthNamesDict.es;
  
  for (let i = 1; i < 15; i++) {
    const nextDay = new Date();
    nextDay.setDate(today.getDate() + i);
    // Exclude Sundays (0)
    if (nextDay.getDay() !== 0) {
      days.push({
        dateString: nextDay.toISOString().split("T")[0],
        dayOfWeek: dayNames[nextDay.getDay()],
        dayNumber: nextDay.getDate(),
        month: monthNames[nextDay.getMonth()]
      });
    }
    if (days.length === 7) break;
  }
  return days;
};
