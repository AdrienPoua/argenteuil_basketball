import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

type UserProps = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export default function User({ user }: Readonly<{ user: UserProps }>) {
  const { name, email, image } = user;
  return (
    <Box className="flex">
      <Image
        src={image ?? "/images/default/avatar.webp"}
        alt={name ?? "User"}
        width={200}
        height={200}
        className="rounded-full"
      />
      <Box className="flex flex-col items-center justify-center grow">
        <Typography
          variant="body2"
          className="text-center">
          {name}
        </Typography>
        <Typography
          variant="body2"
          className="text-center">
          {email}
        </Typography>
      </Box>
    </Box>
  );
}