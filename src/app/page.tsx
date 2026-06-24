import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { HeroDemo } from "@/components/layout/presentacion-hero";
import { ScrollVelocityDemo } from "@/components/layout/animacion-imagenes";
import Features from "@/components/layout/features";
import NuestraHistoria from "@/components/layout/nuestra-historia";


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
