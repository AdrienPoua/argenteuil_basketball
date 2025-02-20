import gyms from '@/data/gyms.json';
import MainSection from '@/components/layouts/MainSection';
import Card from './Cards';
import VideoTitle from '@/components/ui/video-title';

export const metadata = {
  title: 'Gymnases | Argenteuil Basketball',
  description: "Découvrez les gymnases du club de basket d'Argenteuil.",
  openGraph: {
    title: 'Gymnases - Argenteuil Basketball',
    description: "Toutes les infos sur les gymnases du club de basket d'Argenteuil.",
  },
};

export default function Page() {
  return (
    <MainSection>
      <VideoTitle type='h1' video='/videos/gymnases.mp4'>
        Nos gymnases
      </VideoTitle>
      <div className='flex flex-col gap-16'>
        {gyms.map((gym) => (
          <Card key={gym.id} image={gym.image} name={gym.name} adress={gym.address} city={gym.city} />
        ))}
      </div>
    </MainSection>
  );
}
