import Member from '@/models/Member';
import Team from '@/models/Team';

export type PropsType = {
  data: ReturnType<Member['toPlainObject']>;
  teams: ReturnType<Team['toPlainObject']>[];
};

export type BaseCardPropsType = {
  data: ReturnType<Member['toPlainObject']>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  teams: ReturnType<Team['toPlainObject']>[];
};

export type EditingCardPropsType = PropsType & {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};
