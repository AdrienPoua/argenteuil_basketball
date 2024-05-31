import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Ranking, Team } from "@/models/api";
import { Rowing } from "@mui/icons-material";

type TableProps = {
  data: Ranking;
};

const ClassementTable = ({ data }: TableProps) => {
  const tableHeaders = [" ", "Equipe", "Pts", "Jo", "G", "P", "F", "Bp", "Bc", "Coeff"];
  return (
      <TableContainer className="w-100 " component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              {tableHeaders.map((header) => (
                <TableCell key={uuidv4()}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.rankingTeams.map((row) => (
              <TableRow key={uuidv4()}>
                <TableCell component="th" scope="row"  className="w-[1%] whitespace-nowrap font-bold"> 
                  {row.rank}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{Ranking.getPts(row)}</TableCell>
                <TableCell>{Ranking.getJo(row)}</TableCell>
                <TableCell>{Ranking.getG(row)}</TableCell>
                <TableCell>{Ranking.getP(row)}</TableCell>
                <TableCell>{Ranking.getF(row)}</TableCell>
                <TableCell>{Ranking.getBp(row)}</TableCell>
                <TableCell>{Ranking.getBc(row)}</TableCell>
                <TableCell>{Ranking.getCoeff(row)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default ClassementTable;
