import MainSection from '@/components/layouts/MainSection';
import Card from './StaffCard';
import MemberService from '@/services/Member';
import Member from '@/models/Member';
import VideoTitle from '@/components/ui/video-title';
export const metadata = {
  title: 'Entraineurs | Argenteuil Basketball',
  description: "Découvrez les entraineurs du club de basket d'Argenteuil.",
  openGraph: {
    title: 'Entraineurs - Argenteuil Basketball',
    description: "Toutes les infos sur les entraineurs du club de basket d'Argenteuil.",
  },
};

export default async function Index() {
  const coachs = await MemberService.getCoachs().then((coach) => coach.map((c) => new Member(c).toPlainObject()));
  return (
    <>
      <VideoTitle type='h1' video='/videos/entraineurs.mp4'>
        Nos entraineurs
      </VideoTitle>
      <MainSection>
        <div className='grid grid-cols-1 place-items-center items-center justify-center gap-10 p-10 md:grid-cols-3'>
          {coachs?.map((coach) => <Card key={coach.id} data={coach} />)}
        </div>
      </MainSection>
    </>
  );
}
