"use client";
import { Box } from '@mui/material';
import { createMatch } from '@/lib/mongo/controllers/matchs';
import Import from '@/components/Admin/ImportFile';


export default function Index() {

    return (
        <Box className="flex justify-center items-center grow">
            <Import serverAction={createMatch} />
        </Box>

    );
};
