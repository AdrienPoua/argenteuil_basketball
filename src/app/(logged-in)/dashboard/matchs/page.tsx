'use client';
import Grid from './layouts/grid';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import CreateMatchForm from './components/CreateMatchForm';
import { PlusIcon } from '@radix-ui/react-icons';
import { CalendarIcon, RefreshCw, Loader2, Search } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import saveMatchsToDatabase from '@/actions/fetchs/database/upsertMatchsFromFFBB';
import { toast } from '@/hooks/use-toast';
import { connectedUserAction } from '@/lib/actions/connectedUserAction';
import { useFilters } from './hooks/useFilters';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, useForm } from 'react-hook-form';
import { FormField, FormItem } from '@/components/ui/form';

const formSchema = z.object({
  competition: z.string().default('all'),
  place: z.string().default('all'),
  month: z.string().default(new Date().getMonth().toString()),
  showUpcomingOnly: z.boolean().default(false),
});

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Récupérer les matchs filtrés - useFilters gère maintenant directement les paramètres d'URL
  const { matchs, isLoading, competitions } = useFilters();

  // Utiliser les valeurs par défaut du schema si les paramètres URL sont absents
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      competition: searchParams.get('competition') ?? 'all',
      place: searchParams.get('place') ?? 'all',
      month: searchParams.get('month') ?? new Date().getMonth().toString(),
      showUpcomingOnly: searchParams.get('showUpcomingOnly') === 'true',
    },
  });
  
  const handleSearch = useCallback(() => {
    const data = form.getValues();
    const newParams = new URLSearchParams({ ...data, showUpcomingOnly: data.showUpcomingOnly.toString() });
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  }, [form, router, pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSearch]);


  if (!competitions)
    return (

      <div className='flex h-full items-center justify-center'>
        <Loader2 className='h-10 w-10 animate-spin text-primary' />
      </div>
    );

  return (
    <div className='p-4'>
      <div className='mb-6 flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex min-w-fit flex-col gap-2 sm:flex-row sm:gap-3'>
            <Form {...form}>
              <div className='flex flex-col gap-2 sm:flex-row sm:gap-3'>
                <FormField
                  control={form.control}
                  name='competition'
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className='w-full min-w-[200px] bg-foreground font-secondary text-sm shadow-sm transition-colors hover:bg-foreground/90'>
                          <SelectValue placeholder='Sélectionner une compétition' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem key='all' value='all' className='font-secondary text-sm'>
                            Toutes les compétitions
                          </SelectItem>
                          {competitions.map((competition) => (
                            <SelectItem key={competition} value={competition} className='font-secondary text-sm'>
                              {competition}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='place'
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} value={field.value}>
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
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='month'
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} value={field.value}>
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
                          {[
                            { value: '0', label: 'Janvier' },
                            { value: '1', label: 'Février' },
                            { value: '2', label: 'Mars' },
                            { value: '3', label: 'Avril' },
                            { value: '4', label: 'Mai' },
                            { value: '5', label: 'Juin' },
                            { value: '6', label: 'Juillet' },
                            { value: '7', label: 'Août' },
                            { value: '8', label: 'Septembre' },
                            { value: '9', label: 'Octobre' },
                            { value: '10', label: 'Novembre' },
                            { value: '11', label: 'Décembre' },
                          ].map((month) => (
                            <SelectItem key={month.value} value={month.value} className='font-secondary text-sm'>
                              {month.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='showUpcomingOnly'
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex size-full items-center justify-center rounded-md border border-primary/30 bg-primary/30 px-3 gap-3'>
                        <Checkbox
                          id='upcomingMatches'
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className='h-4 w-4'
                        />
                        <Label
                          htmlFor='upcomingMatches'
                          className='cursor-pointer whitespace-nowrap font-secondary text-sm font-medium text-foreground'
                        >
                          Matchs à venir
                        </Label>
                      </div>
                    </FormItem>
                  )}
                />
                <Button
                  type='button'
                  className='h-10 bg-primary font-medium shadow-md transition-all hover:scale-[1.02] hover:bg-primary/90 active:scale-[0.98]'
                  onClick={handleSearch}
                >
                  <Search className='mr-2 h-4 w-4' />
                  Rechercher
                </Button>
              </div>
            </Form>
          </div>
          <ActionsButtons />
        </div>
      </div>

      {isLoading && (
        <div className='flex h-full items-center justify-center'>
          <Loader2 className='h-10 w-10 animate-spin' />
        </div>
      )}
      {matchs && <Grid matchs={matchs} />}
    </div>
  );
}

const ActionsButtons = () => {
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
    <div className='flex gap-2'>
      <Button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className='w-full bg-secondary font-medium shadow-md transition-all hover:scale-[1.02] hover:bg-secondary/90 active:scale-[0.98] sm:w-auto'
        aria-label='Rafraîchir les matchs'
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
  );
};
