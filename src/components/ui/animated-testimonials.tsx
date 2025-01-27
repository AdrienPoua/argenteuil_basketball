"use client"

import { IconMail, IconPhone, IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import type Member from "@/models/Member"

type Testimonial = ReturnType<Member["toPlainObject"]>

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[]
  autoplay?: boolean
}) => {
  const [active, setActive] = useState(0)

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const isActive = (index: number) => {
    return index === active
  }

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000)
      return () => clearInterval(interval)
    }
  }, [autoplay, testimonials, handleNext]) // Added handleNext to dependencies

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10
  }

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "")
    const match = cleaned.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/)
    if (match) {
      return match.slice(1).join(" ")
    }
    return phone
  }

  return (
    <div className="mx-auto antialiased font-sans px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-16 md:py-20 w-full border-2 border-primary rounded-lg">
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20">
        <div className="relative min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
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
                  ease: "easeInOut",
                }}
                className="absolute inset-0 origin-bottom flex items-center justify-center"
              >
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={500}
                  height={500}
                  draggable={false}
                  className="rounded-3xl object-cover object-center bg-background border-2 border-primary w-full h-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px]"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="flex justify-between flex-col py-4 space-y-4 sm:space-y-6">
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
              ease: "easeInOut",
            }}
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              {testimonials[active].name}
            </h3>
            <h4 className="text-xl sm:text-2xl md:text-3xl text-primary mb-3 sm:mb-5">
              {testimonials[active].role.join(", ")}
            </h4>
            <div className="flex flex-wrap gap-4 mb-3 sm:mb-5">
              {testimonials[active].email && (
                <TooltipProvider delayDuration={10}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.a
                        href={`mailto:${testimonials[active].email}`}
                        className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-100"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconMail className="h-5 w-5" />
                        <span>Email</span>
                      </motion.a>
                    </TooltipTrigger>
                    <TooltipContent className="duration-100">{testimonials[active].email}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {testimonials[active].phone && (
                <TooltipProvider delayDuration={10}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.a
                        href={`tel:${testimonials[active].phone}`}
                        className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconPhone className="h-5 w-5" />
                        <span>Phone</span>
                      </motion.a>
                    </TooltipTrigger>
                    <TooltipContent>{formatPhoneNumber(testimonials[active].phone)}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            {testimonials[active].role.map((role) => (
              <p key={role} className="text-base sm:text-lg md:text-xl text-foreground">
                {description[role.toLowerCase() as keyof typeof description]}
              </p>
            ))}
            <motion.p className="text-base sm:text-lg text-muted-foreground mt-4 sm:mt-6 md:mt-8">
              {testimonials[active].teams.map((team, index) => (
                <motion.span
                  key={team.id}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {team.name}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-6 sm:pt-8 md:pt-10 lg:pt-0">
            <motion.button
              onClick={handlePrev}
              className="h-10 w-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
            </motion.button>
            <motion.button
              onClick={handleNext}
              className="h-10 w-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

const description = {
  président: "Dirige et représente le club",
  "secrétaire général":
    "Vous m'avez sûrement déjà vu, surtout si vous avez un retard de paiement. Je m'occupe de la gestion de l'association et de son bon fonctionnement. Je coordonne les activités et les événements du club, je résous les problèmes et m'assure que tout se passe bien.",
  webmaster:
    "J’ai conçu le site que vous êtes en train de visiter et je m’assure qu’il reste beau, fonctionnel, et toujours à jour.",
  trésorier: "Le maître des comptes et le gardien de la caisse. Je veille à ce que chaque euro soit bien dépensé.",
  secrétaire: "Gère les documents administratifs et la correspondance du club",
  correspondant:
    "Emails, licences, événements, planification des matchs et réservations des terrains : ça se passe ici. Si vous avez une question, j'ai sûrement la réponse, mais cherche-la d'abord.",
}

