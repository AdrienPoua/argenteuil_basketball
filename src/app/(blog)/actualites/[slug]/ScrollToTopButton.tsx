'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button 
      className="group"
      onClick={scrollToTop}
    >
      <ArrowLeft className="mr-2 h-4 w-4 rotate-90 transform transition-transform group-hover:-translate-y-1" />
      Retour en haut
    </Button>
  );
} 