import { Grid, Paper, Typography, Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { TrainingType } from "@/types";
import { Gym } from "@/models";
import { gyms } from "@/build";
import Layout from "@/layout/main";



const Schedule = ({ data }: { data : Gym } ) => {
  return (
    <Box className="flex flex-col border bg-primary p-4 mb-48">
      <Typography
        variant="h2"
        color="white"
        className="text-5xl text-center pb-4">
        {data.name}
      </Typography>
      <Grid
        container
        spacing={2}>
        {data.available.map((day) => (
          <Grid
            item
            xs={12}
            key={uuidv4()}>
            <Grid
              container
              spacing={2}>
              <Grid
                item
                xs={3}>
                <Paper className="h-full flex justify-center items-center">
                  <Typography
                    variant="h6"
                    className="p-2">
                    {day}
                  </Typography>
                </Paper>
              </Grid>
              <Grid
                item
                xs={9}>
                <Grid
                  container
                  spacing={2}>
                  {data.slots
                    .filter((slot) => slot.day === day)
                    .map((slot: TrainingType) => (
                      <Grid
                        item
                        xs={4}
                        key={uuidv4()}>
                        <Box className="p-4 bg-blue-500 text-white rounded shadow-md">
                          <Typography
                            variant="body1"
                            className="font-semibold">
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
        <Grid
          item
          xs={12}>
          <Paper className="h-full flex justify-center items-center">
            <Typography
              variant="h6"
              className="p-2">
              {data.address}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default function Page() {
  return (
    <Layout pageTitle="planning">
      {gyms.map((gym) => (
        <Schedule
          data={gym}
          key={uuidv4()}
        />
      ))}
    </Layout>
  );
}
