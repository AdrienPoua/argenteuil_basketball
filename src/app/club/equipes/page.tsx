"use client";
import teamsData from "@/data/teams.json";
import { MemberFactory } from "@/factories";
import { Team } from "@/models";
import { TeamCard } from "@/components/Card";
import Layout from "@/layout/main";
import { v4 as uuidv4 } from "uuid";
import { Box, Button, Fab } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


const Slider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const slidingRef = useRef<HTMLDivElement | null>(null);

  const handleLeftClick = () => {
    slidingRef.current?.scrollBy({ left: -500, behavior: "smooth" });
  };

  const handleRightClick = () => {
    slidingRef.current?.scrollBy({ left: 500, behavior: "smooth" });
  };
  return (
    <Box className='flex h-fit mb-14 relative gap-2 no-scrollbar  items-center '>
      <Fab color='primary' aria-label='left' className='absolute -left-20' onClick={handleLeftClick}>
        <ArrowBackIosIcon />
      </Fab>
      <Box ref={slidingRef} className='flex gap-2 overflow-hidden	'>
        {children}
      </Box>
      <Fab color='primary' aria-label='right' className='absolute -right-20' onClick={handleRightClick}>
        <ArrowForwardIosIcon />
      </Fab>
    </Box>
  );
};

export default function Index() {

  const teams = teamsData
    .map((team) => MemberFactory.create(team, "team"))
    .filter((team): team is Team => team instanceof Team)


  const [selectedTeam, setSelectedTeam] = useState<string | undefined>(undefined);
  const [displayedTeams, setDisplayedTeams] = useState<Team[]>(teams);

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
      <Slider>
        {teams?.map((team: Team) => {
          return (
            <Button
              size='large'
              className='flex whitespace-nowrap min-w-fit'
              variant='contained'
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
      <Box className='flex flex-col grow gap-5 mx-20'>
        {displayedTeams.map((team) => (
          <TeamCard key={uuidv4()} data={team} />
        ))}
      </Box>
    </Layout>
  );
}
