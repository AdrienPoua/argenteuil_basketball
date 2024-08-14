import { DBMemberType } from "../types";

export default function useMembersFilter(members: DBMemberType[]) {
  
  const filterByYear = (year: string): DBMemberType[] => {
    return members.filter((member) => member.year === year);
  };

  const filterByCategory = (category: string): DBMemberType[] => {
    if (category === "All") {
      return members;
    } else {
      return members.filter((member) => category.includes(member.categorie));
    }
  };

  return { filterByYear, filterByCategory };
}
