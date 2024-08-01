import { Container, Tailwind } from '@react-email/components';
import { ReactElement } from 'react';
import { Match } from '@/utils/models';
import Signature from './Signature';
import Header from './Header';
import Body from './Body';
import config from '@/../tailwind.config';


type PropsType = {
    match: Match,
    isModif: boolean
    isExemple?: boolean
}


export default function Index({ match, isModif, isExemple }: Readonly<PropsType>): ReactElement {
    return (
        <Tailwind
        config={config}
    >
        <Container className="bg-primary p-10">
            <div className="flex flex-col " style={{padding : "60px"}}>
                <Header isModif={isModif} />
                <Body match={match} isExemple={isExemple} />
                <Signature />
            </div>
        </Container>
    </Tailwind>
    )
}