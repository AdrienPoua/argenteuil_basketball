"use client"
import { Box, Typography } from "@mui/material";
import { ReactElement } from "react";

export default function Index(): ReactElement {
  return (
    <Box className="flex flex-col bg-white p-5 gap-5 min-w-[350px]">
      <Typography className="text-xs md:text-base text-black text-center bg-primary"> Une fois l&apos;email reçu, cliquez sur le lien.</Typography>
      <Typography className="text-xs md:text-base text-black text-center">
        {" "}
        La{" "}
        <Box
          className="text-primary"
          component={"span"}>
          {" "}
          photo
        </Box>{" "}
        doit être récente et montrer clairement votre visage. <br />
        <Box
          className="text-primary"
          component={"span"}>
          {" "}
          Prenez simplement une photo de votre visage.{" "}
        </Box>
      </Typography>
      <Typography className="text-xs md:text-base text-black text-center">
        {" "}
        Le{" "}
        <Box
          className="text-primary"
          component={"span"}>
          {" "}
          certificat médical{" "}
        </Box>{" "}
        est nécessaire uniquement pour les personnes majeures et les mineurs surclassés. <br /> Il est valable 3 ans, doit clairement mentionner la
        pratique du
        <Box
          className="text-primary"
          component={"span"}>
          {" "}
          basketball en compétition
        </Box>
        , et doit être signé et tamponné par le médecin.
      </Typography>
      <Typography className="text-xs md:text-base text-black text-center">
        Choisissez l&apos;
        <Box
          className="text-primary"
          component={"span"}>
          assurance A{" "}
        </Box>
        , celle-ci est incluse dans le prix de la licence.
      </Typography>
      <Typography className="text-xs md:text-base text-black text-center">
        Sélectionnez{" "}
        <Box
          className="text-primary"
          component={"span"}>
          {" "}
          paiment au club{" "}
        </Box>{" "}
        comme type de paiment
      </Typography>
    </Box>
  );
}