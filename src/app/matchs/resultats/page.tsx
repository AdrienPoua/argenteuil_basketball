"use client";
import { useState, useEffect, useCallback } from "react";
import { Box, Button, Container } from "@mui/material";
import { Ranking } from "@/models";
import { ClubType, ClubTeam, CompetitionType } from "@/types";
import Table from "./table";
import { v4 as uuidv4 } from "uuid";
import Layout from "@/layouts/main";
import Info from "@/components/Info";

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
        const seniors = data.teams.find((team) => team.shortName === "SENIOR M1");
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
    <Layout pageTitle="classement">
      <Box
        component="section"
        className="flex flex-col grow">
        {error && <Info content="Les données ne sont pas disponibles, revenez plus tard !" />}
        {!error && (
          <>
            <Container
              maxWidth="xl"
              disableGutters
              aria-label="Basic button group"
              className="flex-wrap flex w-full">
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
            </Container>
            {ranking && <Table data={ranking} />}
          </>
        )}
      </Box>
    </Layout>
  );
}