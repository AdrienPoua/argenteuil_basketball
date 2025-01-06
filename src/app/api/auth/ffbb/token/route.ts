const { FFBB_SERVER_USERNAME, FFBB_SERVER_PASSWORD } = process.env;
if (!FFBB_SERVER_USERNAME || !FFBB_SERVER_PASSWORD) {
  throw new Error("FFBB_SERVER_USERNAME, FFBB_SERVER_PASSWORD are not set");
}

const endpoint =
  "https://ffbbserver3.ffbb.com/ffbbserver3/api/authentication.ws";

export async function GET() {
  try {
    const rawToken = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/plain", // l'API renvoie un texte, pas une réponse JSON
        "X-Custom-Request-ID": Date.now().toString(),
      },
      body: JSON.stringify({
        userName: FFBB_SERVER_USERNAME,
        password: FFBB_SERVER_PASSWORD,
      }),
    });
    const token = await rawToken.text();
    return new Response(token, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-store",
      },
    });
  } catch (err: any) {
    console.error("🚀 Error fetching token:", err.message);

    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
