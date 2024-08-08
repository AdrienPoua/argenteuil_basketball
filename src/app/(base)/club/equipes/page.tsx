"use client";
import { useState, useEffect } from "react";
import { teams } from "@/utils/services/dataProcessing";
import { Box, Button, Container, Typography } from "@mui/material";
import Slider from "@/components/Slider";
import dynamic from 'next/dynamic';
import H1 from '@/components/H1';
import { MainSection } from "@/utils/layouts";
import { Team } from "@/utils/models";

// Dynamically import the LeaderCard component
const TeamCard = dynamic(() =>
  import('@/components/Cards').then(mod => mod.TeamCard),
  { ssr: false }
);

export default function TeamPage() {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const filteredTeams = teams.filter((team) => selectedTeam === null || team.name === selectedTeam?.name);
  const handleClick = (team: Team | null) => {
    setSelectedTeam(team);
  };
  return (
    <>
      <H1>Nos équipes 2024-2025</H1>
      <MainSection>
        <Box className="flex flex-col items-center gap-10">
          <Button
            size="large"
            variant="contained"
            onClick={() => handleClick(null)}>
            Toutes les équipes
          </Button>
          <Slider>
            {teams.map((team) => (
              <Button
                className="flex whitespace-nowrap"
                variant={team.name === selectedTeam?.name ? "contained" : "outlined"}
                key={team.id}
                onClick={() => handleClick(team)}>
                {team.name}
              </Button>
            ))}
          </Slider>
          {filteredTeams.map((team) => (
            <TeamCard
              key={team.id}
              data={team}
            />
          ))}
        </Box>
      </MainSection>
    </>
  );
}
