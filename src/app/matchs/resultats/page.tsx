"use client";
import { useState, useEffect, useCallback } from "react";
import { Box, Typography, Button, ButtonGroup, CircularProgress } from "@mui/material";
import { TeamType, Ranking, Club } from "@/models/api";
import Table from "./table";
import { v4 as uuidv4 } from "uuid";
import Layout from "@/components/layouts/main";
import Info from "@/components/info";



export default function Index() {
  const [clubData, setClubData] = useState<Club | undefined>(undefined);
  const [selectedTeam, setSelectedTeam] = useState<string | undefined>(undefined);
  const [ranking, setRanking] = useState<Ranking | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async <T,>(endpoint: string): Promise<T> => {
    try {
      setLoading(true);
      const res = await fetch(endpoint);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError("Error fetching data");
      console.error("Error fetching data:", error);
      throw error;
    }
  }, []);

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const data = await fetchData<Club>("/api/club");
        setClubData(data);
        // Set the default team to the first team in the first competition if available
        if (data.teams.length > 0 && data?.teams[0].competitions.length > 0) {
          setSelectedTeam(data?.teams[0].competitions[0].id.toString());
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
          const rankingData = await fetchData<Ranking>(`/api/ranking/${selectedTeam}`);
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
      <Box component='section' className='flex flex-col grow'>
        {error && <Info content="Les données ne sont pas disponibles, revenez plus tard !" />}
        {!error && (
          <>
            <ButtonGroup variant='contained' aria-label='Basic button group' className='flex-wrap flex'>
              {clubData?.teams.map((team: TeamType, index: number) => {
                const id = team.competitions[0].id.toString();
                return (
                  <Button
                    size='large'
                    key={uuidv4()}
                    className="grow"
                    id={id}
                    onClick={() => setSelectedTeam(id)}
                  >
                    {team.shortName}
                  </Button>
                );
              })}
            </ButtonGroup>
            {ranking && <Table data={ranking} />}
          </>
        )}
      </Box>
    </Layout>
  );
}