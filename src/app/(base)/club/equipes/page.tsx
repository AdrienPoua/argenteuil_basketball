"use client";
import { ReactElement, useState, useRef } from "react";
import { teams } from "@/utils/services/dataProcessing";
import { Box, Button } from "@mui/material";
import Slider from "@/components/Slider";
import dynamic from 'next/dynamic';
import H1 from '@/components/H1';
import { MainSection } from "@/utils/layouts";
import { Team } from "@/utils/models";
import { motion } from "framer-motion";
import useVisibility from "@/utils/hooks/useVisibility";

// Dynamically import the LeaderCard component
const TeamCard = dynamic(() =>
  import('@/components/Cards').then(mod => mod.TeamCard),
  { ssr: false }
);

const AnimateCard = ({ children }: { children: ReactElement }): ReactElement => {
  const cardRef = useRef(null);
  const isVisible = useVisibility(cardRef);
  const animation = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, x: 0 },
  }
  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={animation}
      transition={{ duration: 0.3, type: "just" }}
      className="w-full h-fit"
    >
      {children}
    </motion.div>
  );
}

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
        <Box className="flex flex-col items-center mb-20 gap-8">
          <Button
            size="large"
            variant="contained"
            className="mb-3"
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
            <AnimateCard key={team.id}>
              <TeamCard
                data={team}
              />
            </AnimateCard>
          ))}
        </Box>
      </MainSection>
    </>
  );
}
