"use client";
const { NEXT_PUBLIC_BASEURL } = process.env;
import { useQuery } from 'react-query';
import organisme from "@/data/organisme.json";
import Card from "./Card";
const idOrganisme = organisme[0].id;
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

if (!NEXT_PUBLIC_BASEURL) {
    throw new Error("NEXT_PUBLIC_BASEURL is not set");
}

import useToken from "@/hooks/useToken";

const fetchPoules = async (token: string) => {
    const response = await fetch("/api/ffbb/getEngagements", {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data: Engagement[] = await response.json();
    return data.map((engagement) => engagement.idPoule);
};

const fetchRencontresParPoules = async (token: string, pouleIDS: number[]) => {
    const response = await fetch("/api/ffbb/getRencontres", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: JSON.stringify({ ids: pouleIDS }),

    });

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const data = await response.json() as Rencontre[];
    const groupedRencontres = Object.entries(Object.groupBy(data, ({ idPoule }) => idPoule));
    console.log("🚀 ~ fetchRencontresParPoules ~ groupedRencontres:", groupedRencontres)
    return groupedRencontres
};


export default function Page() {
    const { token } = useToken();
    const { data: poulesIDS } = useQuery(["poulesID", token], () => fetchPoules(token as string), { enabled: !!token });
    const { data: rencontresParPoules } = useQuery(["rencontres", token, poulesIDS], () => fetchRencontresParPoules(token as string, poulesIDS as number[]), { enabled: !!poulesIDS });

    if (!rencontresParPoules) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList>
                    {rencontresParPoules.map((poule, index) => <TabsTrigger key={index} value={index}>{poule.libelle}</TabsTrigger>)}
                </TabsList>
                <TabsContent value="account">Make changes to your account here.</TabsContent>
                <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>
            {rencontres && rencontres.map((rencontre, index) => <Card key={index} match={rencontre} />)}
        </div>
    )
}

// Type pour le niveau
interface Niveau {
    id: number;
    code: string;
    libelle: string;
}

// Type principal pour chaque engagement
interface Engagement {
    idEngagement: number;
    idOrganisme: number;
    idOrganismeCtc: number | null;
    nomEquipe: string | null;
    typeEntenteCtc: string | null;
    idLicenceCorrespondantEquipe: number;
    nomCorrespondantEquipe: string;
    adresseCorrespondantEquipe: string;
    complementAdresseCorrespondantEquipe: string;
    communeCorrespondantEquipe: string;
    telephoneFixeCorrespondantEquipe: string;
    telephoneTravailCorrespondantEquipe: string;
    telephonePortableCorrespondantEquipe: string;
    emailCorrespondantEquipe: string;
    clubPro: boolean;
    idCompetition: number;
    idPoule: number;
    numeroEquipe: string;
    niveau: Niveau | null; // Peut être null
}
type Salle = {
    id: number;
    numero: string;
    libelle: string;
};

type Rencontre = {
    id: number;
    numero: number;
    numeroJournee: number;
    idPoule: number;
    idOrganismeEquipe1: number;
    idOrganismeEquipe2: number;
    nomEquipe1: string;
    nomEquipe2: string;
    idEngagementEquipe1: number;
    idEngagementEquipe2: number;
    resultatEquipe1: number;
    resultatEquipe2: number;
    date: string; // Format "YYYY-MM-DD"
    horaire: number; // Format 24h (e.g., 2030 for 20:30)
    salle: Salle;
    penaliteEquipe1: boolean;
    penaliteEquipe2: boolean;
    forfaitEquipe1: boolean;
    forfaitEquipe2: boolean;
    defautEquipe1: boolean;
    defautEquipe2: boolean;
    validee: boolean;
    remise: boolean;
    joue: boolean;
    handicap1: number | null;
    handicap2: number | null;
    dateSaisieResultat: string; // ISO 8601
    creation: string; // ISO 8601
    modification: string; // ISO 8601
    classementPouleAssociee: number | null;
};

