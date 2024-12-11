import { NextResponse } from "next/server";
import FFBBAPI from "@/models/FFBBAPI";
import organisme from "@/data/organisme.json";

const idOrganisme = organisme[0].id;
type body = {
  ids: number[];
};
export async function POST(req: Request) {
  const FFBBApi = new FFBBAPI(req);
  try {
    const { ids } = (await req.json()) as body;
    const responses = (await Promise.all(
      ids.map(async (id) => {
        return FFBBApi.getRencontresParPoules(id);
      }),
    )) as [Rencontre[]];
    const filteredResponses = responses
      .flat()
      .filter(
        (response) =>
          response.idOrganismeEquipe1 === idOrganisme ||
          response.idOrganismeEquipe2 === idOrganisme,
      );
    return NextResponse.json(filteredResponses, { status: 200 });
  } catch (error) {
    console.error("Unexpected error in FFBB API route:", error);
    return NextResponse.json(
      {
        error: "Une erreur inattendue s'est produite",
        message: (error as Error).message,
      },
      { status: 500 },
    );
  }
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
