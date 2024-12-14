"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Card from "./Card";
import { Badge } from '@/components/ui/badge';
import H1 from '@/components/H1';
import { useQuery } from "react-query";
import { getMatchs } from "@/database/controllers/matchs";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const months = {
  8: "Septembre",
  9: "Octobre",
  10: "Novembre",
  11: "Décembre",
  0: "Janvier",
  1: "Février",
  2: "Mars",
  3: "Avril",
  4: "Mai",
  5: "Juin"
}

export default function MatchsPage() {
  const [filter, setFilter] = useState("all");

  const { data: groupedMatchs } = useQuery(["clientsMatchs"], async () => {
    const matchs = await getMatchs();
    const datedMatchs = matchs.map(match => ({ ...match, date: new Date(match.date) }));
    return Object.groupBy(datedMatchs, (match) => match.competition);
  });
  if (!groupedMatchs) return <div>Loading...</div>
  const monthsString = Object.values(months)

  return (
    <div className="container mx-auto p-4">
      <H1>Calendrier des matchs</H1>
      <Tabs defaultValue={months[new Date().getMonth() as keyof typeof months]}>
        <TabsList className="flex flex-wrap gap-2 size-full mx-auto mb-10">
          {monthsString.map((month) => (
            <TabsTrigger key={month + month[0]} value={month} className="bg-foreground grow" onClick={() => setFilter("all")}>
              {month}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="flex justify-center gap-2 mb-10">
          <Button onClick={() => setFilter("home")} >
            Domiciles
          </Button>
          <Button onClick={() => setFilter("away")}>
            Extérieurs
          </Button>
          <Button onClick={() => setFilter("all")}>
            tous
          </Button>
        </div>
        {monthsString.map((month, index) => (
          <TabsContent key={month} value={month}>
            {Object.entries(groupedMatchs)
              .filter(([competition, matchs]) => matchs?.some((match) => match.date.getMonth() === (index + 2)))
              .map(([competition, matchs]) => {
                const filteredMatchs = matchs?.filter((match) => match.date.getMonth() === (index + 2) && match.competition === competition);
                const homeGames = filteredMatchs?.filter((match) => match.idOrganismeEquipe1 === 11851);
                const awayGames = filteredMatchs?.filter((match) => match.idOrganismeEquipe1 !== 11851);
                return (
                  (
                    <div key={competition} className="mb-5">
                      <div className={`grid gap-4 grid-cols-1 md:grid-cols-5`}>
                        <div className="">
                          <Badge className="flex justify-center items-center grow size-full text-3xl">
                            {competition}
                          </Badge>
                        </div>
                        {
                          filter === "home" ? (
                            homeGames?.map((match, index) => (
                              <Card key={match.id} match={match} />
                            ))
                          ) : filter === "away" ? (
                            awayGames?.map((match, index) => (
                              <Card key={match.id} match={match} />
                            ))
                          ) : (
                            filteredMatchs?.map((match, index) => (
                              <Card key={match.id} match={match} />
                            ))
                          )
                        }
                      </div>
                    </div>
                  )
                )
              }

              )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

