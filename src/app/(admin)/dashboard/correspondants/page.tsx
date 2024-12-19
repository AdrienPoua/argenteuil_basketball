"use client";
import { ReactElement } from "react";
import { useQuery } from "react-query";
import { getClubs } from "@/database/controllers/clubs";
import Feedback from "@/components/FetchFeedback";
import Card from './Card'

export default function Index(): ReactElement {
  const { data: clubs, error, isLoading: queryLoading } = useQuery(['clubs'], async () => await getClubs());
  return (
    <Feedback data={clubs} error={error} isLoading={queryLoading}>
      <div className="container mx-auto flex flex-col gap-5 ">
        {clubs && clubs.map((club) => <Card key={club._id} data={club} />)}
      </div>
    </Feedback>
  );


}