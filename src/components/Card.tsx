"use client";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import useCardHover from "@/hooks/useCardHover"; // Assurez-vous d'importer correctement vos hooks
import { Coach, NewsModel, Leader, Utils, Team } from "@/models";
import { NewsType } from "@/types";
import { Card, CardActionArea, CardContent, Typography, Box, CardMedia, Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { List, ListItem } from "@mui/material";
import { PhoneIphone } from "@mui/icons-material";

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

export const StaffCard = ({ data }: { data: Coach | Leader }) => {
  const [clicked, setClicked] = useState(false);

  const EMAIL_NOTIFICATION = "Email copié dans le press-papier";
  const NUMBER_NOTIFICATION = "Numéro copié dans le press-papier";

  const notify = (data: string) => {
    const message = data.includes("@") ? EMAIL_NOTIFICATION : NUMBER_NOTIFICATION;
    toast.success(message, {
      position: "bottom-center",
      duration: 5000,
    });
  };

  const handleClick = (data: string) => {
    if (!clicked) {
      navigator.clipboard.writeText(data);
      notify(data);
      setClicked(true);
    }
  };

  useEffect(() => {
    if (clicked) {
      const timer = setTimeout(() => setClicked(false), 500);
      return () => clearTimeout(timer);
    }
  }, [clicked]);

  console.log(data);
  return (
    <Card className='relative w-card h-card rounded-lg overflow-hidden m-2 bg-center bg-cover transition-transform duration-300 group'>
      <CardMedia component='img' image={data.img} className='w-full h-full' />
      <Box className='absolute left-0 bottom-0 w-52 h-28 bg-white opacity-90 transform -skew-x-12 z-10 '>
        <Box className='absolute w-56 h-24 bg-primary'>
          {" "}
          <Typography variant='h6' className='text-black transform skew-x-12 text-center mt-3'>
            {data.name}
          </Typography>
          <Typography component='h2' className='text-center'>
            {data instanceof Leader ? data.role :  data.team.join(" | ") }
          </Typography>
        </Box>
      </Box>

      <Box className='absolute bottom-[15%] left-1/2 w-56 h-56 bg-white rounded-full opacity-90 transform scale-0 transition-all duration-300 ease-in-out group-hover:scale-100'>
        <Box className='absolute  w-full h-full bg-primary rounded-full transform scale-0 transition-all duration-300 ease-in-out delay-200 group-hover:scale-90'>
          {" "}
          <List className='relative w-full h-full transform  transition-all duration-400 ease-in-out group-hover:pt-0'>
            <Button component="li" variant="contained" disabled={!data.isNumberDisplayed} onClick={() => handleClick(data.number)} color="secondary" className=' absolute flex items-center justify-center bottom-0 left-0 w-16 aspect-square   rounded-full '>
              <PhoneIphone className='relative' />
            </Button>
            <Button component="li" variant="contained" disabled={!data.isEmailDisplayed} onClick={() => handleClick(data.email)}  color="secondary"  className=' absolute flex items-center justify-center -bottom-8 left-16 w-16 aspect-square  rounded-full '>
              <EmailIcon />
            </Button>
          </List>
        </Box>
      </Box>
    </Card>
  );
};

export const TeamCard = ({ data }: { data: Team }) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <Card
      onClick={handleClick}
      className='relative overflow-hidden w-full h-[700px] rounded-lg shadow-lg transition-transform duration-150 ease-in-out transform hover:scale-105'
    >
      <CardActionArea className='h-full'>
        <Box className='absolute inset-0 overflow-hidden rounded-lg z-0'>
          <Image src={data.img} alt={data.name} layout='fill' objectFit='cover' className='object-cover' />
        </Box>
        {!isClicked && <Typography className='absolute inset-0 flex justify-center items-center text-white text-8xl z-10'>{data.name}</Typography>}
        {isClicked && (
          <CardContent className='absolute  flex-col items-center justify-center inset-0 flex bg-black bg-opacity-50 text-white transition-opacity duration-300 z-20 '>
            <Box className='flex'>
              <Typography variant='h4' className='text-5xl font-bold mb-8 text-center'>
                {data.name}
              </Typography>
              {data.coach && (
                <Typography variant='h4' className='text-5xl  ms-5 font-bold mb-8 text-center'>
                  Coach <span className='text-blue-700'>{data.coach}</span>
                </Typography>
              )}
            </Box>
            <Box className=''>
              <Typography variant='h4' className='text-4xl font-bold mb-8 text-center text-blue-700'>
                Entrainements
              </Typography>
              <Box className='flex flex-col gap-5 justify-center items-center flex-grow'>
                {data.trainings ? (
                  data.trainings.map((training) => (
                    <Typography key={uuidv4()} className='text-center  text-xl '>
                      {training.day} {training.start} - {training.end} {training.gym}
                    </Typography>
                  ))
                ) : (
                  <Typography className='text-lg text-center mb-5'>Pas d&apos;entrainements prévus</Typography>
                )}
              </Box>
            </Box>
            {data.isTeamImage && (
              <Typography variant='h4' className='text-4xl font-bold absolute bottom-28'>
                En attente de la photo de l&apos;équipe
              </Typography>
            )}
          </CardContent>
        )}
      </CardActionArea>
    </Card>
  );
};

export default function Index({ data }: Readonly<{ data: NewsType | Coach | Leader | Team }>) {
  if (data instanceof NewsModel && data.type) {
    return <BigNews data={data} />;
  } else if (data instanceof NewsModel) {
    return <SmallNews data={data} />;
  } else if (data instanceof Coach || data instanceof Leader) {
    return <StaffCard data={data} />;
  } else if (data instanceof Team) {
    return <TeamCard data={data} />;
  }
}
