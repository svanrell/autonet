import { Hero } from "@/components/ui/animated-hero";
import { Button } from "@/components/ui/button";

function HeroDemo() {
    return (
        <div className="block">
            <Hero
                badge={<div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400 backdrop-blur-sm">Autos Limpios, Clientes Felices</div>}
                title="Autonet es"
                subtitle="Transformamos la experiencia de lavar tu auto con tecnología inteligente, limpieza eficiente y resultados impecables. Descubre la nueva forma de mantener tu vehículo como nuevo."
                actions={
                    <>
                        <Button variant="default" size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">Reservar Ahora</Button>
                        <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">Ver Servicios</Button>
                    </>
                }
            />
        </div>
    );
}

export { HeroDemo };

