'use client';
import React, { useEffect, useRef, useState } from 'react';

export const JSSticky: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const stickyRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!stickyRef.current || !placeholderRef.current) return;

    // Obtenir les dimensions initiales
    const updateDimensions = () => {
      if (stickyRef.current) {
        const rect = stickyRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Configuration de l'Observer pour détecter quand l'élément sort de la vue
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Si l'élément n'est plus visible (au-dessus de la fenêtre),
        // on active l'effet sticky
        setIsSticky(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '-1px 0px 0px 0px', // Déclenche dès que le haut de l'élément touche le haut de la fenêtre
      },
    );

    observer.observe(placeholderRef.current);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <>
      {/* Élément placeholder pour détecter la position */}
      <div ref={placeholderRef} style={{ height: isSticky ? dimensions.height : 0 }}></div>

      {/* Élément qui devient "sticky" */}
      <div
        ref={stickyRef}
        style={{
          position: isSticky ? 'fixed' : 'relative',
          top: isSticky ? '20px' : 'auto',
          width: isSticky ? dimensions.width : '100%',
          zIndex: 10,
        }}
      >
        {children}
      </div>
    </>
  );
};

// Composant de démonstration
export default function JSStickyDemo() {
  return (
    <div className='py-10'>
      <h1 className='mb-10 text-center text-3xl font-bold'>Effet Sticky via JavaScript</h1>

      <div className='container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2' style={{ minHeight: '200vh' }}>
        {/* Colonne avec effet sticky simulé */}
        <div className='rounded-lg bg-red-200 p-6'>
          <JSSticky>
            <div className='rounded-lg bg-red-500 p-4'>
              <h3 className='font-bold text-white'>Cet élément simule sticky avec JS</h3>
              <p className='mt-2 text-white'>Faites défiler pour voir l&apos;effet</p>
              <div className='mt-4 flex h-40 items-center justify-center rounded bg-white/20'>
                <span className='font-bold text-white'>Contenu &quot;sticky&quot; en JS</span>
              </div>
            </div>
          </JSSticky>
        </div>

        {/* Colonne de contenu normal */}
        <div className='rounded-lg bg-blue-200 p-6'>
          <h3 className='font-bold'>Contenu normal (non-sticky)</h3>
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <div key={index} className='mb-4 mt-4 rounded-lg bg-blue-500 p-4'>
                <p className='text-white'>Élément de contenu {index + 1}</p>
                <div className='mt-2 h-20 rounded bg-white/20'></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
