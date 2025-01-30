import Match from '@/models/Match';
import { z } from 'zod';
import { formSchema } from '../schemas/form.schema';

export type PropsType = {
  match: ReturnType<Match['toPlainObject']>;
  setIsEditing: (isEditing: boolean) => void;
};

export type FormValues = z.infer<typeof formSchema>;
