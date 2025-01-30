import Member from '@/models/Member';
import Team from '@/models/Team';

export type PropsType = {
  data: ReturnType<Member['toPlainObject']>;
  teams: ReturnType<Team['toPlainObject']>[];
};

export type BaseCardPropsType = Omit<PropsType, 'teams'> & {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export type EditingCardPropsType = PropsType & {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};
