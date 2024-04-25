"use client"
import React, { useRef } from "react";
import { News } from "./../utils/models";
import { NewsProps } from "../types";
import useHoverHooks from "./../utils/hooks/useCardHover";
import Image from "next/image";
import Link from "next/link";

type BigCardProps = { data: NewsProps };

export default function BigCard({ data }: Readonly<BigCardProps>) {
  const news = new News(data);
  const { img, title, url, dateString } = news;
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  useHoverHooks(cardRef, imageRef); // Hover effect
  return (
    <Link
      ref={cardRef}
      href={url}
      className={`flex flex-col bg-black rounded-3xl overflow-hidden ${
        news.main ? "sticky top-0" : ""
      }`}
      style={{ aspectRatio: "1/1" }}
    >
      <div className='relative h-full w-full'>
        <Image
          ref={imageRef}
          src={img}
          alt={title}
          className='rounded-t-3xl w-full max-h-full object-cover'
          width={200}
          height={200}
        />
        <div className='absolute inset-0 bg-black opacity-40'></div>
        <div className='absolute inset-x-0 bottom-5 text-white gap-4'>
          <div className='text-lg font-black ps-5 mb-3'>{title}</div>
          <div className='text-sm ps-5 pb-5 font-bold'>{dateString}</div>
        </div>
      </div>
    </Link>
  );
}
