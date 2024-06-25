"use client";
import { Container, Box, Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { action } from "@/serverActions";
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
          <Link
            href="/admin/login"
            passHref>
            <Button
              variant="contained"
              color="primary"
              className="mb-3 w-full">
              Login Page
            </Button>
          </Link>
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
                Dashboard
              </Button>
            </Link>
            <Link
              href="/studio"
              passHref>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="mb-3">
                Studio
              </Button>
            </Link>
            <Link href="/admin/logout">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="mb-3">
                Logout Page
              </Button>
            </Link>
          </>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={async () => {
            await action();
          }}
          className="mb-3">
          SS Action
        </Button>
      </Box>
    </Container>
  );
}
