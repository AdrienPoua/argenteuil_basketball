'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormValues } from '../types/form.types';
import { useClubForm, handleSubmit } from '../actions/client.actions';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Mail, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Club from '@/models/Club';

type ClubFormProps = {
  defaultValues?: ReturnType<Club['toPlainObject']>;
  setIsEditing?: (isEditing: boolean) => void;
  onSuccess?: () => void;
};

export default function ClubForm({ defaultValues, setIsEditing, onSuccess }: Readonly<ClubFormProps>) {
  const form = useClubForm(defaultValues);
  const router = useRouter();
  
  async function onSubmit(data: FormValues) {
    try {
      await handleSubmit(data, defaultValues);
      
      if (setIsEditing) {
        setIsEditing(false);
      }
      
      form.reset();
      router.refresh();
      
      // Appeler onSuccess si fourni
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Erreur lors de la création/mise à jour du club :', error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Card>
          <CardContent className="font-secondary text-black" >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code du club</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
                      <Input className="pl-10" placeholder="PDL0049001" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="libelle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du club</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
                      <Input className="pl-10" placeholder="Nom du club" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
                      <Input className="pl-10" placeholder="Email du correspondant" {...field} value={field.value || ""} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
                      <Input className="pl-10" placeholder="Numéro de téléphone" {...field} value={field.value || ""} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4 flex justify-end space-x-2">
              <Button type="submit" variant="default">
                {defaultValues ? "Mettre à jour" : "Créer"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
