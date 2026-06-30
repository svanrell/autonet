import { type Service } from "@/data/services";

export interface ClientInfo {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export interface DateObject {
  dateString: string;
  dayOfWeek: string;
  dayNumber: number;
  month: string;
}
