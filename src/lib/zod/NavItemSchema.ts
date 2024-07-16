import { z } from "zod";
import { SubItemSchema } from "@/types/SubItemType";

const NavItemSchema = z.object({
  title: z.string(),
  subItems: z.array(SubItemSchema).optional(),
  url: z.string().optional(),
});

export default NavItemSchema;
