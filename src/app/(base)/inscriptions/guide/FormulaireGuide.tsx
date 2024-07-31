"use client"
import { Box, Typography, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ModalButton } from "@/components/Buttons";
import { ReactElement } from "react";
import PermanencesGuide from "./PermanencesGuide";
import { documents } from "@/utils/services/dataProcessing";


export default function Index(): ReactElement {
    const licence = documents.find((doc) => doc.title === "Demande de licence")?.url ?? "";
    return (
        <Box className="flex items-center bg-white p-12 gap-2 basis-1/2 rounded-lg">
            <Box className="flex flex-col justify-center items-center gap-10 ">
                <Typography className="text-xs md:text-base text-black"> Telechargez </Typography>
                <Button
                    component="a"
                    href={licence}
                    download
                    variant="contained"
                    className="w-full"
                    startIcon={<CloudUploadIcon />}
                >
                    formulaire
                </Button>
            </Box>
            <Box className="bg-black min-h-full py-16 px-[1px] grow flex" />
            <Box className="flex flex-col justify-center items-center gap-10 basis-1/2">
                <Typography className="text-xs md:text-base text-black"> récuperez </Typography>
                <ModalButton
                    text="Permanences"
                    ModalContent={<PermanencesGuide />}
                />
            </Box>
        </Box>
    )
}
export function FormulaireContent() {
  const licence = documents.find((doc) => doc.title === "Demande de licence")?.url ?? "";
  return (
    <Box className="flex items-center bg-white p-12 gap-2 basis-1/2 rounded-lg">
      <Box className="flex flex-col justify-center items-center gap-10 ">
        <Typography className="text-xs md:text-base text-black"> Telechargez </Typography>
        <Button
          component="a"
          href={licence}
          download
          variant="contained"
          className="w-full"
          startIcon={<CloudUploadIcon />}
        >
          formulaire
        </Button>
      </Box>
      <Box className="bg-black min-h-full py-16 px-[1px] grow flex" />
      <Box className="flex flex-col justify-center items-center gap-10 basis-1/2">
        <Typography className="text-xs md:text-base text-black"> récuperez </Typography>
        <ModalButton
          text="Permanences"
          ModalContent={<PermanencesGuide />}
        />
      </Box>
    </Box>
  );
}