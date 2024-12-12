import HTTPRequest from "./HTTPRequest";

const idOrganisme = 11851;
const codeOrganisme = "IDF0095019";
const baseEndpoint = "https://ffbbserver3.ffbb.com/ffbbserver3/api";


export default class FFBBRequest {
  private readonly _token: string;

  constructor(req: Request) {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      throw new Error("Missing Authorization header");
    }
    this._token = token;
  }

  private createRequest(
    endpoint: string,
    method: string = "GET",
    body: any = null,
  ) {
    const builder = new HTTPRequest.Builder()
      .setUrl(endpoint)
      .setMethod(method)
      .addHeader("Authorization", `Bearer ${this._token}`)
      .addHeader("Accept", "application/json")
      .addHeader("Content-Type", "application/json");

    if (body) {
      builder.setBody(body);
    }

    return builder.build();
  }

  async getCompetitions() {
    const endpoint = `${baseEndpoint}/competition/getCompetitionParOrganisme.ws?codeOrganisme=${codeOrganisme}`;
    const request = this.createRequest(endpoint);
    return request.send();
  }

  async getEngagementsParOrganisme() {
    const endpoint = `${baseEndpoint}/competition/getEngagementsParOrganisme.ws?idOrganisme=${idOrganisme}`;
    const request = this.createRequest(endpoint);
    return request.send();
  }

  async getRencontresParPoules(id: number) {
    const endpoint = `${baseEndpoint}/competition/getRencontresParPoule.ws?idPoule=${id}`;
    const request = this.createRequest(endpoint);
    return request.send();
  }
}
