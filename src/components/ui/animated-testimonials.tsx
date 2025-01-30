'use client';

import { IconMail, IconPhone, IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import type Member from '@/models/Member';

type Testimonial = ReturnType<Member['toPlainObject']>;

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials]);

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials, handleNext]); // Added handleNext to dependencies

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    const regex = /^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/;
    const match = regex.exec(cleaned);
    if (match) {
      return match.slice(1).join(' ');
    }
    return phone;
  };

  return (
    <div className='mx-auto w-full rounded-lg border-2 border-primary px-4 py-10 font-sans antialiased sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12'>
      <div className='relative grid grid-cols-1 gap-8 sm:gap-12 md:gap-16 lg:grid-cols-2 lg:gap-20'>
        <div className='relative min-h-[300px] sm:min-h-[400px] md:min-h-[500px]'>
          <AnimatePresence>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotate: randomRotateY(),
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.95,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index) ? 0 : randomRotateY(),
                  zIndex: isActive(index) ? 999 : testimonials.length + 2 - index,
                  y: isActive(index) ? [0, -80, 0] : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: randomRotateY(),
                }}
                transition={{
                  duration: 0.4,
                  ease: 'easeInOut',
                }}
                className='absolute inset-0 flex origin-bottom items-center justify-center'
              >
                <Image
                  src={testimonial.image || '/placeholder.svg'}
                  alt={testimonial.name}
                  width={500}
                  height={500}
                  draggable={false}
                  className='h-full w-full max-w-[300px] rounded-3xl border-2 border-primary bg-background object-cover object-center sm:max-w-[400px] md:max-w-[500px]'
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className='flex flex-col justify-between space-y-4 py-4 sm:space-y-6'>
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: 'easeInOut',
            }}
          >
            <h3 className='text-3xl font-bold text-foreground sm:text-4xl md:text-5xl lg:text-6xl'>
              {testimonials[active].name}
            </h3>
            <h4 className='mb-3 text-xl text-primary sm:mb-5 sm:text-2xl md:text-3xl'>
              {testimonials[active].role.join(', ')}
            </h4>
            <div className='mb-3 flex flex-wrap gap-4 sm:mb-5'>
              {testimonials[active].email && (
                <TooltipProvider delayDuration={10}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.a
                        href={`mailto:${testimonials[active].email}`}
                        className='flex items-center space-x-2 text-sm text-muted-foreground transition-colors duration-100 hover:text-foreground'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconMail className='h-5 w-5' />
                        <span>Email</span>
                      </motion.a>
                    </TooltipTrigger>
                    <TooltipContent className='duration-100'>{testimonials[active].email}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {testimonials[active].phone && (
                <TooltipProvider delayDuration={10}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.a
                        href={`tel:${testimonials[active].phone}`}
                        className='flex items-center space-x-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconPhone className='h-5 w-5' />
                        <span>Phone</span>
                      </motion.a>
                    </TooltipTrigger>
                    <TooltipContent>{formatPhoneNumber(testimonials[active].phone)}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            {testimonials[active].role.map((role) => (
              <p key={role} className='text-base text-foreground sm:text-lg md:text-xl'>
                {description[role.toLowerCase() as keyof typeof description]}
              </p>
            ))}
            <motion.p className='mt-4 text-base text-muted-foreground sm:mt-6 sm:text-lg md:mt-8'>
              {testimonials[active].teams.map((team, index) => (
                <motion.span
                  key={team.id}
                  initial={{
                    filter: 'blur(10px)',
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: 'blur(0px)',
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: 'easeInOut',
                    delay: 0.02 * index,
                  }}
                  className='inline-block'
                >
                  {team.name}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className='flex gap-4 pt-6 sm:pt-8 md:pt-10 lg:pt-0'>
            <motion.button
              onClick={handlePrev}
              className='group/button flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconArrowLeft className='h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400' />
            </motion.button>
            <motion.button
              onClick={handleNext}
              className='group/button flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconArrowRight className='h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400' />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

const description = {
  président: 'Dirige et représente le club',
  'secrétaire général':
    "Vous m'avez sûrement déjà vu, surtout si vous avez un retard de paiement. Je m'occupe de la gestion de l'association et de son bon fonctionnement. Je coordonne les activités et les événements du club, je résous les problèmes et m'assure que tout se passe bien.",
  webmaster:
    'J’ai conçu le site que vous êtes en train de visiter et je m’assure qu’il reste beau, fonctionnel, et toujours à jour.',
  trésorier: 'Le maître des comptes et le gardien de la caisse. Je veille à ce que chaque euro soit bien dépensé.',
  secrétaire: 'Gère les documents administratifs et la correspondance du club',
  correspondant:
    "Emails, licences, événements, planification des matchs et réservations des terrains : ça se passe ici. Si vous avez une question, j'ai sûrement la réponse, mais cherche-la d'abord.",
};
