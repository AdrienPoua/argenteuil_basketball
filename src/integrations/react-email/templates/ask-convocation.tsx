import { Text, Section, Heading, Link, Container, Tailwind, render } from '@react-email/components';
import Match from '@/models/Match';
import config from '@/../tailwind.config';
import TeamService from '@/services/Team';
import { Prisma } from '@prisma/client';

export function Convocation({
  match,
  teams,
}: Readonly<{
  match: ReturnType<Match['toPlainObject']>;
  teams: Prisma.TeamGetPayload<{
    include: {
      coach: true;
    };
  }>[];
}>) {
  const coach = teams.find((team) => team.championnats.includes(match.championnat))?.coach;
  return (
    <Tailwind config={config}>
      <Container cellPadding={10} style={{ padding: '60px' }}>
        <div style={{ backgroundColor: '#2962F2', padding: '60px' }}>
          <Section>
            <Heading className='text-center'>Demande de convocation - Match n°{match.matchNumber}</Heading>
          </Section>
          <Section>
            <Heading className='my-5 text-center underline underline-offset-4'> {match.nomEquipe1} vs ABB </Heading>
            <Text>🏀 Championnat : {match.championnat}</Text>
            <Text>🏀 Sauf erreur de ma part, je n&apos;ai pas reçu de convocation pour ce match.</Text>
            <Text>
              🏀 Entraineur : {coach?.name} - {coach?.email}
            </Text>
          </Section>
          <Section>
            <Text className='text-center'>
              Cet email a été envoyé directement depuis notre <br />{' '}
              <Link style={{ color: '#f97316', textDecoration: 'underline' }} href='https://argenteuilbasketball.com'>
                site internet
              </Link>
              .
            </Text>
          </Section>
        </div>
      </Container>
    </Tailwind>
  );
}

export async function getHtml(match: ReturnType<Match['toPlainObject']>) {
  const teams = await TeamService.getTeams();
  const html = render(<Convocation match={match} teams={teams} />);
  return html;
}
