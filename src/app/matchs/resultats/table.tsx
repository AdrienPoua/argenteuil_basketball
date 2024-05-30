import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import { v4 as uuiv4 } from 'uuid';

const data = [
  { equipe: "AS St Ouen l'Aumone", pts: 40, jo: 7, g: null, p: null, f: null, bp: null, bc: null, coeff: null },
  { equipe: "Maccabi Sarcelles 2", pts: 37, jo: null, g: null, p: null, f: null, bp: null, bc: null, coeff: null },
  { equipe: "Argenteuil BB", pts: 36, jo: null, g: null, p: null, f: null, bp: null, bc: null, coeff: null },
  { equipe: "Villiers le Bel Basket 2", pts: 35, jo: null, g: null, p: null, f: null, bp: null, bc: null, coeff: null },
  { equipe: "Bouffemont AC Basket", pts: 33, jo: null, g: null, p: null, f: null, bp: null, bc: null, coeff: null },
  { equipe: "DC Tergition Menil Mery", pts: 32, jo: null, g: null, p: null, f: null, bp: null, bc: null, coeff: null },
  { equipe: "Montmagny Sports Basket", pts: 30, jo: null, g: null, p: null, f: null, bp: null, bc: null, coeff: null },
  { equipe: "US O Dezons 2", pts: 30, jo: null, g: null, p: null, f: null, bp: null, bc: null, coeff: null },
  { equipe: "CST Val d'Oise Basket 2", pts: 28, jo: null, g: null, p: null, f: null, bp: null, bc: null, coeff: null },
  { equipe: "Domont Basket", pts: 27, jo: null, g: null, p: null, f: null, bp: null, bc: null, coeff: null },
  { equipe: "O Sannois St Gratien 2", pts: 22, jo: null, g: null, p: null, f: null, bp: null, bc: null, coeff: null },
  { equipe: "BC Ermont 2", pts: 22, jo: null, g: null, p: null, f: null, bp: null, bc: null, coeff: null },
];

const ClassementTable = () => {
    const tableHeaders = ["Equipe", "Pts", "Jo", "G", "P", "F", "Bp", "Bc", "Coeff"];
  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom>Classement</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
                {tableHeaders.map((header, index) => (
                    <TableCell key={uuiv4()} >{header}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={uuiv4()}>
                <TableCell component="th" scope="row">
                  {row.equipe}
                </TableCell>
                <TableCell align="right">{row.pts}</TableCell>
                <TableCell align="right">{row.jo}</TableCell>
                <TableCell align="right">{row.g}</TableCell>
                <TableCell align="right">{row.p}</TableCell>
                <TableCell align="right">{row.f}</TableCell>
                <TableCell align="right">{row.bp}</TableCell>
                <TableCell align="right">{row.bc}</TableCell>
                <TableCell align="right">{row.coeff}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ClassementTable;
