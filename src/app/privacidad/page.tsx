import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "Política de Privacidad - Autonet",
  description: "Conoce cómo tratamos y protegemos tus datos personales en Autonet.",
};

export default function PrivacidadPage() {
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
            Política de Privacidad
          </h1>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-10">
            Última actualización: {lastUpdated}
          </p>

          <section className="prose dark:prose-invert max-w-none">
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm md:text-base leading-relaxed">
              En Autonet, accesible desde autonet.es, una de nuestras principales prioridades es la privacidad de nuestros visitantes. Este documento de Política de Privacidad contiene los tipos de información que Autonet recoge y registra, y cómo la utilizamos.
            </p>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              1. Responsable del Tratamiento de Datos
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              El responsable del tratamiento de sus datos personales recopilados a través de este sitio web es **Autonet Limpieza de Coches**, con domicilio social en Calle de la Limpieza 123, Barcelona, España, y correo electrónico de contacto reservas.autonet@gmail.com.
            </p>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              2. Datos que Recopilamos
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              Solo solicitamos información personal cuando realmente la necesitamos para prestarle un servicio. Lo hacemos por medios justos y legales, con su conocimiento y consentimiento. Recopilamos datos a través de dos vías principales en nuestro sitio web:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-zinc-600 dark:text-zinc-400 text-sm md:text-base">
              <li>
                <strong>Formulario de Reserva:</strong> Recogemos su nombre, correo electrónico, número de teléfono, el servicio seleccionado, fecha, hora y notas adicionales para gestionar y confirmar su cita de limpieza en nuestro taller.
              </li>
              <li>
                <strong>Formulario de Contacto:</strong> Recogemos su nombre, dirección de correo electrónico y el mensaje que nos envíe para responder a sus dudas o solicitudes.
              </li>
            </ul>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              3. Finalidad del Tratamiento
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              Utilizamos la información que recopilamos de diversas maneras, incluyendo:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-zinc-600 dark:text-zinc-400 text-sm md:text-base">
              <li>Prestar, operar y mantener nuestro sitio web.</li>
              <li>Gestionar, confirmar y agendar sus citas de detallado o lavado a través de nuestro sistema de reservas.</li>
              <li>Responder a sus consultas, dudas o comentarios enviados a través del formulario de contacto.</li>
              <li>Enviar comunicaciones de servicio obligatorias relacionadas con su cita.</li>
              <li>Detectar y prevenir fraudes o spam (utilizando técnicas de honeypot invisibles).</li>
            </ul>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              4. Conservación de los Datos
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              Solo conservamos la información recopilada durante el tiempo necesario para ofrecerle el servicio solicitado o mientras exista una obligación legal de retención. Cuando almacenamos datos, los protegemos mediante medidas de seguridad comercialmente aceptables para evitar su pérdida y robo, así como el acceso, divulgación, copia, uso o modificación no autorizados.
            </p>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              5. Compartición de Datos con Terceros
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              No compartimos ninguna información de identificación personal públicamente ni con terceros, excepto cuando lo exija la ley o para la prestación del servicio. En particular:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-zinc-600 dark:text-zinc-400 text-sm md:text-base">
              <li>
                <strong>Google Calendar API:</strong> Las citas reservadas se sincronizan automáticamente con nuestro calendario de Google (a través de una cuenta de servicio protegida) únicamente para organizar el flujo de trabajo de nuestro taller. No se comparte esta información con otros fines comerciales.
              </li>
            </ul>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              6. Sus Derechos de Privacidad
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              Usted es libre de rechazar nuestra solicitud de información personal, entendiéndose que es posible que no podamos prestarle algunos de los servicios deseados.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              De acuerdo con el Reglamento General de Protección de Datos (RGPD), usted tiene derecho a acceder, rectificar, portar, oponerse o suprimir sus datos personales. Para ejercer estos derechos, puede ponerse en contacto con nosotros en cualquier momento escribiendo a reservas.autonet@gmail.com.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
