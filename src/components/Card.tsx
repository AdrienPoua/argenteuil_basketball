"use client";
import { MailIcon, PhoneIcon } from "@/components/icons";
import club from "@/data/club.json";
import {v4 as uuidv4} from 'uuid';

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import useCardHover from "@/hooks/useCardHover"; // Assurez-vous d'importer correctement vos hooks
import { Coach, NewsModel, Leader, Utils, Team } from "@/models";
import { CoachType, LeaderType, NewsType, PlayerType, TeamType } from "@/types";
// Assurez-vous d'importer correctement vos modèles

const SmallNews = ({ data }: { data: NewsType }) => {
  const { img, title, url } = data;
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

const BigNews = ({ data }: { data: NewsType }) => {
  const { img, title, url, type, date } = data;
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
          <div className='text-sm ps-5 pb-5 font-bold'>
            {Utils.dateString(date)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export const CoachCard = ({ data }: { data: CoachType }) => {
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
  console.log(data);
  return (
    <div className='flex mb-5 flex-col w-92 aspect-square items-center flex-wrap bg-white text-black rounded-md overflow-hidden'>
      <Image src={data.img} alt={data.name} height={500} width={500} />
      <div className='flex flex-col border-t-2 border-primary w-full text-center grow justify-center'>
        <div className='flex items-center relative '>
          <h2 className='text-3xl font-bold grow '>{data.name}</h2>
          {data.isEmailDisplayed && (
            <MailIcon email={data.email || club.email} />
          )}
        </div>
        <div className='flex items-center relative '>
          <h3 className='text-lg font-bold grow '>{data.role}</h3>
          {data.isNumberDisplayed && (
            <PhoneIcon number={data.number || club.number} />
          )}
        </div>
      </div>
    </div>
  );
};

export const TeamCard = ({ data }: { data: TeamType }) => {
  console.log("🚀 ~ TeamCard ~ data:", data);


  return (
    <div className='relative overflow-hidden w-full h-[700px] rounded-md shadow-lg hover:shadow-xl transition duration-300'>
      <div className='absolute inset-0 overflow-hidden rounded-md'>
        <Image
          src={data.img}
          alt={data.name}
          layout='fill'
          objectFit='cover'
          className='object-cover'
        />
      </div>
      <h2 className='absolute inset-0 flex justify-center items-center text-6xl text-white'>
        {data.name}
      </h2>
      <div className='absolute inset-0 flex px-4 py-2 bg-black bg-opacity-50 text-white transition-opacity duration-300 opacity-0 hover:opacity-100'>
        <div className='flex flex-col basis-1/2 pt-5 '>
          <h3 className='text-4xl font-bold mb-8 text-center'>
            Coach <span className='text-primary'> {data.coach} </span>{" "}
          </h3>
          <div className='flex p-10 flex-wrap justify-center items-center'>
            {data.players.map((player: PlayerType, index) => (
              <h4
                key={uuidv4()}
                className='basis-1/3 text-2xl mb-8 text-center'
              >
                {" "}
                {player.name}{" "}
              </h4>
            ))}
          </div>
        </div>
        <div className='flex flex-col basis-1/2 pt-5 '>
          <h3 className='text-4xl font-bold mb-8 text-center text-primary'>
            Entrainements
          </h3>
          <div className='flex flex-col gap-15 mb-8 justify-center items-center grow'>
            {data.trainings ? (
              data.trainings.map((training) => (
                <h4
                  key={uuidv4()}
                  className='text-3xl text-center mb-5'
                >
                  {" "}
                  {training?.day} {training?.time} {training?.gym}{" "}
                </h4>
              ))
            ) : (
              <h4 className='text-3xl text-center mb-5'>
                {" "}
                Pas d&apos;entrainements prévus{" "}
              </h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default function Card({
  data,
}: Readonly<{ data: NewsType | CoachType | LeaderType | TeamType }>) {
  if (data instanceof NewsModel && data.type) {
    return <BigNews data={data} />;
  } else if (data instanceof NewsModel) {
    return <SmallNews data={data} />;
  } else if (data instanceof Coach) {
    return <CoachCard data={data} />;
  } else if (data instanceof Leader) {
    return <LeaderCard data={data} />;
  } else if (data instanceof Team) {
    return <TeamCard data={data} />;
  }
}
