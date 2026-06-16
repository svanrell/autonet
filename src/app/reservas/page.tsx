import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
    title: "Reservas - Autonet",
    description: "Realiza tu reserva en Autonet"
};

export default function Reservas() {
    return (
        <>
            <Navbar />
            <main>
                <h1>Reservas</h1>
            </main>
            <Footer />
        </>
    );
}