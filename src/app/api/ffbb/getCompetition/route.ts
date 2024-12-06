import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const endpoint = ` https://ffbbserver3.ffbb.com/ffbbserver3/api/competition/getCompetition.ws?id=${id}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  res.status(200).json(data);
}
