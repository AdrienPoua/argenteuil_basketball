import { Tailwind, Container } from '@react-email/components';
import config from '@/../tailwind.config';
import { ReactElement } from 'react';

export default function Index({ children }: Readonly<{ children: ReactElement }>): ReactElement {
    return (
        <Tailwind
            config={config}
        >
            <Container cellPadding={10} style={{ padding: "60px" }}>
                {children}
            </Container>
        </Tailwind>
    )
}