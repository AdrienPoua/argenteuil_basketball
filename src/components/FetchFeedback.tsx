import { ReactElement } from 'react';
import { CircularProgress, Typography } from '@mui/material';

type FeedbackProps = {
    isLoading: boolean;
    error: unknown;
    data: any;
    children: ReactElement;
}

export default function Feedback({ isLoading, error, data, children }: Readonly<FeedbackProps>): ReactElement {
    if (isLoading) {
        return <CircularProgress />;
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