"use client";

import { ReactElement, useState } from "react";
import {
    Box, InputLabel,
    Select,
    MenuItem,
    Button, TextField
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useQuery } from "react-query";
import { Match } from "@/utils/models";
import { getMatchs } from "@/lib/mongo/controllers/matchs";
import { ValidateWithZod } from "@/lib/zod/utils/index";
import DBMatchschema from "@/lib/zod/schemas/database/MatchSchema";
import Adapter from '@/utils/adapters/matchs/fromDBforModel';
import { Derogation } from "@/lib/react-email/templates";
import Modal from "./Modal";
import { useDispatch } from 'react-redux';
import { open, setContent } from '@/lib/redux/slices/modal';
import Feedback from '@/components/FetchFeedback';
import Info from '@/components/Info';
const FetchAndProcess = async (): Promise<Match[]> => {
    const matchs = await getMatchs();
    ValidateWithZod(matchs, DBMatchschema);
    const MatchsModels = matchs.map((match) => new Match(Adapter(match)));
    const awayMatchs = MatchsModels.filter((match) => !match.isHome);
    return awayMatchs;
};

export default function Index(): ReactElement {
    const dispatch = useDispatch();
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
    const [reason, setReason] = useState<string>("");
    const [proposition, setProposition] = useState<string>("");
    const { data: matchs, isLoading, error } = useQuery('matchs', FetchAndProcess);

    if (matchs?.length === 0) return <Info content="Aucun match dans la base de données" />


    const handleMatchChange = (event: SelectChangeEvent) => {
        const selectedMatch = matchs?.find((match) => match.matchNumber === event.target.value) || null;
        setSelectedMatch(selectedMatch);
    };

    const handleClick = () => {
        if (selectedMatch) {
            dispatch(open());
            dispatch(setContent(<Modal match={selectedMatch} setSelectedMatch={setSelectedMatch} reason={reason} proposition={proposition} />));
        }
    }


    return (
        <Feedback data={matchs} error={error} isLoading={isLoading}>
            <Box className="flex flex-col gap-5 w-[80%] m-auto">
                <Box className="text-black flex flex-col" >
                    <InputLabel id="match-select-label" className="text-black">Match</InputLabel>
                    <Select
                        className="text-black mb-10"
                        labelId="match-select-label"
                        id="match-select"
                        label="Match"
                        value={selectedMatch?.matchNumber ?? ""}
                        onChange={handleMatchChange}

                    >
                        {matchs?.map((match) => (
                            <MenuItem className="text-black" value={match.matchNumber} key={match.matchNumber}>
                                {match.division} - {match.matchNumber} - {match.teamA} - {match.date}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField
                        className="text-black mb-10"
                        variant="outlined"
                        value={reason}
                        InputLabelProps={{ className: "text-black" }}
                        label="Raison"
                        onChange={(e) => setReason(e.target.value)}
                    />
                    <TextField
                        className="text-black mb-10"
                        variant="outlined"
                        value={proposition}
                        InputLabelProps={{ className: "text-black" }}
                        label="Proposition"
                        onChange={(e) => setProposition(e.target.value)}
                    />

                    {selectedMatch && (
                        <Derogation match={selectedMatch} reason={reason} proposition={proposition} />
                    )}
                    <Button variant="contained" color="primary" className="mt-10 w-fit mx-auto" onClick={handleClick} disabled={!selectedMatch}>Envoyer</Button>
                </Box>
            </Box>
        </Feedback>
    );
}
