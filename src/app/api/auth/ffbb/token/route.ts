import {
    FFBB_SERVER_USERNAME,
    FFBB_SERVER_PASSWORD,
    FFBB_SERVER_API
} from "@/config/env";

export async function GET() {
  try {
    const token = await fetch(
      `${FFBB_SERVER_API}/authentication.ws`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json", // Indique que nous attendons une réponse JSON
        },
        body: JSON.stringify({
          userName: FFBB_SERVER_USERNAME,
          password: FFBB_SERVER_PASSWORD,
        }),
      },
    );

    return token;
  } catch (err: any) {
    console.error("🚀 Error fetching token:", err.message);

    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
