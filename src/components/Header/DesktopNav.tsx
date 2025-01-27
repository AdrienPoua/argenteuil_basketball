"use client"

import { ReactElement } from "react";
import Link from "next/link";
import {
  UserIcon,
  Users,
  Crown,
  Dumbbell,
  Building2,
  CalendarDays,
  GraduationCap,
  Euro,
  FileText,
  HelpCircle
} from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import ContactDialog from "./ContactDialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";



export default function DesktopNav(): ReactElement {
  return (
    <header className="hidden lg:flex relative items-center px-6 py-2 bg-foreground justify-between">
      <Logo />
      <NavigationMenu className="flex grow justify-center">
        <NavigationMenuList>
          <ClubItem />
          <ScheduleItem />
          <GuideItem />
          <NavigationMenuItem>
            <Link href="/documents" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <span className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Documents
                </span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/faq" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <span className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  FAQ
                </span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu >
      <div className="flex items-center gap-2">
        <Button variant="nav" asChild>
          <Link href="/login">
            <UserIcon />
          </Link>
        </Button>
        <ContactDialog />
      </div>
    </header>
  );
}


const ClubItem = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Le club</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          <li className="row-span-3 ">
            <NavigationMenuLink asChild>
              <Link
                className="flex h-full w-full select-none flex-col justify-end p-6 no-underline outline-none focus:shadow-md relative z-10 border-2 border-transparent hover:border-primary rounded-md overflow-hidden"
                href="/club/equipes"
              >
                <Image src="/images/divers/teams.avif" alt="Nos équipes" width={500} height={500} className="w-full h-full object-cover absolute inset-0 -z-10" />
                <Users className="h-6 w-6 text-foreground" />
                <div className="mb-2 mt-4 text-lg font-medium text-foreground">
                  Nos équipes
                </div>
                <p className="text-sm leading-tight text-foreground">
                  Découvrez nos équipes
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          <ListItem href="/club/dirigeants" title="Nos dirigeants" icon={<Crown className="h-4 w-4" />}>
            L&apos;équipe qui fait vivre le club au quotidien
          </ListItem>
          <ListItem href="/club/entraineurs" title="Nos entraineurs" icon={<Dumbbell className="h-4 w-4" />}>
            Les coachs qui forment nos joueurs
          </ListItem>
          <ListItem href="/club/gymnases" title="Nos gymnases" icon={<Building2 className="h-4 w-4" />}>
            Les lieux où se déroulent nos activités
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

const ScheduleItem = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Plannings</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-1">
          <ListItem href="/plannings/matchs" title="Les matchs" icon={<CalendarDays className="h-4 w-4" />}>
            Consultez le calendrier des rencontres à venir
          </ListItem>
          <ListItem href="/plannings/entrainements" title="Les entrainements" icon={<CalendarDays className="h-4 w-4" />}>
            Horaires et lieux des séances d&apos;entraînement
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

const GuideItem = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Les inscriptions</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-1">
          <ListItem href="/inscriptions/guide" title="Les inscriptions" icon={<GraduationCap className="h-4 w-4" />}>
            Comment s&apos;inscrire au club pour la saison
          </ListItem>
          <ListItem href="/inscriptions/tarifs" title="Les tarifs" icon={<Euro className="h-4 w-4" />}>
            Détails des cotisations et modalités de paiement
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

const ListItem = ({ className, title, children, href, icon }: {
  className?: string,
  title: string,
  children: React.ReactNode,
  href: string,
  icon: React.ReactNode
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:border-primary border-2 border-transparent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
        >
          <div className="text-sm font-medium leading-none flex items-center gap-2">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}