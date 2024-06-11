"use client";
import Layout from "@/layout/main";
import { Box, Typography, Button, Paper } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import FAQ from "@/data/faq.json";
import { useState } from "react";
import Arrow from "@/components/Arrow";

const Question = ({ question, isOpen }: { question: string; isOpen: boolean }) => {
  return (
    <Button
      className="flex justify-between items-center w-full p-4"
      variant="contained"
      aria-expanded={isOpen}
    >
      <Typography variant="body2" className="text-xl ">{question}</Typography>
      <Arrow direction={isOpen ? "down" : "right"} />
    </Button>
  );
};

const Answer = ({ answer, isOpen }: { answer: string; isOpen: boolean }) => {
  return (
    <Paper
      square
      className={` transition-all duration-300 ${isOpen ? 'max-h-96  py-5  ' : 'max-h-0 '}`}
      style={{ overflow: 'hidden' }}
    >
      <Typography variant="body2" className="ms-4">{answer}</Typography>
    </Paper>
  );
};


const Dropdown = ({ data }: { data : { question: string; answer: string } }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      className="w-full"
      onClick={() => setIsOpen((prev) => !prev)}
      aria-expanded={isOpen}
    >
      <Question question={data.question} isOpen={isOpen} />
      <Answer answer={data.answer} isOpen={isOpen} />
    </Box>
  );
};

export default function Index() {
  return (
    <Layout pageTitle="Vos questions">
      <Box className="flex flex-col gap-10 justify-center items-center w-full max-w-2xl mx-auto">
        {FAQ.map((faq) => (
          <Dropdown
            key={uuidv4()}
            data={faq}
          />
        ))}
      </Box>
    </Layout>
  );
}
