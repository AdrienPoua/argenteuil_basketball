"use client";
import { Box, Button } from "@mui/material";
import Table from "./table";
import H1 from "@/components/H1";
import { MainSection } from "@/utils/layouts";
import Feedback from "@/components/FetchFeedback";
import useScorenco from "@/utils/hooks/scorenco/useScorenco";

export default function Index() {
  const { clubs, loadingClubs, errorClubs, ranking, selectedTeam, setSelectedTeam } = useScorenco();
  return (
    <>
      <H1> classement </H1>
      <MainSection>
        <Feedback
          data={clubs}
          isLoading={loadingClubs}
          error={errorClubs}
        >
          <Box
            className="flex flex-col ">
            <Box className="flex overflow-x-auto">
              {clubs?.teams.map((team: { competitions: { id: string }[]; shortName: string }) => {
                const id = team.competitions[0].id.toString();
                return (
                  <Button
                    key={team.shortName}
                    className="grow flex-wrap"
                    variant={selectedTeam === id ? "contained" : "outlined"}
                    onClick={() => setSelectedTeam(id)}>
                    {team.shortName}
                  </Button>
                );
              })}
            </Box>
            <Box className="w-full">
              {ranking && <Table ranking={ranking} />}
            </Box>
          </Box>
        </Feedback>
      </MainSection >
    </>
  );
}