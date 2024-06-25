"use client";
import { Container, Box, CircularProgress, Button } from "@mui/material";
import { useSession, signIn } from "next-auth/react";

export default function SignIn() {
  const { status } = useSession();
  const handleClick = async () => {
    await signIn("github");
  };

  if (status === "loading") return <CircularProgress />;
  return (
    <Container
      maxWidth="sm"
      className="flex flex-col items-center justify-center h-screen">
      <Box className="w-full p-6 bg-white rounded-lg">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="mb-3"
          onClick={handleClick}>
          Se connecter avec Github
        </Button>
      </Box>
    </Container>
  );
}