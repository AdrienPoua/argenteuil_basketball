"use client";
import useFetchFAQ from "@/utils/hooks/fetchDatabase/useFetchFAQ";
import Feedback from "@/components/FetchFeedback";
import Dropdown from "@/components/Dropdown";
import { Box, Typography, Container, TextField, InputLabel, Button, TextareaAutosize, Paper } from "@mui/material";
import { useState } from "react";
import { useFAQ } from "@/utils/hooks/useFAQ";

import Instructions from "@/components/Instructions";



export default function Index() {
  const { data, error, isLoading } = useFetchFAQ()
  return (
    <Feedback data={data} isLoading={isLoading} error={error}   >
      <Container className="flex flex-col grow w-full gap-5">
        <Instructions className="bg-gray-100">
          <Typography className="text-black">
            Créer une question et une réponse pour les questions fréquentes
          </Typography>
          <Typography className="text-black">
            Modifier l&apos;ordre des questions avec les fleches pour les trier dans leur ordre d&apos;apparition
          </Typography>
        </Instructions>
        <Form />
        {data?.map((faq: { _id: string, question: string, answer: string, rank: number }) => (
          <>
            <CustomDropdown key={faq._id} {...faq} />
          </>
        ))}

      </Container>
    </Feedback>
  )
}


const Form = () => {
  const { create } = useFAQ();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    create(new FormData(e.target as HTMLFormElement));
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="flex flex-col w-[80%] mx-auto gap-4 bg-primary p-10"
    >
      <InputLabel htmlFor="question-input" className="text-black m-auto">Question</InputLabel>
      <TextareaAutosize
        name="question"
        id="question-input"
        className="w-full min-h-10 rounded-lg text-black"
      />

      <InputLabel htmlFor="answer-input" className="text-black m-auto">Answer</InputLabel>
      <TextareaAutosize
        name="answer"
        id="answer-input"
        className="w-full min-h-10 rounded-lg text-black"
      />
      <InputLabel htmlFor="rank-input" className="text-black m-auto">Rank</InputLabel>
      <TextField
        name="rank"
        id="rank-input"
        className="w-fit m-auto bg-white rounded-lg"
        type="number"
      />

      <Button
        variant="contained"
        className="w-fit m-auto mt-5"
        type="submit"
      >
        Create
      </Button>
    </Box>
  );
};



const CustomDropdown = ({ question, answer, _id: id, rank: R }: { question: string, answer: string, rank: number, _id: string }) => {

  const { erase, update } = useFAQ()
  const [rank, setRank] = useState(R)
  const Increment = () => {
    const newRank = rank + 1
    update({ id, rank: newRank })
    console.log(newRank)
    setRank(newRank)
  }
  const Decrement = () => {
    const newRank = rank - 1
    console.log(newRank)
    update({ id, rank: newRank })
    setRank(newRank)
  }

  return (
    <Box className="flex flex-col items-center relative mt-10 ">
      <Box className="absolute -top-10 right-1/2 transform translate-x-1/2 flex h-10 border-2 border-black">
        <Box className="flex">
          <Button className="w-fit bg-white text-center" onClick={Increment}  > ⏫</Button>
          <Button className="w-fit bg-white text-center" onClick={Decrement} > ⏬</Button>
        </Box>
        <Button variant="contained" className="w-fit rounded-none " onClick={() => erase(id)}>❌</Button>
      </Box>
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
    </Box>
  )
}