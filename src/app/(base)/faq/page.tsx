"use client";
import { Box, Typography, Paper } from "@mui/material";
import { FAQ } from "@/utils/models";
import Dropdown from "@/components/Dropdown";
import { useState, useRef, ReactElement } from "react";
import SearchBar from "@/components/SearchBar";
import H1 from "@/components/H1";
import { motion } from "framer-motion";
import useVisibility from "@/utils/hooks/useVisibility";
import { MainSection } from "@/utils/layouts";
import useFetchFAQ from "@/utils/hooks/fetchDatabase/useFetchFAQ";
import Feedback from "@/components/FetchFeedback";

const AnimatedDropdown = ({ question, answer }: { question: string, answer: string }): ReactElement | null => {
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
      <Dropdown
        header={
          <Typography variant="body2" className="flex text-lg">
            {question}
          </Typography>
        }
        items={
          <Box className="flex flex-col">
            <Paper className="p-3">
              <Typography variant="body2" className="flex text-lg">
                {answer}
              </Typography>
            </Paper>
          </Box>
        }
      />
    </motion.div>
  );
};




export default function Index(): ReactElement {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: FAQlist, isLoading, error } = useFetchFAQ();
  const filteredFAQ = FAQlist?.filter((item: { question: string, answer: string, rank: number, _id: string }) => searchQuery.length === 0 || item.question.toLowerCase().includes(searchQuery.toLowerCase()));
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <H1> Vos questions </H1>
      <MainSection>
        <Box className="max-w-[800px] flex justify-center mx-auto mb-10">
          <SearchBar value={searchQuery} onChange={handleSearch} />
        </Box>
        <Feedback isLoading={isLoading} error={error} data={FAQlist} >
          <Box className="flex flex-col gap-5 max-w-[800px] mx-auto">
            {filteredFAQ?.map((item: { question: string, answer: string, rank: number, _id: string }) => (
              <AnimatedDropdown key={item._id} question={item.question} answer={item.answer} />
            ))}
          </Box>
        </Feedback>
      </MainSection >
    </>
  );
}
