import { getServerSession } from "next-auth/next";
import { GET as authOptions } from "@/app/api/auth/[...nextauth]/route";
import { GetServerSidePropsContext, GetServerSideProps } from "next";
import { Session } from "next-auth";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const session: Session | null = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

// this file useless for now, it doesnt work
