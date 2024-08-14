"use client"
import { Box, TextField, Button } from '@mui/material';
import { ReactElement, useState } from 'react';
import { useQuery, useQueryClient } from "react-query";
import { getClubs, createClub, updateClub, deleteClub } from '@/lib/mongo/controllers/clubs';
import Feedback from '@/components/FetchFeedback';

type FieldProps = {
    club: string,
    correspondant: string,
    id: string
    firstItem?: boolean
}

const Field = ({ club, correspondant, id, firstItem }: FieldProps) => {
    const [isDisabled, setIsDisabled] = useState(!firstItem)
    const [name, setName] = useState(club)
    const [email, setEmail] = useState(correspondant)
    const queryClient = useQueryClient()

    const add = async (): Promise<void> => {
        try {
            await createClub({ club: name, correspondant: email })
            queryClient.invalidateQueries(['clubs'])
            setName(club)
            setEmail(correspondant)
        } catch (error) {
            console.error("Erreur lors de la création du club:", error);
        }
    }
    const update = async (): Promise<void> => {
        try {
            await updateClub({ club: name, correspondant: email, id })
            queryClient.invalidateQueries(['clubs'])
            setIsDisabled(true)
        } catch (error) {
            console.error("Erreur lors de la mise à jour du club:", error);
        }
    }
    const erase = async (): Promise<void> => {
        try {
            await deleteClub(id)
            queryClient.invalidateQueries(['clubs'])
        } catch (error) {
            console.error("Erreur lors de la suppression du club:", error);
        }
    }
    return (
        <Box className="flex gap-3">
            <Button className={`flex items-center justify-center ${firstItem ? 'invisible' : ''}`} onClick={erase}> ❌
            </Button>
            <TextField
                disabled={isDisabled}
                label="Club"
                value={name}
                className='text-black'
                InputLabelProps={{
                    style: {
                        color: 'black'
                    }
                }}
                onChange={(e) => {
                    setName(e.target.value)
                }}
            />
            <TextField
                disabled={isDisabled}
                label="Correspondant"
                className='text-black'
                value={email}
                InputLabelProps={{
                    style: {
                        color: 'black'
                    }
                }}
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
            />
            {firstItem ?
                <Button variant="contained" onClick={add} > Ajouter </Button>
                :
                <><Button variant="contained" onClick={() => setIsDisabled((prev) => !prev)} >Modifier</Button>
                    <Button variant="contained" onClick={update} >Valider</Button></>
            }
        </Box>
    );
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
                    {clubs?.map(({ club, correspondant, _id }: { club: string, correspondant: string, _id: string }) => (
                        <Field key={club} club={club} correspondant={correspondant} id={_id} />
                    ))}
                </Box>
            </Box>
        </Feedback>)
}