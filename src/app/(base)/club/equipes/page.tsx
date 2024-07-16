"use client";
import { useState, useEffect } from "react";
import { teams } from "@/utils/services/dataProcessing";
import { Box, Button, Container, Typography } from "@mui/material";
import Slider from "@/components/Slider";
import dynamic from 'next/dynamic';
import H1 from '@/components/H1';
import { MainSection } from "@/utils/layouts";


// Dynamically import the LeaderCard component
const TeamCard = dynamic(() =>
  import('@/components/Cards').then(mod => mod.TeamCard),
  { ssr: false }
);

export default function TeamPage() {
  const [selectedTeamName, setSelectedTeamName] = useState<string | null>(null);
  const [filteredTeams, setFilteredTeams] = useState(teams);

  useEffect(() => {
    if (selectedTeamName) {
      const filtered = teams.filter((team) => team.name === selectedTeamName);
      setFilteredTeams(filtered);
    } else {
      setFilteredTeams(teams);
    }
  }, [selectedTeamName]);

  const handleTeamSelection = (teamName: string | null) => {
    setSelectedTeamName(teamName);
  };

  return (
    <>
      <H1>Nos équipes 2024-2025</H1>
      <MainSection>
        <Box className="flex flex-col items-center gap-10">
          <Button
            size="large"
            variant="contained"
            onClick={() => handleTeamSelection(null)}>
            Toutes les équipes
          </Button>
          <Slider>
            {teams.map((team) => (
              <Button
                className="flex whitespace-nowrap"
                variant={team.name === selectedTeamName ? "contained" : "outlined"}
                key={team.id}
                onClick={() => handleTeamSelection(team.name)}>
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
