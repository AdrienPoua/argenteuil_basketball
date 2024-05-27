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

type PlanbyConfigType = { startDate: string; endDate: string; dayWidth: number; isTimeline: boolean; };
type PlanbyChannelType = { logo: string; uuid: string; name: string; };
type PlanbyArrayProps = { slots: TrainingType[]; config: PlanbyConfigType, channels: PlanbyChannelType[] };
type PlanByEPGType = { id: string; since: string; till: string; image: string; title: string; channelUuid: string; description: string; };

type NavItemType = {
  title: string;
  subItems : SubItemType[];
};

type SubItemType = { title: string; url: string; img: string };
type MenuState = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  subBar: NavItemType | null;
  setSubBar: React.Dispatch<React.SetStateAction<NavItemType | null>>;
};

type MemberType = {
  name: string;
  email: string;
};

type CoachType = MemberType & {
  isCoach: true;
  number: string;
  img: string;
  team: string[];
};

type LeaderType = MemberType & {
  role: string[];
  number: string;
  isLeader: true;
  img: string ;
  isEmailDisplayed : boolean;
  isNumberDisplayed : boolean;
};

type PlayerType = MemberType & {
  isPlayer: true ;
  team: string[];
  number?: string;
  img?: string;
};

type AssistantType = {
  name: string;
  role: string;
};

type TrainingType = {
  team?: string;
  day: string;
  start: string;
  end: string;
  gym: string;
};

type PlanbyPositionType = {
  top: string;
  left: string;
  width: string;
  height: string;
}


type GymType = {
  name: string;
  address: string;
  img?: string;
  maps? : string;
};


type TeamType = {
  name: string;
  coach: string;
  assistant: AssistantType[];
  img : string;
  players?: PlayerType[];
  trainings : TrainingType[];
};

type AdherentType = MemberType | CoachType | LeaderType | PlayerType | AssistantType;

type API = {
  
}

export type {
  MatchDataProps,
  NewsType,
  NavItemType,
  MenuState,
  MemberType,
  CoachType,
  LeaderType,
  PlayerType,
  AdherentType,
  AssistantType,
  TeamType,
  TrainingType,
  GymType,
  PlanbyPositionType,
  SubItemType as SubItemsType,
  PlanbyConfigType,
  PlanbyChannelType,
  PlanbyArrayProps,
  PlanByEPGType,
};
