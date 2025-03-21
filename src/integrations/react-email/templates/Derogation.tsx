import { ReactElement } from 'react';
import { Text, Section, Heading, Hr, Link, Container, Tailwind } from '@react-email/components';
import config from '../../../../tailwind.config';

export type PropsType = {
  match: any;
  reason: string;
  proposition: string;
};

export default function Index({ match, reason, proposition }: Readonly<PropsType>): ReactElement {
  return (
    <Tailwind config={config}>
      <Container cellPadding={10} style={{ padding: '60px' }}>
        <>
          <Header />
          <Body match={match} reason={reason} proposition={proposition} />
          <Signature />
        </>
      </Container>
    </Tailwind>
  );
}

const Header = (): ReactElement => {
  return (
    <Section>
      <Heading className='mb-5 text-center text-black'> Demande de dérogation </Heading>
    </Section>
  );
};

const Body = ({ match, reason, proposition }: { match: any; reason: string; proposition: string }): ReactElement => {
  return (
    <Section>
      <Hr />
      <Heading className='my-5 text-center text-black underline underline-offset-4'>
        Match n°{match.matchNumber} - ABB vs {match.teamB} - {match.division}
      </Heading>
      <Hr />
      <Text className='text-black'> Raison :</Text>
      <Text className='text-center text-white'> {reason}</Text>

      {proposition && (
        <>
          <Text className='text-black'> Nous vous proposons la solution suivante</Text>
          <Text className='text-center text-white'>{proposition}</Text>
        </>
      )}

      <Hr />
      <Text className='mt-10 text-black'> Nous vous prions de bien vouloir nous donner suite à cette demande. </Text>
    </Section>
  );
};

const Signature = (): ReactElement => {
  return (
    <Section>
      <Text className='text-center text-black'>
        {' '}
        Cet email à été envoyé directement depuis notre <br />{' '}
        <Link style={{ color: '#f97316', textDecoration: 'underline' }} href='https://argenteuilbasketball.com'>
          {' '}
          site internet{' '}
        </Link>
        .
      </Text>
    </Section>
  );
};
