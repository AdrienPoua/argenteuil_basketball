import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"; // Import des composants Shadcn UI pour le tableau
import { Ranking } from "@/models";
import ABB from "@/data/club.json";

type TableProps = {
  ranking: Ranking;
};

export default function ClassementTable({ ranking }: Readonly<TableProps>): JSX.Element {
  const tableHeaders = ["", "Equipe", "Pts", "Jo", "G", "P", "F", "Bp", "Bc", "Coeff"];

  return (
    <div className="overflow-x-auto bg-white shadow-md">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary/10 ">
            {tableHeaders.map((header) => (
              <TableCell key={header} className="p-4 tracking-wider text-black">
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {ranking.teams.map((team) => {
            const isABB = team.name.toLowerCase().includes(ABB.name.toLowerCase());
            return (
              <TableRow key={team.rank} className={isABB ? "bg-primary text-white" : "bg-white"}>
                <TableCell className=" text-background p-4 font-bold">{team.rank}</TableCell>
                <TableCell className=" text-background p-4">{team.name}</TableCell>
                <TableCell className=" text-background p-4">{Ranking.getPts(team)}</TableCell>
                <TableCell className=" text-background p-4">{Ranking.getJo(team)}</TableCell>
                <TableCell className=" text-background p-4">{Ranking.getG(team)}</TableCell>
                <TableCell className=" text-background p-4">{Ranking.getP(team)}</TableCell>
                <TableCell className=" text-background p-4">{Ranking.getF(team)}</TableCell>
                <TableCell className=" text-background p-4">{Ranking.getBp(team)}</TableCell>
                <TableCell className=" text-background p-4">{Ranking.getBc(team)}</TableCell>
                <TableCell className=" text-background p-4">{Ranking.getCoeff(team)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
