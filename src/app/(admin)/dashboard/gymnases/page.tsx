"use client";
import { useQuery } from 'react-query';
const { NEXT_PUBLIC_BASEURL } = process.env;

if (!NEXT_PUBLIC_BASEURL) {
    throw new Error("NEXT_PUBLIC_BASEURL is not set");
}

import useToken from "@/hooks/useToken";
import FetchFeedBack from '@/components/FetchFeedback';

export default function Page() {
    const { token } = useToken();

    const fetchData = async () => {
        if (!token) throw new Error("Token non disponible");

        const response = await fetch(`/api/ffbb/getTerrain`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });
        return response.json();
    };

    const { data, isLoading, error } = useQuery('gymnase', fetchData, { enabled: !!token, retry : 2 });

    return (
        <FetchFeedBack isLoading={isLoading} error={error} data={data}>
            <pre>{JSON.stringify(data)}</pre>
        </FetchFeedBack>
    )
}
