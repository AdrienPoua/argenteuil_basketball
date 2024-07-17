"use client";
import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { Ranking } from "@/utils/models";
import { ClubTeam } from "@/utils/types";
import Table from "./table";
import H1 from "@/components/H1";
import Info from "@/components/Info";
import { MainSection } from "@/utils/layouts";
import { useQuery } from "react-query";
import { getClubDataFromApi, getRankingDataFromApi } from "@/utils/serverActions";

export default function Index() {
  const [selectedTeam, setSelectedTeam] = useState<string | undefined>(undefined);
  const [ranking, setRanking] = useState<Ranking | undefined>(undefined);

  const { data: clubData, isError: isClubDataFetchError } = useQuery(["clubData"], () => getClubDataFromApi());
  const { data: rankingData, isError: isClubRankingFetchError } = useQuery(
    ["rankingData", selectedTeam],
    () => getRankingDataFromApi(selectedTeam),
    { enabled: !!selectedTeam } // La requête ne s'exécutera que si selectedTeam est défini
  );

  useEffect(() => {
    if (clubData) {
      const seniorTeam = clubData.teams[0].competitions[0].id.toString();
      setSelectedTeam(seniorTeam);
    }
  }, [clubData]);

  useEffect(() => {
    if (rankingData) {
      setRanking(new Ranking(rankingData));
    }
  }, [rankingData]);

  return (
    <>
      <H1> classement </H1>
      <MainSection>
        {isClubDataFetchError || isClubRankingFetchError ? (
          <Info content="Les données ne sont pas disponibles, revenez plus tard !" />
        ) : (
          <Box
            className="flex flex-col ">
            <Box className="flex overflow-x-auto">
              {clubData?.teams.map((team: ClubTeam) => {
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
              {ranking && <Table data={ranking} />}
            </Box>
          </Box>
        )}
      </MainSection >
    </>
  );
}