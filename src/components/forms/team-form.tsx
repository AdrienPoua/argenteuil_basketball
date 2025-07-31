'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Plus, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { GymnaseEntity } from '@/core/domain/entities/gymnase.entity';
import { MemberEntity } from '@/core/domain/entities/member.entity';
import { Category, Gender, Level, TeamEntity } from '@/core/domain/entities/team.entity';
import { upsert } from '@/core//presentation/actions/teams/upsert';
import { uploadFile } from '@/core/shared/utils/upload';
import { AlertDialogConfirm } from '@/components/ui/alert-dialog-confirm';
import { Loading } from '@/components/ui/loading';
import { MultiSelect, MultiSelectWithVirtualizer } from '../ui/multi-select';

type Competition = {
  id: number;
  label: string;
  poules: {
    id: number;
    nom: string;
  }[];
};

type PropsType = {
  actions: {
    onCancel: () => void;
    onSuccess: () => void;
  };
  currentTeam: TeamEntity | null;
  coachs: MemberEntity[];
  gymnases: GymnaseEntity[];
  competitions: Competition[];
};

export const SessionSchema = z.object({
  id: z.string().optional(),
  start: z.string(),
  end: z.string(),
  day: z.string(),
  gymnase_id: z.string(),
});

export const FormSchema = z.object({
  id: z.string().optional(),
  name: z.string().max(25, { message: "Le nom de l'équipe ne doit pas dépasser 25 caractères" }),
  category: z.array(
    z.nativeEnum(Category, {
      required_error: 'La catégorie est requise',
    }),
  ),
  gender: z.nativeEnum(Gender, {
    required_error: 'Le genre est requis',
  }),
  level: z.nativeEnum(Level, {
    required_error: 'Le niveau est requis',
  }),
  coachsIds: z.array(z.string()),
  assistantsCoachIds: z.array(z.string()),
  competitions: z.array(
    z.object({ id: z.number(), label: z.string(), poules: z.array(z.object({ id: z.number(), nom: z.string() })) }),
  ),
  sessions: z.array(SessionSchema),
  file: z.instanceof(File).optional(),
  imageUrl: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export function TeamForm({ actions, currentTeam, coachs, gymnases, competitions }: Readonly<PropsType>) {
  const isUpdate = !!currentTeam;
  const [previewImage, setPreviewImage] = useState<string | undefined>(currentTeam?.image);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: currentTeam?.id ?? undefined,
      name: currentTeam?.name ?? undefined,
      category: currentTeam?.category ?? [],
      gender: (currentTeam?.gender as Gender) ?? Gender.Masculin,
      coachsIds: currentTeam?.coachs.map((coach) => coach.id) ?? [],
      level: currentTeam?.level ?? Level.Académie,
      competitions: currentTeam?.competitions ?? [],
      assistantsCoachIds: currentTeam?.assistantsCoach.map((coach) => coach.id) ?? [],
      imageUrl: currentTeam?.image ?? '',
      file: undefined,
      sessions:
        currentTeam?.sessions.map((session) => ({
          id: session.id,
          day: session.day,
          start: session.start,
          end: session.end,
          gymnase_id: session.gymnase_id,
        })) ?? [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'sessions',
  });

  const mutation = useMutation({
    mutationFn: async ({ file, ...data }: FormValues) => {
      let imageUrl = data.imageUrl;

      if (file) {
        imageUrl = await uploadFile(file, 'teams');
      }

      await upsert({
        ...data,
        id: currentTeam?.id,
        image: imageUrl,
      });
    },
    onSuccess: () => {
      form.reset();
      setPreviewImage(undefined);
      actions.onSuccess();
      toast.success(`Équipe ${isUpdate ? 'modifiée' : 'créée'} avec succès.`);
    },
    onError: (error: Error) => {
      console.error("Erreur lors de l'enregistrement:", error);
      toast.error("Une erreur est survenue lors de l'enregistrement.");
    },
  });

  const onSubmit = async (data: FormValues) => {
    mutation.mutate(data);
  };

  const actionLabel = isUpdate ? 'Modifier' : 'Créer';

  const removeImage = () => {
    form.setValue('file', undefined);
    form.setValue('imageUrl', '');
    setPreviewImage(undefined);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='max-h-[calc(100vh-200px)] space-y-4 overflow-y-auto px-2'>
        {/* Section image */}
        <div className='flex items-center gap-6'>
          <Avatar className='h-24 w-24'>
            <AvatarImage src={previewImage} className='object-cover' />
            <AvatarFallback className='text-lg'>
              {currentTeam?.name?.charAt(0) ?? form.watch('name')?.charAt(0) ?? 'E'}
            </AvatarFallback>
          </Avatar>

          <div className='flex flex-col gap-2'>
            <FormField
              control={form.control}
              name='file'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Photo de l&apos;équipe</FormLabel>
                  <FormControl>
                    <div className='flex items-center gap-2'>
                      <Input
                        id='team-image'
                        type='file'
                        accept='image/*'
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // Vérifier la taille (max 5MB)
                            if (file.size > 5 * 1024 * 1024) {
                              toast.error("L'image ne doit pas dépasser 5MB");
                              return;
                            }
                            const url = URL.createObjectURL(file);
                            field.onChange(file);
                            setPreviewImage(url);
                          }
                        }}
                        className='hidden'
                        disabled={mutation.isPending}
                      />
                      <label
                        htmlFor='team-image'
                        className='inline-flex cursor-pointer items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
                      >
                        <Upload className='mr-2 h-4 w-4' />
                        Choisir une photo
                      </label>
                      {previewImage && (
                        <Button
                          type='button'
                          variant='outline'
                          size='sm'
                          onClick={removeImage}
                          disabled={mutation.isPending}
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de l&apos;équipe</FormLabel>
              <FormControl>
                <Input {...field} disabled={mutation.isPending} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <MultiSelect
          label='Catégorie'
          options={Object.values(Category)}
          getOptionLabel={(c) => c}
          getOptionValue={(c) => c}
          selectedValues={form.watch('category')}
          onChange={(values) => form.setValue('category', values as Category[])}
        />

        <FormField
          control={form.control}
          name='gender'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <Select disabled={mutation.isPending} onValueChange={field.onChange} defaultValue={field.value} required>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Sélectionner un genre' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='Masculin'>Masculin</SelectItem>
                  <SelectItem value='Féminin'>Féminin</SelectItem>
                  <SelectItem value='Mixte'>Mixte</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='level'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Niveau</FormLabel>
              <FormControl>
                <Select disabled={mutation.isPending} onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Sélectionner un niveau' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(Level).map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='coachsIds'
          render={({ field }) => (
            <MultiSelectWithVirtualizer
              label='Coach(s)'
              options={coachs}
              getOptionLabel={(c) => `${c.first_name} ${c.last_name}`}
              getOptionValue={(c) => c.id}
              selectedValues={field.value ?? []}
              onChange={field.onChange}
              disabled={mutation.isPending}
            />
          )}
        />

        <FormField
          control={form.control}
          name='assistantsCoachIds'
          render={({ field }) => (
            <MultiSelectWithVirtualizer
              label='Assistant Coach(s)'
              options={coachs}
              getOptionLabel={(c) => `${c.first_name} ${c.last_name}`}
              getOptionValue={(c) => c.id}
              selectedValues={field.value ?? []}
              onChange={field.onChange}
              disabled={mutation.isPending}
            />
          )}
        />
        <FormField
          control={form.control}
          name='competitions'
          render={({ field }) => (
            <MultiSelectWithVirtualizer
              label='Competition(s)'
              options={competitions}
              getOptionLabel={(c) => c.label}
              getOptionValue={(c) => String(c.id)}
              selectedValues={field.value?.map((c) => String(c.id)) ?? []}
              onChange={(values) => {
                const selectedCompetitions = competitions.filter((c) => values.includes(String(c.id)));
                field.onChange(selectedCompetitions);
              }}
              disabled={mutation.isPending}
            />
          )}
        />

        <Button
          onClick={() =>
            append({
              day: '',
              start: '',
              end: '',
              gymnase_id: '',
            })
          }
          type='button'
          className='w-full'
        >
          <Plus className='mr-2 h-4 w-4' />
          Ajouter un entrainement
        </Button>

        {fields.map((field, index) => {
          const currentGymnase = gymnases.find((gymnase) => {
            return gymnase.id === currentTeam?.sessions[index]?.gymnase_id;
          });
          return (
            <div key={field.id} className='flex flex-col gap-4'>
              <div className='grid grid-cols-2 gap-4'>
                <FormItem>
                  <FormLabel htmlFor={`day-${index}`}>Jour</FormLabel>
                  <Select
                    onValueChange={(value) => form.setValue(`sessions.${index}.day`, value)}
                    defaultValue={field.day}
                    required
                  >
                    <FormControl>
                      <SelectTrigger id={`day-${index}`}>
                        <SelectValue placeholder='Sélectionner un jour' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'].map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
                <FormItem>
                  <FormLabel htmlFor={`gym-${index}`}>Gymnase</FormLabel>
                  <Select
                    onValueChange={(value: string) => form.setValue(`sessions.${index}.gymnase_id`, value)}
                    defaultValue={currentGymnase?.id}
                    required
                  >
                    <FormControl>
                      <SelectTrigger id={`gym-${index}`}>
                        <SelectValue placeholder='Sélectionner un gymnase' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {gymnases.map((gymnase) => (
                        <SelectItem key={gymnase.id} value={gymnase.id} defaultValue={gymnase.id}>
                          {gymnase.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <FormItem>
                  <FormLabel htmlFor={`start-${index}`} className='text-background'>
                    Début
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='time'
                      id={`start-${index}`}
                      value={form.watch(`sessions.${index}.start`)}
                      onChange={(e) => form.setValue(`sessions.${index}.start`, e.target.value)}
                      required
                    />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormLabel htmlFor={`end-${index}`} className='text-background'>
                    Fin
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='time'
                      id={`end-${index}`}
                      value={form.watch(`sessions.${index}.end`)}
                      onChange={(e) => form.setValue(`sessions.${index}.end`, e.target.value)}
                      required
                    />
                  </FormControl>
                </FormItem>
              </div>
              <AlertDialogConfirm
                title='Êtes-vous sûr de vouloir supprimer cet entrainement ?'
                onConfirm={() => remove(index)}
                className='w-fit'
              />
            </div>
          );
        })}

        {mutation.isError && <div className='text-sm text-destructive'>{mutation.error?.message}</div>}
        <Separator />
        <div className='flex justify-end gap-2 pt-4'>
          <Button
            type='button'
            variant='outline'
            disabled={mutation.isPending}
            onClick={() => {
              actions.onCancel();
            }}
          >
            Annuler
          </Button>
          <Button type='submit' disabled={mutation.isPending}>
            {mutation.isPending ? <Loading /> : actionLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
