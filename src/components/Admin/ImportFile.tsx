"use client";
import { Box, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import React, { useState, useRef, ReactElement } from 'react';
import Input from '@mui/material/Input';
import { parseExcelToJson } from "@/lib/xlsx";
import { TDatabase } from '@/utils/types';


type PropsType = {
    serverAction: (arg: any) => Promise<void>;
};

export default function Index({ serverAction }: Readonly<PropsType>): ReactElement {
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const [notification, setNotification] = useState<{ open: boolean, message: string, severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
        }
    };

    const handleClick = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        if (file) {
            try {
                setLoading(true);
                const jsonData: TDatabase.Match[] | TDatabase.Member[] = await parseExcelToJson(file);
                await Promise.all(jsonData.map(async (match) => {
                    try {
                        const plainObject = JSON.parse(JSON.stringify(match)); // Convert to plain object
                        await serverAction(plainObject);
                    } catch (error) {
                        console.error(`Erreur lors de l'exécution de la server action: ${error}`);
                        throw new Error(`Erreur lors de la création du match: ${error}`);
                    }
                }));
                setNotification({ open: true, message: 'Fichier importé avec succès.', severity: 'success' });
            } catch (error) {
                setNotification({ open: true, message: 'Erreur lors de l\'importation du fichier. Le fichier doit provenir de l\'extraction FBI. ', severity: 'error' });
                console.error('Erreur lors de l\'importation du fichier:', error);

            } finally {
                setFile(null);
                if (inputFileRef.current) {
                    inputFileRef.current.value = '';
                }
                setLoading(false);
            }
        }
    };


    return (
        <>
            <Box className="flex flex-col justify-center items-center gap-5 w-[800px]">
                <Input
                    type="file"
                    onChange={handleFileChange}
                    inputRef={inputFileRef}
                />
                <Button onClick={handleClick} variant={loading ? "outlined" : "contained"} disabled={loading}>
                    {loading ? 'Envoi en cours' : 'Envoyer'}
                </Button>
                {loading && <CircularProgress size={24} />}
            </Box>
            <Snackbar open={notification.open} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                onClose={() => setNotification({ ...notification, open: false })
                }>
                <Alert onClose={() => setNotification({ ...notification, open: false })} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </>

    );
};
