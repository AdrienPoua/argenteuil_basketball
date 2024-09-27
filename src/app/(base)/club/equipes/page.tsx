"use client";
import { ReactElement, useRef } from "react";
import { Box } from "@mui/material";
import dynamic from 'next/dynamic';
import H1 from '@/components/H1';
import { MainSection } from "@/utils/layouts";
import { motion } from "framer-motion";
import useVisibility from "@/utils/hooks/useVisibility";
import useFetchTeams from "@/utils/hooks/DBFetch/useFetchTeam";
import FetchFeedBack from "@/components/FetchFeedback";

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
      transition={{ duration: 0.3, type: "spring" }}
      className="w-full h-fit"
    >
      {children}
    </motion.div>
  );
}

export default function TeamPage() {
  const { teams, isLoading, error } = useFetchTeams();
  return (
    <>
      <H1>Nos équipes 2024-2025</H1>
      <MainSection>
        <FetchFeedBack isLoading={isLoading} error={error} data={teams}>
          <Box className="flex flex-col items-center mb-20 gap-8">
            {teams?.map((team) => (
              <AnimateCard key={team.id}>
                <TeamCard
                  data={team}
                />
              </AnimateCard>
            ))}
          </Box>
        </FetchFeedBack>
      </MainSection>
    </>
  );
}
