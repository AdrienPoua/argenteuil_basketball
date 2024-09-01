"use client";
import { ReactElement, useState } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';
import { getMatchs } from '@/lib/mongo/controllers/matchs';
import { ValidateWithZod } from '@/lib/zod/utils';
import DBMatchschema from '@/lib/zod/schemas/database/MatchSchema';
import SelectMatch from './SelectMatch';
import Preview from './Preview';
import { Match } from '@/utils/models';
import Adapter from '@/utils/adapters/matchs/fromDBforModel';
import Feedback from '@/components/FetchFeedback';
import Info from '@/components/Info';

const fetchAndProcess = async (): Promise<Match[]> => {
    const matchs = await getMatchs();
    ValidateWithZod(matchs, DBMatchschema);
    const MatchsModels = matchs.map((match) => new Match(Adapter(match)));
    return MatchsModels.filter((match) => match.isHome);
}

export default function Index(): ReactElement {
    const [selectedMatch, setSelectedMatch] = useState<Match[]>([]);
    const { data: matchs, isLoading, error } = useQuery('matchs', fetchAndProcess);
    if (matchs?.length === 0) return <Info content="Aucun match dans la base de données" />
    return (
        <Feedback data={matchs} error={error} isLoading={isLoading}>
            <Box className="w-full justify-center">
                <SelectMatch matchs={matchs as Match[]} setSelectedMatch={setSelectedMatch} />
                <Preview selectedMatch={selectedMatch} setSelectedMatch={setSelectedMatch} matchs={matchs as Match[]} />
            </Box>
        </Feedback>
    );
}
