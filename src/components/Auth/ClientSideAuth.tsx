"use client";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import { CircularProgress, Container, Box } from "@mui/material";
import Info from "@/components/Info";
import { useRouter } from "next/navigation";

export default function Page({ children }: Readonly<{ children: ReactNode }>) {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      if (status === "unauthenticated") {
        router.push("/admin");
      }
    }, 5000);
  }, [status, router]);

  if (status === "loading") {
    return (
      <Container
        maxWidth="sm"
        className="flex flex-col items-center justify-center h-screen size-full">
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
          <CircularProgress />
          <CircularProgress />
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
