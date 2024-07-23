"use client";
import { Box, Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import Input from '@mui/material/Input';
import { parseExcelToJson } from "@/lib/xlsx";
import { createMatch } from '@/lib/mongo/controllers/matchs';
import { MatchType } from '@/utils/types';





export default function Index() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (file) {
            try {
                setLoading(true);
                const jsonData: MatchType[] = await parseExcelToJson(file);
                await Promise.all(jsonData.map(match => createMatch(match)));
            } catch (error) {
                console.log(error);
            } finally {
                setFile(null);
                setLoading(false);
            }
        }
    };



    return (
        <Box className="flex justify-center items-center grow">
            <Box component="form" onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-5 max-w-full w-[800px]">
                <Input
                    type="file"
                    onChange={handleFileChange}
                    inputProps={{ 'aria-label': 'Télécharger un fichier Excel' }}
                />
                <Button type="submit" variant={loading ? "outlined" : "contained"} disabled={loading}>
                    {loading ? 'Envoi en cours' : 'Envoyer'}
                </Button>
                {loading && <CircularProgress size={24} />}
            </Box>
        </Box>

    );
};
