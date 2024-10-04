"use client";
import H1 from "@/components/H1";
import Schedule from "./Schedule";
import useFetchMatchs from "@/utils/hooks/DBFetch/useFetchMatchs";
import FetchFeedback from "@/components/FetchFeedback";
import { SAISON_MONTH_ORDER } from "@/utils/magicNumber";

export default function Index() {
  const { data: plannings, isLoading, error } = useFetchMatchs();

  return (
    <FetchFeedback isLoading={isLoading} error={error} data={plannings}>
      <>
        <H1>Calendrier des matchs</H1>
        <div className="flex flex-col items-center justify-center gap-10 w-full max-w-[80%] mx-auto">
          {plannings &&
            Object.keys(plannings)
              .sort((a, b) => SAISON_MONTH_ORDER.indexOf(a) - SAISON_MONTH_ORDER.indexOf(b))
              .map((month) => (
                <Schedule key={month} matchs={plannings[month]} title={month} />
              ))}
        </div>
      </>
    </FetchFeedback>
  );
}
