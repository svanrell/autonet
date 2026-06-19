import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import ScrollAnimation from "@/components/animation/ScrollAnimation";
import Footer from "@/components/layout/footer";
import { HeroDemo } from "@/components/layout/presentacion-hero";
import { ScrollVelocityDemo } from "@/components/layout/animacion-imagenes";

export const metadata: Metadata = {
  title: "Autonet - Limpieza de Coches",
  description: "Limpieza y detallado ecológico de vehículos."
};

export default function Principal() {
  return (
    <>
      <Navbar />
      <main>
        < HeroDemo />
        < ScrollVelocityDemo />
        <ScrollAnimation />
      </main>
      <Footer />
    </>
  );
}
