import { Tailwind, Container } from '@react-email/components';
import config from '@/../tailwind.config';
import { ReactElement } from 'react';

export default function Index({ children }: Readonly<{ children: ReactElement }>): ReactElement {
    return (
        <Tailwind
            config={config}
        >
            <Container className="bg-primary p-10">
                <div className="flex flex-col " style={{ padding: "60px" }}>
                    {children}
                </div>
            </Container>

        </Tailwind>
    )
}