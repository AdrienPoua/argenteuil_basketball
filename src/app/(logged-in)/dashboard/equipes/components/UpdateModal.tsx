'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFieldArray, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Trash2, Plus, Upload, Pencil, Users, MapPin, Calendar, Clock, Trophy } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { Gymnases, Days } from '@/lib/validation/Team';
import { getImageUrl, useCompetitions } from '../actions/client.actions';
import { Checkbox } from '@/components/ui/checkbox';
import { MultiSelect } from '@/components/ui/multi-select';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../schemas/form.schemas';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { z } from 'zod';
import { PropsType } from './Card';
import { toast } from '@/hooks/use-toast';

export default function FormModal({ members, data }: Readonly<PropsType>) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='rounded-full' size='icon'>
          <Pencil size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-[900px]'>
        <CustomForm members={members} data={data} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

function CustomForm({ members, data: team, setOpen }: Readonly<PropsType & { setOpen: (open: boolean) => void }>) {
  const { data: competitions } = useCompetitions();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...team,
      coach: team?.coach?.id,
      image: team?.image ? new File([team.image], team.image, { type: 'image/jpeg' }) : undefined,
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(team?.image ?? null);
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'sessions',
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const imageDidntChange = team?.image && data.image?.name === team.image;
      const imageUrl = imageDidntChange ? team?.image : ((data.image && (await getImageUrl(data.image))) ?? null);
      console.log('🚀 ~ onSubmit ~ imageUrl:', data);

      const res = await fetch(`/api/teams/${team.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...team, ...data, image: imageUrl }),
      });

      if (!res.ok) {
        throw new Error("Échec de la mise à jour de l'équipe");
      }

      toast({
        title: 'Équipe mise à jour',
        description: "Les informations de l'équipe ont été mises à jour avec succès",
        variant: 'success',
      });

      form.reset();
      setOpen(false);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: "Impossible de mettre à jour l'équipe. Veuillez réessayer.",
        variant: 'destructive',
      });
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        encType='multipart/form-data'
        className='mx-auto max-w-4xl rounded-lg bg-background p-6 text-primary'
      >
        <h2 className='mb-6 text-center text-2xl font-bold'>Modifier l&apos;équipe {team.name}</h2>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          <Card className='border shadow-sm'>
            <CardHeader className='pb-3'>
              <CardTitle className='flex items-center gap-2 text-xl font-semibold text-primary'>
                <Users className='h-5 w-5' />
                Informations de l&apos;équipe
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4 text-primary'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de l&apos;équipe</FormLabel>
                    <FormControl>
                      <Input placeholder='U20' {...field} />
                    </FormControl>
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
                      <Input placeholder='Départementale' {...field} />
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
                    <FormLabel>Entraineur</FormLabel>
                    <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Sélectionner un entraineur' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {members
                          .toSorted((a, b) => a.name.localeCompare(b.name))
                          .map((member) => (
                            <SelectItem key={member.id} value={member.id}>
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
                name='isCompetition'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3 shadow-sm'>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked)} />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>
                        <div className='flex items-center gap-2'>
                          <Trophy className='h-4 w-4 text-amber-500' />
                          Équipe en compétition
                        </div>
                      </FormLabel>
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
                        value={field.value}
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

          <div className='space-y-8'>
            <Card className='border shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='flex items-center gap-2 text-xl font-semibold text-primary'>
                  <Upload className='h-5 w-5' />
                  Image de l&apos;équipe
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name='image'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className='flex flex-col items-center space-y-4'>
                          {previewImage && (
                            <div className='relative h-48 w-full overflow-hidden rounded-md'>
                              <Image src={previewImage} alt='Prévisualisation' fill className='object-cover' />
                            </div>
                          )}
                          <label className='w-full cursor-pointer'>
                            <div className='flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 transition-colors hover:border-primary hover:bg-muted/30'>
                              <div className='space-y-1 text-center'>
                                <Upload className='mx-auto h-12 w-12 text-muted-foreground' />
                                <div className='text-sm text-muted-foreground'>
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
              </CardContent>
            </Card>

            <Card className='border shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='flex items-center gap-2 text-xl font-semibold text-primary'>
                  <Calendar className='h-5 w-5' />
                  Sessions d&apos;entraînement
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4 text-primary'>
                {fields.map((field, index) => (
                  <div key={field.id} className='space-y-4 rounded-lg border bg-card p-4 shadow-sm'>
                    <div className='mb-2 flex items-center justify-between border-b pb-2'>
                      <h4 className='font-medium'>Session #{index + 1}</h4>
                      <Button onClick={() => remove(index)} type='button' variant='destructive' size='sm'>
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                      <FormItem>
                        <FormLabel htmlFor={`day-${index}`} className='flex items-center gap-1'>
                          <Calendar className='h-3.5 w-3.5 text-primary' />
                          Jour
                        </FormLabel>
                        <Select
                          onValueChange={(value: Days) => form.setValue(`sessions.${index}.day`, value)}
                          defaultValue={form.watch(`sessions.${index}.day`)}
                        >
                          <FormControl>
                            <SelectTrigger id={`day-${index}`}>
                              <SelectValue placeholder='Jour' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((day) => (
                              <SelectItem key={day} value={day}>
                                {day}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>

                      <FormItem>
                        <FormLabel htmlFor={`gym-${index}`} className='flex items-center gap-1'>
                          <MapPin className='h-3.5 w-3.5 text-primary' />
                          Gymnase
                        </FormLabel>
                        <Select
                          onValueChange={(value: Gymnases) => form.setValue(`sessions.${index}.gymnase`, value)}
                          defaultValue={form.watch(`sessions.${index}.gymnase`)}
                        >
                          <FormControl>
                            <SelectTrigger id={`gym-${index}`}>
                              <SelectValue placeholder='Gymnase' />
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
                        <FormLabel htmlFor={`start-${index}`} className='flex items-center gap-1'>
                          <Clock className='h-3.5 w-3.5 text-primary' />
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
                        <FormLabel htmlFor={`end-${index}`} className='flex items-center gap-1'>
                          <Clock className='h-3.5 w-3.5 text-primary' />
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
                  className='mt-2 w-full'
                >
                  <Plus className='mr-2 h-4 w-4' />
                  Ajouter une session
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className='mt-8 flex gap-4'>
          <Button variant='outline' className='flex-1' type='button' onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button type='submit' className='flex-1' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Mise à jour...' : 'Enregistrer les modifications'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
