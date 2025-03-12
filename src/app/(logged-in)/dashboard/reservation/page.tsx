'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Loader2, Mail, Send } from 'lucide-react';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';

// Import dynamically to avoid SSR issues with preview
const EmailPreview = dynamic(() => import('@/components/EmailPreview'), {
  ssr: false,
  loading: () => <div className="h-[400px] flex items-center justify-center"><Loader2 className="animate-spin" /></div>
});

export default function ReservationPage() {
  const [isLoading, setIsLoading] = useState(false);

  const { data: matches, isLoading: isLoadingMatches } = useQuery({
    queryKey: ['matches'],
    queryFn: async () => {
      const res = await fetch('/api/matches');
      if (!res.ok) {
        throw new Error('Erreur lors de la récupération des matchs');
      }
      return res.json();
    }
  });

  const sendEmailMutation = useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      const response = await fetch('/api/send-matches-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi de l\'email');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast.success('Email envoyé avec succès !');
      setIsLoading(false);
    },
    onError: (error) => {
      toast.error(`Erreur: ${error.message}`);
      setIsLoading(false);
    }
  });

  const handleSendEmail = () => {
    sendEmailMutation.mutate();
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Réservation et Envoi d&apos;Email</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Envoyer un récapitulatif des matchs</CardTitle>
            <CardDescription>
              Envoyez un email contenant tous les matchs à argenteuilbasketball@hotmail.fr
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <p className="text-muted-foreground">
                Cet email contiendra la liste complète des matchs à venir, avec leurs dates, heures et lieux.
              </p>
              <Button 
                onClick={handleSendEmail} 
                disabled={isLoading || isLoadingMatches} 
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Envoyer l&apos;email
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aperçu de l&apos;email</CardTitle>
            <CardDescription>
              Visualisez l&apos;email avant de l&apos;envoyer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md overflow-hidden h-[400px]">
              {isLoadingMatches ? (
                <div className="h-full flex items-center justify-center">
                  <Loader2 className="animate-spin" />
                </div>
              ) : (
                <EmailPreview matches={matches} />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 