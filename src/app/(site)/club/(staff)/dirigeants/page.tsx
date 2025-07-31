import MainSection from '@/components/layouts/MainSection'
import { readMembers } from '@/core/presentation/actions/members/read'
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'
import H1 from '@/components/ui/H1'
import { toPersistence } from '@/mappers/member.mapper'
import { readDirigeants } from '@/core/presentation/actions/members/readDirigeants'

export const metadata = {
  title: 'Dirigeants | Argenteuil Basketball',
  description: "Découvrez les dirigeants du club de basket d'Argenteuil.",
  openGraph: {
    title: 'Dirigeants - Argenteuil Basketball',
    description: "Toutes les infos sur les dirigeants du club de basket d'Argenteuil.",
  },
}

export default async function Index() {
  const members = await readDirigeants().then((members) => {
    return members.map((member) => toPersistence(member))
  })

  return (
    <MainSection>
      <H1>Nos dirigeants</H1>
      {members.length > 0 && <AnimatedTestimonials data={members} />}
    </MainSection>
  )
}
