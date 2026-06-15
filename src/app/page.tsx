import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import ScrollAnimation from "@/components/animation/ScrollAnimation";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Autonet - Limpieza de Coches",
  description: "Limpieza y detallado ecológico de vehículos."
};

export default function Principal() {
  return (
    <>
      <Navbar />
      <main>
        <h1>Bienvenido a Autonet</h1>
      </main>
      <Footer />
    </>
  );
}
