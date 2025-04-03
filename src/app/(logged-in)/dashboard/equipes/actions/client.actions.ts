'use client';
import { z } from 'zod';
import { useQuery } from 'react-query';
import getCompetitions from '@/actions/fetchs/ffbb/getCompetitions';
import getToken from '@/actions/fetchs/ffbb/getFFBBToken';

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
      const token = await getToken();
      return await getCompetitions(token).then((res) => res.map((competition) => competition.label));
    },
  });
  return { data, isLoading, error };
};
