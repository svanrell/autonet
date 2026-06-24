import type { Metadata } from "next";
import ServiciosClient from "./ServicioClient";

export const metadata: Metadata = {
    title: "Servicios - Autonet",
    description: "Servicios que ofrece Autonet"
};

export default function Servicios() {
    return (
        <ServiciosClient />
    );
}
