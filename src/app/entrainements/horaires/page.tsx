import { Grid, Paper, Typography, Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { TeamType } from "@/types";
import club from "@/data/club.json";
import { Gym, Team } from "@/models";
import teamsData from "@/data/teams.json";
import Layout from "@/layout/main";

const initializeData = () => {
  const gymnases = club.gymnases.map((gym) => new Gym(gym));
  const teams: TeamType[] = teamsData.map((team) => new Team(team));
  const slotsByGym = gymnases.map((gym) => gym.planning(teams));
  return slotsByGym;
};

type ScheduleProps = {
  data: any;
  days: string[];
};

const Schedule = ({ data, days }: ScheduleProps) => {
  console.log(data);
  return (
    <Box className="flex flex-col border bg-primary p-4 mb-48">
        <Typography variant="h2" color="white" className="text-5xl text-center my-10">
          {data[0].gym}
        </Typography>
        <Grid container spacing={2}>
          {days.map((day) => (
            <Grid item xs={12} key={uuidv4()}>
              <Grid container spacing={2} >
                <Grid item xs={3} >
                  <Paper className="h-full flex justify-center items-center">
                    <Typography variant="h6" className="p-2">
                      {day}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={9}>
                  <Grid container spacing={2}>
                    {data
                      .filter((slot: any) => slot.day === day)
                      .map((slot: any) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={uuidv4()}>
                          <Box className="p-4 bg-blue-500 text-white rounded shadow-md">
                            <Typography variant="body1" className="font-semibold">
                              {slot.team}
                            </Typography>
                            <Typography variant="body2">
                              {slot.start} - {slot.end}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Paper className="h-full flex justify-center items-center">
              <Typography variant="h6" className="p-2">
                {data[0].gym}
              </Typography>
            </Paper>
            </Grid>
        </Grid>
    </Box>
  );
};

export default function Page() {
  const slotsByGym = initializeData();
  return (
    <Layout pageTitle='planning'>
      <Schedule data={slotsByGym[0]} days={["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]} />
      <Schedule data={slotsByGym[1]} days={["Lundi", "Mercredi", "Jeudi", "Vendredi"]} />
    </Layout>
  );
}
