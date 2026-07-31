# AutoNet - Sitio Web Oficial de Limpieza y Detallado de Vehículos

Sitio web moderno, rápido y totalmente estático construido con **Next.js 16**, **TypeScript**, **React 19**, **Tailwind CSS 4** y **Framer Motion** para **Autonet Limpieza de Coches** en Palma de Mallorca.

---

## Características Principales

* **Catálogo de Servicios por Tipo de Vehículo**:
  * **Vehículo Pequeño** (Seat Ibiza, Ford Fiesta, VW Polo) – 29 €
  * **Vehículo Mediano** (Seat León, Ford Focus, VW Golf) – 32 €
  * **Vehículo Grande** (Skoda Octavia, Mercedes, BMW) – 33 €
  * **Furgoneta Pequeña** (Monovolumen, Todoterreno Pequeño) – 36 € - 38 €
  * **Todoterreno Grande** (Furgoneta Grande) – 40 €
* **Soporte Multilingüe (i18n)**: Español (ES), Catalán (CA), Inglés (EN) y Alemán (DE).
* **Modo Oscuro / Claro**: Detección automática y conmutador manual persistente en `localStorage`.
* **Diseño Responsive & Accesible**: Optimizado para dispositivos móviles, tablets y ordenadores con animaciones suaves y tipografía moderna (Outfit & Montserrat).
* **Cumplimiento Legal & Privacidad**: Páginas estáticas de Aviso Legal, Política de Privacidad y Política de Cookies adaptadas al RGPD y LSSI-CE.
* **Ubicación en Palma**: Mapa interactivo de Google Maps integrado en el pie de página para localizar el taller.

---

## Tecnologías Utilizadas

* **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
* **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
* **Librería UI**: [React 19](https://react.dev/)
* **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/)
* **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
* **Iconografía**: [Lucide React](https://lucide.dev/)
* **Gestor de Paquetes**: [pnpm](https://pnpm.io/)

---

## Estructura del Proyecto

```text
src/
├── app/
│   ├── layout.tsx             # Layout raíz (providers, fuentes y favicon)
│   ├── page.tsx               # Página de Inicio (Hero, Características, Historia)
│   ├── servicios/             # Catálogo de servicios por tipo de vehículo
│   ├── testimonios/           # Reseñas y opiniones de clientes
│   ├── privacidad/            # Política de Privacidad
│   ├── cookies/               # Política de Cookies
│   └── legal/                 # Aviso Legal
├── components/
│   ├── animation/             # Componentes de animación scroll
│   ├── layout/                # Navbar, Footer, Hero, Features, Nuestra Historia
│   └── ui/                    # Botones, Toggles de idioma y tema, Iframe
├── context/
│   └── LanguageContext.tsx    # Contexto global de idioma
├── data/
│   └── services.ts            # Datos estáticos de servicios y precios
└── locales/
    └── translations.ts        # Diccionarios de traducción (ES, CA, EN, DE)
```

---

## Configuración y Ejecución

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 20+) y [pnpm](https://pnpm.io/).

### 1. Instalar Dependencias
```bash
pnpm install
```

### 2. Iniciar el Servidor de Desarrollo
```bash
pnpm dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 3. Compilar para Producción
```bash
pnpm build
```

### 4. Iniciar Servidor de Producción
```bash
pnpm start
```
