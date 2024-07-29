import { ReactElement } from 'react';
import ClientSideAuth from './ClientSideAuth';
import { getServerSideProps } from './ServerSideAuth';

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

// this doesnt work
export { getServerSideProps };