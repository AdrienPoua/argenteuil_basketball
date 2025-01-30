import ABB from '@/data/club.json';
import Utils from '@/models/Utils';
import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export default function Overlay() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Contact</Button>
      </DialogTrigger>
      <DialogContent className="flex aspect-square max-w-xs flex-col items-center justify-center border-none bg-transparent bg-[url('/images/logo.png')] bg-cover bg-center bg-no-repeat sm:max-w-md">
        <Button
          className='hover:none min-w-[130%] py-3 text-background'
          onClick={() => window.open(`mailto:${ABB.email}`)}
        >
          {ABB.email}{' '}
          <span className='ms-2'>
            <Mail />{' '}
          </span>
        </Button>
        <Button
          className='hover:none min-w-[130%] py-3 text-background'
          onClick={() => {
            if (window.innerWidth < 768) window.open(`tel:${Utils.formatPhoneNumber(ABB.phone)}`);
          }}
        >
          {Utils.formatPhoneNumber(ABB.phone)}{' '}
          <span>
            {' '}
            <Phone />{' '}
          </span>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
