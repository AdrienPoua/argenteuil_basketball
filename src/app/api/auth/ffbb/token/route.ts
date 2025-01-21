import { getServerSession } from "next-auth/next";
import { authOptions } from "@/services/nextAuth/auth";

const { FFBB_SERVER_USERNAME, FFBB_SERVER_PASSWORD } = process.env;
if (!FFBB_SERVER_USERNAME || !FFBB_SERVER_PASSWORD) {
  throw new Error("FFBB_SERVER_USERNAME, FFBB_SERVER_PASSWORD are not set");
}

const endpoint =
  "https://ffbbserver3.ffbb.com/ffbbserver3/api/authentication.ws";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const rawToken = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/plain",
        "X-Custom-Request-ID": Date.now().toString(),
        "Cache-Control": "no-store",
      },
      body: JSON.stringify({
        userName: FFBB_SERVER_USERNAME,
        password: FFBB_SERVER_PASSWORD,
      }),
      next: { revalidate: 3600 },
    });
    console.log("🚀 ~ GET ~ rawToken:", rawToken);
    const token = await rawToken.text();
    console.log("🚀 ~ GET ~ token:", token);
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
