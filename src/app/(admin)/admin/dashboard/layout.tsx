"use client";
import React, { ReactElement } from "react";
import SecurisedPath from "@/lib/nextAuth/SecurisedPath";
import Sidebar from './components/Sidebar';


type PropsType = {
  children: React.ReactNode;
}

export default function Index({ children }: Readonly<PropsType>): ReactElement {
  return (
    <SecurisedPath>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-grow bg-foreground p-10">
          {children}
        </div>
      </div>
    </SecurisedPath>
  );
}
