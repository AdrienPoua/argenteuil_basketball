"use client";
import { useSession } from "next-auth/react";
import { ReactElement } from "react";
import Loader from "@/components/Loader";

type PropsType = {
    children: React.ReactNode;
};

export default function Index({ children }: Readonly<PropsType>): ReactElement {
    const { data: clientSession, status } = useSession();

    if (status === "loading") {
        return (
            <p className="flex justify-center items-center h-screen w-full">
                <Loader />
            </p>
        );
    }

    if (clientSession) {
        return <>{children}</>;
    }

    return (
        <div className="flex justify-center items-center h-screen w-full">
            <p className="text-black text-6xl">Access Denied</p>
        </div>
    );
}
