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
import { Card, CardActionArea, CardContent, Typography, Box, CardMedia } from "@mui/material";

const SmallNews = ({ data }: { data: NewsType }) => {
  const { img, title, url } = data;
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  useCardHover(cardRef, imageRef);
  return (
    <Link href={url} ref={cardRef} className="flex flex-col relative basis-[48%] mb-5">
      <Card className="relative rounded-3xl overflow-hidden">
        <CardActionArea>
          <Box className="overflow-hidden relative">
            <Image ref={imageRef} src={img} alt="" className="max-w-full w-full object-cover" width={1980} height={1080} />
            <Box className="absolute inset-0 bg-black opacity-40" />
          </Box>
          <CardContent className="bg-white p-5">
            <Typography variant="h6" component="div">{title}</Typography>
            <Typography variant="body2" color="textSecondary">{Utils.dateString(data.date)}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};


const BigNews = ({ data }: { data: NewsType }) => {
  const { img, title, url, type, date } = data;
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  useCardHover(cardRef, imageRef);
  return (
    <Link href={url} ref={cardRef} className={`flex flex-col ${type === "main" ? "sticky top-0" : ""}`} style={{ aspectRatio: "1/1" }}>
      <Card className="relative rounded-3xl overflow-hidden">
        <CardActionArea>
          <Box className="relative h-full w-full">
            <Image ref={imageRef} src={img} alt={title} className="rounded-t-3xl w-full max-h-full object-cover" width={200} height={200} />
            <Box className="absolute inset-0 bg-black opacity-40" />
            <Box className="absolute inset-x-0 bottom-5 text-white gap-4">
              <Typography variant="h5" component="div" className="ps-5 mb-3">{title}</Typography>
              <Typography variant="body2" className="ps-5 pb-5">{Utils.dateString(date)}</Typography>
            </Box>
          </Box>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export const CoachCard = ({ data }: { data: CoachType }) => {
  return (
    <Card className="flex flex-col mb-5 min-w-44 items-center flex-wrap text-black rounded-md overflow-hidden">
      <CardMedia>
        <Image src={data.img} alt={data.name} height={500} width={500} />
      </CardMedia>
      <CardContent className="flex flex-col border-t-2 border-primary py-3 w-full text-center bg-white">
        <Typography variant="h6" component="div">{data.name}</Typography>
        <Typography variant="body2" component="div">
          {Array.isArray(data.team) && data.team.length > 1 ? `Equipes ${data.team.join(" & ")}` : `Equipe ${data.team}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export const LeaderCard = ({ data }: { data: LeaderType }) => {
  return (
    <Card className="flex flex-col mb-5 w-92 aspect-square items-center flex-wrap bg-white text-black rounded-md overflow-hidden">
      <CardMedia>
        <Image src={data.img} alt={data.name} height={500} width={500} />
      </CardMedia>
      <CardContent className="flex flex-col border-t-2 border-primary w-full text-center grow justify-center">
        <Box className="flex items-center relative">
          <Typography variant="h4" component="div" className="grow">{data.name}</Typography>
          {data.isEmailDisplayed && <MailIcon email={data.email || club.email} />}
        </Box>
        <Box className="flex items-center relative">
          <Typography variant="h6" component="div" className="grow">{data.role}</Typography>
          {data.isNumberDisplayed && <PhoneIcon number={data.number || club.number} />}
        </Box>
      </CardContent>
    </Card>
  );
};
export const TeamCard = ({ data }: { data: TeamType }) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => { setIsClicked(!isClicked) };

  return (
    <Card onClick={handleClick} className="relative overflow-hidden w-full h-[700px] rounded-md shadow-lg hover:scale-105 transition duration-150">
      <CardActionArea>
        <Box className="absolute inset-0 overflow-hidden rounded-md">
          <Image src={data.img} alt={data.name} layout="fill" objectFit="cover" className="object-cover" />
        </Box>
        <Typography variant="h2" className="absolute inset-0 flex justify-center items-center text-6xl text-white">{data.name}</Typography>
        {isClicked && (
          <CardContent className="absolute inset-0 flex px-4 py-2 bg-black bg-opacity-50 text-white transition-opacity duration-300 opacity-0 hover:opacity-100">
            <Box className="flex flex-col basis-1/2 pt-5">
              <Typography variant="h4" className="text-4xl font-bold mb-8 text-center">
                Coach <span className="text-primary">{data.coach}</span>
              </Typography>
              <Box className="flex p-10 flex-wrap justify-center items-center">
                {data.players.map((player: PlayerType) => (
                  <Typography key={uuidv4()} variant="h5" className="basis-1/3 text-2xl mb-8 text-center">{player.name}</Typography>
                ))}
              </Box>
            </Box>
            <Box className="flex flex-col basis-1/2 pt-5">
              <Typography variant="h4" className="text-4xl font-bold mb-8 text-center text-primary">Entrainements</Typography>
              <Box className="flex flex-col gap-15 mb-8 justify-center items-center grow">
                {data.trainings ? (
                  data.trainings.map((training) => (
                    <Typography key={uuidv4()} variant="h6" className="text-3xl text-center mb-5">
                      {training.day} {training.start} - {training.end} {training.gym}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="h6" className="text-3xl text-center mb-5">Pas d&apos;entrainements prévus</Typography>
                )}
              </Box>
            </Box>
          </CardContent>
        )}
      </CardActionArea>
    </Card>
  );
};


export default function Index({
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
