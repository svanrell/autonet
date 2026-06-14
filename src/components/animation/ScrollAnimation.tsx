"use client";

import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 50;

export default function ScrollAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [preloaded, setPreloaded] = useState(false);
    const [progress, setProgress] = useState(0);

    // 1. Preload all frames
    useEffect(() => {
        let loadedCount = 0;
        const tempImages: HTMLImageElement[] = [];

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            const frameNum = String(i).padStart(3, "0");
            img.src = `/animation/ezgif-frame-${frameNum}.webp`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === TOTAL_FRAMES) {
                    setPreloaded(true);
                    // Draw initial frame
                    requestAnimationFrame(() => renderFrame(1));
                }
            };
            img.onerror = () => {
                console.error(`Failed to load frame ${frameNum}`);
                // Continue loading other frames
                loadedCount++;
                if (loadedCount === TOTAL_FRAMES) {
                    setPreloaded(true);
                }
            };
            tempImages.push(img);
        }
        imagesRef.current = tempImages;

        // Resize handler
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Redraw current frame
                const rect = containerRef.current?.getBoundingClientRect();
                if (rect) {
                    const scrollTop = -rect.top;
                    const maxScroll = rect.height - window.innerHeight;
                    if (maxScroll > 0) {
                        const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
                        const frameIndex = Math.floor(scrollFraction * (TOTAL_FRAMES - 1)) + 1;
                        renderFrame(frameIndex);
                    }
                }
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial size

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // 2. Render frame to canvas
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const img = imagesRef.current[index - 1];

        if (!canvas || !ctx || !img || !img.complete) return;

        // Scale canvas to cover viewport keeping aspect ratio (cover mode)
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgWidth = img.width;
        const imgHeight = img.height;

        const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
        const newWidth = imgWidth * ratio;
        const newHeight = imgHeight * ratio;

        const xOffset = (canvasWidth - newWidth) / 2;
        const yOffset = (canvasHeight - newHeight) / 2;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, 0, 0, imgWidth, imgHeight, xOffset, yOffset, newWidth, newHeight);
    };

    // 3. Scroll event listener
    useEffect(() => {
        const handleScroll = () => {
            const container = containerRef.current;
            if (!container || !preloaded) return;

            const rect = container.getBoundingClientRect();
            const scrollTop = -rect.top;
            const viewportHeight = window.innerHeight;
            const containerHeight = rect.height;
            const maxScroll = containerHeight - viewportHeight;

            if (maxScroll <= 0) return;

            const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
            setProgress(scrollFraction);

            const frameIndex = Math.floor(scrollFraction * (TOTAL_FRAMES - 1)) + 1;

            // Draw corresponding frame using requestAnimationFrame for smooth drawing
            requestAnimationFrame(() => renderFrame(frameIndex));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [preloaded]);

    return (
        <div ref={containerRef} className="animacion-scroll-contenedor">
            {/* Contenedor Fijo Sticky */}
            <div className="animacion-scroll-sticky">
                <canvas ref={canvasRef} className="animacion-scroll-canvas" />

                {/* Degradados sobre el canvas para mejorar la legibilidad y estética */}
                <div className="animacion-scroll-capa-degradado" />

                {/* Loading state indicator */}
                {!preloaded && (
                    <div className="animacion-scroll-cargando">
                        <div className="cargando-spinner"></div>
                        <p className="cargando-texto">Cargando experiencia 3D...</p>
                    </div>
                )}

                {/* Textos que aparecen según el scroll */}
                {preloaded && (
                    <div className="animacion-scroll-textos">
                        <div className={`animacion-scroll-frase ${progress >= 0.05 && progress < 0.3 ? "activo" : ""}`}>
                            <span className="frase-categoria">TECNOLOGÍA AUTONET</span>
                            <h2 className="frase-titulo">Un lavado de otro nivel</h2>
                            <p className="frase-descripcion">
                                Cuidamos de tu vehículo utilizando la tecnología de limpieza más avanzada y ecológica del mercado.
                            </p>
                        </div>

                        <div className={`animacion-scroll-frase ${progress >= 0.38 && progress < 0.65 ? "activo" : ""}`}>
                            <span className="frase-categoria">RESULTADOS PROFESIONALES</span>
                            <h2 className="frase-titulo">Detalle en cada rincón</h2>
                            <p className="frase-descripcion">
                                Nuestro proceso meticuloso asegura que tu coche vuelva a lucir como el primer día, sin imperfecciones.
                            </p>
                        </div>

                        <div className={`animacion-scroll-frase ${progress >= 0.72 && progress < 0.95 ? "activo" : ""}`}>
                            <span className="frase-categoria">COMODIDAD Y EFICIENCIA</span>
                            <h2 className="frase-titulo">Listo cuando lo necesites</h2>
                            <p className="frase-descripcion">
                                Reserva tu cita online de forma rápida y sencilla. Nos encargamos de dejarlo impecable.
                            </p>
                        </div>
                    </div>
                )}

                {/* Indicador de Scroll hacia abajo */}
                {preloaded && progress < 0.05 && (
                    <div className="scroll-indicador">
                        <p className="scroll-indicador-texto">Desliza para explorar</p>
                        <div className="scroll-indicador-flecha" />
                    </div>
                )}
            </div>
        </div>
    );
}
