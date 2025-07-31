import { Info } from 'lucide-react';
import { InscriptionForm } from '@/components/forms/inscription-form';
import { DialogDescription, DialogHeader } from '@/components/ui/dialog';

type PropsType = {
  setOpen: (open: boolean) => void;
};

export function InscriptionTab({ setOpen }: PropsType) {
  return (
    <div>
      <DialogHeader className='mb-3'>
        <div className='flex flex-col items-start gap-2'>
          <div className='flex w-full items-start gap-3 rounded-md border border-yellow-200 bg-yellow-50 p-4'>
            <Info className='mt-1 shrink-0 text-yellow-500' />
            <DialogDescription className='text-sm leading-relaxed'>
              Ce formulaire vous permet d’obtenir le lien de pré-inscription. <br />
              Merci de l’utiliser uniquement pour un renouvellement de licence, <br />
              ou si le club vous a explicitement invité à le faire.
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>
      <InscriptionForm setOpen={setOpen} />
    </div>
  );
}
