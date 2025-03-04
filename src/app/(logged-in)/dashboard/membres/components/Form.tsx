'use client';

import { z } from 'zod';
import { Roles } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { MultiSelect } from '@/components/ui/multi-select';
import { useState } from 'react';
import { handleSubmit, useMemberForm } from '../actions/client.actions';
import { FormSchema } from '../schemas/form.schemas';
import { PropsType } from '../types/form.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, Mail, Phone, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MemberForm({ teams, defaultValues, setIsEditing, onSuccess }: Readonly<PropsType>) {
  const [previewImage, setPreviewImage] = useState<string | undefined>(defaultValues?.image);
  const form = useMemberForm(defaultValues);
  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await handleSubmit(data, defaultValues);
      setIsEditing?.(false);
      setPreviewImage(undefined);
      form.reset();
      router.refresh();

      // Appeler onSuccess si fourni
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-6 mx-auto max-w-2xl`}>
        <Card className='font-secondary text-background'>
          <CardHeader>
            <CardTitle className='py-4 text-center font-secondary text-2xl font-bold'>
              {defaultValues ? 'Modifier le membre' : 'Créer un nouveau membre'}
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='flex items-center space-x-4'>
              <Avatar className='h-24 w-24'>
                <AvatarImage src={previewImage} />
                <AvatarFallback>{defaultValues?.name?.charAt(0) ?? 'M'}</AvatarFallback>
              </Avatar>
              <FormField
                control={form.control}
                name='image'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel className='font-secondary'>Photo de profil</FormLabel>
                    <FormControl>
                      <div className='flex items-center'>
                        <Input
                          id='member-image'
                          type='file'
                          accept='image/*'
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = URL.createObjectURL(file);
                              field.onChange(file);
                              setPreviewImage(url);
                            }
                          }}
                          className='hidden'
                        />
                        <label
                          htmlFor='member-image'
                          className='flex cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 font-secondary text-sm font-medium shadow-sm hover:bg-gray-50'
                        >
                          <Upload className='mr-2 h-5 w-5' />
                          Choisir une image
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage className='font-secondary' />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-secondary'>Nom</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <User className='absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400' />
                        <Input placeholder='Michael Jordan' {...field} className='pl-10' />
                      </div>
                    </FormControl>
                    <FormMessage className='font-secondary' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-secondary'>Email</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Mail className='absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400' />
                        <Input placeholder='john@example.com' {...field} className='pl-10' />
                      </div>
                    </FormControl>
                    <FormMessage className='font-secondary' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-secondary'>Téléphone</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Phone className='absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400' />
                        <Input placeholder='+33612345678' {...field} className='pl-10' />
                      </div>
                    </FormControl>
                    <FormMessage className='font-secondary' />
                  </FormItem>
                )}
              />
            </div>

            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='isPublicEmail'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel className='font-secondary'>Email public</FormLabel>
                      <FormDescription className='font-secondary'>
                        L&apos;email sera visible sur le site web
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='isPublicPhone'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel className='font-secondary'>Téléphone public</FormLabel>
                      <FormDescription className='font-secondary'>
                        Le téléphone sera visible sur le site web
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='isLeader'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel className='font-secondary'>Dirigeant</FormLabel>
                      <FormDescription className='font-secondary'>Ce membre est un dirigeant</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-secondary'>Rôles</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <MultiSelect
                        options={Object.values(Roles).map((role) => ({
                          label: role.replace('_', ' '),
                          value: role,
                        }))}
                        defaultValue={field.value}
                        onValueChange={(values) => {
                          field.onChange(values);
                        }}
                        placeholder='Sélectionner un ou plusieurs rôles'
                      />
                    </div>
                  </FormControl>
                  <FormMessage className='font-secondary' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='teams'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-secondary'>Équipes</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <MultiSelect
                        options={teams.map((team) => ({
                          label: team.name,
                          value: team.id,
                        }))}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='Sélectionner une ou plusieurs équipes'
                      />
                    </div>
                  </FormControl>
                  <FormMessage className='font-secondary' />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full'>
              {defaultValues ? 'Modifier' : 'Créer'}
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
