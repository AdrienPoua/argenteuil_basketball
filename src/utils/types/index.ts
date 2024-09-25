import { Coach } from '@/utils/models';
import { z } from "zod";
import { SDatabase, SFBI } from "@/lib/zod/schemas";

export namespace TDatabase {
  export type Club = z.infer<typeof SDatabase.Club>;
  export type Member = z.infer<typeof SDatabase.Member>;
  export type Match = z.infer<typeof SDatabase.Match>;
  export type Staff = z.infer<typeof SDatabase.Staff>;
  export type Leader = z.infer<typeof SDatabase.Leader>;
  export type Coach = z.infer<typeof SDatabase.Coach>;
}
export namespace TNavbar {
  export type NavItem = {
    title: string;
  };
  export type SubItem = {
    title: string;
    href: string;
    img: string;
  };
  export type ExpendableNavItem = NavItem & {
    subItems: SubItem[];
  };

  export type DirectNavItem = NavItem & {
    href: string;
  };
}

export namespace TFBI {
  export type Member = z.infer<typeof SFBI.Member>;
  export type Match = z.infer<typeof SFBI.Match>;
}
