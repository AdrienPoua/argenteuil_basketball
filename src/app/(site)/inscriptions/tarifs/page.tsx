import type { Metadata } from "next"
import { getAllTarifs } from "@/core/presentation/actions/tarifs/read"
import club from "@/core/shared/config/club"
import TarifsClient from "./page.client"

export const metadata: Metadata = {
  title: "Nos tarifs",
  description:
    "Découvrez les tarifs de Argenteuil Basketball pour la saison 2025-2026 : cotisations par catégorie d'âge, frais de mutation, modalités de paiement. Réductions familles nombreuses.",
  keywords: [
    "tarifs Argenteuil Basketball",
    "cotisation basket",
    "prix licence basket",
    "tarif club basketball",
    "frais inscription",
    "réduction famille",
    "paiement échelonné",
    "chèques vacances",
  ],
  openGraph: {
    title: `Nos tarifs - ${club.name}`,
    description:
      "Découvrez les tarifs du club de basket d'Argenteuil : cotisations par catégorie, réductions familles et modalités de paiement.",
    url: `https://${club.domain}/inscriptions/tarifs`,
    images: [
      {
        url: `https://${club.domain}${club.logo}`,
        width: 1200,
        height: 630,
        alt: "Tarifs Argenteuil Basketball",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Nos tarifs - ${club.name}`,
    description:
      "Découvrez les tarifs du club de basket d'Argenteuil : cotisations par catégorie, réductions familles et modalités de paiement.",
    images: [`https://${club.domain}${club.logo}`],
  },
  alternates: {
    canonical: `https://${club.domain}/inscriptions/tarifs`,
  },
}

export default async function TarifsPage() {
  const tarifs = await getAllTarifs()
  return <TarifsClient tarifs={tarifs} />
}
