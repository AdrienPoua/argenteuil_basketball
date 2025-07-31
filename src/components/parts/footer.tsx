import { Facebook, Heart, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import club from "@/core/shared/config/club"

export default function Footer() {
  return (
    <footer className="from-muted/50 to-background border-border/50 border-t bg-gradient-to-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo et description */}
          <div className="space-y-4">
            <Link href="/" className="group flex items-center space-x-3">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={50}
                height={50}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div>
                <h3 className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-lg font-bold text-transparent">
                  {club.name}
                </h3>
                <p className="text-muted-foreground text-xs">Basketball Club</p>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Passionnés de basketball depuis des années, nous formons et accompagnons les joueurs de tous niveaux dans
              un esprit de fair-play et de dépassement de soi.
            </p>
            <div className="flex space-x-3">
              <SocialButton href={club.social.facebook} icon={<Facebook className="h-4 w-4" />} />
              <SocialButton href={club.social.instagram} icon={<Instagram className="h-4 w-4" />} />
              <SocialButton href="#" icon={<Twitter className="h-4 w-4" />} />
              <SocialButton href="#" icon={<Youtube className="h-4 w-4" />} />
            </div>
          </div>

          {/* Navigation rapide */}
          <div className="space-y-4">
            <h4 className="text-foreground text-sm font-semibold tracking-wide uppercase">Navigation</h4>
            <nav className="space-y-3">
              <FooterLink href="/club/equipes">Nos équipes</FooterLink>
              <FooterLink href="/plannings/matchs">Calendrier</FooterLink>
              <FooterLink href="/adhesion/guide">Rejoindre le club</FooterLink>
              <FooterLink href="/blog">Actualités</FooterLink>
              <FooterLink href="/faq">Questions fréquentes</FooterLink>
            </nav>
          </div>

          {/* Informations pratiques */}
          <div className="space-y-4">
            <h4 className="text-foreground text-sm font-semibold tracking-wide uppercase">Informations</h4>
            <nav className="space-y-3">
              <FooterLink href="/adhesion/tarifs">Tarifs</FooterLink>
              <FooterLink href="/adhesion/reglement">Règlement</FooterLink>
              <FooterLink href="/documents">Documents</FooterLink>
              <FooterLink href="/plannings/entrainements">Entraînements</FooterLink>
              <FooterLink href="/mentions-legales">Mentions légales</FooterLink>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-foreground text-sm font-semibold tracking-wide uppercase">Contact</h4>
            <div className="space-y-3">
              <ContactInfo
                icon={<Mail className="h-4 w-4" />}
                href={`mailto:${club.contact.email}`}
                text={club.contact.email}
              />
              <ContactInfo
                icon={<Phone className="h-4 w-4" />}
                href={`tel:${club.contact.phone}`}
                text={club.contact.phone}
              />
              <ContactInfo
                icon={<MapPin className="h-4 w-4" />}
                href={club.gymnase.maps}
                text={`${club.gymnase.address}, ${club.gymnase.city}`}
              />
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button
                asChild
                size="sm"
                className="from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 w-full bg-gradient-to-r shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <Link href="/adhesion/guide">Rejoindre le club</Link>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Bottom section */}
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="text-muted-foreground flex flex-col items-center space-y-2 text-sm md:flex-row md:space-y-0 md:space-x-6">
            <p>© 2024 {club.name}. Tous droits réservés.</p>
            <div className="flex items-center space-x-4">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Confidentialité
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Conditions
              </Link>
            </div>
          </div>

          {/* Made with love */}
          <div className="group flex items-center space-x-2">
            <span className="text-muted-foreground text-sm">Créé avec</span>
            <Heart className="h-4 w-4 text-red-500 group-hover:animate-pulse" />
            <Link
              href="https://www.linkedin.com/in/adrien-poua"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
            >
              par Adrien
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle gradient overlay */}
    </footer>
  )
}

function SocialButton({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="bg-muted/50 hover:bg-primary/10 text-muted-foreground hover:text-primary flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
    >
      {icon}
    </Link>
  )
}

function FooterLink({ href, children }: Readonly<{ href: string; children: React.ReactNode }>) {
  return (
    <Link
      href={href}
      className="text-muted-foreground hover:text-foreground group block text-sm transition-colors duration-300"
    >
      <span className="relative">
        {children}
        <span className="bg-primary absolute inset-x-0 -bottom-1 h-0.5 scale-x-0 transform transition-transform duration-300 group-hover:scale-x-100" />
      </span>
    </Link>
  )
}

function ContactInfo({ icon, href, text }: { icon: React.ReactNode; href: string; text: string }) {
  return (
    <Link
      href={href}
      className="text-muted-foreground hover:text-foreground group flex items-center space-x-3 text-sm transition-colors duration-300"
    >
      <div className="text-primary transition-transform duration-300 group-hover:scale-110">{icon}</div>
      <span>{text}</span>
    </Link>
  )
}
