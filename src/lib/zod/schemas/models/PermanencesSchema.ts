import { z } from "zod";

const slotSchema = z.object({
  day: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

const PermanencesSchema = z.object({
  start: z.string(),
  end: z.string(),
  slots: z.array(slotSchema),
  place: z.string(),
});

export default PermanencesSchema;
