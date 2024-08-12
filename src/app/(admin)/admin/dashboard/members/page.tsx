"use client";
import { Box } from '@mui/material';
import Import from '@/components/Admin/ImportFile';
import { createMember } from '@/lib/mongo/controllers/members';


export default function Index() {
    return (
        <Box className="flex justify-center items-center grow">
            <Import serverAction={createMember} />
        </Box>

    );
};
