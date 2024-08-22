"use client";
import useFetchFAQ from "@/utils/hooks/fetchDatabase/useFetchFAQ";
import Feedback from "@/components/FetchFeedback";
import Dropdown from "@/components/Dropdown";
import { Box, Typography, Container, TextField, InputLabel, Button, TextareaAutosize, Paper, Input } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useFAQ } from "@/utils/hooks/useFAQ";

export default function Index() {
  const { data, error, isLoading } = useFetchFAQ()
  return (
    <Feedback data={data} isLoading={isLoading} error={error}   >
      <Container className="flex flex-col grow w-full gap-5">
        <Form />
        {data?.map((faq) => (
          <>
            <CustomDropdown key={faq._id} {...faq} />
          </>
        ))}

      </Container>
    </Feedback>
  )
}


const Form = () => {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [rank, setRank] = useState(0)
  const { create } = useFAQ()
  const reset = () => {
    setQuestion("")
    setAnswer("")
    setRank(0)
  }
  const handleClick = () => {
    create({ question, answer, rank })
    reset()
  }
  return (
    <Box className="flex flex-col w-[80%] mx-auto gap-1 bg-primary p-10">
      <InputLabel className="text-black m-auto" >Question</InputLabel>
      <TextareaAutosize className="w-full min-h-10 rounded-lg text-black" value={question} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setQuestion(e.target.value)} />
      <InputLabel className="text-black m-auto">Answer</InputLabel>

      <TextareaAutosize className="w-full min-h-10 rounded-lg text-black" value={answer} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setAnswer(e.target.value)} />
      <InputLabel className="text-black m-auto">Rank</InputLabel>
      <TextField className="w-fit m-auto" value={rank} onChange={(e) => setRank(Number(e.target.value))} />
      <Button variant="contained" className="w-fit m-auto mt-5" onClick={handleClick}>Create</Button>
    </Box>
  )
}

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