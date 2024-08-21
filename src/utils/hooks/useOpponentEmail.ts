"use client";
import { useState, useEffect, useMemo } from "react";
import { Match } from "@/utils/models";
import { Club } from "@/utils/models";
import useFetchClubs from "@/utils/hooks/fetchDatabase/useFetchClubs";

export default function useFindEmailFromMatch(matchs: Match[]) {
  const [emails, setEmails] = useState<string[]>([]);
  const { data, isLoading, isFetching } = useFetchClubs();

  const clubs = useMemo(() => {
    return data?.map((club) => new Club(club));
  }, [data]);

  useEffect(() => {
    const findEmail = (match: Match): string => {
      const opponentFirstSixLetter = match.opponent.slice(0, 6).toLowerCase();
      const club = clubs?.find((club) => club.name.toLowerCase().startsWith(opponentFirstSixLetter));
      return club ? (club.correspondant?.email ?? club.president?.email ?? "no email on FFBB") : "Not found";
    };
    if (!isFetching && clubs) {
      const newEmails = matchs.map((match) => findEmail(match));
      setEmails(newEmails);
    }
  }, [isFetching, clubs, matchs]);

  return { emails, isLoading };
}
