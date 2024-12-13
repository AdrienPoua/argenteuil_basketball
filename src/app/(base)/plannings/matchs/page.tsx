"use client";

import { useQuery } from 'react-query';
import { getMatchs } from "@/database/controllers/matchs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Card from "./Card";
import { z } from "zod";
import { match } from 'assert';
import { Badge } from '@/components/ui/badge';
import H1 from '@/components/H1';

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

  const groupedByCompetition = Object.groupBy(mockedMatchs, (match) => match.competition);

  return (
    <div className="container mx-auto p-4">
      <H1>Calendrier des matchs</H1>
      <Tabs defaultValue={months[new Date().getMonth() as keyof typeof months]}>
        <TabsList className="flex flex-wrap gap-2 size-fit mx-auto mb-10">
          {Object.values(months).map((month) => (
            <TabsTrigger key={month + month[0]} value={month} className="bg-foreground">
              {month}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.values(months).map((month, index) => (
          <TabsContent key={month} value={month}>
            {Object.entries(groupedByCompetition).filter(([competition, matchs]) => matchs?.some((match) => match.date.getMonth() === (index + 2))).map(([competition, matches]) =>
            (
              <div key={competition} className="mb-5">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-5">
                  <div className="grid-cols-1">
                    <Badge className="flex justify-center items-center grow size-full text-3xl">
                      {competition}
                    </Badge>
                  </div>
                  {
                    mockedMatchs.filter((match) => match.date.getMonth() === (index + 2) && match.competition === competition).map((match) => (
                      <Card key={match.id} match={match} />
                    ))
                  }
                </div>
              </div>
            )
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}


const mockedMatchs = [
  {
    id: 1,
    numero: 99999,
    numeroJournee: 1,
    idPoule: 10,
    idOrganismeEquipe1: 123,
    idOrganismeEquipe2: 456,
    nomEquipe1: "ABB",
    nomEquipe2: "Domont B",
    resultatEquipe1: 80,
    resultatEquipe2: 75,
    date: new Date("2024-12-21T20:30:00"),
    salle: "Gymnase J. GUIMIER",
    penaliteEquipe1: false,
    penaliteEquipe2: false,
    forfaitEquipe1: false,
    forfaitEquipe2: false,
    defautEquipe1: false,
    defautEquipe2: false,
    validee: true,
    remise: false,
    joue: true,
    handicap1: null,
    handicap2: null,
    dateSaisieResultat: "2024-09-21T23:00:00",
    creation: "2024-09-01T10:00:00",
    modification: "2024-09-20T15:00:00",
    classementPouleAssociee: null,
    competition: "IDF0095019"
  },
  {
    id: 1,
    numero: 99999,
    numeroJournee: 1,
    idPoule: 10,
    idOrganismeEquipe1: 123,
    idOrganismeEquipe2: 456,
    nomEquipe1: "ABB",
    nomEquipe2: "Domont B",
    resultatEquipe1: 80,
    resultatEquipe2: 75,
    date: new Date("2024-12-21T20:30:00"),
    salle: "Gymnase J. GUIMIER",
    penaliteEquipe1: false,
    penaliteEquipe2: false,
    forfaitEquipe1: false,
    forfaitEquipe2: false,
    defautEquipe1: false,
    defautEquipe2: false,
    validee: true,
    remise: false,
    joue: true,
    handicap1: null,
    handicap2: null,
    dateSaisieResultat: "2024-09-21T23:00:00",
    creation: "2024-09-01T10:00:00",
    modification: "2024-09-20T15:00:00",
    classementPouleAssociee: null,
    competition: "DM3"
  },
  {
    id: 1,
    numero: 99999,
    numeroJournee: 1,
    idPoule: 10,
    idOrganismeEquipe1: 123,
    idOrganismeEquipe2: 456,
    nomEquipe1: "ABB",
    nomEquipe2: "Domont B",
    resultatEquipe1: 80,
    resultatEquipe2: 75,
    date: new Date("2024-12-21T20:30:00"),
    salle: "Gymnase J. GUIMIER",
    penaliteEquipe1: false,
    penaliteEquipe2: false,
    forfaitEquipe1: false,
    forfaitEquipe2: false,
    defautEquipe1: false,
    defautEquipe2: false,
    validee: true,
    remise: false,
    joue: true,
    handicap1: null,
    handicap2: null,
    dateSaisieResultat: "2024-09-21T23:00:00",
    creation: "2024-09-01T10:00:00",
    modification: "2024-09-20T15:00:00",
    classementPouleAssociee: null,
    competition: "U13"
  },
  {
    id: 1,
    numero: 99999,
    numeroJournee: 1,
    idPoule: 10,
    idOrganismeEquipe1: 123,
    idOrganismeEquipe2: 456,
    nomEquipe1: "ABB",
    nomEquipe2: "Domont B",
    resultatEquipe1: 80,
    resultatEquipe2: 75,
    date: new Date("2024-12-21T20:30:00"),
    salle: "Gymnase J. GUIMIER",
    penaliteEquipe1: false,
    penaliteEquipe2: false,
    forfaitEquipe1: false,
    forfaitEquipe2: false,
    defautEquipe1: false,
    defautEquipe2: false,
    validee: true,
    remise: false,
    joue: true,
    handicap1: null,
    handicap2: null,
    dateSaisieResultat: "2024-09-21T23:00:00",
    creation: "2024-09-01T10:00:00",
    modification: "2024-09-20T15:00:00",
    classementPouleAssociee: null,
    competition: "U15"
  },
  {
    id: 1,
    numero: 99999,
    numeroJournee: 1,
    idPoule: 10,
    idOrganismeEquipe1: 123,
    idOrganismeEquipe2: 456,
    nomEquipe1: "ABB",
    nomEquipe2: "Domont B",
    resultatEquipe1: 80,
    resultatEquipe2: 75,
    date: new Date("2024-12-21T20:30:00"),
    salle: "Gymnase J. GUIMIER",
    penaliteEquipe1: false,
    penaliteEquipe2: false,
    forfaitEquipe1: false,
    forfaitEquipe2: false,
    defautEquipe1: false,
    defautEquipe2: false,
    validee: true,
    remise: false,
    joue: true,
    handicap1: null,
    handicap2: null,
    dateSaisieResultat: "2024-09-21T23:00:00",
    creation: "2024-09-01T10:00:00",
    modification: "2024-09-20T15:00:00",
    classementPouleAssociee: null,
    competition: "IDF0095019"
  },
];



