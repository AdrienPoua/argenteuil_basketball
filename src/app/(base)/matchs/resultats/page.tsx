"use client";
import { useState, useEffect, useCallback } from "react";
import { Box, Button, Container } from "@mui/material";
import { Ranking } from "@/utils/models";
import { ClubType, ClubTeam, CompetitionType } from "@/utils/types";
import Table from "./table";
import { v4 as uuidv4 } from "uuid";
import H1 from "@/components/H1";
import Info from "@/components/Info";
import { MainSection } from "@/utils/layouts";

export default function Index() {
  const [clubData, setClubData] = useState<ClubType | undefined>(undefined);
  const [selectedTeam, setSelectedTeam] = useState<string | undefined>(undefined);
  const [ranking, setRanking] = useState<Ranking | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async <T,>(endpoint: string): Promise<T> => {
    try {
      const res = await fetch(endpoint);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
      throw error;
    }
  }, []);

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const data = await fetchData<ClubType>("/api/club");
        setClubData(data);
        const seniors = data.teams.find((team: { shortName: string; }) => team.shortName === "SENIOR M1");
        if (seniors) {
          setSelectedTeam(seniors.competitions[0].id.toString());
        }
      } catch (error) {
        console.error("Error fetching club data:", error);
      }
    };
    fetchClubData();
  }, [fetchData]);

  useEffect(() => {
    if (selectedTeam) {
      const fetchRanking = async () => {
        try {
          const rankingData = await fetchData<CompetitionType>(`/api/ranking/${selectedTeam}`);
          setRanking(new Ranking(rankingData));
        } catch (error) {
          console.error("Error fetching ranking data:", error);
        }
      };
      fetchRanking();
    }
  }, [selectedTeam, fetchData]);

  return (
    <>
      <H1> classement </H1>
      <MainSection>
        {error ? (
          <Info content="Les données ne sont pas disponibles, revenez plus tard !" />
        ) : (
          <Container
            maxWidth="xl"
            disableGutters
            aria-label="Basic button group"
            className="flex-wrap flex w-full">
            <Box >
              {clubData?.teams.map((team: ClubTeam) => {
                const id = team.competitions[0].id.toString();
                return (
                  <Button
                    size="large"
                    key={uuidv4()}
                    className="grow"
                    id={id}
                    variant={selectedTeam === id ? "contained" : "outlined"}
                    onClick={() => setSelectedTeam(id)}>
                    {team.shortName}
                  </Button>
                );
              })}
              {ranking && <Table data={ranking} />}
            </Box>
          </Container>
        )}
      </MainSection>
    </>
  );
}