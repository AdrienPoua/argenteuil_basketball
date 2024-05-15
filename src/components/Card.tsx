"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import useCardHover from "@/hooks/useCardHover"; // Assurez-vous d'importer correctement vos hooks
import { Coach, NewsModel, Leader, Utils } from "@/models";
import { CoachType, LeaderType, NewsType } from "@/types";
// Assurez-vous d'importer correctement vos modèles

const SmallNews = ({ data } : { data : NewsType }) => {
  const { img, title, url  } = data;
  const cardRef = React.useRef<HTMLAnchorElement | null>(null);
  const imageRef = React.useRef<HTMLImageElement | null>(null);
  useCardHover(cardRef, imageRef);
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
        <div className='text-sm'>{Utils.dateString(data.date)}</div>
      </div>
    </Link>
  );
};

const BigNews = ({ data } : { data : NewsType }) => {
  const { img, title, url, type, date } = data ;
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  useCardHover(cardRef, imageRef); // Hover effect
  return (
    <Link
      ref={cardRef}
      href={url}
      className={`flex flex-col test bg-black rounded-3xl overflow-hidden ${
        type === "main" ? "sticky top-0" : ""
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
          <div className='text-sm ps-5 pb-5 font-bold'>{Utils.dateString(date)}</div>
        </div>
      </div>
    </Link>
  );
};

export const CoachCard = ({ data } : { data : CoachType }) => {
    return (
      <div className='flex mb-5 flex-col min-w-44 items-center flex-wrap text-black rounded-md overflow-hidden'>
        <Image src={data.img} alt={data.name} height={500} width={500} />
        <div className=' flex flex-col border-t-2 border-primary py-3 w-full text-center bg-white '>
          <h2 className='text-lg font-bold '>{data.name}</h2>
          <h3 className='text-sm '>
            {Array.isArray(data.team) && data.team.length > 1
              ? `Equipes ${data.team.join(" & ")}`
              : `Equipe ${data.team}`}
          </h3>
        </div>
      </div>
    );
  };

export const LeaderCard = ({ data }: { data: LeaderType }) => {
    return (
      <div className='flex mb-5 flex-col w-72 aspect-square items-center flex-wrap bg-white text-black rounded-md overflow-hidden'>
        <Image src={data.img} alt={data.name} height={500} width={500} />
        <div className=' flex flex-col border-t-2 border-primary w-full text-center grow justify-center '>
          <h2 className='text-lg font-bold '>{data.name}</h2>
          <h3 className='text-sm'> {data.role} </h3>
        </div>
      </div>
    );
  };
export default function Card({ data } : Readonly<{ data : NewsType | CoachType | LeaderType }>) {
  if ( (data instanceof NewsModel) && data.type ) {
    console.log("ok")

    return <BigNews data={data} />;
  } else if (data instanceof NewsModel) {
    return <SmallNews data={data} />;
  } else if (data instanceof Coach ) {
    return <CoachCard data={data} />;
  } else if (data instanceof Leader) {
    return <LeaderCard data={data} />;
  }

};
