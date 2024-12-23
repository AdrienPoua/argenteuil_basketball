"use client";
import H1 from '@/components/H1';
import MainSection from "@/components/layouts/MainSection";
import useFetchTeams from "@/hooks/useFetchTeam";
import FetchFeedBack from "@/components/FetchFeedback";
import Card from "./Card"
import { useQuery } from 'react-query';
import { getTeams } from '@/database/services/Team';

export default function TeamPage() {
  const { data: teams, isLoading, error, isFetching } = useQuery(["teams"], () => getTeams());
  if (!teams) return <div> Loading </div>
  <>
    <H1>Nos équipes 2024-2025</H1>
    <MainSection>
      <div className="flex flex-col items-center mb-20 gap-8">
        {teams?.map((team) => (
          <Card
            key={team.id}
            data={team}
          />
        ))}
      </div>
    </MainSection>
  </>
  );
}
