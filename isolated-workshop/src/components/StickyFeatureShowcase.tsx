import React, { useState, useEffect, useRef } from 'react';

// Definición de tipos
export interface FeatureSection {
  id: string;
  title: string;
  description: string;
  media: {
    desktop: {
      type: 'video' | 'image'; // Tipos válidos
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
  const [isStickyActive, setIsStickyActive] = useState(false);

  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionObserverRef = useRef<IntersectionObserver | null>(null);

  // Manejar el cambio de tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      const newIsDesktop = window.innerWidth > breakpoint;
      setIsDesktop(newIsDesktop);
      if (!newIsDesktop) {
        setActiveFeatureIndex(0);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  // Observer para detectar la sección activa en desktop
  useEffect(() => {
    if (!isDesktop || features.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let visibleIndex = -1;
        let closestToTop = Infinity;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = featureRefs.current.findIndex(ref => ref === entry.target);
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
      { threshold: 0.1, rootMargin: '-50px 0px 0px 0px' }
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

  // Observer para detectar si estamos dentro de la sección
  useEffect(() => {
    if (!isDesktop || !containerRef.current) {
      setIsStickyActive(false);
      return;
    }

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsStickyActive(entry.isIntersecting);
      },
      {
        threshold: 0.01,
        rootMargin: '0px'
      }
    );

    sectionObserver.observe(containerRef.current);
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

  // Layout para Desktop - CORREGIDO con sticky dentro del contenedor
  if (isDesktop) {
    return (
      <div ref={containerRef} className="w-full max-w-7xl mx-auto px-4 py-10 relative">
        {/* Contenedor sticky para el título */}
        <div 
          className={`sticky top-4 transition-all duration-300 ${
            isStickyActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="bg-[#2D1200] rounded-lg py-3 px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#FFFFFF]">
              {mainTitle}
            </h2>
          </div>
        </div>

        <div className="flex flex-row gap-8 md:gap-12 mt-8">
          {/* Contenido izquierdo - scroll normal */}
          <div className="w-full md:w-1/2 space-y-8 md:space-y-12">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                ref={(el) => { featureRefs.current[index] = el; }}
                className="py-6"
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

          {/* Panel derecho sticky */}
          <div className="w-full md:w-1/2 pl-12 sticky top-24 h-[calc(100vh-180px)]">
            <div className="w-full aspect-video">
              {activeFeature.media.desktop.type === 'video' ? (
                <iframe
                  src={activeFeature.media.desktop.src}
                  title={activeFeature.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg border-0"
                />
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
      </div>
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