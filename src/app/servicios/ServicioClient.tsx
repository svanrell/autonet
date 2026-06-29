"use client";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";

export default function ServiciosClient() {
    return (
        <>
            <Navbar />
            <main>
                <div className="contenedor-principal-servicios">
                    <div className="contenedor-servicios">
                        <h1>Nuestros Servicios</h1>
                        <p>En Autonet, nos esforzamos por ofrecer servicios de la más alta calidad para satisfacer todas las necesidades de nuestros clientes. A continuación, te presentamos nuestros servicios:</p>
                    </div>
                    <div className="contenedor-servicios-tipos">
                        {services.map((servicio, index) => {
                            return (
                                <div key={index} className="contenedor-servicio">
                                    <div className="contenedor-servicio-texto">
                                        <h2>{servicio.name}</h2>
                                        <p>{servicio.description}</p>
                                    </div>
                                    <div className="contenedor-servicio-imagen-wrapper">
                                        <Image src={servicio.imagen} alt={servicio.name} width={500} height={500} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="contenedor-boton-reserva-servicios">
                        <div className="contenedor-boton-reserva-servicios-contenido">
                            <h1>¿Listo para reservar?</h1>
                            <p>Reserva tu cita online en menos de 2 minutos y experimenta el verdadero detallado automotriz.</p>
                            <Link href="/reservas" className="boton-reserva">Reservar Cita</Link>
                        </div>
                        <div className="glow-blob-1" />
                        <div className="glow-blob-2" />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}