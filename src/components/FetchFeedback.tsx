import { ReactElement } from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';

export default function Feedback({ isLoading, error, data, children }: Readonly<{ isLoading: boolean, error: unknown, data: any, children: ReactElement }>): ReactElement {
    if (isLoading) {
        return <Box className="flex justify-center items-center size-full"><CircularProgress /></Box>;
    }

    if (error) {
        return <Typography variant="h1" color="error">Erreur du serveur, la base de données est inaccessible</Typography>;
    }

    if (!data) {
        return <Typography variant="h1">Aucune donnée</Typography>;
    }

    return <>
        {children}
    </>
}