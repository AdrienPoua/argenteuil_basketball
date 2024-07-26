"use client";
import { useSession } from "next-auth/react";
import { ReactElement, ReactNode, useEffect } from "react";
import { CircularProgress, Container, Box } from "@mui/material";
import Info from "@/components/Info";
import { useRouter } from "next/navigation";

type PropsType = {
  children: ReactNode;
};
export default function Index({ children }: Readonly<PropsType>): ReactElement {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    const id = setTimeout(() => {
      if (status === "unauthenticated") {
        router.push("/admin");
      }
    }, 5000);

    return () => clearTimeout(id);
  }, [status, router]);

  if (status === "loading") {
    return (
      <Container
        className="flex flex-col items-center justify-center size-full">
        <CircularProgress />
      </Container>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Box className="bg-black flex flex-col h-svh justify-center items-center">
        <Info content="Tentative d'effraction" />
        <Info content="Telechargement de toutes les données sensibles de votre ordinateur" />
        <Box>
          <CircularProgress />
          <CircularProgress />
          <CircularProgress />
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  return <>{children}</>;
}
