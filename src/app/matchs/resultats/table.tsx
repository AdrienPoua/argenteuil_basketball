import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Ranking } from "@/models/api";

type TableProps = {
  data: Ranking;
};

export default function ClassementTable({ data }: Readonly<TableProps>): JSX.Element {
  const tableHeaders = [" ", "Equipe", "Pts", "Jo", "G", "P", "F", "Bp", "Bc", "Coeff"];
  
  return (
    <TableContainer className="w-100" component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow className="border-black border-b-2 ">
            {tableHeaders.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.teams.map((row) => {
            const isABB = row.name.toLowerCase().includes("argenteuil bb");
            return (
              <TableRow key={row.rank} className={isABB ? "bg-primary" : ""}>
                <TableCell component="th" scope="row" className="w-[1%] whitespace-nowrap font-bold">
                  {row.rank }
                </TableCell>
                <TableCell>{row.name} {isABB && row.rank <= 2 && Ranking.getJo(row) <= 3 && "🔥" }</TableCell>
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

