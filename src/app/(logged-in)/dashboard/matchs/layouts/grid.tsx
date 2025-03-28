'use client';
import { PropsType } from '../types/grid.types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Card from '../components/Card';
import { useCardFilter } from '../actions/client.action';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import CreateMatchForm from '../components/CreateMatchForm';
import { PlusIcon } from '@radix-ui/react-icons';
import { CalendarIcon, RefreshCw } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import saveMatchsToDatabase from '@/actions/fetchs/database/upsertMatchsFromFFBB';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { connectedUserAction } from '@/lib/actions/connectedUserAction';

export default function Grid({ matchs }: Readonly<PropsType>) {
  const {
    setSelectedCompetition,
    setPlace,
    setMonth,
    setShowUpcomingOnly,
    showUpcomingOnly,
    displayedGames,
    competitions,
    months,
  } = useCardFilter(matchs);
  
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      const result = await connectedUserAction(saveMatchsToDatabase);
      
      if (result.success) {
        toast({
          title: 'Les matchs ont été rafraîchis avec succès',
          description: 'Vous avez maintenant les matchs les plus récents',
          variant: 'success',
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast({
          title: 'Erreur',
          description: 'Une erreur est survenue lors du rafraîchissement des matchs',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors du rafraîchissement des matchs',
        variant: 'destructive',
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex min-w-fit flex-col gap-2 sm:flex-row sm:gap-3'>
          <Select onValueChange={setSelectedCompetition} defaultValue='ALL'>
            <SelectTrigger className='w-full min-w-[200px] bg-foreground font-secondary text-sm shadow-sm transition-colors hover:bg-foreground/90'>
              <SelectValue placeholder='Sélectionner une compétition' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key='ALL' value='ALL' className='font-secondary text-sm'>
                Toutes les compétitions
              </SelectItem>
              {competitions.map((competition) => (
                <SelectItem key={competition} value={competition} className='font-secondary text-sm'>
                  {competition}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setPlace} defaultValue='all'>
            <SelectTrigger className='w-full min-w-[180px] bg-foreground font-secondary text-sm shadow-sm transition-colors hover:bg-foreground/90'>
              <SelectValue placeholder='Sélectionner un lieu' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key='all' value='all' className='font-secondary text-sm'>
                Tous les lieux
              </SelectItem>
              <SelectItem key='home' value='home' className='font-secondary text-sm'>
                Domicile
              </SelectItem>
              <SelectItem key='away' value='away' className='font-secondary text-sm'>
                Déplacement
              </SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setMonth} defaultValue='all'>
            <SelectTrigger className='w-full min-w-[180px] bg-foreground font-secondary text-sm shadow-sm transition-colors hover:bg-foreground/90'>
              <div className='flex items-center'>
                <CalendarIcon className='mr-2 h-4 w-4' />
                <SelectValue placeholder='Filtrer par mois' />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem key='all' value='all' className='font-secondary text-sm'>
                Tous les mois
              </SelectItem>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value} className='font-secondary text-sm'>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className='mt-1 flex items-center space-x-2'>
            <Checkbox
              id='upcomingMatches'
              checked={showUpcomingOnly}
              onCheckedChange={(checked) => setShowUpcomingOnly(checked === true)}
              className='h-4 w-4'
            />
            <Label
              htmlFor='upcomingMatches'
              className='cursor-pointer whitespace-nowrap font-secondary text-sm font-medium text-foreground'
            >
              Matchs à venir
            </Label>
          </div>
        </div>

        <div className='flex gap-2'>
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className='w-full bg-secondary font-medium shadow-md transition-all hover:scale-[1.02] hover:bg-secondary/90 active:scale-[0.98] sm:w-auto'
            aria-label="Rafraîchir les matchs"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Rafraîchir
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button className='w-full bg-primary font-medium shadow-md transition-all hover:scale-[1.02] hover:bg-primary/90 active:scale-[0.98] sm:w-auto'>
                <PlusIcon className='mr-2 h-4 w-4' />
                Ajouter un match
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[500px]'>
              <CreateMatchForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {displayedGames.length === 0 ? (
        <div className='flex min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-8 text-center'>
          <p className='text-muted-foreground'>Aucun match ne correspond aux critères sélectionnés</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {displayedGames.map((match, index) => (
            <Card key={`${match.matchNumber}-${index}`} match={match} />
          ))}
        </div>
      )}
    </div>
  );
}
