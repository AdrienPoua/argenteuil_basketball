type MatchDataProps = {
  Division: string;
  "N° de match ": string;
  "Equipe 1": string;
  "Equipe 2": string;
  "Date de rencontre": string; // Format MM/DD/YYYY
  Salle: string;
};

type NewsType = {
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

interface MemberType {
  name: string;
  role: string ;
  img: string;
  email: string;
  number: string;
}

interface CoachType extends MemberType {
  role: "Coach";
  team: string | string[]; // Équipe(s) du coach, peut être une chaîne ou un tableau de chaînes
}

interface LeaderType extends MemberType {
  role : "Président" | "Vice-Président" | "Trésorier" | "Secrétaire"
}


export type { MatchDataProps, NewsType, NavLinkType, NavDropdownType, MenuState, MemberType, CoachType, LeaderType};