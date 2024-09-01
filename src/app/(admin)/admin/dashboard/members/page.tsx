"use client";
import { Box, Typography } from '@mui/material';
import Import from '@/components/Admin/ImportFile';
import { createMember } from '@/lib/mongo/controllers/members';
import Instructions from '@/components/Instructions';


export default function Index() {
    return (
        <Box className="flex justify-center items-center grow">
            <Box className="flex flex-col gap-4 items-center">
                <Instructions className="bg-gray-100">
                    <Typography className="text-black">
                        Récuperer les membres en exportant depuis l&apos;extranet FBI
                    </Typography>
                    <Typography className="text-black">
                        Telecharger le fichier excel sur cette page afin de mettre à jour les informations des membres dans la base de données pour la saison en cours
                    </Typography>
                </Instructions>
                <Import serverAction={createMember} />
            </Box>
        </Box>

    );
};
