import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";
import { Ranking } from "@/utils/models";
import { club } from "@/utils/services/dataProcessing";
import TypingEffect from "@/components/TypingEffect";

type TableProps = {
  data: Ranking;
};

export default function ClassementTable({ data }: Readonly<TableProps>): JSX.Element {
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
          {data.teams.map((row) => {
            const isABB = row.name.toLowerCase().includes(club.name.toLowerCase());
            return (
              <TableRow
                key={row.rank}
                className={isABB ? "bg-primary" : ""}>
                <TableCell
                  component="th"
                  scope="row"
                  className="w-[1%] whitespace-nowrap font-bold">
                  {row.rank}
                </TableCell>
                {!isABB ?
                  <TableCell>{row.name}</TableCell> :
                  <TableCell>
                    <TypingEffect text={row.name} />
                  </TableCell>
                }
                <TableCell>{Ranking.getPts(row)}</TableCell>
                <TableCell>{Ranking.getJo(row)}</TableCell>
                <TableCell>{Ranking.getG(row)}</TableCell>
                <TableCell>{Ranking.getP(row)}</TableCell>
                <TableCell>{Ranking.getF(row)}</TableCell>
                <TableCell>{Ranking.getBp(row)}</TableCell>
                <TableCell>{Ranking.getBc(row)}</TableCell>
                <TableCell>{Ranking.getCoeff(row)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}