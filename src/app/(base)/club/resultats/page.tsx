"use client";
import Table from "./table";
import H1 from "@/components/H1";
import MainSection from "@/components/layouts/MainSection";
import Feedback from "@/components/FetchFeedback";
import useScorenco from "@/hooks/useScorenco";
import { Button } from "@/components/ui/button";
import { useQuery } from "react-query";
import { getRanking } from "@/services/api/getRanking"

export default function Index() {
      const { data: poulesIDS } = useQuery(["poulesID", token], () => getRanking(token as string), { enabled: !!token });

  const { data } = useQuery(["clientsMatchs"], async () => {
    const rank = await getRanking();
    return (
      <>
        <H1> classement </H1>
        <MainSection>
          <Feedback
            data={clubs}
            isLoading={loadingClubs}
            error={errorClubs}
          >
            <div
              className="flex flex-col ">
              <div className="flex overflow-x-auto">
                {clubs?.teams.map((team: { competitions: { id: string }[]; shortName: string }) => {
                  const id = team.competitions[0].id.toString();
                  return (
                    <Button
                      key={team.shortName}
                      className="grow flex-wrap rounded-none"
                      variant={selectedTeam === id ? "default" : "outline"}
                      onClick={() => setSelectedTeam(id)}>
                      {team.shortName}
                    </Button>
                  );
                })}
              </div>
              <div className="w-full">
                {ranking && <Table ranking={ranking} />}
              </div>
            </div>
          </Feedback>
        </MainSection >
      </>
    );
  }