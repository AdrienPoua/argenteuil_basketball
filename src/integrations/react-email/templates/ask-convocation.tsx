import { Text, Section, Heading, Link, Container, Tailwind, render } from '@react-email/components';
import Match from '@/models/Match';
import config from '@/../tailwind.config';

export function Convocation({
  match,
}: Readonly<{
  match: ReturnType<Match['toPlainObject']>;
}>) {
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
            <Text>🏀 Je vous remercie de bien vouloir me la faire parvenir.</Text>
            <Text>
              🏀 Entraineur : {match.team?.coach?.name} - {match.team?.coach?.email}
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
  const html = render(<Convocation match={match} />);
  return html;
}
