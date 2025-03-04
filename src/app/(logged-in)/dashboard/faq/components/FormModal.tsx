'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import FAQForm from './Form';

export default function FormModal() {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='flex items-center gap-2'>
          <Plus size={16} />
          Ajouter une FAQ
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-lg'>
        <div className='py-4'>
          <h2 className='mb-4 text-center text-xl font-semibold'>Ajouter une nouvelle FAQ</h2>
          <FAQForm onSuccess={handleSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
