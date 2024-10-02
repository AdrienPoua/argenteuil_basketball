"use client"
import { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { ModalButton } from "@/components/Buttons";
import PermanencesGuide from "./PermanencesGuide";
import { documents } from "@/utils/services/dataProcessing";



export default function Index(): ReactElement {
  const licence = documents.find((doc) => doc.title === "Demande de licence")?.url ?? "";
  return (
    <div className="flex items-center bg-white p-12 gap-2 basis-1/2 rounded-lg">
      <div className="flex flex-col justify-center items-center gap-10 ">
        <p className="text-xs md:text-base text-black"> Telechargez </p>
        <Button
          href={licence}
          download
          className="w-full"
        >
          formulaire
        </Button>
      </div>
      <div className="bg-black min-h-full py-16 px-[1px] grow flex" />
      <div className="flex flex-col justify-center items-center gap-10 basis-1/2">
        <p className="text-xs md:text-base text-black"> récuperez </p>
        <ModalButton
          text="Permanences"
          ModalContent={<PermanencesGuide />}
        />
      </div>
    </div>
  )
}
export function FormulaireContent() {
  const licence = documents.find((doc) => doc.title === "Demande de licence")?.url ?? "";
  return (
    <div className="flex items-center bg-white p-12 gap-2 basis-1/2 rounded-lg">
      <div className="flex flex-col justify-center items-center gap-10 ">
        <p className="text-xs md:text-base text-black"> Telechargez </p>
        <Button className="w-full">
          <a href={licence} download className="w-full">
            formulaire
          </a>
        </Button>
      </div>
      <div className="bg-black min-h-full py-16 px-[1px] grow flex" />
      <div className="flex flex-col justify-center items-center gap-10 basis-1/2">
        <p className="text-xs md:text-base text-black"> récuperez </p>
        <ModalButton
          text="Permanences"
          ModalContent={<PermanencesGuide />}
        />
      </div>
    </div>
  );
}