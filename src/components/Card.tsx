"use client";
import { v4 as uuidv4 } from "uuid";
import { useState, useRef, MouseEvent } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import Image from "next/image";
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
    <Card className={`${sticky ? "sticky top-0" : ""}  rounded-3xl`}>
      <Link
        href={url}
        className="relative">
        <Box className="relative grow">
          <CardMedia
            component="img"
            image={img}
            alt={title}
            className={`${small || isMobile ? "h-card" : "h-bigCard"}`}
          />
          <Box className="absolute inset-0 bg-black bg-opacity-50" />
        </Box>
        <CardContent className="mb-5">
          <Typography variant="h6">{title}</Typography>
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
      />
      <CardContent className="flex p-0 pb-0 bg-primary max-h-24 ">
        <Box className="flex justify-center items-center gap-2 grow relative">
          <Box className=" px-5 py-2 flex flex-col items-center w-full rounded-md ">
            {" "}
            <Typography className="text-xs md:text-base text-black text-nowrap">{data.name}</Typography>
            <Typography
              className="text-center text-xs md:text-base">
              {data.isLeader ? data.job : data.teams?.join(" | ")}
            </Typography>
          </Box>
          <Box
            className="flex h-full"
            >
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
                      Division {data.division ? data.division : "départementale"}
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

// Réglez le problème avec les icônes Leaflet

export const GymCard = ({ data }: { data: Gym }) => {
  const [isClicked, setIsClicked] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const center = [data.lat, data.lng];
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (mapRef.current?.contains(e.target as Node)) {
      return;
    }
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
        <Box
          className="absolute bottom-4 right-4 w-48 h-48 z-30"
          ref={mapRef}>
          <MapContainer
            center={center}
            zoom={14}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%", borderRadius: "8px" }}
            attributionControl={false}
            className={`z-30`}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={center}>
              <Popup>{data.name}</Popup>
            </Marker>
          </MapContainer>
        </Box>
      </CardActionArea>
    </Card>
  );
};
