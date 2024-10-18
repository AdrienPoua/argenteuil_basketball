import { ReactElement } from 'react';
import { Text, Section, Heading, Link } from '@react-email/components';
import { Match } from '@/utils/models';
import { gyms } from "@/utils/services/dataProcessing";
import Layout from './Layout';

export type PropsType = {
    match: Match
}


export default function Index({ match }: Readonly<PropsType>): ReactElement {
    return (
        <Layout>
            <>
                <Section >
                    <Heading className="text-black text-center">  Convocation </Heading>
                </Section>
                <Body match={match} />
                <Signature />
            </>
        </Layout>
    )
}

const Body = ({ match }: { match: Match }): ReactElement => {
    const adresse = gyms.find(gym => match.gym.toLowerCase().search(gym.name.toLowerCase()))?.address;

    return (
        <Section>
            <Heading className="text-black text-center my-5 underline-offset-4 underline" >Match n°{match.matchNumber} - ABB vs {match.teamB}</Heading>
            <Text className="text-black"> 🏀 Catégorie : {match.division}</Text>
            <Text className="text-black"> 🏀 Date: {match.date}</Text>
            <Text className="text-black"> 🏀 Heure: {match.time}</Text>
            <Text className="text-black"> 🏀 Lieu: {match.gym}</Text>
            <Text className="text-black"> 🏀 adresse : {adresse}, 95100 Argenteuil  </Text>
        </Section>
    )
}

const Signature = (): ReactElement => {
    return (
        <Section>
            <Text className='text-center text-black'>En cas d&apos;urgence : 06.51.26.13.79 (Adrien) ou 06.70.22.22.38 (Bass) </Text>
            <Text className='text-center text-black'> Cet email à été envoyé directement depuis notre <br /> <Link style={{ color: "#f97316", textDecoration: "underline" }} href="https://argenteuilbasketball.com"> site internet </Link>.</Text>
        </Section>
    )
}