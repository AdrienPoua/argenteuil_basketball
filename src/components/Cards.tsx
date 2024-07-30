"use client";
import { v4 as uuidv4 } from "uuid";
import { SanityDocument } from "next-sanity";
import { useState, MouseEvent, useRef, ReactElement } from "react";
import Link from "next/link";
import { Utils, Team, Leadership, Gym } from "@/utils/models";
import { Card, CardActionArea, CardContent, Typography, Box, CardMedia, useTheme, useMediaQuery } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { PhoneIphone } from "@mui/icons-material";
import { ContactButton } from "@/components/Buttons";
import { urlFor } from "@/lib/sanity/image";
import { motion } from "framer-motion";
import useVisibility from "@/utils/hooks/useVisibility";
import { TrainingType } from "@/utils/types";


export const PostCard = ({ small, sticky, post }: { small?: boolean; sticky?: boolean, post: SanityDocument }): ReactElement => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { Image, title, publishedAt: date, slug } = post;

  const formatedDate = Utils.formatDate(new Date(date), { month: "long", day: "numeric", year: "numeric" });
  const cardRef = useRef(null);
  const isVisible = useVisibility(cardRef);
  const animation = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" }, duration: 0.1 },
  }
  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      whileHover="hover"
      variants={animation}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className={`${sticky ? "sticky top-0" : ""}   rounded-3xl w-full`}>
        <Link
          href={`/actualites/${slug.current}`}
          className="relative">
          <Box className="relative grow overflow-hidden">
            <CardMedia
              component="img"
              image={urlFor(Image).url()}
              className={` group-hover:scale-110 duration-300 ${small || isMobile ? "h-[400px]" : "h-[800px]"}`}
            />
            <Box className="absolute inset-0 bg-black bg-opacity-50" />
          </Box>
          <CardContent className="mb-5">
            <Typography
              variant="h2"
              className="text-black text-xl">
              {title}
            </Typography>
            <Typography variant="body2">{formatedDate}</Typography>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
};



export const LeaderCard = ({ data }: { data: Leadership }): ReactElement => {
  const cardRef = useRef(null);
  const isVisible = useVisibility(cardRef);
  const animation = {
    hidden: { filter: 'blur(10px)', opacity: 0, y: 50 },
    visible: { filter: 'blur(0px)', opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={animation}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Card className="flex flex-col max-h-[500px] aspect-square rounded-3xl overflow-hidden" sx={{ bgcolor: 'transparent' }}>
        <Box className="flex overflow-hidden grow rounded-b-3xl">
          <CardMedia
            component="img"
            image={data.img}
            className="object-cover object-top group-hover:brightness-125 transition-transform duration-300"
            alt={data.name}
          />
        </Box>
        <CardContent className="flex p-0 pb-0 bg-primary max-h-24 rounded-3xl overflow-hidden">
          <Box className="flex justify-center items-center gap-2 grow relative">
            <Box className="p-5 md:p-3 flex flex-col items-center w-full gap-1">
              <Typography variant="h3" className="text-xs md:text-xl text-black">
                {data.name}
              </Typography>
              <Typography className="text-center text-xs md:text-base">
                {data.isLeader ? data.job : data.teams?.join(' | ')}
              </Typography>
            </Box>
            <Box className="flex h-full">
              <ContactButton icon={<EmailIcon />} text={data.email} available={data.isEmailDisplayed} />
              <ContactButton icon={<PhoneIphone />} text={data.number} available={data.isNumberDisplayed} />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};


export const TeamCard = ({ data }: { data: Team }): ReactElement => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const cardRef = useRef(null);
  const isVisible = useVisibility(cardRef);
  const animation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }
  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={animation}
      transition={{ duration: 0.5 }}
      className="w-full h-[300px] md:h-[600px] relative overflow-hidden rounded-lg shadow-lg transition-transform duration-150 ease-in-out transform hover:scale-105"
    >
      <Card
        onClick={handleClick}
        className="size-full">
        <CardActionArea className="size-full ">
          <Box className="absolute inset-0 ">
            <CardMedia
              component="img"
              image={data.img}
              className="object-cover size-full"
              alt={"Les membres de l'équipe" + data.name}
            />
          </Box>
          <Box
            className={`absolute inset-0 flex bg-black ${!isClicked ? "bg-opacity-10" : "bg-opacity-75"} transition-opacity duration-300 z-10 `}></Box>
          <CardContent className="flex flex-col items-center justify-around z-40 size-full py-16">
            {!isClicked ? (
              <Typography variant="h3" className="text-white z-40 text-2xl md:text-5xl  text-center self-center text-nowrap ">{data.name}</Typography>
            ) : (
              <Box className="flex flex-col grow z-40 size-full">
                <Typography className=" text-3xl lg:text-4xl text-center text-white justify-self-start">{data.name}</Typography>
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
                        data.trainings.map((training: TrainingType) => (
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
    </motion.div >
  );
};


export const GymCard = ({ data }: { data: Gym }): ReactElement => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    setIsClicked(!isClicked);
  };
  const cardRef = useRef(null);
  const isVisible = useVisibility(cardRef);
  const animation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      whileHover="hover"
      variants={animation}
      transition={{ duration: 0.5 }}
    >
      <Card
        onClick={handleClick}
        className="relative overflow-hidden w-full h-72 lg:h-[600px] rounded-lg shadow-lg transition-transform duration-150 ease-in-out transform hover:scale-105">
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
    </motion.div>
  );
};
