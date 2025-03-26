import { z } from 'zod';

export const InscriptionSchema = z.object({
  nom: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  prenom: z.string().min(2, { message: 'Le prénom doit contenir au moins 2 caractères' }),
  numero: z.string().min(10, { message: 'Le numéro de téléphone doit contenir au moins 10 caractères' }),
  email: z.string().email({ message: 'Adresse email invalide' }),
  dateNaissance: z.string().min(1, { message: 'La date de naissance est obligatoire' })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Format de date invalide',
    }),
  surclassement: z.boolean().default(false),
  Renouvellement: z.boolean().default(false),
  nouvelleLicence: z.boolean().default(false),
  mutation: z.boolean().default(false),
  RenouvellementSansMutation: z.boolean().default(false),
}).refine(
  (data) => {
    // Vérifie qu'au moins un des champs de type de licence est à true
    return data.Renouvellement || 
           data.nouvelleLicence || 
           data.mutation || 
           data.RenouvellementSansMutation;
  },
  {
    message: "Vous devez sélectionner au moins un type de licence",
    path: ["Renouvellement", "nouvelleLicence", "mutation", "RenouvellementSansMutation"], // Associe l'erreur à un champ spécifique pour l'affichage
  }
);