import { ReactElement, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  UserCog,
  UserCheck,
  Users,
  Building,
  FileText,
  Calendar,
  BookOpen,
  Euro, ChevronDown, CircleHelp
} from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import ContactDialog from "./ContactDialog";

const navigationData = [
  {
    label: "Club",
    dropdowns: [
      { label: "Dirigeants", href: "/club/dirigeants", icon: UserCog }, // Dirigeants, gestion
      { label: "Entraineurs", href: "/club/entraineurs", icon: UserCheck }, // Entraineur validé
      { label: "Equipes", href: "/club/equipes", icon: Users }, // Équipe représentée par un groupe
      { label: "Gymnases", href: "/club/gymnases", icon: Building }, // Bâtiment pour gymnases
    ]
  },
  {
    label: "Plannings",
    dropdowns: [
      { label: "Matchs", href: "/plannings/matchs", icon: Calendar },
      { label: "Entrainements", href: "/plannings/entrainements", icon: Calendar },
    ]
  },
  {
    label: "Inscriptions 2024",
    dropdowns: [
      { label: "Guide", href: "/inscriptions/guide", icon: BookOpen }, // Livre pour un guide
      { label: "Tarifs", href: "/inscriptions/tarifs", icon: Euro } // Symbole dollar pour les tarifs
    ]
  },
];



export default function DesktopNav(): ReactElement {
  const pathname = usePathname();

  return (
    <header className="hidden lg:flex relative items-center px-6 py-2 bg-foreground">
      <Logo />
      <nav className="flex grow items-center justify-center">
        <ul className="flex">
          {navigationData.map((item) => (
            <DropdownNavItem key={item.label} label={item.label} dropdownItems={item.dropdowns} />
          ))}
          <NavItem href="/documents" label="Documents" isActive={pathname === "/documents"} icon={<FileText className="w-4 h-4" />} />
          <NavItem href="/faq" label="FAQ" isActive={pathname === "/faq"} icon={<CircleHelp className="w-4 h-4" />} />
        </ul>
      </nav>
      <ContactDialog />
    </header>
  );
}
const NavItem = ({ label, href, isActive, icon }: NavItemProps) => {
  return (
    <li>
      <Button variant={isActive ? "activeNav" : "nav"} asChild>
        <Link href={href} className={cn("flex items-center gap-2 px-4 py-2", "text-xl")}>
          {icon}
          {label}
        </Link>
      </Button>
    </li>
  );
}


const DropdownNavItem = ({ dropdownItems, label }: Readonly<DropdownNavItemProps>) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative inline-block text-foreground"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        variant="nav"
        className={cn("flex items-center gap-1 px-4 py-2", "text-lg")}
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
        <div className="absolute left-0 w-48 rounded-md shadow-lg ring-1 ring-primary ring-opacity-5 z-10">
          <div className="bg-primary border-border border rounded-md">
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
}



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