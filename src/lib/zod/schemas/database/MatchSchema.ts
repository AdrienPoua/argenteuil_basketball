import { z } from "zod";

const DBMatchSchema = z.object({
  _id: z.string().optional(), // "_id" est généralement une chaîne (ObjectId), et peut être facultatif lors de la création
  __v: z.number().optional(), // "__v" est utilisé par MongoDB pour la version du document et peut être facultatif
  date: z.string(),
  division: z.string(),
  matchNumber: z.string(),
  teamA: z.string(),
  teamB: z.string(),
  time: z.string(),
  gym: z.string().optional(),
});

export default DBMatchSchema;
