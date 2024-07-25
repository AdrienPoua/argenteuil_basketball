"use client";
import { Box, Button, TextField, InputLabel, Checkbox, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useModal } from '@/utils/contexts/Modal';
import { Match } from '@/utils/models';
import { createIndividualNotification, createGenericNotification } from "./notifys";
import Modal from "./Modal"

type PropsType = {
    matchs: Match[];
    selectedMatch: Match[];
};



export default function Index({ selectedMatch, matchs }: Readonly<PropsType>) {
    const emptyMessage = { sujet: '', message: '' };
    const [value, setValue] = useState<{ sujet: string; message: string }>(emptyMessage);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const { open, setOpen, content, setContent } = useModal();

    useEffect(() => {
        let newValue;
        if (selectedMatch.length === 0) {
            newValue = emptyMessage;
        } else if (selectedMatch.length === 1) {
            newValue = createIndividualNotification(selectedMatch[0], isChecked);
        } else if (selectedMatch.length > 1) {
            newValue = createGenericNotification(isChecked);
        } else {
            newValue = emptyMessage;
        }
        setValue(newValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMatch, isChecked]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (selectedMatch.length === 1) {
            const { value: newValue } = event.target;
            setValue((prev) => ({ ...prev, message: newValue }));
        }
    };

    return (
        <Box component='form' className="flex flex-col justify-center items-center gap-5 grow">
            <Box className="flex justify-center items-center gap-5">
                <Checkbox onChange={() => setIsChecked((prev) => !prev)} checked={isChecked} />
                <Typography variant="body2" color="textSecondary">
                    Cette convocation est une convocation modificative
                </Typography>
            </Box>
            <TextField
                label="Veuillez sélectionner un match"
                value={value.message}
                onChange={handleChange}
                className="w-[80%]"
                multiline
                rows={10}
                InputLabelProps={{
                    style: { color: 'black' }
                }}
            />
            <Button variant="contained" color="primary" onClick={() => { setOpen(true); setContent(<Modal matchs={selectedMatch} email={value} />); }} disabled={!selectedMatch.length}>
                Envoyer
            </Button>
        </Box>
    );
}

