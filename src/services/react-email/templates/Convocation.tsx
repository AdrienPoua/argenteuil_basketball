import { Text, Section, Heading, Link, Container, Tailwind, render } from '@react-email/components';
import Match from '@/models/Match';
import config from '@/../tailwind.config';
import { TeamService } from '@/database/services/Team';
import { Prisma } from '@prisma/client';

export function Convocation({ match, teams }: Readonly<{ match: ReturnType<Match["toPlainObject"]>, teams: Prisma.TeamGetPayload<{
    include: {
        coach: true
    }
}>[] }>) {
    const adresse = match.salle?.toLowerCase().includes("guimier") ? "2 rue jean de la fontaine" : "120 rue de rochefort";
    const coach = teams.find(team => team.championnats.includes(match.championnat))?.coach
    return (
        <Tailwind
            config={config}
        >
            <Container cellPadding={10} style={{ padding: "60px" }}>
                <div style={{ backgroundColor: "#2962F2", padding: "60px" }}>
                    <Section>
                        <Heading className=" text-center">Convocation - Match n°{match.matchNumber}</Heading>
                    </Section>
                    <Section>
                        <Heading className=" text-center my-5 underline-offset-4 underline"> ABB vs {match.nomEquipe2}</Heading>
                        <Text >🏀 Championnat : {match.championnat}</Text>
                        <Text >🏀 Date: {match.formatedDate}</Text>
                        <Text >🏀 Heure: {match.heure}</Text>
                        <Text >🏀 Lieu: {match.salle}</Text>
                        <Text >🏀 Adresse : {adresse}, 95100 Argenteuil</Text>
                        <Text >🏀 Entraineur : {coach?.name} - {coach?.email}</Text>
                    </Section>
                    <Section>
                        <Text className="text-center ">Pour une demande de dérogation, mettre en copie l&apos;entraineur</Text>
                        <Text className="text-center ">En cas d&apos;urgence : 06.51.26.13.79 (Adrien) ou 06.70.22.22.38 (Bass)</Text>
                        <Text className="text-center ">Cet email a été envoyé directement depuis notre <br /> <Link style={{ color: "#f97316", textDecoration: "underline" }} href="https://argenteuilbasketball.com">site internet</Link>.</Text>
                    </Section>
                </div>
            </Container>
        </Tailwind>
    )
}

export async function getHtml(match: ReturnType<Match["toPlainObject"]>) {
    const teams = await new TeamService().getTeams();
    const html = render(<Convocation match={match} teams={teams} />);
    return html;
}
