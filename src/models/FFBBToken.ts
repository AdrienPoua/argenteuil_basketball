const endpoint = "/api/auth/ffbb/token";

interface TokenData {
  token: string;
  expiresAt: number;
}

export default class FFBBTokenUtils {
  getToken() {
    const token = localStorage.getItem("FFBB_TOKEN");
    if (token) {
      const parsedData: TokenData = JSON.parse(token);
      if (Date.now() < parsedData.expiresAt) {
        return parsedData.token;
      } else {
        localStorage.removeItem("FFBB_TOKEN");
      }
    }

    return null;
  }

  async fetchToken() {
    const response = await fetch(endpoint, {
      headers: {
        "X-Custom-Request-ID": Date.now().toString(),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }
    const token = await response.text();
    const expiresAt = Date.now() + 1 * 60 * 60 * 1000;
    const tokenData: TokenData = { token, expiresAt };
    localStorage.setItem("FFBB_TOKEN", JSON.stringify(tokenData));
    return token;
  }
}
