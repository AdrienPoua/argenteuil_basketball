"use client";
import { Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Leader from "@/utils/models/Leader";
import dynamic from 'next/dynamic';
import H1 from '@/components/H1';
import { MainSection } from "@/utils/layouts";
import { motion } from "framer-motion";
import useFetchLeaders from "@/utils/hooks/DBFetch/useFetchLeaders";
import FetchFeedback from "@/components/FetchFeedback";
import { useState, useEffect } from "react";
import { TDatabase } from "@/utils/types";

// Dynamically import the LeaderCard component
const StaffCard = dynamic(() =>
  import('@/components/Cards').then(mod => mod.StaffCard),
  { ssr: false }
);



export default function Index() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const { data, isLoading, error } = useFetchLeaders();
  console.log(data)

  useEffect(() => {
    if (data) {
      setLeaders(data.map((leader) => new Leader(leader)));
    }
  }, [data]);

  return (
    <>
      <H1> Les membres du bureau </H1>
      <MainSection>
        <FetchFeedback isLoading={isLoading} error={error} data={data}>
          <Box className="flex flex-wrap gap-10 justify-center items-center">
            {leaders?.map((leader: Leader) => (
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
        </FetchFeedback>
      </MainSection >
    </>
  );
}
