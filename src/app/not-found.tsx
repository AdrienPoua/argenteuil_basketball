"use client";
import Link from 'next/link';
import Lottie404 from '@/utils/lottie/404'
import { MoveLeft } from "lucide-react";
import Player from 'lottie-react';
import animationData from '@/public/animations/404.json';



export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black relative ">
            <Link href="/" className="absolute top-16 left-16 hover:cursor-pointer aspect-square">
                <MoveLeft strokeWidth={1.5} className="text-8xl" />
            </Link>
            <h1 className="text-center max-w-[80%]" > Il n&apos;y a rien a voir ici, vas t&apos;entraîner !</h1>
            <Link href="/" className="h-[500px] w-[500px]">
                <Player
                    autoplay
                    loop
                    animationData={animationData} />
            </Link>
        </div>
    );
}
