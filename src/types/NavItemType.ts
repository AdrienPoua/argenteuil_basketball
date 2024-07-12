import SubItemType from '@/types/SubItemType';

export default interface NavItemType {
    title: string;
    subItems?: SubItemType[];
    url?: string;
  };