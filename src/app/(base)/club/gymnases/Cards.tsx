import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import Image from "next/image";


type GymCardProps = {
  image: string,
  name: string,
  adress: string,
  city: string,
};

export default function GymCard({ image, name, adress, city }: Readonly<GymCardProps>): React.ReactElement {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <Card
      onClick={handleClick}
      className="relative w-full h-72 lg:h-[600px] rounded-lg shadow-lg border-none transition-transform duration-150 ease-in-out hover:scale-105 cursor-pointer overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={name}
          className="object-cover w-full h-full"
          layout="fill"
        />
      </div>

      {/* Overlay for click effect */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 z-10 ${isClicked ? "opacity-50" : "opacity-0"
          }`}
      />

      {/* Card Content */}
      <CardContent className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
        {!isClicked ? (
          <h2 className="text-3xl lg:text-5xl text-center bg-black bg-opacity-60 w-full p-2">
            {name}
          </h2>
        ) : (
          <div className="flex flex-col">
            <p className="text-xl md:text-3xl lg:text-5xl text-center">
              {adress}
            </p>
            <p className="text-xl md:text-3xl lg:text-5xl text-center">
              {city}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
