"use client";
import { useRef } from "react";
import { ABB } from "@/utils/services/dataProcessing";
import useVisibility from "@/utils/hooks/useVisibility";
import allCategories from "@/data/categories.json";
import H1 from "@/components/H1";
import MainSection from "@/components/layouts/MainSection";
import {
  Table,
  TableBody, TableCell, TableHeader,
  TableRow
} from "@/components/ui/table";

// Row Component
type TarifRowProps = {
  categorie: {
    year: string[];
    division: string;
    rate: number;
  };
};

const TarifRow = ({ categorie }: TarifRowProps) => {
  return (
    <TableRow className="border-b">
      <TableCell className="p-4">
        <span className="font-medium text-background">{categorie.year.join(" - ")}</span>
      </TableCell>
      <TableCell className="p-4">
        <span className="font-medium text-background">{categorie.division}</span>
      </TableCell>
      <TableCell className="p-4 text-right">
        <span className="font-medium text-background">{categorie.rate}€</span>
      </TableCell>
    </TableRow>
  );
};

export default function TarifsPage() {
  const cardRef = useRef(null);
  const isVisible = useVisibility(cardRef);

  return (
    <>
      <H1>{`Tarifs saison ${ABB.saison}`}</H1>
      <MainSection>
        <div
          ref={cardRef}
          className={`transition-opacity duration-500 ease-in-out transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <Table className="min-w-full table-auto">
              <TableHeader>
                <TableRow className="bg-primary text-white">
                  <TableCell className="p-4 text-left tracking-wider">Je suis né(e) en</TableCell>
                  <TableCell className="p-4 text-left tracking-wider">Ma catégorie</TableCell>
                  <TableCell className="p-4 text-right tracking-wider">Tarif</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allCategories.map((categorie) => (
                  <TarifRow key={categorie.division} categorie={categorie} />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </MainSection>
    </>
  );
}
