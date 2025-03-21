import MainSection from '@/components/layouts/MainSection';
import Team from '@/models/Team';
import TeamService from '@/services/Team';
import { WeeklyPlanning } from './components/WeeklyPlanning';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { TeamSchedules } from './components/TeamShedules';
import VideoTitle from '@/components/ui/video-title';
export const metadata = {
  title: 'Plannings | Argenteuil Basketball',
  description: "Découvrez les plannings des entrainements du club de basket d'Argenteuil.",
  openGraph: {
    title: 'Plannings - Argenteuil Basketball',
    description: "Toutes les infos sur les plannings des entrainements du club de basket d'Argenteuil.",
  },
};

export default async function SchedulePage() {
  const teams = await TeamService.getTeams()
    .then((teams) => teams.map((team) => new Team(team)))
    .then((teams) => teams.map((team) => team.toPlainObject()));
  return (
    <MainSection>
      <VideoTitle type='h1' video='/videos/entrainements.mp4'>
        Plannings
      </VideoTitle>
      <Tabs defaultValue='team' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='weekly'>Vue hebdo</TabsTrigger>
          <TabsTrigger value='team'>Vue par équipe</TabsTrigger>
        </TabsList>
        <TabsContent value='weekly'>
          <Card>
            <CardContent>
              <WeeklyPlanning teams={teams} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='team'>
          <Card>
            <CardContent className='p-0'>
              <TeamSchedules teams={teams} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainSection>
  );
}
