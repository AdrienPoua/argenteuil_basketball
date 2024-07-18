import { z } from "zod";

const ClubSchema = z.object({
  name: z.string(),
  city: z.string(),
  address: z.string(),
  zipcode: z.string(),
  email: z.string(),
  phone: z.string(),
  logo: z.string(),
  saison: z.string(),
});

export default ClubSchema;