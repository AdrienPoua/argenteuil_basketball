"use client";
import H1 from "@/components/H1";
import Schedule from "@/components/Schedule";
import { Box } from "@mui/material";
import useFetchMatchs from "@/utils/hooks/fetchDatabase/useFetchMatchs";
import FetchFeedback from "@/components/FetchFeedback";
import { SAISON_MONTH_ORDER } from "@/utils/magicNumber";

export default function Index() {
  const { data: plannings, isLoading, error } = useFetchMatchs();
  return (
    <FetchFeedback isLoading={isLoading} error={error} data={plannings}>
      <>
        <H1> Calendrier des matchs </H1>
        <Box className="flex flex-col items-center max-w-[80%] w-fit mx-auto gap-10">
          {plannings && Object.keys(plannings)
            .sort((a, b) => SAISON_MONTH_ORDER.indexOf(a) - SAISON_MONTH_ORDER.indexOf(b))
            .map((month) => (
              <Schedule key={month} matchs={plannings[month]} title={month} />
            ))}
        </Box>
      </>
    </FetchFeedback>)
}