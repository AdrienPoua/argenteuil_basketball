type MatchDataProps = {
  Division: string;
  "N° de match ": string;
  "Equipe 1": string;
  "Equipe 2": string;
  "Date de rencontre": string; // Format MM/DD/YYYY
  Salle: string;
};

type NewsProps = {
  id: number;
  title: string;
  date: string;
  img: string;
  url: string;
  type? : "main" | "secondary" ;
};

type NavItem = {
  title: string;
  url?: string;
  subItems?: subNavItem[];
};

type subNavItem = {
  title: string;
  url: string;
  image?: string;
};

type MenuState = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dataMenu: NavItem | null;
  setDataMenu: React.Dispatch<React.SetStateAction<NavItem | null>>;
} | null ;




export type { MatchDataProps, NewsProps, NavItem, subNavItem, MenuState};