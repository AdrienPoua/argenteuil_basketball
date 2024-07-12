import SubItemType from "@/types/SubItemType";

export type NavItemType = {
  title: string;
  subItems?: SubItemType[];
  url?: string;
};
