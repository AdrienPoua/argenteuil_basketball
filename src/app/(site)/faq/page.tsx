import type { Metadata } from 'next';
import H1 from '@/components/ui/H1';
import { readFaqs } from '@/core//presentation/actions/faq/read';
import club from '@/core/shared/config/club';
import FaqComponents from './page.client';

export const metadata: Metadata = {
  title: 'FAQ - Questions fréquentes',
  description:
    "Trouvez les réponses aux questions les plus fréquentes sur le club de basket d'Argenteuil : inscriptions, entraînements, matchs, tarifs et fonctionnement du club.",
  keywords: [
    "FAQ club de basket d'Argenteuil",
    'questions fréquentes basket',
    'aide club basketball',
    'réponses inscription',
    'informations pratiques',
    'guide adhérent',
    'questions parents',
    'aide débutant basket',
  ],
  openGraph: {
    title: `FAQ - Questions fréquentes - ${club.name}`,
    description: "Trouvez les réponses aux questions les plus fréquentes sur le club de basket d'Argenteuil.",
    url: `https://${club.domain}/faq`,
    images: [
      {
        url: `https://${club.domain}${club.logo}`,
        width: 1200,
        height: 630,
        alt: "FAQ club de basket d'Argenteuil",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `FAQ - Questions fréquentes - ${club.name}`,
    description: "Trouvez les réponses aux questions les plus fréquentes sur le club de basket d'Argenteuil.",
    images: [`https://${club.domain}${club.logo}`],
  },
  alternates: {
    canonical: `https://${club.domain}/faq`,
  },
};

export default async function FaqPage() {
  const faq = await readFaqs().then((faqs) => faqs.map((faq) => faq.toObject()));
  return (
    <div>
      <H1>FAQ</H1>
      <FaqComponents faq={faq} />
    </div>
  );
}
