import React from "react";
import Image from "next/image";
import background from "@/public/background.jpg";

export default function LandingPage() {
  return (
    <>
    <div className="h-svh relative">
      <div className='absolute h-96 inset-x-0 bottom-0 w-full bg-gradient-to-t from-black'></div>
      <Image
        src={background}
        alt='background'
        className='w-full h-full object-cover object-bottom'
        width={1920}
        height={1080}
      />
    </div>
      <div className='h-16 w-full bg-black'> </div>
      </>
  );
}
