import { Text, Section, Heading } from '@react-email/components';
import { ReactElement } from 'react';
import { Match } from '@/utils/models';
import { gyms } from "@/utils/services/dataProcessing";



type PropsType = {
    match: Match
    isExemple?: boolean
}

export default function Index({ match, isExemple }: Readonly<PropsType>): ReactElement {
    const adresse = gyms.find(gym => match.gym.toLowerCase().search(gym.name.toLowerCase()))?.address

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
