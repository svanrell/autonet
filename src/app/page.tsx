import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { HeroDemo } from "@/components/layout/presentacion-hero";
import { ScrollVelocityDemo } from "@/components/layout/animacion-imagenes";
import Features from "@/components/layout/features";
import NuestraHistoria from "@/components/layout/nuestra-historia";

export const metadata: Metadata = {
  title: "Autonet - Limpieza de Coches",
  description: "Limpieza y detallado ecológico de vehículos."
};

export default function Principal() {
  return (
    <>
      <Navbar />
      <main>
        <HeroDemo />
        <Features />
        <NuestraHistoria />
        <ScrollVelocityDemo />
      </main>
      <Footer />
    </>
  );
}
