import { Grid, Paper, Typography, Box } from "@mui/material";
import { TrainingType } from "@/types";
import { Gym } from "@/models";
import { gyms } from "@/services/dataProcessing";
import Layout from "@/layout/main";

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

const ScheduleSlot = ({ slot }: SlotProps) => (
  <Grid item xs={4}>
    <Box className="p-4 bg-blue-500 text-white rounded shadow-md">
      <Typography variant="body1">{slot.team}</Typography>
      <Typography variant="body2">
        {slot.start} - {slot.end}
      </Typography>
    </Box>
  </Grid>
);

const ScheduleDay = ({ day, slots }: ScheduleDayProps ) => (
  <Grid item xs={12}>
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Paper className="h-full flex justify-center items-center">
          <Typography variant="h6" className="p-2">
            {day}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <Grid container spacing={2}>
          {slots.map((slot) => (
            <ScheduleSlot key={slot.day + slot.start + slot.end + slot.gym} slot={slot} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

const Schedule = ({ data }: ScheduleProps) => (
  <Box className="flex flex-col border bg-primary p-4 mb-48">
    <Typography variant="h2" color="white" className="text-5xl text-center pb-4">
      {data.name}
    </Typography>
    <Grid container spacing={2}>
      {data.available.map((day) => {
        const slotsForDay = data.slots.filter((slot) => slot.day === day);
        return <ScheduleDay key={day} day={day} slots={slotsForDay} />;
      })}
      <Grid item xs={12}>
        <Paper className="h-full flex justify-center items-center">
          <Typography variant="h6" className="p-2">
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
      {gyms.map((gym) => (
        <Schedule key={gym.id} data={gym} />
      ))}
    </Layout>
  );
}
