import React from 'react';
import { useNavigate } from 'react-router-dom';

// Interfaz para los props
/* Prop: Datos que pasan de un coponente
 *       padre a un componente hijo.
 */
interface BotonProps {
    texto?: string;
    destino?: string;
    onClick?: () => void;
    tamaño?: 'sm' | 'md' | 'lg';
    deshabilitado?: boolean;
    className?: string;
    tipo?: 'button' | 'submit' | 'reset';
    reemplazar?: boolean;
}

// Componente funcional con Typescript
const GetStarted: React.FC<BotonProps> = ({
    texto = '¡Empieza Ya!', // Valor por defecto
    destino,
    onClick,
    tamaño = 'lg',
    deshabilitado = false,
    className = '',
    tipo = 'button',
    reemplazar = false
}) => {
    const navigate = useNavigate();

    // Clases de tamaño responsive
    const getSizeClasses = () => {
        switch (tamaño) {
            case 'sm':
                return 'px-4 py-2 text-sm';
            case 'md':
                return 'px-6 py-3 text-base';
            case 'lg':
                return 'px-8 py-4 text-lg';
            default:
                return 'px-6 py-3 text-base';
        }
    };

    // Clases base + tamaño + clases personalizadas
    const buttonClasses = `
        text-white bg-red-900 rounded-lg
        hover:bg-pink-900 active:scale-95
        focus:ring-4 focus:ring-green-300 focus:outline-none
        transition-all duration-150 ease-in-out
        font-semibold tracking-wide
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${getSizeClasses()}
        ${className}
    `.trim().replace(/\s+/g, ' ');

    // Función específica del botón
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // console.log(`Botón ${texto} clickeado`);

        if (onClick) {
            onClick();
        }

        if (!deshabilitado && destino) {
            if (reemplazar) {
                navigate(destino, { replace: true });
            } else {
                navigate(destino);
            }
        }
    };

    return (
        <button
            type={tipo}
            className={buttonClasses}
            onClick={handleClick}
            disabled={deshabilitado}
            aria-label={texto}
        >
            {texto}
        </button>
    );
};

export default GetStarted;