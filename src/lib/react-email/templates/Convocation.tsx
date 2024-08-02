import { ReactElement } from 'react';
import { Container, Tailwind, Text, Section, Heading, Link } from '@react-email/components';
import { Match } from '@/utils/models';
import config from '@/../tailwind.config';
import { gyms } from "@/utils/services/dataProcessing";


type PropsType = {
    match: Match
    isModif: boolean
    isExemple?: boolean
}


export default function Index({ match, isModif, isExemple }: Readonly<PropsType>): ReactElement {
    return (
        <Tailwind
            config={config}
        >
            <Container className="bg-primary p-10">
                <div className="flex flex-col " style={{ padding: "60px" }}>
                    <Header />
                    <Body match={match} isExemple={isExemple} />
                    <Signature />
                </div>
            </Container>
        </Tailwind>
    )
}

const Header = (): ReactElement => {
    return (
        <Section >
            <Heading className="text-black text-center">  Convocation </Heading>
        </Section>
    )
}

const Body = ({ match, isExemple }: { match: Match, isExemple?: boolean }): ReactElement => {
    const adresse = gyms.find(gym => match.gym.toLowerCase().search(gym.name.toLowerCase()))?.address;
    if (isExemple) {
        return (
            <Section>
                <Heading className="text-black text-center my-5 mb-10 underline-offset-4 underline" >Match n°XXX - ABB vs XXX</Heading>
                <Text className="text-black"> 🏀 Catégorie : XXX</Text>
                <Text className="text-black"> 🏀 Date: XXX</Text>
                <Text className="text-black"> 🏀 Heure: XXX</Text>
                <Text className="text-black"> 🏀 Lieu: XXX</Text>
                <Text className="text-black"> 🏀 adresse : XXX </Text>
            </Section>
        )
    }
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