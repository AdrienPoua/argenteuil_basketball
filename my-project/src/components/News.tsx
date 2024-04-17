import { NewsProps } from "../utils/types.ts";
import React, { useEffect, useRef } from "react";
import { BigCard } from "./BigCard";



export default function News({ mainNews, secondaryNews, othersNews }: Readonly<NewsProps>) {
console.log("🚀 ~ News ~ secondaryNews:", secondaryNews)

  return (
    <div className='flex flex-col w-100 ' >
      <div className='flex justify-between mb-5 uppercase items-center py-5 ' >
        <div className='font-black text-5xl '>Latest News </div>
        <a href="/" className=' underline font-black basis-3/12 text-end '>All news </a>
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
