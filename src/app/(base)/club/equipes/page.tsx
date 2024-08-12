"use client";
import { ReactElement, useState, useRef } from "react";
import { teams } from "@/utils/services/dataProcessing";
import { Box, Button, useTheme, useMediaQuery } from "@mui/material";
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
      className="w-full h-[300px] md:h-[600px] relative overflow-hidden rounded-lg shadow-lg transition-transform duration-150 ease-in-out transform hover:scale-105"
    >
      {children}
    </motion.div>
  );
}

export default function TeamPage() {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const filteredTeams = teams.filter((team) => selectedTeam === null || team.name === selectedTeam?.name);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
            <AnimateCard key={team.id}>
              <TeamCard
                data={team}
                isMobile={isMobile}
              />
            </AnimateCard>
          ))}
        </Box>
      </MainSection>
    </>
  );
}
