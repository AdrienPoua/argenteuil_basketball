"use client";
import H1 from "@/components/H1";
import Schedule from "@/components/Schedule";
import { Container } from "@mui/material";
import useFetchMatchs from "@/utils/hooks/DBFetch/useFetchMatchs";
import FetchFeedback from "@/components/FetchFeedback";
import { SAISON_MONTH_ORDER } from "@/utils/magicNumber";

export default function Index() {
  const { data: plannings, isLoading, error } = useFetchMatchs();
  return (
    <FetchFeedback isLoading={isLoading} error={error} data={plannings}>
      <>
        <H1> Calendrier des matchs </H1>
        <Container className="flex flex-col items-center gap-10">
          {plannings && Object.keys(plannings)
            .sort((a, b) => SAISON_MONTH_ORDER.indexOf(a) - SAISON_MONTH_ORDER.indexOf(b))
            .map((month) => (
              <Schedule key={month} matchs={plannings[month]} title={month} />
            ))}
        </Container>
      </>
    </FetchFeedback>)
}