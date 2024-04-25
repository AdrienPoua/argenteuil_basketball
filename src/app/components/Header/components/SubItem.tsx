import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { subNavItem } from '@/app/types';

export default function subItem({ data } : { data : subNavItem}) {
  return (
    <Link href={data.url} className='flex justify-center items-center relative rounded-xl overflow-hidden p-12'>
      <Image
        src={ data.image ? `/${data.image}` : "https://picsum.photos/200/200"} 
        className='absolute inset-0 h-full w-full '
        alt="test"
        width = {200}
        height = {200}
      />
        <div className='absolute inset-0 bg-black bg-opacity-30 z-50'></div>
      <div className="p-5 z-10 font-bold text-2xl  text-white"> {data.title} </div>
    </Link>
  );
}
