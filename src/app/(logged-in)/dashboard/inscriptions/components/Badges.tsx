import { Badge } from '@/components/ui/badge';
import { StatutInscription } from '@prisma/client';

export const StatusBadge = ({ statut }: { statut: StatutInscription }) => {
  switch (statut) {
    case 'EN_ATTENTE':
      return <Badge className='bg-yellow-100 text-yellow-800 hover:bg-yellow-200'>En attente</Badge>;
    case 'TRAITEE':
      return <Badge className='bg-green-100 text-green-800 hover:bg-green-200'>Traitée</Badge>;
    case 'REJETEE':
      return <Badge className='bg-red-100 text-red-800'>Rejetée</Badge>;
    default:
      return <Badge>Inconnu</Badge>;
  }
};
