import Navbar from "@/components/layout/navbar";
import ScrollAnimation from "@/components/animation/ScrollAnimation";
import Footer from "@/components/layout/footer";

export default function Principal() {
  return (
    <>
      <Navbar />
      <main>
        <ScrollAnimation />
      </main>
      <Footer />
    </>
  );
}
