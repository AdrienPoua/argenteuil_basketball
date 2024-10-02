import { ReactElement } from 'react';
import Loader from '@/components/Loader';



export default function FetchFeedBack({ isLoading, error, data, children }: Readonly<{ isLoading: boolean, error: unknown, data: any, children: ReactElement }>): ReactElement {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center size-full">
                <Loader />
            </div>
        );
    }
    if (error) {
        return <h1>Erreur du serveur, la base de données est inaccessible</h1>;
    }

    if (!data) {
        return <h1>Aucune donnée</h1>;
    }

    return <>
        {children}
    </>
}




