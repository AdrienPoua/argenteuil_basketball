import H1 from "@/components/H1";
import MainSection from "@/components/layouts/MainSection";
import Team from "@/models/Team";
import { TeamService } from "@/database/services/Team";
import { WeeklyPlanning } from "./components/WeeklyPlanning";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TeamSchedules } from "./components/TeamShedules";

export default async function SchedulePage() {
  const teams = await new TeamService().getTeams().then((teams) => teams.map((team) => new Team(team))).then((teams) => teams.map((team) => team.toPlainObject()))
  return (
    <>
      <H1>Plannings</H1>
      <MainSection>
      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="weekly">Vue hebdo</TabsTrigger>
          <TabsTrigger value="team">Vue par équipe</TabsTrigger>
        </TabsList>
        <TabsContent value="weekly">
          <Card>
            <CardContent>
              <WeeklyPlanning teams={teams} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="team">
          <Card>
            <CardContent>
              <TeamSchedules teams={teams} />
            </CardContent>
            </Card>
            </TabsContent>
        </Tabs>
      </MainSection>
    </>
  );
}


