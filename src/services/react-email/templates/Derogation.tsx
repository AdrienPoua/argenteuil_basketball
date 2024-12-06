import { ReactElement } from 'react';
import { Text, Section, Heading, Hr, Link } from '@react-email/components';
import { Match, Coach } from '@/models';
import Layout from './Layout';


export type PropsType = {
    match: Match,
    reason: string,
    proposition: string,
}


export default function Index({ match, reason, proposition }: Readonly<PropsType>): ReactElement {
    return (
        <Layout>
            <>
                <Header />
                <Body match={match} reason={reason} proposition={proposition} />
                <Signature />
            </>
        </Layout>
    )
}

const Header = (): ReactElement => {
    return (
        <Section >
            <Heading className="text-black text-center mb-5">  Demande de dérogation </Heading>
        </Section>
    )
}

const Body = ({ match, reason, proposition }: { match: Match, reason: string, proposition: string }): ReactElement => {
    return (
        <Section>
            <Hr />
            <Heading className="text-black text-center my-5 underline-offset-4 underline" >Match n°{match.matchNumber} - ABB vs {match.teamB} - {match.division}</Heading>
            <Hr />
            <Text className="text-black"> Raison :</Text>
            <Text className="text-white text-center"> {reason}</Text>

            {proposition && <>
                <Text className="text-black "> Nous vous proposons la solution suivante</Text>
                <Text className="text-white text-center">{proposition}</Text>
            </>}

            <Hr />
            <Text className="text-black mt-10"> Nous vous prions de bien vouloir nous donner suite à cette demande. </Text>
        </Section>
    )
}

const Signature = (): ReactElement => {
    return (
        <Section>
            <Text className='text-center text-black'> Cet email à été envoyé directement depuis notre <br /> <Link style={{ color: "#f97316", textDecoration: "underline" }} href="https://argenteuilbasketball.com"> site internet </Link>.</Text>
        </Section>
    )
}