"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, Typography } from "@mui/material";
import tarifs from "@/data/tarifs.json";
import Layout from "@/layout/main";
import { saison } from "@/data/club.json";

export default function page() {
  const header = ["Je suis né(e) en", "Ma catégorie", "Tarif"];
  return (
    <Layout pageTitle={`Tarifs saison ${saison} `}>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow className='bg-primary'>
              <TableCell>
                <Typography variant='h6' color='white'>
                  Je suis né(e) en
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6' color='white'>
                  Ma catégorie
                </Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography variant='h6' color='white'>
                  Tarif
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tarifs.map((cat) => (
              <TableRow key={cat.categorie}>
                <TableCell component='th' scope='row'>
                  <Typography variant='body2' className="font-medium">{cat.naissance.join(" - ")}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='body2' className="font-medium">{cat.categorie}</Typography>
                </TableCell>
                <TableCell align='right'>
                  <Typography variant='body2' className="font-medium">{cat.tarif}€</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}
