"use client";

import { getMembers } from "@/lib/mongo/controllers/members";
import { useQuery } from "react-query";
import { ValidateWithZod } from "@/lib/zod/utils/index";
import { createContext, useState, useMemo, useContext, useEffect, SetStateAction, Dispatch } from "react";
import { TDatabase } from "@/utils/types";
import { SDatabase } from "@/lib/zod/schemas";

import useMembersFilter from "@/utils/hooks/useMembersFilter";

type MembersContextType = {
    members: TDatabase.Member[] | undefined;
    isLoading: boolean;
    error: unknown;
    selectedMembers: TDatabase.Member[];
    setSelectedMembers: (members: TDatabase.Member[]) => void;
    filteredByYearMembers: TDatabase.Member[];
    setFilteredByYearMembers: (members: TDatabase.Member[]) => void;
    filterByYear: (year: string) => TDatabase.Member[];
    filterByCategory: (category: string) => TDatabase.Member[];
    reset: boolean;
    year: string;
    setYear: Dispatch<SetStateAction<string>>;
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

const fetchMembers = async (): Promise<TDatabase.Member[]> => {
    const members = await getMembers();
    ValidateWithZod(members, SDatabase.Member);
    return members;
}

export function Provider({ children }: Readonly<{ children: React.ReactNode }>) {
    const { data: members, isLoading, error, isSuccess } = useQuery(['members'], fetchMembers);
    useEffect(() => {
        if (isSuccess) {
            setSelectedMembers(members);
        }
    }, [isSuccess, members]);
    const [selectedMembers, setSelectedMembers] = useState<TDatabase.Member[]>([]);
    const [filteredByYearMembers, setFilteredByYearMembers] = useState<TDatabase.Member[]>([]);
    const [reset, setReset] = useState(false);
    const { filterByYear } = useMembersFilter(members as TDatabase.Member[]);
    const { filterByCategory } = useMembersFilter(filteredByYearMembers);
    const [year, setYear] = useState("2024");



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
        setReset,
        year,
        setYear
    }), [
        members,
        isLoading,
        error,
        selectedMembers,
        filteredByYearMembers,
        filterByYear,
        filterByCategory,
        reset,
        setReset,
        year,
        setYear
    ]);

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}
