import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { InscriptionSchema } from '@/lib/validation/Inscription';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { UseMutationResult } from 'react-query';

type InscriptionFormProps = {
  form: UseFormReturn<z.infer<typeof InscriptionSchema>>;
  mutation: UseMutationResult<void, unknown, z.infer<typeof InscriptionSchema>>;
};

export default function InscriptionForm({ form, mutation }: InscriptionFormProps) {
  const handleLicenseTypeChange = (field: string, value: boolean) => {
    if (value) {
      // Si cette option est sélectionnée, désélectionner les autres
      form.setValue('Renouvellement', field === 'Renouvellement');
      form.setValue('nouvelleLicence', field === 'nouvelleLicence');
      form.setValue('mutation', field === 'mutation');
      form.setValue('RenouvellementSansMutation', field === 'RenouvellementSansMutation');
    } else {
      // Si on désélectionne, ne pas faire d'action supplémentaire
      form.setValue(field as any, false);
    }
  };

  function onSubmit(values: z.infer<typeof InscriptionSchema>) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='nom'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder='Dupont' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='prenom'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder='Jean' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='exemple@email.com' type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='numero'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de téléphone</FormLabel>
                <FormControl>
                  <Input placeholder='06 06 06 06 06' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='dateNaissance'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de naissance</FormLabel>
                <FormControl>
                  <Input type='date' {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <h3 className='mb-2 mt-6 text-lg font-semibold'>Type de licence</h3>
        <div className='space-y-4'>
          <p className='mb-2 text-sm'>⚠️ Veuillez sélectionner au moins une des options suivantes :</p>
          <FormField
            control={form.control}
            name='nouvelleLicence'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => handleLicenseTypeChange('nouvelleLicence', checked as boolean)}
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>J&apos;ai jamais eu de licence de basket</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='Renouvellement'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => handleLicenseTypeChange('Renouvellement', checked as boolean)}
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>J&apos;étais inscrit à Argenteuil la saison dernière</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='mutation'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => handleLicenseTypeChange('mutation', checked as boolean)}
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>J&apos;étais licencié mais dans un autre club</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='RenouvellementSansMutation'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      handleLicenseTypeChange('RenouvellementSansMutation', checked as boolean)
                    }
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>
                    Je n&apos;avais pas de licence la saison dernière, mais j&apos;en ai déja eu une
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <h3 className='mb-2 mt-6 text-lg font-semibold'>Demande de surclassement</h3>
        <p className='mb-2 text-sm text-red-500'>Necessite un certificat médical spécifique </p>

        <FormField
          control={form.control}
          name='surclassement'
          render={({ field }) => (
            <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel>Surclassement</FormLabel>
                <FormDescription>Je souhaite être surclassé dans la catégorie supérieure.</FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full' disabled={mutation.isLoading}>
          {mutation.isLoading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Envoi en cours...
            </>
          ) : (
            "S'inscrire"
          )}
        </Button>
      </form>
    </Form>
  );
}
