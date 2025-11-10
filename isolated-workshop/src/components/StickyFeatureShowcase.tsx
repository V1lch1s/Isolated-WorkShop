import React, { useState, useEffect, useRef } from 'react';

// Definición de tipos basada en tu especificación
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
  const [isAtBottom, setIsAtBottom] = useState(false);

  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null); // Ref para el observer

  // Manejar el cambio de tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      const newIsDesktop = window.innerWidth > breakpoint;
      setIsDesktop(newIsDesktop);
      // Reiniciar el índice si cambiamos a móvil
      if (!newIsDesktop) {
          setActiveFeatureIndex(0);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  // Observer para detectar la sección activa en desktop
  useEffect(() => {
    // Limpia el observer anterior si existe
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (!isDesktop || features.length === 0) {
      setIsAtBottom(false); // Resetear el estado al cambiar a móvil si no hay features
      return;
    }

    // Configura el nuevo observer
    const observer = new IntersectionObserver(
      (entries) => {
        let visibleIndex = -1;
        let isLastVisible = false;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = featureRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              if (visibleIndex === -1) visibleIndex = index; // Toma el primero que se intersecta
              if (index === features.length - 1) isLastVisible = true; // Marca si es el último
            }
          }
        });

        if (visibleIndex !== -1) {
          setActiveFeatureIndex(visibleIndex);
          setIsAtBottom(isLastVisible); // Actualiza isAtBottom basado en si el último está visible
        }
      },
      {
        // rootMargin: '0px 0px -70% 0px', // Puedes ajustar este valor si quieres que se active antes o después
        threshold: 0.1, // El elemento debe estar al menos un 10% visible
      }
    );

    // Observa cada ref
    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Guarda la instancia del observer en la ref
    observerRef.current = observer;

    // Limpia al desmontar o cambiar dependencias
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isDesktop, features.length]);  // Se vuelve a ejecutar si cambia isDesktop o features.length

  const activeFeature = features[activeFeatureIndex];

  if (!activeFeature) {
    return null; // O un mensaje de error si no hay features
  }

  // Layout para Desktop
  if (isDesktop) {
    return (
      <div className="w-full max-w-14xl mx-auto px-10 py-10 md:px-8">
        <div className="flex flex-row gap-8 md:gap-12">
          {/* Columna Izquierda - Lista de Características */}
          <div className="w-full md:w-1/2 space-y-16 md:space-y-24">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                ref={(el) => {featureRefs.current[index] = el}}
                className="py-4" // Espaciado para el observer
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

          {/* Columna Derecha - Contenedor Sticky */}
          <div
            className={`w-full md:w-1/2 sticky top-8 transition-opacity duration-300 ${
              isAtBottom ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            style={{ height: 'fit-content' }} // Asegura que no colapse si el contenido es más corto
          >
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
                {mainTitle}
              </h2>
              <div className="relative">
                {activeFeature.media.desktop.type === 'video' ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-auto rounded-lg object-cover max-h-[500px]"
                    src={activeFeature.media.desktop.src}
                  />
                ) : (
                  <img
                    src={activeFeature.media.desktop.src}
                    alt={activeFeature.media.desktop.alt}
                    className="w-full h-auto rounded-lg object-cover max-h-[500px]"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Layout para Mobile
  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-16">
      <h2 className="text-2xl text-[#FFFFFF] md:text-3xl font-bold text-center mb-8">
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