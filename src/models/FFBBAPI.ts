import organisme from "@/data/organisme.json";

const idOrganisme = organisme[0].id;
const codeOrganisme = organisme[0].code;
const baseEndpoint = "https://ffbbserver3.ffbb.com/ffbbserver3/api";

export default class FFBBAPI {
  private readonly _req: Request;
  private readonly _token: string;

  constructor(req: Request) {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      throw new Error("Missing Authorization header");
    }
    this._req = req;
    this._token = token;
  }

  async getCompetitions() {
    const endpoint = `${baseEndpoint}/competition/getCompetitionParOrganisme.ws?codeOrganisme=${codeOrganisme}`;
    try {
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${this._token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`FFBB API error: ${response.status} - ${errorText}`);
        throw new Error(`FFBB API responded with status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching engagements:", error);
      throw new Error((error as Error).message);
    }
  }

  async getEngagementsParOrganisme() {
    const endpoint = `${baseEndpoint}/competition/getEngagementsParOrganisme.ws?idOrganisme=${idOrganisme}`;
    try {
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${this._token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`FFBB API error: ${response.status} - ${errorText}`);
        throw new Error(`FFBB API responded with status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching engagements:", error);
      throw new Error((error as Error).message);
    }
  }

  async getRencontresParPoules(id : number) {
    const endpoint = `${baseEndpoint}/competition/getRencontresParPoule.ws?idPoule=${id}`;
    try {
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${this._token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`FFBB API error: ${response.status} - ${errorText}`);
        throw new Error(`FFBB API responded with status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching engagements:", error);
      throw new Error((error as Error).message);
    }
  }
}
