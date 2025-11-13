import React, { useState, useEffect, useRef } from 'react';

// Definición de tipos
export interface FeatureSection {
  id: string;
  title: string;
  description: string;
  media: {
    desktop: {
      type: 'video';
      src: string; // Video .webp o mp4
      alt: string;
    };
    mobile: {
      type: 'image';
      src: string; // Imagen estática
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
  breakpoint?: number; // default: 1024
}

const StickyFeatureShowcase: React.FC<StickyShowcaseProps> = ({
  mainTitle,
  features,
  breakpoint = 1024,
}) => {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > breakpoint);
  const [containerOffset, setContainerOffset] = useState({ left: 0, width: 0 }); // Posición del contenedor principal
  const [isInSection, setIsInSection] = useState(false);

  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionObserverRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null); // Referencia al contenedor principal

  // Manejar el cambio de tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      const newIsDesktop = window.innerWidth > breakpoint;
      setIsDesktop(newIsDesktop);
      if (!newIsDesktop) {
        setActiveFeatureIndex(0);
      }
      // Recalcular offset si cambia el tamaño
      if (newIsDesktop && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerOffset({ left: rect.left + window.scrollX, width: rect.width });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  // Calcular offset del contenedor principal al montar y si cambia
  useEffect(() => {
    if (isDesktop && containerRef.current) {
      const updateOffset = () => {
        const rect = containerRef.current!.getBoundingClientRect();
        setContainerOffset({ left: rect.left + window.scrollX, width: rect.width });
      };

      updateOffset(); // Inicial
      window.addEventListener('scroll', updateOffset, { passive: true });
      return () => window.removeEventListener('scroll', updateOffset);
    }
  }, [isDesktop]);

  // Observer para detectar la sección activa en desktop
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (!isDesktop || features.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let visibleIndex = -1;
        let closestToTop = Infinity;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = featureRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              const rect = entry.boundingClientRect;
              if (rect.top < closestToTop) {
                closestToTop = rect.top;
                visibleIndex = index;
              }
            }
          }
        });

        if (visibleIndex !== -1) {
          setActiveFeatureIndex(visibleIndex);
        }
      },
      { threshold: 0.1 }
    );

    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isDesktop, features.length]);

  useEffect(() => {
    if (sectionObserverRef.current) {
      sectionObserverRef.current.disconnect();
    }

    if (!isDesktop) {
      setIsInSection(false);
      return;
    }

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInSection(entry.isIntersecting);
        // Opcional: Puedes usar isIntersecting para saber si está entrando o saliendo
        // console.log("isIntersecting:", entry.isIntersecting);
      },
      {
        threshold: 0.01, // Dispara si cualquier parte está visible
        // Cambia rootMargin: detecta cuando entra/sale del viewport
        rootMargin: '-20px 0px -80% 0px', // Opcional: activar antes de que salga completamente
        // Simplemente:
        // rootMargin: '0px', // Activa cuando entra, desactiva cuando sale completamente
      }
    );

    if (containerRef.current) {
      sectionObserver.observe(containerRef.current);
    }

    sectionObserverRef.current = sectionObserver;

    return () => {
      if (sectionObserverRef.current) {
        sectionObserverRef.current.disconnect();
      }
    };
  }, [isDesktop]);

  const activeFeature = features[activeFeatureIndex];

  if (!activeFeature) {
    return null;
  }

  // Layout para Desktop
  if (isDesktop) {
    // Calcular posiciones fijas basadas en el contenedor
    const titleLeft = containerOffset.left;
    const titleWidth = containerOffset.width;
    const videoLeft = titleLeft + (containerOffset.width / 2) + 48; // Aproximadamente w-1/2 + pl-15 (60px)
    const videoWidth = (containerOffset.width / 2) - 48; // Aproximadamente w-1/2 - pl-15

    return (
      <>
        {/* Contenedor invisible para que el contenido de la izquierda fluya normalmente */}
        <div ref={containerRef} className="w-full max-w-14xl mx-0 px-0 py-10 relative">
          {/* Espacio reservado para elementos fijos para no superponer contenido */}
          <div className="h-20"></div> {/* Espacio para el título fijo */}
          <div className="flex flex-row gap-8 md:gap-12">
            <div className="w-full md:w-1/2 space-y-16 pr-15 md:space-y-24">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  ref={(el) => { featureRefs.current[index] = el; }}
                  className="py-4"
                >
                  <h3 className="text-[#FFFFFF] text-xl md:text-2xl font-bold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-base md:text-lg text-[#FFFFFF]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
            {/* Espacio reservado para el video fijo */}
            <div className="w-full md:w-1/2 pl-15 invisible">
              {/* Reservado*/}
            </div>
          </div>
        </div>

        {/* Título Fijo */}
        {isInSection && (
          <div
            className="fixed top-0 z-100 bg-[#000000] flex justify-center items-center py-4"
            style={{ left: titleLeft, width: titleWidth }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#FFFFFF]">
              {mainTitle}
            </h2>
          </div>
        )}

        {/* Contenedor del Video Fijo */}
        {isInSection && (
          <div
            className="fixed z-100"
            style={{ top: 80, left: videoLeft, width: videoWidth, height: 'calc(100vh - 80px - 2rem)' }}
          >
            <div className="p-4 md:p-4 rounded-lg shadow-lg h-full flex items-center justify-center">
              <div className="relative aspect-video w-full">
                {activeFeature.media.desktop.type === 'video' ? (
                  <iframe
                    src={activeFeature.media.desktop.src}
                    title={activeFeature.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full rounded-lg border-0"
                  />
                  /*<video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-auto rounded-lg object-cover max-h-[500px]"
                    src={activeFeature.media.desktop.src}
                  />*/
                ) : (
                  <img
                    src={activeFeature.media.desktop.src}
                    alt={activeFeature.media.desktop.alt}
                    className="w-full h-full rounded-lg object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Layout para Mobile
  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-16">
      <h2 className="text-2xl text-[#FFFFFF] md:text-3xl font-bold text-center mb-15">
        {mainTitle}
      </h2>
      <div className="space-y-16">
        {features.map((feature) => (
          <div key={feature.id} className="flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-[#FFFFFF] mb-4">
              {feature.title}
            </h3>
            <p className="text-base text-[#FFFFFF] mb-6">
              {feature.description}
            </p>
            <div className="w-full max-w-md">
              <img
                src={feature.media.mobile.src}
                alt={feature.media.mobile.alt}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
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