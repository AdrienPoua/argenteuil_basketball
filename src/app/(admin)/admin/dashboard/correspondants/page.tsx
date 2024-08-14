"use client"
import { Box, TextField, Button } from '@mui/material';
import { ReactElement, useState } from 'react';
import { useQuery } from "react-query";
import { getClubs } from '@/lib/mongo/controllers/clubs';
import Feedback from '@/components/FetchFeedback';
import useClubs from '@/utils/hooks/useClubs';

type FieldProps = {
    club: string,
    correspondant: string,
    id: string
    firstItem?: boolean
}



export default function Index(): ReactElement {
    const { data, error, isLoading } = useQuery(['clubs'], async () => await getClubs());

    const clubs = data?.toSorted((a, b) => a.club.localeCompare(b.club))
    return (
        <Feedback data={clubs} error={error} isLoading={isLoading}>
            <Box className="flex justify-center items-center size-full">
                <Box className="flex flex-col gap-3 overflow-scroll max-h-[500px] p-10">
                    <Box className="flex gap-3">
                        <Field club={"exemple"} correspondant={"exemple"} id={""} firstItem={true} />
                    </Box>
                    {clubs?.map(({ club, correspondant, _id }) => (
                        <Field key={club} club={club} correspondant={correspondant} id={_id} />
                    ))}
                </Box>
            </Box>
        </Feedback>)
}

const Field = ({ club, correspondant, id, firstItem }: FieldProps) => {
    const [isDisabled, setIsDisabled] = useState(!firstItem)
    const [payload, setPayload] = useState({ club: club, correspondant: correspondant, id: id })
    const { add, update, erase } = useClubs(payload)

    return (
        <Box className="flex gap-3">
            <Button className={`flex items-center justify-center ${firstItem ? 'invisible' : ''}`} onClick={erase}> ❌
            </Button>
            <TextField
                disabled={isDisabled}
                label="Club"
                className='text-black'
                value={payload.club}
                InputLabelProps={{
                    style: {
                        color: 'black'
                    }
                }}
                onChange={(e) => {
                    setPayload({ ...payload, club: e.target.value })
                }}
            />
            <TextField
                disabled={isDisabled}
                label="Correspondant"
                className='text-black'
                value={payload.correspondant}
                InputLabelProps={{
                    style: {
                        color: 'black'
                    }
                }}
                onChange={(e) => {
                    setPayload({ ...payload, correspondant: e.target.value })
                }}
            />
            {firstItem ?
                <Button variant="contained" onClick={add} > Ajouter </Button>
                :
                <>
                    <Button variant="contained" onClick={() => setIsDisabled((prev) => !prev)} >Modifier</Button>
                    <Button variant="contained" onClick={update} >Valider</Button>
                </>
            }


        </Box>
    );
}