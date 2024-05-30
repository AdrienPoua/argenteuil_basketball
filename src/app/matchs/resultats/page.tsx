"use client";
import { useState, useEffect } from "react";
import { Box, List, Typography, ListItem, ListItemText } from "@mui/material";
import { TEAMS, TeamType } from "@/models/api";
import { v4 as uuidv4 } from "uuid";
import Table from "./table";

type AsideProps = { data: TEAMS | undefined, setSelectedTeam: (team: string) => void};

function Aside({ data, setSelectedTeam }: Readonly<AsideProps>) {
  return (
    <Box component='aside' className='bg-primary min-h-screen min-w-44'>
      <List>
        {data?.data.map((team : TeamType ) => (
          <ListItem button key={uuidv4()} className="p-10" onClick={() => setSelectedTeam(team.competitions[0].id.toString())}>
            <ListItemText className='tracking-widest text-center' primary={team.shortName} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default function Index() {
  const [data, setData] = useState<undefined | TEAMS >(undefined);
  const [selectedTeam, setSelectedTeam] = useState<undefined | string>(undefined);
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
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/ranking/${selectedTeam}`);
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    [selectedTeam]
  });

  return (
    <Box component='main' className='flex grow bg-black'>
      <Aside data={data} setSelectedTeam={setSelectedTeam}  />
      <Box component='section' className='flex flex-col grow'>
        <Typography component='h1' variant='h1'>
          Classements
        </Typography>
        <Box className='flex justify-center'>
         { selectedTeam && <Typography className="text-white">{selectedTeam}</Typography>}
        </Box>
        {/* <Table/> */}
      </Box>
    </Box>
  );
}
