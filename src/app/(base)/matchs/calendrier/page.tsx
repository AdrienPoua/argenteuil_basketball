"use client";
import H1 from "@/components/H1";
import Schedule from "@/components/Schedule";
import { Box } from "@mui/material";
import Match from "@/utils/models/Match";
import useFetchMatchs from "@/utils/hooks/fetchDatabase/useFetchMatchs";
import FetchFeedback from "@/components/FetchFeedback";
import { SAISON_MONTH_ORDER } from "@/utils/magicNumber";



export default function Index() {
  const { data, isLoading, error } = useFetchMatchs();
  const matchs = data?.map((match) => new Match(match))
  const matchsByMonth = matchs && Match.groupByMonth(matchs)

  return (
    <>
      <H1> Calendrier des matchs </H1>
      <FetchFeedback isLoading={isLoading} error={error} data={data}>
        <Box className="flex flex-col max-w-[80%] mx-auto gap-10">
          {matchsByMonth && Object.keys(matchsByMonth)
            .sort((a, b) => SAISON_MONTH_ORDER.indexOf(a) - SAISON_MONTH_ORDER.indexOf(b))
            .map((month) => (
              <Schedule key={month} matchs={matchsByMonth[month]} title={month} />
            ))}
        </Box>
      </FetchFeedback >
    </>
  )
}