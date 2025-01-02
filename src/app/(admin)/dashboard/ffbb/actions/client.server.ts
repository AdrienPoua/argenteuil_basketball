"use client";
import { useQuery } from "react-query";
import getPoules from "@/services/api/getPoules";
import getRencontresParPoules from "@/services/api/getRencontresParPoules";
import useToken from "@/hooks/useToken";
import getCompetitions from "@/services/api/getCompetitions";
import getCompetitionsDetails from "@/services/api/getCompetitionsDetails";

export default function useFFBB() {
  const { token } = useToken();
  const { data: poulesIDS } = useQuery(
    ["poulesID", token],
    () => getPoules(token as string),
    { enabled: !!token },
  );
  const { data: competitions } = useQuery(
    ["competitions", token],
    () => getCompetitions(token as string),
    { enabled: !!token },
  );
  const { data: matchs } = useQuery(
    ["rencontres", token],
    () => getRencontresParPoules(token as string, poulesIDS as number[]),
    { enabled: !!poulesIDS },
  );
  const { data: competitionsDetails } = useQuery(
    ["competitionsDetails", token],
    () =>
      getCompetitionsDetails(
        token as string,
        competitions?.map((compet) => compet.id) ?? [],
      ),
    { enabled: !!competitions },
  );
  return { poulesIDS, competitions, matchs, competitionsDetails };
}
