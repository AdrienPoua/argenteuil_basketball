"use client";
import { Box, TextField, Button, LinearProgress, Alert, Snackbar } from '@mui/material';
import React, { useState, useCallback } from 'react';
import { MatchType } from '@/utils/types';
import { createMatch } from '@/lib/mongo/controllers/matchs';

const Notif = ({ isOpen, isSuccess, onClose }: { isOpen: boolean, isSuccess: boolean, onClose: () => void }) => {
    const errorMessage = "ERREUR : ajout des membres échoués";
    const successMessage = "Les membres ont été ajoutés dans la database";

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={6000}
            onClose={onClose}
        >
            <Alert onClose={onClose} severity={isSuccess ? "success" : "error"} sx={{ width: '100%' }}>
                {isSuccess ? successMessage : errorMessage}
            </Alert>
        </Snackbar>
    );
};



const Input = () => {
    const [inputValue, setInputValue] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);

    const createInDatabase = useCallback(async (data: string) => {
        const arrayOfMatchs: MatchType[] = JSON.parse(data);
        try {
            for (const match of arrayOfMatchs) {
                await createMatch(match);
            }
        } catch (error) {
            console.error("Erreur lors de la création des membres", error);
            throw error;
        }
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        try {
            await createInDatabase(inputValue);
            setIsSuccess(true);
        } catch (error) {
            setIsSuccess(false);
        } finally {
            setIsNotifOpen(true);
            setIsSending(false);
        }
    }, [inputValue, createInDatabase]);


    return (
        <Box component="form" onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-5 max-w-full w-[800px]">
            <TextField
                label="Entrez les données issues de FBI sous forme de tableau JSON"
                multiline
                rows={10}
                required
                autoComplete="off"
                variant="outlined"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-white"
            />
            <Button type="submit" variant="contained" color="primary" disabled={isSending}>
                {isSending ? "Envoi en cours..." : "Envoyer"}
            </Button>
            {isSending && (
                <Box className="w-full">
                    <LinearProgress color='primary' />
                </Box>
            )}
            <Notif
                isOpen={isNotifOpen}
                isSuccess={isSuccess}
                onClose={() => setIsNotifOpen(false)}
            />
        </Box>
    );
};

export default function Setting() {
    return (
        <Box className="flex justify-center items-center grow">
            <Input />
        </Box>
    );
}