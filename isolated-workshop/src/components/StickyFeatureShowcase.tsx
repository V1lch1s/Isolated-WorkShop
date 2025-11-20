import React, { useEffect, useRef, useState } from "react";

// Types --------------------------------------------------------
export interface FeatureSection {
  id: string;
  title: string;
  description: string;
  media: {
    desktop: {
      type: "video" | "image";
      src: string;
      alt: string;
    };
    mobile: {
      type: "image";
      src: string;
      alt: string;
    };
  };
  colors?: {
    primary: string;
    accent: string;
  };
}

export interface StickyShowcaseProps {
  mainTitle: string;
  features: FeatureSection[];
  breakpoint?: number;
}

// Component ------------------------------------------------------
const StickyFeatureShowcase: React.FC<StickyShowcaseProps> = ({
  mainTitle,
  features,
  breakpoint = 1024,
}) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= breakpoint);
  const [activeIndex, setActiveIndex] = useState(0);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const stickyUnitRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [stickyMode, setStickyMode] =
    useState<"sticky" | "fixed" | "bottom">("sticky");

  // Detect resize ------------------------------------------------
  useEffect(() => {
    const onResize = () => {
      const desktop = window.innerWidth >= breakpoint;
      setIsDesktop(desktop);
      if (!desktop) setActiveIndex(0);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  // Detect active feature via IntersectionObserver ---------------
  useEffect(() => {
    if (!isDesktop) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let cand = -1;
        let minY = Infinity;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = itemRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1 && entry.boundingClientRect.top < minY) {
              minY = entry.boundingClientRect.top;
              cand = idx;
            }
          }
        });

        if (cand !== -1) setActiveIndex(cand);
      },
      { threshold: 0.3 }
    );

    itemRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, [isDesktop, features.length]);

  // Control del sticky que debe quedarse dentro del wrapper ------
  useEffect(() => {
    if (!isDesktop || !wrapperRef.current || !stickyUnitRef.current) return;

    const onScroll = () => {
      const wrapper = wrapperRef.current!;
      const sticky = stickyUnitRef.current!;

      const rect = wrapper.getBoundingClientRect();

      const stickyHeight = sticky.offsetHeight;
      const wrapperTop = rect.top;
      const wrapperBottom = rect.bottom;

      const stickyBottomLimit = wrapperBottom - stickyHeight - 40; // margen inferior

      if (wrapperTop > 20) {
        setStickyMode("sticky"); // Arriba normal
      } else if (wrapperTop <= 20 && wrapperBottom > stickyHeight + 40) {
        setStickyMode("fixed"); // Sigue al usuario
      } else {
        setStickyMode("bottom"); // Se queda abajo
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [isDesktop]);

  // --------------------------------------------------------------
  // DESKTOP LAYOUT -----------------------------------------------
  // --------------------------------------------------------------
  if (isDesktop) {
    const active = features[activeIndex];

    return (
      <div
        ref={wrapperRef}
        className="relative w-full pt-32 pb-40 max-w-[1400px] mx-auto"
      >
        {/* === Capa 4 — Features (scroll normal) === */}
        <div className="relative z-0 w-full max-w-[500px] space-y-28">
          {features.map((f, i) => (
            <div
              key={f.id}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="text-white"
            >
              <h3 className="text-2xl font-bold mb-2">{f.title}</h3>
              <p className="text-lg opacity-90">{f.description}</p>
            </div>
          ))}
        </div>

        {/* === Capa 2 y 3 — Overlay Sticky Unit (Título + Observer + Video) === */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            ref={stickyUnitRef}
            className={`
              pointer-events-auto w-[900px] mx-auto grid grid-cols-2 gap-10
              transition-all duration-0
              ${stickyMode === "sticky" ? "sticky top-10" : ""}
              ${stickyMode === "fixed" ? "fixed top-10 left-1/2 -translate-x-1/2" : ""}
              ${stickyMode === "bottom" ? "absolute bottom-10 left-1/2 -translate-x-1/2" : ""}
            `}
          >
            {/* === Título centrado encima === */}
            <div className="col-span-2">
              <div className="bg-[#2D1200] text-white py-4 px-5 rounded-lg text-center mb-6">
                <h2 className="text-3xl font-bold">{mainTitle}</h2>
              </div>
            </div>

            {/* === Observer (columna izquierda del grid) === */}
            {/* Invisible para que no se vea y respetar el espacio */}
            <div className="invisible flex items-start justify-center">
              <div className="bg-white/10 text-white p-4 rounded-lg">
                Feature: {active.title}
              </div>
            </div>

            {/* === Video (columna derecha del grid) === */}
            <div className="w-full aspect-video rounded-lg overflow-hidden">
              {active.media.desktop.type === "video" ? (
                <iframe
                  src={active.media.desktop.src}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
                /*<video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto rounded-lg object-cover max-h-[500px]"
                  src={active.media.desktop.src}
                />*/
              ) : (
                <img
                  src={active.media.desktop.src}
                  alt={active.media.desktop.alt}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------
  // MOBILE LAYOUT -------------------------------------------------
  // --------------------------------------------------------------
  return (
    <div className="w-full max-w-3xl mx-auto px-5 py-16">
      <h2 className="text-3xl font-bold text-center text-white mb-14">
        {mainTitle}
      </h2>

      <div className="space-y-20">
        {features.map((f) => (
          <div key={f.id} className="text-center">
            <h3 className="text-2xl font-bold text-white mb-3">{f.title}</h3>
            <p className="text-lg text-white/90 mb-6">{f.description}</p>

            <img
              src={f.media.mobile.src}
              alt={f.media.mobile.alt}
              className="w-full rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickyFeatureShowcase;

/*
Uso en App.tsx:
// App.tsx
import React from 'react';
import StickyFeatureShowcase, { StickyShowcaseProps } from './StickyFeatureShowcase'; // Ajusta la ruta según donde hayas guardado el componente

// Datos que coinciden con la interfaz
const showcaseData: StickyShowcaseProps = {
  mainTitle: "Teamwork solutions for high-performing teams",
  breakpoint: 1024,
  features: [
    {
      id: "feature-1",
      title: "Dream it, plan it, launch it",
      description: "The #1 tool for agile teams is now for all teams. Plan, track, and deliver your biggest ideas together.",
      media: {
        desktop: {
          type: "video",
          src: "/demos/feature1.webp", // Asegúrate de que las rutas a los archivos sean correctas
          alt: "Planning and tracking demonstration"
        },
        mobile: {
          type: "image",
          src: "/images/feature1-mobile.jpg",
          alt: "Planning feature"
        }
      },
      colors: {
        primary: "#1868DB",
        accent: "#BF63F3"
      }
    },
    {
      id: "feature-2",
      title: "Scale your knowledge",
      description: "Connect and consolidate scattered docs and disconnected teammates in one, central source of truth.",
      media: {
        desktop: {
          type: "video",
          src: "/demos/feature2.webp",
          alt: "Knowledge management demonstration"
        },
        mobile: {
          type: "image",
          src: "/images/feature2-mobile.jpg",
          alt: "Knowledge scaling"
        }
      },
      colors: {
        primary: "#82B536",
        accent: "#FFFFFF"
      }
    }
    // Puedes añadir más features aquí
  ]
};

function App() {
  return (
    <div className="App">
      {/* Otros componentes }
      <StickyFeatureShowcase
        mainTitle={showcaseData.mainTitle}
        features={showcaseData.features}
        breakpoint={showcaseData.breakpoint}
      />
      {/* Otros componentes }
    </div>
  );
}

export default App;
*/