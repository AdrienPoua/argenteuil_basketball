import Member from '@/models/Member';
import Team from '@/models/Team';
import { formSchema } from '../schemas/form.schemas';
import { z } from 'zod';

export type PropsType = {
  members: ReturnType<Member['toPlainObject']>[];
  defaultValues: ReturnType<Team['toPlainObject']>;
};
