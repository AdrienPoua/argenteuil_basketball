"use client"
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { ReactElement } from 'react';
import { useQuery } from "react-query";
import { getClubs } from '@/lib/mongo/controllers/clubs';
import Feedback from '@/components/FetchFeedback';
import useUpdate from '@/utils/hooks/scrapFFBB/useUpdate';
import Club from '@/utils/models/Club';
import Instructions from "@/components/Instructions";

export default function Index(): ReactElement {
    const { data, error, isLoading: queryLoading } = useQuery(['clubs'], async () => await getClubs());
    const clubs = data?.map(club => new Club(club))
    const { update, isLoading } = useUpdate();
    return (
        <Feedback data={data} error={error} isLoading={queryLoading}>
            <Box className="flex flex-col gap-1 justify-center items-center size-fit">
                <Instructions className="bg-gray-100">
                    <Typography className="text-black">
                        Pour l&apos;instant, la fonctionnalité pour mettre à jour les correspondants des clubs n&apos;est pas disponible.<br />
                        Elle est disponible qu&apos;en local. <br />
                        J&apos;attends la mise à jour du site de la fédération
                    </Typography>
                </Instructions>
                <Button variant="contained" disabled={isLoading} className="mb-5" onClick={update}> {isLoading ? <CircularProgress /> : "Update"} </Button>
                {
                    clubs?.map((club, index) => (
                        <Card data={club} key={club.name + index} />
                    ))
                }
            </Box>
        </Feedback>
    );
}


const Card = ({ data }: { data: Club }): ReactElement => {
    const { president, correspondant } = data;
    return (
        <Box className="flex flex-col gap-3 border-primary border-2 rounded-lg py-5 px-8 w-full">
            <Typography className="text-center text-primary text-3xl">{data.name}</Typography>
            <Box className="grid grid-cols-4 justify-center items-center gap-5" >
                {president && <Cell data={president} />}
                {correspondant && <Cell data={correspondant} />}
            </Box>
        </Box>
    );
}

const Cell = ({ data }: { data: { role: string, name: string, email: string, number: string } }): ReactElement => {
    const { role, name, email, number } = data;
    const isDisabled = email === "@" || number === "/";
    return (
        <>
            <Button variant="contained" className="text-black size-full">
                {role}
            </Button>
            <Button variant="contained" className="text-black size-full">
                {name}
            </Button>
            <Button variant="contained" disabled={isDisabled} className="text-black size-full" onClick={() => {
                window.open(`mailto:${email}`);
            }}>
                {email}
            </Button>
            <Button variant="contained" disabled={isDisabled} className="text-black size-full">
                {number}
            </Button>
        </>
    );
}