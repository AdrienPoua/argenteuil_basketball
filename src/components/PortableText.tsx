import { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity/image";
import Image from "next/image";
import Link from "next/link";
import { Typography, Box, ListItem, List } from "@mui/material";

export const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <Box className="relative w-full h-auto aspect-square overflow-hidden">
        <Image
          src={urlFor(value).url()}
          alt={value.alt || ""}
          objectFit="cover"
          className="rounded-md size-full mb-5"
          fill
        />
      </Box>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <Link
        href={value.href}
        target="_blank"
        rel="noopener noreferrer">
        <Typography component="span" className="text-primary underline hover:text-primary-dark">{children}</Typography>
      </Link>
    ),
  },
  block: {
    h1: ({ children }) => (
      <Typography
        variant="h1"
        className="text-black text-center text-4xl">
        {children}
      </Typography>
    ),
    h2: ({ children }) => (
      <Typography
        variant="h2"
        className="text-black text-center">
        {children}
      </Typography>
    ),
    h3: ({ children }) => (
      <Typography
        variant="h3"
        className="text-black text-3xl text-center mb-5">
        {children}
      </Typography>
    ),
    h4: ({ children }) => (
      <Typography
        variant="h4"
        className="text-black text-2xl mb-1"
      >
        {children}
      </Typography>
    ),
    normal: ({ children }) => (
      <Typography
        className="text-black font-secondary"
      >
        {children}
      </Typography>
    ),
  },
  list: {
    bullet: ({ children }) => <List className="list-disc mb-4">{children}</List>,
  },
  listItem: {
    bullet: ({ children }) => (
      <ListItem className="ml-4">
        <Typography className=" text-primary underline underline-offset-4">{children}</Typography>
      </ListItem>
    ),
  },

};
