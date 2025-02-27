'use client';

// UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Third party libraries
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2, Upload } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
// Local imports
import { Gymnases, Days } from '@/lib/validation/Team';
import { getImageUrl, useCompetitions } from '../actions/client.actions';
import { formSchema } from '../schemas/form.schemas';
import Member from '@/models/Member';
import { z } from 'zod';

type ModalProps = {
  members: ReturnType<Member['toPlainObject']>[];
};

export default function FormModal({ members }: Readonly<Readonly<ModalProps>>) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='gap-2'>
          <Plus size={20} />
          Ajouter une équipe
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-[900px]'>
        <CustomForm members={members} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

export function CustomForm({ members, setOpen }: Readonly<ModalProps & { setOpen: (open: boolean) => void }>) {
  const { data: competitions } = useCompetitions();
  console.log('🚀 ~ CustomForm ~ competitions:', competitions);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      image: undefined,
      coach: undefined,
      level: 'Départemental',
      isCompetition: false,
      championnats: [],
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'sessions',
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const imageUrl = (data.image && (await getImageUrl(data.image))) ?? null;
    try {
      const res = await fetch('/api/teams', {
        method: 'POST',
        body: JSON.stringify({ ...data, image: imageUrl }),
      });
      if (!res.ok) {
        throw new Error('Failed to create team');
      }
      form.reset();
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        encType='multipart/form-data'
        className='mx-auto max-w-4xl rounded-lg bg-background p-6 shadow-xl'
      >
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          <Card className='p-4 shadow-md'>
            <CardHeader>
              <CardTitle className='text-center text-2xl font-bold text-primary'>
                Informations de l&apos;équipe
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-background'>Nom de l&apos;équipe</FormLabel>
                    <FormControl>
                      <Input placeholder='U20' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='image'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-background'>Image de l&apos;équipe</FormLabel>
                    <FormControl>
                      <div className='flex flex-col items-center space-y-4'>
                        {previewImage && (
                          <div className='relative h-48 w-full overflow-hidden rounded-md'>
                            <Image src={previewImage} alt='Prévisualisation' layout='fill' objectFit='cover' />
                          </div>
                        )}
                        <label className='w-full cursor-pointer'>
                          <div className='flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-primary'>
                            <div className='space-y-1 text-center'>
                              <Upload className='mx-auto h-12 w-12 text-gray-400' />
                              <div className='text-sm text-gray-600'>
                                <span className='relative font-medium text-primary hover:underline'>
                                  Télécharger une image
                                </span>
                              </div>
                            </div>
                          </div>
                          <Input
                            type='file'
                            className='hidden'
                            accept='image/*'
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = URL.createObjectURL(file);
                                field.onChange(file);
                                setPreviewImage(url);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='coach'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-background'>Entraineur</FormLabel>
                    <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                      <FormControl className='text-background'>
                        <SelectTrigger>
                          <SelectValue placeholder='Sélectionner un entraineur' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {members
                          .toSorted((a, b) => a.name.localeCompare(b.name))
                          .map((member) => (
                            <SelectItem key={member.id} value={member.id} className='text-background'>
                              {member.name}
                            </SelectItem>
                          ))}
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
                    <FormLabel className='text-background'>Niveau</FormLabel>
                    <FormControl>
                      <Input placeholder='Départementale' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='isCompetition'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked)} />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel className='text-background'>Équipe en compétition</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='championnats'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Championnats</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={
                          competitions?.map((competition) => ({
                            label: competition,
                            value: competition,
                          })) ?? []
                        }
                        onValueChange={(values) => {
                          field.onChange(values);
                        }}
                        placeholder='Sélectionner les championnats'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card className='shadow-md'>
            <CardHeader>
              <CardTitle className='mb-5 text-center text-2xl font-bold text-primary'>
                Horaires d&apos;entrainements
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              {fields.map((field, index) => (
                <div key={field.id} className='space-y-4 rounded-lg bg-muted p-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <FormItem>
                      <FormLabel htmlFor={`day-${index}`} className='text-background'>
                        Jour
                      </FormLabel>
                      <Select onValueChange={(value: Days) => form.setValue(`sessions.${index}.day`, value)}>
                        <FormControl>
                          <SelectTrigger id={`day-${index}`} className='text-background'>
                            <SelectValue placeholder='Sélectionner un jour' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((day) => (
                            <SelectItem key={day} value={day} className='text-background'>
                              {day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                    <FormItem>
                      <FormLabel htmlFor={`gym-${index}`} className='text-background'>
                        Gymnase
                      </FormLabel>
                      <Select
                        onValueChange={(value: Gymnases) => form.setValue(`sessions.${index}.gymnase`, value)}
                        defaultValue='Jean_Guimier'
                      >
                        <FormControl>
                          <SelectTrigger id={`gym-${index}`} className='text-background'>
                            <SelectValue placeholder='Sélectionner un gymnase' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='Jean_Guimier'>Jean Guimier</SelectItem>
                          <SelectItem value='Jesse_Owens'>Jesse Owens</SelectItem>
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
                  <Button
                    onClick={() => remove(index)}
                    type='button'
                    variant='destructive'
                    size='sm'
                    className='mt-2 w-full'
                  >
                    <Trash2 className='mr-2 h-4 w-4' />
                    Supprimer cette session
                  </Button>
                </div>
              ))}
              <Button
                onClick={() =>
                  append({
                    day: 'Lundi',
                    start: '',
                    end: '',
                    gymnase: 'Jean_Guimier',
                  })
                }
                type='button'
                className='w-full'
              >
                <Plus className='mr-2 h-4 w-4' />
                Ajouter un entrainement
              </Button>
            </CardContent>
          </Card>
        </div>
        <Button type='submit' className='mt-8 w-full' disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Envoi en cours...' : "Enregistrer l'équipe"}
        </Button>
      </form>
    </Form>
  );
}
