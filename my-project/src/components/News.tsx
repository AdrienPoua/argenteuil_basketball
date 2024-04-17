import { NewsProps } from "../utils/types.ts";
import React, { useEffect, useRef } from "react";

const BigCard = ({url, img, title, date}: Readonly<{url: string, img: string, title: string, date: string}>) => {
  const card = useRef<HTMLAnchorElement>(null);
  const image = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const effect = "transition duration-500 ease-in-out scale-125".split(" ");
  
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
      card.current.addEventListener('mouseenter', handleMouseEnter);
      card.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (card.current) {
        card.current.removeEventListener('mouseenter', handleMouseEnter);
        card.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [card]);

  return (
    <a ref={card} href={url} className="flex flex-col bg-black rounded-3xl overflow-hidden" style={{ aspectRatio: '1/1' }}>
      <div className="relative h-full w-full">
        <img ref={image} src={img} alt={title} className="rounded-t-3xl w-full max-h-full object-cover" />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <div className="text-lg font-bold">{title}</div>
          <div className="text-sm">{date}</div>
        </div>
      </div>
    </a>
  );
};


export default function News({ mainNews, secondaryNews, othersNews }: Readonly<NewsProps>) {
console.log("🚀 ~ News ~ secondaryNews:", secondaryNews)

  return (
    <div className='flex flex-col w-100 ' >
      <div className='flex justify-between mb-5 text-red-700 ' >
        <div className='font-bold text-3xl'>A l'affiche </div>
        <div className=''>All news </div>
      </div>
      <div className='flex gap-5'>
        <div className='flex-col w-1/2'>
          <BigCard url={mainNews.url} img={mainNews.img} title={mainNews.title} date={mainNews.date} />
        </div>
        <div className='flex-col w-1/2'>
          <div className="w-100">
          <BigCard url={secondaryNews.url} img={secondaryNews.img} title={secondaryNews.title} date={secondaryNews.date} />
          </div>
        </div>
      </div>
    </div>
  );
}
