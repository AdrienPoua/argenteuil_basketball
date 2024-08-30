"use client";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { Gym } from "@/utils/models";
import { gyms } from "@/utils/services/dataProcessing";
import { motion } from "framer-motion";
import useVisibility from "@/utils/hooks/useVisibility";
import { useRef } from "react";
import H1 from "@/components/H1";
import { MainSection } from "@/utils/layouts";
import useIsMobile from "@/utils/hooks/useIsMobile";
import Instructions from "@/components/Instructions";



const ScheduleSlot = ({ slot }: {
  slot: {
    team?: string;
    day: string;
    start: string;
    end: string;
    gym: string;
  }
}) => {
  const isMobile = useIsMobile();
  const firstTeam = slot.team?.split("-")[0];
  const secondTeam = slot.team?.split("-")[1];
  return (
    <Grid item xs={4}>
      <Box component={Paper} className="p-2  rounded shadow-md h-full">
        <Typography className="text-primary text-xs md:text-base text-center ">{!isMobile ? slot.team : firstTeam}<br />{isMobile && secondTeam}</Typography>
        <Typography className="text-black text-xs md:text-base text-center">
          {slot.start} {!isMobile ? "-" : <br />} {slot.end}
        </Typography>
      </Box>
    </Grid>
  );
};

const ScheduleDay = ({ day, slots }: {
  day: string, slots: {
    team?: string;
    day: string;
    start: string;
    end: string;
    gym: string;
  }[]
}) => (
  <Grid item xs={12}>
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <Paper className="h-full flex justify-center items-center">
          <Typography className="text-black text-xs md:text-lg">
            {day}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <Grid container spacing={1}>
          {slots.map((slot) => (
            <ScheduleSlot key={slot.day + slot.start + slot.end + slot.gym} slot={slot} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

const Schedule = ({ data: gym }: { data: Gym }) => {
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
      variants={animation}
      transition={{ duration: 0.5 }}
    >
      <Box className="flex flex-col border bg-primary p-2">
        <Typography variant="h2" color="white" className="text-5xl text-center pb-2">
          {gym.name}
        </Typography>
        <Grid container spacing={1}>
          {gym.available.map((day) => {
            const slotsForDay = gym.slots.filter((slot) => slot.day === day);
            return <ScheduleDay key={day} day={day} slots={slotsForDay} />;
          })}
          <Grid item xs={12}>
            <Paper className="h-full flex justify-center items-center">
              <Typography className="p-2 text-black text-base lg:text-lg text-center">
                {gym.address} {gym.zipcode}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};


export default function SchedulePage() {
  return (
    <>
      <H1>Plannings</H1>
      <MainSection>
        <Instructions >
          <Box className="flex ">
            <Typography className="grow">
              U07 = 5/6 ans <br />
              U09 = 7/8 ans <br />
              U11 = 9/10 ans <br />
              U13 = 11/12 ans <br />
              U15 = 13/14 ans <br />
              U17 = 15/16 ans <br />
            </Typography>
            <Typography className="grow">
              &quot;F&quot; est une séction féminine <br />
              &quot;M&quot; est une séction masculine <br />
            </Typography>
          </Box>
          <Typography>
            Si je suis une fille née le 31 décembre 2010, je suis en U15F car j&apos;aurai 15 ans sur l&apos;année en cours
          </Typography>
        </Instructions>
        <Box className="flex flex-col gap-10">
          {gyms.map((gym) => (
            <Schedule key={gym.id} data={gym} />
          ))}
        </Box>
      </MainSection>
    </>
  );
}
