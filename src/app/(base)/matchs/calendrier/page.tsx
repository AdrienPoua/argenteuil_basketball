"use client";
import Info from "@/components/Info";
import H1 from "@/components/H1";
import Schedule from "@/components/Schedule";
import { Box } from "@mui/material";
import Adapter from '@/utils/adapters/matchs/fromDBforModel';
import Match from "@/utils/models/Match";
import useFetchMatchs from "@/utils/hooks/fetchDatabase/useFetchMatchs";
import FetchFeedback from "@/components/FetchFeedback";



export default function Index() {
  const { data, isLoading, error } = useFetchMatchs();
  return (
    <FetchFeedback isLoading={isLoading} error={error} data={data}>
      <>
        <H1> Calendrier des matchs </H1>
        <Box className="flex flex-col max-w-[80%] mx-auto gap-10">
          {data && Object.keys(data).map((month) => (
            <Schedule key={month} matchs={data[month]} title={month} />
          ))}
        </Box>
      </>
    </FetchFeedback>)
}