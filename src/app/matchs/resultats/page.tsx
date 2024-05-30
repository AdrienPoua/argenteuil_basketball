"use client";
import { useState, useEffect } from "react";
import { Box, List, Typography, ListItem, ListItemText } from "@mui/material";
import { API } from "@/models/api";
import { v4 as uuidv4 } from "uuid";
import { set } from "mongoose";

type AsideProps = { data: API | undefined, setSelectedTeam: (team: string) => void};

function Aside({ data, setSelectedTeam }: Readonly<AsideProps>) {
  const teams = data?.data;

  return (
    <Box component='aside' className='bg-primary min-h-screen min-w-44'>
      <List>
        {teams?.map((team) => (
          <ListItem button key={uuidv4()} className="p-10" onClick={() => setSelectedTeam(team.name)}>
            <ListItemText className='tracking-widest text-center' primary={team.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default function Index() {
  const [data, setData] = useState<undefined | API>(undefined);
  const [selectedTeam, setSelectedTeam] = useState<undefined | string>(undefined);
  console.log(selectedTeam);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/matchs");
        const data = await res.json();
        setData(new API(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box component='main' className='flex grow bg-black'>
      <Aside data={data} setSelectedTeam={setSelectedTeam}  />
      <Box component='section' className='flex flex-col grow'>
        <Typography component='h1' variant='h1'>
          Classements
        </Typography>
        <Box className='flex justify-center'>
          <Typography className="text-white">{selectedTeam}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
