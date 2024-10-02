import { ReactElement } from 'react';
import ClientSideAuth from './ClientSideAuth';


type PropsType = {
    children: React.ReactNode;
}

export default function Index({ children }: Readonly<PropsType>): ReactElement {
    return (
        <ClientSideAuth>
            {children}
        </ClientSideAuth>
    );
}
