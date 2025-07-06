import MainSection from '@/components/layouts/MainSection';
import Team from '@/models/Team';
import TeamService from '@/services/Team';
import TrainingSchedule from './components/WeeklyPlanning';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { TeamSchedules } from './components/TeamShedules';
import H2 from '@/components/ui/h2';

export const metadata = {
  title: 'Horaires des entrainements | Argenteuil Basketball',
  description: 'Retrouvez ici tous les horaires des entrainements de basketball à Argenteuil.',
  openGraph: {
    title: 'Horaires des entrainements - Argenteuil Basketball',
    description: 'Retrouvez ici tous les horaires des entrainements de basketball à Argenteuil.',
  },
};

export default async function SchedulePage() {
  const teams = await TeamService.getTeams()
    .then((teams) => teams.map((team) => new Team(team)))
    .then((teams) => teams.map((team) => team.toPlainObject()));
  return (
    <MainSection>
      <H2>Tous les entrainements</H2>
      <Tabs defaultValue='team' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='weekly'>Vue hebdo</TabsTrigger>
          <TabsTrigger value='team'>Vue par équipe</TabsTrigger>
        </TabsList>
        <TabsContent value='weekly'>
          <Card>
            <CardContent>
              <TrainingSchedule teams={teams} />
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
