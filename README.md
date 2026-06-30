# AutoNet - Plataforma de Reservas de Limpieza de Vehículos

Este es un proyecto web moderno construido con **Next.js 16**, **TypeScript**, **React 19**, **Tailwind CSS**, y **Framer Motion** para la gestión y reserva online de servicios de detallado y limpieza de vehículos.

---

## 🚀 Características Principales

* **Reserva en 4 Pasos**: Wizard de reserva online altamente dinámico, modular y animado.
  * **Selección de Servicio**: Elige entre limpieza exterior, interior, tapicería o detallado premium.
  * **Fecha y Hora**: Selector interactivo de días laborables disponibles (excluyendo domingos) y turnos (mañana/tarde).
  * **Formulario de Cliente**: Recogida segura de datos personales y notas adicionales.
  * **Resumen**: Revisión completa del servicio, costes estimados y tiempos antes de confirmar.
* **Diseño Premium**: Interfaz moderna y oscura con efectos de resplandor, microanimaciones y transiciones fluidas.
* **Responsive**: Totalmente optimizado para dispositivos móviles, tablets y ordenadores.

---

## 🛠️ Tecnologías Utilizadas

* **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
* **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
* **Librería UI**: [React 19](https://react.dev/)
* **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
* **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/)
* **Iconografía**: [Lucide React](https://lucide.dev/)
* **Gestor de Paquetes**: [pnpm](https://pnpm.io/)

---

## 📂 Estructura del Proyecto (Módulos Clave)

El módulo de reservas se ha modularizado para evitar la complejidad y el acoplamiento:

```text
src/app/reservas/
├── page.tsx                  # Punto de entrada de la ruta /reservas
├── ReservasClient.tsx        # Orquestador del flujo y estado de reservas
├── types.ts                  # Declaraciones de tipos e interfaces de datos
├── utils.ts                  # Funciones de utilidad (fechas/horas)
└── components/               # Subcomponentes específicos de cada paso
    ├── PasosProgreso.tsx     # Indicador de progreso (pasos 1-4)
    ├── PasoServicio.tsx      # Paso 1: Selección de Servicio
    ├── PasoFechaHora.tsx     # Paso 2: Selección de Fecha y Hora
    ├── PasoDatos.tsx         # Paso 3: Datos de Contacto
    ├── PasoResumen.tsx       # Paso 4: Resumen de Reserva
    ├── PantallaExito.tsx     # Mensaje de éxito tras confirmación
    └── BotonesAccion.tsx     # Controladores de navegación (Atrás / Siguiente)
```

---

## ⚙️ Configuración y Ejecución

Asegúrate de tener instalado [Node.js](https://nodejs.org/) y [pnpm](https://pnpm.io/).

### 1. Instalar Dependencias
```bash
pnpm install
```

### 2. Iniciar el Servidor de Desarrollo
```bash
pnpm dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

### 3. Compilar para Producción
```bash
pnpm build
```

### 4. Ejecutar Linter y Validar Código
```bash
pnpm lint
```
