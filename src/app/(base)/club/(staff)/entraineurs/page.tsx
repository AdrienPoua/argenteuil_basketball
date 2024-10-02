"use client";
import H1 from '@/components/H1';
import MainSection from "@/components/layouts/MainSection";
import useFetchCoachs from "@/utils/hooks/DBFetch/useFetchCoachs";
import FetchFeedback from "@/components/FetchFeedback";
import StaffCard from "../StaffCard";

export default function Index() {
  const { coachs, isLoading, error } = useFetchCoachs();
  return (
    <>
      <H1> Nos entraineurs </H1>
      <MainSection>
        <FetchFeedback isLoading={isLoading} error={error} data={coachs}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-center place-items-center p-10">
            {coachs?.map((coach) => (
              <StaffCard
                key={coach.id}
                name={coach.name}
                img={coach.img}
                email={coach.email}
                number={coach.number}
                teams={coach.teams}
                isEmailDisplayed={coach.isEmailDisplayed}
                isNumberDisplayed={coach.isNumberDisplayed}
              />
            ))}
          </div>
        </FetchFeedback>
      </MainSection>
    </>
  );
}
