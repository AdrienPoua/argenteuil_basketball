'use client'
import H2 from '@/components/ui/h2'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const faqItems = [
  {
    question: 'Le certificat médical est-il obligatoire ?',
    answer: [
      'Non pour les mineurs',
      'Oui pour les majeurs (valable 3 ans)',
      "La mention 'basketball en compétition' est indispensable pour que le certificat soit valable.",
      'Un certificat médical vierge est disponible sur le site dans la page documents. (recommandé)',
    ],
  },
  {
    question: "Je n'ai pas reçu d'email pour l'inscription informatique, que faire ?",
    answer: [
      'Contactez-nous par email',
      'Donnez nous les informations suivantes : nom, prénom, date de naissance',
    ],
  },
  {
    question: "Puis-je m'inscrire en cours d'année ?",
    answer: [
      "Oui, les inscriptions restent possibles tout au long de l'année.",
      "Une réduction proportionnelle peut être appliquée selon la période d'inscription.",
    ],
  },
  {
    question: 'Quels moyens de paiement acceptez-vous ?',
    answer: [
      "Chèque à l'ordre d'Argenteuil Basketball.",
      "Paiement en ligne via le formulaire d'inscription.",
      'Espèces',
      "Possibilité de paiement en plusieurs fois (jusqu'à 3 échéances).",
    ],
  },
]

export function FAQSection() {
  return (
    <section className="">
      <div className="container mx-auto px-4 md:px-6">
        <H2 className="mb-12">Questions fréquentes</H2>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {faqItems.map((item, index) => (
            <div
              key={item.question.slice(0, 5) + index}
              className="cursor-pointer rounded-lg border-2 border-primary p-6 shadow-sm transition-shadow hover:bg-primary/10 hover:shadow-md"
            >
              <h3 className="mb-3 bg-primary/10 text-center text-lg font-semibold text-primary">
                {item.question}
              </h3>
              <ul className="list-disc space-y-2 pl-5">
                {item.answer.map((point, pointIndex) => (
                  <li key={pointIndex + item.question.slice(0, 5)} className="font-secondary">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/faq">
              Voir toutes les questions <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
