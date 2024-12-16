"use client"

import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Info } from 'lucide-react'

type MatchStats = {
  organisme: {
    id: number;
    libelle: string;
    code: string;
  };
  matchJoues: number;
  points: number;
  position: number;
  gagnes: number;
  perdus: number;
  nuls: number;
  pointsInitiaux: number;
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

type SortKey = keyof MatchStats | 'organisme.libelle';

interface BasketballRankingTableProps {
  teams: MatchStats[];
  userTeamId?: number;
}

const BasketballRankingTable: React.FC<BasketballRankingTableProps> = ({ teams, userTeamId }) => {
  const [sortKey, setSortKey] = useState<SortKey>('points');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedTeams = [...teams].sort((a, b) => {
    if (sortKey === 'organisme.libelle') {
      return sortOrder === 'asc'
        ? a.organisme.libelle.localeCompare(b.organisme.libelle)
        : b.organisme.libelle.localeCompare(a.organisme.libelle);
    }
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

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

  return (
    <div className="overflow-x-auto">
      <Table className=" w-fit overflow-hidden">
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
                MJ <SortIcon column="matchJoues" />
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
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTeams.map((team, index) => (
            <TableRow 
              key={team.organisme.id} 
              className={team.organisme.id === userTeamId ? "bg-primary/20" : undefined}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{team.organisme.libelle}</TableCell>
              <TableCell className="text-right">{team.matchJoues}</TableCell>
              <TableCell className="text-right">{team.gagnes}</TableCell>
              <TableCell className="text-right">{team.perdus}</TableCell>
              <TableCell className="text-right">{team.nuls}</TableCell>
              <TableCell className="text-right">{team.paniersMarques}</TableCell>
              <TableCell className="text-right">{team.paniersEncaisses}</TableCell>
              <TableCell className="text-right">{team.difference}</TableCell>
              <TableCell className="text-right font-bold">{team.points}</TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Info className="h-4 w-4" />
                        <span className="sr-only">Plus d'informations</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Quotient: {team.quotient.toFixed(2)}</p>
                      <p>Pénalités: {team.penalitesArbitrage + team.penalitesEntraineur + team.penalitesDiverses}</p>
                      <p>Forfaits: {team.nombreForfaits}</p>
                      <p>Défauts: {team.nombreDefauts}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BasketballRankingTable;

