'use client';
import gyms from '@/data/gyms.json';
import H1 from '@/components/H1';
import MainSection from '@/components/layouts/MainSection';
import Card from './Cards';

export default function Page() {
  return (
    <>
      <H1> Nos gymnases </H1>
      <MainSection>
        <div className='flex flex-col gap-16'>
          {gyms.map((gym) => (
            <Card key={gym.id} image={gym.image} name={gym.name} adress={gym.address} city={gym.city} />
          ))}
        </div>
      </MainSection>
    </>
  );
}
