"use client";
import { Box, Button, Checkbox, Typography } from '@mui/material';
import { useState } from 'react';
import { useModal } from '@/utils/contexts/Modal';
import { Match } from '@/utils/models';
import Modal from "./Modal";
import { Convocation } from '@/lib/react-email/templates';

type PropsType = {
    matchs: Match[];
    selectedMatch: Match[];
    setSelectedMatch: (match: Match[]) => void;
};



export default function Index({ selectedMatch, setSelectedMatch }: Readonly<PropsType>) {
    const emptyMessage = { sujet: '', message: '' };
    const [value, setValue] = useState<{ sujet: string; message: string }>(emptyMessage);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const { setOpen, setContent } = useModal();



    return (
        <Box component='form' className="flex flex-col justify-center items-center gap-5 grow">
            <Box className="flex justify-center items-center gap-5">
                <Checkbox onChange={() => setIsChecked((prev) => !prev)} checked={isChecked} />
                <Typography variant="body2" color="textSecondary">
                    Cette convocation est une convocation modificative
                </Typography>
            </Box>
            {selectedMatch.length > 0 && <Convocation match={selectedMatch[0]} isModif={isChecked} isExemple={selectedMatch.length > 1} />}
            <Button variant="contained" color="primary" onClick={() => { setOpen(true); setContent(<Modal matchs={selectedMatch} email={value} isChecked={isChecked} setSelectedMatch={setSelectedMatch} />) }} disabled={!selectedMatch.length}>
                Envoyer
            </Button>
        </Box>
    );
}

