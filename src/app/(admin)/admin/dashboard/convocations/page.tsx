"use client";
import { ReactElement, useState } from 'react';
import { useQuery } from 'react-query';
import { CircularProgress, Typography, Box } from '@mui/material';
import { getMatchs } from '@/lib/mongo/controllers/matchs';
import { ValidateWithZod } from '@/utils/services/dataProcessing';
import DBMatchschema from '@/lib/zod/schemas/database/MatchSchema';
import SelectMatch from './SelectMatch';
import Preview from './Preview';
import { Match } from '@/utils/models';
import Adapter from '@/utils/adapters/DBMatchs';

const fetchMatchs = async (): Promise<Match[]> => {
    const matchs = await getMatchs();
    ValidateWithZod(matchs, DBMatchschema);
    const allMatchs = matchs.map((match) => new Match(Adapter(match)));
    return allMatchs.filter((match) => match.isHome);
}

export default function Index(): ReactElement {
    const [selectedMatch, setSelectedMatch] = useState<Match[]>([]);
    const { data: matchs, isFetching, error } = useQuery('matchs', fetchMatchs);

    if (isFetching) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography className="text-black">Erreur du serveur, la base de données est inaccessible</Typography>;
    }

    if (!matchs || matchs.length === 0) {
        return <Typography className="text-black">Aucun match au bon format dans la base de données</Typography>;
    }

    return (
        <Box className="w-full justify-center">
            <SelectMatch matchs={matchs} setSelectedMatch={setSelectedMatch} />
            <Preview selectedMatch={selectedMatch} setSelectedMatch={setSelectedMatch} matchs={matchs}  />
        </Box>
    );
}
