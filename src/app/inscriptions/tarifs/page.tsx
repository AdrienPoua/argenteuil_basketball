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
import { club } from "@/services/dataProcessing";
import { useRef } from "react";
import { motion } from "framer-motion";
import useVisibility from "@/hooks/useVisibility";
import { guideAnimation } from "@/animations";
import allCategories from "@/data/categories.json"

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

type TarifRowProps = {
  categorie: {
    year: string[];
    division: string;
    rate: number;
  }
};
const TarifRow = ({ categorie }: TarifRowProps) => {
  return (
    <TableRow key={categorie.division}>
      <TableCell
        component="th"
        scope="row">
        <Typography
          variant="body2"
          className="font-medium">
          {categorie.year.join(" - ")}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body2"
          className="font-medium">
          {categorie.division}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Typography
          variant="body2"
          className="font-medium">
          {categorie.rate}€
        </Typography>
      </TableCell>
    </TableRow>
  );
}

export default function TarifsPage() {
  const cardRef = useRef(null);
  const isVisible = useVisibility(cardRef);
  return (
    <Layout pageTitle={`Tarifs saison ${club.saison}`}>
      <motion.div
        ref={cardRef}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        whileHover="hover"
        variants={guideAnimation}
        transition={{ duration: 0.5 }}
      >
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHeader />
            <TableBody>
              {allCategories.map((categorie) => (
                <TarifRow
                  key={categorie.division}
                  categorie={categorie}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </motion.div>
    </Layout>
  );
}
