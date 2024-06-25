export type MatchDataProps = {
  Division: string;
  "N° de match": string;
  "Equipe 1": string;
  "Equipe 2": string;
  "Date de rencontre": string; // Format MM/DD/YYYY
  Salle: string;
};

export type NewsType = {
  id?: string;
  title: string;
  date: string;
  img: string;
  url: string;
  rank?: string;
  content: string[];
};

export type NavItemType = {
  title: string;
  subItems?: SubItemType[];
  url?: string;
};

export type SubItemType = { title: string; url: string; img: string };



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
  name: string;
  number: string;
  email: string;
  teams?: string[];
  img?: string;
  isEmailDisplayed?: boolean;
  isNumberDisplayed?: boolean;
  isLeader?: boolean;
  isCoach?: boolean;
  job?: string;
};

// Define the type for a gymnasium
export type GymType = {
  id?: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  lat : number;
  lng : number;
  img?: string; // Optional image property
  available: string[]; // Array of days the gym is available
};

export type TeamType = {
  name: string;
  coach?: string;
  img?: string;
  trainings: TrainingType[];
  isChampionship?: boolean;
  division?: string;
  id? : string;
};

export interface MemberType {
  Nom: string;
  Prénom: string;
  "E-mail": string;
  "Date de naissance": string;
  Groupement: string;
  "Date de création": string;
  Type: string;
  Statut: string;
  "Date de saisie adhérent": string;
}
