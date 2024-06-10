"use client";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Utils, Team, Leadership, Gym, News } from "@/models";

import { Card, CardActionArea, CardContent, Typography, Box, CardMedia, Button, List } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { PhoneIphone } from "@mui/icons-material";

type NewsCardProps = { data: News; small?: boolean; sticky: boolean };
export const NewsCard = ({ data, small, sticky }: NewsCardProps) => {
  const { img, title, url, date } = data;
  return (
    <Card className={`${sticky ? "sticky top-0" : ""}  rounded-3xl`}>
      <Link
        href={url}
        className="relative">
        <Box className="relative grow">
          <CardMedia
            component="img"
            image={img}
            alt={title}
            className={`${small ? "h-card" : "h-bigCard"}`}
          />
          <Box className="absolute inset-0 bg-black bg-opacity-50" />
        </Box>
        <CardContent className="t">
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2">{Utils.dateString(date)}</Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export const LeaderCard = ({ data }: { data: Leadership }) => {
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

  return (
    <Card className="relative w-card h-card rounded-lg overflow-hidden inline-block ">
      <CardMedia
        component="img"
        image={data.img}
        className="w-full h-full absolute inset-0"
      />
      <Box className="absolute left-0 bottom-0 w-52 h-28 bg-white opacity-90 transform -skew-x-12 ">
        <Box className="absolute w-56 h-24 bg-primary flex flex-col justify-center items-center">
          {" "}
          <Typography
            variant="h6"
            className="text-black transform skew-x-12">
            {data.name}
          </Typography>
          <Typography
            component="h2"
            className="text-center">
            {data.job ? data.job : data.teams ? data.teams.join(" | ") : ""}
          </Typography>
        </Box>
      </Box>
      <List className="absolute flex gap-2 bottom-6 left-60">
        <Button
          component="li"
          variant="contained"
          disabled={!data.isNumberDisplayed}
          onClick={() => handleClick(data.number)}
          color="secondary"
          className="flex items-center justify-center w-16 aspect-square  rounded-full hover:scale-125 transition duration-200 ease-in-out">
          <PhoneIphone className="relative" />
        </Button>
        <Button
          component="li"
          variant="contained"
          disabled={!data.isEmailDisplayed}
          onClick={() => handleClick(data.email)}
          color="secondary"
          className="flex items-center justify-center w-16 aspect-square  rounded-full hover:scale-125 transition duration-200 ease-in-out">
          <EmailIcon />
        </Button>
      </List>
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
      className="relative overflow-hidden w-full h-[700px] rounded-lg shadow-lg transition-transform duration-150 ease-in-out transform hover:scale-105">
      <CardActionArea className="h-full">
        <Box className="absolute inset-0 overflow-hidden rounded-lg z-0">
          <Image
            src={data.img}
            alt={data.name}
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </Box>
        <CardContent
          className={`absolute flex-col justify-center inset-0 flex bg-black ${
            !isClicked ? "bg-opacity-0" : "bg-opacity-75"
          } text-white transition-opacity duration-300 z-20`}>
          {!isClicked ? (
            <Typography className="absolute inset-0 flex justify-center items-center text-white text-8xl z-10">{data.name}</Typography>
          ) : (
            <>
              <Typography
                variant="h4"
                className=" absolute top-14 left-1/2 transform -translate-x-1/2 text-6xl font-bold mb-8 text-center">
                {data.name}
              </Typography>
              <Box className="flex grow items-center justify-around">
                <Box className="flex flex-col gap-5 grow">
                  {data.coach && (
                    <Typography
                      variant="h4"
                      className="text-5xl  ms-5 font-bold mb-8 text-center">
                      Coach <span className="text-primary">{data.coach}</span>
                    </Typography>
                  )}
                  {data.isChampionship ? (
                    <Typography
                      variant="h4"
                      className="text-4xl font-bold mb-8 text-center">
                      Division {data.division}
                    </Typography>
                  ) : (
                    <Typography
                      variant="h4"
                      className="text-4xl font-bold mb-8 text-center">
                      Equipe hors championnat
                    </Typography>
                  )}
                </Box>
                <Box className="grow">
                  <Typography
                    variant="h4"
                    className="text-4xl font-bold mb-8 text-center text-primary">
                    Entrainements
                  </Typography>
                  <Box className="flex flex-col gap-5 justify-center items-center flex-grow">
                    {data.trainings ? (
                      data.trainings.map((training) => (
                        <Typography
                          key={uuidv4()}
                          className="text-center  text-xl ">
                          {training.day} {training.start} - {training.end} {training.gym}
                        </Typography>
                      ))
                    ) : (
                      <Typography className="text-lg text-center mb-5">Pas d&apos;entrainements prévus</Typography>
                    )}
                  </Box>
                </Box>
                {data.isTeamImage && (
                  <Typography
                    variant="h4"
                    className="text-4xl font-bold absolute bottom-28">
                    En attente de la photo de l&apos;équipe
                  </Typography>
                )}
              </Box>
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export const GymCard = ({ data }: { data: Gym }) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <Card
      onClick={handleClick}
      className="relative overflow-hidden w-full h-[700px] rounded-lg shadow-lg transition-transform duration-150 ease-in-out transform hover:scale-105">
      <CardActionArea className="h-full">
        <Box className="absolute inset-0 overflow-hidden rounded-lg z-0">
          <Image
            src={data.img}
            alt={data.name}
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </Box>
        <Box className={`absolute inset-0 flex bg-black ${isClicked ? "opacity-50" : "opacity-0"} transition-opacity duration-300 z-20`}></Box>
        <CardContent className="absolute flex-col items-center justify-center inset-0 flex text-white transition-opacity duration-1000 z-20">
          {!isClicked ? (
            <Box className="flex">
              <Typography
                variant="h4"
                className="text-5xl font-bold mb-8 text-center">
                {data.name}
              </Typography>
            </Box>
          ) : (
            <Box className="flex flex-col">
              <Typography
                variant="h4"
                className="text-5xl font-bold mb-8 text-center">
                {data.address}
              </Typography>
              <Typography
                variant="h4"
                className="text-5xl font-bold mb-8 text-center">
                {data.city}
              </Typography>
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
