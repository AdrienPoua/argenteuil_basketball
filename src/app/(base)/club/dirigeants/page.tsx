"use client";
import { Box } from "@mui/material";
import { leaders } from "@/utils/services/dataProcessing";
import { v4 as uuidv4 } from "uuid";
import { Leader } from "@/utils/models";
import dynamic from 'next/dynamic';
import H1 from '@/components/H1';
import { MainSection } from "@/utils/layouts";
import { motion } from "framer-motion";

// Dynamically import the LeaderCard component
const StaffCard = dynamic(() =>
  import('@/components/Cards').then(mod => mod.StaffCard),
  { ssr: false }
);

export default function Index() {
  return (
    <>
      <H1> Les membres du bureau </H1>
      <MainSection>
        <Box className="flex flex-wrap gap-10 justify-center items-center">
          {leaders.map((leader: Leader) => (
            <motion.div
              key={leader.name}
              initial={{ filter: 'blur(30px)', opacity: 0, y: 50 }}
              animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <StaffCard
                key={uuidv4()}
                data={leader}
              />
            </motion.div>
          ))}
        </Box>
      </MainSection >
    </>
  );
}
