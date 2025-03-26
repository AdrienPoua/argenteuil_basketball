import { Inscription } from "@prisma/client";

export const LicenseType = ({ inscription }: { inscription: Inscription }) => {
    switch (true) {
      case inscription.Renouvellement:
        return <span>Renouvellement</span>;
      case inscription.nouvelleLicence:
        return <span>Nouvelle</span>;
      case inscription.mutation:
        return <span>Mutation</span>;
      case inscription.RenouvellementSansMutation:
        return <span>Renouvellement sans mutation</span>;
      default:
        return <span className='italic text-gray-500'>Non spécifié</span>;
    }
  };
  