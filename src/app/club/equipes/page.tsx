"use client";
import { useState, useEffect } from "react";
import { teams } from "@/services/dataProcessing";
import Layout from "@/layout/main";
import { Box, Button, Container, Typography } from "@mui/material";
import Slider from "@/components/Slider";
import dynamic from 'next/dynamic';

// Dynamically import the LeaderCard component
const TeamCard = dynamic(() =>
  import('@/components/Card').then(mod => mod.TeamCard),
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
    <Layout pageTitle="Nos équipes 2024-2025">
      <Box className="flex justify-center items-center mb-8">
        <Button
          size="large"
          className="flex whitespace-nowrap min-w-fit"
          variant="contained"
          onClick={() => handleTeamSelection(null)}>
          <Typography variant="h2" className="text-base">Toutes les équipes</Typography>
        </Button>
      </Box>
      <Container className="max-w-[80%]">
      <Slider>
        {teams.map((team) => (
          <Button
            className="flex whitespace-nowrap text-xs md:text-base lg:text-lg"
            variant={team.name === selectedTeamName ? "contained" : "outlined"}
            key={team.id}
            onClick={() => handleTeamSelection(team.name)}>
            {team.name}
          </Button>
        ))}
      </Slider>
      </Container>
      <Box className="flex flex-col grow gap-5 mt-14">
        {filteredTeams.map((team) => (
          <TeamCard
            key={team.id}
            data={team}
          />
        ))}
      </Box>
    </Layout>
  );
}
