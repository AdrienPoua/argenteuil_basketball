import React from "react";
import { CardProps } from "../utils/types";
import { News } from "./../utils/models";


export const SmallCard = (props : Readonly<CardProps>) => {
  const news = new News(props)
  const { img, title, url, dateString } = news;
  return (
    <a href={url}
      className='flex flex-col relative rounded-3xl overflow-hidden basis-[48%] mb-5
    '
    >
      <img src={img} alt='' className='max-w-full w-full object-cover' />
      <div className='flex flex-col bg-black text-cyan-500 p-5  '>
      <div className='absolute inset-0 bg-black opacity-40'></div>
        <div className='text-lg'>{title}</div>
        <div className='text-sm'>{dateString}</div>
      </div>
    </a>
  );
}
