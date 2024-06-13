"use client";
import { v4 as uuidv4 } from "uuid";
import { useState, useRef, MouseEvent } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import Image from "next/image";
import { Utils, Team, Leadership, Gym, News } from "@/models";
import { Card, CardActionArea, CardContent, Typography, Box, CardMedia, Button, List, useTheme, useMediaQuery } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { PhoneIphone } from "@mui/icons-material";

type NewsCardProps = { data: News; small?: boolean; sticky?: boolean };
export const NewsCard = ({ data, small, sticky }: NewsCardProps) => {
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
            className={`${small ? "h-card" : "h-bigCard"}`}
          />
          <Box className="absolute inset-0 bg-black bg-opacity-50" />
        </Box>
        <CardContent className="t">
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2">{formatedDate}</Typography>
          <Typography variant="body2">{formatedDate}</Typography>
        </CardContent>
      </Link>
    </Card>
  );
};
export const LeaderCard = ({ data }: { data: Leadership }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [clicked, setClicked] = useState(false);

  const handleClick = (text: string) => {
    if (isMobile && text.includes("@")) {
      window.location.href = `mailto:${text}`;
    } else if (isMobile) {
      window.location.href = `tel:${text}`;
    } else if (!isMobile && text.includes("@")) {
      window.location.href = `mailto:${text}`;
    } else {
      setClicked(!clicked);
    }
  };

  return (
    <Card className="relative w-card h-card rounded-lg overflow-hidden inline-block ">
      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
        message="Numéro copié dans le presse-papier"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        color="primary">
        <SnackbarContent
          className="bg-primary"
          message="Numéro copié dans le press papier"
        />
      </Snackbar>
      <CardMedia
        component="img"
        image={data.img}
        className="w-full h-full absolute inset-0"
      />
      <Box className="absolute bottom-8 min-w-52 px-5 py-2 bg-primary flex flex-col justify-center items-center">
        {" "}
        <Typography
          variant="h6"
          className="text-black  ">
          {data.name}
        </Typography>
        <Typography
          component="h2"
          className="text-center">
          {data.job ? data.job : data.teams ? data.teams.join(" | ") : ""}
        </Typography>
      </Box>
      <List className="absolute flex gap-5 bottom-8 left-60">
        <Button
          component="li"
          variant="contained"
          disabled={!data.isNumberDisplayed}
          onClick={() => handleClick(data.number)}
          color="secondary"
          className={`relative flex items-center justify-center ${
            clicked ? "w-36" : "rounded-full"
          } hover:scale-125 transition duration-200 ease-in-out`}>
          {!clicked && <PhoneIphone className="relative" />}
          <Typography
            className={`absolute transition-all duration-200 text-center ease-in-out ${
              clicked ? "w-full" : "max-w-0"
            } overflow-hidden tracking-wider`}>
            {isMobile ? data.number : Utils.formatPhoneNumber(data.number)}
          </Typography>
        </Button>
        <Button
          component="li"
          variant="contained"
          disabled={!data.isEmailDisplayed}
          onClick={() => handleClick(data.email)}
          color="secondary"
          className="flex items-center justify-center w-16 aspect-square rounded-full hover:scale-125 transition duration-200 ease-in-out">
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

// Réglez le problème avec les icônes Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export const GymCard = ({ data }: { data: Gym }) => {
  const [isClicked, setIsClicked] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const center = [data.lat, data.lng];

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
