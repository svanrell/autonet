"use client"; /* Indica que es un componente de cliente */
import Link from "next/link"; /* Componente de react que sustituye a <a> y mejora el performance */
import { useState } from "react"; /* hook para gestionar el estado de un componente */
import { usePathname } from "next/navigation"; /* hook para obtener el path name de la ruta actual */

const links = [
    {
        href: "/",
        label: "Inicio",
    },
    {
        href: "/sobre-autonet",
        label: "Sobre Autonet",
    },
    {
        href: "/contacto",
        label: "Contacto",
    },
];

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false); /* hook para gestionar el estado del menu */
    const pathname = usePathname(); /* hook para obtener el path name de la ruta actual */

    return (
        <header>
            <div className="contenido-header">
                <div className="Logo">
                    <Link href={"/"} className="Logo-link">
                        AutoNet
                    </Link>
                </div>
                <div className="enlaces-navbar">
                    <nav className="enlaces">
                        <ul>
                            {links.map((link: { href: string; label: string; }) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="" >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>

    )

}