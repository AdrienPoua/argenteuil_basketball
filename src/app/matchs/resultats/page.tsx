"use client";
import { useState, useEffect } from "react";
import { Box, List, Typography, ListItem, ListItemText, Container } from "@mui/material";
import { TEAMS, TeamType, Ranking } from "@/models/api";
import { v4 as uuidv4 } from "uuid";
import Table from "./table";
import { Button, ButtonGroup } from "@mui/material";

export default function Index() {
  const [data, setData] = useState<undefined | TEAMS>(undefined);
  const [selectedTeam, setSelectedTeam] = useState<undefined | string>(undefined);
  const [ranking, setRanking] = useState<undefined | Ranking>(undefined);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/matchs");
        const data = await res.json();
        setData(new TEAMS(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedTeam) {
      const fetchData = async (id: string) => {
        try {
          const res = await fetch(`/api/ranking/${id}`);
          const data = await res.json();
          setRanking(new Ranking(data));
          console.log(ranking);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData(selectedTeam);
    }
  }, [selectedTeam]);

  return (
    <Container component='main' className='flex grow bg-black'>
      {/* <Aside data={data} setSelectedTeam={setSelectedTeam} /> */}
      <Box component='section' className='flex flex-col grow'>
        <Typography component='h1' variant='h1'>
          Classements
        </Typography>
        <Container className='overflow-hidden'>
          <Box className='flex flex-col'>
            <ButtonGroup variant='contained' aria-label='Basic button group' className='max-w-fit'>
              {data?.data.map((team: TeamType) => (
                <Button size='small' button key={uuidv4()} className='p-10' onClick={() => setSelectedTeam(team.competitions[0].id.toString())}>
                  {team.shortName}
                </Button>
              ))}
            </ButtonGroup>
            {ranking && <Table data={ranking} />}
          </Box>
        </Container>
      </Box>
    </Container>
  );
}
