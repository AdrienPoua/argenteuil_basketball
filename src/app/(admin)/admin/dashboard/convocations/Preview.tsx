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
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const { setOpen, setContent } = useModal();
    const isSelectedMatch = selectedMatch.length > 0;
    const isMultipleMatch = selectedMatch.length > 1;
    const handleClick = () => {
        setOpen(true);
        setContent(<Modal matchs={selectedMatch} isChecked={isChecked} setSelectedMatch={setSelectedMatch} />);
    };

    return (
        <Box component='form' className="flex flex-col justify-center items-center gap-5 grow">
            <Box className="flex justify-center items-center gap-5">
                <Checkbox onChange={() => setIsChecked((prev) => !prev)} checked={isChecked} />
                <Typography variant="body2" color="textSecondary">
                    Cette convocation est une convocation modificative
                </Typography>
            </Box>
            {isSelectedMatch && <Convocation match={selectedMatch[0]} isModif={isChecked} isExemple={isMultipleMatch} />}
            <Button variant="contained" color="primary" onClick={handleClick} disabled={!isSelectedMatch}>
                Envoyer
            </Button>
        </Box >
    );
}

