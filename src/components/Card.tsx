"use client";
import { v4 as uuidv4 } from "uuid";
import { useState, MouseEvent } from "react";
import Link from "next/link";
import { Utils, Team, Leadership, Gym, News } from "@/models";
import { Card, CardActionArea, CardContent, Typography, Box, CardMedia, useTheme, useMediaQuery } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { PhoneIphone } from "@mui/icons-material";
import { ContactButton } from "@/components/Buttons";

type NewsCardProps = { data: News; small?: boolean; sticky?: boolean };
export const NewsCard = ({ data, small, sticky }: NewsCardProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { img, title, url, date } = data;
  const formatedDate = Utils.formatDate(date, { month: "long", day: "numeric", year: "numeric" });
  return (
    <Card className={`${sticky ? "sticky top-0" : ""}  rounded-3xl w-full`}>
      <Link
        href={url}
        className="relative">
        <Box className="relative grow">
          <CardMedia
            component="img"
            image={img}
            alt={title}
            className={`${small || isMobile ? "h-[400px]" : "h-[800px]"}`}
          />
          <Box className="absolute inset-0 bg-black bg-opacity-50" />
        </Box>
        <CardContent className="mb-5">
          <Typography
            component="h3"
            className="text-black">
            {title}
          </Typography>
          <Typography variant="body2">{formatedDate}</Typography>
        </CardContent>
      </Link>
    </Card>
  );
};
export const LeaderCard = ({ data }: { data: Leadership }) => {
  return (
    <Card className="flex flex-col size-card rounded-lg overflow-hidden ">
      <CardMedia
        component="img"
        image={data.img}
        className=" object-cover grow overflow-hidden object-top	"
        alt={data.name}
      />
      <CardContent className="flex p-0 pb-0 bg-primary max-h-24 ">
        <Box className="flex justify-center items-center gap-2 grow relative ">
          <Box className=" p-5 md:p-3 flex flex-col items-center w-full rounded-md gap-1 ">
            {" "}
            <Typography className="text-xs md:text-base text-black text-nowrap">{data.name}</Typography>
            <Typography className="text-center text-xs md:text-base">{data.isLeader ? data.job : data.teams?.join(" | ")}</Typography>
          </Box>
          <Box className="flex h-full">
            <ContactButton
              icon={<EmailIcon />}
              text={data.email}
              available={data.isEmailDisplayed}
            />
            <ContactButton
              icon={<PhoneIphone />}
              text={data.number}
              available={data.isNumberDisplayed}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export const TeamCard = ({ data }: { data: Team }) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      onClick={handleClick}
      className="relative overflow-hidden w-full h-[400px] md:h-[600px] rounded-lg shadow-lg transition-transform duration-150 ease-in-out transform hover:scale-105">
      <CardActionArea className="size-full overflow-hidden">
        <Box className="absolute inset-0 ">
          <CardMedia
            component="img"
            image={data.img}
            className="object-cover size-full"
            alt={"Les membres de l'équipe" + data.name }
          />
        </Box>
        <Box
          className={`absolute inset-0 flex bg-black ${!isClicked ? "bg-opacity-10" : "bg-opacity-75"} transition-opacity duration-300 z-10 `}></Box>
        <CardContent className="flex flex-col items-center justify-around z-40 size-full py-16">
          {!isClicked ? (
            <Typography variant="h3" className="text-white z-40  text-center self-center ">{data.name}</Typography>
          ) : (
            <Box className="flex flex-col grow z-40 size-full">
              <Typography className=" text-2xl lg:text-4xl text-center text-white justify-self-start">{data.name}</Typography>
              <Box className="flex grow justify-between">
                <Box className="flex flex-col gap-5 justify-center grow basis-1/2">
                  {data.coach && (
                    <Typography className="md:text-lg lg:text-3xl mb-8 text-center">
                      Coach{" "}
                      <Box
                        component="span"
                        className="text-primary">
                        {data.coach}
                      </Box>
                    </Typography>
                  )}
                  {data.isChampionship ? (
                    <Typography className="md:text-lg lg:text-3xl mb-8 text-center">
                      Division {data.division ? data.division : "départementale"}
                    </Typography>
                  ) : (
                    <Typography className="md:text-lg lg:text-3xl mb-8 text-center">Equipe hors championnat</Typography>
                  )}
                </Box>
                <Box className="flex flex-col gap-5 justify-center grow basis-1/2">
                  <Typography className="text-base md:text-lg lg:text-3xl text-center text-primary first-letter:">Entrainements</Typography>
                  <Box className="flex flex-col gap-5 justify-center items-center   ">
                    {data.trainings ? (
                      data.trainings.map((training) => (
                        <Typography
                          key={uuidv4()}
                          className="text-center  text-xs md:text-lg lg:text-3xl ">
                          {training.day} {training.start} - {training.end} {isMobile && <br />} {training.gym}
                        </Typography>
                      ))
                    ) : (
                      <Typography className="text-base md:text-lg lg:text-3xl text-center mb-5">Pas d&apos;entrainements prévus</Typography>
                    )}
                  </Box>
                </Box>
              </Box>
              {!data.isTeamImage && (
                <Typography className="text-base md:text-lg lg:text-3xl text-center">En attente de la photo de l&apos;équipe</Typography>
              )}
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

// Réglez le problème avec les icônes Leaflet

export const GymCard = ({ data }: { data: Gym }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    setIsClicked(!isClicked);
  };

  return (
    <Card
      onClick={handleClick}
      className="relative overflow-hidden w-full h-72 lg:h-[700px] rounded-lg shadow-lg transition-transform duration-150 ease-in-out transform hover:scale-105">
      <CardActionArea className="size-full">
        <Box className="absolute inset-0 overflow-hidden rounded-lg z-0">
          <CardMedia
            src={data.img}
            className="object-cover size-full"
            component="img"
          />
        </Box>
        <Box className={`absolute inset-0 flex bg-black ${isClicked ? "opacity-50" : "opacity-0"} transition-opacity duration-300 z-20`}></Box>
        <CardContent className="absolute flex-col items-center justify-center inset-0 flex text-white transition-opacity duration-1000 z-20">
          {!isClicked ? (
            <Typography variant="h2" className="text-3xl lg:text-5xl text-center bg-black bg-opacity-60 w-full">{data.name}</Typography>
          ) : (
            <Box className="flex flex-col">
              <Typography className="text-xl md:text-3xl lg:text-5xl text-center">{data.address}</Typography>
              <Typography className="text-xl md:text-3xl lg:text-5xl text-center">{data.city}</Typography>
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
