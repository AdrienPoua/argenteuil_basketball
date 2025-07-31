'use client';

import { IconMail, IconPhone, IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { toDomain, toPersistence } from '@/mappers/member.mapper';
import { MemberRole } from '@/core/domain/entities/member.entity';

type PropsType = {
  data: ReturnType<typeof toPersistence>[];
  autoplay?: boolean;
};

export const AnimatedTestimonials = ({ data, autoplay = false }: Readonly<PropsType>) => {
  const members = data.map((member) => toDomain(member));
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % members.length);
  }, [members]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + members.length) % members.length);
  }, [members]);

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, members, handleNext]); // Added handleNext to dependencies

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
            {members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -10,
                  rotate: randomRotateY(),
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.95,
                  z: isActive(index) ? 0 : -10,
                  rotate: isActive(index) ? 0 : randomRotateY(),
                  zIndex: isActive(index) ? 10 : members.length + 2 - index,
                  y: isActive(index) ? [0, -80, 0] : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 10,
                  rotate: randomRotateY(),
                }}
                transition={{
                  duration: 0.4,
                  ease: 'easeInOut',
                }}
                className='absolute inset-0 flex origin-bottom items-center justify-center'
              >
                <Image
                  src={member.image || '/placeholder.svg'}
                  alt={member.first_name}
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
              {members[active].first_name}
            </h3>
            <h4 className='mb-3 text-xl text-primary sm:mb-5 sm:text-2xl md:text-3xl'>
              {members[active].role.join(', ')}
            </h4>
            <div className='mb-3 flex flex-wrap gap-4 sm:mb-5'>
              {members[active].email && (
                <TooltipProvider delayDuration={10}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.a
                        href={`mailto:${members[active].email}`}
                        className='flex items-center space-x-2 text-sm text-muted-foreground transition-colors duration-100 hover:text-foreground'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconMail className='h-5 w-5' />
                        <span>Email</span>
                      </motion.a>
                    </TooltipTrigger>
                    <TooltipContent className='duration-100'>{members[active].email}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {members[active].phone && (
                <TooltipProvider delayDuration={10}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.a
                        href={`tel:${members[active].phone}`}
                        className='flex items-center space-x-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconPhone className='h-5 w-5' />
                        <span>Phone</span>
                      </motion.a>
                    </TooltipTrigger>
                    <TooltipContent>{formatPhoneNumber(members[active].phone)}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            {members[active].role.map((role) => (
              <p key={role} className='text-base text-foreground sm:text-lg md:text-xl'>
                {description[role as keyof typeof description]}
              </p>
            ))}
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

const description: Record<MemberRole, string> = {
  [MemberRole.President]:
    "Vous m'avez surement jamais vu, mais je suis le président du club et oui, j'existe. J'endosse la responsabilité de l'association",
  [MemberRole.VicePresident]:
    "Vous m'avez sûrement déjà vu, surtout si vous avez un retard de paiement. Je m'occupe de la gestion de l'association et de son bon fonctionnement. Je coordonne les activités et les événements du club, je résous les problèmes et m'assure que tout se passe bien.",
  [MemberRole.Treasurer]:
    'Le maître des comptes et le gardien de la caisse. Je veille à ce que chaque euro soit bien dépensé.',
  [MemberRole.Secretary]: 'Gère les documents administratifs et la correspondance du club',
  [MemberRole.Correspondant]:
    "Emails, licences, événements, planification des matchs et réservations des terrains : ça se passe ici. Si vous avez une question, j'ai sûrement la réponse, mais cherche-la d'abord.",
  [MemberRole.Coach]:
    "Passionné de basket, je forme et développe les talents de nos joueurs. Mon objectif : faire progresser chaque joueur et créer une vraie cohésion d'équipe.",
  [MemberRole.Member]:
    'Membre actif du club, je participe à la vie associative et contribue au bon fonctionnement des activités et événements.',
  [MemberRole.Arbitre]:
    "Arbitre officiel, je veille au respect des règles et à l'équité lors des matchs. Mon rôle est de garantir un jeu fair-play pour tous.",
  [MemberRole.OTM]:
    'Officiel de Table de Marque, je gère le score, les fautes et toutes les statistiques pendant les matchs. Précision et concentration sont mes maîtres mots.',
  [MemberRole.Other]:
    "Membre de l'équipe dirigeante, je contribue à ma façon au développement et au rayonnement du club dans toutes ses activités.",
};
