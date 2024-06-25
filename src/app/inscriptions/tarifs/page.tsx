"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Layout from "@/layouts/main";
import { club, rates } from "@/services/dataProcessing";
import { Rate } from "@/models";

const TableHeader = () => (
  <TableHead>
    <TableRow className="bg-primary">
      <TableCell>
        <Typography
          className="tracking-wider"
          color="white">
          Je suis né(e) en
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          className="tracking-wider"
          color="white">
          Ma catégorie
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Typography
          className="tracking-wider"
          color="white">
          Tarif
        </Typography>
      </TableCell>
    </TableRow>
  </TableHead>
);

const TarifRow = ({ rate }: { rate: Rate }) => (
  <TableRow key={rate.category}>
    <TableCell
      component="th"
      scope="row">
      <Typography
        variant="body2"
        className="font-medium">
        {rate.birthYear.join(" - ")}
      </Typography>
    </TableCell>
    <TableCell>
      <Typography
        variant="body2"
        className="font-medium">
        {rate.category}
      </Typography>
    </TableCell>
    <TableCell align="right">
      <Typography
        variant="body2"
        className="font-medium">
        {rate.rate}€
      </Typography>
    </TableCell>
  </TableRow>
);

export default function TarifsPage() {
  return (
    <Layout pageTitle={`Tarifs saison ${club.saison}`}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHeader />
          <TableBody>
            {rates.map((rate: Rate) => (
              <TarifRow
                key={rate.category}
                rate={rate}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}
