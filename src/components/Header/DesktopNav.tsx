import { ReactElement, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Home, Users, UserCircle, Layers, Building2, Clock, Calendar, Trophy, BookOpen, PiggyBank } from 'lucide-react';
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import ContactDialog from "./ContactDialog";

const navigationData = [
  {
    label: "Club",
    dropdowns: [
      { label: "Dirigeants", href: "/club/dirigeants", icon: Users },
      { label: "Entraineurs", href: "/club/entraineurs", icon: UserCircle },
      { label: "Equipes", href: "/club/equipes", icon: Layers },
      { label: "Gymnases", href: "/club/gymnases", icon: Building2 }
    ]
  },
  {
    label: "Entrainements 2024",
    dropdowns: [
      { label: "Horaires", href: "/entrainements/horaires", icon: Clock }
    ]
  },
  {
    label: "Matchs",
    dropdowns: [
      { label: "Calendrier", href: "/matchs/calendrier", icon: Calendar },
      { label: "Résultats", href: "/matchs/resultats", icon: Trophy }
    ]
  },
  {
    label: "Inscriptions 2024",
    dropdowns: [
      { label: "Guide", href: "/inscriptions/guide", icon: BookOpen },
      { label: "Tarifs", href: "/inscriptions/tarifs", icon: PiggyBank }
    ]
  },
];

export default function Header(): ReactElement {
  const pathname = usePathname();

  return (
    <header className="hidden lg:flex relative items-center">
      <Logo />
      <nav className="flex grow items-center justify-center">
        <ul className="flex">
          {navigationData.map((item) => (
            <DropdownNavItem key={item.label} label={item.label} dropdownItems={item.dropdowns} />
          ))}
          <NavItem href="/documents" label="Documents" isActive={pathname === "/documents"} icon={<Home className="w-4 h-4" />} />
          <NavItem href="/faq" label="FAQ" isActive={pathname === "/faq"} icon={<Home className="w-4 h-4" />} />
        </ul>
      </nav>
      <ContactDialog />
    </header>
  );
}

const NavItem = ({ label, href, isActive, icon }: NavItemProps) => (
  <li>
    <Button variant="ghost" asChild>
      <Link
        href={href}
        className={cn(
          "flex items-center gap-2 px-4 py-2",
          "text-sm font-medium transition-colors",
          isActive ? "text-primary" : "text-foreground",
          "hover:text-primary"
        )}
      >
        {icon}
        {label}
      </Link>
    </Button>
  </li>
);



const DropdownNavItem = ({ dropdownItems, label }: DropdownNavItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative inline-block text-foreground"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        variant="ghost"
        className={cn(
          "flex items-center gap-1 px-4 py-2",
          "text-sm font-medium transition-colors",
          "hover:text-primary"
        )}
      >
        {label}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isHovered ? "rotate-180" : "rotate-0"
          )}
        />
      </Button>

      {isHovered && (
        <div className="absolute left-0 w-48 pt-2 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
          <div className="bg-background border-border border rounded-md py-1">
            {dropdownItems.map((item) => (
              <Button key={item.label} variant="ghost" asChild className="w-full justify-start rounded-none">
                <Link href={item.href} className="flex items-center px-4 py-2 text-sm">
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface NavItemProps {
  label: string;
  href: string;
  isActive: boolean;
  icon?: React.ReactNode;
}

interface DropdownItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface DropdownNavItemProps {
  label: string;
  dropdownItems: DropdownItem[];
}