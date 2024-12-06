import organisme from "@/data/organisme.json";
import { NextRequest, NextResponse } from "next/server";
const idOrganisme = organisme[0].id;
const endpoint = `https://ffbbserver3.ffbb.com/ffbbserver3/api/competition/getEngagementsParOrganisme.ws?idOrganisme=${idOrganisme}`;

async function GET(req: NextRequest) {
  try {
    // Authorization check
    const Authorization = req.headers.get("authorization");
    if (!Authorization || !Authorization.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "You don't have access token" },
        { status: 401 },
      );
    }


    const response = await fetch(endpoint, {
      headers: {
        Authorization,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      next: { revalidate: 1209600 }, // 2 weeks in seconds
    });

    if (!response.ok) {
      throw new Error(`FFBB API responded with status: ${response.status}, and message: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching engagements:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching engagements" },
      { status: 500 },
    );
  }
}
