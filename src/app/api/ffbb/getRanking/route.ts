import { NextResponse } from "next/server";
import HTTPRequest from "@/models/HTTPRequest";
import { getServerSession } from "next-auth/next"; 
import { authOptions } from "@/services/nextAuth/auth";

const idOrganisme = 11851;

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const ids: number[] = JSON.parse(await req.json());
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      throw new Error("Missing Authorization header");
    }

    const responses: MatchStats[][] = await Promise.all(
      ids.map((id) => {
        const request = new HTTPRequest.Builder()
          .setUrl(
            `https://ffbbserver3.ffbb.com/ffbbserver3/api/competition/getClassementParPoule.ws?idPoule=${id}`,
          )
          .addHeader("Authorization", `Bearer ${token}`)
          .addHeader("Content-Type", "application/json")
          .addHeader("Accept", "application/json")
          .build();

        return request.send();
      }),
    );


    return NextResponse.json(responses, { status: 200 });
  } catch (error) {
    console.error("Unexpected error in getRencontres API route:", error);
    return NextResponse.json(
      {
        error: "Unexpected error in getRencontres API route:",
        message: (error as Error).message,
      },
      { status: 500 },
    );
  }
}

type MatchStats = {
  organisme: {
    id: number;
    libelle: string;
    code: string;
  };
  matchJoues: number;
  points: number;
  position: number;
  gagnes: number;
  perdus: number;
  nuls: number;
  pointsInitiaux: number;
  penalitesArbitrage: number;
  penalitesEntraineur: number;
  penalitesDiverses: number;
  nombreForfaits: number;
  nombreDefauts: number;
  paniersMarques: number;
  paniersEncaisses: number;
  quotient: number;
  difference: number;
  horsClassement: boolean;
};
