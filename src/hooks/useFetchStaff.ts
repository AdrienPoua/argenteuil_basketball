"use client";
import { useQuery } from "react-query";
import { getStaff } from "@/database/controllers/staff";
import { useState, useEffect } from "react";
import { Coach, Leader } from "@/models";

export default function useFetchStaff() {
  const [staff, setStaff] = useState<(Coach | Leader)[]>([]);
  const { data, isLoading, error, isFetching } = useQuery(["staff"], () =>
    getStaff(),
  );

  useEffect(() => {
    if (data) {
      setStaff(
        data
          .map((person) => {
            if (person?.teams && person.teams.length > 0) {
              return new Coach({ ...person, id: person._id });
            } else if (person.job) {
              return new Leader({ ...person, id: person._id });
            }
            return null;
          })
          .filter((person) => person !== null),
      );
    }
  }, [data]);

  return { staff, isLoading, error, isFetching };
}
