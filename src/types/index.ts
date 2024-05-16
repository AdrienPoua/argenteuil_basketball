import { MemberType } from "@/types";
type MatchDataProps = {
  Division: string;
  "N° de match": string;
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
  type?: "main" | "secondary";
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

type MemberType = {
  name: string;
  email: string;
};

type CoachType = MemberType & {
  isCoach: true;
  number: string;
  img?: string;
  team: string[];
};

type LeaderType = MemberType & {
  role: string[];
  number: string;
  isLeader: true;
  img?: string;
};

type PlayerType = MemberType & {
  isPlayer: true ;
  team: string[];
  number?: string;
  img?: string;
};

type AssistantType = MemberType & {
  role: string;
  number : string;
};

type TeamType = {
  name: string;
  coach: string;
  assistant: AssistantType[];
  img: string;
  players: PlayerType[];
};

type AdherentType = MemberType | CoachType | LeaderType | PlayerType | AssistantType;

export type {
  MatchDataProps,
  NewsType,
  NavLinkType,
  NavDropdownType,
  MenuState,
  MemberType,
  CoachType,
  LeaderType,
  PlayerType,
  AdherentType,
  AssistantType,
  TeamType,
};
