"use client";
import { ReactElement } from "react";
import { useQuery } from "react-query";
import { getClubs } from "@/lib/mongo/controllers/clubs";
import Feedback from "@/components/FetchFeedback";
import Card from './Card'

export default function Index(): ReactElement {
  const { data: clubs, error, isLoading: queryLoading } = useQuery(['clubs'], async () => await getClubs());
  return (
    <div className="flex flex-col gap-6 justify-center items-center size-fit">
      <Feedback data={clubs} error={error} isLoading={queryLoading}>
        {clubs?.map((club) => <Card key={club._id} data={club} />)}
      </Feedback>
    </div>
  );


}