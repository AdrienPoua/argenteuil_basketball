"use client";
import Info from "@/components/Info";
import H1 from "@/components/H1";
import Schedule from "@/components/Schedule"
import { Box } from "@mui/material";
import { useQuery } from "react-query";
import { getMatchs } from "@/lib/mongo/controllers/matchs";
import { DBMatchType } from "@/utils/types";
import { ValidateWithZod } from "@/utils/services/dataProcessing";
import DBMatchschema from "@/lib/zod/database/MatchSchema";
import MatchAdapter from "@/utils/adapters/DBMatchs";
import Match from "@/utils/models/Match";

const fetchMatchs = async (): Promise<DBMatchType[]> => {
  const matchs = await getMatchs();
  ValidateWithZod(matchs, DBMatchschema);
  return matchs;
}

export default function Index() {
  const { data } = useQuery(['matchs'], fetchMatchs);
  const matchsByMonth = data ? Match.groupByMonth(data.map((match) => new Match(MatchAdapter(match)))) : {}

  return (
    <>
      <H1> Calendrier des matchs </H1>
      {!data || data.length < 1 ? <Info content='Rendez vous en septembre pour le début des championnats' /> :
        <Box className="flex flex-col max-w-[80%] mx-auto gap-10">
          {Object.keys(matchsByMonth).map((month) => (
            <Schedule key={month} matchs={matchsByMonth[month]} title={month} />
          ))}
        </Box>
      }</>)
}