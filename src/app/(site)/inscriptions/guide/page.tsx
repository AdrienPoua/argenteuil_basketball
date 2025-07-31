import Tabs from './components/Tabs'
import { FAQSection } from './components/FAQSection'
import MainSection from '@/components/layouts/MainSection'
import H1 from '@/components/ui/H1'

export const metadata = {
  title: "Guide d'inscription | Argenteuil Basketball",
  description: "Suivez ce guide pour vous inscrire au club de basket d'Argenteuil.",
  openGraph: {
    title: "Guide d'inscription - Argenteuil Basketball",
    description: "Suivez ce guide pour vous inscrire au club de basket d'Argenteuil.",
  },
}

// Composant principal
export default function GuidePage() {
  return (
    <MainSection>
      <H1>Guide d&apos;inscription</H1>
      <Tabs />
      <FAQSection />
    </MainSection>
  )
}
