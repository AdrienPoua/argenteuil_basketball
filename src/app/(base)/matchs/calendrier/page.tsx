"use client";
import Info from "@/components/Info";
import H1 from "@/components/H1";
import Schedule from "@/components/Schedule"
import { Box, CircularProgress } from "@mui/material";
import { useQuery } from "react-query";
import { getMatchs } from "@/lib/mongo/controllers/matchs";
import { DBMatchType } from "@/utils/types";
import { ValidateWithZod } from "@/lib/zod/utils/index"
import DBMatchschema from "@/lib/zod/schemas/database/MatchSchema";
import MatchAdapter from "@/utils/adapters/DBMatchs";
import Match from "@/utils/models/Match";

const fetchMatchs = async (): Promise<DBMatchType[]> => {
  const matchs = await getMatchs();
  ValidateWithZod(matchs, DBMatchschema);
  return matchs;
}

export default function Index() {
  const { data, isFetching } = useQuery(['matchs'], fetchMatchs);
  const matchsByMonth = data ? Match.groupByMonth(data.map((match) => new Match(MatchAdapter(match)))) : {}

  return (
    <>
      <H1> Calendrier des matchs </H1>
      {isFetching && <Box className="flex justify-center"> <CircularProgress /> </Box>
      }
      {data && data.length < 1 ? <Info content='Rendez vous en septembre pour le début des championnats' /> :
        <Box className="flex flex-col max-w-[80%] mx-auto gap-10">
          {Object.keys(matchsByMonth).map((month) => (
            <Schedule key={month} matchs={matchsByMonth[month]} title={month} />
          ))}
        </Box>
      }</>)
}