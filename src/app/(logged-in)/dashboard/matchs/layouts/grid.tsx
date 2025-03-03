'use client';
import { PropsType } from '../types/grid.types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Card from '../components/Card';
import { useCardFilter } from '../actions/client.action';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import CreateMatchForm from '../components/CreateMatchForm';
import { PlusIcon } from '@radix-ui/react-icons';

export default function Grid({ matchs }: Readonly<PropsType>) {
  const { setSelectedCompetition, setPlace, displayedGames, competitions } = useCardFilter(matchs);

  return (
    <div className='flex flex-col gap-3'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='flex gap-3'>
          <Select onValueChange={setSelectedCompetition} defaultValue='ALL'>
            <SelectTrigger className='bg-foreground font-secondary text-sm'>
              <SelectValue placeholder='Select a competition' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key='ALL' value='ALL' className='font-secondary text-sm'>
                ALL
              </SelectItem>
              {competitions.map((competition) => (
                <SelectItem key={competition} value={competition} className='font-secondary text-sm'>
                  {competition}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setPlace} defaultValue='all'>
            <SelectTrigger className='bg-foreground font-secondary text-sm'>
              <SelectValue placeholder='Select a place' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key='all' value='all' className='font-secondary text-sm'>
                All
              </SelectItem>
              <SelectItem key='home' value='home' className='font-secondary text-sm'>
                Domicile
              </SelectItem>
              <SelectItem key='away' value='away' className='font-secondary text-sm'>
                Déplacement
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className='bg-primary hover:bg-primary/90'>
              <PlusIcon className='mr-2 h-4 w-4' />
              Ajouter un match
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[500px]'>
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau match</DialogTitle>
            </DialogHeader>
            <CreateMatchForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {displayedGames.map((match, index) => (
          <Card key={`${match.matchNumber}-${index}`} match={match} />
        ))}
      </div>
    </div>
  );
}
