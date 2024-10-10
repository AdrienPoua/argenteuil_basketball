"use client";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Afficher ou cacher le bouton en fonction du défilement
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Fonction pour remonter en haut de la page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="hidden md:fixed bottom-10 right-10">
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="w-16 h-16"
          size="icon"
        >
          <ArrowUpIcon size={30} />
        </Button>
      )}
    </div>
  );
};

export default ScrollToTop;
