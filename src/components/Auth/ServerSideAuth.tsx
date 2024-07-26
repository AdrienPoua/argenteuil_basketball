import React, { ReactElement } from "react";
import { getServerSession } from "next-auth/next";
import { GetServerSideProps } from "next";


export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession();
  if (!session) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

type PropsType = {
  children: React.ReactNode;
};

export default function Index({ children }: Readonly<PropsType>): ReactElement {
  return (
    <>
      {children}
    </>
  )
}
