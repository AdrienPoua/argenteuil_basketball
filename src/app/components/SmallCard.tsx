"use client";

import React from "react";
import { NewsProps } from "../types";
import { News } from "./../utils/models";
import useCardHoverEffect from "../utils/hooks/useCardHover";
import Image from "next/image";
import Link from "next/link";

type SmallCardProps = { data: NewsProps };

export const SmallCard = ({ data }: Readonly<SmallCardProps>) => {
  const { img, title, url, dateString } = new News(data);
  const cardRef = React.useRef<HTMLAnchorElement | null>(null);
  const imageRef = React.useRef<HTMLImageElement | null>(null);
  useCardHoverEffect(cardRef, imageRef);
  return (
    <Link
      ref={cardRef}
      href={url}
      className='flex flex-col relative rounded-3xl overflow-hidden basis-[48%] mb-5
    '
    >
      <div className='overflow-hidden relative'>
        <Image
          ref={imageRef}
          src={img}
          alt=''
          className='max-w-full w-full object-cover'
          width={1980}
          height={1080}
        />
        <div className='absolute inset-0 bg-black opacity-40'></div>
      </div>
      <div className='flex flex-col bg-white p-5  '>
        <div className='text-lg'>{title}</div>
        <div className='text-sm'>{dateString}</div>
      </div>
    </Link>
  );
};
