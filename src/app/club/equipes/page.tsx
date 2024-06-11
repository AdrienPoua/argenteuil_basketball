"use client";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { teams } from "@/build";
import { TeamCard } from "@/components/Card";
import Layout from "@/layout/main";
import { Box, Button } from "@mui/material";
import Slider from "@/components/Slider";



export default function Index() {
  const [selectedTeam, setSelectedTeam] = useState<string | undefined>(undefined);
  const [displayedTeams, setDisplayedTeams] = useState(teams);

  useEffect(() => {
    if (selectedTeam) {
      const filteredTeams = teams.filter((team) => team.name === selectedTeam);
      setDisplayedTeams(filteredTeams);
    } else {
      setDisplayedTeams(teams);
    }
  }, [selectedTeam]);

  return (
    <Layout pageTitle='Nos équipes'>
      <Box className='flex justify-center items-center mb-8'>
        <Button size='large' className='flex whitespace-nowrap min-w-fit' variant='contained' onClick={() => setSelectedTeam(undefined)}>
          {" "}
          Toutes les équipes{" "}
        </Button>
      </Box>
      <Slider >
        {teams?.map((team) => {
          return (
            <Button
              className='flex whitespace-nowrap text-xs md:text-base lg:text-lg '
              variant={team.name === selectedTeam ? "contained" : "outlined"}
              key={uuidv4()}
              onClick={() => {
                setSelectedTeam(team.name);
              }}
            >
              {team.name}
            </Button>
          );
        })}
      </Slider>
      <Box className='flex flex-col grow gap-5 mx-20 mt-14' >
        {displayedTeams.map((team) => (
          <TeamCard key={uuidv4()} data={team} />
        ))}
      </Box>
    </Layout>
  );
}
