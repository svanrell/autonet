"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface HeroProps {
  badge?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
}

function Hero({ badge, title, subtitle, actions }: HeroProps) {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["experto", "a mano", "puntual", "confiable"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="portada-seccion">
      <div className="portada-contenedor">
        <div className="portada-contenido">
          {badge && <div>{badge}</div>}
          <div className="portada-grupo-textos">
            <h1 className="portada-titulo">
              <span className="portada-texto-destacado">
                {title || "Autonet es"}
              </span>
              <span className="portada-caja-animacion">
                &nbsp;
                {titles.map((titleText, index) => (
                  <motion.span
                    key={index}
                    className="portada-palabra-animada"
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                          y: 0,
                          opacity: 1,
                        }
                        : {
                          y: titleNumber > index ? -150 : 150,
                          opacity: 0,
                        }
                    }
                  >
                    {titleText}
                  </motion.span>
                ))}
              </span>
            </h1>

            {subtitle && (
              <p className="portada-descripcion">
                {subtitle}
              </p>
            )}
          </div>
          {actions && <div className="portada-botones">{actions}</div>}
        </div>
      </div>
    </div>
  );
}

export { Hero };