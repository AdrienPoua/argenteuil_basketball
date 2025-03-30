import Tabs from './components/Tabs';
import { FAQSection } from './components/FAQSection';
import MainSection from '@/components/layouts/MainSection';
import H2 from '@/components/ui/h2';

export const metadata = {
  title: "Guide d'inscription | Argenteuil Basketball",
  description: "Suivez ce guide pour vous inscrire au club de basket d'Argenteuil.",
  openGraph: {
    title: "Guide d'inscription - Argenteuil Basketball",
    description: "Suivez ce guide pour vous inscrire au club de basket d'Argenteuil.",
  },
};

// Composant principal
export default function GuidePage() {
  return (
    <MainSection>
      <H2>Guide d&apos;inscription</H2>
      <Tabs />
      <FAQSection />
    </MainSection>
  );
}
