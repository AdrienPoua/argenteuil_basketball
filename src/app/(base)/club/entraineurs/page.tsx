"use client";
import { Box } from "@mui/material";
import { coachs } from "@/utils/services/dataProcessing";
import { v4 as uuidv4 } from "uuid";
import { Coach } from "@/utils/models";
import Info from "@/components/Info";
import H1 from '@/components/H1';
import { motion } from "framer-motion";
import { useRef } from "react";
import useVisibility from "@/utils/hooks/useVisibility";
import dynamic from 'next/dynamic';
import { MainSection } from "@/utils/layouts";

// Dynamically import the LeaderCard component
const StaffCard = dynamic(() =>
  import('@/components/Cards').then(mod => mod.StaffCard),
  { ssr: false }
);


export default function Index() {
  const cardRef = useRef(null);
  const isVisible = useVisibility(cardRef);
  const animation = {
    hidden: { filter: 'blur(10px)', opacity: 0, y: 50 },
    visible: { filter: 'blur(0px)', opacity: 1, y: 0 },
  };
  return (
    <>
      <H1> Nos entraineurs </H1>
      <MainSection>
        <Box className="flex flex-wrap gap-10 justify-center items-center">
          {coachs.length > 2 ? (
            coachs.map((coach: Coach) => (
              <motion.div
                ref={cardRef}
                key={coach.name}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                variants={animation}
                transition={{ duration: 0.5 }}
                className="group"
              >
                <StaffCard
                  key={uuidv4()}
                  data={coach}
                />
              </motion.div>
            ))
          ) : (
            <Info content="Equipe en construction" />
          )}
        </Box>
      </MainSection>
    </>
  );
}
