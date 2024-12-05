"use client";
import { useState, useEffect } from 'react';
import { Match } from '@/utils/models';
import useFetchClubs from '@/utils/hooks/DBFetch/useFetchClubs';
import levenshtein from 'fast-levenshtein';
import sendConvocation from '@/lib/nodemailer/sendConvocationEmail';
import { render } from '@react-email/components';
import Convocation from '@/lib/react-email/templates/Convocation';


export default function useConvocation({ selectedMatchs }: Readonly<{ selectedMatchs: Match[] }>) {
    const { data: clubs, error, isLoading } = useFetchClubs()
    const [isSending, setIsSending] = useState(false)
    const [payload, setPayload] = useState<{
        match: Match, club: {
            name: string;
            correspondant: {
                name: string;
                email: string;
                number: string;
            };
            _id: string;
        }
    }[]>([])

    useEffect(() => {
        if (clubs) {
            const currentPayload = selectedMatchs.map((match) => {
                const club = clubs.find((club) => {
                    const a = club.name.split("-")[0].trim()
                    const b = match.teamB.split("-")[0].toUpperCase().trim() === "IE" ? match.teamB.split("-")[1].trim() : match.teamB.split("-")[0].trim()
                    const distance = levenshtein.get(a, b)
                    return distance < 5
                })
                if(!club) throw new Error(String(error))
                return { club, match }
            })
            setPayload(currentPayload)
        }
    }, [clubs, selectedMatchs, error])

    const handleSubmit = async () => {
        setIsSending(true)
        try {
            for (const item of payload) {
                if (item?.club?.correspondant?.email) {
                    const convocation = render(<Convocation match={item.match} />);
                    await sendConvocation({
                        to: item.club.correspondant.email,
                        html: convocation,
                        subject: `Convocation ${item.match.division} match n°${item.match.matchNumber}`,
                        division: item.match.division,
                    });
                }
            }
        } catch (error) {
            console.error("Error sending convocation emails:", error);
        } finally {
            setIsSending(false)
        }
    }

    return { data: clubs, isSending, payload, handleSubmit, error, isLoading }
}