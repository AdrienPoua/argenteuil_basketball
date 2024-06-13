"use client";
import Layout from "@/layout/main";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useState } from "react";
import Arrow from "@/components/Arrow";
import { faq } from "@/build";


interface FAQItem {
  id?: string;
  question: string;
  answer: string;
}

const Question = ({ question, isOpen }: { question: string; isOpen: boolean }) => (
  <Button
    className="flex justify-between items-center w-full p-4"
    variant="contained"
    aria-expanded={isOpen}
  >
    <Typography variant="body2" className="text-xs md:text-base text-center size-full">
      {question}
    </Typography>
    <Arrow direction={isOpen ? "down" : "right"} />
  </Button>
);

const Answer = ({ answer, isOpen }: { answer: string; isOpen: boolean }) => (
  <Paper
    square
    className={`transition-all duration-300 ${isOpen ? 'max-h-96 py-5' : 'max-h-0'}`}
    style={{ overflow: 'hidden' }}
  >
    <Typography variant="body2" className="ms-4 text-xs md:text-base">
      {answer}
    </Typography>
  </Paper>
);

const Dropdown = ({ data }: { data: FAQItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box className="w-full" onClick={() => setIsOpen((prev) => !prev)} aria-expanded={isOpen}>
      <Question question={data.question} isOpen={isOpen} />
      <Answer answer={data.answer} isOpen={isOpen} />
    </Box>
  );
};

export default function FAQPage() {
  return (
    <Layout pageTitle="Vos questions">
      <Box className="flex flex-col gap-10 justify-center items-center w-full max-w-2xl mx-auto">
        {faq.map((faq: FAQItem) => (
          <Dropdown key={faq.id} data={faq} />
        ))}
      </Box>
    </Layout>
  );
}
