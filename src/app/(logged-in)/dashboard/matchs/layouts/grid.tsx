'use client';
import { PropsType } from '../types/grid.types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Card from '../components/Card';
import { useCardFilter } from '../actions/client.action';

export default function Grid({ matchs }: Readonly<PropsType>) {
  const { setSelectedCompetition, setPlace, displayedGames, competitions } = useCardFilter(matchs);
  console.log("🚀 ~ Grid ~ competitions:", competitions)
  return (
    <div className='flex flex-col gap-3'>
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
      <div className='grid grid-cols-4 gap-3'>
        {displayedGames.map((match, index) => (
          <Card key={`${match.matchNumber}-${index}`} match={match} />
        ))}
      </div>
    </div>
  );
}
