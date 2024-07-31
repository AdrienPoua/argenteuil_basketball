"use client";
import { Box, Typography, Paper } from "@mui/material";
import { faq } from "@/utils/services/dataProcessing";
import { FAQ } from "@/utils/models";
import Dropdown from "@/components/Dropdown";
import { useState, useRef, ReactNode, ReactElement } from "react";
import SearchBar from "@/components/SearchBar";
import H1 from "@/components/H1";
import { motion } from "framer-motion";
import useVisibility from "@/utils/hooks/useVisibility";
import { MainSection } from "@/utils/layouts";

const AnimatedDropdown = ({ children }: { children: ReactNode }) : ReactElement => {
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
      className="flex items-center justify-center w-full"
    >
      {children}
    </motion.div>
  )
}


export default function Index() : ReactElement {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFAQ, setFilteredFAQ] = useState<FAQ[]>(faq);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    const filtered = faq.filter((faq) =>
      faq.question.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredFAQ(filtered);
  };

  return (
    <>
      <H1> Vos questions </H1>
      <MainSection>
        <Box className="max-w-[800px] flex justify-center mx-auto mb-10">
          <SearchBar value={searchQuery} onChange={handleSearch} />
        </Box>
        <Box className="flex flex-col gap-5 max-w-[800px] mx-auto">
          {filteredFAQ.map((faq: FAQ) => (
            <AnimatedDropdown key={faq.id}>
              <Dropdown
                header={
                  <Typography
                    variant="body2"
                    className="flex text-lg"
                  >
                    {faq.question}
                  </Typography>
                }
                key={faq.id}
                items={
                  <Box className="flex flex-col">
                    <Paper className="p-3">
                      <Typography
                        variant="body2"
                        className="flex text-lg"
                      >
                        {faq.answer}
                      </Typography>
                    </Paper>
                  </Box>
                }
              />
            </AnimatedDropdown>
          )
          )}
        </Box>
      </MainSection >
    </>
  );
}
