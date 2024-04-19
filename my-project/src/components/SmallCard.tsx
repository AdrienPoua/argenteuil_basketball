import React from "react";
import { CardProps } from "../utils/types";

export default function SmallCard({
  img,
  title,
  date,
  url,
}: Readonly<CardProps>) {
    const dateString = new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase();

  return (
    <div className='flex flex-col rounded-3xl overflow-hidden basis-[48%] mb-5 '>
      <img src={img} alt='' className='max-w-full w-full object-cover' />
      <div className='flex flex-col bg-black text-cyan-500 p-5 gap-4'>
        <div className='text-lg'>{title}</div>
        <div className='text-sm'>{dateString}</div>
      </div>
    </div>
  );
}
