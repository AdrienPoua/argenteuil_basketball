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

type NavLinkType = {
  title: string;
  url?: string;
  subItems?: NavDropdownType[];
};

type NavDropdownType = {
  title: string;
  url: string;
  image?: string;
};

type MenuState = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dataMenu: NavLinkType | null;
  setDataMenu: React.Dispatch<React.SetStateAction<NavLinkType | null>>;
};


export type { MatchDataProps, NewsProps, NavLinkType, NavDropdownType, MenuState };