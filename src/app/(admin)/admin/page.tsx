"use client";
import { Container, Box, Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import { signOut, useSession, signIn } from "next-auth/react";
import User from "@/components/User";


export default function SignIn() {
  const { data: session, status } = useSession();
  if (status === "loading") return <CircularProgress />;
  return (
    <Container
      maxWidth="sm"
      className="flex flex-col items-center justify-center h-screen">
      <Box className="w-full p-6 bg-white rounded-lg">
        {!session && (
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              await signIn("github");
            }}
            className="mb-3 w-full">
            Se connecter
          </Button>
        )}
        {session?.user && <User user={session.user} />}
        {session && (
          <>
            <Link
              href="/admin/dashboard"
              passHref>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="mb-3">
                Dashboard 🏠
              </Button>
            </Link>
            <Link
              href="/studio/structure"
              passHref>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="mb-3">
                Studio 🎥
              </Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={async () => signOut()}
              className="mb-3">
              Logout  🚪
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
}
