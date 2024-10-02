"use client";
import { ReactElement } from "react";
import { cn } from "@/lib/utils"; // Shadcn utility for conditional classnames

type PropsType = {
    left: React.ReactNode;
    icon: React.ReactNode;
    right: React.ReactNode;
    index: number;
};

// Remplacer les animations de Framer Motion par des classes Tailwind pour les transitions et animations
export default function Index({ left, icon, right, index }: Readonly<PropsType>): ReactElement {
    return (
        <div
            className={cn(
                "flex relative transition-all duration-300 ease-in-out transform",
                index % 2 === 0 ? "hover:bg-blue-800" : "hover:bg-blue-600"
            )}
        >
            <div className="flex justify-end w-[45%]">
                <div className="self-center text-white">{left}</div>
            </div>
            <div className="flex flex-col items-center justify-center">
                <div className="min-h-10 w-px bg-gray-200" />
                <div className="p-2 bg-primary rounded-full">{icon}</div>
                <div className="min-h-10 w-px bg-gray-200" />
            </div>
            <div className="flex grow w-[45%]">
                <div className="self-center text-white w-44">{right}</div>
            </div>
        </div>
    );
}

// Composant de fin de Timeline sans animation Framer Motion
export const TimeLineEnd = (): ReactElement => {
    return (
        <div className="flex justify-center items-center transition-all duration-300 ease-in-out transform hover:bg-blue-800">
            <p className="self-center text-white">Vous êtes maintenant licencié</p>
        </div>
    );
}
