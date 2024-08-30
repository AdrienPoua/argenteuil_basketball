"use client";
import Player from 'lottie-react';
import animationData from '@/public/animations/basketball.json'; // Chemin vers votre animation Lottie
import useMousePosition from '@/utils/hooks/mouse/mousePosition';
import { Box } from '@mui/material';
export default function LottieCursor() {
    const { position, clicked } = useMousePosition();
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
                className={`size-16 ${clicked ? 'scale-150' : ''} transition-all duration-300` }
            />
        </Box>
    );
}
