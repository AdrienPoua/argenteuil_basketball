"use client";
import Player from 'lottie-react';
import animationData from '@/public/animations/basketball.json'; // Chemin vers votre animation Lottie
import useMousePosition from '@/utils/hooks/mouse/mousePosition';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

export default function LottieCursor({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
    const [clicked, setClicked] = useState(false);
    const { position } = useMousePosition();

    // Vérifie si le curseur est à l'intérieur de l'élément référencé
    const disabled = !containerRef.current?.contains(document.elementFromPoint(position.x, position.y));


    useEffect(() => {
        if (disabled) return;
        const handleMouseClick = () => {
            setClicked(true);
            setTimeout(() => {
                setClicked(false);
            }, 1000);
        };

        window.addEventListener('click', handleMouseClick);

        return () => {
            window.removeEventListener('click', handleMouseClick);
        };
    }, [disabled, clicked]);

    if (disabled) {
        return null;
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                top: position.y,
                left: position.x,
                pointerEvents: 'none',
                transform: 'translate(-50%, -50%)',
                zIndex: 9999,
            }}
        >
            <Player
                autoplay={!clicked}
                loop={!clicked}
                animationData={animationData}
                className={`size-16 ${clicked ? 'scale-150' : ''} transition-all duration-300`}
            />
        </Box>
    );
}
