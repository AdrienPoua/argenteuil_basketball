import Team from '@/models/Team';
import Member from '@/models/Member';
import { FormSchema } from '../schemas/form.schemas';
import { z } from 'zod';

export type PropsType = {
  teams: ReturnType<Team['toPlainObject']>[];
  defaultValues?: ReturnType<Member['toPlainObject']>;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
  isModal?: boolean;
  onSuccess?: () => void;
};

export type FormSchemaType = z.infer<typeof FormSchema>;
