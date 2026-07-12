import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "Política de Cookies - Autonet",
  description: "Información sobre cómo utilizamos las cookies en la web de Autonet.",
};

export default function CookiesPage() {
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
            Política de Cookies
          </h1>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-10">
            Última actualización: {lastUpdated}
          </p>

          <section className="prose dark:prose-invert max-w-none">
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm md:text-base leading-relaxed">
              Es práctica común en casi todos los sitios web profesionales que este sitio utilice cookies, que son pequeños archivos que se descargan en su ordenador, para mejorar su experiencia. Esta página describe qué información recopilan, cómo la usamos y por qué a veces necesitamos almacenar estas cookies.
            </p>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              1. ¿Qué son las cookies?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              Una cookie es un pequeño archivo de texto que un sitio web almacena en su ordenador o dispositivo móvil cuando usted visita el sitio. Permite al sitio web recordar sus acciones y preferencias (como inicio de sesión, idioma, tamaño de letra y otras preferencias de visualización) durante un período de tiempo, para que no tenga que volver a introducirlas cada vez que regrese al sitio o navegue de una página a otra.
            </p>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              2. ¿Cómo usamos las cookies?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              Utilizamos cookies por varios motivos detallados a continuación. Desafortunadamente, en la mayoría de los casos no existen opciones estándar en la industria para desactivar las cookies sin desactivar por completo la funcionalidad y las características que añaden a este sitio. Se recomienda dejar activadas todas las cookies si no está seguro de si las necesita o no, en caso de que se utilicen para proporcionar un servicio que usted utiliza.
            </p>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              3. Las cookies que instalamos
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              Este sitio web utiliza cookies técnicas e imprescindibles para ofrecer funcionalidades de reservas y navegación:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-zinc-600 dark:text-zinc-400 text-sm md:text-base">
              <li>
                <strong>Cookies relacionadas con el sistema (Preferencias de Tema)</strong>: Guardamos su preferencia de tema visual (claro/oscuro) para que el sitio se visualice de acuerdo a su elección en futuras visitas.
              </li>
              <li>
                <strong>Cookies analíticas y de servicios de terceros (Google Maps / Google Calendar)</strong>: Al interactuar con el mapa interactivo del taller en el footer o al usar el backend de reservas de Google Calendar, Google puede instalar cookies para rastrear el uso, autenticar cuentas y garantizar la seguridad de su API.
              </li>
            </ul>

            <h2 className="text-lg md:text-xl font-bold mt-8 mb-4 text-blue-600 dark:text-blue-400 font-display">
              4. Desactivación de cookies
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              Puede evitar la instalación de cookies ajustando la configuración de su navegador (consulte la Ayuda de su navegador para saber cómo hacerlo). Tenga en cuenta que la desactivación de cookies afectará a la funcionalidad de este y de muchos otros sitios web que visite. La desactivación de las cookies suele provocar también la desactivación de ciertas funciones y características de este sitio. Por lo tanto, se recomienda no desactivar las cookies.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              Para gestionar las cookies en los principales navegadores, consulte los siguientes enlaces:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-zinc-600 dark:text-zinc-400 text-sm md:text-base">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Microsoft Edge</a></li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
