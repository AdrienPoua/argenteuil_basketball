"use client";
import H1 from '@/components/H1';
import MainSection from "@/components/layouts/MainSection";
import useFetchTeams from "@/hooks/useFetchTeam";
import FetchFeedBack from "@/components/FetchFeedback";
import Card from "./Card"

export default function TeamPage() {
  const { teams, isLoading, error } = useFetchTeams();
  return (
    <>
      <H1>Nos équipes 2024-2025</H1>
      <MainSection>
        <FetchFeedBack isLoading={isLoading} error={error} data={teams}>
          <div className="flex flex-col items-center mb-20 gap-8">
            {teams?.map((team) => (
              <Card
                key={team.id}
                data={team}
              />
            ))}
          </div>
        </FetchFeedBack>
      </MainSection>
    </>
  );
}
