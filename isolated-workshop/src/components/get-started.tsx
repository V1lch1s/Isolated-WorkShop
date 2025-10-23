import { useNavigate } from 'react-router-dom';
import tomato from "../assets/tomato.svg";

// Interfaz para los props
/* Prop: Datos que pasan de un coponente
 *       padre a un componente hijo.
 */
interface GetStartedProps {
    texto?: string;
    destino?: string;
    onClick?: () => void;
    tamaño?: 'sm' | 'md' | 'lg';
    deshabilitado?: boolean;
    className?: string;
    tipo?: 'button' | 'submit' | 'reset';
    reemplazar?: boolean;
    variante?: 'primario' | 'secundario' | 'classic' | 'particles';
    mostrarAura?: boolean;
}

// Componente funcional con Typescript
const GetStarted = ({
    texto = '¡Empieza Ya!',
    destino,
    onClick,
    tamaño = 'lg',
    deshabilitado = false,
    className = '',
    tipo = 'button',
    reemplazar = false,
    variante = 'particles',
    mostrarAura = true
}: GetStartedProps) => {
    const navigate = useNavigate();

    const getSizeClasses = () => {
        switch (tamaño) {
            case 'sm':
                return 'px-3 py-1.5 text-sm';
            case 'md':
                return 'px-3 py-2 text-sm font-semibold';
            case 'lg':
                return 'px-6 py-3 text-lg font-semibold';
            default:
                return 'px-3 py-2 text-sm font-semibold';
        }
    };

    // Clases de variante
    const getVariantClasses = () => {
        switch (variante) {
            case 'classic':     // focus-visible se activa solo con el teclado
                return 'bg-red-500 text-white shadow hover:bg-orange-500 hover:border-[#00b947] border-2 border-transparent focus:ring-3 focus:ring-offset-3 focus:ring-orange-500';
            case 'particles':
                return 'bg-red-500 text-white shadow hover:bg-orange-500 hover:border-[#00b947] border-2 border-transparent focus:ring-3 focus:ring-offset-3 focus:ring-orange-500';
            case 'primario':
                return 'bg-red-600 hover:bg-red-700 hover:border-[#00b947] border-2 border-transparent text-white';
            case 'secundario':
                return 'bg-gray-600 hover:bg-gray-700 hover:border-[#00b947] border-2 border-transparent text-white';
            default:
                return 'bg-red-500 text-white shadow hover:bg-orange-500 hover:border-[#00b947]border-2 border-transparent';
        }
    };

    // Clases base
    const buttonClasses = [
        'rounded-md relative z-30',
        'transition-all duration-300 ease-in-out',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        getSizeClasses(),
        getVariantClasses(),
        className
    ].join(' ').replace(/\s+/g, ' ').trim();

    // Acción del click
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        // Ejecutar callback personalizado si existe
        onClick?.();

        // Navegación si hay destino y no está deshabilitado
        if (!deshabilitado && destino) {
            reemplazar ?
                navigate(destino, { replace: true })
            :
                navigate(destino);
        }
    };

    return (
        <div className="relative inline-block group">
            {/* Botón principal */}
            <button
                type={tipo}
                className={buttonClasses}
                onClick={handleClick}
                disabled={deshabilitado}
                aria-label={texto}
            >
                <span className="relative z-40">{texto}</span>
            </button>

            {/* Aura y partículas - solo se muestra en variante 'particles' */}
            {variante === 'particles' && (
                <ParticleAura mostrarAura={mostrarAura} tomatoParticle={tomato} />
            )}
        </div>
    );
};

// Componente de aura con partículas
const ParticleAura = ({
    mostrarAura,
    tomatoParticle
}: {
    mostrarAura: boolean;
    tomatoParticle: string;
}) => {
    return (
        <div className="absolute inset-0 -z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            
            {/* Aura/Halo difuminado */}
            {mostrarAura && (
                <div className="absolute
                                -inset-5
                                rounded-2xl
                                blur-3xl
                                bg-red-500/40
                                group-hover:bg-orange-500/50
                                transition-all
                                duration-500"
                />
            )}
            
            {/* Partículas alrededor del botón */}
            <div className="absolute inset-0">
                {/* Partícula 1 - Top Center */}
                <img 
                    src={tomatoParticle}
                    alt="" 
                    className="absolute
                               top-0
                               left-1/2
                               w-5 h-5
                               opacity-70
                               blur-[1px]
                               transform
                               -translate-x-1/2
                               group-hover:animate-float-aura-1
                               rotate-12" 
                />
                
                {/* Partícula 2 - Bottom Left */}
                <img 
                    src={tomatoParticle} 
                    alt="" 
                    className="absolute
                               bottom-0
                               left-1/4
                               w-4 h-4
                               opacity-60
                               blur-[2px]
                               group-hover:animate-float-aura-2
                               -rotate-6" 
                />
                
                {/* Partícula 3 - Right Center */}
                <img 
                    src={tomatoParticle} 
                    alt="" 
                    className="absolute
                               top-1/2
                               right-0
                               w-6 h-6
                               opacity-75
                               blur-[1px]
                               group-hover:animate-float-aura-3
                               rotate-45" 
                />
                
                {/* Partícula 4 - Top Right */}
                <img 
                    src={tomatoParticle}
                    alt="" 
                    className="absolute
                               top-1/4
                               right-1/4
                               w-5 h-5
                               opacity-65
                               blur-[1px]
                               group-hover:animate-float-aura-4
                               -rotate-30" 
                />
                
                {/* Partícula 5 - Bottom Right */}
                <img 
                    src={tomatoParticle}
                    alt="" 
                    className="absolute
                               bottom-1/4
                               right-1/4
                               w-4 h-4
                               opacity-70
                               blur-[2px]
                               group-hover:animate-float-aura-5
                               rotate-15" 
                />
                
                {/* Partícula 6 - Left Center */}
                <img 
                    src={tomatoParticle}
                    alt="" 
                    className="absolute
                               top-1/3
                               left-0
                               w-5 h-5
                               opacity-60
                               blur-[1px]
                               group-hover:animate-float-aura-6
                               -rotate-20" 
                />
                
                {/* Partícula 7 - Center Top */}
                <img 
                    src={tomatoParticle}
                    alt="" 
                    className="absolute
                               top-1/4
                               left-1/2
                               w-3 h-3
                               opacity-50 blur-[3px]
                               group-hover:animate-float-aura-7
                               rotate-60" 
                />
                
                {/* Partícula 8 - Center Bottom */}
                <img 
                    src={tomatoParticle}
                    alt="" 
                    className="absolute
                               bottom-1/4
                               right-1/2
                               w-4 h-4
                               opacity-55 blur-[2px]
                               group-hover:animate-float-aura-8
                               -rotate-45" 
                />
            </div>
        </div>
    );
};

export default GetStarted;