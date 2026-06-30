import { DateObject } from "./types";

export const timeSlots = {
  morning: ["09:00", "10:30", "12:00"],
  afternoon: ["14:30", "16:00", "17:30"]
};

// Generates next 7 business days (excludes Sunday)
export const getNextDays = (): DateObject[] => {
  const days: DateObject[] = [];
  const today = new Date();
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  
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
