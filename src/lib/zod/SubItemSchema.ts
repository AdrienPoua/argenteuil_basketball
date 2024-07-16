import { z } from 'zod';

const SubItemSchema = z.object({
  title: z.string(),
  url: z.string(),
  img: z.string(),
});


export default SubItemSchema;
