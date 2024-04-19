import React, { useRef, useEffect } from "react";
import { CardProps } from "../utils/types";


export const BigCard = ({ url, img, title, date }: Readonly<CardProps>) => {
  const card = useRef<HTMLAnchorElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const dateString = new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase();
  useEffect(() => {
    
    const effect = "transition duration-500 ease-in-out scale-110".split(" ");

    const handleMouseEnter = () => {
      if (image.current) {
        image.current.classList.add(...effect);
      }
    };

    const handleMouseLeave = () => {
      if (image.current) {
        image.current.classList.remove(...effect);
      }
    };
    if (card.current) {
      card.current.addEventListener("mouseenter", handleMouseEnter);
      card.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (card.current) {
        card.current.removeEventListener("mouseenter", handleMouseEnter);
        card.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [card]);
  return (
    <a
      ref={card}
      href={url}
      className='flex flex-col bg-black rounded-3xl overflow-hidden sticky'
      style={{ aspectRatio: "1/1" }}
    >
      <div className='relative h-full w-full'>
        <img
          ref={image}
          src={img}
          alt={title}
          className='rounded-t-3xl w-full max-h-full object-cover'
        />
        <div className='absolute inset-0 bg-black opacity-40'></div>
        <div className='absolute inset-x-0 bottom-5 text-white gap-4'>
          <div className='text-lg font-black ps-5 mb-3'>{title}</div>
          <div className='text-sm ps-5 pb-5 font-bold'>{dateString}</div>
        </div>
      </div>
    </a>
  );
};
