import type { Metadata } from "next";
import ContactoClient from "./ContactoClient";

export const metadata: Metadata = {
    title: "Contacto - Autonet",
    description: "Ponte en contacto con Autonet"
};

export default function Contacto() {
    return <ContactoClient />;
}

