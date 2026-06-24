"use client";

import { useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Image from "next/image";
import Link from "next/link";

interface Servicios {
    titulo: string;
    descripcion: string;
    imagen: string;
}

const servicios: Servicios[] = [
    {
        titulo: "Limpieza de exterior",
        descripcion: "Lavado a presión, encerado, pulido y abrillantado de carrocería. Limpieza profunda de ruedas, neumáticos, guardabarros y pasos de rueda.",
        imagen: "/images/coche1.webp"
    },
    {
        titulo: "Limpieza de interior",
        descripcion: "Aspirado completo, limpieza de tapicerías, tratamiento de plásticos, cristales y desinfección.",
        imagen: "/images/coche2.webp"
    },
    {
        titulo: "Limpieza de llantas",
        descripcion: "Limpieza de llantas, eliminación de grasa y suciedad, pulido y abrillantado.",
        imagen: "/images/coche3.webp"
    },
    {
        titulo: "Limpieza de tapicerías",
        descripcion: "Limpieza de tapicerías, eliminación de grasa y suciedad, pulido y abrillantado.",
        imagen: "/images/coche4.webp"
    }
]

export default function ServiciosClient() {
    return (
        <>
            <Navbar />
            <main>
                <div className="contenedor-principal-servicios">
                    <div className="contenedor-servicios">
                        <h1>Nuestros Servicios</h1>
                        <p>En Autonet, nos esforzamos por ofrecer servicios de la más alta calidad para satisfacer todas las necesidades de nuestros clientes. A continuación, te presentamos una descripción detallada de nuestros servicios:</p>
                    </div>
                    <div className="contenedor-servicios-tipos">
                        {servicios.map((servicio, index) => {
                            return (
                                <div key={index} className="contenedor-servicio">
                                    <div className="contenedor-servicio-texto">
                                        <h2>{servicio.titulo}</h2>
                                        <p>{servicio.descripcion}</p>
                                    </div>
                                    <div className="contenedor-servicio-imagen-wrapper">
                                        <Image src={servicio.imagen} alt={servicio.titulo} width={500} height={500} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="contenedor-boton-reserva-servicios">
                        <h3>¿Listo para reservar?</h3>
                        <Link href="/reservas" className="boton-reserva">Reservar</Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}