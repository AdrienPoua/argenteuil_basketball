import { z } from "zod";
import TrainingSchema  from "@/lib/zod/schemas/models/TrainingSchema";

const TeamSchema = z.object({
  name: z.string(),
  coach: z.string().optional(),
  img: z.string().optional(),
  trainings: z.array(TrainingSchema),
  isChampionship: z.boolean().optional(),
  division: z.string().optional(),
  id: z.string().optional(),
});

export default TeamSchema;
