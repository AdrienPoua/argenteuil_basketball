"use client";
import { ReactElement } from "react";
import { useQuery } from "react-query";
import { getClubs } from "@/lib/mongo/controllers/clubs";
import Feedback from "@/components/FetchFeedback";
import useUpdate from "@/utils/hooks/scrapFFBB/useUpdate";
import Club from "@/utils/models/Club";
import Instructions from "@/app/(admin)/admin/dashboard/components/Instructions";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"; // CircularProgress equivalent
import { Card, CardContent } from "@/components/ui/card"; // For club cards
import { Separator } from "@/components/ui/separator"; // For dividing content

export default function Index(): ReactElement {
  const { data, error, isLoading: queryLoading } = useQuery(['clubs'], async () => await getClubs());
  const clubs = data?.map((club) => new Club(club));
  const { update, isLoading } = useUpdate();

  return (
    <Feedback data={data} error={error} isLoading={queryLoading}>
      <div className="flex flex-col gap-6 justify-center items-center size-fit">
        {/* Instructions */}
        <Instructions className="bg-gray-100 p-4 rounded-lg">
          <p className="text-black">
            Pour l&apos;instant, la fonctionnalité pour mettre à jour les correspondants des clubs n&apos;est pas disponible.
            <br />
            Elle est disponible qu&apos;en local.
            <br />
            J&apos;attends la mise à jour du site de la fédération.
          </p>
        </Instructions>

        {/* Update button */}
        <Button disabled={isLoading} onClick={update} className="mb-5">
          {isLoading ? <Loader2 className="animate-spin" /> : "Update"}
        </Button>

        {/* Clubs */}
        {clubs?.map((club, index) => (
          <ClubCard data={club} key={club.name + index} />
        ))}
      </div>
    </Feedback>
  );
}

const ClubCard = ({ data }: { data: Club }): ReactElement => {
  const { president, correspondant } = data;

  return (
    <Card className="w-full p-6 border-2 border-primary rounded-lg">
      <h3 className="text-center text-primary text-3xl font-bold">{data.name}</h3>
      <Separator className="my-4" />
      <CardContent className="grid grid-cols-4 justify-center items-center gap-5">
        {president && <ClubCell data={president} />}
        {correspondant && <ClubCell data={correspondant} />}
      </CardContent>
    </Card>
  );
};

const ClubCell = ({ data }: { data: { role: string; name: string; email: string; number: string } }): ReactElement => {
  const { role, name, email, number } = data;
  const isDisabled = email === "@" || number === "/";

  return (
    <>
      {/* Role */}
      <Button className="w-full">{role}</Button>

      {/* Name */}
      <Button className="w-full">{name}</Button>

      {/* Email */}
      <Button
        className="w-full"
        disabled={isDisabled}
        onClick={() => {
          window.open(`mailto:${email}`);
        }}
      >
        {email}
      </Button>

      {/* Phone Number */}
      <Button className="w-full" disabled={isDisabled}>
        {number}
      </Button>
    </>
  );
};
