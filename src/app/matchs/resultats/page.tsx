"use client";
import { useState, useEffect } from "react";
import { Box, Typography, Container, Button, ButtonGroup  } from "@mui/material";
import { TeamType, Ranking, Club } from "@/models/api";
import { v4 as uuidv4 } from "uuid";
import Table from "./table";

export default function Index() {
  const [clubData, setClubData] = useState<undefined | Club>(undefined);
  const [selectedTeam, setSelectedTeam] = useState<undefined | string>(undefined);
  const [ranking, setRanking] = useState<undefined | Ranking>(undefined);
  const fetchData = async <T,>(endpoint: string): Promise<T> => {
    try {
      const res = await fetch(endpoint);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  // Fetch teams data on component mount
  useEffect(() => {
    const endpoint = "/api/club";
    const clubData = async () => {
      try {
        const data = await fetchData<Club>(endpoint);
        setClubData(data);
      } catch (error) {
        console.error("Error fetching teams data:", error);
      }
    };

    clubData();
  }, []);

  // Fetch ranking data when selectedTeam changes
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
  }, [selectedTeam]);

  const [isActive, setIsActive] = useState<string>("");

  return (
    <Container component='main' className='flex grow bg-black'>
      {/* <Aside data={data} setSelectedTeam={setSelectedTeam} /> */}
      <Box component='section' className='flex flex-col grow'>
        <Typography component='h1' variant='h1'>
          Classements
        </Typography>
        <ButtonGroup variant='contained' aria-label='Basic button group' className='flex-wrap flex'>
          {clubData?.teams.map((team: TeamType) => {
            const id = team.competitions[0].id.toString();
            return (
              <Button
                size='large'
                key={uuidv4()}
                id={id}
                onClick={() => {
                  setSelectedTeam(id);
                }}
              >
                {team.shortName}
              </Button>
            );
          })}
        </ButtonGroup>
        {ranking && <Table data={ranking} />}
      </Box>
    </Container>
  );
}
