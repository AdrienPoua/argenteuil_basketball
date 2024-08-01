import { Section, Heading } from '@react-email/components';
import { ReactElement } from 'react';

type PropsType = {
    isModif: boolean
}
export default function Index({ isModif }: Readonly<PropsType>): ReactElement {
    return (
        <Section >
            <Heading className="text-black text-center">  Bonjour </Heading>
        </Section>
    )
}