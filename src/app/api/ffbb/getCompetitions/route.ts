import { NextResponse } from "next/server";
import HTTPRequest from "@/models/HTTPRequest";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/services/nextAuth/auth";

const codeOrganisme = 11851;

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      throw new Error("Missing Authorization header");
    }

    const request = new HTTPRequest.Builder()
      .setUrl(
        `https://ffbbserver3.ffbb.com/ffbbserver3/api/competition/getCompetitionParOrganisme.ws?codeOrganisme=IDF0095019`,
        
      )
      .addHeader("Authorization", `Bearer ${token}`)
      .addHeader("Content-Type", "application/json")
      .addHeader("Accept", "application/json")
      .build();

    const response : Competition[] = await request.send();
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Unexpected error in getCompetitions API route:", error);
    return NextResponse.json(
      {
        error: "Unexpected error in getCompetitions API route:",
        message: (error as Error).message,
      },
      { status: 500 },
    );
  }
}

type Competition = {
  id: number;
  idCompetitionPere: number | null;
  nom: string;
  sexe: "M" | "F" | "X"; // Masculin, Féminin ou Mixte
  categorie: {
    id: number;
    code: string;
    libelle: string;
  };
  code: string;
  fils: Competition[]; // Liste de compétitions filles si applicable
  saison: {
    id: number;
    code: string;
    libelle: string;
    debut: string; // Format "JJ/MM/AAAA"
    fin: string; // Format "JJ/MM/AAAA"
    actif: "true" | "false";
  };
  typeCompetition: string; // Exemple : "DIV" ou "PLAT"
  liveStat: boolean;
  creationEnCours: boolean;
  publicationInternet: string; // Exemple : "AFF"
  emarqueV2: boolean;
  classification: unknown;
  organisme: {
    id: number;
    libelle: string;
    code: string;
  };
  creation: string | null; // Date ou null
  modification: string | null; // Date ou null
  etat: unknown;
  poules: {
    id: number;
    nom: string;
  }[];
  classements: unknown[]; // Liste vide ou définie par ailleurs
};
