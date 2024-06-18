"use client";
import { Grid, Paper, Typography, Box, useMediaQuery } from "@mui/material";
import { TrainingType } from "@/types";
import { Gym } from "@/models";
import { gyms } from "@/services/dataProcessing";
import Layout from "@/layout/main";
import { useTheme } from "@mui/material/styles";

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
          {slot.start} {!isMobile ? "-" : <br/>} {slot.end}
        </Typography>
      </Box>
    </Grid>
  );
};

const ScheduleDay = ({ day, slots }: ScheduleDayProps ) => (
  <Grid item xs={12}>
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <Paper className="h-full flex justify-center items-center">
          <Typography  className="text-black text-xs md:text-lg">
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

const Schedule = ({ data }: ScheduleProps) => (
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
          <Typography  className="p-2 text-black text-base lg:text-lg text-center ">
            {data.address} {data.postalCode}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

export default function SchedulePage() {
  return (
    <Layout pageTitle="Planning">
      <Box className="flex flex-col items-center gap-10">
      {gyms.map((gym) => (
        <Schedule key={gym.id} data={gym} />
      ))}
      </Box>
    </Layout>
  );
}
