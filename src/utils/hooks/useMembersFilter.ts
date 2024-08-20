import { TDatabase } from "../types";

export default function useMembersFilter(members: TDatabase.Member[]) {
  const filterByYear = (year: string) => {
    return members.filter((member) => member.year === year);
  };

  const filterByCategory = (category: string) => {
    if (category === "All") {
      return members;
    } else {
      return members.filter((member) => category.includes(member.categorie));
    }
  };

  return { filterByYear, filterByCategory };
}
