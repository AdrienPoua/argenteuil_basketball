"use client";
import { Grid, Paper, Typography, Box, useMediaQuery } from "@mui/material";
import { TrainingType } from "@/utils/types";
import { Gym } from "@/utils/models";
import { gyms } from "@/utils/services/dataProcessing";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import useVisibility from "@/utils/hooks/useVisibility";
import { useRef } from "react";
import H1 from "@/components/H1";
import { MainSection } from "@/utils/layouts";

interface ScheduleProps {
  data: Gym;
}
interface SlotProps {
  slot: TrainingType;
}

interface ScheduleDayProps {
  day: string;
  slots: TrainingType[];
}

const ScheduleSlot = ({ slot }: SlotProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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

const ScheduleDay = ({ day, slots }: ScheduleDayProps) => (
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

const Schedule = ({ data }: ScheduleProps) => {
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
      <Box className="flex flex-col border bg-primary p-2">
        <Typography variant="h2" color="white" className="text-5xl text-center pb-2">
          {data.name}
        </Typography>
        <Grid container spacing={1}>
          {data.available.map((day) => {
            const slotsForDay = data.slots.filter((slot) => slot.day === day);
            return <ScheduleDay key={day} day={day} slots={slotsForDay} />;
          })}
          <Grid item xs={12}>
            <Paper className="h-full flex justify-center items-center">
              <Typography className="p-2 text-black text-base lg:text-lg text-center">
                {data.address} {data.zipcode}
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
        <Box className="flex flex-col gap-10">
          {gyms.map((gym) => (
            <Schedule key={gym.id} data={gym} />
          ))}
        </Box>
      </MainSection>
    </>
  );
}
