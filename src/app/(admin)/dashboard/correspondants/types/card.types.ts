import Club from '@/models/Club';

export type PropsType = {
  data: ReturnType<Club['toPlainObject']>;
};

export type CardPropsType = PropsType & {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};
