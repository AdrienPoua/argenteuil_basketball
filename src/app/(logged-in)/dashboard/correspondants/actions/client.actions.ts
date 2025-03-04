'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../schemas/form.schema';
import { FormValues } from '../types/form.types';
import Club from '@/models/Club';

export const useClubForm = (defaultValues?: ReturnType<Club['toPlainObject']>) => {
  return useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      id: '',
      code: '',
      libelle: '',
      email: '',
      phone: '',
    },
  });
};

export const handleSubmit = async (data: FormValues, defaultValues?: ReturnType<Club['toPlainObject']>) => {
  if (defaultValues?.id) {
    // Mise à jour d'un club existant
    const response = await fetch(`/api/clubs/${defaultValues.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du club');
    }
    
    return await response.json();
  } else {
    // Création d'un nouveau club
    const response = await fetch('/api/clubs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        id: crypto.randomUUID(),
      }),
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la création du club');
    }
    
    return await response.json();
  }
};
