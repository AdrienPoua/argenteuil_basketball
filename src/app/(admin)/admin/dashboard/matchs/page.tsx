"use client";
import { Box, Typography } from '@mui/material';
import { createMatch } from '@/lib/mongo/controllers/matchs';
import Import from '@/components/Admin/ImportFile';
import Instruction from '@/components/Instructions';

export default function Index() {
    return (
        <Box className="flex justify-center items-center grow">
            <Box className="flex flex-col gap-4 items-center">
            <Instruction className="bg-gray-100">
                <Typography className="text-black">
                    Récuperer les matchs en exportant depuis l&apos;extranet FBI
                </Typography>
                <Typography className="text-black">
                    Modifier les horaires et les dates des matchs en fonction des dates réelles
                </Typography>
                <Typography className="text-black">
                    Telecharger le fichier excel modifier sur cette page afin de mettre à jour le calendrier sur le site
                </Typography>
            </Instruction>
            <Import serverAction={createMatch} />
            </Box>
        </Box>
    );
};
