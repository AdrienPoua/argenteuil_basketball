import { z } from 'zod';

const GymSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  city: z.string(),
  zipcode: z.string(),
  phone: z.string(),
  img: z.string().optional(),
  available: z.array(z.string()),
});

export default GymSchema;

