import { Text, Link, Section } from '@react-email/components';
import { ReactElement } from 'react';


export default function Index(): ReactElement {
    return (
        <Section>
            <Text className='text-center text-black'>En cas d&apos;urgence : 06.51.26.13.79 (Adrien) ou 06.70.22.22.38 (Bass) </Text>
            <Text className='text-center text-black'> Cet email à été envoyé directement depuis notre <Link style={{ color: "#f97316", textDecoration: "underline" }} href="https://argenteuilbasketball.com"> site internet </Link>.</Text>
        </Section>
    )
}