import basketball from '@/public/animations/basketball.json'; 
import Player from 'lottie-react';

export default function LottieAnimation() {
  return (
    <Player
      autoplay
      loop
      animationData={basketball}
      style={{ height: '300px', width: '300px' }}
    />
  );
}
