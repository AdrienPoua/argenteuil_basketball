import { NextResponse } from "next/server";
import FFBBAPI from "@/models/FFBBRequest";

export async function GET(req: Request) {
  const FFBBApi = new FFBBAPI(req);
  try {
    const response = await FFBBApi.getEngagementsParOrganisme();
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Unexpected error in FFBB API route:", error);
    return NextResponse.json(
      { error: "Une erreur inattendue s'est produite", message: (error as Error).message },
    );
  }
}
