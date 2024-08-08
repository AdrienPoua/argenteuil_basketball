import { z } from "zod";
import { SubItemSchema } from "@/lib/zod";

const NavItemSchema = z.object({
  title: z.string(),
  subItems: z.array(SubItemSchema).optional(),
  href: z.string().optional(),
});

export default NavItemSchema;
