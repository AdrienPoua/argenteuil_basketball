import { ReactElement } from 'react';
import { Text, Section, Heading, Link } from '@react-email/components';
import Layout from './Layout';

export type PropsType = {
    match: any
}
export default function Index({ match }: Readonly<PropsType>): ReactElement {
    const adresse = match.gym.toLowerCase().includes("guimier") ? "2 rue jean de la fontaine" : "120 rue de rochefort";
    return (
        <Layout>
            <div style={{ backgroundColor: "#2962F2", padding: "60px" }}>
                <Section>
                    <Heading className=" text-center">Convocation</Heading>
                </Section>
                <Section>
                    <Heading className=" text-center my-5 underline-offset-4 underline">Match n°{match.matchNumber} - ABB vs {match.teamB}</Heading>
                    <Text >🏀 Catégorie : {match.division}</Text>
                    <Text >🏀 Date: {match.date}</Text>
                    <Text >🏀 Heure: {match.time}</Text>
                    <Text >🏀 Lieu: {match.gym}</Text>
                    <Text >🏀 Adresse : {adresse}, 95100 Argenteuil</Text>
                </Section>
                <Section>
                    <Text className="text-center ">En cas d&apos;urgence : 06.51.26.13.79 (Adrien) ou 06.70.22.22.38 (Bass)</Text>
                    <Text className="text-center ">Cet email a été envoyé directement depuis notre <br /> <Link style={{ color: "#f97316", textDecoration: "underline" }} href="https://argenteuilbasketball.com">site internet</Link>.</Text>
                </Section>
            </div>
        </Layout>
    )
}
