"use client"
import { Box, Typography } from "@mui/material";
import { ReactElement } from "react";

export default function Index(): ReactElement {
    return (
        <Box className="flex flex-col bg-white p-5 gap-5 min-w-[350px]">
            <Typography className="text-xs md:text-base text-black text-center bg-primary"> Nous validons votre licence</Typography>
            <Typography className="text-xs md:text-base text-black text-center">
                Cette étape est
                <Box
                    className="text-primary"
                    component={"span"}>
                    {" "}
                    réalisée par le club
                </Box>
                , vous n&apos;avez rien à faire.
            </Typography>
            <Typography className="text-xs md:text-base text-black text-center">
                {" "}
                Cependant, si vous avez mal rempli une étape, vous serez{" "}
                <Box
                    className="text-primary"
                    component={"span"}>
                    {" "}
                    contacté pour la corriger
                </Box>
            </Typography>
            <Typography className="text-xs md:text-base text-black text-center">
                {" "}
                Vous recevrez un email de confirmation de la part la{" "}
                <Box
                    className="text-primary"
                    component={"span"}>
                    {" "}
                    la ffbb
                </Box>
            </Typography>
        </Box>
    );
}
