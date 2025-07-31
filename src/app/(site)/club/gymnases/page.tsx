import MainSection from '@/components/layouts/MainSection'
import Card from './Cards'
import H1 from '@/components/ui/H1'

export const metadata = {
  title: 'Gymnases | Argenteuil Basketball',
  description: "Découvrez les gymnases du club de basket d'Argenteuil.",
  openGraph: {
    title: 'Gymnases - Argenteuil Basketball',
    description: "Toutes les infos sur les gymnases du club de basket d'Argenteuil.",
  },
}

export default function Page() {
  return (
    <MainSection>
      <H1>Nos gymnases</H1>
      <div className="mb-20 flex flex-col gap-16">
        {gyms.map((gym) => (
          <Card
            key={gym.id}
            name={gym.name}
            adress={gym.address}
            city={gym.city}
            coordinates={gym.coordinates}
          />
        ))}
      </div>
    </MainSection>
  )
}

const gyms = [
  {
    id: '1',
    name: 'Jean Guimier',
    address: '2 rue jean de la fontaine',
    city: 'Argenteuil',
    zipcode: '95100',
    coordinates: {
      lat: 48.947223626785416,
      lng: 2.2299871270600704,
    },
  },
  {
    id: '2',
    name: 'Jesse Owens',
    address: '120 rue de rochefort',
    city: 'Argenteuil',
    zipcode: '95100',
    coordinates: {
      lat: 48.93982316461645,
      lng: 2.210973365125581,
    },
  },
]
