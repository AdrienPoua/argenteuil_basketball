"use client";
import { Box } from "@mui/material";
import { gyms } from "@/utils/services/dataProcessing";
import { Gym } from "@/utils/models";
import H1 from '@/components/H1';
import { MainSection } from "@/utils/layouts";
import { motion } from "framer-motion";
import { useRef } from "react";
import useVisibility from "@/utils/hooks/useVisibility";
import dynamic from 'next/dynamic';

// Dynamically import the LeaderCard component
const GymCard = dynamic(() =>
  import('@/components/Cards').then(mod => mod.GymCard),
  { ssr: false }
);

const AnimatedCard = ({ children }: { children: React.ReactNode }) => {
  const cardRef = useRef(null);
  const isVisible = useVisibility(cardRef);
  const animation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      whileHover="hover"
      variants={animation}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default function Page() {
  return (
    <>
      <H1> Nos gymnases </H1>
      <MainSection>
        <Box className="flex flex-col gap-16">
          {gyms.map((gym: Gym) => (
            <AnimatedCard key={gym.id}>
              <GymCard data={gym} />
            </AnimatedCard>
          ))}
        </Box>
      </MainSection>
    </>
  );
}
