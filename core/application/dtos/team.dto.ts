export interface TeamDTO {
  id: string;
  name: string;
  category: string[];
  gender: string;
  level: string;
  image?: string;
  created_at: string;
  coachsIds: string[];
  assistantsCoachIds: string[];
  sessions: SessionDTO[];
  competitions: { id: number; label: string; poules: { id: number; nom: string }[] }[];
}

export interface SessionDTO {
  id: string;
  day: string;
  start: string;
  end: string;
  gymnase_id: string;
  created_at: string;
}
