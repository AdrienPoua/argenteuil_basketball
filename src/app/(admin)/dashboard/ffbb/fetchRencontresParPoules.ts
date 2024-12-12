import HTTPRequest from "@/models/HTTPRequest";

export default async function fetchRencontresParPoules(token: string, pouleIDS: number[]): Promise<Rencontre[]> {
    const request = new HTTPRequest.Builder()
        .setUrl("/api/ffbb/getRencontres")
        .setMethod("POST")
        .addHeader("Content-Type", "application/json")
        .addHeader("Authorization", `Bearer ${token}`)
        .setBody(JSON.stringify(pouleIDS))
        .build();

    return await request.send();
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

