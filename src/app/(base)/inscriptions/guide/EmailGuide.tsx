"use client"
import { Box, Typography } from "@mui/material";
import { ReactElement } from "react";

export default function Index(): ReactElement {
  return (
    <Box className="flex flex-col bg-white p-5 gap-5 min-w-[350px]">
      <Typography className="text-xs md:text-base text-black text-center">
        {" "}
        Apres avoir déposé votre formulaire, vous receverez un email de la part de{" "}
        <Box
          className="text-primary"
          component={"span"}>
          {" "}
          envoi@ffbb.com{" "}
        </Box>{" "}
      </Typography>
      <Typography className="text-xs md:text-base text-black text-center">
        {" "}
        Cela peut prendre{" "}
        <Box
          className="text-primary"
          component={"span"}>
          {" "}
          plusieurs jours à quelques semaines{" "}
        </Box>{" "}
        en fonction du délai de traitement des formulaires{" "}
      </Typography>
      <Typography className="text-xs md:text-base text-black text-center">
        {" "}
        Cet email contiendra un lien pour{" "}
        <Box
          className="text-primary"
          component={"span"}>
          {" "}
          poursuivre votre inscription{" "}
        </Box>
      </Typography>
      <Typography className="text-xs md:text-base text-black text-center">Pensez à vérifier vos courriers indésirables</Typography>
      <Typography className="bg-primary text-center" > À ce stade, vous n&apos;êtes pas licencié </Typography>
    </Box>
  );
}