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
    const [payload, setPayload] = useState<{ match: Match, club: string, email: string | undefined, matchNumber: string, division: string }[]>([])

    useEffect(() => {
        if (clubs) {
            const currentPayload = selectedMatchs.map((match) => {
                const email = clubs.find((club) => {
                    const distance = levenshtein.get(club.name.split("-")[0].trim(), match.teamB)
                    return distance < 10
                })?.correspondant.email
                return { club: match.teamB, email, matchNumber: match.matchNumber, division: match.division, match }
            })
            setPayload(currentPayload)
        }
    }, [clubs, selectedMatchs])

    const handleSubmit = async () => {
        setIsSending(true)
        try {
            for (const item of payload) {
                if (item.email) {
                    const convocation = render(<Convocation match={item.match} />);
                    await sendConvocation({
                        to: item.email,
                        html: convocation,
                        subject: `Convocation ${item.division} match n°${item.matchNumber}`,
                        division: item.division,
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