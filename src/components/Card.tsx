"use client";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import { useCallback, useEffect } from "react";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useCardHover from "@/hooks/useCardHover"; // Assurez-vous d'importer correctement vos hooks
import { Coach, NewsModel, Leader, Utils, Team } from "@/models";
import { CoachType, LeaderType, NewsType, TeamType } from "@/types";
import { Card, CardActionArea, CardContent, Typography, Box, CardMedia } from "@mui/material";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import EmailIcon from "@mui/icons-material/Email";

const SmallNews = ({ data }: { data: NewsType }) => {
  const { img, title, url } = data;
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  useCardHover(cardRef, imageRef);
  return (
    <Link href={url} ref={cardRef} className='flex flex-col relative basis-[48%] mb-5'>
      <Card className='relative rounded-3xl overflow-hidden'>
        <CardActionArea>
          <Box className='overflow-hidden relative'>
            <Image ref={imageRef} src={img} alt='' className='max-w-full w-full object-cover' width={1980} height={1080} />
            <Box className='absolute inset-0 bg-black opacity-40' />
          </Box>
          <CardContent className='bg-white p-5'>
            <Typography variant='h6' component='div'>
              {title}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              {Utils.dateString(data.date)}
            </Typography>
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
      <Card className='relative rounded-3xl overflow-hidden'>
        <CardActionArea>
          <Box className='relative h-full w-full'>
            <Image ref={imageRef} src={img} alt={title} className='rounded-t-3xl w-full max-h-full object-cover' width={200} height={200} />
            <Box className='absolute inset-0 bg-black opacity-40' />
            <Box className='absolute inset-x-0 bottom-5 text-white gap-4'>
              <Typography variant='h5' component='div' className='ps-5 mb-3'>
                {title}
              </Typography>
              <Typography variant='body2' className='ps-5 pb-5'>
                {Utils.dateString(date)}
              </Typography>
            </Box>
          </Box>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export const CoachCard = ({ data }: { data: CoachType }) => {
  return (
    <Card className='flex flex-col mb-5 min-w-44 items-center flex-wrap text-black rounded-md overflow-hidden h-fit'>
      <CardMedia>
        <Image src={data.img} alt={data.name} height={500} width={500} />
      </CardMedia>
      <CardContent className='flex flex-col border-t-2 border-primary py-3 w-full text-center bg-white'>
        <Typography variant='h6' component='div'>
          {data.name}
        </Typography>
        <Typography variant='body2' component='div'>
          {Array.isArray(data.team) && data.team.length > 1 ? `Equipes ${data.team.join(" & ")}` : `Equipe ${data.team}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export const LeaderCard = ({ data }: { data: LeaderType }) => {
  const [clicked, setClicked] = useState(false);

  const EMAIL_NOTIFICATION = "Email copié dans le press-papier";
  const NUMBER_NOTIFICATION = "Numéro copié dans le press-papier";

  const notify = useCallback((data: string) => {
    const message = data.includes("@") ? EMAIL_NOTIFICATION : NUMBER_NOTIFICATION;
    toast.success(message, {
      position: "bottom-center",
      duration: 5000,
    });
  }, []);

  const handleClick = useCallback(
    (data: string) => {
      if (!clicked) {
        navigator.clipboard.writeText(data);
        notify(data);
        setClicked(true);
      }
    },
    [clicked, notify]
  );

  useEffect(() => {
    if (clicked) {
      const timer = setTimeout(() => setClicked(false), 500);
      return () => clearTimeout(timer);
    }
  }, [clicked]);
  return (
    <Card className='flex flex-col mb-5 aspect-square items-center flex-wrap bg-white text-black rounded-md overflow-hidden'>
      <Toaster />
      <CardMedia>
        <Image src={data.img} alt={data.name} height={500} width={500} />
      </CardMedia>
      <CardContent className='flex flex-col border-t-2 border-primary w-full text-center grow justify-center'>
        <Box className='flex items-center relative'>
          <Typography  component='h3' className='grow text-black font-bold text-2xl'>
            {data.name}
          </Typography>
          {data.isEmailDisplayed && <EmailIcon fontSize='large' onClick={() => handleClick(data.email)} className='cursor-pointer' />}
        </Box>
        <Box className='flex items-center relative'>
          <Typography  component='h2' className='grow  text-black'>
            {data.role}
          </Typography>
          {data.isNumberDisplayed && <PhoneIphoneIcon fontSize='large' onClick={() => handleClick(data.number)} className='cursor-pointer' />}
        </Box>
      </CardContent>
    </Card>
  );
};

export const TeamCard = ({ data }: { data: TeamType }) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <Card
      onClick={handleClick}
      className="relative overflow-hidden w-full h-[700px] rounded-lg shadow-lg transition-transform duration-150 ease-in-out transform hover:scale-105"
    >
      <CardActionArea className="h-full">
        <Box className="absolute inset-0 overflow-hidden rounded-lg z-0">
          <Image src={data.img} alt={data.name} layout="fill" objectFit="cover" className="object-cover" />
        </Box>
         { !isClicked && <Typography
          className="absolute inset-0 flex justify-center items-center text-white text-8xl z-10"
        >
          {data.name}
        </Typography> }
        {isClicked && (
          <CardContent
            className="absolute  flex-col items-center justify-center inset-0 flex bg-black bg-opacity-50 text-white transition-opacity duration-300 z-20 "
          >
            <Box className="flex" >
              <Typography variant="h4" className="text-5xl font-bold mb-8 text-center">
                {data.name}
              </Typography>
              <Typography variant="h4" className="text-5xl  ms-5 font-bold mb-8 text-center">
                Coach <span className="text-blue-700">{data.coach}</span>
              </Typography>
              </Box>
            <Box className="">
              <Typography variant="h4" className="text-4xl font-bold mb-8 text-center text-blue-700">
                Entrainements
              </Typography>
              <Box className="flex flex-col gap-5 justify-center items-center flex-grow">
                {data.trainings ? (
                  data.trainings.map((training) => (
                    <Typography key={uuidv4()} className="text-center  text-xl ">
                      {training.day} {training.start} - {training.end} {training.gym}
                    </Typography>
                  ))
                ) : (
                  <Typography className="text-lg text-center mb-5">
                    Pas d&apos;entrainements prévus
                  </Typography>
                )}
              </Box>
            </Box>
          </CardContent>
        )}
      </CardActionArea>
    </Card>
  );
};


export default function Index({ data }: Readonly<{ data: NewsType | CoachType | LeaderType | TeamType }>) {
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
