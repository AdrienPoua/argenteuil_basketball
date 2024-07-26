import React, { ReactElement } from "react";
import SecurisedPath from "@/lib/nextAuth/SecurisedPath";
import Layout from "@/utils/layouts/Admin";

type PropsType = {
  children: React.ReactNode;
}

export default function Index({ children }: Readonly<PropsType>): ReactElement {
  return (
    <SecurisedPath>
      <Layout>
      {children}
      </Layout>
    </SecurisedPath>
  );
}