"use client";
import { useQuery } from "react-query";
import { getStaff } from "@/lib/mongo/controllers/staff";
import { ValidateWithZod } from "@/lib/zod/utils/index";
import { SDatabase } from "@/lib/zod/schemas";
import { useState, useEffect } from "react";
import { Coach, Leader } from "@/utils/models";

const fetchStaff = async () => {
  const staff = await getStaff();
  const staffWithId = staff.map((staff) => {
    const { _id, ...rest } = staff;
    return { ...rest, id: _id };
  });
  ValidateWithZod(staff, SDatabase.Staff);
  return staffWithId;
};

export default function useFetchStaff() {
  const [staff, setStaff] = useState<(Coach | Leader)[]>([]);
  const { data, isLoading, error, isFetching } = useQuery(
    ["staff"],
    fetchStaff,
  );

  useEffect(() => {
    if (data) {
      setStaff(
        data.map((person) => {
          if (person?.teams && person.teams.length > 0) {
            return new Coach({...person, teams: person.teams ?? []});
          } else if(person.job){
            return new Leader({...person, job : person.job as "Président" | "Trésorier" | "Correspondant" | "Secrétaire Général" | "Entraineur" | "",});
          }
          return null;
        }).filter((person) => person !== null),
      );
    }
  }, [data]);

  return { staff, isLoading, error, isFetching };
}
