"use client";

import { useState } from "react";
import { Gym } from "@/utils/models";
import H1 from "@/components/H1";
import MainSection from "@/components/layouts/MainSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { MIN_BIRTH_YEAR_FOR_MEMBER, AT_THIS_YEAR_IAM_SENIOR } from "@/utils/magicNumber";
import useIsMobile from "@/utils/hooks/useIsMobile";
import FetchFeedBack from "@/components/FetchFeedback";
import useFetchTeams from "@/utils/hooks/DBFetch/useFetchTeam";
import categories from "@/data/categories.json"
import { gyms } from "@/utils/services/dataProcessing";

const ScheduleSlot = ({ slot, categoryResult }: { slot: any; categoryResult: string | null }) => {
  const isMobile = useIsMobile();
  const firstTeam = slot.team?.split("-")[0];
  const secondTeam = slot.team?.split("-")[1];
  const isCategoryResult = categoryResult && (slot.team?.includes(categoryResult.split(" ")[0]) || slot.team?.includes(categoryResult.split(" ")[1]));

  return (
    <div className="h-full ">
      <div className={`p-2 rounded w-full  shadow-md h-full ${isCategoryResult ? "bg-green-500 animate-bounce " : "bg-white"} `}>
        <p className="text-primary text-xs md:text-base text-center">
          {!isMobile ? slot.team : firstTeam}
          <br />
          {isMobile && secondTeam}
        </p>
        <p className="text-black text-xs md:text-base text-center">
          {slot.start} {!isMobile ? "-" : <br />} {slot.end}
        </p>
      </div>
    </div>
  );
};

const ScheduleDay = ({ day, slots, categoryResult }: { day: string; slots: any[]; categoryResult: string | null }) => (
  <div className="w-full">
    <div className="flex space-x-1">
      <div className="w-1/4 p-2 flex justify-center items-center bg-white rounded">
        <p className="text-black text-xs md:text-lg">{day}</p>
      </div>
      <div className="w-3/4 grid grid-cols-3 gap-1">
        {slots.map((slot) => (
          <ScheduleSlot key={slot.day + slot.start + slot.end + slot.gym} slot={slot} categoryResult={categoryResult} />
        ))}
      </div>
    </div>
  </div>
);

const Schedule = ({ data: gym, categoryResult }: { data: Gym; categoryResult: string | null }) => {
  return (
    <div className="flex flex-col border bg-primary p-4">
      <h2 className="text-white text-5xl text-center pb-4">{gym.name}</h2>
      <div className="grid grid-cols-1 gap-4">
        {gym.available.map((day) => {
          const slotsForDay = gym.slots.filter((slot) => slot.day === day).sort((a, b) => Number(a.end.split(":")[0]) - Number(b.end.split(":")[0]));
          return <ScheduleDay key={day} day={day} slots={slotsForDay} categoryResult={categoryResult} />;
        })}
        <div className="p-4 bg-white flex justify-center items-center">
          <p className="text-black text-base lg:text-lg text-center">
            {gym.address} {gym.zipcode}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function SchedulePage() {
  const [categoryResult, setCategoryResult] = useState<string | null>(null);
  const { teams, error, isLoading } = useFetchTeams();
  return (
    <>
      <H1>Plannings</H1>
      <MainSection>
        <FetchFeedBack data={teams} error={error} isLoading={isLoading}>
          <div className="max-w-[80%] mx-auto">
            <div className="border-2 border-primary border-dashed p-10 rounded-xl relative mb-10">
              <div className="flex flex-col gap-4">
                <div className="flex space-between">
                  <p className="flex justify-center grow">
                    U07 = 5/6 ans <br />
                    U09 = 7/8 ans <br />
                    U11 = 9/10 ans <br />
                    U13 = 11/12 ans <br />
                    U15 = 13/14 ans <br />
                    U17 = 15/16 ans <br />
                  </p>
                  <p className="flex justify-center grow">
                    &quot;F&quot; est une séction féminine <br />
                    &quot;M&quot; est une séction masculine <br />
                  </p>
                </div>
                <p className="text-center">
                  Si je suis une fille née le 31 décembre 2010, je suis en U15F
                </p>
              </div>
            </div>
            <Form className="mb-10" setCategoryResult={setCategoryResult} />
            <div className="flex flex-col gap-10">
              {gyms.map((gym) => {
                gym.slots = teams || [];
                return (
                  <Schedule categoryResult={categoryResult} key={gym.id} data={gym} />
                );
              })}
            </div>
          </div>
        </FetchFeedBack>
      </MainSection>
    </>
  );
}

const Form = ({ className, setCategoryResult }: { className: string; setCategoryResult: (category: string | null) => void }) => {
  const [category, setCategory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setCategory(null)
    setError(null)
    setCategoryResult(null)
  }

  const getCategory = (age: number, sexe: string) => {
    const result = categories.find((category) => category.year.includes(age.toString()) && category.sexe.includes(sexe));
    if (age <= AT_THIS_YEAR_IAM_SENIOR) return sexe === "M" ? "Seniors équipe 1 ou 2 ou Loisirs" : "Loisirs filles";
    if (!result) {
      setError("Nous n'avons pas trouvé votre catégorie");
      return null;
    }
    return result.division.split(" ")[0] + sexe;
  };

  const isValidInput = (birthYear: number, sexe: string) => {
    if (sexe === "X") {
      setError("Nous acceptons pas les tabourets");
      return false;
    }
    if (birthYear <= MIN_BIRTH_YEAR_FOR_MEMBER) return true;
    setError("Nous acceptons les enfants de 5 ans et plus");
    return false;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    reset()
    const formData = new FormData(e.target as HTMLFormElement);
    const birthYear = Number(formData.get("birthYear"));
    const sexe = String(formData.get("sexe"));

    if (!isValidInput(birthYear, sexe)) return;
    const foundCategory = getCategory(birthYear, sexe);
    setCategory(foundCategory);
    setCategoryResult(foundCategory);
  };

  return (
    <form className={className} onSubmit={onSubmit}>
      <div className="flex flex-row justify-center gap-5 w-fit mx-auto">
        <Input
          name="birthYear"
          type="number"
          defaultValue={2010}
          placeholder="1999"
          className="bg-white px-5 text-background"
        />
        <Select name="sexe" defaultValue="M">
          <SelectTrigger className="text-black bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="M">Homme</SelectItem>
            <SelectItem value="F">Femme</SelectItem>
            <SelectItem value="X">Tabouret</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" className="w-1/3">Ma catégorie</Button>
      </div>
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      {
        category && (
          <div className="text-center mt-4">
            <p className="text-white">Votre catégorie est : {category}</p>
          </div>
        )
      }
    </form >
  );
};
