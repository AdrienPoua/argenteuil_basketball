"use client";
import { Box } from "@mui/material";
import { coachs } from "@/utils/services/dataProcessing";
import { v4 as uuidv4 } from "uuid";
import { Coach } from "@/utils/models";
import Info from "@/components/Info";
import H1 from '@/components/H1';
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import { MainSection } from "@/utils/layouts";
import useFetchCoachs from "@/utils/hooks/DBFetch/useFetchCoachs";
import FetchFeedback from "@/components/FetchFeedback";


// Dynamically import the LeaderCard component
const StaffCard = dynamic(() =>
  import('@/components/Cards').then(mod => mod.StaffCard),
  { ssr: false }
);
export default function Index() {
  const { coachs, isLoading, error } = useFetchCoachs();

  return (
    <>
      <H1> Nos entraineurs </H1>
      <MainSection>
        <FetchFeedback isLoading={isLoading} error={error} data={coachs}>
          <Box className="flex flex-wrap gap-10 justify-center items-center">
            {coachs && coachs.length > 2 ? (
              coachs.map((coach: Coach) => (
                <motion.div
                  key={coach.name}
                  initial={{ filter: 'blur(30px)', opacity: 0, y: 50 }}
                  animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="grow"
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
        </FetchFeedback>
      </MainSection>
    </>
  );
}
