import Club from '@/models/Club';

export type PropsType = {
  data: ReturnType<Club['toPlainObject']>;
};
