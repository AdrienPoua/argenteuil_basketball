'use client';
import { z } from 'zod';
import { FormSchemaType, PropsType } from '../types/form.types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema } from '../schemas/form.schemas';
import { Roles } from '@prisma/client';
export const getImageUrl = async (file: File) => {
  if (!file) return;
  const urlSchema = z.string();
  const formData = new FormData();
  formData.append('file', file); // Fichier brut
  formData.append('fileName', file.name);
  const response = await fetch('/api/auth/imagekit', {
    method: 'POST',
    body: formData,
  });
  const { url } = await response.json();
  const validatedUrl = urlSchema.parse(url);
  return validatedUrl;
};

export const handleSubmit = async (data: FormSchemaType, defaultValues: PropsType['defaultValues']) => {
  let imageUrl = undefined;
  if (data.image) {
    const imageDidntChange = defaultValues && defaultValues.image === data.image?.name;
    imageUrl = imageDidntChange ? defaultValues.image : await getImageUrl(data.image);
  }
  if (defaultValues) {
    const res = await fetch(`/api/members/${defaultValues.id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...data, image: imageUrl }),
    });
    if (!res.ok) {
      throw new Error('Failed to update member');
    }
  } else {
    const res = await fetch('/api/members', {
      method: 'POST',
      body: JSON.stringify({ ...data, image: imageUrl }),
    });
    if (!res.ok) {
      throw new Error('Failed to create member');
    }
  }
};

export const useMemberForm = (defaultValues?: PropsType['defaultValues']) => {
  return useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues
      ? {
          id: defaultValues.id,
          name: defaultValues.name,
          phone: defaultValues.privatePhone,
          email: defaultValues.privateEmail,
          image: defaultValues.image ? new File([], defaultValues.image) : undefined,
          isPublicEmail: !!defaultValues.email,
          isPublicPhone: !!defaultValues.phone,
          isLeader: defaultValues.isLeader,
          role: defaultValues.role as Roles[],
          teams: defaultValues.teams.map((team) => team.id) ?? [],
        }
      : {
          teams: [],
          isLeader: false,
          role: [],
          image: undefined,
          name: '',
          phone: '',
          email: '',
          isPublicEmail: false,
          isPublicPhone: false,
        },
  });
};
