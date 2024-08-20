import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";
import { Ranking } from "@/utils/models";
import { ABB } from "@/utils/services/dataProcessing";

type TableProps = {
  ranking: Ranking;
};

export default function ClassementTable({ ranking }: Readonly<TableProps>): JSX.Element {
  const tableHeaders = [" ", "Equipe", "Pts", "Jo", "G", "P", "F", "Bp", "Bc", "Coeff"];
  return (
    <TableContainer
      className="w-100 "
      component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          {tableHeaders.map((header) => (
            <TableCell key={header}>{header}</TableCell>
          ))}
          {ranking.teams.map((team) => {
            const isABB = team.name.toLowerCase().includes(ABB.name.toLowerCase());
            return (
              <TableRow
                key={team.rank}
                className={isABB ? "bg-primary" : ""}>
                <TableCell
                  component="th"
                  scope="row"
                  className="w-[1%] whitespace-nowrap font-bold">
                  {team.rank}
                </TableCell>
                <TableCell>{team.name}</TableCell>
                <TableCell>{Ranking.getPts(team)}</TableCell>
                <TableCell>{Ranking.getJo(team)}</TableCell>
                <TableCell>{Ranking.getG(team)}</TableCell>
                <TableCell>{Ranking.getP(team)}</TableCell>
                <TableCell>{Ranking.getF(team)}</TableCell>
                <TableCell>{Ranking.getBp(team)}</TableCell>
                <TableCell>{Ranking.getBc(team)}</TableCell>
                <TableCell>{Ranking.getCoeff(team)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
