import Player from 'lottie-react';
import animationData from '@/public/animations/404.json';

export default function Lottie404() {
    return (
        <Player
            autoplay
            loop
            animationData={animationData} />
    );
}

