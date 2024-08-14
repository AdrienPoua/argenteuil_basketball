"use client";

import { getMembers } from "@/lib/mongo/controllers/members";
import { DBMemberType } from "@/utils/types";
import { useQuery } from "react-query";
import { DBMemberSchema } from "@/lib/zod/schemas";
import { ValidateWithZod } from "@/lib/zod/utils/index";
import { createContext, useState, useMemo, useContext, useEffect, SetStateAction, Dispatch } from "react";
import useMembersFilter from "@/utils/hooks/useMembersFilter";
type MembersContextType = {
    members: DBMemberType[] | undefined;
    isLoading: boolean;
    error: unknown;
    selectedMembers: DBMemberType[];
    setSelectedMembers: (members: DBMemberType[]) => void;
    filteredByYearMembers: DBMemberType[];
    setFilteredByYearMembers: (members: DBMemberType[]) => void;
    filterByYear: (year: string) => DBMemberType[];
    filterByCategory: (category: string) => DBMemberType[];
    reset: boolean;
    setReset: Dispatch<SetStateAction<boolean>>;
}



export const Context = createContext<MembersContextType | null>(null);
export const useValidContext = (): MembersContextType => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("useContext must be used within a Provider");
    }
    return context;
};

const fetchMembers = async (): Promise<DBMemberType[]> => {
    const members = await getMembers();
    ValidateWithZod(members, DBMemberSchema);
    return members;
}

export function Provider({ children }: Readonly<{ children: React.ReactNode }>) {
    const { data: members, isLoading, error, isSuccess } = useQuery(['members'], fetchMembers);
    useEffect(() => {
        if (isSuccess) {
            setSelectedMembers(members);
        }
    }, [isSuccess, members]);
    const [selectedMembers, setSelectedMembers] = useState<DBMemberType[]>([]);
    const [filteredByYearMembers, setFilteredByYearMembers] = useState<DBMemberType[]>([]);
    const [reset, setReset] = useState(false);
    const { filterByYear } = useMembersFilter(members as DBMemberType[]);
    const { filterByCategory } = useMembersFilter(filteredByYearMembers);


    const value: MembersContextType = useMemo(() => ({
        members,
        isLoading,
        error,
        selectedMembers,
        setSelectedMembers,
        filteredByYearMembers,
        setFilteredByYearMembers,
        filterByYear,
        filterByCategory,
        reset,
        setReset
    }), [
        members,
        isLoading,
        error,
        selectedMembers,
        filteredByYearMembers,
        filterByYear,
        filterByCategory,
        reset,
        setReset
    ]);

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}
