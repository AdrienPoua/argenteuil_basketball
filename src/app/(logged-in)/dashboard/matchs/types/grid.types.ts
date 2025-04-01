import Match from '@/models/Match';
import { Dispatch, SetStateAction } from 'react';

export type FilterOptions = {
  competitions: string[];
  months: { value: string; label: string }[];
  selectedCompetition: string;
  place: string;
  month: string;
  showUpcomingOnly: boolean;
  setSelectedCompetition: Dispatch<SetStateAction<string>>;
  setPlace: Dispatch<SetStateAction<string>>;
  setMonth: Dispatch<SetStateAction<string>>;
  setShowUpcomingOnly: Dispatch<SetStateAction<boolean>>;
};

export type PropsType = {
  matchs: ReturnType<Match['toPlainObject']>[];
};
