import type { Metadata } from "next";
import { Montserrat, Outfit, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Autonet - Limpieza y Detallado de Coches",
    template: "%s"
  },
  description: "Limpieza y detallado ecológico de vehículos a domicilio y local físico.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn("h-full", "antialiased", montserrat.variable, outfit.variable, "font-sans", geist.variable, "dark")}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
