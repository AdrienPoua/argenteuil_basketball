import { Coach, Member, Leader, Player, Team } from "@/models";

export type MatchDataProps = {
  Division: string;
  "N° de match": string;
  "Equipe 1": string;
  "Equipe 2": string;
  "Date de rencontre": string; // Format MM/DD/YYYY
  Salle: string;
};

export type NewsType = {
  id: number;
  title: string;
  date: string;
  img: string;
  url: string;
  rank?: "primary" | "secondary" 
};


export type NavItemType = {
  title: string;
  subItems: SubItemType[];
};

export type SubItemType = { title: string; url: string; img: string };
type MenuState = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  subBar: NavItemType | null;
  setSubBar: React.Dispatch<React.SetStateAction<NavItemType | null>>;
};

export type MemberType = {
  name: string;
  email: string;
};

export type CoachType = MemberType & {
  isCoach: true;
  number: string;
  img: string;
  team: string[];
  isEmailDisplayed: boolean;
  isNumberDisplayed: boolean;
};

export type LeaderType = MemberType & {
  role: string[];
  number: string;
  isLeader: true;
  img: string;
  isEmailDisplayed: boolean;
  isNumberDisplayed: boolean;
};

export type PlayerType = MemberType & {
  isPlayer: true;
  team: string[];
  number?: string;
  img?: string;
};

export type AssistantType = {
  name: string;
  role: string;
};

export type TrainingType = {
  team?: string;
  day: string;
  start: string;
  end: string;
  gym: string;
};

export type PlanbyPositionType = {
  top: string;
  left: string;
  width: string;
  height: string;
};

// Define the type for days of the week

export type LeadershipType = {
  name : string;
  number: string;
  email: string;
  teams?: string[];
  img?: string;
  isEmailDisplayed?: boolean;
  isNumberDisplayed?: boolean;
  isLeader?: boolean;
  isCoach?: boolean;
  job?: string;
}


// Define the type for a gymnasium
export type GymType  = {
  id: number;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  img?: string; // Optional image property
  available: string[]; // Array of days the gym is available
};



export type TeamType = {
  name: string;
  coach?: string;
  img?: string;
  trainings: TrainingType[];
};

export type FactoryClass = Member | Coach | Leader | Player | Team;

