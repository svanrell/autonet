import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "Aviso Legal - Autonet",
  description: "Información legal, términos y condiciones generales de uso del sitio web de Autonet.",
};

export default function LegalPage() {
  const lastUpdated = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col">
        <div className="flex-1 max-w-4xl mx-auto px-6 py-32 md:py-40 w-full">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 font-display text-zinc-950 dark:text-white">
            Aviso Legal
          </h1>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-10">
            Última actualización: {lastUpdated}
          </p>

          <section className="prose dark:prose-invert max-w-none">
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm md:text-base leading-relaxed">
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se exponen a continuación los datos identificativos del titular de este sitio web.
            </p>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              1. Datos Identificativos
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              El titular del sitio web es:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-zinc-600 dark:text-zinc-400 text-sm md:text-base">
              <li><strong>Denominación social:</strong> Autonet Limpieza de Coches S.L.</li>
              <li><strong>CIF / NIF:</strong> B-12345678 (Simulado para fines de demostración)</li>
              <li><strong>Domicilio social:</strong> Calle de la Limpieza 123, Barcelona, España</li>
              <li><strong>Email de contacto:</strong> reservas.autonet@gmail.com</li>
            </ul>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              2. Condiciones Generales de Uso
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              El acceso y uso de este sitio web atribuye la condición de usuario, el cual acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas. Las citadas condiciones serán de aplicación independientemente de las Condiciones Generales de Contratación que en su caso resulten de obligado cumplimiento.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que Autonet ofrece a través de su portal, comprometiéndose a no utilizarlos para actividades ilícitas, contrarias a la buena fe o al orden público.
            </p>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              3. Propiedad Intelectual e Industrial
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              Autonet, por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo: imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, etc.), titularidad de Autonet o bien de sus licenciantes.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              Todos los derechos reservados. Quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización previa y por escrito de Autonet.
            </p>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              4. Exclusión de Responsabilidad
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              Autonet no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
            </p>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              5. Modificaciones
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              Autonet se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados en su portal.
            </p>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              6. Ley Aplicable y Jurisdicción
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              La relación entre Autonet y el usuario se regirá por la normativa española vigente y cualquier controversia se someterá a los Juzgados y Tribunales de la ciudad de Barcelona, España.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
