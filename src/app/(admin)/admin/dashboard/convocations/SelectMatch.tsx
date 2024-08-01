"use client";
import { Autocomplete, TextField, Typography, ListItem } from '@mui/material';
import { Match } from '@/utils/models';
import { AutocompleteChangeReason } from '@mui/material/Autocomplete';


type PropsType = {
    matchs: Match[];
    setSelectedMatch: (matchs: Match[]) => void;
}
export default function Index({ matchs, setSelectedMatch }: Readonly<PropsType>) {

    const handleChange = (
        event: React.SyntheticEvent,
        value: Match[],
        reason: AutocompleteChangeReason
    ) => {
        setSelectedMatch(value);
    };
    return (
        <Autocomplete
            multiple
            id="tags-standard"
            options={matchs}
            className="text-black w-[80%] m-auto mb-5"
            onChange={handleChange}
            getOptionLabel={(match) => `${match.division} - ${match.matchNumber} - ${match.teamB} - ${match.date}`}
            renderOption={(props, option) => (
                <ListItem {...props}>
                    <Typography className="text-black" >
                        {`${option.division} - ${option.matchNumber} - ${option.teamB} - ${option.date}`}
                    </Typography>
                </ListItem>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Matchs sélectionnés"
                    InputLabelProps={{
                        style: { color: 'black' }
                    }}
                />
            )}
        />
    );
}