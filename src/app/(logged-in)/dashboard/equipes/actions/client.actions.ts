'use client';
import { z } from 'zod';
import { useQuery } from 'react-query';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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

export const useCompetitions = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['competitions'],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/api/ffbb/competitions`, {
        credentials: 'include',
      });
      const competitions: { id: number; label: string }[] = await res.json();
      return competitions.map((competition) => competition.label);
    },
  });
  return { data, isLoading, error };
};
