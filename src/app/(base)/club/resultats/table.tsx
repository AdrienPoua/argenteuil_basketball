"use client"

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from 'lucide-react'

type Organisme = {
  id: number;
  libelle: string;
  code: string;
};

type Classement = {
  organisme: Organisme;
  matchJoues: number;
  points: number;
  position: number;
  gagnes: number;
  perdus: number;
  nuls: number;
  pointsInitiaux: number | null;
  penalitesArbitrage: number;
  penalitesEntraineur: number;
  penalitesDiverses: number;
  nombreForfaits: number;
  nombreDefauts: number;
  paniersMarques: number;
  paniersEncaisses: number;
  quotient: number;
  difference: number;
  horsClassement: boolean;
};

type Competition = {
  id: number;
  nom: string;
  classements: Classement[];
};

interface CompetitionResultsTabsProps {
  competitions: Competition[];
}

type SortKey = keyof Classement | 'organisme.libelle';

const CompetitionResultsTabs: React.FC<CompetitionResultsTabsProps> = ({ competitions }) => {
  const [sortKey, setSortKey] = useState<SortKey>('points');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (column !== sortKey) return null;
    return sortOrder === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />;
  };

  const sortClassements = (classements: Classement[]) => {
    return [...classements].sort((a, b) => {
      if (sortKey === 'organisme.libelle') {
        return sortOrder === 'asc'
          ? a.organisme.libelle.localeCompare(b.organisme.libelle)
          : b.organisme.libelle.localeCompare(a.organisme.libelle);
      }
      if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };

  return (
    <Tabs defaultValue={competitions[0]?.id.toString()} className="w-full">
      <TabsList className="grid grid-cols-2 lg:grid-cols-4">
        {competitions.map((competition) => (
          <TabsTrigger key={competition.id} value={competition.id.toString()}>
            {competition.nom}
          </TabsTrigger>
        ))}
      </TabsList>
      {competitions.map((competition) => (
        <TabsContent key={competition.id} value={competition.id.toString()}>
          <h2 className="text-2xl font-bold mb-4">{competition.nom}</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Pos</TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort('organisme.libelle')} className="font-bold">
                      Équipe <SortIcon column="organisme.libelle" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button variant="ghost" onClick={() => handleSort('matchJoues')} className="font-bold">
                      J <SortIcon column="matchJoues" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button variant="ghost" onClick={() => handleSort('gagnes')} className="font-bold">
                      G <SortIcon column="gagnes" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button variant="ghost" onClick={() => handleSort('perdus')} className="font-bold">
                      P <SortIcon column="perdus" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button variant="ghost" onClick={() => handleSort('nuls')} className="font-bold">
                      N <SortIcon column="nuls" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button variant="ghost" onClick={() => handleSort('paniersMarques')} className="font-bold">
                      PM <SortIcon column="paniersMarques" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button variant="ghost" onClick={() => handleSort('paniersEncaisses')} className="font-bold">
                      PE <SortIcon column="paniersEncaisses" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button variant="ghost" onClick={() => handleSort('difference')} className="font-bold">
                      Diff <SortIcon column="difference" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button variant="ghost" onClick={() => handleSort('points')} className="font-bold">
                      Pts <SortIcon column="points" />
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortClassements(competition.classements).map((classement, index) => (
                  <TableRow key={classement.organisme.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{classement.organisme.libelle}</TableCell>
                    <TableCell className="text-right">{classement.matchJoues}</TableCell>
                    <TableCell className="text-right">{classement.gagnes}</TableCell>
                    <TableCell className="text-right">{classement.perdus}</TableCell>
                    <TableCell className="text-right">{classement.nuls}</TableCell>
                    <TableCell className="text-right">{classement.paniersMarques}</TableCell>
                    <TableCell className="text-right">{classement.paniersEncaisses}</TableCell>
                    <TableCell className="text-right">{classement.difference}</TableCell>
                    <TableCell className="text-right font-bold">{classement.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CompetitionResultsTabs;

