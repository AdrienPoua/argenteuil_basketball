import { NextResponse } from "next/server";

const endpoint =
  "https://ffbbserver3.ffbb.com/ffbbserver3/api/licence/getStat.ws?idSaison=2024";
const test =
  "https://ffbbserver3.ffbb.com/ffbbserver3/api/licence/getSimple.ws?numeroLicence=VT954965";

export async function GET(req: Request) {
  try {
    const authorization = req.headers.get("Authorization");
    const token = authorization?.split(" ")[1];
    if (!authorization) {
      return NextResponse.json({ error: "Token manquant" }, { status: 401 });
    }
    const response = await fetch(test, {
      headers: {
        Authorization: `Basic ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`FFBB API error: ${response.status} - ${errorText}`);
      return NextResponse.json(
        { error: `Erreur FFBB: ${response.statusText}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error in FFBB API route:", error);
    return NextResponse.json(
      { error: "Une erreur inattendue s'est produite" },
      { status: 500 },
    );
  }
}
