"use client";
import H1 from '@/components/H1';
import MainSection from "@/components/layouts/MainSection";
import FetchFeedback from "@/components/FetchFeedback";
import StaffCard from "../StaffCard";
import useFetchLeaders from '@/utils/hooks/DBFetch/useFetchLeaders';

export default function Index() {
  const { leaders, isLoading, error } = useFetchLeaders();
  return (
    <>
      <H1> Nos dirigeants </H1>
      <MainSection>
        <FetchFeedback isLoading={isLoading} error={error} data={leaders}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-center place-items-center p-10">
            {leaders?.map((leader) => (
              <StaffCard
                key={leader.id}
                name={leader.name}
                img={leader.img}
                email={leader.email}
                number={leader.number}
                isEmailDisplayed={leader.isEmailDisplayed}
                isNumberDisplayed={leader.isNumberDisplayed}
                job={leader.job}
              />
            ))}
          </div>
        </FetchFeedback>
      </MainSection>
    </>
  );
}
