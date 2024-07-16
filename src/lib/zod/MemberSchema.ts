import { z } from 'zod';

const MemberSchema = z.object({
  Nom: z.string(),
  Prénom: z.string(),
  "E-mail": z.string(),
  "Date de naissance": z.string(),
  Groupement: z.string(),
  "Date de création": z.string(),
  Type: z.string(),
  Statut: z.string(),
  "Date de saisie adhérent": z.string(),
});


export default MemberSchema;
